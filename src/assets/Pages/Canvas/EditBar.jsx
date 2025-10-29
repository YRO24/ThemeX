import React, { useState } from 'react';
import './EditBar.css';
import IconEditor from './IconEditor/IconEditor';
import IconLibrary from './IconLibrary/IconLibrary';

const EditBar = ({ icons, onIconCreate, mode, favouriteIcons, onToggleFavourite, backgrounds, onBackgroundUpload, onBackgroundSelect, activeView }) => {
  const [activeTab, setActiveTab] = useState('library');
  const [editorMode, setEditorMode] = useState(null);
  const [currentIcon, setCurrentIcon] = useState(null);
  const [selectedIconPreset, setSelectedIconPreset] = useState(null);
  const [selectedIconType, setSelectedIconType] = useState(null);

  const iconTypes = [
    { 
      id: 'app-icon', 
      name: 'App Icon', 
      description: 'Standard app icon',
      icon: '📱'
    },
    { 
      id: 'photo-widget', 
      name: 'Photo Widget', 
      description: 'Display photos in widget style',
      icon: '🖼️'
    },
    { 
      id: 'device-widget', 
      name: 'Connected Devices', 
      description: 'Show connected devices',
      icon: '🔗'
    }
  ];

  const iconPresets = [
    { id: 'minimal', name: 'Minimal', preview: { borderRadius: 20, backgroundColor: '#f5f5f5', shadow: false } },
    { id: 'glass', name: 'Glass', preview: { borderRadius: 25, backgroundColor: '#ffffff', shadow: true, transparency: 80 } },
    { id: 'neuro', name: 'Neumorphism', preview: { borderRadius: 30, backgroundColor: '#e0e5ec', shadow: true } },
    { id: 'gradient', name: 'Gradient', preview: { borderRadius: 20, backgroundColor: '#667eea', shadow: true } },
    { id: 'flat', name: 'Flat', preview: { borderRadius: 10, backgroundColor: '#3498db', shadow: false } },
    { id: 'outline', name: 'Outline', preview: { borderRadius: 20, backgroundColor: 'transparent', shadow: false } },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages([...uploadedImages, { url: event.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUploadLocal = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onBackgroundUpload({ image: event.target.result, name: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveIcon = (iconData) => {
    // Ensure the icon type is preserved
    const iconToSave = {
      ...iconData,
      type: iconData.type || selectedIconType?.id || 'app-icon',
      id: iconData.id || Date.now()
    };
    onIconCreate(iconToSave);
    
    setActiveTab('elements');
    setEditorMode(null);
    setCurrentIcon(null);
    setSelectedIconType(null);
  };

  const handleSelectIconType = (type) => {
    setSelectedIconType(type);
    setEditorMode('create');
    
    // Set default properties based on icon type
    let defaultProps = {
      name: '',
      type: type.id,
      image: null,
      filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, hue: 0 },
      borderRadius: 20,
      backgroundColor: '#ffffff',
      transparency: 100,
      shadow: false,
      size: 80
    };

    if (type.id === 'photo-widget') {
      defaultProps = {
        ...defaultProps,
        size: 160,
        borderRadius: 15,
        shadow: true,
        photos: []
      };
    } else if (type.id === 'device-widget') {
      defaultProps = {
        ...defaultProps,
        size: 140,
        borderRadius: 20,
        backgroundColor: '#1c1c1e',
        shadow: true,
        devices: []
      };
    }

    setCurrentIcon(defaultProps);
  };

  const handleSelectPreset = (preset) => {
    setSelectedIconPreset(preset);
    
    // First show icon type selection
    setActiveTab('elements');
    setSelectedIconType(null);
    setCurrentIcon(null);
  };

  // Show different content based on mode
  if (mode === 'backgrounds') {
    return (
      <div className="edit-bar">
        <div className="edit-bar__header">
          <h2>Backgrounds</h2>
        </div>

        <div className="edit-bar__content">
          <button className="btn-upload" onClick={() => document.getElementById('bg-upload').click()}>
            + Upload Background
          </button>
          <input 
            id="bg-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleBackgroundUploadLocal}
            style={{ display: 'none' }}
          />

          <div className="backgrounds-grid">
            {backgrounds.map((bg, index) => (
              <div 
                key={index} 
                className="background-card"
                onClick={() => onBackgroundSelect(bg)}
              >
                <div 
                  className="background-preview" 
                  style={{ backgroundImage: `url(${bg.image})` }}
                />
                <span className="background-name">{bg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-bar">
      <div className="edit-bar__tabs">
        <button 
          className={`tab ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
        >
          Library
        </button>
        <button 
          className={`tab ${activeTab === 'presets' ? 'active' : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          Presets
        </button>
        <button 
          className={`tab ${activeTab === 'elements' ? 'active' : ''}`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button 
          className={`tab ${activeTab === 'favourites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favourites')}
        >
          Favourites
        </button>
      </div>

      <div className="edit-bar__content">
        {activeTab === 'library' && (
          <div className="library-view">
            <div className="library-header">
              <h3>📱 All Icons</h3>
              <span className="icon-count">{icons.length} icons</span>
            </div>
            
            {icons.length === 0 ? (
              <div className="empty-library">
                <div className="empty-icon">📱</div>
                <p>No icons yet</p>
                <span>Create your first icon to get started</span>
              </div>
            ) : (
              <div className="icons-grid">
                {icons.map((icon) => (
                  <div 
                    key={icon.id} 
                    className="icon-card"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('icon', JSON.stringify(icon));
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    onClick={() => {
                      setCurrentIcon(icon);
                      setEditorMode('edit');
                      setActiveTab('elements');
                    }}
                  >
                    {icon.type === 'photo-widget' ? (
                      <div 
                        className="icon-thumbnail"
                        style={{
                          backgroundImage: icon.photos && icon.photos[0] ? `url(${icon.photos[0]})` : (icon.image ? `url(${icon.image})` : 'none'),
                          backgroundColor: icon.backgroundColor || '#f0f0f0',
                          borderRadius: `${icon.borderRadius}%`,
                          opacity: icon.transparency / 100,
                          boxShadow: icon.shadow ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                        }}
                      />
                    ) : icon.type === 'device-widget' ? (
                      <div 
                        className="icon-thumbnail device-icon"
                        style={{
                          backgroundColor: icon.backgroundColor || '#1c1c1e',
                          borderRadius: `${icon.borderRadius}%`,
                          opacity: icon.transparency / 100,
                          boxShadow: icon.shadow ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px'
                        }}
                      >
                        {icon.selectedDeviceType?.icon || '📱'}
                      </div>
                    ) : (
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
                    )}
                    <span className="icon-name">{icon.name || 'Untitled'}</span>
                  </div>
                ))}
              </div>
            )}
            
            <button 
              className="btn-create-new-fixed"
              onClick={() => {
                setCurrentIcon(null);
                setEditorMode('create');
                setActiveTab('presets');
              }}
            >
              + Create New Icon
            </button>
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="presets-view">
            <h3>Choose Icon Style</h3>
            <div className="presets-grid">
              {iconPresets.map((preset) => (
                <div 
                  key={preset.id} 
                  className="preset-card"
                  onClick={() => handleSelectPreset(preset)}
                >
                  <div 
                    className="preset-preview"
                    style={{
                      borderRadius: `${preset.preview.borderRadius}%`,
                      backgroundColor: preset.preview.backgroundColor,
                      boxShadow: preset.preview.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                      opacity: preset.preview.transparency ? preset.preview.transparency / 100 : 1
                    }}
                  />
                  <span className="preset-name">{preset.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'elements' && (
          <>
            {!selectedIconType ? (
              <div className="icon-type-selection">
                <h3>Choose Icon Type</h3>
                <div className="icon-types-grid">
                  {iconTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className="icon-type-card"
                      onClick={() => handleSelectIconType(type)}
                    >
                      <div className="icon-type-icon">{type.icon}</div>
                      <h4>{type.name}</h4>
                      <p>{type.description}</p>
                    </div>
                  ))}
                </div>
                <button 
                  className="btn-back" 
                  onClick={() => setActiveTab('templates')}
                  style={{ marginTop: '20px' }}
                >
                  ← Back to Collections
                </button>
              </div>
            ) : (
              <div className="icon-editor-wrapper">
                <div className="editor-header">
                  <button 
                    className="btn-back-small"
                    onClick={() => {
                      setSelectedIconType(null);
                      setCurrentIcon(null);
                    }}
                  >
                    ← Change Type
                  </button>
                  <h3>{selectedIconType.name}</h3>
                </div>
                
                <IconEditor 
                  icon={currentIcon}
                  iconType={selectedIconType}
                  mode={editorMode}
                  onSave={handleSaveIcon}
                  onCancel={() => {
                    setActiveTab('elements');
                    setEditorMode(null);
                    setSelectedIconType(null);
                  }}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'favourites' && (
          <div className="favourites-view">
            <div className="favourites-header">
              <h3>⭐ Favourite Icons</h3>
              <span className="icon-count">{favouriteIcons.length} favourites</span>
            </div>
            
            {favouriteIcons.length === 0 ? (
              <div className="empty-favourites">
                <div className="empty-icon">⭐</div>
                <p>No favourites yet</p>
                <span>Mark icons as favourites to see them here</span>
              </div>
            ) : (
              <IconLibrary 
                icons={favouriteIcons}
                onSelectIcon={(icon) => {
                  setCurrentIcon(icon);
                  setEditorMode('edit');
                  setActiveTab('elements');
                }}
                onCreateNew={() => {
                  setCurrentIcon(null);
                  setEditorMode('create');
                  setActiveTab('presets');
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBar;
