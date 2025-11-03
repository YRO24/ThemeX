import React, { useState } from 'react';
import './ShopPage.css';
import SideBar from './SideBar';
import TopBar from './TopBar';

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Get token and user data
  const token = localStorage.getItem('token'); // Fixed from 'authToken'
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const categories = [
    { id: 'all', name: 'All Themes', icon: '🎨' },
    { id: 'minimal', name: 'Minimal', icon: '⚪' },
    { id: 'gradient', name: 'Gradient', icon: '🌈' },
    { id: 'glass', name: 'Glassmorphism', icon: '💎' },
    { id: 'dark', name: 'Dark Mode', icon: '🌙' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
  ];

  const themePackages = [
    {
      id: 1,
      name: 'Minimal iOS Pack',
      description: 'Clean and simple icon pack inspired by iOS design language. Includes 50+ app icons with consistent styling.',
      price: 'Free',
      category: 'minimal',
      rating: 4.8,
      downloads: '12.5K',
      preview: ['📱', '📧', '📷', '🎵'],
      author: 'Design Studio',
      featured: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Gradient Dreams',
      description: 'Vibrant gradient icon collection with smooth color transitions. Perfect for modern and colorful themes.',
      price: '$4.99',
      category: 'gradient',
      rating: 4.9,
      downloads: '8.2K',
      preview: ['🎨', '🖼️', '🌈', '✨'],
      author: 'ColorFlow',
      featured: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Glass Morphism Pro',
      description: 'Professional glassmorphism design with blur effects and transparency. Premium quality icons.',
      price: '$6.99',
      category: 'glass',
      rating: 4.7,
      downloads: '15.3K',
      preview: ['💎', '🔷', '💠', '🔹'],
      author: 'Glass UI',
      featured: false,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'Dark Mode Collection',
      description: 'Elegant dark-themed icons perfect for OLED displays. Includes widgets and device icons.',
      price: '$3.99',
      category: 'dark',
      rating: 4.6,
      downloads: '10.1K',
      preview: ['🌙', '⭐', '🌌', '✨'],
      author: 'Night Owl',
      featured: false,
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    },
    {
      id: 5,
      name: 'Nature Inspired',
      description: 'Organic and earthy icon designs with natural color palettes. Eco-friendly aesthetic.',
      price: 'Free',
      category: 'nature',
      rating: 4.5,
      downloads: '6.8K',
      preview: ['🌿', '🍃', '🌱', '🌳'],
      author: 'Green Design',
      featured: false,
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)'
    },
    {
      id: 6,
      name: 'Neon Nights',
      description: 'Bold neon-style icons with glowing effects. Stand out with vibrant colors and modern design.',
      price: '$5.99',
      category: 'gradient',
      rating: 4.9,
      downloads: '9.4K',
      preview: ['⚡', '💫', '🔥', '💥'],
      author: 'Neon Labs',
      featured: true,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  const filteredThemes = themePackages.filter(theme => {
    const matchesCategory = selectedCategory === 'all' || theme.category === selectedCategory;
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

// Replace BOTH handleAddToCart and handleAddToSaves in ShopPage.jsx:

const handleAddToCart = async (theme) => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (!token || !currentUser) {
    alert('⚠️ Please login first.');
    return;
  }

  // Fix: Use id instead of _id
  const userId = currentUser._id || currentUser.id;
  
  if (!userId) {
    alert('⚠️ User ID not found. Please login again.');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: userId,
        themeId: theme.id.toString(),
        name: theme.name,
        description: theme.description,
        price: theme.price === 'Free' ? 0 : parseFloat(theme.price.replace('$', '')),
        category: theme.category,
        preview: theme.preview,
        author: theme.author,
        gradient: theme.gradient
      })
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ Added to cart!');
    } else {
      alert(`⚠️ ${data.message || 'Failed to add to cart.'}`);
    }
  } catch (err) {
    console.error('Add to Cart Error:', err);
    alert('❌ Server error while adding to cart.');
  }
};

// Replace handleAddToSaves in ShopPage.jsx with this:
const handleAddToSaves = async (theme) => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  console.log('=== SAVING TO WISHLIST ===');
  console.log('Theme ID:', theme.id);

  if (!token || !currentUser) {
    alert('⚠️ Please login first.');
    return;
  }

  const userId = currentUser._id || currentUser.id;

  if (!userId) {
    alert('⚠️ User ID not found. Please login again.');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: userId,
        themeId: theme.id.toString(),  // THIS IS CRITICAL
        name: theme.name,
        author: theme.author,
        gradient: theme.gradient,
        price: theme.price === 'Free' ? 0 : parseFloat(theme.price.replace('$', '')),
        description: theme.description,
        category: theme.category,
        preview: theme.preview
      })
    });

    const data = await res.json();
    console.log('Wishlist response:', data);

    if (data.success) {
      alert('💾 Saved to wishlist!');
    } else {
      alert(`⚠️ ${data.message || 'Failed to save theme.'}`);
    }
  } catch (err) {
    console.error('Add to Saves Error:', err);
    alert('❌ Server error while saving theme.');
  }
};
  // ✅ Add to Wishlist
  // const handleAddToSaves = async (theme) => {
  //   if (!token || !currentUser) {
  //     alert('⚠️ Please login first.');
  //     return;
  //   }

  //   try {
  //     const res = await fetch('http://localhost:5000/api/wishlist', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         userId: currentUser._id,
  //         themeId: theme.id,
  //         name: theme.name,
  //         author: theme.author,
  //         gradient: theme.gradient,
  //         price: theme.price === 'Free' ? 0 : parseFloat(theme.price.replace('$', ''))
  //       })
  //     });

  //     const data = await res.json();

  //     if (data.success) {
  //       alert('💾 Saved to wishlist!');
  //     } else {
  //       alert(`⚠️ ${data.message || 'Failed to save theme.'}`);
  //     }
  //   } catch (err) {
  //     console.error('Add to Saves Error:', err);
  //     alert('❌ Server error while saving theme.');
  //   }
  // };

  return (
    <div className="shop-container">
      <SideBar />
      <TopBar onSearch={setSearchQuery} />
      <div className="main-content">
        <div className="categories-section">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="themes-section">
          <h2 className="section-title">
            {selectedCategory === 'all' ? 'All Themes' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="count">({filteredThemes.length})</span>
          </h2>
          <div className="themes-grid">
            {filteredThemes.map(theme => (
              <div key={theme.id} className="theme-card">
                <div className="theme-preview" style={{ background: theme.gradient }}>
                  <div className="preview-icons">
                    {theme.preview.map((emoji, idx) => (
                      <span key={idx} className="preview-emoji">{emoji}</span>
                    ))}
                  </div>
                </div>
                <div className="theme-content">
                  <h3 className="theme-title">{theme.name}</h3>
                  <p className="theme-author">by {theme.author}</p>
                  <p className="theme-description">{theme.description}</p>
                  <div className="theme-stats">
                    <span className="stat">⭐ {theme.rating}</span>
                    <span className="stat">📥 {theme.downloads}</span>
                  </div>
                  <div className="theme-actions">
                    <span className="theme-price">{theme.price}</span>
                    <div className="action-buttons">
                      <button className="btn-download" onClick={() => handleAddToCart(theme)}>🛒 Add to Cart</button>
                      <button className="btn-save" onClick={() => handleAddToSaves(theme)}>💾 Save</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
