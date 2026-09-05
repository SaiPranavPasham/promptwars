import React from 'react';
import { Users, UserCheck, CheckCircle2, Award, Briefcase } from 'lucide-react';

export default function TeamDistribution({ teamDistribution, teamSize }) {
  if (!teamDistribution || teamDistribution.length === 0) return null;

  return (
    <div className="team-distribution-container">
      <div className="team-header-info">
        <div>
          <h3 className="sub-heading-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} color="var(--primary-cyan)" /> Team Role & Responsibility Matrix
          </h3>
          <p className="sub-heading-desc">
            Equitably partitioned for a team size of <strong>{teamSize} {teamSize === '1' ? 'Engineer' : 'Members'}</strong>, ensuring zero role duplication and balanced sprint velocity.
          </p>
        </div>
      </div>

      <div className="team-cards-grid">
        {teamDistribution.map((member, idx) => (
          <div key={idx} className="team-member-card">
            <div className="team-card-header">
              <div className="team-avatar-pill">
                <UserCheck size={18} color="var(--primary-cyan)" />
                <span className="member-index-tag">Member 0{idx + 1}</span>
              </div>
              <h4 className="member-name">{member.member}</h4>
              <span className="member-role-badge">
                <Briefcase size={12} /> {member.role}
              </span>
            </div>

            <div className="member-focus-box">
              <span className="focus-label">Primary Responsibility:</span>
              <p className="focus-text">{member.focusArea}</p>
            </div>

            <div className="member-tasks-section">
              <span className="tasks-header-label">Assigned Workstream:</span>
              <ul className="member-tasks-list">
                {member.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="member-task-item">
                    <CheckCircle2 size={14} color="var(--primary-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
