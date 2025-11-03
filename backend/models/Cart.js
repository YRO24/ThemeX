// models/Cart.js should look like this:
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  themeId: { type: String, required: true },
  name: String,
  description: String,
  price: Number,
  category: String,
  preview: [String],
  author: String,
  gradient: String,
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);