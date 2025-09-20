import React, { useState } from 'react'
import useHealthRecommendations from '../hooks/useHealthRecommendations.js'

export default function WellnessSuggestions() {
  const [symptoms, setSymptoms] = useState('low energy, stress')
  const { loading, error, recommendations, getRecommendations, clearRecommendations } = useHealthRecommendations()

  return (
    <div className="card" aria-labelledby="ws-title">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 id="ws-title" style={{ margin: 0 }}>AI Wellness Suggestions</h3>
        {recommendations && <button className="btn ghost" onClick={clearRecommendations} aria-label="Clear recommendations">Clear</button>}
      </div>
      <div className="space" />
      <label htmlFor="symptoms" className="muted">Describe your symptoms or goals</label>
      <textarea id="symptoms" className="textarea" rows={3} value={symptoms} onChange={e => setSymptoms(e.target.value)} aria-label="Symptoms input" />
      <div className="space" />
      <button className="btn primary" onClick={() => getRecommendations(symptoms)} aria-label="Get AI Recommendations" disabled={loading}>
        {loading ? 'Thinking…' : 'Get AI Recommendations'}
      </button>
      {error && <p role="alert" className="muted">{error}</p>}
      {recommendations && (
        <div style={{ marginTop: 16 }}>
          <h4 style={{ marginTop: 0 }}>Recommendations</h4>
          <ul>
            {recommendations.recommendations.map((r, i) => (
              <li key={i} className="card" style={{ padding: 12, marginBottom: 8 }}>
                <strong>{r.recommendation}</strong>
                <div className="muted">{r.rationale}</div>
                <div className="muted">Category: {r.category}</div>
              </li>
            ))}
          </ul>
          <div className="muted">Sources: {recommendations.sources.join(', ')}</div>
          <div className="muted" style={{ marginTop: 8 }}>{recommendations.disclaimer}</div>
        </div>
      )}
    </div>
  )
}


