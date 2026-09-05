import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function Navigation({ 
  onBack, 
  onNext, 
  canContinue, 
  isFirstStep, 
  isLastQuestion 
}) {
  return (
    <div className="bottom-nav">
      <button
        type="button"
        className="nav-back-btn"
        onClick={onBack}
        disabled={isFirstStep}
        aria-label="Previous question"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <button
        type="button"
        className="nav-next-btn"
        onClick={onNext}
        disabled={!canContinue}
        aria-label={isLastQuestion ? "Review answers" : "Continue to next question"}
      >
        <span>{isLastQuestion ? "Review Profile" : "Continue"}</span>
        {isLastQuestion ? <Check size={18} /> : <ArrowRight size={18} />}
      </button>
    </div>
  );
}
