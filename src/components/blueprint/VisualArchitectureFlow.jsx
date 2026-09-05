import React, { useState } from 'react';
import { 
  User, Monitor, Server, Cpu, Database, Send, ArrowRight, CheckCircle, Info, Shield, Zap
} from 'lucide-react';

export default function VisualArchitectureFlow({ architecture }) {
  const [activeNodeId, setActiveNodeId] = useState(architecture?.flowNodes?.[2]?.id || 'node-backend');

  if (!architecture || !architecture.flowNodes) return null;

  const getNodeIcon = (type) => {
    switch (type) {
      case 'source':
        return <User size={20} color="#38BDF8" />;
      case 'client':
        return <Monitor size={20} color="#818CF8" />;
      case 'server':
        return <Server size={20} color="#00F2FE" />;
      case 'engine':
        return <Cpu size={20} color="#C084FC" />;
      case 'storage':
        return <Database size={20} color="#34D399" />;
      case 'output':
        return <Send size={20} color="#F59E0B" />;
      default:
        return <Zap size={20} color="#00F2FE" />;
    }
  };

  const activeNode = architecture.flowNodes.find(n => n.id === activeNodeId) || architecture.flowNodes[0];

  return (
    <div className="architecture-flow-container">
      <div className="flow-header">
        <div>
          <h3 className="sub-heading-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="var(--primary-cyan)" /> End-to-End System Flow Diagram
          </h3>
          <p className="sub-heading-desc">{architecture.overview}</p>
        </div>
        <span className="flow-hint-badge">
          <Info size={13} /> Click any node to inspect data contracts & protocols
        </span>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="pipeline-track">
        {architecture.flowNodes.map((node, idx) => {
          const isSelected = node.id === activeNodeId;
          const isLast = idx === architecture.flowNodes.length - 1;

          return (
            <React.Fragment key={node.id}>
              <div 
                className={`pipeline-node-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setActiveNodeId(node.id)}
              >
                <div className="node-icon-wrapper">
                  {getNodeIcon(node.type)}
                </div>
                <div className="node-label-group">
                  <span className="node-step-tag">Step 0{idx + 1}</span>
                  <h4 className="node-main-label">{node.label}</h4>
                  <span className="node-protocol-tag">{node.protocol}</span>
                </div>
                {isSelected && <div className="active-pulse-ring" />}
              </div>

              {!isLast && (
                <div className="pipeline-connector">
                  <div className="connector-line" />
                  <ArrowRight size={14} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Inspection Card */}
      {activeNode && (
        <div className="node-inspector-card">
          <div className="inspector-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="inspector-icon-box">
                {getNodeIcon(activeNode.type)}
              </div>
              <div>
                <span className="step-badge" style={{ padding: '0.15rem 0.5rem', marginBottom: '0.2rem' }}>
                  Node Inspection • {activeNode.type.toUpperCase()}
                </span>
                <h4 className="inspector-title">{activeNode.label}</h4>
              </div>
            </div>
            <div className="inspector-protocol-pill">
              <Shield size={13} color="var(--primary-cyan)" />
              <span>Protocol: <strong>{activeNode.protocol}</strong></span>
            </div>
          </div>

          <div className="inspector-body">
            <p className="inspector-desc">{activeNode.description}</p>
            
            <div className="inspector-meta-grid">
              <div className="inspector-meta-item">
                <span className="meta-label">Data Ingest Mode</span>
                <span className="meta-val">Structured JSON Payload</span>
              </div>
              <div className="inspector-meta-item">
                <span className="meta-label">Security & Isolation</span>
                <span className="meta-val">Sanitized TLS 1.3 + CORS</span>
              </div>
              <div className="inspector-meta-item">
                <span className="meta-label">Fault Tolerance</span>
                <span className="meta-val">Automatic Retry & Circuit Breaker</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
