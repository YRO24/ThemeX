const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Import authenticateToken safely
let authenticateToken;
try {
  const authModule = require('./auth');
  authenticateToken = authModule.authenticateToken;
} catch (error) {
  console.error('Error loading auth module:', error);
}

// Get purchase history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      history: user.purchaseHistory
    });
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get statistics (MOVED BEFORE /:orderId to avoid route conflict)
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const totalOrders = user.purchaseHistory.length;
    const totalSpent = user.purchaseHistory.reduce((sum, p) => sum + p.finalAmount, 0);
    const totalItems = user.purchaseHistory.reduce((sum, p) => sum + p.items.length, 0);
    const totalSaved = user.purchaseHistory.reduce((sum, p) => sum + p.discount, 0);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalSpent: parseFloat(totalSpent.toFixed(2)),
        totalItems,
        totalSaved: parseFloat(totalSaved.toFixed(2)),
        averageOrderValue: totalOrders > 0 ? parseFloat((totalSpent / totalOrders).toFixed(2)) : 0
      }
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single purchase by order ID
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const purchase = user.purchaseHistory.find(p => p.orderId === orderId);
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Purchase not found' });
    }

    res.json({
      success: true,
      purchase
    });
  } catch (error) {
    console.error('Get Purchase Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Request refund for a purchase
router.patch('/:orderId/refund', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const purchase = user.purchaseHistory.find(p => p.orderId === orderId);
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Purchase not found' });
    }

    if (purchase.status === 'refunded') {
      return res.status(400).json({ 
        success: false, 
        message: 'This order has already been refunded' 
      });
    }

    purchase.status = 'refunded';
    await user.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      purchase
    });
  } catch (error) {
    console.error('Refund Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;