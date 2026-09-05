import React, { useState } from 'react';
import { Compass, Sparkles, Layers, User, LogOut, LogIn, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ currentStep, totalSteps, isReview, viewMode, onOpenAuthModal, onNavigateHome }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Percentage calculation
  const progressPercent = viewMode === 'stage4' || viewMode === 'stage3' || viewMode === 'stage2'
    ? 100
    : isReview
    ? 100
    : Math.min(100, Math.max(0, ((currentStep) / totalSteps) * 100));

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="header-wrapper">
      <div className="nav-header">
        <div className="brand-logo" onClick={onNavigateHome} style={{ cursor: onNavigateHome ? 'pointer' : 'default' }}>
          <div className="logo-badge">
            <Compass size={20} />
          </div>
          <span>ProjectPilot <span style={{ color: 'var(--primary-cyan)' }}>AI</span></span>
          <span className="brand-tag">
            {viewMode === 'stage4' ? 'STAGE 4 MENTOR' : viewMode === 'stage3' ? 'STAGE 3 BLUEPRINT' : viewMode === 'stage2' ? 'STAGE 2 ENGINE' : 'STAGE 1'}
          </span>
        </div>

        <div className="header-right-actions">
          <div className="step-indicator-text">
            {viewMode === 'stage4' ? (
              <span style={{ color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Sparkles size={16} /> AI Mentor Active
              </span>
            ) : viewMode === 'stage3' ? (
              <span style={{ color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Layers size={16} /> Blueprint Active
              </span>
            ) : viewMode === 'stage2' ? (
              <span style={{ color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Layers size={16} /> 5 Projects Generated
              </span>
            ) : isReview ? (
              <span style={{ color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={16} /> Review Answers
              </span>
            ) : (
              <>
                Step <strong>{currentStep}</strong> of {totalSteps}
              </>
            )}
          </div>

          {/* User Auth Profile Pill / Login Trigger */}
          {user ? (
            <div className="user-menu-wrapper">
              <button
                type="button"
                className="user-profile-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar-circle">{getInitials(user.name)}</div>
                <span className="user-nav-name">{user.name}</span>
                <ChevronDown size={14} className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="user-dropdown-menu" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={logout}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-nav-btns">
              <button
                type="button"
                className="header-auth-btn header-login-btn"
                onClick={() => onOpenAuthModal('login')}
              >
                <LogIn size={15} />
                <span>Log In</span>
              </button>
              <button
                type="button"
                className="header-auth-btn header-register-btn"
                onClick={() => onOpenAuthModal('register')}
              >
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
