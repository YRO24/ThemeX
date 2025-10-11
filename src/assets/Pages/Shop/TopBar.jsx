import React from 'react'
import './TopBar.css'

function TopBar() {
  return (
    <div className="TopBar2">
      <div className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder=""
          />
        </div>
        <span className="search-icon"><span class="material-symbols-outlined">
search
</span></span>
      </div>
      
      <div className="center-section">
        <div className="user-profile">
          <div className="user-avatar-large"><span class="material-symbols-outlined" style={{color:"black"}}>
add_reaction
</span></div>
          <div className="user-greeting">
            <h3>Hi there,</h3>
            <h2>Norah Jones</h2>
          </div>
        </div>
      </div>
      
      <div className="right-section">
        <div className="top-row">
          <div className="notifications"><span class="material-symbols-outlined">
notifications
</span></div>
          <div className="user-avatar-small"><span class="material-symbols-outlined" style={{color:"black"}}>
add_reaction
</span></div>
          <span className="user-name">Norah Jones</span>
        </div>
        <div className="action-buttons">
          <button className="btn">New</button>
          <button className="btn">Upload</button>
          <button className="btn">Share</button>
        </div>
      </div>
    </div>
  )
}

export default TopBar