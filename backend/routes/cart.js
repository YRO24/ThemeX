const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// ✅ Add to Cart
router.post('/', async (req, res) => {
  try {
    const { userId, themeId, name, description, price, category, preview, author, gradient } = req.body;

    // Log what we received
    console.log('📦 Adding to cart:', { userId, themeId, name, price });

    // Validate required fields
    if (!userId || !themeId) {
      console.log('❌ Missing userId or themeId');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Prevent duplicates
    const existingItem = await Cart.findOne({ userId, themeId });
    if (existingItem) {
      console.log('⚠️ Item already exists in cart');
      return res.status(400).json({ success: false, message: 'Item already in cart' });
    }

    const newItem = new Cart({
      userId,
      themeId,
      name,
      description,
      price,
      category,
      preview,
      author,
      gradient
    });

    await newItem.save();
    console.log('✅ Item added to cart successfully');
    res.status(200).json({ success: true, message: 'Item added to cart', item: newItem });
  } catch (error) {
    console.error('❌ Error adding to cart:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message // Send error to frontend for debugging
    });
  }
});

// ✅ Fetch Cart Items
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('🔍 Fetching cart for userId:', userId);
    
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const cart = await Cart.find({ userId });
    console.log(`✅ Found ${cart.length} items in cart`);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('❌ Error fetching cart:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Remove Item from Cart
router.delete('/:themeId', async (req, res) => {
  try {
    const { userId } = req.query;
    const { themeId } = req.params;

    console.log('🗑️ Removing item:', { userId, themeId });

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    await Cart.findOneAndDelete({ userId, themeId });
    const updatedCart = await Cart.find({ userId });
    console.log('✅ Item removed, cart now has', updatedCart.length, 'items');
    res.status(200).json({ success: true, message: 'Item removed', cart: updatedCart });
  } catch (error) {
    console.error('❌ Error removing item:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;