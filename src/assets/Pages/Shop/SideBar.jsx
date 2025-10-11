// filepath: /Users/Parag/repos/ThemeX/src/assets/Pages/Shop/SideBar.jsx
import React from 'react'
import './SideBar.css'

function SideBar() {
  return (
    <div className="SideBar">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <span>Dashboard</span>
      </div>
      
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-item active">
<span class="material-symbols-outlined">
home
</span>
            <span>Home</span>
          </li>
          <li className="nav-item">
          <span class="material-symbols-outlined">
person
</span>
            <span>Profile</span>
          </li>
          
          <li className="nav-item">
<span class="material-symbols-outlined">
history
</span>
<span>History</span>
          </li>
          <li className="nav-item">
<span class="material-symbols-outlined">
lists
</span>
            <span>Tasks</span>
          </li>
          <li className="nav-item">
<span class="material-symbols-outlined">
group
</span>
            <span>Communities</span>
          </li>
        </ul>
      </nav>
      
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-item">
<span class="material-symbols-outlined">
settings
</span>
            <span>Settings</span>
          </li>
          <li className="nav-item">
<span class="material-symbols-outlined">
elderly
</span>
            <span>Support</span>
<span class="material-symbols-outlined">
elderly_woman
</span>
          </li>

        </ul>
      </nav>
    </div>
  )
}

export default SideBar