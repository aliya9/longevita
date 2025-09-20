const STORAGE_KEY = 'longevita_protocols_v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

let state = load()

export function listProtocols() {
  return [...state].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function createProtocol(item) {
  const now = new Date().toISOString()
  const record = { id: crypto.randomUUID(), createdAt: now, ...item }
  state = [record, ...state]
  save(state)
  return record
}

export function updateProtocol(id, patch) {
  let updated
  state = state.map(p => {
    if (p.id === id) { updated = { ...p, ...patch }; return updated }
    return p
  })
  save(state)
  return updated
}

export function deleteProtocol(id) {
  state = state.filter(p => p.id !== id)
  save(state)
}


