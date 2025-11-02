import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const API_URL = "http://localhost:5000/api";

function Main() {
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const endpoint = activeFilter === "trash" ? "/projects/trash" : 
                      activeFilter === "recent" ? "/projects/recent" : "/projects";
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
    fetchProjects();
  }, [activeFilter]);

  const handleOpenProject = async (project) => {
    if (renaming === project.projectId) return;
    
    try {
      await fetch(`${API_URL}/projects/${project.projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ lastOpened: new Date() })
      });
      
      navigate('/canvas', { state: { project } });
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleNewDesign = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          name: `Untitled Project ${projects.filter(p => !p.deleted).length + 1}`
        })
      });
      
      const data = await response.json();
      if (data.success) {
        navigate('/canvas', { state: { project: data.project } });
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (projectId, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    setShowMenu(null);
  };

  const handleRestore = async (projectId, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/restore`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error restoring project:', error);
    }
  };

  const handlePermanentDelete = async (projectId, e) => {
    e.stopPropagation();
    if (window.confirm("Permanently delete this project? This cannot be undone.")) {
      try {
        const response = await fetch(`${API_URL}/projects/${projectId}/permanent`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        
        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error permanently deleting project:', error);
      }
    }
  };

  const handleRename = (projectId, e) => {
    e.stopPropagation();
    const project = projects.find(p => p.projectId === projectId);
    setRenaming(projectId);
    setNewName(project.name);
    setShowMenu(null);
  };

  const saveRename = async (projectId) => {
    if (newName.trim()) {
      try {
        await fetch(`${API_URL}/projects/${projectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({ name: newName.trim() })
        });
        
        fetchProjects();
      } catch (error) {
        console.error('Error renaming project:', error);
      }
    }
    setRenaming(null);
    setNewName("");
  };

  const cancelRename = () => {
    setRenaming(null);
    setNewName("");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getFilteredProjects = () => {
    let filtered = projects;
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredProjects = getFilteredProjects();

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

        {loading ? (
          <div className="empty-state">
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
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
                key={proj.projectId}
                className="card"
                style={{ background: proj.gradient }}
                onClick={() => !proj.deleted && handleOpenProject(proj)}
              >
                {!proj.deleted && (
                  <div className="menu-trigger" onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(showMenu === proj.projectId ? null : proj.projectId);
                  }}>
                    ⋮
                  </div>
                )}
                
                {showMenu === proj.projectId && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => handleRename(proj.projectId, e)}>✏️ Rename</button>
                    <button onClick={(e) => handleDelete(proj.projectId, e)}>🗑️ Delete</button>
                  </div>
                )}

                <div className="overlay">
                  <div className="icon">{proj.preview}</div>
                  {renaming === proj.projectId ? (
                    <div className="rename-input" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveRename(proj.projectId);
                          if (e.key === "Escape") cancelRename();
                        }}
                        autoFocus
                      />
                      <div className="rename-buttons">
                        <button onClick={() => saveRename(proj.projectId)}>✓</button>
                        <button onClick={cancelRename}>✗</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{proj.name}</h3>
                      <p>Last edited: {new Date(proj.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </>
                  )}
                  
                  {proj.deleted && (
                    <div className="trash-actions" onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => handleRestore(proj.projectId, e)}>↺ Restore</button>
                      <button onClick={(e) => handlePermanentDelete(proj.projectId, e)}>✗ Delete Forever</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Profile Modal */}
      {showProfile && userProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👤 Profile</h2>
              <button className="close-btn" onClick={() => setShowProfile(false)}>✕</button>
            </div>
            <div className="profile-details">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {userProfile.firstName[0]}{userProfile.lastName[0]}
                </div>
              </div>
              <div className="profile-info">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{userProfile.firstName} {userProfile.lastName}</span>
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
                  <span className="value">{new Date(userProfile.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
              <button className="edit-profile-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;