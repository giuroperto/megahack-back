const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business' },
  title: { type: String, required: true },
  review: { type: String, required: true },
  media: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
