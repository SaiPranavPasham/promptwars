import React, { useState } from 'react';
import {
  User, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ParticleCanvas from '../landing/ParticleCanvas';

export default function AuthPage({
  initialMode = 'login', // 'login' | 'register' | 'forgot' | 'reset'
  onSuccessRegister,
  onSuccessLogin,
  onBackToHome
}) {
  const { register, login, forgotPassword, resetPassword } = useAuth();
  const [mode, setMode] = useState(initialMode);

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot / Reset state
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail || !emailRegex.test(regEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        confirmPassword: regConfirmPassword
      });
      if (onSuccessRegister) onSuccessRegister(user);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login({
        email: loginEmail.trim(),
        password: loginPassword
      });
      if (onSuccessLogin) onSuccessLogin(user);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Demo Social Auth
  const handleSocialClick = (provider) => {
    setError(`Direct ${provider} sign-in will be linked with campus SSO. Please use standard email for now.`);
  };

  return (
    <div className="auth-fullscreen-root">
      <ParticleCanvas />

      {/* Top Bar with Home link */}
      <div className="auth-header-strip">
        <button type="button" className="auth-return-btn" onClick={onBackToHome}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="auth-content-box">
        {/* ── LOGIN VIEW (SCREEN 2) ── */}
        {mode === 'login' && (
          <div className="auth-centered-card">
            <div className="auth-card-brand" onClick={onBackToHome}>
              <div className="brand-prism-icon small">
                <Sparkles size={16} color="#38BDF8" />
              </div>
              <span className="landing-brand-name">ProjectPilot AI</span>
            </div>

            <h2 className="auth-view-title">Welcome back! 👋</h2>
            <p className="auth-view-subtitle">Login to continue your journey</p>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="auth-fields-form">
              <div className="auth-input-group">
                <label htmlFor="login-email-input">Email address</label>
                <input
                  id="login-email-input"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="auth-input-group">
                <div className="label-row-with-action">
                  <label htmlFor="login-pwd-input">Password</label>
                  <button
                    type="button"
                    className="forgot-action-link"
                    onClick={() => {
                      setError(null);
                      setMode('forgot');
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="password-input-wrap">
                  <input
                    id="login-pwd-input"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading ? <Loader2 size={16} className="spin-loader" /> : <span>Login</span>}
              </button>
            </form>

            <div className="auth-or-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login-grid">
              <button
                type="button"
                className="social-auth-pill"
                onClick={() => handleSocialClick('Google')}
              >
                <span className="social-icon-g">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="social-auth-pill"
                onClick={() => handleSocialClick('GitHub')}
              >
                <span className="social-icon-gh">⌨</span>
                <span>GitHub</span>
              </button>
            </div>

            <div className="auth-bottom-switch">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="switch-text-btn"
                onClick={() => {
                  setError(null);
                  setMode('register');
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* ── REGISTER VIEW (SCREEN 3) ── */}
        {mode === 'register' && (
          <div className="auth-centered-card">
            <div className="auth-card-brand" onClick={onBackToHome}>
              <div className="brand-prism-icon small">
                <Sparkles size={16} color="#38BDF8" />
              </div>
              <span className="landing-brand-name">ProjectPilot AI</span>
            </div>

            <h2 className="auth-view-title">Create your account</h2>
            <p className="auth-view-subtitle">Start your project discovery journey</p>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="auth-fields-form">
              <div className="auth-input-group">
                <label htmlFor="reg-name-input">Full name</label>
                <input
                  id="reg-name-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-email-input">Email address</label>
                <input
                  id="reg-email-input"
                  type="email"
                  placeholder="Enter your email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-pwd-input">Password</label>
                <div className="password-input-wrap">
                  <input
                    id="reg-pwd-input"
                    type={showRegPassword ? 'text' : 'password'}
                    placeholder="Create a password (8+ chars)"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle-btn"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    tabIndex={-1}
                  >
                    {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-confirm-pwd-input">Confirm password</label>
                <input
                  id="reg-confirm-pwd-input"
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <label className="terms-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading ? <Loader2 size={16} className="spin-loader" /> : <span>Register</span>}
              </button>
            </form>

            <div className="auth-or-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login-grid">
              <button
                type="button"
                className="social-auth-pill"
                onClick={() => handleSocialClick('Google')}
              >
                <span className="social-icon-g">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="social-auth-pill"
                onClick={() => handleSocialClick('GitHub')}
              >
                <span className="social-icon-gh">⌨</span>
                <span>GitHub</span>
              </button>
            </div>

            <div className="auth-bottom-switch">
              <span>Already have an account?</span>
              <button
                type="button"
                className="switch-text-btn"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* ── FORGOT PASSWORD ── */}
        {mode === 'forgot' && (
          <div className="auth-centered-card">
            <div className="auth-card-brand" onClick={onBackToHome}>
              <div className="brand-prism-icon small">
                <Sparkles size={16} color="#38BDF8" />
              </div>
              <span className="landing-brand-name">ProjectPilot AI</span>
            </div>

            <h2 className="auth-view-title">Reset password</h2>
            <p className="auth-view-subtitle">Enter your email to receive recovery instructions</p>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  const res = await forgotPassword(forgotEmail);
                  setResetToken(res.resetToken || '');
                  setMode('reset');
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              className="auth-fields-form"
            >
              <div className="auth-input-group">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="auth-bottom-switch">
              <button
                type="button"
                className="switch-text-btn"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}

        {/* ── RESET PASSWORD ── */}
        {mode === 'reset' && (
          <div className="auth-centered-card">
            <div className="auth-card-brand" onClick={onBackToHome}>
              <div className="brand-prism-icon small">
                <Sparkles size={16} color="#38BDF8" />
              </div>
              <span className="landing-brand-name">ProjectPilot AI</span>
            </div>

            <h2 className="auth-view-title">Set a new password</h2>
            <p className="auth-view-subtitle">Enter the reset token and choose a secure password.</p>

            {error && (
              <div className="auth-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);

                if (!resetToken.trim()) {
                  setError('Please enter your reset token.');
                  return;
                }
                if (newPassword.length < 8) {
                  setError('Password must be at least 8 characters long.');
                  return;
                }
                if (newPassword !== confirmNewPassword) {
                  setError('Passwords do not match.');
                  return;
                }

                setLoading(true);
                try {
                  await resetPassword({
                    token: resetToken.trim(),
                    newPassword,
                    confirmPassword: confirmNewPassword
                  });
                  setMode('login');
                  setLoginPassword('');
                } catch (err) {
                  setError(err.message || 'Unable to reset the password.');
                } finally {
                  setLoading(false);
                }
              }}
              className="auth-fields-form"
            >
              <div className="auth-input-group">
                <label htmlFor="reset-token-input">Reset token</label>
                <input
                  id="reset-token-input"
                  type="text"
                  placeholder="Paste your reset token"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="new-password-input">New password</label>
                <input
                  id="new-password-input"
                  type="password"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="confirm-new-password-input">Confirm new password</label>
                <input
                  id="confirm-new-password-input"
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading ? <Loader2 size={16} className="spin-loader" /> : <span>Reset Password</span>}
              </button>
            </form>

            <div className="auth-bottom-switch">
              <button
                type="button"
                className="switch-text-btn"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
