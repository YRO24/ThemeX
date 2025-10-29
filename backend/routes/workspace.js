const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');

// Get workspace data
router.get('/load', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    
    // Find the most recent workspace for this user
    const workspace = await Workspace.findOne({ userId })
      .sort({ updatedAt: -1 })
      .limit(1);

    if (!workspace) {
      return res.status(404).json({ 
        message: 'No workspace found',
        data: null 
      });
    }

    res.json({
      message: 'Workspace loaded successfully',
      data: workspace
    });
  } catch (error) {
    console.error('Error loading workspace:', error);
    res.status(500).json({ 
      error: 'Failed to load workspace',
      message: error.message 
    });
  }
});

// Save workspace data
router.post('/save', async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const workspaceData = {
      userId,
      icons: req.body.icons || [],
      placedIcons: req.body.placedIcons || [],
      localCollections: req.body.localCollections || [],
      globalCollections: req.body.globalCollections || [],
      favouriteIcons: req.body.favouriteIcons || [],
      backgrounds: req.body.backgrounds || [],
      currentBackground: req.body.currentBackground || null,
      showIconNames: req.body.showIconNames !== undefined ? req.body.showIconNames : true,
      lastSaved: new Date()
    };

    // Update existing workspace or create new one
    const workspace = await Workspace.findOneAndUpdate(
      { userId },
      workspaceData,
      { 
        new: true, 
        upsert: true,
        runValidators: true 
      }
    );

    res.json({
      message: 'Workspace saved successfully',
      data: {
        id: workspace._id,
        lastSaved: workspace.lastSaved
      }
    });
  } catch (error) {
    console.error('Error saving workspace:', error);
    res.status(500).json({ 
      error: 'Failed to save workspace',
      message: error.message 
    });
  }
});

// Delete workspace
router.delete('/delete', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    
    const result = await Workspace.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        message: 'No workspace found to delete' 
      });
    }

    res.json({
      message: 'Workspace deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting workspace:', error);
    res.status(500).json({ 
      error: 'Failed to delete workspace',
      message: error.message 
    });
  }
});

// Get all workspaces (for admin/debugging)
router.get('/all', async (req, res) => {
  try {
    const workspaces = await Workspace.find()
      .sort({ updatedAt: -1 })
      .limit(100);

    res.json({
      message: 'Workspaces retrieved successfully',
      count: workspaces.length,
      data: workspaces
    });
  } catch (error) {
    console.error('Error getting workspaces:', error);
    res.status(500).json({ 
      error: 'Failed to get workspaces',
      message: error.message 
    });
  }
});

module.exports = router;
