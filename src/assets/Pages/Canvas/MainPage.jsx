import React, { useState, useEffect } from 'react';
import './mainpage.css';
import TopBar from './TopBar';
import MenuThing from './MenuThing';
import Ipad from './Ipad';
import EditBar from './EditBar';

const MainPage = () => {
  const [icons, setIcons] = useState([]);
  const [placedIcons, setPlacedIcons] = useState([]);
  const [showIconNames, setShowIconNames] = useState(true);
  const [activeView, setActiveView] = useState('canvas'); // canvas, templates, layers, add
  const [editBarMode, setEditBarMode] = useState('icons'); // icons, backgrounds
  const [favouriteIcons, setFavouriteIcons] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentBackground, setCurrentBackground] = useState(null);
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem('themex_workspace');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setIcons(parsed.icons || []);
          setPlacedIcons(parsed.placedIcons || []);
          setFavouriteIcons(parsed.favouriteIcons || []);
          setBackgrounds(parsed.backgrounds || []);
          setCurrentBackground(parsed.currentBackground || null);
          setShowIconNames(parsed.showIconNames !== undefined ? parsed.showIconNames : true);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

    // Save data to localStorage
  const saveToLocalStorage = () => {
    try {
      const dataToSave = {
        icons,
        placedIcons,
        favouriteIcons,
        backgrounds,
        currentBackground,
        showIconNames
      };
      localStorage.setItem('themex_workspace', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

    // Save to backend
  const saveToBackend = async () => {
    try {
      const dataToSave = {
        icons,
        placedIcons,
        favouriteIcons,
        backgrounds,
        currentBackground,
        showIconNames
      };
      
      const response = await fetch('http://localhost:5000/api/workspace/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save to backend');
      }
    } catch (error) {
      console.error('Error saving to backend:', error);
    }
  };

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

  const handleToggleFavourite = (icon) => {
    const isAlreadyFavourite = favouriteIcons.some(fav => fav.id === icon.id);
    if (isAlreadyFavourite) {
      setFavouriteIcons(favouriteIcons.filter(fav => fav.id !== icon.id));
    } else {
      setFavouriteIcons([...favouriteIcons, icon]);
    }
  };

  const handleBackgroundUpload = (backgroundData) => {
    const newBg = { ...backgroundData, id: Date.now() };
    setBackgrounds([...backgrounds, newBg]);
  };

  const handleTogglePower = () => {
    if (isPoweredOn) {
      // Save everything before powering off
      const localSaved = saveToLocalStorage();
      
      // Try to save to backend (will fallback to localStorage if backend not available)
      saveToBackend().then(backendSaved => {
        console.log('Save status - LocalStorage:', localSaved, 'Backend:', backendSaved);
      });
      
      // Power off - clear screen but keep data saved
      setPlacedIcons([]);
      setCurrentBackground(null);
    }
    setIsPoweredOn(!isPoweredOn);
  };

  return (
    <div className="main-page">
      <TopBar 
        onDelete={() => {
          if (placedIcons.length > 0) {
            handleIconDelete(placedIcons[placedIcons.length - 1].id);
          }
        }}
        showIconNames={showIconNames}
        onToggleIconNames={() => setShowIconNames(!showIconNames)}
        editBarMode={editBarMode}
        onToggleEditBarMode={() => setEditBarMode(editBarMode === 'icons' ? 'backgrounds' : 'icons')}
        isPoweredOn={isPoweredOn}
        onTogglePower={handleTogglePower}
      />
      
      <div className="main-page__content">
        <MenuThing 
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <div className="main-page__canvas-area">
          <Ipad 
            placedIcons={placedIcons}
            onIconDrop={handleIconDrop}
            onIconUpdate={handleIconUpdate}
            onIconDelete={handleIconDelete}
            showIconNames={showIconNames}
            currentBackground={currentBackground}
            isPoweredOn={isPoweredOn}
          />
        </div>

        <EditBar 
          icons={icons}
          onIconCreate={handleIconCreate}
          mode={editBarMode}
          favouriteIcons={favouriteIcons}
          onToggleFavourite={handleToggleFavourite}
          backgrounds={backgrounds}
          onBackgroundUpload={handleBackgroundUpload}
          onBackgroundSelect={setCurrentBackground}
          activeView={activeView}
        />
      </div>
    </div>
  );
};

export default MainPage;