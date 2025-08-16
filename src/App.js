import { Amplify } from 'aws-amplify';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import awsExports from './aws-exports.js';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Authentication from './components/Authentication';
import './styles/design-system.css';
import './App.css';

Amplify.configure(awsExports);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  if (!user) {
    return <Authentication onSignIn={checkAuthState} />;
  }

  return (
    <Router>
      <div className="app">
        <Navigation user={user} signOut={handleSignOut} />
        
        <main className="app-main">
          <Routes>
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