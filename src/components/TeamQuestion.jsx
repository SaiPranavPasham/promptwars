import React from 'react';
import { User, Users, UserPlus, Users2, Shield, Check } from 'lucide-react';

const TEAM_ICONS = {
  '1': User,
  '2': Users,
  '3': UserPlus,
  '4': Users2,
  '5+': Shield
};

export default function TeamQuestion({ question, answers, onChange }) {
  const selectedTeamSize = answers.teamSize;

  const handleSelect = (id) => {
    onChange({ teamSize: id });
  };

  return (
    <div className="question-wrapper">
      <div className="question-header">
        <span className="step-badge">{question.badge}</span>
        <h1 className="question-title">{question.title}</h1>
        <p className="question-subtitle">{question.subtitle}</p>
      </div>

      <div className="options-grid-wide">
        {question.options.map((opt) => {
          const IconComp = TEAM_ICONS[opt.id] || Users;
          const isSelected = selectedTeamSize === opt.id;

          return (
            <div
              key={opt.id}
              className={`option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
            >
              <div className="option-icon-box">
                <IconComp size={22} />
              </div>
              <div className="option-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="option-label">{opt.label}</div>
                  <span className="option-tag">{opt.tag}</span>
                </div>
                <div className="option-desc">{opt.desc}</div>
              </div>
              <div className="check-indicator">
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
