import React, { useEffect, useState } from 'react'

const STORAGE = 'longevita_settings_v1'
const DEFAULTS = { notifications: true, privacy: 'friends', appearance: 'system', emailTips: false }

export default function Settings() {
  const [tab, setTab] = useState('notifications')
  const [settings, setSettings] = useState(() => {
    try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(STORAGE)) || {}) } } catch { return DEFAULTS }
  })

  function save() { localStorage.setItem(STORAGE, JSON.stringify(settings)) }
  function reset() { setSettings(DEFAULTS); localStorage.setItem(STORAGE, JSON.stringify(DEFAULTS)) }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Settings tabs">
        {['notifications','privacy','appearance','account'].map(t => (
          <button key={t} role="tab" aria-selected={tab===t} className="tab-btn" onClick={() => setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      <div className="card">
        {tab === 'notifications' && (
          <div>
            <div className="row"><input id="ntf" type="checkbox" checked={settings.notifications} onChange={e => setSettings({ ...settings, notifications: e.target.checked })} /><label htmlFor="ntf"> Enable notifications</label></div>
            <div className="row"><input id="email" type="checkbox" checked={settings.emailTips} onChange={e => setSettings({ ...settings, emailTips: e.target.checked })} /><label htmlFor="email"> Email wellness tips</label></div>
          </div>
        )}
        {tab === 'privacy' && (
          <div>
            <label className="muted">Profile visibility</label>
            <select className="select" value={settings.privacy} onChange={e => setSettings({ ...settings, privacy: e.target.value })}>
              <option value="private">Private</option>
              <option value="friends">Friends</option>
              <option value="public">Public</option>
            </select>
          </div>
        )}
        {tab === 'appearance' && (
          <div>
            <label className="muted">Theme</label>
            <select className="select" value={settings.appearance} onChange={e => setSettings({ ...settings, appearance: e.target.value })}>
              <option value="system">System</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        )}
        {tab === 'account' && (
          <div className="muted">Local-only demo. No real account actions.</div>
        )}
        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
          <button className="btn" onClick={reset} aria-label="Reset to default">Reset to Default</button>
          <button className="btn primary" onClick={save} aria-label="Save changes">Save Changes</button>
        </div>
      </div>
    </div>
  )
}


