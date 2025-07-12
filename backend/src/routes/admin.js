const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Item = require('../models/Item');
const Swap = require('../models/Swap');
const Notification = require('../models/Notification');
const Feedback = require('../models/Feedback');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Middleware to check admin
const requireAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || !user.is_admin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Private (admin)
router.get('/dashboard', verifyToken, requireAdmin, async (req, res) => {
  try {
    const [userCount, itemCount, swapCount] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Swap.countDocuments()
    ]);
    res.json({
      success: true,
      data: {
        users: userCount,
        items: itemCount,
        swaps: swapCount
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard stats', message: 'Internal server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (admin)
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ error: 'Failed to get users', message: 'Internal server error' });
  }
});

// @route   GET /api/admin/items
// @desc    Get all items
// @access  Private (admin)
router.get('/items', verifyToken, requireAdmin, async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Admin get items error:', error);
    res.status(500).json({ error: 'Failed to get items', message: 'Internal server error' });
  }
});

// @route   PUT /api/admin/users/:id/ban
// @desc    Ban or unban a user
// @access  Private (admin)
router.put('/users/:id/ban', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { banned } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { banned: !!banned }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Admin ban user error:', error);
    res.status(500).json({ error: 'Failed to ban user', message: 'Internal server error' });
  }
});

// @route   PUT /api/admin/items/:id/approve
// @desc    Approve or unapprove an item
// @access  Private (admin)
router.put('/items/:id/approve', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { approved } = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, { approved: !!approved }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Admin approve item error:', error);
    res.status(500).json({ error: 'Failed to approve item', message: 'Internal server error' });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (admin)
router.get('/analytics', verifyToken, requireAdmin, async (req, res) => {
  try {
    // Example: items per category
    const itemsByCategory = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    // Example: swaps per status
    const swapsByStatus = await Swap.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({
      success: true,
      data: {
        itemsByCategory,
        swapsByStatus
      }
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({ error: 'Failed to get analytics', message: 'Internal server error' });
  }
});

// @route   GET /api/admin/reports
// @desc    Get reports (feedback)
// @access  Private (admin)
router.get('/reports', verifyToken, requireAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ created_at: -1 });
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error('Admin get reports error:', error);
    res.status(500).json({ error: 'Failed to get reports', message: 'Internal server error' });
  }
});

module.exports = router; 