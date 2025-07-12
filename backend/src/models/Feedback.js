const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  swap_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Swap', required: true },
  from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = mongoose.model('Feedback', feedbackSchema); 