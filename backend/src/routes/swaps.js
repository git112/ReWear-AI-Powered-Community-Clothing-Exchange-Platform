const express = require('express');
const { body, validationResult } = require('express-validator');
const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for swap creation
const swapValidation = [
  body('item_id').notEmpty().withMessage('Item ID is required'),
  body('message').optional().isString()
];

// @route   GET /api/swaps
// @desc    Get all swaps (optionally filter by user)
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const { user_id, status } = req.query;
    const filter = {};
    if (user_id) {
      filter.$or = [
        { requester_id: user_id },
        { owner_id: user_id }
      ];
    }
    if (status) filter.status = status;
    const swaps = await Swap.find(filter).sort({ created_at: -1 });
    res.json({ success: true, data: swaps });
  } catch (error) {
    console.error('Get swaps error:', error);
    res.status(500).json({ error: 'Failed to get swaps', message: 'Internal server error' });
  }
});

// @route   GET /api/swaps/:id
// @desc    Get swap by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    res.json({ success: true, data: swap });
  } catch (error) {
    console.error('Get swap by id error:', error);
    res.status(500).json({ error: 'Failed to get swap', message: 'Internal server error' });
  }
});

// @route   POST /api/swaps
// @desc    Create a new swap request
// @access  Private
router.post('/', verifyToken, swapValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    const { item_id, message } = req.body;
    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (item.user_id.toString() === req.user.id) {
      return res.status(400).json({ error: 'You cannot request your own item' });
    }
    const swap = await Swap.create({
      requester_id: req.user.id,
      item_id: item._id,
      owner_id: item.user_id,
      message
    });
    res.status(201).json({ success: true, message: 'Swap request created', data: swap });
  } catch (error) {
    console.error('Create swap error:', error);
    res.status(500).json({ error: 'Failed to create swap', message: 'Internal server error' });
  }
});

// @route   PUT /api/swaps/:id/:action
// @desc    Update swap status (accept, reject, complete, cancel)
// @access  Private (owner or requester)
router.put('/:id/:action', verifyToken, async (req, res) => {
  try {
    const { id, action } = req.params;
    const swap = await Swap.findById(id);
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    // Only owner or requester can update
    if (swap.owner_id.toString() !== req.user.id && swap.requester_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    // Only allow valid status transitions
    const validActions = ['accept', 'reject', 'complete', 'cancel'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }
    let newStatus = swap.status;
    if (action === 'accept') newStatus = 'accepted';
    if (action === 'reject') newStatus = 'rejected';
    if (action === 'complete') newStatus = 'completed';
    if (action === 'cancel') newStatus = 'cancelled';
    swap.status = newStatus;
    await swap.save();
    res.json({ success: true, message: `Swap ${action}ed`, data: swap });
  } catch (error) {
    console.error('Update swap error:', error);
    res.status(500).json({ error: 'Failed to update swap', message: 'Internal server error' });
  }
});

// @route   DELETE /api/swaps/:id
// @desc    Delete a swap (admin or owner/requester)
// @access  Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    if (swap.owner_id.toString() !== req.user.id && swap.requester_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await swap.deleteOne();
    res.json({ success: true, message: 'Swap deleted' });
  } catch (error) {
    console.error('Delete swap error:', error);
    res.status(500).json({ error: 'Failed to delete swap', message: 'Internal server error' });
  }
});

module.exports = router; 