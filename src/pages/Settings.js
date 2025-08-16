import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      dailyReminders: true,
      weeklyReports: true,
      communityUpdates: false,
      expertTips: true,
      soundEnabled: true,
      vibrationEnabled: false
    },
    privacy: {
      profileVisibility: 'friends',
      activitySharing: true,
      dataAnalytics: false,
      locationSharing: false
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false,
      animations: true
    },
    account: {
      emailNotifications: true,
      twoFactorAuth: false,
      autoBackup: true,
      dataRetention: '1year'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log('Settings saved:', settings);
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setSettings({
      notifications: {
        dailyReminders: true,
        weeklyReports: true,
        communityUpdates: false,
        expertTips: true,
        soundEnabled: true,
        vibrationEnabled: false
      },
      privacy: {
        profileVisibility: 'friends',
        activitySharing: true,
        dataAnalytics: false,
        locationSharing: false
      },
      appearance: {
        theme: 'light',
        fontSize: 'medium',
        compactMode: false,
        animations: true
      },
      account: {
        emailNotifications: true,
        twoFactorAuth: false,
        autoBackup: true,
        dataRetention: '1year'
      }
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Customize your Longevita experience</p>
      </div>

      <div className="settings-content">
        {/* Settings Header */}
        <div className="settings-header">
          <div className="settings-actions">
            <button 
              className="btn btn-primary"
              onClick={handleSaveSettings}
            >
              💾 Save Changes
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleResetSettings}
            >
              🔄 Reset to Default
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
          <button
            className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            🔒 Privacy
          </button>
          <button
            className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            🎨 Appearance
          </button>
          <button
            className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            👤 Account
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'notifications' && (
            <div className="notifications-tab">
              <div className="settings-section">
                <h3>Push Notifications</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Daily Wellness Reminders</label>
                    <p>Receive daily reminders for your wellness protocols</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.dailyReminders}
                      onChange={(e) => handleSettingChange('notifications', 'dailyReminders', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Weekly Progress Reports</label>
                    <p>Get weekly summaries of your wellness journey</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.weeklyReports}
                      onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Community Updates</label>
                    <p>Notifications about community challenges and discussions</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.communityUpdates}
                      onChange={(e) => handleSettingChange('notifications', 'communityUpdates', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Expert Wellness Tips</label>
                    <p>Receive tips and advice from wellness experts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.expertTips}
                      onChange={(e) => handleSettingChange('notifications', 'expertTips', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Notification Preferences</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Sound Notifications</label>
                    <p>Play sounds for notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.soundEnabled}
                      onChange={(e) => handleSettingChange('notifications', 'soundEnabled', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Vibration</label>
                    <p>Vibrate device for notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.notifications.vibrationEnabled}
                      onChange={(e) => handleSettingChange('notifications', 'vibrationEnabled', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="privacy-tab">
              <div className="settings-section">
                <h3>Profile Visibility</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Profile Visibility</label>
                    <p>Control who can see your profile and activity</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="setting-select"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Activity Sharing</label>
                    <p>Share your wellness activities with the community</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.activitySharing}
                      onChange={(e) => handleSettingChange('privacy', 'activitySharing', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Data & Analytics</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Data Analytics</label>
                    <p>Allow anonymous data collection for app improvement</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataAnalytics}
                      onChange={(e) => handleSettingChange('privacy', 'dataAnalytics', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Location Sharing</label>
                    <p>Share location for location-based wellness features</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.locationSharing}
                      onChange={(e) => handleSettingChange('privacy', 'locationSharing', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="appearance-tab">
              <div className="settings-section">
                <h3>Theme & Display</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Theme</label>
                    <p>Choose your preferred color scheme</p>
                  </div>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                    className="setting-select"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Font Size</label>
                    <p>Adjust text size for better readability</p>
                  </div>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                    className="setting-select"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Compact Mode</label>
                    <p>Reduce spacing for more content on screen</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.compactMode}
                      onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Animations</label>
                    <p>Enable smooth transitions and animations</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.appearance.animations}
                      onChange={(e) => handleSettingChange('appearance', 'animations', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="account-tab">
              <div className="settings-section">
                <h3>Account Security</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email Notifications</label>
                    <p>Receive important account updates via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.emailNotifications}
                      onChange={(e) => handleSettingChange('account', 'emailNotifications', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Two-Factor Authentication</label>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.twoFactorAuth}
                      onChange={(e) => handleSettingChange('account', 'twoFactorAuth', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Data Management</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Auto Backup</label>
                    <p>Automatically backup your wellness data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.account.autoBackup}
                      onChange={(e) => handleSettingChange('account', 'autoBackup', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Data Retention</label>
                    <p>How long to keep your wellness data</p>
                  </div>
                  <select
                    value={settings.account.dataRetention}
                    onChange={(e) => handleSettingChange('account', 'dataRetention', e.target.value)}
                    className="setting-select"
                  >
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>
              </div>

              <div className="settings-section danger-zone">
                <h3>Danger Zone</h3>
                <div className="danger-actions">
                  <button className="btn btn-danger">
                    🗑️ Delete Account
                  </button>
                  <button className="btn btn-warning">
                    📤 Export Data
                  </button>
                </div>
                <p className="danger-note">
                  ⚠️ These actions cannot be undone. Please proceed with caution.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
