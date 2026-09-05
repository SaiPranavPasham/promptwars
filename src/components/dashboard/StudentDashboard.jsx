import React from 'react';
import {
  Sparkles, ArrowRight, Compass, Layers, Bot, CheckCircle2,
  Circle, Clock, Zap, Users, ChevronRight, TrendingUp, FolderGit2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../layout/AppSidebar';
import ParticleBackground from '../common/ParticleBackground';

export default function StudentDashboard({
  studentProfile,
  onNavigateSection,
  onSelectProject,
  onOpenMentor
}) {
  const { user, logout } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Builder';

  // Demo Recommended projects based on student skills or defaults
  const sampleProjects = [
    {
      id: 'dash-p1',
      title: 'AI-Powered Waste Management System',
      domain: 'AI & ML',
      score: 9.2,
      difficulty: 'Medium',
      estimatedTime: '2–3 Months',
      scalePotential: 'High',
      problem: 'Inefficient municipal waste collection causes high cost and environmental pollution.',
      solution: 'IoT sensor network & Deep Learning vision that detects bin fill levels and optimizes truck routes.'
    },
    {
      id: 'dash-p2',
      title: 'Smart Irrigation Optimization System',
      domain: 'IoT',
      score: 8.8,
      difficulty: 'Medium',
      estimatedTime: '2–3 Months',
      scalePotential: 'High',
      problem: 'Overwatering in semi-arid zones drains reservoirs and degrades soil nutrient density.',
      solution: 'Soil moisture telemetry with edge ML predictions to control precision water delivery.'
    },
    {
      id: 'dash-p3',
      title: 'AI Study Assistant for College Students',
      domain: 'AI & ML',
      score: 8.5,
      difficulty: 'Easy',
      estimatedTime: '1–2 Months',
      scalePotential: 'Medium',
      problem: 'Students waste hours transcribing lecture recordings and organizing syllabus notes.',
      solution: 'Whisper audio pipeline with LLM concept distillation and automated flashcard generation.'
    }
  ];

  return (
    <div className="unified-app-layout">
      {/* Reusable Subtle Particle Aura */}
      <ParticleBackground density="sparse" />

      {/* LEFT SIDEBAR (Screen 5) */}
      <AppSidebar
        currentSection="dashboard"
        onNavigate={onNavigateSection}
        onLogout={logout}
      />

      {/* MAIN DASHBOARD CONTENT */}
      <main className="dashboard-main-area">
        <div className="dashboard-header-block">
          <h1 className="dashboard-greeting">
            Welcome back, {userName}! 👋
          </h1>
          <p className="dashboard-subheading">
            Let's build something amazing today.
          </p>
        </div>

        {/* 4 STAT CARDS (Screen 5) */}
        <div className="dashboard-stats-grid">
          <div className="dash-stat-card">
            <span className="stat-number-bold">12</span>
            <span className="stat-label-muted">Projects Found</span>
          </div>

          <div className="dash-stat-card">
            <span className="stat-number-bold highlight-score">8.7</span>
            <span className="stat-label-muted">Avg Opportunity Score</span>
          </div>

          <div className="dash-stat-card">
            <span className="stat-number-bold">3</span>
            <span className="stat-label-muted">Blueprints Created</span>
          </div>

          <div className="dash-stat-card">
            <span className="stat-number-bold highlight-progress">75%</span>
            <span className="stat-label-muted">Profile Completion</span>
          </div>
        </div>

        {/* 2-COLUMN BODY: RECOMMENDED PROJECTS + PROGRESS PANEL */}
        <div className="dashboard-body-columns">
          {/* Left: Recommended Projects */}
          <section className="dash-projects-column">
            <div className="column-title-row">
              <h2 className="dash-column-title">Recommended Projects</h2>
              <button
                type="button"
                className="view-all-link-btn"
                onClick={() => onNavigateSection('projects')}
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="dash-recommended-grid">
              {sampleProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="dash-project-card"
                  onClick={() => onSelectProject(proj)}
                >
                  <div className="card-top-tags">
                    <div className="proj-icon-tag">⚡</div>
                    <span className="proj-domain-pill">{proj.domain}</span>
                  </div>

                  <h3 className="dash-proj-title">{proj.title}</h3>

                  <div className="dash-card-bottom">
                    <div className="score-badge-cluster">
                      <span className="score-big">{proj.score}</span>
                      <span className="score-label">Opportunity Score</span>
                    </div>

                    <button
                      type="button"
                      className="dash-explore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj);
                      }}
                    >
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Progress & Quick Actions Panel (Screen 5) */}
          <aside className="dash-progress-aside">
            <div className="progress-panel-card">
              <h3 className="panel-title">Your Progress</h3>

              <div className="dash-progress-checklist">
                <div className="checklist-row done">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span className="check-text">Onboarding</span>
                  <span className="check-mark">✓</span>
                </div>

                <div className="checklist-row done">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span className="check-text">Project Discovery</span>
                  <span className="check-mark">✓</span>
                </div>

                <div className="checklist-row in-progress">
                  <span className="half-circle-icon">◐</span>
                  <span className="check-text">Project Blueprint</span>
                  <span className="check-mark in-progress">◐</span>
                </div>

                <div className="checklist-row pending">
                  <Circle size={15} color="#94A3B8" />
                  <span className="check-text">Build</span>
                  <span className="check-mark">○</span>
                </div>

                <div className="checklist-row pending">
                  <Circle size={15} color="#94A3B8" />
                  <span className="check-text">Testing</span>
                  <span className="check-mark">○</span>
                </div>
              </div>

              <div className="panel-divider" />

              <h4 className="quick-actions-heading">Quick Actions</h4>
              <div className="panel-quick-actions">
                <button
                  type="button"
                  className="quick-action-pill-btn primary"
                  onClick={() => onNavigateSection('mentor')}
                >
                  <Bot size={15} />
                  <span>Open AI Mentor</span>
                </button>

                <button
                  type="button"
                  className="quick-action-pill-btn secondary"
                  onClick={() => onNavigateSection('projects')}
                >
                  <Compass size={15} />
                  <span>Browse Projects</span>
                </button>

                <button
                  type="button"
                  className="quick-action-pill-btn secondary"
                  onClick={() => onNavigateSection('blueprints')}
                >
                  <Layers size={15} />
                  <span>Continue Project</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
