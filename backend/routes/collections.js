const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');

// Get all collections for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const library = req.query.library; // 'local' or 'global'

    const workspace = await Workspace.findOne({ userId });

    if (!workspace) {
      return res.status(404).json({ 
        message: 'No workspace found',
        data: { localCollections: [], globalCollections: [] }
      });
    }

    let collections;
    if (library === 'local') {
      collections = workspace.localCollections;
    } else if (library === 'global') {
      collections = workspace.globalCollections;
    } else {
      collections = {
        local: workspace.localCollections,
        global: workspace.globalCollections
      };
    }

    res.json({
      message: 'Collections retrieved successfully',
      data: collections
    });
  } catch (error) {
    console.error('Error getting collections:', error);
    res.status(500).json({ 
      error: 'Failed to get collections',
      message: error.message 
    });
  }
});

// Create a new collection
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const { name, library = 'local' } = req.body;

    if (!name) {
      return res.status(400).json({ 
        error: 'Collection name is required' 
      });
    }

    const workspace = await Workspace.findOne({ userId });

    if (!workspace) {
      return res.status(404).json({ 
        error: 'Workspace not found' 
      });
    }

    const newCollection = {
      name,
      library,
      icons: []
    };

    if (library === 'local') {
      workspace.localCollections.push(newCollection);
    } else {
      workspace.globalCollections.push(newCollection);
    }

    await workspace.save();

    res.json({
      message: 'Collection created successfully',
      data: newCollection
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ 
      error: 'Failed to create collection',
      message: error.message 
    });
  }
});

// Add icon to collection
router.post('/:collectionId/icons', async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const { collectionId } = req.params;
    const iconData = req.body.icon;

    const workspace = await Workspace.findOne({ userId });

    if (!workspace) {
      return res.status(404).json({ 
        error: 'Workspace not found' 
      });
    }

    // Find collection in either local or global
    let collection = workspace.localCollections.id(collectionId);
    if (!collection) {
      collection = workspace.globalCollections.id(collectionId);
    }

    if (!collection) {
      return res.status(404).json({ 
        error: 'Collection not found' 
      });
    }

    collection.icons.push(iconData);
    await workspace.save();

    res.json({
      message: 'Icon added to collection successfully',
      data: collection
    });
  } catch (error) {
    console.error('Error adding icon to collection:', error);
    res.status(500).json({ 
      error: 'Failed to add icon to collection',
      message: error.message 
    });
  }
});

module.exports = router;
