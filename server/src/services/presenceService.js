
const db = require('../config/database');

class PresenceService {
  constructor(io) {
    this.io = io;
    this.userSockets = new Map(); // userId -> Set of socketIds
    this.socketUsers = new Map(); // socketId -> userId
  }

  async userConnected(socketId, userId) {
    try {
      // Track socket connection
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId).add(socketId);
      this.socketUsers.set(socketId, userId);

      // Update database status
      await this.updateUserStatus(userId, true);
      
      // Notify other users
      this.io.emit('user-online', { userId, timestamp: new Date() });
      
      console.log(`User ${userId} connected with socket ${socketId}`);
    } catch (error) {
      console.error('Error handling user connection:', error);
    }
  }

  async userDisconnected(socketId) {
    try {
      const userId = this.socketUsers.get(socketId);
      if (!userId) return;

      // Remove socket tracking
      const userSocketSet = this.userSockets.get(userId);
      if (userSocketSet) {
        userSocketSet.delete(socketId);
        
        // If no more sockets for this user, mark as offline
        if (userSocketSet.size === 0) {
          this.userSockets.delete(userId);
          await this.updateUserStatus(userId, false);
          this.io.emit('user-offline', { userId, timestamp: new Date() });
        }
      }
      
      this.socketUsers.delete(socketId);
      console.log(`User ${userId} disconnected socket ${socketId}`);
    } catch (error) {
      console.error('Error handling user disconnection:', error);
    }
  }

  async updateUserStatus(userId, isOnline) {
    try {
      const updateData = {
        is_online: isOnline,
        updated_at: new Date()
      };

      if (!isOnline) {
        updateData.last_seen = new Date();
      }

      await db('users')
        .where('id', userId)
        .update(updateData);

    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  async getOnlineUsers() {
    try {
      const onlineUsers = await db('users')
        .select('id', 'username', 'full_name', 'avatar_url')
        .where('is_online', true);

      return onlineUsers;
    } catch (error) {
      console.error('Error fetching online users:', error);
      throw error;
    }
  }

  isUserOnline(userId) {
    return this.userSockets.has(userId);
  }

  getUserSocketCount(userId) {
    const sockets = this.userSockets.get(userId);
    return sockets ? sockets.size : 0;
  }

  getTotalOnlineUsers() {
    return this.userSockets.size;
  }
}

module.exports = PresenceService;
