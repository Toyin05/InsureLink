import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

// Import API functions
import { 
  getUserInfo, 
  getInsuranceProducts, 
  getPersonalizedOptions,
  getToken, 
  removeToken, 
  isLoggedIn 
} from '../services/apiService';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [userData, setUserData] = useState(null);
  const [insuranceProducts, setInsuranceProducts] = useState([]);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    
    // Load dashboard data
    loadDashboardData();
  }, [navigate]);

  // Function to load all dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getToken();

      // Fetch user info
      const userInfo = await getUserInfo(token);
      setUserData(userInfo);

      // Fetch insurance products
      try {
        const products = await getInsuranceProducts(token);
        setInsuranceProducts(Array.isArray(products) ? products : []);
      } catch (productError) {
        console.log('Could not fetch insurance products:', productError.message);
        setInsuranceProducts([]);
      }

      // Try to get personalized recommendations
      try {
        const recommendations = await getPersonalizedOptions(token, 'Show me insurance recommendations based on my profile');
        setPersonalizedRecommendations(Array.isArray(recommendations) ? recommendations.slice(0, 3) : []);
      } catch (recError) {
        console.log('Could not fetch personalized recommendations:', recError.message);
        setPersonalizedRecommendations([]);
      }

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try refreshing the page.');
      
      // If token is invalid, redirect to login
      if (err.message.includes('401') || err.message.includes('token')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate quick stats based on real data
  const getQuickStats = () => {
    if (!userData) return [];
    
    return [
      { 
        title: "Active Policies", 
        value: userData.active_policies || 0, 
        icon: "📋", 
        color: "#4CAF50" 
      },
      { 
        title: "Available Plans", 
        value: insuranceProducts.length, 
        icon: "💾", 
        color: "#2196F3" 
      },
      { 
        title: "Budget", 
        value: userData.budget ? `₦${userData.budget.toLocaleString()}` : "Not set", 
        icon: "💰", 
        color: "#FF9800" 
      },
      { 
        title: "Recommendations", 
        value: personalizedRecommendations.length, 
        icon: "🤖", 
        color: "#9C27B0" 
      }
    ];
  };

  // Mock recent activities (you can enhance this later with real activity tracking)
  const recentActivities = [
    { id: 1, action: "Logged into dashboard", time: "Just now", type: "login" },
    { id: 2, action: "Profile information loaded", time: "Just now", type: "profile" },
    { id: 3, action: "Insurance products updated", time: "Just now", type: "compare" },
    { id: 4, action: "AI recommendations generated", time: "Just now", type: "chat" }
  ];

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          color: 'red'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <p>{error}</p>
          <button onClick={loadDashboardData} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard render
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h2>🛡️ InsureLink</h2>
          </div>
          <div className="user-section">
            <span className="welcome-text">
              Welcome back, {userData?.first_name || userData?.username || 'User'}!
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* User Info Section */}
        {userData && (
          <section className="user-info-section" style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 className="section-title">👤 Your Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div><strong>Name:</strong> {userData.first_name} {userData.last_name}</div>
              <div><strong>Email:</strong> {userData.email}</div>
              <div><strong>Age:</strong> {userData.age || 'Not specified'}</div>
              <div><strong>Budget:</strong> ₦{userData.budget?.toLocaleString() || 'Not set'}</div>
              <div><strong>Phone:</strong> {userData.phone || 'Not provided'}</div>
              <div><strong>Gender:</strong> {userData.gender || 'Not specified'}</div>
            </div>
          </section>
        )}

        {/* Quick Stats Cards */}
        <section className="stats-section">
          <h3 className="section-title">📊 Quick Overview</h3>
          <div className="stats-grid">
            {getQuickStats().map((stat, index) => (
              <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h4>{stat.value}</h4>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personalized Recommendations */}
        {personalizedRecommendations.length > 0 && (
          <section className="recommendations-section" style={{ marginBottom: '2rem' }}>
            <h3 className="section-title">🎯 AI Recommendations for You</h3>
            <div className="recommendations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {personalizedRecommendations.map((rec, index) => (
                <div key={index} className="recommendation-card" style={{ 
                  padding: '1rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤖</div>
                  <p>{typeof rec === 'string' ? rec : rec.recommendation || 'Personalized insurance recommendation'}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Insurance Products */}
        {insuranceProducts.length > 0 && (
          <section className="products-section" style={{ marginBottom: '2rem' }}>
            <h3 className="section-title">🏥 Available Insurance Plans</h3>
            <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {insuranceProducts.slice(0, 4).map((product, index) => (
                <div key={index} className="product-card" style={{ 
                  padding: '1rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: '#fff'
                }}>
                  <h4>{product.name || `Insurance Plan ${index + 1}`}</h4>
                  <p>{product.description || 'Comprehensive insurance coverage'}</p>
                  <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                    {product.price ? `₦${product.price.toLocaleString()}` : 'Contact for pricing'}
                  </div>
                </div>
              ))}
            </div>
            {insuranceProducts.length > 4 && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/plans" style={{ color: '#2196F3', textDecoration: 'none' }}>
                  View all {insuranceProducts.length} plans →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Navigation Cards */}
        <section className="navigation-section">
          <h3 className="section-title">🚀 What would you like to do?</h3>
          <div className="nav-grid">
            <Link to="/education" className="nav-card">
              <div className="nav-icon">📚</div>
              <h4>Learn About Insurance</h4>
              <p>Access educational resources, videos, and guides to understand insurance better</p>
            </Link>

            <Link to="/chat" className="nav-card">
              <div className="nav-icon">🤖</div>
              <h4>AI Assistant</h4>
              <p>Chat with our intelligent assistant for personalized insurance advice</p>
            </Link>

            <Link to="/plans" className="nav-card">
              <div className="nav-icon">🏥</div>
              <h4>Compare Plans</h4>
              <p>Browse and compare different insurance plans to find the best fit</p>
            </Link>

            <Link to="/profile" className="nav-card">
              <div className="nav-icon">👤</div>
              <h4>Profile & Settings</h4>
              <p>Manage your account information and preferences</p>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h3 className="section-title">⏰ Recent Activity</h3>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'compare' && '📊'}
                  {activity.type === 'education' && '📚'}
                  {activity.type === 'chat' && '💬'}
                  {activity.type === 'profile' && '👤'}
                  {activity.type === 'login' && '🔐'}
                </div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h3 className="section-title">⚡ Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/plans" className="quick-action-btn primary">
              Get Insurance Quote
            </Link>
            <button className="quick-action-btn secondary">
              Download Policy Documents
            </button>
            <button className="quick-action-btn secondary">
              Contact Support
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 InsureLink - Your trusted insurance companion</p>
      </footer>
    </div>
  );
};

export default Dashboard;
