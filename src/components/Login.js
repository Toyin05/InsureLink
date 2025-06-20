import React, { useState } from 'react';

const AuthSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentView === 'register') {
      setCurrentView('success');
    } else if (currentView === 'login') {
      alert('Login successful! Redirecting to dashboard...');
    } else if (currentView === 'forgot') {
      alert('Password reset link sent to your email!');
      setCurrentView('login');
    }
  };

  const styles = {
    authSystem: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    authContainer: {
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto'
    },
    authCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '48px 40px',
      boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'slideUp 0.6s ease-out'
    },
    successCard: {
      textAlign: 'center'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px'
    },
    logoIcon: {
      fontSize: '32px',
      marginRight: '12px'
    },
    logoText: {
      fontSize: '28px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0'
    },
    authTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: '8px',
      textAlign: 'center'
    },
    authSubtitle: {
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
      marginBottom: '32px',
      lineHeight: '1.5'
    },
    formGroup: {
      marginBottom: '24px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    formInput: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      background: '#ffffff',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    formInputFocus: {
      borderColor: '#667eea',
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)'
    },
    passwordStrength: {
      marginTop: '8px'
    },
    strengthBar: {
      width: '100%',
      height: '4px',
      background: '#e5e7eb',
      borderRadius: '2px',
      overflow: 'hidden',
      marginBottom: '4px'
    },
    strengthFill: {
      height: '100%',
      width: '60%',
      background: 'linear-gradient(90deg, #10b981, #059669)',
      transition: 'width 0.3s ease'
    },
    strengthText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer'
    },
    checkbox: {
      marginRight: '8px',
      width: '16px',
      height: '16px'
    },
    forgotLink: {
      background: 'none',
      border: 'none',
      color: '#667eea',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    authButton: {
      width: '100%',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '16px',
      fontFamily: 'inherit'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
    },
    primaryButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
    },
    googleButton: {
      background: 'white',
      color: '#374151',
      border: '2px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    googleIcon: {
      marginRight: '12px',
      fontWeight: 'bold',
      color: '#4285f4'
    },
    authDivider: {
      display: 'flex',
      alignItems: 'center',
      margin: '32px 0',
      fontSize: '14px',
      color: '#9ca3af'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: '#e5e7eb'
    },
    authSwitch: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '24px'
    },
    switchLink: {
      background: 'none',
      border: 'none',
      color: '#667eea',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    termsLink: {
      color: '#667eea',
      textDecoration: 'none'
    },
    successAnimation: {
      marginBottom: '24px'
    },
    successIcon: {
      fontSize: '64px',
      animation: 'bounce 1s ease-in-out'
    },
    successTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: '16px'
    },
    successMessage: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '32px'
    },
    successNote: {
      fontSize: '14px',
      color: '#9ca3af',
      marginTop: '16px'
    }
  };

  const renderLogin = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🛡️</div>
          <h1 style={styles.logoText}>InsureLink</h1>
        </div>
        <h2 style={styles.authTitle}>Welcome Back</h2>
        <p style={styles.authSubtitle}>Sign in to your account to continue</p>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            style={styles.formInput}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Password</label>
          <input
            type="password"
            name="password"
            style={styles.formInput}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.formOptions}>
          <label style={styles.checkboxContainer}>
            <input type="checkbox" style={styles.checkbox} />
            Remember me
          </label>
          <button
            type="button"
            style={styles.forgotLink}
            onClick={() => setCurrentView('forgot')}
          >
            Forgot Password?
          </button>
        </div>

        <button 
          type="button" 
          style={{...styles.authButton, ...styles.primaryButton}}
          onClick={handleSubmit}
        >
          Sign In
        </button>

        <div style={styles.authDivider}>
          <div style={styles.dividerLine}></div>
          <span style={{margin: '0 16px'}}>or</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button type="button" style={{...styles.authButton, ...styles.googleButton}}>
          <span style={styles.googleIcon}>G</span>
          Continue with Google
        </button>

        <p style={styles.authSwitch}>
          Don't have an account?{' '}
          <button
            type="button"
            style={styles.switchLink}
            onClick={() => setCurrentView('register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🛡️</div>
          <h1 style={styles.logoText}>InsureLink</h1>
        </div>
        <h2 style={styles.authTitle}>Create Account</h2>
        <p style={styles.authSubtitle}>Join thousands of Nigerians securing their future</p>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>First Name</label>
            <input
              type="text"
              name="firstName"
              style={styles.formInput}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Last Name</label>
            <input
              type="text"
              name="lastName"
              style={styles.formInput}
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            style={styles.formInput}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            style={styles.formInput}
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Password</label>
          <input
            type="password"
            name="password"
            style={styles.formInput}
            placeholder="Create password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div style={styles.passwordStrength}>
            <div style={styles.strengthBar}>
              <div style={styles.strengthFill}></div>
            </div>
            <span style={styles.strengthText}>Use 8+ characters with mix of letters, numbers & symbols</span>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            style={styles.formInput}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.formOptions}>
          <label style={styles.checkboxContainer}>
            <input type="checkbox" style={styles.checkbox} required />
            I agree to the <a href="#" style={styles.termsLink}>Terms of Service</a> and <a href="#" style={styles.termsLink}>Privacy Policy</a>
          </label>
        </div>

        <button 
          type="button" 
          style={{...styles.authButton, ...styles.primaryButton}}
          onClick={handleSubmit}
        >
          Create Account
        </button>

        <div style={styles.authDivider}>
          <div style={styles.dividerLine}></div>
          <span style={{margin: '0 16px'}}>or</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button type="button" style={{...styles.authButton, ...styles.googleButton}}>
          <span style={styles.googleIcon}>G</span>
          Continue with Google
        </button>

        <p style={styles.authSwitch}>
          Already have an account?{' '}
          <button
            type="button"
            style={styles.switchLink}
            onClick={() => setCurrentView('login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );

  const renderForgotPassword = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🛡️</div>
          <h1 style={styles.logoText}>InsureLink</h1>
        </div>
        <h2 style={styles.authTitle}>Reset Password</h2>
        <p style={styles.authSubtitle}>Enter your email to receive a password reset link</p>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            style={styles.formInput}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button 
          type="button" 
          style={{...styles.authButton, ...styles.primaryButton}}
          onClick={handleSubmit}
        >
          Send Reset Link
        </button>

        <p style={styles.authSwitch}>
          Remember your password?{' '}
          <button
            type="button"
            style={styles.switchLink}
            onClick={() => setCurrentView('login')}
          >
            Back to Sign In
          </button>
        </p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div style={styles.authContainer}>
      <div style={{...styles.authCard, ...styles.successCard}}>
        <div style={styles.successAnimation}>
          <div style={styles.successIcon}>✅</div>
        </div>
        <h2 style={styles.successTitle}>Account Created Successfully!</h2>
        <p style={styles.successMessage}>
          Welcome to InsureLink! Your account has been created and you're ready to start your insurance journey.
        </p>
        <button 
          style={{...styles.authButton, ...styles.primaryButton}}
          onClick={() => alert('Redirecting to dashboard...')}
        >
          Get Started
        </button>
        <p style={styles.successNote}>
          You can now access your personalized insurance dashboard and AI assistant.
        </p>
      </div>
    </div>
  );

  return (
    <div style={styles.authSystem}>
      {currentView === 'login' && renderLogin()}
      {currentView === 'register' && renderRegister()}
      {currentView === 'forgot' && renderForgotPassword()}
      {currentView === 'success' && renderSuccess()}
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        input:focus {
          border-color: #667eea !important;
          outline: none !important;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
        }
        
        button:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AuthSystem;
