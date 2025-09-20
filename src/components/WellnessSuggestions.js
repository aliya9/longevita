import React, { useState } from 'react';
import { useHealthRecommendations } from '../hooks/useHealthRecommendations';
import './WellnessSuggestions.css';

const WellnessSuggestions = () => {
  const [symptoms, setSymptoms] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { 
    getRecommendations, 
    loading, 
    error, 
    recommendations,
    clearRecommendations 
  } = useHealthRecommendations();

  const handleGetSuggestions = async () => {
    if (!symptoms.trim()) return;
    
    setShowSuggestions(true);
    await getRecommendations(symptoms);
  };

  const handleClearSuggestions = () => {
    setShowSuggestions(false);
    clearRecommendations();
    setSymptoms('');
  };

  return (
    <div className="wellness-suggestions">
      <div className="wellness-header">
        <h2>🤖 AI Health Recommendations</h2>
        <p>Get personalized wellness suggestions powered by AI</p>
      </div>

      <div className="wellness-content">
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="symptoms">Describe your symptoms or health concerns:</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have frequent headaches and feel tired all the time"
              rows="3"
              className="symptoms-input"
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button
              onClick={handleGetSuggestions}
              disabled={!symptoms.trim() || loading}
              className="btn btn-primary"
            >
              {loading ? 'Getting AI Recommendations...' : 'Get AI Recommendations'}
            </button>
            
            {showSuggestions && (
              <button
                onClick={handleClearSuggestions}
                className="btn btn-secondary"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {showSuggestions && recommendations && (
          <div className="suggestions-section">
            <h3>✨ AI Health Recommendations</h3>
            
            <div className="recommendations-list">
              {recommendations.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="recommendation-header">
                    <span className="recommendation-number">{index + 1}</span>
                    <h4 className="recommendation-title">{rec.recommendation}</h4>
                  </div>
                  <p className="recommendation-rationale">{rec.rationale}</p>
                  <div className="recommendation-category">
                    <span className={`category-badge category-${rec.category}`}>
                      {rec.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {recommendations.sources && recommendations.sources.length > 0 && (
              <div className="sources-section">
                <h4>📚 Sources</h4>
                <ul className="sources-list">
                  {recommendations.sources.map((source, index) => (
                    <li key={index} className="source-item">{source}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="disclaimer">
              <p>⚠️ {recommendations.disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessSuggestions;
