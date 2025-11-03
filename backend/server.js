require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow larger payloads for image uploads or theme data
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Import Routes
const { router: authRouter } = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const projectsRouter = require('./routes/projects');
const wishlistRoutes = require('./routes/wishlist');
app.use('/api/wishlist', wishlistRoutes);

const historyRouter = require('./routes/history');
const canvasRoutes = require('./routes/canvas');

// ✅ Use Routes
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRoutes); // Only once!
app.use('/api/projects', projectsRouter);

app.use('/api/history', historyRouter);
app.use('/api/canvas', canvasRoutes);

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request too large. Please use smaller images.',
      error: 'Payload too large'
    });
  }

  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Max request size: 50mb`);
});
