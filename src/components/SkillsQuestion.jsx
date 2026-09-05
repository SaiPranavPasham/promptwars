import React, { useState } from 'react';
import { 
  FileCode, Coffee, Code2, FileJson, Layout, Server, Hexagon, Database, Bot, Wifi, Cloud, Plus, X, Check, Code 
} from 'lucide-react';

const ICON_MAP = {
  FileCode, Coffee, Code2, FileJson, Layout, Server, Hexagon, Database, Bot, Wifi, Cloud
};

export default function SkillsQuestion({ question, answers, onChange }) {
  const selectedSkills = answers.skills || [];
  const [customInput, setCustomInput] = useState('');

  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      onChange({
        skills: selectedSkills.filter(s => s !== skillName)
      });
    } else {
      onChange({
        skills: [...selectedSkills, skillName]
      });
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      onChange({
        skills: [...selectedSkills, trimmed]
      });
      setCustomInput('');
    }
  };

  const removeSkill = (skillName, e) => {
    e.stopPropagation();
    onChange({
      skills: selectedSkills.filter(s => s !== skillName)
    });
  };

  // Separate standard options from custom skills added by user
  const standardSkillIds = question.options.map(o => o.id);
  const customSkills = selectedSkills.filter(s => !standardSkillIds.includes(s));

  return (
    <div className="question-wrapper">
      <div className="question-header">
        <span className="step-badge">{question.badge}</span>
        <h1 className="question-title">{question.title}</h1>
        <p className="question-subtitle">{question.subtitle}</p>
      </div>

      <div className="chips-flex">
        {question.options.map((opt) => {
          const IconComp = ICON_MAP[opt.icon] || Code;
          const isSelected = selectedSkills.includes(opt.id);

          return (
            <button
              key={opt.id}
              type="button"
              className={`chip-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleSkill(opt.id)}
            >
              <IconComp size={16} className="chip-icon" />
              <span>{opt.label}</span>
              {isSelected ? <Check size={14} /> : <Plus size={14} className="chip-icon" />}
            </button>
          );
        })}

        {/* User Added Custom Skills */}
        {customSkills.map((customSkill) => (
          <button
            key={customSkill}
            type="button"
            className="chip-btn selected"
            onClick={(e) => removeSkill(customSkill, e)}
          >
            <Code size={16} className="chip-icon" />
            <span>{customSkill}</span>
            <X size={14} />
          </button>
        ))}
      </div>

      <form onSubmit={handleAddCustomSkill} className="add-custom-wrapper">
        <input
          type="text"
          className="text-input-field"
          placeholder="Add custom skill or framework (e.g. Flutter, PyTorch, Go)..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!customInput.trim()}
        >
          <Plus size={16} /> Add Skill
        </button>
      </form>
    </div>
  );
}
