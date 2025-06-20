import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock user data - replace with real data from API later
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    totalPlans: 2,
    activePolices: 1,
    lastActivity: "2 hours ago"
  };

  // Mock recent activities
  const recentActivities = [
    { id: 1, action: "Started health insurance comparison", time: "2 hours ago", type: "compare" },
    { id: 2, action: "Completed insurance education module", time: "1 day ago", type: "education" },
    { id: 3, action: "Chatted with AI assistant about car insurance", time: "3 days ago", type: "chat" },
    { id: 4, action: "Updated profile information", time: "1 week ago", type: "profile" }
  ];

  // Mock quick stats
  const quickStats = [
    { title: "Active Policies", value: userData.activePolices, icon: "📋", color: "#4CAF50" },
    { title: "Saved Plans", value: userData.totalPlans, icon: "💾", color: "#2196F3" },
    { title: "Education Progress", value: "75%", icon: "📚", color: "#FF9800" },
    { title: "AI Conversations", value: "8", icon: "🤖", color: "#9C27B0" }
  ];

  const handleLogout = () => {
    // Add logout logic here later
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h2>🛡️ InsureLink</h2>
          </div>
          <div className="user-section">
            <span className="welcome-text">Welcome back, {userData.name}!</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Quick Stats Cards */}
        <section className="stats-section">
          <h3 className="section-title">📊 Quick Overview</h3>
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
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
            <button className="quick-action-btn primary">
              Get Insurance Quote
            </button>
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
