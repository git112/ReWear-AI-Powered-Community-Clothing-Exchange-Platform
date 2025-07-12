const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }
    const token = authHeader.substring(7);
    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get user from MongoDB
    const user = await User.findById(decoded.id || decoded.userId);
    if (!user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token - user not found'
      });
    }
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      points: user.points,
      is_admin: user.is_admin,
      avatar_url: user.avatar_url,
      bio: user.bio,
      location: user.location
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Token expired'
      });
    }
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Authentication failed'
    });
  }
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Admin privileges required'
    });
  }
  next();
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without user
    }
    const token = authHeader.substring(7);
    if (!token) {
      return next(); // Continue without user
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get user from MongoDB
    const user = await User.findById(decoded.id || decoded.userId);
    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
        is_admin: user.is_admin,
        avatar_url: user.avatar_url,
        bio: user.bio,
        location: user.location
      };
    }
    next();
  } catch (error) {
    // If token is invalid, continue without user
    next();
  }
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = {
  verifyToken,
  requireAdmin,
  optionalAuth,
  generateToken
}; 