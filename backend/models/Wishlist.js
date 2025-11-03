const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  themeId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  author: String,
  gradient: String,
  price: {
    type: Number,
    default: 0
  },
  description: String,
  category: String,
  preview: [String]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Wishlist', wishlistSchema);