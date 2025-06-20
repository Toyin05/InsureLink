import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-page">
      {/* Header */}
      <header className="auth-navbar">
        <div className="auth-nav-container">
          <Link to="/" className="auth-logo">
            <h2>🛡️ InsureLink</h2>
          </Link>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="auth-container">
        <div className="auth-content">
          {/* Left Side - Branding */}
          <div className="auth-branding">
            <div className="branding-content">
              <h2>Welcome Back! 👋</h2>
              <p>Continue your journey to smart insurance decisions with InsureLink.</p>
              <div className="branding-features">
                <div className="feature-item">
                  <span className="feature-icon">🤖</span>
                  <span>AI-powered recommendations</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Compare multiple plans</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure and trusted platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <div className="form-header">
                <h1>Sign In</h1>
                <p>Access your InsureLink account</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In 🚀'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <button className="social-btn google-btn">
                <span className="social-icon">🔍</span>
                Continue with Google
              </button>

              <div className="auth-footer">
                <p>
                  Don't have an account? 
                  <Link to="/register" className="auth-link"> Create one here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
