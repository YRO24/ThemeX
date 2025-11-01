import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

function Main() {
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Portfolio Website",
      lastEdited: "Oct 28, 2025",
      preview: "🎨",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      lastOpened: new Date("2025-10-28"),
      deleted: false,
    },
    {
      id: 2,
      name: "Dark Dashboard",
      lastEdited: "Oct 25, 2025",
      preview: "🌙",
      gradient: "linear-gradient(135deg, #2c3e50 0%, #4b79a1 100%)",
      lastOpened: new Date("2025-10-25"),
      deleted: false,
    },
    {
      id: 3,
      name: "Travel App UI",
      lastEdited: "Oct 20, 2025",
      preview: "✈️",
      gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
      lastOpened: new Date("2025-10-20"),
      deleted: false,
    },
    {
      id: 4,
      name: "E-commerce Site",
      lastEdited: "Oct 15, 2025",
      preview: "🛒",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
      lastOpened: new Date("2025-10-15"),
      deleted: false,
    },
    {
      id: 5,
      name: "Music Player",
      lastEdited: "Oct 10, 2025",
      preview: "🎵",
      gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
      lastOpened: new Date("2025-10-10"),
      deleted: false,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenProject = (project) => {
    if (renaming === project.id) return;
    
    const updatedProjects = projects.map(p => 
      p.id === project.id 
        ? { ...p, lastOpened: new Date(), lastEdited: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
        : p
    );
    setProjects(updatedProjects);
    navigate('/canvas', { state: { project } });
  };

  const handleNewDesign = () => {
    const newProject = {
      id: Date.now(),
      name: `Untitled Project ${projects.filter(p => !p.deleted).length + 1}`,
      lastEdited: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      preview: "🆕",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      lastOpened: new Date(),
      deleted: false,
    };
    setProjects([newProject, ...projects]);
    setActiveFilter("all");
    navigate('/canvas', { state: { project: newProject } });
  };

  const handleDelete = (projectId, e) => {
    e.stopPropagation();
    const updatedProjects = projects.map(p => 
      p.id === projectId ? { ...p, deleted: true } : p
    );
    setProjects(updatedProjects);
    setShowMenu(null);
  };

  const handleRestore = (projectId, e) => {
    e.stopPropagation();
    const updatedProjects = projects.map(p => 
      p.id === projectId ? { ...p, deleted: false } : p
    );
    setProjects(updatedProjects);
  };

  const handlePermanentDelete = (projectId, e) => {
    e.stopPropagation();
    if (window.confirm("Permanently delete this project? This cannot be undone.")) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleRename = (projectId, e) => {
    e.stopPropagation();
    const project = projects.find(p => p.id === projectId);
    setRenaming(projectId);
    setNewName(project.name);
    setShowMenu(null);
  };

  const saveRename = (projectId) => {
    if (newName.trim()) {
      const updatedProjects = projects.map(p => 
        p.id === projectId ? { ...p, name: newName.trim() } : p
      );
      setProjects(updatedProjects);
    }
    setRenaming(null);
    setNewName("");
  };

  const cancelRename = () => {
    setRenaming(null);
    setNewName("");
  };

  const getFilteredProjects = () => {
    let filtered = [];
    
    if (activeFilter === "trash") {
      filtered = projects.filter(p => p.deleted);
    } else {
      const activeProjects = projects.filter(p => !p.deleted);
      
      if (activeFilter === "recent") {
        filtered = activeProjects
          .sort((a, b) => b.lastOpened - a.lastOpened)
          .slice(0, 10);
      } else {
        filtered = activeProjects;
      }
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "UI/UX Designer",
    memberSince: "January 2024",
    totalProjects: projects.filter(p => !p.deleted).length,
    deletedProjects: projects.filter(p => p.deleted).length,
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
  <h1 className="logo">ThemeX</h1>
  <button className="sidebar-btn primary" onClick={handleNewDesign}>
    🎨 Start a New Design
  </button>
  <button 
    className={`sidebar-btn ${activeFilter === "recent" ? "active" : ""}`}
    onClick={() => setActiveFilter("recent")}
  >
    🕐 Recents
  </button>
  <button 
    className={`sidebar-btn ${activeFilter === "all" ? "active" : ""}`}
    onClick={() => setActiveFilter("all")}
  >
    📂 All Projects
  </button>
  <button 
    className="sidebar-btn"
    onClick={() => navigate("/shop")}
  >
    🛍️ Shop
  </button>
  <button 
    className={`sidebar-btn ${activeFilter === "trash" ? "active" : ""}`}
    onClick={() => setActiveFilter("trash")}
  >
    🗑️ Delete
  </button>
  <div className="sidebar-footer">
    <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
      👤 Profile
    </button>
  </div>
</aside>


      {/* Main content */}
      <main className="content">
        <div className="topbar">
          <h2>
            {activeFilter === "recent" ? "Recent Projects (Last 10)" : 
             activeFilter === "trash" ? "Deleted Projects" : "My Projects"}
          </h2>
          <input
            type="text"
            className="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>
              {searchQuery.trim() 
                ? `🔍 No projects found matching "${searchQuery}"` 
                : activeFilter === "trash" 
                  ? "🗑️ No deleted projects" 
                  : "📂 No projects found"}
            </p>
          </div>
        ) : (
          <div className="grid">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="card"
                style={{ background: proj.gradient }}
                onClick={() => !proj.deleted && handleOpenProject(proj)}
              >
                {!proj.deleted && (
                  <div className="menu-trigger" onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(showMenu === proj.id ? null : proj.id);
                  }}>
                    ⋮
                  </div>
                )}
                
                {showMenu === proj.id && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => handleRename(proj.id, e)}>✏️ Rename</button>
                    <button onClick={(e) => handleDelete(proj.id, e)}>🗑️ Delete</button>
                  </div>
                )}

                <div className="overlay">
                  <div className="icon">{proj.preview}</div>
                  {renaming === proj.id ? (
                    <div className="rename-input" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename(proj.id);
                          if (e.key === "Escape") cancelRename();
                        }}
                        autoFocus
                      />
                      <div className="rename-buttons">
                        <button onClick={() => saveRename(proj.id)}>✓</button>
                        <button onClick={cancelRename}>✗</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{proj.name}</h3>
                      <p>Last edited: {proj.lastEdited}</p>
                    </>
                  )}
                  
                  {proj.deleted && (
                    <div className="trash-actions" onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => handleRestore(proj.id, e)}>↺ Restore</button>
                      <button onClick={(e) => handlePermanentDelete(proj.id, e)}>✗ Delete Forever</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👤 Profile</h2>
              <button className="close-btn" onClick={() => setShowProfile(false)}>✕</button>
            </div>
            <div className="profile-details">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{userProfile.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{userProfile.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Role:</span>
                  <span className="value">{userProfile.role}</span>
                </div>
                <div className="info-row">
                  <span className="label">Member Since:</span>
                  <span className="value">{userProfile.memberSince}</span>
                </div>
                <div className="info-row">
                  <span className="label">Active Projects:</span>
                  <span className="value">{userProfile.totalProjects}</span>
                </div>
                <div className="info-row">
                  <span className="label">Deleted Projects:</span>
                  <span className="value">{userProfile.deletedProjects}</span>
                </div>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;