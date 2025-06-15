
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const NotificationService = require('../services/notificationService');

const router = express.Router();

// Get user notifications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const notificationService = new NotificationService(req.io);
    
    const result = await notificationService.getUserNotifications(
      req.user.id, 
      parseInt(page), 
      parseInt(limit)
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Get unread notifications count
router.get('/unread-count', authMiddleware, async (req, res) => {
  try {
    const notificationService = new NotificationService(req.io);
    const count = await notificationService.getUnreadCount(req.user.id);
    
    res.json({ count });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

// Mark notification as read
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notificationService = new NotificationService(req.io);
    const notification = await notificationService.markAsRead(req.params.id, req.user.id);
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

// Mark all notifications as read
router.patch('/read-all', authMiddleware, async (req, res) => {
  try {
    const notificationService = new NotificationService(req.io);
    await notificationService.markAllAsRead(req.user.id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
});

module.exports = router;
