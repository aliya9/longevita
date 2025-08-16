import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    age: 32,
    height: '5\'8"',
    weight: 150,
    goals: ['Improve sleep quality', 'Increase energy levels', 'Reduce stress'],
    preferences: ['Meditation', 'Yoga', 'Healthy eating']
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 Profile</h1>
        <p>Manage your wellness profile and preferences</p>
      </div>

      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {profileData.name.charAt(0)}
            </div>
          </div>
          <div className="profile-info">
            <h2>{profileData.name}</h2>
            <p className="profile-email">{profileData.email}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">32</span>
                <span className="stat-label">Days Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">85%</span>
                <span className="stat-label">Goal Progress</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Protocols</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            Goals
          </button>
          <button
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button
            className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="info-item">
                    <label>Age</label>
                    <input
                      type="number"
                      value={profileData.age}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, age: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="info-item">
                    <label>Height</label>
                    <input
                      type="text"
                      value={profileData.height}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                    />
                  </div>
                  <div className="info-item">
                    <label>Weight (lbs)</label>
                    <input
                      type="number"
                      value={profileData.weight}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, weight: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="profile-actions">
                  {!isEditing ? (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="goals-tab">
              <div className="profile-section">
                <h3>Wellness Goals</h3>
                <div className="goals-list">
                  {profileData.goals.map((goal, index) => (
                    <div key={index} className="goal-item">
                      <div className="goal-content">
                        <span className="goal-text">{goal}</span>
                        <div className="goal-progress">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: `${Math.random() * 100}%`}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary">Add New Goal</button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-tab">
              <div className="profile-section">
                <h3>Wellness Preferences</h3>
                <div className="preferences-grid">
                  {profileData.preferences.map((pref, index) => (
                    <div key={index} className="preference-item">
                      <span className="preference-text">{pref}</span>
                      <button className="remove-preference" aria-label={`Remove ${pref}`}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary">Add Preference</button>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-tab">
              <div className="profile-section">
                <h3>Wellness Progress</h3>
                <div className="progress-charts">
                  <div className="progress-card">
                    <h4>Weekly Activity</h4>
                    <div className="chart-placeholder">
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '45%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
                      <div className="chart-bar" style={{height: '75%'}}></div>
                      <div className="chart-bar" style={{height: '85%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                    </div>
                    <p>Mon Tue Wed Thu Fri Sat Sun</p>
                  </div>
                  <div className="progress-card">
                    <h4>Monthly Trends</h4>
                    <div className="trend-indicator positive">
                      <span>↑ 15%</span>
                      <p>Improvement in sleep quality</p>
                    </div>
                    <div className="trend-indicator positive">
                      <span>↑ 8%</span>
                      <p>Increase in energy levels</p>
                    </div>
                    <div className="trend-indicator neutral">
                      <span>→ 0%</span>
                      <p>Stress levels maintained</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
