import React, { useState, useRef, useEffect } from 'react';
import { useHealthRecommendations } from '../hooks/useHealthRecommendations';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI-powered Longevita wellness assistant. I can help you with personalized health recommendations based on your symptoms. How can I help you today? 🌿',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { getRecommendations, loading, error } = useHealthRecommendations();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI recommendations from backend
      const recommendations = await getRecommendations(currentMessage);
      
      if (recommendations && recommendations.recommendations) {
        // Format AI response
        let botResponse = "Based on your symptoms, here are my recommendations:\n\n";
        
        recommendations.recommendations.forEach((rec, index) => {
          botResponse += `${index + 1}. **${rec.recommendation}**\n`;
          botResponse += `   *Why: ${rec.rationale}*\n\n`;
        });

        if (recommendations.sources && recommendations.sources.length > 0) {
          botResponse += "📚 *Sources:*\n";
          recommendations.sources.forEach(source => {
            botResponse += `• ${source}\n`;
          });
        }

        botResponse += `\n⚠️ *${recommendations.disclaimer}*`;

        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: botResponse,
          timestamp: new Date(),
          recommendations: recommendations.recommendations
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        // Fallback response if AI fails
        const fallbackMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm having trouble connecting to my AI service right now. Please try again in a moment, or contact a healthcare professional for immediate concerns. 🔄",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
    } catch (err) {
      console.error('Error getting AI response:', err);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or consult a healthcare professional for immediate concerns. 🔄",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className={`chatbot-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <span className="chatbot-icon">✕</span>
        ) : (
          <span className="chatbot-icon">💬</span>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="chatbot-container animate-scale-in">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-avatar">🌿</span>
              <div>
                <h3>Longevita Assistant</h3>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={toggleChat}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type === 'user' ? 'user' : 'bot'}`}
                role="article"
                aria-label={`${message.type === 'user' ? 'You' : 'Bot'} message`}
              >
                <div className="message-content">
                  <div className="message-text">
                    {message.content.split('\n').map((line, index) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <div key={index} className="recommendation-title">{line.replace(/\*\*/g, '')}</div>;
                      } else if (line.startsWith('   *') && line.endsWith('*')) {
                        return <div key={index} className="recommendation-rationale">{line.replace(/\*/g, '')}</div>;
                      } else if (line.startsWith('📚 *') || line.startsWith('⚠️ *')) {
                        return <div key={index} className="message-section">{line.replace(/\*/g, '')}</div>;
                      } else if (line.startsWith('• ')) {
                        return <div key={index} className="source-item">{line}</div>;
                      } else if (line.trim() === '') {
                        return <br key={index} />;
                      } else {
                        return <div key={index}>{line}</div>;
                      }
                    })}
                  </div>
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <div className="input-wrapper">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms or health concerns..."
                rows="1"
                className="chatbot-textarea"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || loading}
                className="send-button"
                aria-label="Send message"
              >
                {loading ? '⏳' : '➤'}
              </button>
            </div>
            
            {error && (
              <div className="chatbot-error">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
