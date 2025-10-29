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
        <span>Dashboard</span>
      </div>
      
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-item active" onClick={() => handleNavClick('/shop')}>
<span className="material-symbols-outlined">
home
</span>
            <span>Home</span>
          </li>
          <li className="nav-item" onClick={() => handleNavClick('/canvas')}>
          <span className="material-symbols-outlined">
brush
</span>
            <span>Canvas</span>
          </li>
          
          <li className="nav-item">
<span className="material-symbols-outlined">
history
</span>
<span>History</span>
          </li>
          <li className="nav-item">
<span className="material-symbols-outlined">
lists
</span>
            <span>Tasks</span>
          </li>
          <li className="nav-item">
<span className="material-symbols-outlined">
group
</span>
            <span>Communities</span>
          </li>
        </ul>
      </nav>
      
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-item">
<span className="material-symbols-outlined">
settings
</span>
            <span>Settings</span>
          </li>
          <li className="nav-item">
<span className="material-symbols-outlined">
elderly
</span>
            <span>Support</span>
<span className="material-symbols-outlined">
elderly_woman
</span>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default SideBar