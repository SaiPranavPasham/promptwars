import React, { useState } from 'react';
import { Calendar, CheckCircle2, Flag, ArrowRight, Clock, Target } from 'lucide-react';

export default function RoadmapTimeline({ roadmap }) {
  const [completedTasks, setCompletedTasks] = useState({});

  if (!roadmap || roadmap.length === 0) return null;

  const toggleTask = (phaseIdx, taskIdx) => {
    const key = `${phaseIdx}-${taskIdx}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="roadmap-timeline-container">
      <div className="timeline-header-info">
        <div>
          <h3 className="sub-heading-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--primary-cyan)" /> Milestone-Driven Sprint Roadmap
          </h3>
          <p className="sub-heading-desc">
            Chronologically organized according to your available timeframe. Complete each milestone to maintain sprint momentum.
          </p>
        </div>
      </div>

      <div className="timeline-items-list">
        {roadmap.map((item, phaseIdx) => (
          <div key={phaseIdx} className="timeline-milestone-card">
            {/* Left Indicator Track */}
            <div className="timeline-indicator-col">
              <div className="milestone-badge-dot">
                <span>0{phaseIdx + 1}</span>
              </div>
              {phaseIdx < roadmap.length - 1 && <div className="milestone-track-line" />}
            </div>

            {/* Right Content */}
            <div className="milestone-content-block">
              <div className="milestone-top-row">
                <span className="milestone-phase-badge">
                  <Clock size={12} /> {item.phase}
                </span>
                <h4 className="milestone-title">{item.milestone}</h4>
              </div>

              {/* Tasks List */}
              <div className="milestone-tasks-box">
                <span className="tasks-box-title">Deliverable Tasks Checklist:</span>
                <ul className="tasks-checklist">
                  {item.tasks.map((task, taskIdx) => {
                    const isDone = !!completedTasks[`${phaseIdx}-${taskIdx}`];
                    return (
                      <li 
                        key={taskIdx} 
                        className={`task-check-item ${isDone ? 'done' : ''}`}
                        onClick={() => toggleTask(phaseIdx, taskIdx)}
                      >
                        <div className={`custom-checkbox ${isDone ? 'checked' : ''}`}>
                          {isDone && <CheckCircle2 size={14} color="#00F2FE" />}
                        </div>
                        <span className="task-text">{task}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Expected Output Deliverable */}
              <div className="expected-output-card">
                <Target size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong className="output-label">Expected Output / Viva Milestone:</strong>
                  <p className="output-desc">{item.expectedOutput}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
