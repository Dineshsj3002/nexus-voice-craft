
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class NotificationService {
  constructor(io) {
    this.io = io;
  }

  async createNotification(userId, type, title, message, data = {}) {
    try {
      const notification = {
        id: uuidv4(),
        user_id: userId,
        type,
        title,
        message,
        data: JSON.stringify(data),
        is_read: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const [createdNotification] = await db('notifications').insert(notification).returning('*');
      
      // Emit real-time notification
      this.io.to(`user-${userId}`).emit('new-notification', createdNotification);
      
      return createdNotification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async getUserNotifications(userId, page = 1, limit = 20) {
    try {
      const offset = (page - 1) * limit;
      
      const notifications = await db('notifications')
        .where('user_id', userId)
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);

      const totalCount = await db('notifications')
        .where('user_id', userId)
        .count('id as count')
        .first();

      return {
        notifications,
        pagination: {
          page,
          limit,
          total: parseInt(totalCount.count),
          totalPages: Math.ceil(totalCount.count / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      const updatedNotification = await db('notifications')
        .where({ id: notificationId, user_id: userId })
        .update({ 
          is_read: true, 
          read_at: new Date(),
          updated_at: new Date()
        })
        .returning('*');

      if (updatedNotification.length > 0) {
        this.io.to(`user-${userId}`).emit('notification-read', notificationId);
      }

      return updatedNotification[0];
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(userId) {
    try {
      await db('notifications')
        .where({ user_id: userId, is_read: false })
        .update({ 
          is_read: true, 
          read_at: new Date(),
          updated_at: new Date()
        });

      this.io.to(`user-${userId}`).emit('all-notifications-read');
      
      return { success: true };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async getUnreadCount(userId) {
    try {
      const result = await db('notifications')
        .where({ user_id: userId, is_read: false })
        .count('id as count')
        .first();

      return parseInt(result.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  }
}

module.exports = NotificationService;
