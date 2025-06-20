import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Check password match
    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(password === confirmPassword || confirmPassword === '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log('Registration attempt:', formData);
      setIsLoading(false);
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    }, 2000);
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
              <h2>Join InsureLink Today! 🎉</h2>
              <p>Start your journey to smarter insurance decisions with personalized AI guidance.</p>
              <div className="branding-features">
                <div className="feature-item">
                  <span className="feature-icon">🆓</span>
                  <span>Free account setup</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Instant AI recommendations</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💼</span>
                  <span>Access to top Nigerian insurers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <div className="form-header">
                <h1>Create Account</h1>
                <p>Get started with InsureLink in just 2 minutes</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

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
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
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
                      placeholder="Create a strong password"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={!passwordMatch ? 'error' : ''}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {!passwordMatch && (
                    <span className="error-message">Passwords do not match</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading || !passwordMatch}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account 🎯'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <button className="social-btn google-btn">
                <span className="social-icon">🔍</span>
                Sign up with Google
              </button>

              <div className="auth-footer">
                <p>
                  Already have an account? 
                  <Link to="/login" className="auth-link"> Sign in here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
