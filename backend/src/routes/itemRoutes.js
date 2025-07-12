const express = require('express');
const { body } = require('express-validator');
const { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItem, 
  deleteItem, 
  getItemsByUser 
} = require('../controllers/itemController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for item creation and update
const itemValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('category')
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters'),
  body('size')
    .optional()
    .isString()
    .isLength({ max: 20 })
    .withMessage('Size must be less than 20 characters'),
  body('condition')
    .optional()
    .isIn(['new', 'like-new', 'good', 'fair', 'poor'])
    .withMessage('Condition must be one of: new, like-new, good, fair, poor'),
  body('tags')
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.every(tag => typeof tag === 'string' && tag.length <= 50);
      }
      return true;
    })
    .withMessage('Tags must be an array of strings, each less than 50 characters'),
  body('imageUrls')
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.every(url => typeof url === 'string' && url.length <= 500);
      }
      return true;
    })
    .withMessage('Image URLs must be an array of strings, each less than 500 characters')
];

// @route   GET /api/items
// @desc    Get all available items (public)
// @access  Public
router.get('/', getAllItems);

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', getItemById);

// @route   POST /api/items
// @desc    Create a new item (JWT protected)
// @access  Private
router.post('/', verifyToken, itemValidation, createItem);

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private (owner only)
router.put('/:id', verifyToken, itemValidation, updateItem);

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private (owner only)
router.delete('/:id', verifyToken, deleteItem);

// @route   GET /api/items/user/:userId
// @desc    Get items by user
// @access  Public
router.get('/user/:userId', getItemsByUser);

module.exports = router; 