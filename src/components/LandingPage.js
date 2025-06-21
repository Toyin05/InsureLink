import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>🛡️ InsureLink</h2>
          </div>
          <nav className="nav-links">
            <Link to="/education" className="nav-link">Education</Link>
            <Link to="/plans" className="nav-link">Insurance Plans</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Insurance Made Simple for Nigerians 🇳🇬
            </h1>
            <p className="hero-subtitle">
              Navigate Nigeria's insurance landscape with confidence. Get personalized recommendations, 
              expert education, and find the perfect coverage for your needs.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-hero-primary">
                Start Your Journey 🚀
              </Link>
              <Link to="/education" className="btn-hero-secondary">
                Learn About Insurance 📚
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="insurance-icons">
                <div className="icon">🏥</div>
                <div className="icon">🚗</div>
                <div className="icon">🏠</div>
                <div className="icon">✈️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop">
        <div className="container">
          <h2 className="section-title">Why InsureLink? 🤔</h2>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">🤖</div>
              <h3>AI-Powered Guidance</h3>
              <p>Get personalized insurance recommendations based on your unique needs and budget.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎓</div>
              <h3>Expert Education</h3>
              <p>Learn insurance basics through our comprehensive educational resources and videos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💰</div>
              <h3>Best Deals</h3>
              <p>Compare plans from top Nigerian insurers and find the most affordable options.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Trusted & Secure</h3>
              <p>Your data is safe with us. We partner only with licensed insurance providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works ⚡</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Tell Us About Yourself</h3>
                <p>Share your basic information, lifestyle, and insurance needs.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get AI Recommendations</h3>
                <p>Our AI analyzes your profile and suggests the best insurance options.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Compare & Choose</h3>
                <p>Review detailed plan comparisons and select what works for you.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Get Covered</h3>
                <p>Complete your application and enjoy peace of mind with proper coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started? 🎯</h2>
            <p>Join thousands of Nigerians who trust InsureLink for their insurance needs.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Create Free Account 🆓
              </Link>
              <Link to="/chat" className="btn-cta-secondary">
                Chat with AI Assistant 💬
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🛡️ InsureLink</h3>
              <p>Making insurance accessible and understandable for all Nigerians.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/education">Education Center</Link></li>
                <li><Link to="/plans">Insurance Plans</Link></li>
                <li><Link to="/chat">AI Assistant</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="mailto:support@insurelink.ng">Contact Us</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 InsureLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
