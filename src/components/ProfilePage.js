import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo, editUserProfile, changePassword, getToken, removeToken } from '../services/apiService';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    budget: '',
    username: ''
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      const userData = await getUserInfo(token);
      setUserInfo({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        age: userData.age || '',
        gender: userData.gender || '',
        budget: userData.budget || '',
        username: userData.username || ''
      });
      setError('');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data. Please try again.');
      if (error.message.includes('401')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSavePersonalInfo = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      // Prepare data for backend (match the backend schema)
      const updateData = {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone: userInfo.phone,
        budget: parseInt(userInfo.budget) || 0
      };

      await editUserProfile(token, updateData);
      setIsEditing(false);
      setError('');
      alert('Personal information updated successfully! ✅');
      
      // Refresh user data to show updated info
      await fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
      if (error.message.includes('401')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long!');
      return;
    }

    try {
      setIsLoading(true);
      const token = getToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      await changePassword(token, passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
      alert('Password updated successfully! ✅');
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. Please check your current password.');
      if (error.message.includes('401')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = () => {
    // Since there is no backend endpoint for preferences, just save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    alert('Preferences saved successfully! ✅');
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  // Loading state
  if (isLoading && !userInfo.first_name) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

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
          <button onClick={handleLogout} className="nav-link logout">🚪 Logout</button>
        </div>
      </nav>

      <div className="profile-content">
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}

        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {userInfo.first_name.charAt(0)}{userInfo.last_name.charAt(0)}
            </div>
            <button className="change-photo-btn">📷 Change Photo</button>
          </div>
          <div className="profile-info">
            <h1>{userInfo.first_name} {userInfo.last_name}</h1>
            <p className="user-email">{userInfo.email}</p>
            <p className="user-role">@{userInfo.username} • Insurance Member since 2024</p>
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
                  disabled={isLoading}
                >
                  {isEditing ? '❌ Cancel' : '✏️ Edit'}
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={userInfo.first_name}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={userInfo.last_name}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    disabled={true}
                    title="Username cannot be changed"
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
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={userInfo.age}
                    disabled={true}
                    title="Age cannot be changed"
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={userInfo.gender}
                    disabled={true}
                    title="Gender cannot be changed"
                  />
                </div>

                <div className="form-group">
                  <label>Budget (₦)</label>
                  <input
                    type="number"
                    name="budget"
                    value={userInfo.budget}
                    onChange={handlePersonalInfoChange}
                    disabled={!isEditing}
                    placeholder="Enter your insurance budget"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button 
                    className="save-btn" 
                    onClick={handleSavePersonalInfo}
                    disabled={isLoading}
                  >
                    {isLoading ? '⏳ Saving...' : '💾 Save Changes'}
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
                  <p>Keep your account secure with a strong password</p>
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
                    placeholder="Enter new password (min 6 characters)"
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

                <button 
                  className="save-btn" 
                  onClick={handlePasswordUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Updating...' : '🔄 Update Password'}
                </button>
              </div>

              <div className="security-options">
                <h3>Additional Security</h3>
                <div className="security-option">
                  <span>📱 Two-Factor Authentication</span>
                  <button className="enable-btn">Coming Soon</button>
                </div>
                <div className="security-option">
                  <span>📧 Login Notifications</span>
                  <button className="enabled-btn">Coming Soon</button>
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
