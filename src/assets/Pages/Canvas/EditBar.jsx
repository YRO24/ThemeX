import React, { useState } from 'react';
import './EditBar.css';
import IconEditor from './IconEditor/IconEditor';
import IconLibrary from './IconLibrary/IconLibrary';

const EditBar = ({ icons, onIconCreate }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [editorMode, setEditorMode] = useState(null);
  const [currentIcon, setCurrentIcon] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const handleSaveIcon = (iconData) => {
    onIconCreate(iconData);
    setActiveTab('templates');
    setEditorMode(null);
    setCurrentIcon(null);
  };

  return (
    <div className="edit-bar">
      <div className="edit-bar__tabs">
        <button 
          className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
        <button 
          className={`tab ${activeTab === 'elements' ? 'active' : ''}`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button 
          className={`tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
      </div>

      <div className="edit-bar__content">
        {activeTab === 'templates' && (
          <IconLibrary 
            icons={icons}
            onSelectIcon={(icon) => {
              setCurrentIcon(icon);
              setEditorMode('edit');
              setActiveTab('elements');
            }}
            onCreateNew={() => {
              setCurrentIcon(null);
              setEditorMode('create');
              setActiveTab('elements');
            }}
          />
        )}
        
        {activeTab === 'elements' && (
          <IconEditor 
            icon={currentIcon}
            mode={editorMode}
            onSave={handleSaveIcon}
            onCancel={() => {
              setActiveTab('templates');
              setEditorMode(null);
            }}
          />
        )}

        {activeTab === 'images' && (
          <div className="image-library">
            <button className="btn-upload" onClick={() => document.getElementById('image-upload').click()}>
              Import Image
            </button>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            {uploadedImages.length > 0 && (
              <div className="icons-grid" style={{ marginTop: '16px' }}>
                {uploadedImages.map((img, index) => (
                  <div key={index} className="icon-card">
                    <div 
                      className="icon-thumbnail" 
                      style={{ backgroundImage: `url(${img.url})` }}
                    />
                    <span className="icon-name">{img.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="edit-bar__actions">
        <button className="btn-secondary">Save Project</button>
        <button className="btn-primary">Export</button>
      </div>
    </div>
  );
};

export default EditBar;