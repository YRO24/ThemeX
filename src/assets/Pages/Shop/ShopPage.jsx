import React from 'react'
import './ShopPage.css'
import SideBar from './SideBar'
import TopBar from './TopBar'

function ShopPage() {
  return (
    <div className="shop-container">
      <SideBar />
      <TopBar />
      <div className="main-content">
        <div className="content-grid">
          <div className="projects-section">
            <h2 className="section-title">Your Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3 className="project-title">Why are dogs terrible dancers?</h3>
                <p className="project-description">
                  Doggo ipsum extremely cuuuuute snoot many pats wow very biscit shibe boofers, floofs I am bekom fat big ol pupper very good spot. heckin sub woofer boof.
                </p>
                <div className="project-actions">
                  <button className="action-btn">📌</button>
                  <button className="action-btn">🗑️</button>
                  <button className="action-btn">🔗</button>
                </div>
              </div>
              <div className="project-card">
                <h3 className="project-title">Because they have two left feet!</h3>
                <p className="project-description">
                  Big ol doggorino very jealous pupper very good spot boofers doge, most angery pupper I have ever seen fluffer vvv.
                </p>
                <div className="project-actions">
                  <button className="action-btn">📌</button>
                  <button className="action-btn">🗑️</button>
                  <button className="action-btn">🔗</button>
                </div>
              </div>
              <div className="project-card">
                <h3 className="project-title">What does a scientist's dog do with bones?</h3>
                <p className="project-description">
                  Blop super chub fat boi puggorino yapper clouds noodle horse such treat, adorable doggo yapper borking doggo ur givin me a spook doggorino waggy wags.
                </p>
                <div className="project-actions">
                  <button className="action-btn">📌</button>
                  <button className="action-btn">🗑️</button>
                  <button className="action-btn">🔗</button>
                </div>
              </div>
              <div className="project-card">
                <h3 className="project-title">Barium!</h3>
                <p className="project-description">
                  Sub woofer you are doing me a frighten thicc boofers long water shoob, tungg fluffer super chub.
                </p>
                <div className="project-actions">
                  <button className="action-btn">📌</button>
                  <button className="action-btn">🗑️</button>
                  <button className="action-btn">🔗</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-content">
            <div className="info-card">
              <h3 className="section-title">Announcements</h3>
              <div className="info-item">
                <h4 className="info-title">New Update</h4>
                <p className="info-text">Our page is growing by four feet</p>
              </div>
              <div className="info-item">
                <h4 className="info-title">Dog's name</h4>
                <p className="info-text">I can't decide whether to call the dog Sudo or Byte.</p>
              </div>
              <div className="info-item">
                <h4 className="info-title">Site Maintenance</h4>
                <p className="info-text">Instead of lorem ipsum I have used <span style={{textDecoration: 'underline'}}>Doggo Ipsum</span>, check it out!</p>
              </div>
            </div>
            
            <div className="info-card">
              <h3 className="section-title">Trending</h3>
              <div className="trending-user">
                <div className="user-pic">T</div>
                <div className="user-details">
                  <h4>@tegan</h4>
                  <p>World Peace Builder</p>
                </div>
              </div>
              <div className="trending-user">
                <div className="user-pic">M</div>
                <div className="user-details">
                  <h4>@morgan</h4>
                  <p>Super Cool Project</p>
                </div>
              </div>
              <div className="trending-user">
                <div className="user-pic">K</div>
                <div className="user-details">
                  <h4>@kendall</h4>
                  <p>Life Changing App</p>
                </div>
              </div>
              <div className="trending-user">
                <div className="user-pic">A</div>
                <div className="user-details">
                  <h4>@alex</h4>
                  <p>No Traffic Maker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage