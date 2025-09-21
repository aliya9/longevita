// AWS Amplify removed
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// aws-exports removed
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Authentication from './components/Authentication';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import './styles/design-system.css';
import './App.css';

// No Amplify config

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Longevita...</p>
        </div>
      </div>
    );
  }

  // Always render content (no auth)

  return (
    <Router>
      <div className="app">
        <Navigation />
        
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Chatbot />
        
        <footer className="app-footer">
          <p>&copy; 2025 Longevita. Empowering your wellness journey.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;