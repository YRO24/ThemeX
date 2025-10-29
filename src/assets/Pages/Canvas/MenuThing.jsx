import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MenuThing.css';

const MenuThing = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'canvas', icon: '🎨', label: 'Canvas', route: '/canvas' },
    { id: 'shop', icon: '🛍️', label: 'Shop', route: '/shop' },
    { id: 'layers', icon: '📁', label: 'Layers', action: 'layers' },
    { id: 'settings', icon: '⚙️', label: 'Settings', action: 'settings' },
  ];

  const handleItemClick = (item) => {
    if (item.route) {
      // Navigate to different route
      navigate(item.route);
    } else if (item.action && onViewChange) {
      // Call view change handler for local actions
      onViewChange(item.action);
    }
  };

  const isActive = (item) => {
    if (item.route) {
      return location.pathname === item.route;
    }
    return activeView === item.id;
  };

  return (
    <div className="menu-thing">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`menu-thing__item ${isActive(item) ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default MenuThing;