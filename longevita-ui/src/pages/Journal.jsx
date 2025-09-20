import React, { useMemo, useState } from 'react'
import { listProtocols, createProtocol, updateProtocol, deleteProtocol } from '../services/protocols.mock.js'

export default function Journal() {
  const [tab, setTab] = useState('protocols')
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Journal tabs">
        {['protocols','insights','goals'].map(t => (
          <button key={t} role="tab" aria-selected={tab===t} className="tab-btn" onClick={() => setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
        ))}
      </div>
      {tab === 'protocols' && <ProtocolsTab />}
      {tab === 'insights' && <InsightsTab />}
      {tab === 'goals' && <GoalsTab />}
    </div>
  )
}

function ProtocolsTab() {
  const [list, setList] = useState(() => listProtocols())
  const [form, setForm] = useState({ symptom: '', meal: '', drink: '', herb: '', ritual: '' })
  const [editingId, setEditingId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (editingId) {
      const updated = updateProtocol(editingId, form)
      setList(list.map(i => i.id === editingId ? updated : i))
      setEditingId(null)
    } else {
      const created = createProtocol(form)
      setList([created, ...list])
    }
    setForm({ symptom: '', meal: '', drink: '', herb: '', ritual: '' })
  }

  function onEdit(item) {
    setEditingId(item.id)
    setForm({ symptom: item.symptom || '', meal: item.meal || '', drink: item.drink || '', herb: item.herb || '', ritual: item.ritual || '' })
  }

  function onDelete(id) { deleteProtocol(id); setList(list.filter(i => i.id !== id)) }

  return (
    <div className="grid cols-2">
      <form className="card" onSubmit={handleSubmit} aria-label="Protocol form">
        <h3 style={{ marginTop: 0 }}>{editingId ? 'Edit Protocol' : 'Add Protocol'}</h3>
        <div className="grid cols-2">
          <div>
            <label className="muted">Symptom</label>
            <input className="input" value={form.symptom} onChange={e => setForm({ ...form, symptom: e.target.value })} required />
          </div>
          <div>
            <label className="muted">Meal</label>
            <input className="input" value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })} />
          </div>
          <div>
            <label className="muted">Drink</label>
            <input className="input" value={form.drink} onChange={e => setForm({ ...form, drink: e.target.value })} />
          </div>
          <div>
            <label className="muted">Herb</label>
            <input className="input" value={form.herb} onChange={e => setForm({ ...form, herb: e.target.value })} />
          </div>
          <div>
            <label className="muted">Ritual</label>
            <input className="input" value={form.ritual} onChange={e => setForm({ ...form, ritual: e.target.value })} />
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
          {editingId && <button type="button" className="btn ghost" onClick={() => { setEditingId(null); setForm({ symptom: '', meal: '', drink: '', herb: '', ritual: '' }) }}>Cancel</button>}
          <button className="btn primary" type="submit">{editingId ? 'Save' : 'Add'}</button>
        </div>
      </form>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Protocols</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {list.map(item => (
            <li key={item.id} className="card" style={{ marginBottom: 10 }}>
              <div className="grid cols-3">
                <div><strong>Symptom:</strong> {item.symptom}</div>
                <div><strong>Meal:</strong> {item.meal || '-'}</div>
                <div><strong>Drink:</strong> {item.drink || '-'}</div>
                <div><strong>Herb:</strong> {item.herb || '-'}</div>
                <div><strong>Ritual:</strong> {item.ritual || '-'}</div>
                <div className="muted">{new Date(item.createdAt).toLocaleString()}</div>
              </div>
              <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn" onClick={() => onEdit(item)} aria-label="Edit protocol">Edit</button>
                <button className="btn ghost" onClick={() => onDelete(item.id)} aria-label="Delete protocol">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function InsightsTab() {
  const bars = new Array(7).fill(0).map(() => 20 + Math.round(Math.random() * 60))
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Weekly Activity</h3>
      <div className="row" style={{ alignItems: 'flex-end', gap: 10 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ width: 24, height: 100, borderRadius: 6, background: '#0d1628', border: '1px solid #23314d', display: 'grid', alignItems: 'end' }}>
            <div style={{ height: h + '%', background: 'linear-gradient(180deg,#0b4263,#0a2e46)', borderRadius: 6 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function GoalsTab() {
  const [goals, setGoals] = useState([
    { key: 'hydration', title: 'Hydration', progress: 0.6 },
    { key: 'sleep', title: 'Sleep', progress: 0.4 },
    { key: 'energy', title: 'Energy', progress: 0.7 },
  ])
  return (
    <div className="grid cols-3">
      {goals.map(g => (
        <div className="card" key={g.key}>
          <strong>{g.title}</strong>
          <div style={{ height: 10, background: '#0d1628', border: '1px solid #23314d', borderRadius: 8, marginTop: 8 }}>
            <div style={{ width: `${Math.round(g.progress*100)}%`, height: '100%', background: 'linear-gradient(90deg,#7dd3fc,#a78bfa)', borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  )
}


