import React, { useState } from 'react';
import {
  Heart, DollarSign, Leaf, BookOpen, Wind, Car, ShieldCheck, Users, Briefcase, GraduationCap,
  Sparkles, ArrowRight, ChevronRight
} from 'lucide-react';
import { SUPPORTED_INDUSTRIES } from '../data/opportunityEngine';

const INDUSTRY_META = {
  Healthcare: {
    icon: Heart,
    color: '#F87171',
    glow: 'rgba(248, 113, 113, 0.15)',
    border: 'rgba(248, 113, 113, 0.35)',
    desc: 'Diagnostics, patient monitoring, mental health, drug management',
    tag: 'High Impact'
  },
  Finance: {
    icon: DollarSign,
    color: '#34D399',
    glow: 'rgba(52, 211, 153, 0.15)',
    border: 'rgba(52, 211, 153, 0.35)',
    desc: 'Fraud detection, credit scoring, cash flow, investment tools',
    tag: 'High Demand'
  },
  Agriculture: {
    icon: Leaf,
    color: '#84CC16',
    glow: 'rgba(132, 204, 22, 0.15)',
    border: 'rgba(132, 204, 22, 0.35)',
    desc: 'Crop monitoring, yield prediction, soil health, cold chain',
    tag: 'Social Impact'
  },
  Education: {
    icon: BookOpen,
    color: '#818CF8',
    glow: 'rgba(129, 140, 248, 0.15)',
    border: 'rgba(129, 140, 248, 0.35)',
    desc: 'Adaptive learning, lecture tools, exam prep, peer review',
    tag: 'Scalable'
  },
  Environment: {
    icon: Wind,
    color: '#22D3EE',
    glow: 'rgba(34, 211, 238, 0.15)',
    border: 'rgba(34, 211, 238, 0.35)',
    desc: 'Clean energy, air quality, waste management, carbon tracking',
    tag: 'Future Forward'
  },
  Transportation: {
    icon: Car,
    color: '#FBBF24',
    glow: 'rgba(251, 191, 36, 0.15)',
    border: 'rgba(251, 191, 36, 0.35)',
    desc: 'Fleet management, route optimization, smart parking, transit',
    tag: 'Smart City'
  },
  Cybersecurity: {
    icon: ShieldCheck,
    color: '#F472B6',
    glow: 'rgba(244, 114, 182, 0.15)',
    border: 'rgba(244, 114, 182, 0.35)',
    desc: 'Threat detection, phishing, SIEM, vulnerability scanning',
    tag: 'High Growth'
  },
  'Social Impact': {
    icon: Users,
    color: '#FB923C',
    glow: 'rgba(251, 146, 60, 0.15)',
    border: 'rgba(251, 146, 60, 0.35)',
    desc: 'Women safety, food rescue, accessibility, job matching',
    tag: 'Purpose Driven'
  },
  Business: {
    icon: Briefcase,
    color: '#A78BFA',
    glow: 'rgba(167, 139, 250, 0.15)',
    border: 'rgba(167, 139, 250, 0.35)',
    desc: 'Churn prediction, pricing, sentiment, supply chain, HR',
    tag: 'Enterprise Ready'
  },
  Campus: {
    icon: GraduationCap,
    color: '#00F2FE',
    glow: 'rgba(0, 242, 254, 0.15)',
    border: 'rgba(0, 242, 254, 0.35)',
    desc: 'Student wellness, lab booking, events, alumni mentoring',
    tag: 'Instant MVP'
  }
};

export default function IndustrySelector({ answers, onSelectIndustry }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const branchText = answers?.branch === 'Other' ? answers.customBranch || 'Your Branch' : answers?.branch || 'Your Branch';

  const handleConfirm = () => {
    if (selected) onSelectIndustry(selected);
  };

  return (
    <div className="industry-selector-wrapper">
      {/* Header */}
      <div className="industry-selector-header">
        <span className="step-badge" style={{ borderColor: 'rgba(0, 242, 254, 0.4)', color: 'var(--primary-cyan)' }}>
          <Sparkles size={14} /> Industry Selection — Required
        </span>
        <h1 className="question-title">Which industry should your projects solve?</h1>
        <p className="question-subtitle">
          This is a <strong style={{ color: 'var(--primary-cyan)' }}>hard filter</strong> — the AI generates
          5 projects <strong style={{ color: '#FFF' }}>exclusively</strong> for the industry you choose. 
          Select the domain most aligned with your interests as a <strong>{branchText}</strong> student.
        </p>
      </div>

      {/* Industry Grid */}
      <div className="industry-grid">
        {SUPPORTED_INDUSTRIES.map((industry) => {
          const meta = INDUSTRY_META[industry];
          const Icon = meta.icon;
          const isSelected = selected === industry;
          const isHovered = hovered === industry;

          return (
            <button
              key={industry}
              type="button"
              className={`industry-card-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelected(industry)}
              onMouseEnter={() => setHovered(industry)}
              onMouseLeave={() => setHovered(null)}
              style={{
                '--ind-color': meta.color,
                '--ind-glow': meta.glow,
                '--ind-border': meta.border,
                borderColor: isSelected ? meta.color : isHovered ? meta.border : 'var(--border-medium)',
                background: isSelected
                  ? meta.glow
                  : isHovered
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.02)',
                boxShadow: isSelected ? `0 0 25px ${meta.glow}` : 'none'
              }}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="ind-selected-check" style={{ background: meta.color }}>
                  <ChevronRight size={12} color="#000" />
                </div>
              )}

              {/* Icon */}
              <div
                className="ind-icon-box"
                style={{
                  background: isSelected ? `${meta.color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isSelected ? meta.color : 'transparent'}`
                }}
              >
                <Icon size={22} color={meta.color} />
              </div>

              {/* Label */}
              <div className="ind-label-group">
                <h3 className="ind-name" style={{ color: isSelected ? '#FFF' : '#E2E8F0' }}>
                  {industry}
                </h3>
                <span className="ind-tag" style={{ color: meta.color }}>
                  {meta.tag}
                </span>
              </div>

              {/* Description */}
              <p className="ind-desc">{meta.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Confirm CTA */}
      <div className="industry-confirm-bar">
        {selected ? (
          <div className="selection-confirm-row">
            <div className="selection-preview">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Selected Industry:</span>
              <span className="selection-name-pill" style={{
                background: INDUSTRY_META[selected]?.glow,
                borderColor: INDUSTRY_META[selected]?.color,
                color: INDUSTRY_META[selected]?.color
              }}>
                {React.createElement(INDUSTRY_META[selected]?.icon, { size: 15 })}
                {selected}
              </span>
            </div>

            <button
              type="button"
              className="cta-generate-btn"
              onClick={handleConfirm}
            >
              <Sparkles size={22} />
              <span>Generate 5 {selected} Projects</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <p className="industry-hint-text">
            ↑ Select one industry above to unlock project generation
          </p>
        )}
      </div>
    </div>
  );
}
