import React, { useEffect, useRef, useState } from 'react'
import WellnessSuggestions from '../components/WellnessSuggestions.jsx'

const FOCUS_AREAS = [
  { key: 'low-energy', title: 'Low Energy', tips: ['Hydrate early', 'Light sunlight exposure', '10-min brisk walk'] },
  { key: 'stress-anxiety', title: 'Stress & Anxiety', tips: ['Box breathing 4-4-4-4', 'Magnesium-rich foods', 'Evening wind-down'] },
  { key: 'digestive', title: 'Digestive Health', tips: ['Walk after meals', 'Ginger tea', 'Chew slowly'] },
  { key: 'sleep', title: 'Sleep Issues', tips: ['Dim lights after 9pm', 'No caffeine after 2pm', 'Consistent schedule'] },
  { key: 'immune', title: 'Immune Support', tips: ['Vitamin C foods', 'Adequate sleep', 'Nasal breathing'] },
  { key: 'clarity', title: 'Mental Clarity', tips: ['Single-task blocks', 'Hydration check', 'Short movement breaks'] },
]

export default function Home() {
  const [selected, setSelected] = useState(null)
  const [showAI, setShowAI] = useState(false)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') { setSelected(null); setShowAI(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Choose Your Focus Area</h2>
        <div className="grid cols-3">
          {FOCUS_AREAS.map(a => (
            <button key={a.key} className="card focus-card" onClick={() => { setSelected(a); setShowAI(false) }} aria-label={`Open ${a.title} tips`}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>{a.title}</h3>
                <div className="muted">Click to view tips</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="space" />

      <section className="grid cols-3">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Your Wellness Journey</h3>
          <div className="grid cols-3">
            <div className="card"><strong>Streak</strong><div className="muted">5 days</div></div>
            <div className="card"><strong>Goals</strong><div className="muted">3 active</div></div>
            <div className="card"><strong>Score</strong><div className="muted">72</div></div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${selected.title} tips`}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{selected.title}</h3>
              <button className="btn ghost" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            </div>
            <ul>
              {selected.tips.map((t, i) => <li key={i} className="muted" style={{ marginBottom: 6 }}>{t}</li>)}
            </ul>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn primary" onClick={() => setShowAI(true)} aria-label="Get AI Suggestions">Get AI Suggestions</button>
            </div>
            {showAI && (
              <div style={{ marginTop: 16 }}>
                <WellnessSuggestions />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


