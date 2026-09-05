import React, { useState } from 'react';
import { 
  Activity, GraduationCap, TrendingUp, Sprout, Leaf, ShieldCheck, School, Car, Briefcase, Heart, Plus, X, Check, Target 
} from 'lucide-react';

const ICON_MAP = {
  Activity, GraduationCap, TrendingUp, Sprout, Leaf, ShieldCheck, School, Car, Briefcase, Heart
};

export default function InterestsQuestion({ question, answers, onChange }) {
  const selectedInterests = answers.interests || [];
  const [customInput, setCustomInput] = useState('');

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      onChange({
        interests: selectedInterests.filter(i => i !== interestId)
      });
    } else {
      onChange({
        interests: [...selectedInterests, interestId]
      });
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !selectedInterests.includes(trimmed)) {
      onChange({
        interests: [...selectedInterests, trimmed]
      });
      setCustomInput('');
    }
  };

  const removeInterest = (interestName, e) => {
    e.stopPropagation();
    onChange({
      interests: selectedInterests.filter(i => i !== interestName)
    });
  };

  const standardIds = question.options.map(o => o.id);
  const customInterests = selectedInterests.filter(i => !standardIds.includes(i));

  return (
    <div className="question-wrapper">
      <div className="question-header">
        <span className="step-badge">{question.badge}</span>
        <h1 className="question-title">{question.title}</h1>
        <p className="question-subtitle">{question.subtitle}</p>
      </div>

      <div className="options-grid">
        {question.options.map((opt) => {
          const IconComp = ICON_MAP[opt.icon] || Target;
          const isSelected = selectedInterests.includes(opt.id);

          return (
            <div
              key={opt.id}
              className={`option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleInterest(opt.id)}
            >
              <div className="option-icon-box">
                <IconComp size={22} />
              </div>
              <div className="option-content">
                <div className="option-label">{opt.label}</div>
                <div className="option-desc">{opt.desc}</div>
              </div>
              <div className="check-indicator">
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {customInterests.length > 0 && (
        <div className="chips-flex" style={{ marginTop: '1rem' }}>
          {customInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              className="chip-btn selected"
              onClick={(e) => removeInterest(interest, e)}
            >
              <Target size={16} className="chip-icon" />
              <span>{interest}</span>
              <X size={14} />
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleAddCustom} className="add-custom-wrapper">
        <input
          type="text"
          className="text-input-field"
          placeholder="Add custom problem domain (e.g. Smart Grids, SpaceTech, Web3)..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!customInput.trim()}
        >
          <Plus size={16} /> Add Domain
        </button>
      </form>
    </div>
  );
}
