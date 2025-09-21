import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

const Authentication = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  // Confirmation State
  const [confirmationData, setConfirmationData] = useState({
    email: '',
    code: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate loading
    setTimeout(() => {
      setSuccess('Welcome back! Signing you in...');
      setIsLoading(false);
      // Navigate to dashboard after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1500);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signUpData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setSuccess('Account created successfully! Welcome to Longevita!');
      setIsLoading(false);
      // Navigate to dashboard after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1500);
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate loading
    setTimeout(() => {
      setSuccess('Email verified successfully! You can now sign in.');
      setIsLoading(false);
      setShowConfirmation(false);
      setIsSignUp(false);
    }, 1500);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate loading
    setTimeout(() => {
      setSuccess('Verification code resent! Please check your email.');
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setSignInData({ email: '', password: '' });
    setSignUpData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
    setConfirmationData({ email: '', code: '' });
    setError('');
    setSuccess('');
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="auth-container">
        <div className="auth-card confirmation-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">🌿</span>
              <h1>Longevita</h1>
            </div>
            <h2>Verify Your Email</h2>
            <p>We've sent a verification code to your email address</p>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleConfirmation} className="auth-form">
            <div className="form-group">
              <label htmlFor="confirmation-email">Email Address</label>
              <input
                id="confirmation-email"
                type="email"
                value={confirmationData.email}
                onChange={(e) => setConfirmationData({ ...confirmationData, email: e.target.value })}
                required
                disabled
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmation-code">Verification Code</label>
              <input
                id="confirmation-code"
                type="text"
                value={confirmationData.code}
                onChange={(e) => setConfirmationData({ ...confirmationData, code: e.target.value })}
                required
                placeholder="Enter 6-digit code"
                className="form-input"
                maxLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={isLoading || !confirmationData.code}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="auth-footer">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="btn btn-text"
            >
              Resend Code
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="btn btn-text"
            >
              Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🌿</span>
            <h1>Longevita</h1>
          </div>
          <h2>{isSignUp ? 'Create Your Account' : 'Welcome Back'}</h2>
          <p>
            {isSignUp 
              ? 'Start your wellness journey with Longevita' 
              : 'Sign in to continue your wellness journey'
            }
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="auth-form">
          {isSignUp && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                    required
                    placeholder="Enter your first name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                    required
                    placeholder="Enter your last name"
                    className="form-input"
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={isSignUp ? signUpData.email : signInData.email}
              onChange={(e) => {
                if (isSignUp) {
                  setSignUpData({ ...signUpData, email: e.target.value });
                } else {
                  setSignInData({ ...signInData, email: e.target.value });
                }
              }}
              required
              placeholder="Enter your email address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={isSignUp ? signUpData.password : signInData.password}
              onChange={(e) => {
                if (isSignUp) {
                  setSignUpData({ ...signUpData, password: e.target.value });
                } else {
                  setSignInData({ ...signInData, password: e.target.value });
                }
              }}
              required
              placeholder="Enter your password"
              className="form-input"
            />
            {isSignUp && (
              <small className="form-hint">
                Password must be at least 8 characters long
              </small>
            )}
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                required
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={isLoading}
          >
            {isLoading 
              ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
              : (isSignUp ? 'Create Account' : 'Sign In')
            }
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetForm();
              }}
              className="btn btn-text"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {!isSignUp && (
            <button
              type="button"
              onClick={() => {
                // Handle forgot password
                console.log('Forgot password clicked');
              }}
              className="btn btn-text forgot-password"
            >
              Forgot your password?
            </button>
          )}
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-auth">
          <button
            type="button"
            className="btn btn-social btn-google"
            onClick={() => {
              // Simulate Google sign in
              setIsLoading(true);
              setTimeout(() => {
                setSuccess('Signed in with Google! Welcome to Longevita!');
                setIsLoading(false);
                setTimeout(() => {
                  navigate('/');
                }, 1000);
              }, 1500);
            }}
          >
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          
          <button
            type="button"
            className="btn btn-social btn-apple"
            onClick={() => {
              // Simulate Apple sign in
              setIsLoading(true);
              setTimeout(() => {
                setSuccess('Signed in with Apple! Welcome to Longevita!');
                setIsLoading(false);
                setTimeout(() => {
                  navigate('/');
                }, 1000);
              }, 1500);
            }}
          >
            <span className="social-icon">🍎</span>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
