import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Shield, Calendar, Settings, LogOut } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="profile-loading container">
        <div className="glass-card">
          <h2>Please log in to view your profile.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page container">
      {/* ... header remains the same ... */}
      <div className="profile-header">
        <div className="profile-banner">
          <div className="banner-glow"></div>
        </div>
        <div className="profile-info-bar">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <UserIcon size={60} />
            </div>
            <div className="status-indicator online"></div>
          </div>
          <div className="profile-main-meta">
            <h1 className="profile-name">{user.name}</h1>
            <div className="profile-badges">
              <span className={`role-badge ${user.role}`}>{user.role.toUpperCase()}</span>
              <span className="level-badge">LVL 15</span>
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn btn-secondary">Edit Profile</button>
            <button className="btn btn-icon settings-btn"><Settings size={20} /></button>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        <aside className="profile-sidebar">
          <div className="glass-card profile-details">
            <h3>Account Information</h3>
            <div className="detail-item">
              <Mail size={18} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
            </div>
            <div className="detail-item">
              <Shield size={18} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Account Type</span>
                <span className="detail-value">{user.role === 'seller' ? 'Verified Seller' : 'Subscriber'}</span>
              </div>
            </div>
            <div className="detail-item">
              <Calendar size={18} className="detail-icon" />
              <div className="detail-text">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            
            <div className="sidebar-divider"></div>
            
            <button className="logout-action-btn" onClick={logout}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        <main className="profile-main-content">
          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              Library
            </button>
            <button 
              className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
          </div>

          {activeTab === 'overview' && (
            <section className="activity-section fade-in">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <button className="text-link">View all</button>
              </div>
              <div className="activity-list">
                {user.library && user.library.length > 0 ? (
                  user.library.slice(0, 3).reverse().map((game, index) => (
                    <div key={index} className="activity-item glass-card">
                      <div className="activity-icon-box purchase">💰</div>
                      <div className="activity-details">
                        <p>Purchased <strong>{game.title}</strong></p>
                        <span className="activity-time">
                          {new Date(game.purchaseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-item glass-card">
                    <p>No recent activity. Start exploring the store!</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {(activeTab === 'overview' || activeTab === 'library') && (
            <section className="library-preview fade-in">
              <div className="section-header">
                <h3>{activeTab === 'overview' ? 'Library Preview' : 'My Game Library'}</h3>
                {activeTab === 'overview' && (
                  <button className="text-link" onClick={() => setActiveTab('library')}>View full library</button>
                )}
              </div>
              <div className="game-preview-grid">
                {user.library && user.library.length > 0 ? (
                  user.library.map((game) => (
                    <div key={game.gameId} className="mini-game-card glass-card">
                      <img src={game.image} alt={game.title} className="mini-card-img" />
                      <div className="mini-card-info">
                        <h4>{game.title}</h4>
                        <span>Ready to play</span>
                        <button className="play-btn">PLAY</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-games">You don't own any games yet.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === 'inventory' && (
            <div className="empty-inventory glass-card fade-in">
              <p>Your digital inventory is empty. Complete quests or purchases to earn items.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
