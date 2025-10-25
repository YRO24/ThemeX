import React, { useState, useEffect } from 'react';
import './IconLibrary.css';

const IconLibrary = ({ icons, onSelectIcon, onCreateNew }) => {
  const [storageMode, setStorageMode] = useState('local');

  const handleDragStart = (e, icon) => {
    e.dataTransfer.setData('icon', JSON.stringify(icon));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="icon-library">
      {/* Storage Mode Toggle */}
      <div className="storage-toggle">
        <button 
          className={`toggle-btn ${storageMode === 'local' ? 'active' : ''}`}
          onClick={() => setStorageMode('local')}
        >
          Local Project
        </button>
        <button 
          className={`toggle-btn ${storageMode === 'global' ? 'active' : ''}`}
          onClick={() => setStorageMode('global')}
        >
          Global Library
        </button>
      </div>

      {/* Create New Button */}
      <button className="btn-create-new" onClick={onCreateNew}>
        + Create New Icon
      </button>

      {/* Icons Grid */}
      <div className="icons-grid">
        {icons.length === 0 ? (
          <div className="empty-state">
            <p>No icons yet</p>
            <small>Create your first icon to get started</small>
          </div>
        ) : (
          icons.map((icon, index) => (
            <div 
              key={index} 
              className="icon-card"
              draggable
              onDragStart={(e) => handleDragStart(e, icon)}
              onClick={() => onSelectIcon(icon)}
            >
              <div 
                className="icon-thumbnail"
                style={{
                  backgroundImage: icon.image ? `url(${icon.image})` : 'none',
                  backgroundColor: icon.backgroundColor,
                  borderRadius: `${icon.borderRadius}%`,
                  opacity: icon.transparency / 100,
                  boxShadow: icon.shadow ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                  filter: `
                    brightness(${icon.filters.brightness}%)
                    contrast(${icon.filters.contrast}%)
                    saturate(${icon.filters.saturation}%)
                    blur(${icon.filters.blur}px)
                    hue-rotate(${icon.filters.hue}deg)
                  `
                }}
              />
              <span className="icon-name">{icon.name || 'Untitled'}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IconLibrary;