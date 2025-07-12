const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  size: { type: String },
  condition: { type: String, enum: ['new', 'like-new', 'good', 'fair', 'poor'] },
  image_urls: [{ type: String }],
  category: { type: String },
  tags: [{ type: String }],
  status: { type: String, enum: ['available', 'pending', 'swapped', 'removed'], default: 'available' },
  points_required: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Item', itemSchema); 