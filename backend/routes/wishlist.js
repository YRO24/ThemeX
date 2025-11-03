const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// ✅ Add to Wishlist
router.post('/', async (req, res) => {
  try {
    const { userId, themeId, name, author, gradient, price } = req.body;

    console.log('📝 Adding to wishlist:', { userId, themeId, name });

    if (!userId || !themeId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({ userId, themeId });
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item already in wishlist' 
      });
    }

    const newItem = new Wishlist({
      userId,
      themeId,
      name,
      author,
      gradient,
      price
    });

    await newItem.save();
    console.log('✅ Item added to wishlist');
    res.status(200).json({ success: true, message: 'Added to wishlist', item: newItem });
  } catch (error) {
    console.error('❌ Error adding to wishlist:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// ✅ Get Wishlist Items
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    console.log('🔍 Fetching wishlist for userId:', userId);

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    const wishlist = await Wishlist.find({ userId });
    console.log(`✅ Found ${wishlist.length} items in wishlist`);
    res.status(200).json(wishlist);
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// ✅ Remove from Wishlist
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    console.log('🗑️ Removing from wishlist:', { id, userId });

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    await Wishlist.findByIdAndDelete(id);
    console.log('✅ Item removed from wishlist');
    res.status(200).json({ success: true, message: 'Item removed' });
  } catch (error) {
    console.error('❌ Error removing from wishlist:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;