// At the top of Dashboard.js
import '../styles/Dashboard.css';

import React, { useState } from 'react';

const Dashboard = () => {
  const [user] = useState({
    name: 'John Adebayo',
    email: 'john@example.com',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [notifications] = useState([
    { id: 1, message: 'Your health insurance premium is due in 5 days', type: 'warning', time: '2 hours ago' },
    { id: 2, message: 'New auto insurance plan available with 20% discount', type: 'info', time: '1 day ago' },
    { id: 3, message: 'AI recommendation: Consider travel insurance for your upcoming trip', type: 'success', time: '2 days ago' }
  ]);

  const [insurancePlans] = useState([
    {
      id: 1,
      name: 'Leadway Health Plus',
      provider: 'Leadway Assurance',
      type: 'Health',
      premium: '₦45,000/year',
      coverage: '₦2,000,000',
      status: 'Active',
      nextPayment: '2025-07-15'
    },
    {
      id: 2,
      name: 'ARM Auto Protect',
      provider: 'ARM Insurance',
      type: 'Auto',
      premium: '₦85,000/year',
      coverage: '₦5,000,000',
      status: 'Active',
      nextPayment: '2025-08-20'
    }
  ]);

  const [quickStats] = useState({
    totalCoverage: '₦7,000,000',
    activePolicies: 2,
    monthlyPremium: '₦10,833',
    claimsThisYear: 0
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <h2>InsureLink</h2>
          </div>
          <nav className="nav-menu">
            <a href="#dashboard" className="nav-link active">Dashboard</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#ai-chat" className="nav-link">AI Assistant</a>
            <a href="#plans" className="nav-link">Insurance Plans</a>
          </nav>
          <div className="header-actions">
            <div className="notification-bell">
              <span className="bell-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <div className="user-profile">
              <img src={user.profileImage} alt="Profile" className="profile-image" />
              <span className="user-name">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h1>Welcome back, {user.name}!</h1>
              <p>Your personalized insurance dashboard is ready. Let's protect what matters most to you.</p>
            </div>
            <div className="quick-actions">
              <button className="action-btn primary">
                <span className="btn-icon">🤖</span>
                Ask AI Assistant
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">📚</span>
                Learn Insurance
              </button>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon coverage">💰</div>
                <div className="stat-content">
                  <h3>{quickStats.totalCoverage}</h3>
                  <p>Total Coverage</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon policies">📋</div>
                <div className="stat-content">
                  <h3>{quickStats.activePolicies}</h3>
                  <p>Active Policies</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon premium">📊</div>
                <div className="stat-content">
                  <h3>{quickStats.monthlyPremium}</h3>
                  <p>Monthly Premium</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon claims">✅</div>
                <div className="stat-content">
                  <h3>{quickStats.claimsThisYear}</h3>
                  <p>Claims This Year</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* My Insurance Plans */}
              <section className="insurance-plans-section">
                <div className="section-header">
                  <h2>My Insurance Plans</h2>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="plans-list">
                  {insurancePlans.map(plan => (
                    <div key={plan.id} className="plan-card">
                      <div className="plan-header">
                        <div className="plan-info">
                          <h3>{plan.name}</h3>
                          <p className="provider">{plan.provider}</p>
                        </div>
                        <div className="plan-type">
                          <span className={`type-badge ${plan.type.toLowerCase()}`}>
                            {plan.type}
                          </span>
                        </div>
                      </div>
                      <div className="plan-details">
                        <div className="detail-row">
                          <span>Premium:</span>
                          <span className="value">{plan.premium}</span>
                        </div>
                        <div className="detail-row">
                          <span>Coverage:</span>
                          <span className="value">{plan.coverage}</span>
                        </div>
                        <div className="detail-row">
                          <span>Next Payment:</span>
                          <span className="value">{plan.nextPayment}</span>
                        </div>
                      </div>
                      <div className="plan-actions">
                        <button className="plan-btn primary">Make Payment</button>
                        <button className="plan-btn secondary">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* AI Recommendations */}
              <section className="recommendations-section">
                <div className="section-header">
                  <h2>AI Recommendations</h2>
                  <span className="ai-badge">✨ Powered by AI</span>
                </div>
                <div className="recommendations-list">
                  <div className="recommendation-card">
                    <div className="rec-icon">🏠</div>
                    <div className="rec-content">
                      <h4>Home Insurance Recommended</h4>
                      <p>Based on your profile, consider protecting your home with comprehensive coverage.</p>
                      <button className="rec-btn">Explore Plans</button>
                    </div>
                  </div>
                  <div className="recommendation-card">
                    <div className="rec-icon">✈️</div>
                    <div className="rec-content">
                      <h4>Travel Insurance</h4>
                      <p>Planning a trip? Get coverage for unexpected travel incidents.</p>
                      <button className="rec-btn">Learn More</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Notifications */}
              <section className="notifications-section">
                <div className="section-header">
                  <h2>Recent Notifications</h2>
                  <button className="mark-read-btn">Mark All Read</button>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <button className="dismiss-btn">×</button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <button className="quick-action-card">
                    <div className="action-icon">📞</div>
                    <span>Contact Support</span>
                  </button>
                  <button className="quick-action-card">
                    <div className="action-icon">📄</div>
                    <span>Download Policy</span>
                  </button>
                  <button className="quick-action-card">
                    <div className="action-icon">💳</div>
                    <span>Make Payment</span>
                  </button>
                  <button className="quick-action-card">
                    <div className="action-icon">📊</div>
                    <span>View Reports</span>
                  </button>
                </div>
              </section>

              {/* Audio Feature Placeholder */}
              <section className="audio-section">
                <h2>Voice Assistant</h2>
                <div className="audio-player">
                  <div className="audio-icon">🎤</div>
                  <p>Speak with our AI assistant</p>
                  <button className="audio-btn" disabled>
                    Start Voice Chat (Coming Soon)
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;