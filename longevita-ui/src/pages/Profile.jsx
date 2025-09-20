import React, { useEffect, useState } from 'react'

const STORAGE = 'longevita_profile_v1'

export default function Profile() {
  const [tab, setTab] = useState('overview')
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Profile tabs">
        {['overview','goals','preferences','progress'].map(t => (
          <button key={t} role="tab" aria-selected={tab===t} className="tab-btn" onClick={() => setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
        ))}
      </div>
      {tab === 'overview' && <Overview />}
      {tab === 'goals' && <Goals />}
      {tab === 'preferences' && <Preferences />}
      {tab === 'progress' && <Progress />}
    </div>
  )
}

function Overview() {
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE)) || { name: '', email: '', age: '', height: '', weight: '' } } catch { return { name: '', email: '', age: '', height: '', weight: '' } }
  })
  function save() { localStorage.setItem(STORAGE, JSON.stringify(form)) }
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Overview</h3>
      <div className="grid cols-2">
        {['name','email','age','height','weight'].map(k => (
          <div key={k}>
            <label className="muted">{k[0].toUpperCase()+k.slice(1)}</label>
            <input className="input" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
          </div>
        ))}
      </div>
      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
        <button className="btn primary" onClick={save} aria-label="Save profile">Save</button>
      </div>
    </div>
  )
}

function Goals() {
  const items = ['Hydration habit', 'Consistent sleep', 'Daily movement']
  return (
    <div className="grid cols-3">
      {items.map((t, i) => (
        <div key={i} className="card">
          <strong>{t}</strong>
          <div style={{ height: 10, background: '#0d1628', border: '1px solid #23314d', borderRadius: 8, marginTop: 8 }}>
            <div style={{ width: `${30 + Math.round(Math.random()*60)}%`, height: '100%', background: 'linear-gradient(90deg,#7dd3fc,#a78bfa)', borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Preferences() {
  const [chips, setChips] = useState(['Low sugar', 'Night owl', 'Outdoor walks'])
  function remove(idx) { setChips(chips.filter((_, i) => i !== idx)) }
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Preferences</h3>
      <div className="row" style={{ flexWrap: 'wrap' }}>
        {chips.map((c, i) => (
          <span key={i} className="row" style={{ border: '1px solid #23314d', borderRadius: 999, padding: '6px 10px' }}>
            {c}
            <button className="btn ghost" onClick={() => remove(i)} aria-label={`Remove ${c}`}>✕</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function Progress() {
  return (
    <div className="grid cols-3">
      {new Array(6).fill(0).map((_, i) => (
        <div key={i} className="card">
          <strong>Week {i+1}</strong>
          <div className="row" style={{ alignItems: 'flex-end', gap: 8, marginTop: 8 }}>
            {new Array(7).fill(0).map((_, j) => (
              <div key={j} style={{ width: 12, height: 60, background: '#0d1628', border: '1px solid #23314d', borderRadius: 6, display: 'grid', alignItems: 'end' }}>
                <div style={{ height: `${20 + Math.round(Math.random()*70)}%`, background: '#7dd3fc', borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


