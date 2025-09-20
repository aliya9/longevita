import React, { useMemo, useState } from 'react'

const SAMPLE = {
  discussions: [
    { id: 'd1', title: 'Morning routines that actually work?', body: 'Share what helped your energy', author: 'Maya' },
    { id: 'd2', title: 'Best hydration tips', body: 'Electrolytes vs plain water?', author: 'Neo' },
    { id: 'd3', title: 'Evening wind-down ideas', body: 'Reducing late-night screen time', author: 'Alex' },
  ],
  challenges: [
    { id: 'c1', name: '7-Day Hydration' },
    { id: 'c2', name: '10k Steps Week' },
    { id: 'c3', name: 'Sleep by 11pm' },
  ],
  experts: [
    { id: 'e1', name: 'Dr. Lee', specialty: 'Sleep' },
    { id: 'e2', name: 'Coach Zara', specialty: 'Performance' },
  ],
  resources: [
    { id: 'r1', title: 'Breathing Techniques 101' },
    { id: 'r2', title: 'Hydration Myths' },
    { id: 'r3', title: 'Light Exposure & Energy' },
  ],
}

export default function Community() {
  const [tab, setTab] = useState('discussions')
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState(SAMPLE.discussions)
  const [showModal, setShowModal] = useState(false)
  const [draft, setDraft] = useState({ title: '', body: '' })

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return posts.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))
  }, [posts, query])

  function createPost() {
    const item = { id: String(Math.random()).slice(2), title: draft.title, body: draft.body, author: 'You' }
    setPosts([item, ...posts])
    setDraft({ title: '', body: '' })
    setShowModal(false)
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Community tabs">
        {['discussions','challenges','experts','resources'].map(t => (
          <button key={t} role="tab" aria-selected={tab===t} className="tab-btn" onClick={() => setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      {tab === 'discussions' && (
        <div className="card">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <input className="input" placeholder="Search discussions" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search discussions" />
            <button className="btn primary" onClick={() => setShowModal(true)} aria-label="Create Post">Create Post</button>
          </div>
          <div className="space" />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filtered.map(p => (
              <li key={p.id} className="card" style={{ marginBottom: 10 }}>
                <strong>{p.title}</strong>
                <div className="muted">{p.body}</div>
                <div className="muted">by {p.author}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'challenges' && (
        <div className="grid cols-3">
          {SAMPLE.challenges.map(c => (
            <div key={c.id} className="card"><strong>{c.name}</strong></div>
          ))}
        </div>
      )}

      {tab === 'experts' && (
        <div className="grid cols-2">
          {SAMPLE.experts.map(e => (
            <div key={e.id} className="card"><strong>{e.name}</strong><div className="muted">{e.specialty}</div></div>
          ))}
        </div>
      )}

      {tab === 'resources' && (
        <div className="grid cols-3">
          {SAMPLE.resources.map(r => (
            <div key={r.id} className="card"><strong>{r.title}</strong></div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create Post">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>Create Post</h3>
              <button className="btn ghost" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            </div>
            <div className="space" />
            <label className="muted">Title</label>
            <input className="input" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
            <div className="space" />
            <label className="muted">Body</label>
            <textarea className="textarea" rows={4} value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} />
            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="btn primary" onClick={createPost} aria-label="Publish">Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


