import React from 'react';
import { X, Award, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SCORE_CRITERIA_INFO } from '../data/opportunityEngine';

export default function ScoreBreakdownModal({ project, onClose }) {
  if (!project) return null;

  const { title, overallScore, scores } = project;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-badge" style={{ width: 38, height: 38 }}>
              <Award size={22} />
            </div>
            <div>
              <h2 className="modal-title" style={{ fontSize: '1.35rem' }}>
                AI Opportunity Score Breakdown
              </h2>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {title}
              </div>
            </div>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Big Score Summary Banner */}
        <div className="score-hero-banner">
          <div className="score-hero-value">
            <span className="score-num">{overallScore}</span>
            <span className="score-max">/100</span>
          </div>
          <div className="score-hero-text">
            <div className="score-tier-label">
              {overallScore >= 90 ? '🔥 Exceptional Opportunity' : overallScore >= 80 ? '⚡ High Potential Project' : '✨ Strong Academic Fit'}
            </div>
            <p>Calculated across 7 weighted dimensions based on market demand, technical fit, and scalability.</p>
          </div>
        </div>

        {/* 7 Criteria Progress Breakdown */}
        <div className="criteria-list">
          {SCORE_CRITERIA_INFO.map((crit) => {
            const val = scores[crit.key] || 0;
            const pct = Math.round((val / crit.max) * 100);

            return (
              <div key={crit.key} className="criteria-row">
                <div className="criteria-header">
                  <span className="criteria-name">
                    {crit.name} <span className="criteria-weight">({crit.weight})</span>
                  </span>
                  <span className="criteria-score-text">
                    <strong>{val}</strong> / {crit.max} pts
                  </span>
                </div>
                <div className="criteria-track">
                  <div 
                    className="criteria-fill" 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-actions" style={{ marginTop: '1.75rem' }}>
          <button
            type="button"
            className="modal-action-btn btn-secondary"
            onClick={onClose}
            style={{ width: '100%' }}
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}
