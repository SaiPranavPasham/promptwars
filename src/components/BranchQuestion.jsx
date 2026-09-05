import React from 'react';
import { 
  Cpu, Brain, Radio, Zap, Cog, Building2, Sparkles, Check 
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  Brain,
  Radio,
  Zap,
  Cog,
  Building2,
  Sparkles
};

export default function BranchQuestion({ question, answers, onChange }) {
  const selectedBranch = answers.branch;
  const customBranch = answers.customBranch || '';

  const handleSelect = (optionId) => {
    onChange({
      branch: optionId,
      // Keep existing custom string if switching back to Other
      customBranch: optionId === 'Other' ? customBranch : ''
    });
  };

  const handleCustomTextChange = (e) => {
    const val = e.target.value;
    onChange({
      branch: 'Other',
      customBranch: val
    });
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
          const IconComp = ICON_MAP[opt.icon] || Sparkles;
          const isSelected = selectedBranch === opt.id;

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
                <div className="option-label">{opt.label}</div>
              </div>
              <div className="check-indicator">
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {selectedBranch === 'Other' && (
        <div className="custom-input-box active-focus">
          <label className="input-label-text" htmlFor="custom-branch-input">
            Specify your discipline or branch:
          </label>
          <input
            id="custom-branch-input"
            type="text"
            className="text-input-field"
            placeholder="e.g. Biomedical Engineering, Robotics, Information Technology..."
            value={customBranch}
            onChange={handleCustomTextChange}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
