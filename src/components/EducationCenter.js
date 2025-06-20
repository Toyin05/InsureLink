import React, { useState } from 'react';
import './EducationPage.css';

const EducationPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('basics');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const topics = [
    {
      id: 'basics',
      title: 'Insurance Basics',
      icon: '📚',
      description: 'Learn the fundamentals of insurance and how it protects you'
    },
    {
      id: 'health',
      title: 'Health Insurance',
      icon: '🏥',
      description: 'Understanding health coverage and medical benefits'
    },
    {
      id: 'auto',
      title: 'Auto Insurance',
      icon: '🚗',
      description: 'Protect your vehicle and stay compliant with the law'
    },
    {
      id: 'life',
      title: 'Life Insurance',
      icon: '👨‍👩‍👧‍👦',
      description: 'Secure your family\'s financial future'
    },
    {
      id: 'property',
      title: 'Property Insurance',
      icon: '🏠',
      description: 'Protect your home and valuable assets'
    },
    {
      id: 'business',
      title: 'Business Insurance',
      icon: '💼',
      description: 'Safeguard your business operations and investments'
    }
  ];

  const videoContent = {
    basics: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'What is Insurance? - Complete Guide',
        description: 'Learn the basics of insurance and why it\'s essential for financial security'
      },
      {
        id: 'eKbw8Zxzd8Q',
        title: 'How Insurance Claims Work',
        description: 'Step-by-step guide to filing and processing insurance claims'
      },
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Choosing the Right Insurance Plan',
        description: 'Tips for selecting insurance that fits your needs and budget'
      }
    ],
    health: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Health Insurance Explained',
        description: 'Understanding health insurance coverage and benefits'
      },
      {
        id: 'eKbw8Zxzd8Q',
        title: 'HMO vs Insurance Plans',
        description: 'Comparing different health insurance options in Nigeria'
      }
    ],
    auto: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Auto Insurance Essentials',
        description: 'Everything you need to know about car insurance'
      },
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Third Party vs Comprehensive Coverage',
        description: 'Understanding different levels of auto insurance protection'
      }
    ],
    life: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Life Insurance Fundamentals',
        description: 'Protecting your family\'s financial future'
      }
    ],
    property: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Home Insurance Guide',
        description: 'Protecting your property and belongings'
      }
    ],
    business: [
      {
        id: 'eKbw8Zxzd8Q',
        title: 'Business Insurance Overview',
        description: 'Essential coverage for business owners'
      }
    ]
  };

  const textContent = {
    basics: {
      title: 'Understanding Insurance Basics',
      sections: [
        {
          heading: 'What is Insurance?',
          content: 'Insurance is a financial protection mechanism that helps you manage risk. When you buy insurance, you pay a small amount (called a premium) regularly to protect yourself from large, unexpected expenses. Think of it as a safety net that catches you when life throws unexpected challenges your way.'
        },
        {
          heading: 'How Does Insurance Work?',
          content: 'Insurance works on the principle of risk sharing. Many people pay premiums into a pool, and when someone faces a covered loss, the insurance company uses money from this pool to pay for their expenses. This way, the financial burden is spread across many people, making it affordable for everyone.'
        },
        {
          heading: 'Key Insurance Terms',
          content: 'Premium: The amount you pay for insurance coverage. Deductible: The amount you pay before insurance kicks in. Coverage: What your insurance protects against. Claim: A request for payment when you experience a loss. Policy: Your insurance contract.'
        }
      ]
    },
    health: {
      title: 'Health Insurance Guide',
      sections: [
        {
          heading: 'Why Health Insurance Matters',
          content: 'Healthcare costs can be overwhelming without insurance. A single hospital visit can cost thousands of naira, and major medical procedures can be financially devastating. Health insurance helps you access quality healthcare without worrying about the cost.'
        },
        {
          heading: 'Types of Health Coverage',
          content: 'Individual Plans: Coverage for one person. Family Plans: Coverage for you and your dependents. Group Plans: Coverage through employers or organizations. HMO Plans: Health Maintenance Organization plans with specific provider networks.'
        }
      ]
    },
    auto: {
      title: 'Auto Insurance Essentials',
      sections: [
        {
          heading: 'Legal Requirements',
          content: 'In Nigeria, third-party motor insurance is mandatory by law. This covers damages you might cause to other people or their property. Driving without insurance can result in fines, license suspension, or even jail time.'
        },
        {
          heading: 'Coverage Options',
          content: 'Third Party: Covers damages to others (legally required). Third Party Fire & Theft: Adds protection for your vehicle against fire and theft. Comprehensive: Full coverage including damages to your own vehicle from accidents, vandalism, and natural disasters.'
        }
      ]
    },
    life: {
      title: 'Life Insurance Planning',
      sections: [
        {
          heading: 'Protecting Your Family',
          content: 'Life insurance provides financial security for your loved ones if something happens to you. It can help cover funeral expenses, pay off debts, replace lost income, and ensure your family can maintain their standard of living.'
        },
        {
          heading: 'Types of Life Insurance',
          content: 'Term Life: Temporary coverage for a specific period. Whole Life: Permanent coverage with investment component. Group Life: Coverage through employers or organizations.'
        }
      ]
    },
    property: {
      title: 'Property Insurance Protection',
      sections: [
        {
          heading: 'Home Insurance',
          content: 'Your home is likely your biggest investment. Property insurance protects against damages from fire, theft, vandalism, and natural disasters. It can also cover your personal belongings and provide liability protection.'
        },
        {
          heading: 'What\'s Covered',
          content: 'Structure: The physical building and attached structures. Contents: Your personal belongings inside the home. Liability: Protection if someone is injured on your property. Additional Living Expenses: Costs if you need temporary housing during repairs.'
        }
      ]
    },
    business: {
      title: 'Business Insurance Overview',
      sections: [
        {
          heading: 'Protecting Your Business',
          content: 'Business insurance protects your company from various risks that could threaten its operations. From property damage to liability claims, the right coverage helps ensure your business can survive unexpected events.'
        },
        {
          heading: 'Essential Business Coverage',
          content: 'General Liability: Protection against third-party claims. Property Insurance: Coverage for business property and equipment. Professional Liability: Protection against errors and omissions. Workers\' Compensation: Coverage for employee injuries.'
        }
      ]
    }
  };

  const handleVideoPlay = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="education-page">
      <div className="education-header">
        <div className="header-content">
          <h1>Insurance Education Center</h1>
          <p>Learn everything you need to know about insurance to make informed decisions</p>
        </div>
        <div className="header-visual">
          <div className="floating-elements">
            <div className="float-element">📚</div>
            <div className="float-element">🎓</div>
            <div className="float-element">💡</div>
          </div>
        </div>
      </div>

      <div className="education-content">
        <div className="topics-sidebar">
          <h3>Learning Topics</h3>
          <div className="topics-list">
            {topics.map(topic => (
              <div
                key={topic.id}
                className={`topic-item ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <span className="topic-icon">{topic.icon}</span>
                <div className="topic-info">
                  <h4>{topic.title}</h4>
                  <p>{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <h2>{topics.find(t => t.id === selectedTopic)?.title}</h2>
            <div className="progress-indicator">
              <span>Progress: 3/6 topics completed</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          <div className="content-tabs">
            <div className="tab-buttons">
              <button className="tab-btn active">📖 Learn</button>
              <button className="tab-btn">🎥 Videos</button>
              <button className="tab-btn">📝 Quiz</button>
            </div>
          </div>

          <div className="content-body">
            <div className="text-content">
              <h3>{textContent[selectedTopic]?.title}</h3>
              {textContent[selectedTopic]?.sections.map((section, index) => (
                <div key={index} className="content-section">
                  <h4>{section.heading}</h4>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>

            <div className="video-section">
              <h3>📹 Video Learning</h3>
              <div className="video-grid">
                {videoContent[selectedTopic]?.map((video, index) => (
                  <div key={index} className="video-card" onClick={() => handleVideoPlay(video.id)}>
                    <div className="video-thumbnail">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="play-button">▶️</div>
                    </div>
                    <div className="video-info">
                      <h4>{video.title}</h4>
                      <p>{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="content-actions">
            <button className="btn-secondary">📄 Download Guide</button>
            <button className="btn-primary">💬 Ask AI Assistant</button>
            <button className="btn-audio">🎤 Listen to Audio</button>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVideoModal}>✕</button>
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Educational Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationPage;
