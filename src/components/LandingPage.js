import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      role: "Small Business Owner",
      text: "InsureLink helped me understand health insurance in simple terms. Now my family is protected!",
      avatar: "👨🏿‍💼"
    },
    {
      name: "Fatima Abdullahi",
      role: "Teacher",
      text: "I never knew insurance could be this simple. The AI explained everything in Hausa!",
      avatar: "👩🏿‍🏫"
    },
    {
      name: "Chinedu Okoro",
      role: "Engineer",
      text: "Finally found the perfect insurance plan for my family. The comparison tool is amazing!",
      avatar: "👨🏿‍💻"
    }
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Assistant",
      description: "Get personalized insurance advice in your local language - Pidgin, Hausa, Yoruba, or Igbo"
    },
    {
      icon: "📊",
      title: "Smart Comparison",
      description: "Compare plans from top Nigerian insurers like Leadway, ARM, and more in one place"
    },
    {
      icon: "🎓",
      title: "Education Center",
      description: "Learn insurance basics through videos, articles, and interactive content"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Pay premiums safely with Paystack and Flutterwave integration"
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🛡️</span>
            <span className="logo-text">InsureLink</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#education">Education</a>
            <button className="nav-login-btn">Login</button>
            <button className="nav-signup-btn">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              🚀 AI-Powered Insurance Made Simple
            </div>
            <h1 className="hero-title">
              Your Personal
              <span className="gradient-text"> Insurance Guide</span>
              <br />for Nigeria
            </h1>
            <p className="hero-description">
              Understand, compare, and choose the best insurance plans with our AI assistant. 
              Get expert advice in your local language and protect what matters most.
            </p>
            <div className="hero-buttons">
              <button className="cta-primary">
                Start Your Journey
                <span className="button-arrow">→</span>
              </button>
              <button className="cta-secondary">
                <span className="play-icon">▶</span>
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Nigerians Protected</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Insurance Plans</span>
              </div>
              <div className="stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Local Languages</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">💬</div>
              <div className="card-content">
                <div className="card-title">AI Assistant</div>
                <div className="card-text">"Wetin be insurance?"</div>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📋</div>
              <div className="card-content">
                <div className="card-title">Perfect Match</div>
                <div className="card-text">Health Plan - ₦50,000/year</div>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🏥</div>
              <div className="card-content">
                <div className="card-title">Coverage</div>
                <div className="card-text">24/7 Medical Support</div>
              </div>
            </div>
            <div className="hero-circle"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose InsureLink?</h2>
            <p className="section-subtitle">
              We're revolutionizing insurance accessibility across Nigeria with cutting-edge AI technology
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get insured in 3 simple steps</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Chat with Our AI</h3>
                <p>Tell our AI assistant about yourself in your preferred language</p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get Recommendations</h3>
                <p>Receive personalized insurance plan suggestions based on your needs</p>
              </div>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Choose & Pay</h3>
                <p>Select your ideal plan and pay securely through our platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by Thousands</h2>
            <p className="section-subtitle">See what our users say about InsureLink</p>
          </div>
          <div className="testimonial-slider">
            <div className="testimonial-card active">
              <div className="testimonial-content">
                <div className="testimonial-avatar">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <blockquote className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-name">{testimonials[currentTestimonial].name}</div>
                  <div className="author-role">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Protect Your Future?</h2>
            <p className="cta-description">
              Join thousands of Nigerians who have found their perfect insurance match with InsureLink
            </p>
            <button className="cta-button">
              Get Started Today
              <span className="button-sparkle">✨</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🛡️</span>
                <span className="logo-text">InsureLink</span>
              </div>
              <p className="footer-description">
                Making insurance accessible and understandable for every Nigerian.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
              </div>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Insurance Plans</a></li>
                <li><a href="#">Education Center</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Languages</h4>
              <ul className="footer-links">
                <li><a href="#">English</a></li>
                <li><a href="#">Pidgin</a></li>
                <li><a href="#">Hausa</a></li>
                <li><a href="#">Yoruba</a></li>
                <li><a href="#">Igbo</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 InsureLink. All rights reserved. Built with 💚 for Nigeria.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;