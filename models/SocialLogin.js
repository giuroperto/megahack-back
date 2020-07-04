const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const socialLoginSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  facebookProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const SocialLogin = model('SocialLogin', socialLoginSchema);

module.exports = SocialLogin;
