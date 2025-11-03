import React, { useState, useEffect } from 'react';
import './CartPage.css';
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  // ✅ FIX: Get userId from user object
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentUser?._id || currentUser?.id || 'guest';

  // ✅ Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId || userId === 'guest') {
        console.log('No user logged in');
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/cart?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setCartItems(data.cart);
          console.log('Cart loaded:', data.cart.length, 'items');
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, [userId]);

  // ✅ Back button
  const handleBackClick = () => {
    navigate("/shop");
  };

  // ✅ Remove item
  const removeItem = async (themeId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${themeId}?userId=${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart);
        // Notify sidebar to update
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // ✅ Apply promo
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.10 });
    } else if (promoCode.toUpperCase() === 'WELCOME') {
      setAppliedPromo({ code: 'WELCOME', discount: 0.15 });
    } else {
      alert('Invalid promo code');
    }
  };

  // ✅ Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const total = subtotal - discount;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Shop
        </button>
        <h1>🛒 Your Cart</h1>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some amazing themes to get started!</p>
              <button className="browse-btn" onClick={handleBackClick}>
                Browse Themes
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div
                  className="item-preview"
                  style={{ background: item.gradient }}
                >
                  <div className="item-emojis">
                    {item.preview.map((emoji, idx) => (
                      <span key={idx}>{emoji}</span>
                    ))}
                  </div>
                </div>

                <div className="item-details">
                  <div className="item-header">
                    <div>
                      <h3>{item.name}</h3>
                      <p className="item-author">by {item.author}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.themeId)}
                    >
                      ×
                    </button>
                  </div>

                  <p className="item-desc">{item.description}</p>

                  <div className="item-footer">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <div className="summary-section">
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="checkout-btn">🔒 Proceed to Checkout</button>

              <div className="promo-section">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>

              <div className="promo-hint">
                <p>💡 Try these codes:</p>
                <p>• SAVE10 - 10% off your order</p>
                <p>• WELCOME - 15% off for new users</p>
              </div>
            </div>

            <div className="included-box">
              <h3>✨ What's Included</h3>
              <ul>
                <li>Lifetime access to themes</li>
                <li>Free updates & new icons</li>
                <li>Installation guide</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;