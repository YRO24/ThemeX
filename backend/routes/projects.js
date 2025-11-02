const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('./auth');

// Get all projects for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      projects: user.projects
    });
  } catch (error) {
    console.error('Get Projects Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get recent projects (last 10)
router.get('/recent', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const recentProjects = user.projects
      .filter(p => !p.deleted)
      .sort((a, b) => new Date(b.lastOpened) - new Date(a.lastOpened))
      .slice(0, 10);

    res.json({
      success: true,
      projects: recentProjects
    });
  } catch (error) {
    console.error('Get Recent Projects Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get deleted projects
router.get('/trash', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const deletedProjects = user.projects.filter(p => p.deleted);

    res.json({
      success: true,
      projects: deletedProjects
    });
  } catch (error) {
    console.error('Get Deleted Projects Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, preview, gradient, canvasData } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newProject = {
      projectId: Date.now().toString(),
      name: name || `Untitled Project ${user.projects.filter(p => !p.deleted).length + 1}`,
      preview: preview || "🆕",
      gradient: gradient || "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      lastEdited: new Date(),
      lastOpened: new Date(),
      deleted: false,
      canvasData: canvasData || {}
    };

    user.projects.unshift(newProject);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update project
router.put('/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, preview, gradient, canvasData, lastOpened } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const project = user.projects.find(p => p.projectId === projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (name) project.name = name;
    if (preview) project.preview = preview;
    if (gradient) project.gradient = gradient;
    if (canvasData) project.canvasData = canvasData;
    if (lastOpened) project.lastOpened = new Date(lastOpened);
    project.lastEdited = new Date();

    await user.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update Project Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete project (move to trash)
router.delete('/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const project = user.projects.find(p => p.projectId === projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.deleted = true;
    await user.save();

    res.json({
      success: true,
      message: 'Project moved to trash'
    });
  } catch (error) {
    console.error('Delete Project Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Restore project from trash
router.patch('/:projectId/restore', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const project = user.projects.find(p => p.projectId === projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.deleted = false;
    await user.save();

    res.json({
      success: true,
      message: 'Project restored successfully'
    });
  } catch (error) {
    console.error('Restore Project Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Permanently delete project
router.delete('/:projectId/permanent', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.projects = user.projects.filter(p => p.projectId !== projectId);
    await user.save();

    res.json({
      success: true,
      message: 'Project permanently deleted'
    });
  } catch (error) {
    console.error('Permanent Delete Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;