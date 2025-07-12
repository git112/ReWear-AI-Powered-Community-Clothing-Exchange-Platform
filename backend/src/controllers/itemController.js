const { validationResult } = require('express-validator');
const Item = require('../models/Item');
const { sendSuccess, sendError } = require('../utils/sendResponse');
const mongoose = require('mongoose');
const User = require('../models/User'); // Added import for User model

/**
 * @desc    Get all available items
 * @route   GET /api/items
 * @access  Public
 */
const getAllItems = async (req, res) => {
  try {
    const { category, size, condition, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = { status: 'available' };
    
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.created_at = -1; // Default sort by newest first
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const items = await Item.find(filter)
      .populate('user_id', 'name avatar_url')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Item.countDocuments(filter);

    return sendSuccess(res, 200, 'Items retrieved successfully', {
      items,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    return sendError(res, 500, 'Failed to get items');
  }
};

/**
 * @desc    Get item by ID
 * @route   GET /api/items/:id
 * @access  Public
 */
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('user_id', 'name avatar_url bio location');

    if (!item) {
      return sendError(res, 404, 'Item not found');
    }

    return sendSuccess(res, 200, 'Item retrieved successfully', { item });
  } catch (error) {
    console.error('Get item by id error:', error);
    return sendError(res, 500, 'Failed to get item');
  }
};

/**
 * @desc    Create a new item
 * @route   POST /api/items
 * @access  Private
 */
const createItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Validation failed', errors.array());
    }

    const { title, description, category, size, condition, tags, imageUrls } = req.body;

    // Handle tags (ensure it's an array)
    let tagsArray = [];
    if (tags) {
      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
    }

    // Handle imageUrls (ensure it's an array)
    let imageUrlsArray = [];
    if (imageUrls) {
      if (Array.isArray(imageUrls)) {
        imageUrlsArray = imageUrls;
      } else if (typeof imageUrls === 'string') {
        imageUrlsArray = [imageUrls];
      }
    }

    // Create item
    const item = await Item.create({
      user_id: req.user.id,
      title,
      description,
      category,
      size,
      condition,
      tags: tagsArray,
      image_urls: imageUrlsArray,
      status: 'available'
    });

    // Increment user points
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { points: parseInt(process.env.POINTS_PER_UPLOAD) || 50 } }
    );

    // Populate user info
    await item.populate('user_id', 'name avatar_url');

    return sendSuccess(res, 201, 'Item created successfully', { item });
  } catch (error) {
    console.error('Create item error:', error);
    return sendError(res, 500, 'Failed to create item');
  }
};

/**
 * @desc    Update an item
 * @route   PUT /api/items/:id
 * @access  Private (owner only)
 */
const updateItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Validation failed', errors.array());
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return sendError(res, 404, 'Item not found');
    }

    // Check ownership
    if (item.user_id.toString() !== req.user.id) {
      return sendError(res, 403, 'Not authorized to update this item');
    }

    // Update item
    Object.assign(item, req.body);
    await item.save();

    // Populate user info
    await item.populate('user_id', 'name avatar_url');

    return sendSuccess(res, 200, 'Item updated successfully', { item });
  } catch (error) {
    console.error('Update item error:', error);
    return sendError(res, 500, 'Failed to update item');
  }
};

/**
 * @desc    Delete an item
 * @route   DELETE /api/items/:id
 * @access  Private (owner only)
 */
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return sendError(res, 404, 'Item not found');
    }

    // Check ownership
    if (item.user_id.toString() !== req.user.id) {
      return sendError(res, 403, 'Not authorized to delete this item');
    }

    await item.deleteOne();

    return sendSuccess(res, 200, 'Item deleted successfully');
  } catch (error) {
    console.error('Delete item error:', error);
    return sendError(res, 500, 'Failed to delete item');
  }
};

/**
 * @desc    Get items by user
 * @route   GET /api/items/user/:userId
 * @access  Public
 */
const getItemsByUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    const items = await Item.find({ 
      user_id: req.params.userId,
      status: 'available'
    }).populate('user_id', 'name avatar_url');

    return sendSuccess(res, 200, 'User items retrieved successfully', { items });
  } catch (error) {
    console.error('Get items by user error:', error);
    return sendError(res, 500, 'Failed to get user items');
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsByUser
}; 