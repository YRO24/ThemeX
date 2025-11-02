// backend/routes/canvas.js
const express = require('express');
const router = express.Router();
const Canvas = require('../models/Canvas');

// ✅ Save or update canvas for a specific project
router.post('/save', async (req, res) => {
  try {
    console.log('📥 Received save request');
    console.log('Body keys:', Object.keys(req.body));
    
    const { projectId, data, userId } = req.body;

    if (!projectId) {
      console.error('❌ Missing projectId');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing projectId' 
      });
    }

    if (!data) {
      console.error('❌ Missing data');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing data object' 
      });
    }

    console.log(`Saving canvas for project: ${projectId}`);
    console.log('Data structure:', {
      icons: data.icons?.length || 0,
      placedIcons: data.placedIcons?.length || 0,
      backgrounds: data.backgrounds?.length || 0
    });

    // ✅ Use upsert to save or update safely
    const updatedCanvas = await Canvas.findOneAndUpdate(
      { projectId },
      { 
        projectId,
        data,
        userId: userId || null,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true
      } 
    );

    console.log('✅ Canvas saved successfully');
    return res.json({ 
      success: true, 
      message: 'Canvas saved successfully', 
      canvas: updatedCanvas 
    });
    
  } catch (error) {
    console.error('❌ Detailed save error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    // Check if it's a MongoDB size error
    if (error.message && error.message.includes('document')) {
      return res.status(413).json({ 
        success: false, 
        message: 'Data too large. Try compressing images or using fewer/smaller images.',
        error: 'Document size exceeded'
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while saving canvas',
      error: error.message
    });
  }
});

// ✅ Fetch canvas data for a specific project
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(`📥 Fetching canvas for project: ${projectId}`);
    
    const canvas = await Canvas.findOne({ projectId });

    if (!canvas) {
      console.log('No canvas found, returning empty data');
      return res.json({ 
        success: true, 
        data: null,
        message: 'No canvas found for this project'
      });
    }

    console.log('✅ Canvas found');
    return res.json({ 
      success: true, 
      data: canvas.data 
    });
    
  } catch (error) {
    console.error('❌ Error fetching canvas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching canvas',
      error: error.message
    });
  }
});

// ✅ Delete canvas for a project
router.delete('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(`🗑️ Deleting canvas for project: ${projectId}`);
    
    const result = await Canvas.findOneAndDelete({ projectId });
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found'
      });
    }
    
    console.log('✅ Canvas deleted');
    return res.json({
      success: true,
      message: 'Canvas deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Error deleting canvas:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting canvas',
      error: error.message
    });
  }
});

module.exports = router;