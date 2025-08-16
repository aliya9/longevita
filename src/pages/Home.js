import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  const wellnessCards = [
    {
      id: 1,
      title: 'Low Energy',
      icon: '⚡',
      color: 'var(--peach-tint)',
      description: 'Feeling tired and sluggish?'
    },
    {
      id: 2,
      title: 'Stress & Anxiety',
      icon: '🧘',
      color: 'var(--serenity-blue)',
      description: 'Need help finding calm?'
    },
    {
      id: 3,
      title: 'Digestive Health',
      icon: '🌱',
      color: 'var(--soft-green)',
      description: 'Support your gut health'
    },
    {
      id: 4,
      title: 'Sleep Issues',
      icon: '😴',
      color: 'var(--serenity-blue-light)',
      description: 'Improve your sleep quality'
    },
    {
      id: 5,
      title: 'Immune Support',
      icon: '🛡️',
      color: 'var(--soft-green-light)',
      description: 'Boost your natural defenses'
    },
    {
      id: 6,
      title: 'Mental Clarity',
      icon: '🧠',
      color: 'var(--peach-tint-light)',
      description: 'Enhance focus and cognition'
    }
  ];

  const aiSuggestions = {
    'Low Energy': {
      title: 'Natural Energy Boosters',
      suggestions: [
        'Try a morning green smoothie with spinach and banana',
        'Take a 10-minute walk in natural sunlight',
        'Practice deep breathing exercises',
        'Stay hydrated with lemon water'
      ],
      icon: '⚡'
    },
    'Stress & Anxiety': {
      title: 'Calming Techniques',
      suggestions: [
        'Practice 5-4-3-2-1 grounding exercise',
        'Try lavender essential oil aromatherapy',
        'Listen to calming nature sounds',
        'Write down your thoughts in a journal'
      ],
      icon: '🧘'
    },
    'Digestive Health': {
      title: 'Gut-Friendly Practices',
      suggestions: [
        'Start your day with warm lemon water',
        'Include probiotic-rich foods like yogurt',
        'Practice mindful eating',
        'Try ginger tea for digestion'
      ],
      icon: '🌱'
    }
  };

  const tipsOfTheDay = [
    "Drinking warm water with lemon first thing in the morning can boost your metabolism and support liver function. 🍋",
    "Taking just 5 minutes to practice deep breathing can reduce stress hormones and improve your mood. 🌬️",
    "Walking barefoot on grass for 10 minutes (earthing) can reduce inflammation and improve sleep quality. 🌿",
    "Adding a pinch of turmeric to your meals can provide powerful anti-inflammatory benefits. 🧡",
    "Spending time in nature can reduce cortisol levels and improve your overall sense of well-being. 🌳"
  ];

  useEffect(() => {
    // Show tip of the day after 2 seconds
    const timer = setTimeout(() => {
      const randomTip = tipsOfTheDay[Math.floor(Math.random() * tipsOfTheDay.length)];
      setCurrentTip(randomTip);
      setShowTip(true);
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (card, event) => {
    setSelectedSymptom(card);
    // Remove focus from the clicked card to prevent persistent focus state
    if (event && event.target) {
      event.target.blur();
    }
  };

  const closeSuggestion = () => {
    setSelectedSymptom(null);
  };

  const closeTip = () => {
    setShowTip(false);
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <div className="welcome-section">
          <h1>Welcome back! 👋</h1>
          <p className="subtitle">How are you feeling today?</p>
        </div>
        <div className="date-section">
          <p className="date">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Wellness Cards Grid */}
      <div className="wellness-section">
        <h2>Choose Your Focus Area</h2>
        <div className="wellness-grid">
          {wellnessCards.map((card) => (
            <div
              key={card.id}
              className="wellness-card interactive"
              style={{ '--card-color': card.color }}
              onClick={(e) => handleCardClick(card, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Get wellness suggestions for ${card.title}`}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {selectedSymptom && (
        <div className="modal-backdrop" onClick={closeSuggestion}>
          <div className="ai-suggestion-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{aiSuggestions[selectedSymptom.title]?.icon}</span>
                <h3>{aiSuggestions[selectedSymptom.title]?.title}</h3>
              </div>
              <button className="modal-close" onClick={closeSuggestion}>✕</button>
            </div>
            <div className="modal-body">
              <p className="suggestion-intro">
                Based on your selection of "{selectedSymptom.title}", here are some personalized recommendations:
              </p>
              <ul className="suggestions-list">
                {aiSuggestions[selectedSymptom.title]?.suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    <span className="suggestion-bullet">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={closeSuggestion}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tip of the Day */}
      {showTip && (
        <div className="tip-overlay" onClick={closeTip}>
          <div className="tip-card animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="tip-header">
              <span className="tip-icon">💡</span>
              <h3>Tip of the Day</h3>
              <button className="tip-close" onClick={closeTip}>✕</button>
            </div>
            <div className="tip-content">
              <p>{currentTip}</p>
            </div>
            <div className="tip-footer">
              <button className="btn btn-secondary" onClick={closeTip}>
                Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card interactive" aria-label="Log today's meals">
            <span className="action-icon">📝</span>
            <span>Log Today's Meals</span>
          </button>
          <button className="action-card interactive" aria-label="Start meditation session">
            <span className="action-icon">🧘</span>
            <span>Start Meditation</span>
          </button>
          <button className="action-card interactive" aria-label="Track water intake">
            <span className="action-icon">💧</span>
            <span>Track Water Intake</span>
          </button>
          <button className="action-card interactive" aria-label="View wellness protocols">
            <span className="action-icon">🌿</span>
            <span>View Protocols</span>
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="progress-summary">
        <h2>Your Wellness Journey</h2>
        <div className="progress-cards">
          <div className="progress-card interactive" role="button" tabIndex={0} aria-label="View streak details">
            <div className="progress-icon">📊</div>
            <div className="progress-info">
              <h4>7 Day Streak</h4>
              <p>Keep up the great work!</p>
            </div>
          </div>
          <div className="progress-card interactive" role="button" tabIndex={0} aria-label="View goals progress">
            <div className="progress-icon">🎯</div>
            <div className="progress-info">
              <h4>5 Goals Set</h4>
              <p>3 completed this week</p>
            </div>
          </div>
          <div className="progress-card interactive" role="button" tabIndex={0} aria-label="View wellness score details">
            <div className="progress-icon">🌟</div>
            <div className="progress-info">
              <h4>Wellness Score</h4>
              <p>85/100 - Excellent!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
