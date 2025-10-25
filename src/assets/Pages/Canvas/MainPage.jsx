import React, { useState } from 'react';
import './mainpage.css';
import TopBar from './TopBar';
import MenuThing from './MenuThing';
import Ipad from './Ipad';
import EditBar from './EditBar';

const MainPage = () => {
  const [icons, setIcons] = useState([]);
  const [placedIcons, setPlacedIcons] = useState([]);

  const handleIconCreate = (newIcon) => {
    const iconWithId = { ...newIcon, id: Date.now() };
    setIcons([...icons, iconWithId]);
  };

  const handleIconDrop = (iconData, position) => {
    const placedIcon = {
      ...iconData,
      id: Date.now(),
      position: position
    };
    setPlacedIcons([...placedIcons, placedIcon]);
  };

  const handleIconUpdate = (id, updates) => {
    setPlacedIcons(placedIcons.map(icon => 
      icon.id === id ? { ...icon, ...updates } : icon
    ));
  };

  const handleIconDelete = (id) => {
    setPlacedIcons(placedIcons.filter(icon => icon.id !== id));
  };

  return (
    <div className="main-page">
      <TopBar 
        onDelete={() => {
          // Delete selected icon - can be enhanced with selection state
          if (placedIcons.length > 0) {
            handleIconDelete(placedIcons[placedIcons.length - 1].id);
          }
        }}
      />
      
      <div className="main-page__content">
        <MenuThing />
        
        <div className="main-page__canvas-area">
          <Ipad 
            placedIcons={placedIcons}
            onIconDrop={handleIconDrop}
            onIconUpdate={handleIconUpdate}
          />
        </div>

        <EditBar 
          icons={icons}
          onIconCreate={handleIconCreate}
        />
      </div>
    </div>
  );
};

export default MainPage;