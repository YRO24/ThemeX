import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

function SideBar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // Get userId
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentUser?._id || currentUser?.id;

  // Fetch cart count
  const fetchCartCount = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cart?userId=${userId}`);
      const data = await res.json();
      if (data.success) {
        setCartCount(data.cart.length);
      }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Poll every 5 seconds as backup
    const interval = setInterval(fetchCartCount, 5000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, [userId]);

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <span className="logo-icon">🎨</span>
        <span className="logo-text">Shop</span>
      </div>
      
      <nav className="nav-items">
        <div className="nav-item" onClick={() => handleNavClick('/main')}>
          <span className="material-icons"></span>
          <span>Home</span>
        </div>
        
        <div className="nav-item" onClick={() => handleNavClick('/history')}>
          <span className="material-icons"></span>
          <span>History</span>
        </div>
        
        <div className="nav-item" onClick={() => handleNavClick('/cart')}>
          <span className="material-icons"></span>
          <span>Cart</span>
          
        </div>
        
        <div className="nav-item" onClick={() => handleNavClick('/save')}>
          <span className="material-icons"></span>
          <span>Saves</span>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;