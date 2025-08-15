import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createProtocol, deleteProtocol, updateProtocol } from '../graphql/mutations';
import { listProtocols } from '../graphql/queries';
import awsExports from '../aws-exports.js';
import './Symptoms.css';

Amplify.configure(awsExports);

export default function Symptoms() {
  const [symptom, setSymptom] = useState('');
  const [meal, setMeal] = useState('');
  const [drink, setDrink] = useState('');
  const [herb, setHerb] = useState('');
  const [ritual, setRitual] = useState('');
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const client = generateClient();

  useEffect(() => {
    fetchProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProtocols = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await client.graphql({ query: listProtocols });
      setProtocols(data.listProtocols.items || []);
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
      await client.graphql({
        query: createProtocol,
        variables: { 
          input: { 
            symptom: symptom.trim(),
            meal: meal.trim() || null,
            drink: drink.trim() || null,
            herb: herb.trim() || null,
            ritual: ritual.trim() || null
          } 
        }
      });
      
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
      await client.graphql({
        query: deleteProtocol,
        variables: { input: { id } }
      });
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
        await client.graphql({
          query: updateProtocol,
          variables: { 
            input: { 
              id: protocol.id,
              symptom: protocol.symptom,
              meal: protocol.meal,
              drink: protocol.drink,
              herb: protocol.herb,
              ritual: protocol.ritual
            } 
          }
        });
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

  return (
    <div className="symptoms-container">
      <div className="symptoms-header">
        <h1>🌿 Longevita Protocol Manager</h1>
        <p>Manage your health protocols and wellness routines</p>
      </div>

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
        >
          {loading ? 'Adding...' : 'Add Protocol'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={() => setError('')} className="error-close">×</button>
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
        />
        <button onClick={fetchProtocols} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      {/* Protocols List */}
      <div className="protocols-section">
        <h2>Your Protocols ({filteredProtocols.length})</h2>
        
        {loading && (
          <div className="loading">
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
                  >
                    {editingId === protocol.id ? '💾 Save' : '✏️ Edit'}
                  </button>
                  <button 
                    onClick={() => handleDelete(protocol.id)}
                    className="delete-button"
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
  );
}