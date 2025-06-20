import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 812 345 6789',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Victoria Island, Lagos',
    occupation: 'Software Engineer',
    income: '500000-1000000',
    language: 'english'
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    darkMode: false,
    language: 'english',
    currency: 'NGN'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    setShowNotifications(true);
    setTimeout(() => setShowNotifications(false), 3000);
  };

  const renderProfileTab = () => (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <span className="avatar-initials">
              {userData.firstName[0]}{userData.lastName[0]}
            </span>
          </div>
          <button className="avatar-edit-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="profile-info">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <p className="profile-email">{userData.email}</p>
          <span className="profile-status">Verified Account</span>
        </div>
        <button 
          className={`edit-btn ${isEditing ? 'save-btn' : ''}`}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Occupation</label>
            <input
              type="text"
              name="occupation"
              value={userData.occupation}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Annual Income (NGN)</label>
            <select
              name="income"
              value={userData.income}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="0-200000">Below ₦200,000</option>
              <option value="200000-500000">₦200,000 - ₦500,000</option>
              <option value="500000-1000000">₦500,000 - ₦1,000,000</option>
              <option value="1000000-2000000">₦1,000,000 - ₦2,000,000</option>
              <option value="2000000+">Above ₦2,000,000</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Email Notifications</span>
            <span className="setting-desc">Receive updates about your insurance plans via email</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange('emailNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">SMS Notifications</span>
            <span className="setting-desc">Get important alerts via text message</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleSettingChange('smsNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Marketing Emails</span>
            <span className="setting-desc">Receive promotional content and special offers</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.marketingEmails}
              onChange={() => handleSettingChange('marketingEmails')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Security Alerts</span>
            <span className="setting-desc">Important security notifications for your account</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.securityAlerts}
              onChange={() => handleSettingChange('securityAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Preferences</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Dark Mode</span>
            <span className="setting-desc">Switch to dark theme for better viewing</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleSettingChange('darkMode')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Language</span>
            <span className="setting-desc">Choose your preferred language</span>
          </div>
          <select className="setting-select" value={settings.language}>
            <option value="english">English</option>
            <option value="hausa">Hausa</option>
            <option value="yoruba">Yoruba</option>
            <option value="igbo">Igbo</option>
            <option value="pidgin">Pidgin English</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-title">Currency</span>
            <span className="setting-desc">Display currency for insurance plans</span>
          </div>
          <select className="setting-select" value={settings.currency}>
            <option value="NGN">Nigerian Naira (₦)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Security</h3>
        <button className="security-btn">
          <span>Change Password</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="security-btn">
          <span>Two-Factor Authentication</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="security-btn danger">
          <span>Delete Account</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      {/* Navigation Header */}
      <div className="profile-nav">
        <div className="nav-content">
          <div className="nav-left">
            <button className="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dashboard
            </button>
          </div>
          <h1>Profile & Settings</h1>
          <div className="nav-right">
            <div className="user-status">
              <div className="status-dot"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="sidebar-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Profile Information
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="m12 1 0 6m0 6 0 6m11-7-6 0m-6 0-6 0" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Settings & Preferences
            </button>
            <button 
              className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`}
              onClick={() => setActiveTab('insurance')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Insurance Plans
            </button>
          </div>

          <div className="sidebar-help">
            <div className="help-card">
              <div className="help-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 9 3-3 3 3" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 15 3 3 3-3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>Need Help?</h4>
              <p>Contact our support team for assistance with your account or insurance questions.</p>
              <button className="help-btn">Get Support</button>
            </div>
          </div>
        </div>

        <div className="profile-main">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'settings' && renderSettingsTab()}
          {activeTab === 'insurance' && (
            <div className="insurance-content">
              <h3>Your Insurance Plans</h3>
              <div className="insurance-cards">
                <div className="insurance-card">
                  <div className="card-header">
                    <h4>Health Insurance Premium</h4>
                    <span className="card-status active">Active</span>
                  </div>
                  <p>Leadway Assurance</p>
                  <div className="card-details">
                    <span>Premium: ₦45,000/year</span>
                    <span>Expires: Dec 2025</span>
                  </div>
                </div>
                <div className="insurance-card">
                  <div className="card-header">
                    <h4>Auto Insurance</h4>
                    <span className="card-status pending">Pending</span>
                  </div>
                  <p>ARM Insurance</p>
                  <div className="card-details">
                    <span>Premium: ₦25,000/year</span>
                    <span>Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {showNotifications && (
        <div className="notification success">
          <div className="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
