const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Multer setup for image uploads (local storage for demo; replace with cloud upload in production)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Validation rules for item creation and update
const itemValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('size').optional().isString(),
  body('condition').optional().isIn(['new', 'like-new', 'good', 'fair', 'poor']),
  body('category').optional().isString(),
  body('points_required').optional().isInt({ min: 0 })
];

// @route   GET /api/items
// @desc    Get all items (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, size, condition, status, user_id, search, sortBy, sortOrder } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (status) filter.status = status;
    if (user_id) filter.user_id = user_id;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort['created_at'] = -1;
    }
    const items = await Item.find(filter).sort(sort);
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ error: 'Failed to get items', message: 'Internal server error' });
  }
});

// @route   GET /api/items/user/:userId
// @desc    Get items by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const items = await Item.find({ user_id: req.params.userId });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get items by user error:', error);
    res.status(500).json({ error: 'Failed to get user items', message: 'Internal server error' });
  }
});

// @route   GET /api/items/my-uploads
// @desc    Get current user's uploaded items
// @access  Private
router.get('/my-uploads', verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ user_id: req.user.id }).sort({ created_at: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get my uploads error:', error);
    res.status(500).json({ error: 'Failed to get my uploads', message: 'Internal server error' });
  }
});

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    console.log('Backend: Received request for item ID:', req.params.id);
    console.log('Backend: ID type:', typeof req.params.id);
    
    // Validate that the ID is not undefined and is a valid ObjectId
    if (!req.params.id || req.params.id === 'undefined') {
      console.log('Backend: Invalid item ID - undefined or "undefined"');
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid item ID',
        message: 'Item ID is required and must be valid' 
      });
    }

    console.log('Backend: Attempting to find item with ID:', req.params.id);
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Item not found',
        message: 'The requested item could not be found' 
      });
    }
    console.log('Backend: Item found successfully, sending response');
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Get item by id error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid item ID',
        message: 'The provided item ID is not valid' 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get item', 
      message: 'Internal server error' 
    });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', verifyToken, upload.array('images', 5), itemValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    // Handle images
    let image_urls = [];
    if (req.files && req.files.length > 0) {
      image_urls = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.image_urls) {
      // Accept image_urls as array from JSON
      image_urls = Array.isArray(req.body.image_urls) ? req.body.image_urls : [req.body.image_urls];
    }
    // Handle tags (comma-separated string or array)
    let tags = [];
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        tags = req.body.tags;
      } else if (typeof req.body.tags === 'string') {
        tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    const itemData = {
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      size: req.body.size,
      condition: req.body.condition,
      tags,
      image_urls,
      status: 'available',
      points_required: req.body.points_required || 0
    };
    const item = await Item.create(itemData);
    res.status(201).json({ success: true, message: 'Item created successfully', data: item });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ error: 'Failed to create item', message: 'Internal server error' });
  }
});

// @route   POST /api/items/test-data
// @desc    Create test items with placeholder images (for development only)
// @access  Public
router.post('/test-data', async (req, res) => {
  try {
    // Sample test items with placeholder images
    const testItems = [
      {
        user_id: '507f1f77bcf86cd799439011', // Placeholder user ID
        title: 'Vintage Denim Jacket',
        description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
        category: 'outerwear',
        size: 'm',
        condition: 'good',
        tags: ['vintage', 'denim', 'jacket'],
        image_urls: ['/uploads/placeholder1.jpg'],
        status: 'available',
        points_required: 50
      },
      {
        user_id: '507f1f77bcf86cd799439011',
        title: 'Summer Floral Dress',
        description: 'Beautiful floral print dress perfect for summer days.',
        category: 'dresses',
        size: 's',
        condition: 'like-new',
        tags: ['summer', 'floral', 'dress'],
        image_urls: ['/uploads/placeholder2.jpg'],
        status: 'available',
        points_required: 75
      },
      {
        user_id: '507f1f77bcf86cd799439011',
        title: 'Classic White T-Shirt',
        description: 'Essential white t-shirt made from organic cotton.',
        category: 'tops',
        size: 'l',
        condition: 'new',
        tags: ['basic', 'organic', 'cotton'],
        image_urls: ['/uploads/placeholder3.jpg'],
        status: 'available',
        points_required: 25
      }
    ];

    const createdItems = await Item.insertMany(testItems);
    res.status(201).json({ 
      success: true, 
      message: 'Test items created successfully', 
      data: createdItems 
    });
  } catch (error) {
    console.error('Create test items error:', error);
    res.status(500).json({ error: 'Failed to create test items', message: 'Internal server error' });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private (owner only)
router.put('/:id', verifyToken, itemValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (item.user_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    Object.assign(item, req.body);
    await item.save();
    res.json({ success: true, message: 'Item updated successfully', data: item });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ error: 'Failed to update item', message: 'Internal server error' });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private (owner only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    if (item.user_id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await item.deleteOne();
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ error: 'Failed to delete item', message: 'Internal server error' });
  }
});

module.exports = router; 