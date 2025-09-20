## Longevita 2.0 UI Prototype

Standalone React + Vite UI for Longevita. Pure frontend: routing, state, mock services, and localStorage persistence. Ready to swap mocks for Firebase later.

### Structure
```
longevita 2.0/
├─ README.md
└─ longevita-ui/
   ├─ index.html
   └─ src/
      ├─ App.jsx
      ├─ pages/
      ├─ components/
      ├─ hooks/
      ├─ services/
      └─ styles/
```

### Quick Start (UI Prototype)
1) Install and run
```
cd longevita-ui
npm install
npm run dev
```

2) Open the app at http://localhost:5173 (default Vite port)

### What’s Included
- Routing: `react-router-dom` with routes `/`, `/journal`, `/community`, `/profile`, `/settings`
- Persistent Navigation and app shell (header/main/footer)
- Design system: `src/styles/design-system.css` and layout `src/App.css`
- Mock services: `src/services/*.mock.js` with localStorage persistence
- Hook: `src/hooks/useHealthRecommendations.js`
- Components: `Navigation`, `WellnessSuggestions`, optional `Chatbot`
- Pages: Home, Journal, Community, Profile, Settings
- Feature flag: toggle chatbot in `src/App.jsx` via `ENABLE_CHATBOT`

### Swap In Firebase Later
Replace mocks with real services:
- `src/services/apiService.mock.js` → Firebase callable functions/HTTPS endpoints
- `src/services/protocols.mock.js` → Firestore collections (protocols)

No other code needs to change if you preserve exported function signatures.

### Notes
- Data is mock-only and persisted in `localStorage`
- No auth; safe to integrate Firebase Auth later