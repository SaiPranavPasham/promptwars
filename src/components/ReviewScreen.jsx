import React from 'react';
import { Edit2, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ReviewScreen({ answers, onEditStep, onGenerate, onBackToQuestions }) {
  // Format branch value nicely
  const getBranchDisplay = () => {
    if (answers.branch === 'Other') {
      return answers.customBranch ? `Other: ${answers.customBranch}` : 'Other';
    }
    return answers.branch || 'Not specified';
  };

  const reviewItems = [
    {
      stepIndex: 1,
      key: 'branch',
      label: 'Q1 — Discipline',
      question: 'What do you study?',
      values: [getBranchDisplay()]
    },
    {
      stepIndex: 2,
      key: 'skills',
      label: 'Q2 — Technical Stack',
      question: 'What can you build with?',
      values: answers.skills.length > 0 ? answers.skills : ['None selected']
    },
    {
      stepIndex: 3,
      key: 'interests',
      label: 'Q3 — Problem Domains',
      question: 'What problems do you want to solve?',
      values: answers.interests.length > 0 ? answers.interests : ['None selected']
    },
    {
      stepIndex: 4,
      key: 'teamSize',
      label: 'Q4 — Team Size',
      question: 'How many people are building this?',
      values: [answers.teamSize ? `${answers.teamSize} ${answers.teamSize === '1' ? 'Person' : 'People'}` : 'Not specified']
    },
    {
      stepIndex: 5,
      key: 'timeAvailable',
      label: 'Q5 — Timeline',
      question: 'How much time do you have?',
      values: [answers.timeAvailable || 'Not specified']
    }
  ];

  return (
    <div className="review-container">
      <div className="question-header">
        <span className="step-badge" style={{ borderColor: 'rgba(127, 0, 255, 0.4)', color: '#C084FC' }}>
          <CheckCircle2 size={14} /> Profile Complete
        </span>
        <h1 className="question-title">Review Your Profile</h1>
        <p className="question-subtitle">
          Verify your answers below. Click "Edit" on any section to modify it before generating AI ideas.
        </p>
      </div>

      <div className="review-grid">
        {reviewItems.map((item) => (
          <div key={item.key} className="review-item-card">
            <div className="review-meta">
              <span className="review-label">{item.label}</span>
              <div className="review-question-name">{item.question}</div>
              <div className="review-value-box">
                {item.values.map((val, idx) => (
                  <span key={idx} className="value-pill">
                    {val}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="edit-step-btn"
              onClick={() => onEditStep(item.stepIndex)}
              aria-label={`Edit ${item.label}`}
            >
              <Edit2 size={14} />
              <span>Edit</span>
            </button>
          </div>
        ))}
      </div>

      <div className="bottom-nav" style={{ borderTop: 'none', paddingTop: 0 }}>
        <button
          type="button"
          className="nav-back-btn"
          onClick={onBackToQuestions}
        >
          <ArrowLeft size={18} />
          <span>Back to Q5</span>
        </button>

        <button
          type="button"
          className="cta-generate-btn"
          onClick={onGenerate}
        >
          <Sparkles size={22} />
          <span>✨ Generate My Project Ideas</span>
        </button>
      </div>
    </div>
  );
}
