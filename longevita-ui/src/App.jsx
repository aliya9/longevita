import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Journal from './pages/Journal.jsx'
import Community from './pages/Community.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Navigation from './components/Navigation.jsx'
import WellnessSuggestions from './components/WellnessSuggestions.jsx'
import Chatbot from './components/Chatbot.jsx'
// Toggle Chatbot globally
export const ENABLE_CHATBOT = true

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <h1>Longevita</h1>
          <Navigation />
        </div>
      </header>
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Longevita. All rights reserved.</p>
        </div>
      </footer>
      {ENABLE_CHATBOT && <Chatbot />}
    </div>
  )
}


