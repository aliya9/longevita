import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import awsExports from './aws-exports.js';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Symptoms from './pages/Symptoms';
import './styles/design-system.css';
import './App.css';

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <Router>
      <div className="app">
        <Navigation user={user} signOut={signOut} />
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Symptoms />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Chatbot />
        
        <footer className="app-footer">
          <p>&copy; 2024 Longevita. Empowering your wellness journey.</p>
        </footer>
      </div>
    </Router>
  );
}

// Placeholder components for other screens
const Community = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>👥 Community</h1>
      <p>Connect with fellow wellness enthusiasts</p>
    </div>
    <div className="content-placeholder">
      <h2>Community Features Coming Soon</h2>
      <p>Share experiences, join discussions, and support each other on your wellness journey.</p>
    </div>
  </div>
);

const Profile = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>👤 Profile</h1>
      <p>Manage your wellness profile and preferences</p>
    </div>
    <div className="content-placeholder">
      <h2>Profile Management Coming Soon</h2>
      <p>Track your progress, set goals, and customize your wellness experience.</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>⚙️ Settings</h1>
      <p>Customize your Longevita experience</p>
    </div>
    <div className="content-placeholder">
      <h2>Settings Coming Soon</h2>
      <p>Configure notifications, privacy settings, and app preferences.</p>
    </div>
  </div>
);

export default withAuthenticator(App);