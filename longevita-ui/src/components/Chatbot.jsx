import React, { useEffect, useRef, useState } from 'react'
import useHealthRecommendations from '../hooks/useHealthRecommendations.js'

export default function Chatbot() {
  const { loading, recommendations, getRecommendations, clearRecommendations } = useHealthRecommendations()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('low energy')
  const dialogRef = useRef(null)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 50 }}>
      {open && (
        <div className="card" role="dialog" aria-modal="true" aria-label="AI Chatbot" ref={dialogRef} style={{ width: 360, maxWidth: '90vw' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <strong>Assistant</strong>
            <button className="btn ghost" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="space" />
          <div className="muted" style={{ minHeight: 120 }}>
            {!recommendations && <div>Hi! Describe how you feel and I’ll suggest wellness ideas.</div>}
            {recommendations && (
              <ul style={{ paddingLeft: 16 }}>
                {recommendations.recommendations.map((r, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <div><strong>{r.recommendation}</strong></div>
                    <div className="muted">{r.rationale}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space" />
          <div className="row">
            <input className="input" value={input} onChange={e => setInput(e.target.value)} aria-label="Chat input" placeholder="e.g., stress, poor sleep" />
            <button className="btn primary" onClick={() => getRecommendations(input)} disabled={loading} aria-label="Send">{loading ? '...' : 'Send'}</button>
          </div>
          {recommendations && (
            <button className="btn ghost" onClick={clearRecommendations} style={{ marginTop: 8 }} aria-label="Clear messages">Clear</button>
          )}
        </div>
      )}
      <button className="btn primary" onClick={() => setOpen(v => !v)} aria-label="Toggle chatbot">{open ? 'Close Chat' : 'Open Chat'}</button>
    </div>
  )
}


