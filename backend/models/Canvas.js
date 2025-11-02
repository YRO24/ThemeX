// backend/models/Canvas.js
const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
    index: true // Add index for faster queries
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Allow any structure
    required: true,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add these options
  strict: false, // Allow fields not in schema
  timestamps: true // Auto-manage createdAt/updatedAt
});

// Automatically update timestamp before save
CanvasSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add a method to check data size
CanvasSchema.methods.getDataSize = function() {
  return JSON.stringify(this.data).length;
};

module.exports = mongoose.model('Canvas', CanvasSchema);