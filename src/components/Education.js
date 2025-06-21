import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Education.css';

const Education = () => {
  const [activeCategory, setActiveCategory] = useState('basics');

  // Mock educational content
  const educationContent = {
    basics: {
      title: "Insurance Basics 📚",
      articles: [
        {
          id: 1,
          title: "What is Insurance and Why Do You Need It?",
          excerpt: "Learn the fundamentals of insurance and how it protects r financial future in Nigeria.",
          readTime: "5 min read",
          content: "Insurance is a financial safety net that protects you from unexpected costs. In Nigeria, having insurance is crucial due to economic uncertainties and healthcare costs..."
        },
        {
          id: 2,
          title: "Types of Insurance Available in Nigeria",
          excerpt: "Explore different insurance products available to Nigerian citizens and residents.",
          readTime: "7 min read",
          content: "Nigeria offers various insurance products including health, life, motor, property, and professional indemnity insurance..."
        },
        {
          id: 3,
          title: "How Insurance Premiums Work",
          excerpt: "Understand how insurance premiums are calculated and what factors affect your rates.",
          readTime: "4 min read",
          content: "Insurance premiums are calculated based on risk assessment, coverage amount, and personal factors..."
        }
      ]
    },
    health: {
      title: "Health Insurance 🏥",
      articles: [
        {
          id: 4,
          title: "National Health Insurance Scheme (NHIS) Explained",
          excerpt: "Everything you need to know about Nigeria's national health insurance program.",
          readTime: "6 min read",
          content: "The NHIS provides basic healthcare coverage for Nigerian citizens through various programs..."
        },
        {
          id: 5,
          title: "Private Health Insurance vs NHIS",
          excerpt: "Compare private health insurance options with the national scheme.",
          readTime: "8 min read",
          content: "While NHIS provides basic coverage, private health insurance offers enhanced benefits and flexibility..."
        }
      ]
    },
    motor: {
      title: "Motor Insurance 🚗",
      articles: [
        {
          id: 6,
          title: "Third Party vs Comprehensive Motor Insurance",
          excerpt: "Understand the difference and choose the right motor insurance for your vehicle.",
          readTime: "5 min read",
          content: "Third party insurance is mandatory in Nigeria, but comprehensive coverage offers better protection..."
        }
      ]
    },
    tips: {
      title: "Expert Tips 💡",
      articles: [
        {
          id: 7,
          title: "5 Common Insurance Mistakes to Avoid",
          excerpt: "Learn from common pitfalls and make smarter insurance decisions.",
          readTime: "6 min read",
          content: "Many Nigerians make these costly mistakes when buying insurance. Here's how to avoid them..."
        }
      ]
    }
  };

  // Mock video data (Curacel YouTube channel videos)
  const educationalVideos = [
    {
      id: 1,
      title: "Insurance 101: Getting Started",
      videoId: "dQw4w9WgXcQ", // Replace with actual Curacel video IDs
      duration: "12:34",
      views: "15K views"
    },
    {
      id: 2,
      title: "Health Insurance in Nigeria Explained",
      videoId: "dQw4w9WgXcQ", // Replace with actual Curacel video IDs
      duration: "18:45",
      views: "23K views"
    },
    {
      id: 3,
      title: "Choosing the Right Motor Insurance",
      videoId: "dQw4w9WgXcQ", // Replace with actual Curacel video IDs
      duration: "15:20",
      views: "8K views"
    },
    {
      id: 4,
      title: "Claims Process Made Simple",
      videoId: "dQw4w9WgXcQ", // Replace with actual Curacel video IDs
      duration: "20:15",
      views: "31K views"
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="education-container">
      {/* Header */}
      <header className="education-header">
        <div className="header-content">
          <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
          <div className="header-text">
            <h1>🎓 Education Center</h1>
            <p>Learn everything about insurance to make informed decisions</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="education-main">
        <div className="education-content">
          
          {/* Category Navigation */}
          <section className="category-nav">
            <div className="nav-buttons">
              {Object.keys(educationContent).map((category) => (
                <button
                  key={category}
                  className={`nav-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {educationContent[category].title}
                </button>
              ))}
            </div>
          </section>

          {/* Content Grid */}
          <div className="content-grid">
            
            {/* Articles Section */}
            <section className="articles-section">
              <h2>{educationContent[activeCategory].title}</h2>
              <div className="articles-grid">
                {educationContent[activeCategory].articles.map((article) => (
                  <div key={article.id} className="article-card">
                    <div className="article-content">
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="article-meta">
                        <span className="read-time">{article.readTime}</span>
                        <button 
                          className="read-btn"
                          onClick={() => openModal(article)}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Videos Section */}
            <section className="videos-section">
              <h2>📺 Educational Videos</h2>
              <p className="section-subtitle">Watch expert explanations from Curacel</p>
              <div className="videos-grid">
                {educationalVideos.map((video) => (
                  <div key={video.id} className="video-card">
                    <div className="video-thumbnail">
                      <iframe
                        src={`https://youtu.be/eKbw8Zxzd8Q?si=BdBb7OxxB5do53d7`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="video-info">
                      <h4>{video.title}</h4>
                      <div className="video-meta">
                        <span>{video.duration}</span>
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links">
              <h2>🔗 Useful Resources</h2>
              <div className="links-grid">
                <a href="https://www.naicom.gov.ng/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>NAICOM</h4>
                  <p>National Insurance Commission - Official regulatory body</p>
                </a>
                <a href="https://www.nhis.gov.ng/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>NHIS Portal</h4>
                  <p>National Health Insurance Scheme official website</p>
                </a>
                <a href="https://curacel.co/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <h4>Curacel</h4>
                  <p>Insurance technology solutions and insights</p>
                </a>
              </div>
            </section>

          </div>

          {/* CTA Section */}
          <section className="education-cta">
            <div className="cta-content">
              <h2>Ready to Get Your Insurance? 🚀</h2>
              <p>Use our AI assistant to find the perfect insurance plan for your needs</p>
              <div className="cta-buttons">
                <Link to="/chat" className="cta-btn primary">Talk to AI Assistant</Link>
                <Link to="/plans" className="cta-btn secondary">Browse Plans</Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedArticle.title}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="article-meta">
                <span>{selectedArticle.readTime}</span>
              </div>
              <p>{selectedArticle.content}</p>
              <p>This is a preview of the full article. In the complete version, this would contain comprehensive information about {selectedArticle.title.toLowerCase()}.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
