const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');

// Get all icons for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';

    const workspace = await Workspace.findOne({ userId });

    if (!workspace) {
      return res.status(404).json({ 
        message: 'No workspace found',
        data: { icons: [], placedIcons: [] }
      });
    }

    res.json({
      message: 'Icons retrieved successfully',
      data: {
        icons: workspace.icons,
        placedIcons: workspace.placedIcons,
        favouriteIcons: workspace.favouriteIcons
      }
    });
  } catch (error) {
    console.error('Error getting icons:', error);
    res.status(500).json({ 
      error: 'Failed to get icons',
      message: error.message 
    });
  }
});

// Add icon to favourites
router.post('/favourites', async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const iconData = req.body.icon;

    const workspace = await Workspace.findOne({ userId });

    if (!workspace) {
      return res.status(404).json({ 
        error: 'Workspace not found' 
      });
    }

    // Check if icon already in favourites
    const existingIndex = workspace.favouriteIcons.findIndex(
      icon => icon._id?.toString() === iconData._id?.toString()
    );

    if (existingIndex > -1) {
      // Remove from favourites
      workspace.favouriteIcons.splice(existingIndex, 1);
      await workspace.save();

      return res.json({
        message: 'Icon removed from favourites',
        data: workspace.favouriteIcons
      });
    }

    // Add to favourites
    workspace.favouriteIcons.push(iconData);
    await workspace.save();

    res.json({
      message: 'Icon added to favourites successfully',
      data: workspace.favouriteIcons
    });
  } catch (error) {
    console.error('Error toggling favourite:', error);
    res.status(500).json({ 
      error: 'Failed to toggle favourite',
      message: error.message 
    });
  }
});

module.exports = router;
