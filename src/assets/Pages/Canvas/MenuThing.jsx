import React, { useState } from 'react';
import './MenuThing.css';

const MenuThing = () => {
  const [activeItem, setActiveItem] = useState('menu');

  const menuItems = [
    { id: 'menu', icon: '☰' },
    { id: 'cloud', icon: '☁' },
    { id: 'folder', icon: '📁' },
    { id: 'add', icon: '+' },
  ];

  return (
    <div className="menu-thing">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`menu-thing__item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default MenuThing;