import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get userId
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentUser?._id || currentUser?.id;

  // ✅ Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/wishlist?userId=${userId}`);
        setWishlistItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userId]);

  // ✅ Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${id}?userId=${userId}`);
      setWishlistItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Move to cart
  const handleMoveToCart = async (item) => {
    const token = localStorage.getItem('token');
    
    // Debug logging
    console.log('=== MOVE TO CART DEBUG ===');
    console.log('Full item object:', JSON.stringify(item, null, 2));
    console.log('item.themeId:', item.themeId);
    console.log('item._id:', item._id);
    console.log('User ID:', userId);
    console.log('Token exists:', !!token);
    
    if (!token || !userId || userId === 'guest') {
      alert('⚠️ Please login first.');
      return;
    }

    // Validate item has themeId
    if (!item.themeId) {
      console.error('❌ Missing themeId in item:', item);
      alert('⚠️ This item is missing theme information. Please save it again from the shop.');
      return;
    }

    try {
      const payload = {
        userId: userId,
        themeId: item.themeId.toString(),
        name: item.name,
        description: item.description || 'A beautiful theme',
        price: item.price || 0,
        category: item.category || 'general',
        preview: item.preview || ['💎'],
        author: item.author || 'Unknown',
        gradient: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };

      console.log('Sending payload:', payload);

      // Add to cart
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('Response:', data);

      if (data.success) {
        // Remove from wishlist
        await handleRemove(item._id);
        alert('✅ Moved to cart!');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert(`⚠️ ${data.message}`);
        console.error('Server error:', data);
      }
    } catch (err) {
      console.error('Error moving to cart:', err);
      alert('❌ Failed to move to cart.');
    }
  };

  // ✅ Search filter
  const filteredItems = wishlistItems.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <div className="wishlist-title-row">
            <button className="back-btn" onClick={() => window.history.back()}>
              ← Back
            </button>
            <h1 className="wishlist-title">
              <span className="title-icon">💖</span>
              My Wishlist
            </h1>
          </div>

          <input
            type="text"
            placeholder="🔍 Search saved themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="wishlist-search"
          />

          <div className="wishlist-stats">
            <span className="stat-item">
              <span className="stat-number">{filteredItems.length}</span>
              <span className="stat-label">Saved Themes</span>
            </span>
          </div>
        </div>

        <div className="wishlist-list">
          {filteredItems.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">💔</div>
              <h2>Your wishlist is empty</h2>
              <p>Save your favorite themes to view them here!</p>
              <button className="browse-btn" onClick={() => window.history.back()}>
                Browse Themes
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="wishlist-card">
                <div
                  className="wishlist-preview"
                  style={{ background: item.gradient }}
                >
                  <div className="preview-overlay">
                    <span className="preview-emoji">💎</span>
                  </div>
                </div>

                <div className="wishlist-info">
                  <div className="wishlist-card-header">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="wishlist-author">by {item.author}</p>
                    </div>
                    <span className="wishlist-price">
                      {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="wishlist-actions">
                  
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item._id)}
                    >
                      🗑️ Remove
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

export default Wishlist;