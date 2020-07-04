const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const businessSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  postcode: Number,
  coordinates: [{ type: Number, required: true }],
  profilePicture: String,
  menu: String,
  pictures: [String],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
  discounts: [{ type: Schema.Types.ObjectId, ref: 'Discounts' }],
  busy: [{ type: String, enum: ['Lotado', 'Movimentado', 'Moderado', 'Vazio'] }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Business = model('Business', businessSchema);

module.exports = Business;

//require CNPJ
