import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, RefreshCw } from 'lucide-react';

export default function PayloadModal({ payload, onClose, onReset }) {
  const [copied, setCopied] = useState(false);

  // Format final payload object as requested
  const formattedPayload = {
    branch: payload.branch === 'Other' && payload.customBranch ? payload.customBranch : payload.branch,
    skills: payload.skills,
    interests: payload.interests,
    teamSize: payload.teamSize,
    timeAvailable: payload.timeAvailable
  };

  const jsonString = JSON.stringify(formattedPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Sparkles size={22} style={{ color: 'var(--primary-cyan)' }} />
            Ready for Stage 2 Generation
          </h2>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          Stage 1 onboarding is complete! The collected profile payload below is ready to be sent directly to the AI idea generator in Stage 2.
        </p>

        <pre className="code-payload-block">
          <code>{jsonString}</code>
        </pre>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-action-btn btn-secondary"
            onClick={onReset}
          >
            <RefreshCw size={16} /> Edit Profile
          </button>
          <button
            type="button"
            className="modal-action-btn btn-primary"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied JSON!' : 'Copy Stage 2 Payload'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
