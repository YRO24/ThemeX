import React, { useState } from 'react'
import './ShopPage.css'
import SideBar from './SideBar'
import TopBar from './TopBar'

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    },
  ];

  const filteredThemes = themePackages.filter(theme => {
    const matchesCategory = selectedCategory === 'all' || theme.category === selectedCategory;
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredThemes = themePackages.filter(theme => theme.featured);

  return (
    <div className="shop-container">
      <SideBar />
      <TopBar onSearch={setSearchQuery} />
      <div className="main-content">
        {/* Featured Section */}
        <div className="featured-section">
          <h2 className="section-title">✨ Featured Themes</h2>
          <div className="featured-carousel">
            {featuredThemes.map(theme => (
              <div key={theme.id} className="featured-card" style={{ background: theme.gradient }}>
                <div className="featured-overlay">
                  <div className="featured-info">
                    <h3>{theme.name}</h3>
                    <p>{theme.description.substring(0, 100)}...</p>
                    <div className="featured-meta">
                      <span>⭐ {theme.rating}</span>
                      <span>📥 {theme.downloads}</span>
                      <span className="price-tag">{theme.price}</span>
                    </div>
                  </div>
                  <div className="featured-preview">
                    {theme.preview.map((emoji, idx) => (
                      <span key={idx} className="preview-icon">{emoji}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
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

        {/* Theme Grid */}
        <div className="content-grid">
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
                      <button className="btn-download">
                        {theme.price === 'Free' ? '+ Add' : '🛒 Buy'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar-content">
            <div className="info-card">
              <h3 className="section-title">🎯 Popular This Week</h3>
              <div className="trending-theme">
                <div className="trending-preview" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <span>💎</span>
                </div>
                <div className="trending-details">
                  <h4>Premium Glass Pack</h4>
                  <p>⭐ 4.9 • 2.3K downloads</p>
                </div>
              </div>
              <div className="trending-theme">
                <div className="trending-preview" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <span>🌸</span>
                </div>
                <div className="trending-details">
                  <h4>Pastel Dreams</h4>
                  <p>⭐ 4.8 • 1.8K downloads</p>
                </div>
              </div>
              <div className="trending-theme">
                <div className="trending-preview" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <span>🌊</span>
                </div>
                <div className="trending-details">
                  <h4>Ocean Wave</h4>
                  <p>⭐ 4.7 • 1.5K downloads</p>
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <h3 className="section-title">💡 Tips</h3>
              <div className="info-item">
                <h4 className="info-title">Create Your Own</h4>
                <p className="info-text">Use the Canvas to design custom themes and share with the community!</p>
              </div>
              <div className="info-item">
                <h4 className="info-title">Preview Before Purchase</h4>
                <p className="info-text">Click on any theme to see a detailed preview and sample icons.</p>
              </div>
              <div className="info-item">
                <h4 className="info-title">Updates</h4>
                <p className="info-text">All purchased themes receive free updates and new icons.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage