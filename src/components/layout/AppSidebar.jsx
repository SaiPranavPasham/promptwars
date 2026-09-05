import React from 'react';
import {
  LayoutDashboard, FolderGit2, Layers, Bot, Users, Bookmark,
  Settings, LogOut, Sparkles, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppSidebar({
  currentSection = 'dashboard', // 'dashboard' | 'projects' | 'blueprints' | 'mentor' | 'team' | 'saved' | 'settings'
  onNavigate,
  onLogout
}) {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'blueprints', label: 'Blueprints', icon: Layers },
    { id: 'mentor', label: 'AI Mentor', icon: Bot, badge: 'Active' },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="app-unified-sidebar">
      {/* Brand Logo */}
      <div className="sidebar-brand" onClick={() => onNavigate('dashboard')}>
        <div className="brand-prism-icon small">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#sidebarPrism1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="url(#sidebarPrism2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="url(#sidebarPrism3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="sidebarPrism1" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#818CF8" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="sidebarPrism2" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EC4899" />
                <stop offset="0.5" stopColor="#FB923C" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="sidebarPrism3" x1="2" y1="12" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#FB923C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="sidebar-brand-name">ProjectPilot AI</span>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="nav-item-left">
                <Icon size={18} className="sidebar-nav-icon" />
                <span className="sidebar-nav-label">{item.label}</span>
              </div>
              {item.badge && (
                <span className="sidebar-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User / Logout at bottom */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="user-avatar-tiny">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="user-info-tiny">
            <span className="user-name-text">{user?.name || 'Student'}</span>
            <span className="user-role-text">{user?.profile?.branch || 'Engineering'}</span>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={onLogout}
          title="Sign out of your account"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
