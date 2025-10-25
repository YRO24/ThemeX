import React, { useState, useRef, useEffect } from 'react';
import './IconEditor.css';

const IconEditor = ({ icon, mode, onSave, onCancel }) => {
  const [iconData, setIconData] = useState({
    name: '',
    image: null,
    shape: 'rounded-square',
    backgroundColor: '#ffffff',
    transparency: 100,
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0
    },
    size: 80,
    borderRadius: 20,
    shadow: false
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (icon) {
      setIconData(icon);
    }
  }, [icon]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIconData({ ...iconData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateFilter = (filterName, value) => {
    setIconData({
      ...iconData,
      filters: { ...iconData.filters, [filterName]: value }
    });
  };

  const resetIcon = () => {
    setIconData({
      name: '',
      image: null,
      shape: 'rounded-square',
      backgroundColor: '#ffffff',
      transparency: 100,
      filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, hue: 0 },
      size: 80,
      borderRadius: 20,
      shadow: false
    });
  };

  const applyTheme = (theme) => {
    const themes = {
      minimal: { borderRadius: 20, shadow: false, backgroundColor: '#f5f5f5' },
      glassmorphism: { borderRadius: 25, shadow: true, transparency: 80 },
      neumorphism: { borderRadius: 30, shadow: true, backgroundColor: '#e0e5ec' },
      flat: { borderRadius: 10, shadow: false, backgroundColor: '#ffffff' }
    };
    setIconData({ ...iconData, ...themes[theme] });
  };

  const handleSave = () => {
    if (!iconData.name.trim()) {
      alert('Please enter an icon name');
      return;
    }
    onSave(iconData);
  };

  return (
    <div className="icon-editor">
      {/* Name Input */}
      <div className="editor-section">
        <h3>Icon Name</h3>
        <input 
          type="text" 
          className="icon-name-input"
          placeholder="Enter icon name..."
          value={iconData.name}
          onChange={(e) => setIconData({ ...iconData, name: e.target.value })}
        />
      </div>

      {/* Preview */}
      <div className="icon-preview-section">
        <h3>Preview</h3>
        <div 
          className="icon-preview"
          style={{
            width: `${iconData.size}px`,
            height: `${iconData.size}px`,
            borderRadius: `${iconData.borderRadius}%`,
            backgroundColor: iconData.backgroundColor,
            opacity: iconData.transparency / 100,
            boxShadow: iconData.shadow ? '0 8px 16px rgba(0,0,0,0.15)' : 'none',
            backgroundImage: iconData.image ? `url(${iconData.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `
              brightness(${iconData.filters.brightness}%)
              contrast(${iconData.filters.contrast}%)
              saturate(${iconData.filters.saturation}%)
              blur(${iconData.filters.blur}px)
              hue-rotate(${iconData.filters.hue}deg)
            `
          }}
        />
      </div>

      {/* Image Upload */}
      <div className="editor-section">
        <h3>Image</h3>
        <button className="btn-upload" onClick={() => fileInputRef.current.click()}>
          {iconData.image ? 'Change Image' : 'Add Image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Shape Selection */}
      <div className="editor-section">
        <h3>Shape</h3>
        <div className="shape-grid">
          <button 
            className={`shape-btn ${iconData.shape === 'square' ? 'active' : ''}`}
            onClick={() => setIconData({ ...iconData, shape: 'square', borderRadius: 0 })}
          >
            <div className="shape-preview square"></div>
            Square
          </button>
          <button 
            className={`shape-btn ${iconData.shape === 'rounded-square' ? 'active' : ''}`}
            onClick={() => setIconData({ ...iconData, shape: 'rounded-square', borderRadius: 20 })}
          >
            <div className="shape-preview rounded-square"></div>
            Rounded
          </button>
          <button 
            className={`shape-btn ${iconData.shape === 'circle' ? 'active' : ''}`}
            onClick={() => setIconData({ ...iconData, shape: 'circle', borderRadius: 50 })}
          >
            <div className="shape-preview circle"></div>
            Circle
          </button>
        </div>
      </div>

      {/* Color & Transparency */}
      <div className="editor-section">
        <h3>Background</h3>
        <div className="control-group">
          <label>Color</label>
          <input 
            type="color" 
            value={iconData.backgroundColor}
            onChange={(e) => setIconData({ ...iconData, backgroundColor: e.target.value })}
          />
        </div>
        <div className="control-group">
          <label>Transparency: {iconData.transparency}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={iconData.transparency}
            onChange={(e) => setIconData({ ...iconData, transparency: parseInt(e.target.value) })}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="editor-section">
        <h3>Filters</h3>
        <div className="control-group">
          <label>Brightness: {iconData.filters.brightness}%</label>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={iconData.filters.brightness}
            onChange={(e) => updateFilter('brightness', parseInt(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Contrast: {iconData.filters.contrast}%</label>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={iconData.filters.contrast}
            onChange={(e) => updateFilter('contrast', parseInt(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Saturation: {iconData.filters.saturation}%</label>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={iconData.filters.saturation}
            onChange={(e) => updateFilter('saturation', parseInt(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Blur: {iconData.filters.blur}px</label>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={iconData.filters.blur}
            onChange={(e) => updateFilter('blur', parseInt(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Hue Rotate: {iconData.filters.hue}°</label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={iconData.filters.hue}
            onChange={(e) => updateFilter('hue', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Size & Border Radius */}
      <div className="editor-section">
        <h3>Size & Roundness</h3>
        <div className="control-group">
          <label>Size: {iconData.size}px</label>
          <input 
            type="range" 
            min="40" 
            max="200" 
            value={iconData.size}
            onChange={(e) => setIconData({ ...iconData, size: parseInt(e.target.value) })}
          />
        </div>
        <div className="control-group">
          <label>Border Radius: {iconData.borderRadius}%</label>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={iconData.borderRadius}
            onChange={(e) => setIconData({ ...iconData, borderRadius: parseInt(e.target.value) })}
          />
        </div>
        <div className="control-group">
          <label>
            <input 
              type="checkbox" 
              checked={iconData.shadow}
              onChange={(e) => setIconData({ ...iconData, shadow: e.target.checked })}
            />
            Shadow
          </label>
        </div>
      </div>

      {/* Theme Presets */}
      <div className="editor-section">
        <h3>Apply Theme</h3>
        <div className="theme-grid">
          <button className="theme-btn" onClick={() => applyTheme('minimal')}>Minimal</button>
          <button className="theme-btn" onClick={() => applyTheme('glassmorphism')}>Glass</button>
          <button className="theme-btn" onClick={() => applyTheme('neumorphism')}>Neuro</button>
          <button className="theme-btn" onClick={() => applyTheme('flat')}>Flat</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="editor-section">
        <div className="editor-actions">
          <button className="btn-reset" onClick={resetIcon}>Reset</button>
          <button className="btn-save" onClick={handleSave}>
            {mode === 'create' ? 'Create Icon' : 'Update Icon'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconEditor;