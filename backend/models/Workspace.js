const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'app-icon' },
  image: String,
  shape: String,
  backgroundColor: String,
  transparency: Number,
  filters: {
    brightness: Number,
    contrast: Number,
    saturation: Number,
    blur: Number,
    hue: Number
  },
  size: Number,
  borderRadius: Number,
  shadow: Boolean,
  position: {
    x: Number,
    y: Number
  },
  photos: [String],
  devices: [String]
}, { _id: true });

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  library: { type: String, enum: ['local', 'global'], default: 'local' },
  icons: [IconSchema]
}, { _id: true });

const BackgroundSchema = new mongoose.Schema({
  name: String,
  image: String
}, { _id: true });

const WorkspaceSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default-user' // For now, until we implement authentication
  },
  icons: [IconSchema],
  placedIcons: [IconSchema],
  localCollections: [CollectionSchema],
  globalCollections: [CollectionSchema],
  favouriteIcons: [IconSchema],
  backgrounds: [BackgroundSchema],
  currentBackground: BackgroundSchema,
  showIconNames: {
    type: Boolean,
    default: true
  },
  lastSaved: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
WorkspaceSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
