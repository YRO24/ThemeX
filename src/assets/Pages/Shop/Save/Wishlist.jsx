import React, { useState, useEffect } from 'react';

function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // enable scrolling on mount
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  const wishlistItems = [
    {
      id: 'WISH-001',
      name: 'Ocean Breeze Theme',
      author: 'Blue Horizon',
      addedOn: '2024-10-15',
      gradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
      tags: ['Calm', 'Minimal', 'Aesthetic'],
      price: 5.99,
      isFavorite: true,
    },
    {
      id: 'WISH-002',
      name: 'Sunset Glow Pack',
      author: 'WarmTones',
      addedOn: '2024-10-20',
      gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      tags: ['Bright', 'Gradient', 'Vibrant'],
      price: 4.99,
      isFavorite: false,
    },
    {
      id: 'WISH-003',
      name: 'Galaxy Mode',
      author: 'SpaceArt',
      addedOn: '2024-09-10',
      gradient: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)',
      tags: ['Dark', 'Futuristic', 'Stars'],
      price: 7.49,
      isFavorite: true,
    },
    {
      id: 'WISH-004',
      name: 'Nature Calm Kit',
      author: 'Green Design',
      addedOn: '2024-08-25',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
      tags: ['Organic', 'Fresh', 'Greenery'],
      price: 3.99,
      isFavorite: false,
    },
  ];

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              onClick={() => window.history.back()}
            >
              ← Back to Shop
            </button>
            <h1
              style={{
                color: 'white',
                fontSize: '32px',
                margin: 0,
                fontWeight: '700',
              }}
            >
              💖 Wishlist
            </h1>
          </div>

          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <input
              type="text"
              placeholder="🔍 Search themes or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '15px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </div>

        {/* Wishlist Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '40px' }}>
          {filteredItems.length === 0 ? (
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '60px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🕊️</div>
              <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>No items found</h2>
              <p style={{ color: '#666' }}>Try searching for another theme or author</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '15px',
                    marginBottom: '15px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        color: '#333',
                        fontWeight: '600',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        color: '#666',
                        fontSize: '14px',
                      }}
                    >
                      by {item.author}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#777',
                    }}
                  >
                    Added: {new Date(item.addedOn).toLocaleDateString('en-US')}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '14px',
                      background: item.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    🎨
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '6px 12px',
                            background: '#f3f4f6',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: '#555',
                            fontWeight: '500',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#667eea',
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                      onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                    >
                      🛒 Move to Cart
                    </button>

                    <button
                      style={{
                        background: item.isFavorite ? '#fde68a' : '#f0f0f0',
                        color: '#333',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.background = '#e5e5e5')}
                      onMouseOut={(e) =>
                        (e.target.style.background = item.isFavorite ? '#fde68a' : '#f0f0f0')
                      }
                    >
                      ❤️ {item.isFavorite ? 'Favorited' : 'Add to Favorites'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
