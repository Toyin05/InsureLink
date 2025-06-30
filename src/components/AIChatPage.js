import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AIChatPage.css';

// Import API functions
import { 
  sendChatMessage, 
  getPersonalizedOptions, 
  getToken, 
  isLoggedIn 
} from '../services/apiService';

const AIChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your personal AI Insurance Guide. I\'m here to help you understand insurance and find the best plans for you. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇳🇬' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'pcm', name: 'Pidgin', flag: '🇳🇬' }
  ];

  const quickQuestions = [
    "What is insurance?",
    "How does health insurance work?",
    "What's the best car insurance for me?",
    "How much should I pay for insurance?",
    "What does life insurance cover?",
    "Show me personalized insurance recommendations",
    "Explain insurance terms in simple language",
    "What insurance do I need based on my age and budget?"
  ];

  // Check authentication on the component mount
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError('');

    try {
      const token = getToken();
      
      // Send message to AI
      const aiResponse = await sendChatMessage(token, currentMessage, selectedLanguage);
      
      // Add AI response to messages
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.response || aiResponse.message || aiResponse || 'I received your message, but I\'m having trouble responding right now.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Check if the message is asking for recommendations
      const recommendationKeywords = ['recommend', 'suggestion', 'personalized', 'best for me', 'what insurance'];
      const isRecommendationRequest = recommendationKeywords.some(keyword => 
        currentMessage.toLowerCase().includes(keyword)
      );

      // Try to get personalized recommendations if the request looks like it's asking for them
      if (isRecommendationRequest) {
        try {
          const personalizedResponse = await getPersonalizedOptions(token, currentMessage, selectedLanguage);
          
          // Handle different response formats
          let recommendationsData = [];
          
          if (Array.isArray(personalizedResponse)) {
            recommendationsData = personalizedResponse;
          } else if (personalizedResponse.recommendations) {
            recommendationsData = personalizedResponse.recommendations;
          } else if (personalizedResponse.products) {
            recommendationsData = personalizedResponse.products;
          }

          if (recommendationsData.length > 0) {
            // Format recommendations for display
            const formattedRecommendations = recommendationsData.map((rec, index) => {
              if (typeof rec === 'string') {
                return {
                  title: `Recommendation ${index + 1}`,
                  insurer: "InsureLink Partner",
                  product_type: "Insurance Plan",
                  description: rec,
                  pros: ["Personalized for your profile", "AI-recommended", "Suitable for your needs"],
                  cons: ["Contact for detailed pricing", "Subject to eligibility"]
                };
              }
              
              return {
                title: rec.title || rec.name || `Insurance Plan ${index + 1}`,
                insurer: rec.insurer || rec.provider || "InsureLink Partner",
                product_type: rec.product_type || rec.type || "Insurance Plan",
                description: rec.description || rec.details || "Personalized insurance recommendation",
                pros: rec.pros || rec.benefits || ["Recommended for you", "Competitive pricing", "Good coverage"],
                cons: rec.cons || rec.limitations || ["Terms and conditions apply", "Subject to underwriting"]
              };
            });

            setRecommendations(formattedRecommendations);
            setShowRecommendations(true);
          }
        } catch (recError) {
          console.log('Could not fetch personalized recommendations:', recError);
          // Don't show error to the user...just log it
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 2,
        type: 'ai',
        content: 'Sorry, I\'m having trouble connecting right now. Please check your internet connection and try again.',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality placeholder - you can implement this later
    setTimeout(() => setIsListening(false), 3000);
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = getToken();
      const response = await getPersonalizedOptions(token, 'Show me personalized insurance recommendations based on my profile and needs', selectedLanguage);
      
      // Handle the response similar to the main chat function
      let recommendationsData = [];
      
      if (Array.isArray(response)) {
        recommendationsData = response;
      } else if (response.recommendations) {
        recommendationsData = response.recommendations;
      } else if (response.products) {
        recommendationsData = response.products;
      }

      if (recommendationsData.length > 0) {
        const formattedRecommendations = recommendationsData.map((rec, index) => {
          if (typeof rec === 'string') {
            return {
              title: `Recommendation ${index + 1}`,
              insurer: "InsureLink Partner",
              product_type: "Insurance Plan",
              description: rec,
              pros: ["Personalized for your profile", "AI-recommended", "Suitable for your needs"],
              cons: ["Contact for detailed pricing", "Subject to eligibility"]
            };
          }
          
          return {
            title: rec.title || rec.name || `Insurance Plan ${index + 1}`,
            insurer: rec.insurer || rec.provider || "InsureLink Partner",
            product_type: rec.product_type || rec.type || "Insurance Plan",
            description: rec.description || rec.details || "Personalized insurance recommendation",
            pros: rec.pros || rec.benefits || ["Recommended for you", "Competitive pricing", "Good coverage"],
            cons: rec.cons || rec.limitations || ["Terms and conditions apply", "Subject to underwriting"]
          };
        });

        setRecommendations(formattedRecommendations);
        setShowRecommendations(true);
        
        // Add a message to chat about the recommendations
        const recMessage = {
          id: Date.now(),
          type: 'ai',
          content: `I've analyzed your profile and found ${formattedRecommendations.length} personalized insurance recommendations for you. Check them out below!`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, recMessage]);
      } else {
        const noRecMessage = {
          id: Date.now(),
          type: 'ai',
          content: 'I\'m working on finding the best recommendations for you. Please try asking me specific questions about insurance types you\'re interested in.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, noRecMessage]);
      }

    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError('Failed to get recommendations. Please try again.');
      
      const errorMessage = {
        id: Date.now(),
        type: 'ai',
        content: 'Sorry, I couldn\'t fetch personalized recommendations right now. Please try again later or ask me specific questions about insurance.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="header-left">
            <div className="ai-avatar">
              <div className="avatar-icon">🤖</div>
              <div className="status-indicator"></div>
            </div>
            <div className="header-info">
              <h2>AI Insurance Guide</h2>
              <p>Your personal insurance companion</p>
            </div>
          </div>
          
          <div className="header-controls">
            <button 
              className="recommendations-btn"
              onClick={handleGetRecommendations}
              disabled={isLoading}
              title="Get Personalized Recommendations"
            >
              🎯 Get Recommendations
            </button>
            
            <div className="language-selector">
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-dropdown"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              className={`voice-button ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceToggle}
              title="Voice Input"
            >
              {isListening ? '🎙️' : '🎤'}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '0.5rem 1rem',
          textAlign: 'center',
          borderBottom: '1px solid #ffcdd2'
        }}>
          {error}
          <button 
            onClick={() => setError('')}
            style={{ marginLeft: '1rem', background: 'none', border: 'none', color: '#c62828' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Chat Container */}
      <div className="chat-container" ref={chatContainerRef}>
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type} ${message.isError ? 'error' : ''}`}>
              <div className="message-content">
                <div className="message-bubble">
                  {message.content}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <div className="message-bubble loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Recommendations Panel */}
        {showRecommendations && recommendations.length > 0 && (
          <div className="recommendations-panel">
            <div className="recommendations-header">
              <h3>🎯 Personalized Insurance Recommendations</h3>
              <button 
                className="close-recommendations"
                onClick={() => setShowRecommendations(false)}
              >
                ×
              </button>
            </div>
            
            <div className="recommendations-grid">
              {recommendations.map((plan, index) => (
                <div key={index} className="recommendation-card">
                  <div className="card-header">
                    <h4>{plan.title}</h4>
                    <span className="insurer">{plan.insurer}</span>
                    <span className="product-type">{plan.product_type}</span>
                  </div>
                  
                  <div className="card-content">
                    {plan.description && (
                      <p className="description">{plan.description}</p>
                    )}
                    
                    <div className="pros-cons">
                      <div className="pros">
                        <h5>✅ Pros</h5>
                        <ul>
                          {plan.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="cons">
                        <h5>❌ Cons</h5>
                        <ul>
                          {plan.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => {
                        setInputMessage(`Tell me more about ${plan.title}`);
                      }}
                    >
                      Ask AI More
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => navigate('/plans')}
                    >
                      View All Plans
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="quick-questions">
        <p>Quick questions:</p>
        <div className="questions-grid">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about insurance..."
              className="message-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className={`send-button ${inputMessage.trim() ? 'active' : ''}`}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? '⏳' : '🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
