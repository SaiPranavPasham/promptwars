import React from 'react';
import BranchQuestion from './BranchQuestion';
import SkillsQuestion from './SkillsQuestion';
import InterestsQuestion from './InterestsQuestion';
import TeamQuestion from './TeamQuestion';
import TimeQuestion from './TimeQuestion';

export default function QuestionCard({ question, answers, onChange, direction }) {
  const animationClass = direction === 'forward' ? 'slide-enter-right' : 'slide-enter-left';

  const renderContent = () => {
    switch (question.key) {
      case 'branch':
        return <BranchQuestion question={question} answers={answers} onChange={onChange} />;
      case 'skills':
        return <SkillsQuestion question={question} answers={answers} onChange={onChange} />;
      case 'interests':
        return <InterestsQuestion question={question} answers={answers} onChange={onChange} />;
      case 'teamSize':
        return <TeamQuestion question={question} answers={answers} onChange={onChange} />;
      case 'timeAvailable':
        return <TimeQuestion question={question} answers={answers} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className={`question-container ${animationClass}`} key={question.id}>
      {renderContent()}
    </div>
  );
}
