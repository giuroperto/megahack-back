const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: 'Business' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  cleanliness: { type: Number, required: true },
  space: { type: Number, required: true },
  materials: { type: Number, required: true },
  individualPackages: { type: Number, required: true },
  capacity: { type: Number, required: true },
  waiters: { type: Number, required: true },
  procedures: { type: Number, required: true },
  children: { type: Number, required: true },
  ventilation: { type: Number, required: true },
  clients: { type: Number, required: true },
  average: { type: Number, required: true },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
