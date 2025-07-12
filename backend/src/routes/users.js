const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Item = require('../models/Item');
const Swap = require('../models/Swap');
const Notification = require('../models/Notification');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile', message: 'Internal server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get user by id error:', error);
    res.status(500).json({ error: 'Failed to get user', message: 'Internal server error' });
  }
});

// @route   GET /api/users/:id/items
// @desc    Get items by user ID
// @access  Public
router.get('/:id/items', async (req, res) => {
  try {
    const items = await Item.find({ user_id: req.params.id });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({ error: 'Failed to get user items', message: 'Internal server error' });
  }
});

// @route   GET /api/users/notifications
// @desc    Get current user's notifications
// @access  Private
router.get('/notifications', verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications', message: 'Internal server error' });
  }
});

// @route   PUT /api/users/notifications/:id/read
// @desc    Mark a notification as read
// @access  Private
router.put('/notifications/:id/read', verifyToken, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { is_read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read', message: 'Internal server error' });
  }
});

// @route   PUT /api/users/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/notifications/read-all', verifyToken, async (req, res) => {
  try {
    await Notification.updateMany({ user_id: req.user.id, is_read: false }, { is_read: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read', message: 'Internal server error' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user stats (items, swaps, points)
// @access  Private
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const [itemCount, swapCount, user] = await Promise.all([
      Item.countDocuments({ user_id: userId }),
      Swap.countDocuments({ $or: [{ requester_id: userId }, { owner_id: userId }] }),
      User.findById(userId)
    ]);
    res.json({
      success: true,
      data: {
        items: itemCount,
        swaps: swapCount,
        points: user ? user.points : 0
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to get user stats', message: 'Internal server error' });
  }
});

module.exports = router; 