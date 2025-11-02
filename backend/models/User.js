const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastEdited: {
    type: Date,
    default: Date.now
  },
  preview: {
    type: String,
    default: "🎨"
  },
  gradient: {
    type: String,
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  lastOpened: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
  canvasData: {
    type: Object,
    default: {}
  }
});

const cartItemSchema = new mongoose.Schema({
  themeId: {
    type: Number,
    required: true
  },
  name: String,
  description: String,
  price: Number,
  category: String,
  preview: [String],
  author: String,
  gradient: String,
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const wishlistItemSchema = new mongoose.Schema({
  themeId: {
    type: String,
    required: true
  },
  name: String,
  author: String,
  gradient: String,
  tags: [String],
  price: Number,
  isFavorite: {
    type: Boolean,
    default: false
  },
  addedOn: {
    type: Date,
    default: Date.now
  }
});

const purchaseHistorySchema = new mongoose.Schema({
  orderId: String,
  items: [cartItemSchema],
  totalAmount: Number,
  discount: Number,
  finalAmount: Number,
  promoCode: String,
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'refunded'],
    default: 'completed'
  }
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: "UI/UX Designer"
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  projects: [projectSchema],
  cart: [cartItemSchema],
  wishlist: [wishlistItemSchema],
  purchaseHistory: [purchaseHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for total projects
userSchema.virtual('totalProjects').get(function() {
  return this.projects.filter(p => !p.deleted).length;
});

// Virtual for deleted projects
userSchema.virtual('deletedProjects').get(function() {
  return this.projects.filter(p => p.deleted).length;
});

module.exports = mongoose.model('User', userSchema);