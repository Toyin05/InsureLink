import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
const [messages, setMessages] = useState([
{
id: 1,
text: "Hello! I'm your personal AI Insurance Guide. I can help you understand insurance in English, Pidgin, Hausa, Yoruba, or Igbo. How can I assist you today?",
sender: 'ai',
timestamp: new Date()
}
]);
const [inputMessage, setInputMessage] = useState('');
const [isTyping, setIsTyping] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState('English');
const [isListening, setIsListening] = useState(false);
const messagesEndRef = useRef(null);
const textareaRef = useRef(null);

const languages = [
{ code: 'en', name: 'English', flag: '🇬🇧' },
{ code: 'pid', name: 'Pidgin', flag: '🇳🇬' },
{ code: 'ha', name: 'Hausa', flag: '🇳🇬' },
{ code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
{ code: 'ig', name: 'Igbo', flag: '🇳🇬' }
];

const quickActions = [
"What is insurance?",
"Health insurance plans",
"Car insurance options",
"How much does insurance cost?",
"Best insurance for families",
"Insurance claims process"
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
  text: inputMessage,  
  sender: 'user',  
  timestamp: new Date()  
};  

setMessages(prev => [...prev, userMessage]);  
setInputMessage('');  
setIsTyping(true);  

// Simulate API call delay  
setTimeout(() => {  
  const aiResponses = [  
    "Insurance na protection wey you get when something bad happen. E dey help you no pay all the money by yourself when wahala come.",  
    "Health insurance go cover your hospital bills, medicine, and doctor visits. E fit save you plenty money when you sick.",  
    "For car insurance, you get different types - third party (the cheapest one), comprehensive (the full protection), and others. Which one you wan know about?",  
    "Insurance cost depend on wetin you wan insure, your age, and how much risk dey involved. Make I help you find the best plan for your budget.",  
    "Based on your needs, I recommend these insurance plans that will work well for you and your family."  
  ];  

  const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];  

  const aiMessage = {  
    id: Date.now() + 1,  
    text: randomResponse,  
    sender: 'ai',  
    timestamp: new Date()  
  };  

  setMessages(prev => [...prev, aiMessage]);  
  setIsTyping(false);  
}, 2000);

};

const handleKeyPress = (e) => {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
handleSendMessage();
}
};

const handleQuickAction = (action) => {
setInputMessage(action);
};

const toggleVoice = () => {
setIsListening(!isListening);
// This would integrate with speech recognition API in a real implementation
};

const formatTime = (timestamp) => {
return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

return (
<div className="chatbot-container">
{/* Top Navigation */}
<div className="chat-header">
<div className="chat-header-left">
<div className="ai-avatar">
<div className="avatar-icon">🤖</div>
<div className="status-indicator"></div>
</div>
<div className="ai-info">
<h3>InsureLink AI Assistant</h3>
<p>Your Personal Insurance Guide</p>
</div>
</div>

<div className="chat-controls">  
      <select   
        value={selectedLanguage}   
        onChange={(e) => setSelectedLanguage(e.target.value)}  
        className="language-selector"  
      >  
        {languages.map((lang) => (  
          <option key={lang.code} value={lang.name}>  
            {lang.flag} {lang.name}  
          </option>  
        ))}  
      </select>  
        
      <button className="voice-toggle" onClick={toggleVoice}>  
        {isListening ? '🎤' : '🎙️'}  
      </button>  
    </div>  
  </div>  

  {/* Chat Messages Area */}  
  <div className="chat-messages">  
    <div className="messages-container">  
      {messages.map((message) => (  
        <div key={message.id} className={`message ${message.sender}`}>  
          <div className="message-content">  
            <div className="message-bubble">  
              {message.text}  
            </div>  
            <div className="message-time">  
              {formatTime(message.timestamp)}  
            </div>  
          </div>  
        </div>  
      ))}  
        
      {isTyping && (  
        <div className="message ai">  
          <div className="message-content">  
            <div className="message-bubble typing">  
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
  </div>  

  {/* Quick Actions */}  
  <div className="quick-actions">  
    <p className="quick-actions-label">Quick questions:</p>  
    <div className="quick-actions-grid">  
      {quickActions.map((action, index) => (  
        <button  
          key={index}  
          className="quick-action-btn"  
          onClick={() => handleQuickAction(action)}  
        >  
          {action}  
        </button>  
      ))}  
    </div>  
  </div>  

  {/* Input Area */}  
  <div className="chat-input-area">  
    <div className="input-container">  
      <textarea  
        ref={textareaRef}  
        value={inputMessage}  
        onChange={(e) => setInputMessage(e.target.value)}  
        onKeyPress={handleKeyPress}  
        placeholder="Ask me anything about insurance... (You fit ask for Pidgin, Hausa, Yoruba, or Igbo)"  
        className="chat-input"  
        rows="1"  
      />  
        
      <div className="input-actions">  
        <button   
          className="attachment-btn"  
          title="Attach file"  
        >  
          📎  
        </button>  
          
        <button  
          className={`send-btn ${inputMessage.trim() ? 'active' : ''}`}  
          onClick={handleSendMessage}  
          disabled={!inputMessage.trim()}  
        >  
          <div className="send-icon">➤</div>  
        </button>  
      </div>  
    </div>  
      
    <div className="input-footer">  
      <p>InsureLink AI can make mistakes. Please verify important information.</p>  
    </div>  
  </div>  

  {/* Floating Help Button */}  
  <button className="help-fab">  
    <span className="help-icon">?</span>  
    <div className="help-tooltip">  
      Need help? Click here for tips on how to use the AI assistant effectively.  
    </div>  
  </button>  
</div>

);
};

export default Chatbot;

