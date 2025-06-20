import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log('Password reset request for:', email);
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
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

        {/* Success Message */}
        <div className="auth-container">
          <div className="auth-content single-column">
            <div className="auth-form-section">
              <div className="auth-form-container">
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h1>Check Your Email!</h1>
                  <p>
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="success-subtitle">
                    Click the link in the email to reset your password. 
                    If you don't see it, check your spam folder.
                  </p>
                  
                  <div className="success-actions">
                    <Link to="/login" className="auth-submit-btn">
                      Back to Sign In 🔙
                    </Link>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="secondary-btn"
                    >
                      Try Different Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="auth-content single-column">
          {/* Forgot Password Form */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <div className="form-header">
                <div className="forgot-icon">🔐</div>
                <h1>Forgot Your Password?</h1>
                <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link 📧'
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Remember your password? 
                  <Link to="/login" className="auth-link"> Sign in here</Link>
                </p>
                <p>
                  Don't have an account? 
                  <Link to="/register" className="auth-link"> Create one</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
