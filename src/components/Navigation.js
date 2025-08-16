import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user, signOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/journal', label: 'Journal', icon: '📝' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Brand */}
        <a href="/" className="nav-brand">
          <span className="nav-logo">🌿</span>
          <span>Longevita</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* User Section */}
        <div className="nav-user">
          <div className="user-info">
            <span className="user-avatar">👤</span>
            <span className="user-name">{user?.username || 'User'}</span>
          </div>
          <button onClick={handleSignOut} className="btn btn-ghost btn-sm">
            Sign Out
          </button>
        </div>

                       {/* Mobile Menu Button */}
               <button
                 className="mobile-menu-button"
                 onClick={toggleMobileMenu}
                 aria-label="Toggle mobile menu"
                 aria-expanded={isMobileMenuOpen}
                 aria-controls="mobile-menu"
               >
                 <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
               </button>
      </div>

                   {/* Mobile Menu */}
             {isMobileMenuOpen && (
               <div id="mobile-menu" className="mobile-menu animate-slide-in" role="navigation" aria-label="Mobile navigation">
          <ul className="mobile-nav-menu">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
            <li className="mobile-nav-divider"></li>
            <li>
              <button onClick={handleSignOut} className="mobile-signout-btn">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
