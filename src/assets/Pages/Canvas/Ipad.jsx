import React, { useState } from 'react';
import './Ipad.css';

const Ipad = ({ placedIcons, onIconDrop, onIconUpdate }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggingIconId, setDraggingIconId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    if (draggingIconId) {
      return;
    }

    const iconData = e.dataTransfer.getData('icon');
    if (iconData) {
      const icon = JSON.parse(iconData);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      onIconDrop(icon, { x, y });
    }
  };

  const handleIconDragStart = (e, icon) => {
    setDraggingIconId(icon.id);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    setDragOffset({ x: offsetX, y: offsetY });

    const dragImage = document.createElement('div');
    dragImage.style.opacity = '0';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleIconDragEnd = (e) => {
    if (draggingIconId) {
      const screenElement = document.querySelector('.ipad-screen');
      const rect = screenElement.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      
      onIconUpdate(draggingIconId, { position: { x, y } });
      
      setDraggingIconId(null);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleContextMenu = (e, icon) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      icon: icon
    });
  };

  const handleDeleteIcon = () => {
    if (contextMenu) {
      const updatedIcons = placedIcons.filter(icon => icon.id !== contextMenu.icon.id);
      // This would need to be passed from parent
      setContextMenu(null);
    }
  };

  // Close context menu on click outside
  React.useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  return (
    <div className="ipad-container">
      <div 
        className={`ipad-screen ${isDraggingOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {placedIcons.map((icon) => (
          <div
            key={icon.id}
            className={`placed-icon ${draggingIconId === icon.id ? 'dragging' : ''}`}
            draggable
            onDragStart={(e) => handleIconDragStart(e, icon)}
            onDragEnd={handleIconDragEnd}
            onContextMenu={(e) => handleContextMenu(e, icon)}
            style={{
              position: 'absolute',
              left: `${icon.position.x}px`,
              top: `${icon.position.y}px`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              borderRadius: `${icon.borderRadius}%`,
              backgroundColor: icon.backgroundColor,
              opacity: draggingIconId === icon.id ? 0.5 : icon.transparency / 100,
              boxShadow: icon.shadow ? '0 8px 16px rgba(0,0,0,0.15)' : 'none',
              backgroundImage: icon.image ? `url(${icon.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `
                brightness(${icon.filters.brightness}%)
                contrast(${icon.filters.contrast}%)
                saturate(${icon.filters.saturation}%)
                blur(${icon.filters.blur}px)
                hue-rotate(${icon.filters.hue}deg)
              `,
              transform: 'translate(-50%, -50%)',
              cursor: 'move',
              transition: draggingIconId === icon.id ? 'none' : 'all 0.2s ease',
              pointerEvents: 'auto',
              zIndex: draggingIconId === icon.id ? 1000 : 1
            }}
          >
            <div className="icon-label">{icon.name}</div>
          </div>
        ))}

        {contextMenu && (
          <div 
            className="context-menu"
            style={{
              position: 'fixed',
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`
            }}
          >
            <button onClick={handleDeleteIcon}>Delete</button>
            <button onClick={() => setContextMenu(null)}>Cancel</button>
          </div>
        )}

        <div className="ipad-home-indicator"></div>
      </div>
    </div>
  );
};

export default Ipad;