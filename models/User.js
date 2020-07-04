const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  profilePicture: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
  discounts: [{ type: Schema.Types.ObjectId, ref: 'Discounts' }],
  points: {type: Number, required: true },
  email: { type: String, required: true },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = model('User', userSchema);

module.exports = User;

// whats available from social login
// ask for confirmation of CPF to generate more data