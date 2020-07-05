const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const discountsSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
  business: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  title: { type: String, required: true },
  description: String,
  picture: String,
  expiration: Date,
  // expiration: { type: Date, required: true },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Discounts = model('Discounts', discountsSchema);

module.exports = Discounts;
