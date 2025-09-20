import React, { useState, useEffect } from 'react';
// AWS Amplify removed; this file should be migrated to use mock services
// Keeping UI intact; swap to longevita-ui mock services if needed
import './Journal.css';

// No Amplify

export default function Journal() {
  const [symptom, setSymptom] = useState('');
  const [meal, setMeal] = useState('');
  const [drink, setDrink] = useState('');
  const [herb, setHerb] = useState('');
  const [ritual, setRitual] = useState('');
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);
  const [water, setWater] = useState(0);
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('protocols');
  const [showMoodModal, setShowMoodModal] = useState(false);
  // const client = generateClient();

  const moodOptions = [
    { value: 'excellent', label: 'Excellent', emoji: '😊', color: 'var(--success)' },
    { value: 'good', label: 'Good', emoji: '🙂', color: 'var(--soft-green)' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'var(--gray-400)' },
    { value: 'low', label: 'Low', emoji: '😔', color: 'var(--warning)' },
    { value: 'poor', label: 'Poor', emoji: '😢', color: 'var(--error)' }
  ];

  const energyLevels = [
    { value: 1, label: 'Very Low', emoji: '😴' },
    { value: 2, label: 'Low', emoji: '😪' },
    { value: 3, label: 'Moderate', emoji: '😐' },
    { value: 4, label: 'Good', emoji: '🙂' },
    { value: 5, label: 'Excellent', emoji: '😊' }
  ];

  useEffect(() => {
    fetchProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProtocols = async () => {
    try {
      setLoading(true);
      setError('');
      setProtocols([]);
    } catch (err) {
      setError('Failed to load protocols: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!symptom.trim()) {
      setError('Symptom is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // create via backend removed in UI-only mode
      
      // Clear form
      setSymptom('');
      setMeal('');
      setDrink('');
      setHerb('');
      setRitual('');
      
      // Refresh list
      fetchProtocols();
    } catch (err) {
      setError('Failed to add protocol: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this protocol?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      // delete via backend removed in UI-only mode
      fetchProtocols();
    } catch (err) {
      setError('Failed to delete protocol: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (protocol) => {
    if (editingId === protocol.id) {
      // Save changes
      try {
        setLoading(true);
        setError('');
        // update via backend removed in UI-only mode
        setEditingId(null);
        fetchProtocols();
      } catch (err) {
        setError('Failed to update protocol: ' + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Enter edit mode
      setEditingId(protocol.id);
    }
  };

  const filteredProtocols = protocols.filter(protocol =>
    protocol.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (protocol.meal && protocol.meal.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (protocol.herb && protocol.herb.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleMoodSubmit = () => {
    // Here you would typically save to your backend
    setShowMoodModal(false);
    setMood('');
  };

  const handleWaterIncrement = () => {
    setWater(prev => Math.min(prev + 1, 12));
  };

  const handleWaterDecrement = () => {
    setWater(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="journal-container">
      {/* Header Section */}
      <div className="journal-header">
        <div className="header-content">
          <h1>📝 Wellness Journal</h1>
          <p>Track your health journey and discover what works best for you</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setShowMoodModal(true)}
            className="btn btn-primary"
            aria-label="Log today's mood"
          >
            😊 Log Mood
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-content">
            <h3>Water Intake</h3>
            <div className="water-controls">
              <button 
                onClick={handleWaterDecrement}
                className="water-btn"
                aria-label="Decrease water intake"
              >
                -
              </button>
              <span className="water-amount">{water}/12 glasses</span>
              <button 
                onClick={handleWaterIncrement}
                className="water-btn"
                aria-label="Increase water intake"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>Energy Level</h3>
            <div className="energy-slider">
              <input
                type="range"
                min="1"
                max="5"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="energy-range"
                aria-label="Energy level slider"
              />
              <span className="energy-label">{energyLevels[energy - 1]?.emoji} {energyLevels[energy - 1]?.label}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">😴</div>
          <div className="stat-content">
            <h3>Sleep Hours</h3>
            <div className="sleep-controls">
              <button 
                onClick={() => setSleep(prev => Math.max(prev - 0.5, 0))}
                className="sleep-btn"
                aria-label="Decrease sleep hours"
              >
                -
              </button>
              <span className="sleep-amount">{sleep}h</span>
              <button 
                onClick={() => setSleep(prev => Math.min(prev + 0.5, 12))}
                className="sleep-btn"
                aria-label="Increase sleep hours"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'protocols' ? 'active' : ''}`}
          onClick={() => setActiveTab('protocols')}
          aria-label="View protocols tab"
        >
          🌿 Protocols
        </button>
        <button
          className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
          aria-label="View insights tab"
        >
          📊 Insights
        </button>
        <button
          className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`}
          onClick={() => setActiveTab('goals')}
          aria-label="View goals tab"
        >
          🎯 Goals
        </button>
      </div>

      {/* Protocols Tab */}
      {activeTab === 'protocols' && (
        <div className="tab-content">
          {/* Add New Protocol Form */}
          <div className="add-protocol-form">
            <h2>Add New Protocol</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="symptom">Symptom/Condition *</label>
                <input
                  id="symptom"
                  type="text"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="e.g., Headache, Fatigue, Insomnia"
                  className="form-input"
                  aria-required="true"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="meal">Recommended Meal</label>
                <input
                  id="meal"
                  type="text"
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  placeholder="e.g., Ginger tea with honey"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="drink">Recommended Drink</label>
                <input
                  id="drink"
                  type="text"
                  value={drink}
                  onChange={(e) => setDrink(e.target.value)}
                  placeholder="e.g., Chamomile tea"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="herb">Herbal Remedy</label>
                <input
                  id="herb"
                  type="text"
                  value={herb}
                  onChange={(e) => setHerb(e.target.value)}
                  placeholder="e.g., Lavender, Peppermint"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="ritual">Wellness Ritual</label>
                <input
                  id="ritual"
                  type="text"
                  value={ritual}
                  onChange={(e) => setRitual(e.target.value)}
                  placeholder="e.g., 10-minute meditation"
                  className="form-input"
                />
              </div>
            </div>
            
            <button 
              onClick={handleAdd} 
              disabled={loading || !symptom.trim()}
              className="add-button"
              aria-label="Add new protocol"
            >
              {loading ? 'Adding...' : 'Add Protocol'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-message" role="alert">
              <span>⚠️ {error}</span>
              <button 
                onClick={() => setError('')} 
                className="error-close"
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          )}

          {/* Search and Filter */}
          <div className="search-section">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search protocols..."
              className="search-input"
              aria-label="Search protocols"
            />
            <button 
              onClick={fetchProtocols} 
              className="refresh-button"
              aria-label="Refresh protocols"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Protocols List */}
          <div className="protocols-section">
            <h2>Your Protocols ({filteredProtocols.length})</h2>
            
            {loading && (
              <div className="loading" aria-live="polite">
                <div className="spinner"></div>
                <p>Loading protocols...</p>
              </div>
            )}

            {!loading && filteredProtocols.length === 0 && (
              <div className="empty-state">
                <p>No protocols found. Add your first protocol above!</p>
              </div>
            )}

            <div className="protocols-grid">
              {filteredProtocols.map((protocol) => (
                <div key={protocol.id} className="protocol-card">
                  <div className="protocol-header">
                    <h3>{protocol.symptom}</h3>
                    <div className="protocol-actions">
                      <button 
                        onClick={() => handleEdit(protocol)}
                        className="edit-button"
                        aria-label={`${editingId === protocol.id ? 'Save' : 'Edit'} protocol`}
                      >
                        {editingId === protocol.id ? '💾 Save' : '✏️ Edit'}
                      </button>
                      <button 
                        onClick={() => handleDelete(protocol.id)}
                        className="delete-button"
                        aria-label="Delete protocol"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="protocol-content">
                    {editingId === protocol.id ? (
                      <div className="edit-form">
                        <input
                          value={protocol.symptom}
                          onChange={(e) => {
                            const updated = protocols.map(p => 
                              p.id === protocol.id ? {...p, symptom: e.target.value} : p
                            );
                            setProtocols(updated);
                          }}
                          className="edit-input"
                          aria-label="Edit symptom"
                        />
                        <input
                          value={protocol.meal || ''}
                          onChange={(e) => {
                            const updated = protocols.map(p => 
                              p.id === protocol.id ? {...p, meal: e.target.value} : p
                            );
                            setProtocols(updated);
                          }}
                          placeholder="Meal"
                          className="edit-input"
                          aria-label="Edit meal"
                        />
                        <input
                          value={protocol.drink || ''}
                          onChange={(e) => {
                            const updated = protocols.map(p => 
                              p.id === protocol.id ? {...p, drink: e.target.value} : p
                            );
                            setProtocols(updated);
                          }}
                          placeholder="Drink"
                          className="edit-input"
                          aria-label="Edit drink"
                        />
                        <input
                          value={protocol.herb || ''}
                          onChange={(e) => {
                            const updated = protocols.map(p => 
                              p.id === protocol.id ? {...p, herb: e.target.value} : p
                            );
                            setProtocols(updated);
                          }}
                          placeholder="Herb"
                          className="edit-input"
                          aria-label="Edit herb"
                        />
                        <input
                          value={protocol.ritual || ''}
                          onChange={(e) => {
                            const updated = protocols.map(p => 
                              p.id === protocol.id ? {...p, ritual: e.target.value} : p
                            );
                            setProtocols(updated);
                          }}
                          placeholder="Ritual"
                          className="edit-input"
                          aria-label="Edit ritual"
                        />
                      </div>
                    ) : (
                      <div className="protocol-details">
                        {protocol.meal && (
                          <div className="detail-item">
                            <span className="detail-label">🍽️ Meal:</span>
                            <span>{protocol.meal}</span>
                          </div>
                        )}
                        {protocol.drink && (
                          <div className="detail-item">
                            <span className="detail-label">🥤 Drink:</span>
                            <span>{protocol.drink}</span>
                          </div>
                        )}
                        {protocol.herb && (
                          <div className="detail-item">
                            <span className="detail-label">🌿 Herb:</span>
                            <span>{protocol.herb}</span>
                          </div>
                        )}
                        {protocol.ritual && (
                          <div className="detail-item">
                            <span className="detail-label">🧘 Ritual:</span>
                            <span>{protocol.ritual}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="protocol-footer">
                    <small>Created: {new Date(protocol.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="tab-content">
          <div className="insights-container">
            <h2>Wellness Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Weekly Progress</h3>
                <div className="progress-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '95%' }}></div>
                </div>
                <p>Your wellness score is improving!</p>
              </div>
              
              <div className="insight-card">
                <h3>Most Effective Protocols</h3>
                <ul className="insight-list">
                  <li>🌿 Herbal tea for sleep</li>
                  <li>🧘 Morning meditation</li>
                  <li>🥗 Green smoothies</li>
                </ul>
              </div>
              
              <div className="insight-card">
                <h3>Recommendations</h3>
                <p>Based on your patterns, try increasing water intake and adding more leafy greens to your diet.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="tab-content">
          <div className="goals-container">
            <h2>Wellness Goals</h2>
            <div className="goals-grid">
              <div className="goal-card">
                <h3>Daily Hydration</h3>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(water/12)*100}%` }}></div>
                  </div>
                  <span>{water}/12 glasses</span>
                </div>
                <p>Goal: Drink 12 glasses of water daily</p>
              </div>
              
              <div className="goal-card">
                <h3>Sleep Quality</h3>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(sleep/8)*100}%` }}></div>
                  </div>
                  <span>{sleep}/8 hours</span>
                </div>
                <p>Goal: Get 8 hours of quality sleep</p>
              </div>
              
              <div className="goal-card">
                <h3>Energy Level</h3>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(energy/5)*100}%` }}></div>
                  </div>
                  <span>{energy}/5</span>
                </div>
                <p>Goal: Maintain high energy throughout the day</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Modal */}
      {showMoodModal && (
        <div className="modal-backdrop" onClick={() => setShowMoodModal(false)}>
          <div className="mood-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>How are you feeling today?</h3>
              <button 
                onClick={() => setShowMoodModal(false)}
                className="modal-close"
                aria-label="Close mood modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="mood-options">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`mood-option ${mood === option.value ? 'selected' : ''}`}
                    style={{ '--mood-color': option.color }}
                    aria-label={`Select ${option.label} mood`}
                  >
                    <span className="mood-emoji">{option.emoji}</span>
                    <span className="mood-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={handleMoodSubmit}
                disabled={!mood}
                className="btn btn-primary"
              >
                Save Mood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
