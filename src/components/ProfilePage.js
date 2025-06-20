import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: 'Lagos, Nigeria',
    occupation: 'Software Developer'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    language: 'English',
    currency: 'NGN'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSavePersonalInfo = () => {
    // Mock API call - replace with actual API integration
    console.log('Saving personal info:', userInfo);
    setIsEditing(false);
    alert('Personal information updated successfully! ✅');
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Mock API call - replace with actual API integration
    console.log('Updating password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password updated successfully! ✅');
  };

  const handleSavePreferences = () => {
    // Mock API call - replace with actual API integration
    console.log('Saving preferences:', preferences);
    alert('Preferences saved successfully! ✅');
  };

  return (
    <div className="profile-container">
      {/* Navigation Header */}
      <nav className="profile-nav">
        <div className="nav-brand">
          <Link to="/dashboard" className="brand-link">
            🛡️ <span>InsureLink</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">🏠 Dashboard</Link>
          <Link to="/education" className="nav-link">📚 Education</Link>
          <Link to="/chat" className="nav-link">🤖 AI Chat</Link>
          <Link to="/plans" className="nav-link">📋 Plans</Link>
          <Link to="/profile" className="nav-link active">👤 Profile</Link>
          <Link to="/" className="nav-link logout">🚪 Logout</Link>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
            </div>
            <button className="change-photo-btn">📷 Change Photo</button>
          </div>
          <div className="profile-info">
            <h1>{userInfo.firstName} {userInfo.lastName}</h1>
            <p className="user-email">{userInfo.email}</p>
            <p className="user-role">Insurance Member since 2024</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            👤 Personal Information
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Security
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            ⚙️ Preferences
          </button>
        </div>

        <div className="profile-sections">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? '❌ Cancel' : '✏️ Edit'}
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={userInfo.dateOfBirth}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={userInfo.occupation}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="save-btn" onClick={handleSavePersonalInfo}>
                    💾 Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="profile-section">
              <h2>Security Settings</h2>
              
              <div className="security-info">
                <div className="security-item">
                  <h3>🔐 Password</h3>
                  <p>Last changed 30 days ago</p>
                </div>
              </div>

              <div className="password-form">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>

                <button className="save-btn" onClick={handlePasswordUpdate}>
                  🔄 Update Password
                </button>
              </div>

              <div className="security-options">
                <h3>Additional Security</h3>
                <div className="security-option">
                  <span>📱 Two-Factor Authentication</span>
                  <button className="enable-btn">Enable</button>
                </div>
                <div className="security-option">
                  <span>📧 Login Notifications</span>
                  <button className="enabled-btn">Enabled</button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="profile-section">
              <h2>Preferences</h2>

              <div className="preferences-group">
                <h3>📬 Notifications</h3>
                <div className="preference-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={preferences.emailNotifications}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkmark"></span>
                    Email Notifications
                  </label>
                </div>

                <div className="preference-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={preferences.smsNotifications}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkmark"></span>
                    SMS Notifications
                  </label>
                </div>

                <div className="preference-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={preferences.marketingEmails}
                      onChange={handlePreferenceChange}
                    />
                    <span className="checkmark"></span>
                    Marketing Emails
                  </label>
                </div>
              </div>

              <div className="preferences-group">
                <h3>🌍 Regional Settings</h3>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    name="language"
                    value={preferences.language}
                    onChange={handlePreferenceChange}
                  >
                    <option value="English">English</option>
                    <option value="Hausa">Hausa</option>
                    <option value="Yoruba">Yoruba</option>
                    <option value="Igbo">Igbo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select
                    name="currency"
                    value={preferences.currency}
                    onChange={handlePreferenceChange}
                  >
                    <option value="NGN">Nigerian Naira (₦)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSavePreferences}>
                  💾 Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="account-actions">
          <h3>⚠️ Account Actions</h3>
          <div className="danger-zone">
            <button className="danger-btn">
              🗑️ Delete Account
            </button>
            <p className="danger-text">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
