import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './mainpage.css';
import TopBar from './TopBar';
import MenuThing from './MenuThing';
import Ipad from './Ipad';
import EditBar from './EditBar';

const API_URL = 'http://localhost:5000/api';

const MainPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isNewDesign = searchParams.get('new') === 'true';
  const projectId = searchParams.get('id') || `default_project`;
  const storageKey = `themex_workspace_${projectId}`;

  // 🔥 CRITICAL: Use a ref to track if we've initialized this project
  const hasInitialized = React.useRef(false);
  const currentProjectId = React.useRef(projectId);
  const wasNewDesign = React.useRef(isNewDesign);

  const [icons, setIcons] = useState([]);
  const [placedIcons, setPlacedIcons] = useState([]);
  const [lockscreenIcons, setLockscreenIcons] = useState([]);
  const [homescreenIcons, setHomescreenIcons] = useState([]);
  const [showIconNames, setShowIconNames] = useState(true);
  const [activeView, setActiveView] = useState('canvas');
  const [editBarMode, setEditBarMode] = useState('icons');
  const [favouriteIcons, setFavouriteIcons] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [lockscreenBackground, setLockscreenBackground] = useState(null);
  const [homescreenBackground, setHomescreenBackground] = useState(null);
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'success', 'error'
  const [screenMode, setScreenMode] = useState('lockscreen'); // 'lockscreen' or 'homescreen'
  

  // 🔥 Reset when projectId or isNewDesign changes
  React.useEffect(() => {
    if (currentProjectId.current !== projectId || wasNewDesign.current !== isNewDesign) {
      console.log(`🔄 Project changed: ${currentProjectId.current} -> ${projectId}, new: ${isNewDesign}`);
      currentProjectId.current = projectId;
      wasNewDesign.current = isNewDesign;
      hasInitialized.current = false;
    }
  }, [projectId, isNewDesign]);

  // ✅ Load project-specific canvas data (backend first, then local fallback)
  useEffect(() => {
    // 🔥 Prevent duplicate loads
    if (hasInitialized.current && currentProjectId.current === projectId && !isNewDesign) {
      console.log(`⏭️ Skipping duplicate load for ${projectId}`);
      return;
    }

    const loadSavedData = async () => {
      console.log(`🔄 Loading data for project: ${projectId}, isNew: ${isNewDesign}`);
      
      if (isNewDesign) {
        // 🔥 Starting new = completely blank canvas
        console.log('🆕 NEW PROJECT - Starting with blank canvas');
        setIcons([]);
        setPlacedIcons([]);
        setLockscreenIcons([]);
        setHomescreenIcons([]);
        setFavouriteIcons([]);
        setBackgrounds([]);
        setLockscreenBackground(null);
        setHomescreenBackground(null);
        setShowIconNames(true);
        // Don't remove localStorage for other projects, just don't load from it
        hasInitialized.current = true;
        return;
      }

      try {
        // Try backend first
        const response = await fetch(`${API_URL}/canvas/${projectId}`);
        if (response.ok) {
          const result = await response.json();
          
          if (result.success && result.data && Object.keys(result.data).length > 0) {
            // Backend has data, use it
            console.log(`✅ Loaded canvas from backend for ${projectId}`);
            setIcons(result.data.icons || []);
            setPlacedIcons(result.data.placedIcons || []);
            setLockscreenIcons(result.data.lockscreenIcons || []);
            setHomescreenIcons(result.data.homescreenIcons || []);
            setFavouriteIcons(result.data.favouriteIcons || []);
            setBackgrounds(result.data.backgrounds || []);
            setLockscreenBackground(result.data.lockscreenBackground || null);
            setHomescreenBackground(result.data.homescreenBackground || null);
            setShowIconNames(
              result.data.showIconNames !== undefined ? result.data.showIconNames : true
            );
            setScreenMode(result.data.screenMode || 'lockscreen');
            hasInitialized.current = true;
            return;
          } else if (result.success && result.data === null) {
            console.log(`📭 No backend data found for ${projectId}, trying localStorage...`);
          }
        } else {
          console.log('⚠️ Backend responded with:', response.status);
        }

        // If backend empty or failed, try localStorage fallback
        const savedLocal = localStorage.getItem(storageKey);
        if (savedLocal) {
          const parsed = JSON.parse(savedLocal);
          console.log(`✅ Loaded canvas from localStorage for ${projectId}`);
          setIcons(parsed.icons || []);
          setPlacedIcons(parsed.placedIcons || []);
          setLockscreenIcons(parsed.lockscreenIcons || []);
          setHomescreenIcons(parsed.homescreenIcons || []);
          setFavouriteIcons(parsed.favouriteIcons || []);
          setBackgrounds(parsed.backgrounds || []);
          setLockscreenBackground(parsed.lockscreenBackground || null);
          setHomescreenBackground(parsed.homescreenBackground || null);
          setShowIconNames(
            parsed.showIconNames !== undefined ? parsed.showIconNames : true
          );
          setScreenMode(parsed.screenMode || 'lockscreen');
        } else {
          // No data found anywhere - start with empty canvas
          console.log(`📝 Starting fresh canvas for ${projectId}`);
          setIcons([]);
          setPlacedIcons([]);
          setLockscreenIcons([]);
          setHomescreenIcons([]);
          setFavouriteIcons([]);
          setBackgrounds([]);
          setLockscreenBackground(null);
          setHomescreenBackground(null);
          setShowIconNames(true);
        }
        hasInitialized.current = true;
      } catch (error) {
        console.error('❌ Error loading canvas data:', error);
        
        // Fallback to localStorage on error
        try {
          const savedLocal = localStorage.getItem(storageKey);
          if (savedLocal) {
            const parsed = JSON.parse(savedLocal);
            console.log(`✅ Loaded canvas from localStorage (after backend error) for ${projectId}`);
            setIcons(parsed.icons || []);
            setPlacedIcons(parsed.placedIcons || []);
            setLockscreenIcons(parsed.lockscreenIcons || []);
            setHomescreenIcons(parsed.homescreenIcons || []);
            setFavouriteIcons(parsed.favouriteIcons || []);
            setBackgrounds(parsed.backgrounds || []);
            setLockscreenBackground(parsed.lockscreenBackground || null);
            setHomescreenBackground(parsed.homescreenBackground || null);
            setShowIconNames(
              parsed.showIconNames !== undefined ? parsed.showIconNames : true
            );
            setScreenMode(parsed.screenMode || 'lockscreen');
          } else {
            // Start fresh on error
            console.log(`📝 Starting fresh canvas after error for ${projectId}`);
            setIcons([]);
            setPlacedIcons([]);
            setLockscreenIcons([]);
            setHomescreenIcons([]);
            setFavouriteIcons([]);
            setBackgrounds([]);
            setLockscreenBackground(null);
            setHomescreenBackground(null);
            setShowIconNames(true);
          }
        } catch (localError) {
          console.error('❌ Error loading from localStorage:', localError);
          // Last resort - empty canvas
          setIcons([]);
          setPlacedIcons([]);
          setLockscreenIcons([]);
          setHomescreenIcons([]);
          setFavouriteIcons([]);
          setBackgrounds([]);
          setLockscreenBackground(null);
          setHomescreenBackground(null);
          setShowIconNames(true);
        }
        hasInitialized.current = true;
      }
    };

    loadSavedData();
  }, [projectId, isNewDesign]); // 🔑 KEY FIX: Depend on BOTH projectId AND isNewDesign

  // ✅ Save data to localStorage (project-specific)
  const saveToLocalStorage = () => {
    try {
      const dataToSave = {
        icons,
        placedIcons,
        lockscreenIcons,
        homescreenIcons,
        favouriteIcons,
        backgrounds,
        lockscreenBackground,
        homescreenBackground,
        showIconNames,
        screenMode,
      };
      
      const jsonString = JSON.stringify(dataToSave);
      const sizeInMB = (new Blob([jsonString]).size / 1024 / 1024).toFixed(2);
      
      console.log(`💾 Attempting to save ${sizeInMB}MB to localStorage for ${projectId}`);
      
      // Skip localStorage if data is too large (> 4MB)
      if (parseFloat(sizeInMB) > 4) {
        console.warn(`⚠️ Data too large for localStorage (> 4MB) for ${projectId}. Skipping local save.`);
        console.log('💡 Backend save is required for this project.');
        return;
      }
      
      localStorage.setItem(storageKey, jsonString);
      console.log(`✅ Saved to localStorage for ${projectId}`);
      
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error(`❌ localStorage is full for ${projectId}! Clearing old data...`);
        
        // Try to clear old project data (keep only current)
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('themex_workspace_') && key !== storageKey) {
            keysToRemove.push(key);
          }
        }
        
        if (keysToRemove.length > 0) {
          keysToRemove.forEach(key => localStorage.removeItem(key));
          console.log(`🗑️ Cleared ${keysToRemove.length} old projects`);
          
          // Try saving again
          try {
            const jsonString = JSON.stringify({
              icons,
              placedIcons,
              lockscreenIcons,
              homescreenIcons,
              favouriteIcons,
              backgrounds,
              lockscreenBackground,
              homescreenBackground,
              showIconNames,
              screenMode,
            });
            localStorage.setItem(storageKey, jsonString);
            console.log(`✅ Saved after cleanup for ${projectId}`);
            return;
          } catch (retryError) {
            console.error(`❌ Still cant save after cleanup for ${projectId}`);
          }
        }
        
        // If still failing, skip localStorage completely
        console.warn(`⚠️ Skipping localStorage for ${projectId}. Backend save is required.`);
        console.log('💡 Consider using smaller images or fewer backgrounds.');
        
      } else {
        console.error(`❌ Error saving to localStorage for ${projectId}:`, error);
      }
    }
  };

  // ✅ Save data to backend (per project)
  const saveToBackend = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    try {
      const dataToSave = {
        projectId,
        data: {
          icons,
          placedIcons,
          lockscreenIcons,
          homescreenIcons,
          favouriteIcons,
          backgrounds,
          lockscreenBackground,
          homescreenBackground,
          showIconNames,
          screenMode,
        },
      };

      console.log(`📤 Saving to backend for project: ${projectId}`);
      console.log('📦 Data summary:', {
        projectId,
        icons: icons.length,
        placedIcons: placedIcons.length,
        backgrounds: backgrounds.length,
        url: `${API_URL}/canvas/save`
      });

      const response = await fetch(`${API_URL}/canvas/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      console.log('📥 Response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('📥 Response body:', result);
        
        // Log the actual error from backend
        if (result.error) {
          console.error('🔴 Backend error details:', result.error);
        }
        if (result.message) {
          console.log('📋 Backend message:', result.message);
        }
      } catch (parseError) {
        console.error('❌ Failed to parse response:', parseError);
        throw new Error(`Server returned invalid JSON (Status: ${response.status})`);
      }

      if (!response.ok || !result.success) {
        const errorMsg = result.message || result.error || `Backend error: ${response.status}`;
        throw new Error(errorMsg);
      }

      console.log(`✅ Canvas for ${projectId} saved successfully to backend!`);
      setSaveStatus('success');
      
      // Clear success message after 2 seconds
      setTimeout(() => setSaveStatus(''), 2000);
      
    } catch (error) {
      console.error(`❌ Error saving to backend for ${projectId}:`, error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      setSaveStatus('error');
      
      // Show error to user
      alert(`Save failed for ${projectId}: ${error.message}\nCheck console for details.`);
      
      // Clear error message after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // ======================= HANDLERS =======================
  const handleIconCreate = (newIcon) => {
    const iconWithId = { ...newIcon, id: Date.now() };
    setIcons([...icons, iconWithId]);
  };

  const handleIconDrop = (iconData, position) => {
    const placedIcon = { ...iconData, id: Date.now(), position };
    
    // Add to screen-specific array
    if (screenMode === 'lockscreen') {
      setLockscreenIcons([...lockscreenIcons, placedIcon]);
    } else {
      setHomescreenIcons([...homescreenIcons, placedIcon]);
    }
    
    // Also add to general placedIcons for backward compatibility
    setPlacedIcons([...placedIcons, placedIcon]);
  };

  const handleIconUpdate = (id, updates) => {
    // Update in screen-specific array
    if (screenMode === 'lockscreen') {
      setLockscreenIcons((prev) =>
        prev.map((icon) => (icon.id === id ? { ...icon, ...updates } : icon))
      );
    } else {
      setHomescreenIcons((prev) =>
        prev.map((icon) => (icon.id === id ? { ...icon, ...updates } : icon))
      );
    }
    
    // Also update general placedIcons
    setPlacedIcons((prev) =>
      prev.map((icon) => (icon.id === id ? { ...icon, ...updates } : icon))
    );
  };

  const handleIconDelete = (id) => {
    // Delete from screen-specific array
    if (screenMode === 'lockscreen') {
      setLockscreenIcons((prev) => prev.filter((icon) => icon.id !== id));
    } else {
      setHomescreenIcons((prev) => prev.filter((icon) => icon.id !== id));
    }
    
    // Also delete from general placedIcons
    setPlacedIcons((prev) => prev.filter((icon) => icon.id !== id));
  };

  // Get current icons based on screen mode
  const getCurrentIcons = () => {
    return screenMode === 'lockscreen' ? lockscreenIcons : homescreenIcons;
  };

  const handleToggleFavourite = (icon) => {
    setFavouriteIcons((prev) =>
      prev.some((fav) => fav.id === icon.id)
        ? prev.filter((fav) => fav.id !== icon.id)
        : [...prev, icon]
    );
  };

  const handleBackgroundUpload = (backgroundData) => {
    const newBg = { ...backgroundData, id: Date.now() };
    setBackgrounds((prev) => [...prev, newBg]);
  };

  const handleBackgroundSelect = (bg) => {
    if (screenMode === 'lockscreen') {
      setLockscreenBackground(bg);
    } else {
      setHomescreenBackground(bg);
    }
  };

  // Get current background based on screen mode
  const getCurrentBackground = () => {
    return screenMode === 'lockscreen' ? lockscreenBackground : homescreenBackground;
  };

  // ⚙️ Power toggle – persists state
  const handleTogglePower = async () => {
    if (isPoweredOn) {
      // When turning OFF → Save first
      saveToLocalStorage();
      await saveToBackend();
    }
    setIsPoweredOn((prev) => !prev);
  };

  // ✅ Manual save handler
  const handleManualSave = async () => {
    saveToLocalStorage();
    await saveToBackend();
  };

  return (
    <div className="main-page">
      <TopBar
        onDelete={() => {
          const currentIcons = getCurrentIcons();
          if (currentIcons.length > 0) {
            handleIconDelete(currentIcons[currentIcons.length - 1].id);
          }
        }}
        showIconNames={showIconNames}
        onToggleIconNames={() => setShowIconNames(!showIconNames)}
        editBarMode={editBarMode}
        onToggleEditBarMode={() =>
          setEditBarMode(editBarMode === 'icons' ? 'backgrounds' : 'icons')
        }
        isPoweredOn={isPoweredOn}
        onTogglePower={handleTogglePower}
        onSave={handleManualSave}
        isSaving={isSaving}
        saveStatus={saveStatus}
        screenMode={screenMode}
        onToggleScreenMode={() => setScreenMode(screenMode === 'lockscreen' ? 'homescreen' : 'lockscreen')}
      />

      <div className="main-page__content">
        <MenuThing activeView={activeView} onViewChange={setActiveView} />

        <div className="main-page__canvas-area">
          <Ipad
            placedIcons={getCurrentIcons()}
            onIconDrop={handleIconDrop}
            onIconUpdate={handleIconUpdate}
            onIconDelete={handleIconDelete}
            showIconNames={showIconNames}
            currentBackground={getCurrentBackground()}
            isPoweredOn={isPoweredOn}
            screenMode={screenMode}
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
          onBackgroundSelect={handleBackgroundSelect}
          activeView={activeView}
          screenMode={screenMode}
        />
      </div>
    </div>
  );
};

export default MainPage;