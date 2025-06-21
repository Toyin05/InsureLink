import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your personal AI Insurance Guide. I\'m here to help you understand insurance and find the best plans for you. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'yoruba', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'hausa', name: 'Hausa', flag: '🇳🇬' },
    { code: 'igbo', name: 'Igbo', flag: '🇳🇬' },
    { code: 'pidgin', name: 'Pidgin', flag: '🇳🇬' }
  ];

  const quickQuestions = [
    "What is insurance?",
    "How does health insurance work?",
    "What's the best car insurance for me?",
    "How much should I pay for insurance?",
    "What does life insurance cover?"
  ];

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
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate API call for AI response
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          language: selectedLanguage
        })
      });

      // Simulate response for demo
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'Insurance is a financial protection plan that helps you manage risks and unexpected expenses. When you pay regular premiums, the insurance company covers specific costs when certain events happen, like accidents, illness, or property damage. This way, you don\'t have to pay large amounts all at once during emergencies.',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);

        // Randomly show recommendations
        if (Math.random() > 0.6) {
          setTimeout(() => {
            setRecommendations([
              {
                title: "Comprehensive Health Plus",
                insurer: "Leadway Assurance",
                product_type: "Health Insurance",
                pros: ["Covers surgery and hospitalization", "Family coverage available", "No age limit"],
                cons: ["Higher premium", "Requires medical checkup"]
              },
              {
                title: "Basic Care Plan",
                insurer: "ARM Life",
                product_type: "Health Insurance", 
                pros: ["Affordable premium", "Quick approval", "Covers basic treatments"],
                cons: ["Limited coverage", "No surgery coverage"]
              }
            ]);
            setShowRecommendations(true);
          }, 1000);
        }
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
    setTimeout(() => setIsListening(false), 3000);
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

      {/* Chat Container */}
      <div className="chat-container" ref={chatContainerRef}>
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
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
              <h3>🎯 Recommended Insurance Plans</h3>
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
                    <button className="btn-secondary">Learn More</button>
                    <button className="btn-primary">Get Quote</button>
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
