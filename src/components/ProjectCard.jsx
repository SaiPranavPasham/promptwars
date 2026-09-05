import React from 'react';
import { 
  TrendingUp, Globe, Users, HelpCircle, ArrowRight, CheckCircle2, Sparkles, Zap
} from 'lucide-react';

export default function ProjectCard({ 
  project, 
  onOpenScoreModal, 
  onExploreBlueprint 
}) {
  const {
    rank,
    title,
    problem,
    solution,
    overallScore,
    trend,
    scalePotential,
    targetUsers,
    whyRecommended
  } = project;

  // Custom rank accent badges
  const getRankBadgeStyle = (r) => {
    switch (r) {
      case 1:
        return { bg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#000', label: 'Top Match #1' };
      case 2:
        return { bg: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)', color: '#000', label: 'Rank #2' };
      case 3:
        return { bg: 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)', color: '#FFF', label: 'Rank #3' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)', label: `Rank #${r}` };
    }
  };

  const badgeStyle = getRankBadgeStyle(rank);

  return (
    <div className="project-card">
      {/* Card Header & Rank */}
      <div className="card-top-bar">
        <div className="rank-pill" style={{ background: badgeStyle.bg, color: badgeStyle.color }}>
          {badgeStyle.label}
        </div>

        <div className="score-meter-box">
          <div className="score-label">Opportunity Score</div>
          <div className="score-value-badge">
            <Zap size={16} color="var(--primary-cyan)" />
            <strong className="score-digit">{overallScore}</strong>
            <span className="score-denom">/100</span>
          </div>
        </div>
      </div>

      {/* Project Title & One-Liners */}
      <h3 className="project-card-title">{title}</h3>

      <div className="one-liner-block">
        <div className="line-item">
          <span className="line-tag problem-tag">PROBLEM</span>
          <span className="line-text">{problem}</span>
        </div>
        <div className="line-item">
          <span className="line-tag solution-tag">SOLUTION</span>
          <span className="line-text">{solution}</span>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="metrics-chip-row">
        <div className="metric-chip">
          <TrendingUp size={14} className="metric-icon" color="#10B981" />
          <span>Trend: <strong>{trend}</strong></span>
        </div>

        <div className="metric-chip">
          <Globe size={14} className="metric-icon" color="#38BDF8" />
          <span>Scale: <strong>{scalePotential}</strong></span>
        </div>

        <div className="metric-chip">
          <Users size={14} className="metric-icon" color="#A78BFA" />
          <span>Target: <strong style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 160 }}>{targetUsers}</strong></span>
        </div>
      </div>

      {/* Why Recommended Reasons */}
      <div className="reasons-block">
        <h4 className="reasons-title">
          <Sparkles size={15} color="var(--primary-cyan)" /> Why this project?
        </h4>
        <ul className="reasons-list">
          {whyRecommended.map((reason, idx) => (
            <li key={idx} className="reason-item">
              <CheckCircle2 size={15} color="var(--primary-cyan)" className="reason-icon" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="card-action-footer">
        <button
          type="button"
          className="why-score-btn"
          onClick={() => onOpenScoreModal(project)}
        >
          <HelpCircle size={15} />
          <span>Why this score?</span>
        </button>

        <button
          type="button"
          className="explore-btn"
          onClick={() => onExploreBlueprint(project)}
        >
          <span>Explore Project</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
