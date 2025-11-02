// filepath: /Users/Parag/repos/ThemeX/src/assets/Pages/Shop/SideBar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="SideBar">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <span>Shop</span>
      </div>
      
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => handleNavClick('/main')}>
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </li>

          <li className="nav-item" onClick={() => handleNavClick('/history')}>
            <span className="material-symbols-outlined">history</span>
            <span>History</span>
          </li>

          <li className="nav-item" onClick={() => handleNavClick('/cart')}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>Cart</span>
          </li>

          <li className="nav-item" onClick={() => handleNavClick('/save')}>
            <span className="material-symbols-outlined">bookmark</span>
            <span>Saves</span>
          </li>
        </ul>
      </nav>
      
    </div>
  )
}

export default SideBar
