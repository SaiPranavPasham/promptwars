import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Cpu, Brain, Radio, Zap,
  Cog, Building2, Layout, Server, Database, Bot, BarChart3, Wifi,
  Cloud, MoreHorizontal, Globe, Smartphone, LineChart, Layers,
  ShieldCheck, Activity, GraduationCap, TrendingUp, Sprout, Leaf,
  Car, Heart, User, CheckCircle2
} from 'lucide-react';
import { QUESTIONS } from '../../data/onboardingData';

// Icon resolver helper
function renderOptionIcon(iconName) {
  const iconProps = { size: 18, className: "option-card-icon" };
  switch (iconName) {
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Brain': return <Brain {...iconProps} />;
    case 'Radio': return <Radio {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Cog': return <Cog {...iconProps} />;
    case 'Building2': return <Building2 {...iconProps} />;
    case 'Layout': return <Layout {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Bot': return <Bot {...iconProps} />;
    case 'BarChart3': return <BarChart3 {...iconProps} />;
    case 'Wifi': return <Wifi {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'LineChart': return <LineChart {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    case 'GraduationCap': return <GraduationCap {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'Sprout': return <Sprout {...iconProps} />;
    case 'Leaf': return <Leaf {...iconProps} />;
    case 'Car': return <Car {...iconProps} />;
    case 'Heart': return <Heart {...iconProps} />;
    case 'Python':
      return (
        <span className="lang-icon-badge python">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.5 2 7 3.5 7 5.5V8H12V9H5.5C3.5 9 2 10.5 2 14C2 17.5 3.5 19 5.5 19H7V16.5C7 14.5 8.5 13 10.5 13H15V12H9.5C7.5 12 6 10.5 6 8.5C6 6.5 7.5 5 9.5 5H12V2Z" fill="#38BDF8"/>
            <path d="M12 22C15.5 22 17 20.5 17 18.5V16H12V15H18.5C20.5 15 22 13.5 22 10C22 6.5 20.5 5 18.5 5H17V7.5C17 9.5 15.5 11 13.5 11H9V12H14.5C16.5 12 18 13.5 18 15.5C18 17.5 16.5 19 14.5 19H12V22Z" fill="#F59E0B"/>
          </svg>
        </span>
      );
    case 'Java':
      return (
        <span className="lang-icon-badge java">
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#EA580C' }}>☕</span>
        </span>
      );
    default:
      return <Sparkles {...iconProps} />;
  }
}

export default function OnboardingFlow({
  initialAnswers,
  onSaveProfile,
  onFinishToStage2,
  onExitToHome,
  user
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [customInput, setCustomInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalSteps = QUESTIONS.length;
  const activeQuestion = QUESTIONS[currentStep - 1];

  // Validation logic for current question
  const canContinue = () => {
    switch (currentStep) {
      case 1:
        if (!answers.branch) return false;
        if (answers.branch === 'Other' && !answers.customBranch?.trim()) return false;
        return true;
      case 2:
        return answers.skills && answers.skills.length > 0;
      case 3:
        return answers.interests && answers.interests.length > 0;
      case 4:
        return !!answers.teamSize;
      case 5:
        return !!answers.timeAvailable;
      case 6:
        return !!answers.goal;
      default:
        return false;
    }
  };

  // Toggle multi-select options
  const handleToggleMulti = (key, optionId) => {
    const list = answers[key] || [];
    let updated;
    if (list.includes(optionId)) {
      updated = list.filter((item) => item !== optionId);
    } else {
      updated = [...list, optionId];
    }
    setAnswers((prev) => ({
      ...prev,
      [key]: updated
    }));
  };

  // Single select option
  const handleSelectSingle = (key, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: optionId
    }));
  };

  // Add custom tag (skill or interest)
  const handleAddCustomTag = (key) => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const currentList = answers[key] || [];
    if (!currentList.includes(trimmed)) {
      setAnswers((prev) => ({
        ...prev,
        [key]: [...currentList, trimmed]
      }));
    }
    setCustomInput('');
  };

  // Navigation handlers
  const handleNext = async () => {
    if (!canContinue()) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 6 questions!
      setIsSaving(true);
      try {
        await onSaveProfile(answers);
        setIsCompleted(true);
        // Fire confetti celebration
        try {
          confetti({
            particleCount: 110,
            spread: 90,
            origin: { y: 0.55 }
          });
        } catch (e) {}
      } catch (err) {
        console.error('Failed to save profile:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── COMPLETION STATE (Profile Saved) ──
  if (isCompleted) {
    return (
      <div className="onboarding-root">
        <header className="onboarding-top-bar">
          <div className="onboarding-brand" onClick={onExitToHome}>
            <div className="brand-prism-icon small">
              <Sparkles size={16} color="#38BDF8" />
            </div>
            <span className="landing-brand-name">ProjectPilot AI</span>
          </div>
        </header>

        <main className="onboarding-main-container">
          <div className="profile-ready-card">
            <div className="ready-badge-pill">
              <CheckCircle2 size={16} color="#10B981" />
              <span>PROFILE SAVED</span>
            </div>

            <h1 className="ready-title">Your project profile is ready.</h1>
            <p className="ready-subtitle">
              Let's find high-impact final-year projects designed specifically for your stack, timeline, and goals.
            </p>

            {/* Profile Summary Snapshot */}
            <div className="ready-summary-grid">
              <div className="summary-item">
                <span className="summary-label">BRANCH</span>
                <span className="summary-val">{answers.branch === 'Other' ? answers.customBranch : answers.branch}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">TEAM SIZE</span>
                <span className="summary-val">{answers.teamSize} member(s)</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">TIMELINE</span>
                <span className="summary-val">{answers.timeAvailable}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">GOAL</span>
                <span className="summary-val">{answers.goal}</span>
              </div>
            </div>

            <div className="skills-chips-row">
              <span className="skills-mini-label">Skills:</span>
              {(answers.skills || []).map((s, idx) => (
                <span key={idx} className="onboarding-chip-tag">
                  {s}
                </span>
              ))}
            </div>

            {/* CTA to Stage 2 */}
            <div className="ready-action-row">
              <button
                type="button"
                className="landing-cta-pill primary ready-btn"
                onClick={onFinishToStage2}
              >
                <span>Generate My Projects</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STEP-BY-STEP QUESTION VIEW ──
  return (
    <div className="onboarding-root">
      {/* Top Bar with Step Progress Bars (Matching Reference Image) */}
      <header className="onboarding-top-bar">
        <div className="onboarding-brand" onClick={onExitToHome}>
          <div className="brand-prism-icon small">
            <Sparkles size={16} color="#38BDF8" />
          </div>
          <span className="landing-brand-name">ProjectPilot AI</span>
        </div>

        {/* 6 Step Progress Indicators */}
        <div className="onboarding-progress-block">
          <div className="step-counter-text">
            Step <strong>{currentStep}</strong> of {totalSteps}
          </div>
          <div className="step-bars-track">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepNum = idx + 1;
              let barClass = 'step-bar';
              if (stepNum < currentStep) barClass += ' completed';
              else if (stepNum === currentStep) barClass += ' active';
              return <div key={idx} className={barClass} />;
            })}
          </div>
        </div>

        <div className="onboarding-top-right">
          <button type="button" className="onboarding-exit-btn" onClick={onExitToHome}>
            Exit
          </button>
        </div>
      </header>

      {/* Main Question Viewport */}
      <main className="onboarding-main-container">
        <div className="question-central-card">
          {/* Question Title & Subtitle */}
          <div className="question-header-center">
            <h2 className="onboarding-question-title">{activeQuestion.title}</h2>
            <p className="onboarding-question-subtitle">{activeQuestion.subtitle}</p>
          </div>

          {/* Cards Grid */}
          <div className="onboarding-options-grid">
            {activeQuestion.options.map((opt) => {
              const isMulti = activeQuestion.type === 'multi-custom';
              const isSelected = isMulti
                ? (answers[activeQuestion.key] || []).includes(opt.id)
                : answers[activeQuestion.key] === opt.id;

              return (
                <div
                  key={opt.id}
                  className={`onboarding-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (isMulti) {
                      handleToggleMulti(activeQuestion.key, opt.id);
                    } else {
                      handleSelectSingle(activeQuestion.key, opt.id);
                    }
                  }}
                >
                  <div className="option-card-left">
                    {opt.icon && renderOptionIcon(opt.icon)}
                    <div className="option-text-group">
                      <span className="option-card-label">{opt.label}</span>
                      {opt.desc && <span className="option-card-desc">{opt.desc}</span>}
                    </div>
                  </div>

                  {/* Checkmark Indicator */}
                  <div className={`option-check-circle ${isSelected ? 'active' : ''}`}>
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Branch Input for Q1 if 'Other' selected */}
          {currentStep === 1 && answers.branch === 'Other' && (
            <div className="custom-input-box">
              <label htmlFor="custom-branch-input" className="custom-label">
                Specify your branch or specialization:
              </label>
              <input
                id="custom-branch-input"
                type="text"
                className="custom-field"
                placeholder="e.g. Biomedical Engineering, Robotics"
                value={answers.customBranch || ''}
                onChange={(e) => setAnswers({ ...answers, customBranch: e.target.value })}
                autoFocus
              />
            </div>
          )}

          {/* Custom Tag Input for Skills (Q2) or Interests (Q3) */}
          {(currentStep === 2 || currentStep === 3) && (
            <div className="add-custom-tag-row">
              <input
                type="text"
                className="custom-field small"
                placeholder={currentStep === 2 ? 'Add other skill (e.g. Rust, PyTorch, Figma)...' : 'Add other interest (e.g. CleanTech, AR/VR)...'}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTag(activeQuestion.key);
                  }
                }}
              />
              <button
                type="button"
                className="add-custom-btn"
                onClick={() => handleAddCustomTag(activeQuestion.key)}
                disabled={!customInput.trim()}
              >
                + Add
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation Row */}
        <div className="onboarding-nav-bar">
          <button
            type="button"
            className="onboarding-nav-btn back"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <button
            type="button"
            className="onboarding-nav-btn next"
            onClick={handleNext}
            disabled={!canContinue() || isSaving}
          >
            <span>{isSaving ? 'Saving...' : currentStep === totalSteps ? 'Finish Profile' : 'Next'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}
