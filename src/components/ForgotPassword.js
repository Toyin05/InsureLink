import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h2>Check Your Email!</h2>
              <p>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="instruction-text">
                Click the link in your email to reset your password. 
                If you don't see it, check your spam folder.
              </p>
              
              <div className="success-actions">
                <button 
                  className="resend-btn"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                >
                  Send Another Email
                </button>
                <Link to="/login" className="back-login-btn">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-section">
              <h1>InsureLink</h1>
              <span className="logo-tagline">🛡️ Your Insurance Companion</span>
            </div>
            <h2>Forgot Your Password?</h2>
            <p>No worries! Enter your email and we'll send you a reset link</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
              <small className="form-hint">
                We'll send a password reset link to this email address
              </small>
            </div>

            <button 
              type="submit" 
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
            <p>
              <Link to="/" className="back-home">
                ← Back to Homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
