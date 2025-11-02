import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = ({ 
  onDelete, 
  showIconNames, 
  onToggleIconNames, 
  editBarMode, 
  onToggleEditBarMode, 
  isPoweredOn, 
  onTogglePower,
  onSave,
  isSaving,
  saveStatus,
  screenMode,
  onToggleScreenMode
}) => {
  const navigate = useNavigate();

  const getSaveButtonText = () => {
    if (isSaving) return 'Saving...';
    if (saveStatus === 'success') return 'Saved ✓';
    if (saveStatus === 'error') return 'Error ✗';
    return 'Save';
  };

  const getSaveButtonClass = () => {
    let classes = 'save-button';
    if (isSaving) classes += ' saving';
    if (saveStatus === 'success') classes += ' success';
    if (saveStatus === 'error') classes += ' error';
    return classes;
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        {/* 🔙 Back Button */}
        <button 
          className="top-bar__tool-btn" 
          title="Go Back"
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button 
          className="top-bar__tool-btn" 
          title="Delete Selected"
          onClick={onDelete}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>

        <button 
          className="top-bar__tool-btn" 
          title="Undo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
          </svg>
        </button>

        <button 
          className={`top-bar__tool-btn ${showIconNames ? 'active' : ''}`} 
          title="Toggle Icon Names"
          onClick={onToggleIconNames}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </button>

        <button 
          className={`top-bar__tool-btn ${editBarMode === 'backgrounds' ? 'active' : ''}`} 
          title="Background Mode"
          onClick={onToggleEditBarMode}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>

        <button 
          className="top-bar__tool-btn" 
          title="Settings"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6"></path>
            <path d="m5.64 5.64 4.24 4.24m6 0 4.24-4.24"></path>
            <path d="M1 12h6m6 0h6"></path>
            <path d="m5.64 18.36 4.24-4.24m6 0 4.24 4.24"></path>
          </svg>
        </button>
      </div>

      <div className="top-bar__right">
        {/* 💾 Save button with status */}
        <button 
          className={getSaveButtonClass()} 
          onClick={onSave}
          disabled={isSaving}
        >
          {getSaveButtonText()}
        </button>

        {/* Power button */}
        <button 
          className={`top-bar__tool-btn power-btn ${isPoweredOn ? 'power-on' : 'power-off'}`} 
          title={isPoweredOn ? "Power Off" : "Power On"}
          onClick={onTogglePower}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </button>
        
        <button 
          className={`top-bar__tool-btn ${screenMode === 'lockscreen' ? 'active' : ''}`} 
          title={screenMode === 'lockscreen' ? 'Switch to Home Screen' : 'Switch to Lock Screen'}
          onClick={onToggleScreenMode}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {screenMode === 'lockscreen' ? (
              <>
                <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
                <path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
              </>
            ) : (
              <>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M9 9h6v6H9z"></path>
                <path d="M9 3v2"></path>
                <path d="M15 3v2"></path>
                <path d="M9 19v2"></path>
                <path d="M15 19v2"></path>
                <path d="M3 9h2"></path>
                <path d="M3 15h2"></path>
                <path d="M19 9h2"></path>
                <path d="M19 15h2"></path>
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopBar;