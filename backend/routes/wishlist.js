const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('./auth');

// Get wishlist items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add item to wishlist
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { themeId, name, author, gradient, tags, price, isFavorite } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if item already in wishlist
    const existingItem = user.wishlist.find(item => item.themeId === themeId);
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item already in wishlist' 
      });
    }

    const wishlistItem = {
      themeId,
      name,
      author,
      gradient,
      tags: tags || [],
      price,
      isFavorite: isFavorite || false,
      addedOn: new Date()
    };

    user.wishlist.push(wishlistItem);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Add to Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove item from wishlist
router.delete('/:themeId', authenticateToken, async (req, res) => {
  try {
    const { themeId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(item => item.themeId !== themeId);
    await user.save();

    res.json({
      success: true,
      message: 'Item removed from wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Remove from Wishlist Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Toggle favorite status
router.patch('/:themeId/favorite', authenticateToken, async (req, res) => {
  try {
    const { themeId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const item = user.wishlist.find(item => item.themeId === themeId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in wishlist' });
    }

    item.isFavorite = !item.isFavorite;
    await user.save();

    res.json({
      success: true,
      message: 'Favorite status updated',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Toggle Favorite Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Move item from wishlist to cart
router.post('/:themeId/move-to-cart', authenticateToken, async (req, res) => {
  try {
    const { themeId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const wishlistItem = user.wishlist.find(item => item.themeId === themeId);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, message: 'Item not found in wishlist' });
    }

    // Check if already in cart
    const inCart = user.cart.find(item => item.themeId.toString() === themeId);
    if (inCart) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item already in cart' 
      });
    }

    // Add to cart (you'll need to provide full cart item details)
    const cartItem = {
      themeId: parseInt(themeId),
      name: wishlistItem.name,
      description: '', // Add description if available
      price: wishlistItem.price,
      category: '', // Add category if available
      preview: [], // Add preview if available
      author: wishlistItem.author,
      gradient: wishlistItem.gradient,
      addedAt: new Date()
    };

    user.cart.push(cartItem);
    
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(item => item.themeId !== themeId);
    
    await user.save();

    res.json({
      success: true,
      message: 'Item moved to cart',
      cart: user.cart,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Move to Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;