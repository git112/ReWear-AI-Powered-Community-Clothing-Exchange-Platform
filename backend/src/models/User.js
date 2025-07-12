const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  points: { type: Number, default: process.env.INITIAL_POINTS || 100 },
  is_admin: { type: Boolean, default: false },
  avatar_url: { type: String },
  bio: { type: String },
  location: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', userSchema); 