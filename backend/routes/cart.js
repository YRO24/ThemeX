const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('./auth');

// Get cart items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add item to cart
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { themeId, name, description, price, category, preview, author, gradient } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if item already in cart
    const existingItem = user.cart.find(item => item.themeId === themeId);
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item already in cart' 
      });
    }

    const cartItem = {
      themeId,
      name,
      description,
      price,
      category,
      preview,
      author,
      gradient,
      addedAt: new Date()
    };

    user.cart.push(cartItem);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      cart: user.cart
    });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/:themeId', authenticateToken, async (req, res) => {
  try {
    const { themeId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cart = user.cart.filter(item => item.themeId.toString() !== themeId);
    await user.save();

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart: user.cart
    });
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Clear cart
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Checkout (move cart to purchase history)
router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const { promoCode, discount } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    const totalAmount = user.cart.reduce((sum, item) => sum + item.price, 0);
    const discountAmount = discount || 0;
    const finalAmount = totalAmount - discountAmount;

    const purchase = {
      orderId: `ORD-${Date.now()}`,
      items: user.cart,
      totalAmount,
      discount: discountAmount,
      finalAmount,
      promoCode: promoCode || '',
      purchaseDate: new Date(),
      status: 'completed'
    };

    user.purchaseHistory.unshift(purchase);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Checkout successful',
      order: purchase
    });
  } catch (error) {
    console.error('Checkout Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;