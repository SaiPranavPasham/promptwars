import React from 'react';
import { Clock, Calendar, Hourglass, Timer, Check } from 'lucide-react';

const TIME_ICONS = {
  '1–4 weeks': Timer,
  '1–2 months': Clock,
  '3–4 months': Calendar,
  '5–6 months': Hourglass,
  '6+ months': Calendar
};

export default function TimeQuestion({ question, answers, onChange }) {
  const selectedTime = answers.timeAvailable;

  const handleSelect = (id) => {
    onChange({ timeAvailable: id });
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
          const IconComp = TIME_ICONS[opt.id] || Clock;
          const isSelected = selectedTime === opt.id;

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
