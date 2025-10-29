import React, { useState } from 'react'
import './TopBar.css'

function TopBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="TopBar2">
      <div className="search-section">
        <div className="search-container">
          <span className="search-icon">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search themes and icon packs..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="center-section">
        <div className="user-profile">
          <div className="user-avatar-large">
            <span className="material-symbols-outlined" style={{color:"black"}}>palette</span>
          </div>
          <div className="user-greeting">
            <h3>Welcome to</h3>
            <h2>ThemeX Shop</h2>
          </div>
        </div>
      </div>
      
      <div className="right-section">
        <div className="top-row">
          <div className="notifications">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="user-avatar-small">
            <span className="material-symbols-outlined" style={{color:"black"}}>account_circle</span>
          </div>
          <span className="user-name">Guest</span>
        </div>
        <div className="action-buttons">
          <button className="btn">🎨 My Themes</button>
          <button className="btn">💎 Premium</button>
          <button className="btn">⚙️ Settings</button>
        </div>
      </div>
    </div>
  )
}

export default TopBar