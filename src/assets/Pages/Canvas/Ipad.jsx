import React, { useState } from 'react';
import './Ipad.css';

const Ipad = ({ 
  placedIcons, 
  onIconDrop, 
  onIconUpdate, 
  onIconDelete, 
  showIconNames, 
  currentBackground, 
  isPoweredOn, 
  screenMode 
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggingIconId, setDraggingIconId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggingIconId ? 'move' : 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (draggingIconId) {
      onIconUpdate(draggingIconId, { position: { x, y } });
      setDraggingIconId(null);
      return;
    }

    const iconData = e.dataTransfer.getData('icon');
    if (iconData) {
      const icon = JSON.parse(iconData);
      onIconDrop(icon, { x, y });
    }
  };

  const handleIconDragStart = (e, icon) => {
    e.stopPropagation();
    setDraggingIconId(icon.id);
    e.dataTransfer.effectAllowed = 'move';
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
    if (contextMenu && onIconDelete) {
      onIconDelete(contextMenu.icon.id);
      setContextMenu(null);
    }
  };

  React.useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  return (
    <div className="ipad-container">
      <div 
        className={`ipad-screen ${isDraggingOver ? 'drag-over' : ''} ${!isPoweredOn ? 'powered-off' : ''} ${screenMode === 'homescreen' ? 'homescreen-mode' : 'lockscreen-mode'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: currentBackground ? `url(${currentBackground.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {isPoweredOn ? (
          <>
            {/* Status Bar */}
            <div className="ipad-status-bar">
              <div className="status-left">{formatTime(currentTime)}</div>
              <div className="status-right">
                <span>📶</span>
                <span>📡</span>
                <span>🔋 100%</span>
              </div>
            </div>

            {/* Lock Screen Widget - Only show on lockscreen mode */}
            {screenMode === 'lockscreen' && (
              <div className="lock-widget">
                <div className="time-large">{formatTime(currentTime)}</div>
                <div className="date-text">{formatDate()}</div>
              </div>
            )}

            {/* Placed Icons */}
            {placedIcons.map((icon) => (
              <div
                key={icon.id}
                data-icon-id={icon.id}
                className={`placed-icon ${draggingIconId === icon.id ? 'dragging' : ''} ${icon.type || 'app-icon'}`}
                draggable
                onDragStart={(e) => handleIconDragStart(e, icon)}
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
                {/* Icon Type Specific Content */}
                {icon.type === 'photo-widget' && (
                  <div className="photo-widget-content">
                    {icon.photos && icon.photos.length > 0 ? (
                      <div className="photo-display" style={{ backgroundImage: `url(${icon.photos[0]})` }} />
                    ) : icon.image ? (
                      <div className="photo-display" style={{ backgroundImage: `url(${icon.image})` }} />
                    ) : (
                      <div className="photo-placeholder">
                        <span>🖼️</span>
                        <span>Photos</span>
                      </div>
                    )}
                  </div>
                )}
                
                {icon.type === 'device-widget' && (
                  <div className="device-widget-content">
                    {icon.selectedDeviceType ? (
                      <>
                        <div className="device-header">
                          <span className="device-icon-display">{icon.selectedDeviceType.icon}</span>
                          <span className="device-title">{icon.selectedDeviceType.name}</span>
                        </div>
                        <div className="device-battery-display">
                          <div className="battery-bar">
                            <div 
                              className="battery-bar-fill"
                              style={{ width: `${icon.selectedDeviceType.battery}%` }}
                            />
                            <div className="battery-bar-tip" />
                          </div>
                          <span className="battery-text">{icon.selectedDeviceType.battery}%</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="device-header">
                          <span className="device-icon-display">🔗</span>
                          <span className="device-title">Devices</span>
                        </div>
                        <div className="device-list">
                          <div className="device-item">No devices</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                <div className="icon-label" style={{ opacity: showIconNames ? 1 : 0 }}>
                  {icon.name}
                </div>
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

            {/* Screen Mode Indicator */}
            <div className="screen-mode-badge">
              {screenMode === 'lockscreen' ? '🔒 Lock Screen' : '🏠 Home Screen'}
            </div>
          </>
        ) : (
          <div className="power-off-screen">
            <div className="power-off-message">Device is powered off</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ipad;