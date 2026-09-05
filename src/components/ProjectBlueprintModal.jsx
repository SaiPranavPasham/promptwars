import React from 'react';
import { X, Layers, CheckCircle2, Globe, TrendingUp, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProjectBlueprintModal({ project, studentProfile, onClose, onProceedToStage3 }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-badge" style={{ width: 40, height: 40, background: 'var(--grad-purple)' }}>
              <Layers size={22} color="#FFF" />
            </div>
            <div>
              <span className="step-badge" style={{ marginBottom: '0.2rem', padding: '0.15rem 0.6rem' }}>
                Project Overview & Blueprint
              </span>
              <h2 className="modal-title" style={{ fontSize: '1.4rem' }}>
                {project.title}
              </h2>
            </div>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="blueprint-body">
          {/* Quick Metrics Header */}
          <div className="blueprint-metrics-bar">
            <div className="metric-cell">
              <span className="cell-label">Score</span>
              <span className="cell-value" style={{ color: 'var(--primary-cyan)' }}>{project.overallScore} / 100</span>
            </div>
            <div className="metric-cell">
              <span className="cell-label">Problem Trend</span>
              <span className="cell-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <TrendingUp size={14} color="#10B981" /> {project.trend}
              </span>
            </div>
            <div className="metric-cell">
              <span className="cell-label">Scale Potential</span>
              <span className="cell-value" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Globe size={14} color="#38BDF8" /> {project.scalePotential}
              </span>
            </div>
          </div>

          {/* Problem & Solution Block */}
          <div className="blueprint-section">
            <h4 className="section-heading">🎯 Problem Statement</h4>
            <p className="section-text">{project.problem}</p>
          </div>

          <div className="blueprint-section">
            <h4 className="section-heading">💡 Proposed Solution</h4>
            <p className="section-text">{project.solution}</p>
          </div>

          {/* MVP Scope List */}
          <div className="blueprint-section">
            <h4 className="section-heading">🚀 Recommended MVP Scope</h4>
            <div className="mvp-grid">
              {project.mvpScope.map((item, idx) => (
                <div key={idx} className="mvp-item">
                  <CheckCircle2 size={16} color="var(--primary-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Users & Scalability */}
          <div className="blueprint-section">
            <h4 className="section-heading">👥 Target Users & Commercial Scale</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2E8F0', fontSize: '0.925rem' }}>
              <Users size={16} color="var(--text-muted)" />
              <span>{project.targetUsers}</span>
            </div>
          </div>

          {/* Stage 3 Gateway Banner */}
          <div className="stage3-preview-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={24} color="var(--primary-cyan)" />
              <div>
                <strong style={{ color: '#FFF', fontSize: '0.95rem' }}>Stage 3 Ready — Blueprint Generator</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                  Stage 3 generates step-by-step system architecture, dataset sources, API specifications, and weekly milestones.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            className="modal-action-btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="modal-action-btn btn-primary"
            onClick={() => {
              if (onProceedToStage3) {
                onProceedToStage3(project);
              }
              onClose();
            }}
          >
            <span>Launch Stage 3 AI Blueprint</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
