import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Layers, Zap, Clock, ShieldAlert, CheckCircle2, 
  Code2, Cpu, Database, Network, Users, Lightbulb, AlertTriangle, 
  FileText, Download, Copy, Check, Sparkles, Terminal, BookOpen, 
  ExternalLink, Target, ChevronRight, Monitor, Server, Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../layout/AppSidebar';
import ParticleBackground from '../common/ParticleBackground';
import { generateProjectBlueprint } from '../../data/blueprintEngine';
import VisualArchitectureFlow from './VisualArchitectureFlow';
import RoadmapTimeline from './RoadmapTimeline';
import TeamDistribution from './TeamDistribution';

export default function ProjectBlueprintDashboard({
  project,
  studentProfile,
  onBack,
  onOpenMentor,
  onNavigateSection
}) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedJson, setCopiedJson] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  // Fallback demo project if none passed
  const safeProject = project || {
    id: 'ai-waste-management',
    title: 'AI-Powered Waste Management System',
    selectedIndustry: 'AI & ML',
    industry: 'AI & ML',
    domain: 'AI & ML',
    overallScore: 92,
    difficulty: 'Medium',
    estimatedTime: '2–3 Months',
    scalePotential: 'High',
    problem: 'Inefficient municipal waste collection causes high cost and environmental pollution in smart cities.',
    solution: 'Build an AI system to predict waste generation, optimize collection routes and provide better waste management.',
    targetUsers: 'Municipal Corporations, Waste Management Companies'
  };

  // Generate blueprint once from project and profile
  const blueprint = useMemo(() => {
    return generateProjectBlueprint(safeProject, studentProfile);
  }, [safeProject, studentProfile]);

  const {
    meta,
    overview,
    mvpScope,
    techStack,
    systemArchitecture,
    coreFeatures,
    databaseSchema,
    aiMlPlan,
    datasetPlan,
    roadmap,
    teamDistribution,
    innovations,
    risksAndSolutions,
    firstMilestone,
    successCriteria
  } = blueprint;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'mvp', label: 'MVP' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'database', label: 'Database' },
    { id: 'aiml', label: 'AI/ML' },
    { id: 'data', label: 'Data' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'team', label: 'Team' },
    { id: 'innovations', label: 'Innovation' }
  ];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blueprint, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${safeProject.id || 'project'}-blueprint.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Calculate score on 10 scale (e.g. 9.2)
  const scoreOutOfTen = (meta.opportunityScore / 10).toFixed(1);

  return (
    <div className="unified-app-layout">
      <ParticleBackground density="sparse" />

      {/* LEFT SIDEBAR (Screen 7) */}
      <AppSidebar
        currentSection="blueprints"
        onNavigate={onNavigateSection || (() => {})}
        onLogout={logout}
      />

      {/* MAIN BLUEPRINT AREA */}
      <main className="blueprint-main-area">
        {/* Back Link */}
        <div className="blueprint-back-row">
          <button type="button" className="blueprint-back-link" onClick={onBack}>
            <ArrowLeft size={15} />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Header Block with Title, Pills, and Big Score (Screen 7) */}
        <div className="blueprint-header-card">
          <div className="blueprint-header-left">
            <h1 className="blueprint-title-main">{overview.title}</h1>
            <div className="blueprint-badge-pills">
              <span className="bp-pill domain-purple">
                {safeProject.selectedIndustry || safeProject.domain || 'AI & ML'}
              </span>
              <span className="bp-pill subtle-gray">
                {meta.difficulty} Difficulty
              </span>
              <span className="bp-pill subtle-gray">
                {meta.estimatedTimeline || '2–3 Months'}
              </span>
            </div>
          </div>

          <div className="blueprint-header-right">
            <div className="opportunity-score-display">
              <span className="huge-score-number">{scoreOutOfTen}</span>
              <span className="score-subtext">Opportunity Score</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Mentor Banner */}
        <div className="blueprint-quick-action-strip">
          <div className="strip-left-info">
            <Sparkles size={16} className="text-purple-accent" />
            <span>Ready to implement this blueprint? Launch the project-specific AI Mentor for continuous coding guidance.</span>
          </div>
          <div className="strip-right-buttons">
            <button
              type="button"
              className="blueprint-action-btn secondary"
              onClick={() => setShowJsonModal(true)}
            >
              <Code2 size={14} />
              <span>JSON</span>
            </button>
            <button
              type="button"
              className="blueprint-action-btn secondary"
              onClick={handleDownloadJson}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
            <button
              type="button"
              className="blueprint-action-btn mentor-cta"
              onClick={() => onOpenMentor && onOpenMentor(safeProject, blueprint)}
            >
              <Sparkles size={14} />
              <span>Open AI Mentor →</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar (Screen 7) */}
        <div className="blueprint-clean-tabs-bar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`blueprint-clean-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="blueprint-content-viewport">
          {/* TAB 1: OVERVIEW (Matches Screen 7 2-column Layout) */}
          {activeTab === 'overview' && (
            <div className="tab-pane-fade">
              <div className="blueprint-overview-screen7-grid">
                {/* Left Column: Project Overview Card */}
                <div className="bp-screen7-card left-card">
                  <h3 className="bp-card-title">Project Overview</h3>
                  <p className="bp-overview-lead">
                    {overview.proposedSolution || 'Build an AI system to predict waste generation, optimize collection routes and provide better waste management in smart cities.'}
                  </p>

                  <div className="bp-structured-points">
                    <div className="bp-point-row">
                      <span className="bp-point-bullet">•</span>
                      <div>
                        <strong>Problem:</strong>
                        <span className="bp-point-text">{overview.problem}</span>
                      </div>
                    </div>

                    <div className="bp-point-row">
                      <span className="bp-point-bullet">•</span>
                      <div>
                        <strong>Solution:</strong>
                        <span className="bp-point-text">{overview.proposedSolution}</span>
                      </div>
                    </div>

                    <div className="bp-point-row">
                      <span className="bp-point-bullet">•</span>
                      <div>
                        <strong>Impact:</strong>
                        <span className="bp-point-text">{overview.expectedImpact}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4-Item Grid at Bottom of Card */}
                  <div className="bp-overview-four-grid">
                    <div className="bp-four-item">
                      <span className="four-item-label">Target Users</span>
                      <span className="four-item-val">{overview.targetUsers}</span>
                    </div>

                    <div className="bp-four-item">
                      <span className="four-item-label">Core Features</span>
                      <span className="four-item-val">
                        {coreFeatures && coreFeatures.length > 0
                          ? coreFeatures.slice(0, 4).map(f => f.name || f.title).join(', ')
                          : 'Prediction, Route Optimization, Dashboard, Alerts'}
                      </span>
                    </div>

                    <div className="bp-four-item">
                      <span className="four-item-label">Data Sources</span>
                      <span className="four-item-val">
                        {datasetPlan?.primarySource || 'Historical waste data, Sensor data, City datasets'}
                      </span>
                    </div>

                    <div className="bp-four-item">
                      <span className="four-item-label">Success Metrics</span>
                      <span className="four-item-val">
                        {successCriteria?.[0]?.target || 'Reduce collection cost, Improve route efficiency'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: System Architecture Diagram Card (Screen 7) */}
                <div className="bp-screen7-card right-card">
                  <div className="bp-arch-card-header">
                    <h3 className="bp-card-title">System Architecture</h3>
                    <button
                      type="button"
                      className="bp-arch-inspect-link"
                      onClick={() => setActiveTab('architecture')}
                    >
                      Inspect Details →
                    </button>
                  </div>

                  <div className="screen7-arch-flow-diagram">
                    {/* Step 1: User / Admin */}
                    <div className="arch-flow-node-item">
                      <div className="arch-node-circle">
                        <Users size={18} className="node-icon-svg" />
                      </div>
                      <span className="arch-node-title">User / Admin</span>
                    </div>

                    <div className="arch-connector-line-v">↓</div>

                    {/* Step 2: Frontend */}
                    <div className="arch-flow-node-item">
                      <div className="arch-node-circle">
                        <Monitor size={18} className="node-icon-svg" />
                      </div>
                      <span className="arch-node-title">Frontend</span>
                      <span className="arch-node-tech">
                        ({techStack?.frontend?.name || 'React'})
                      </span>
                    </div>

                    <div className="arch-connector-line-v">↓</div>

                    {/* Step 3: Backend / API */}
                    <div className="arch-flow-node-item">
                      <div className="arch-node-circle">
                        <Server size={18} className="node-icon-svg" />
                      </div>
                      <span className="arch-node-title">Backend / API</span>
                      <span className="arch-node-tech">
                        ({techStack?.backend?.name || 'Node.js'})
                      </span>
                    </div>

                    <div className="arch-connector-line-v">↓</div>

                    {/* Step 4: Split / Parallel Node: AI Model & Database */}
                    <div className="arch-flow-dual-row">
                      <div className="arch-flow-node-item mini">
                        <div className="arch-node-circle">
                          <Cpu size={18} className="node-icon-svg" />
                        </div>
                        <span className="arch-node-title">AI Model</span>
                        <span className="arch-node-tech">
                          ({techStack?.aiMl?.model || 'Prediction'})
                        </span>
                      </div>

                      <div className="arch-flow-node-item mini">
                        <div className="arch-node-circle">
                          <Database size={18} className="node-icon-svg" />
                        </div>
                        <span className="arch-node-title">Database</span>
                        <span className="arch-node-tech">
                          ({techStack?.database?.name || 'MongoDB'})
                        </span>
                      </div>
                    </div>

                    <div className="arch-connector-line-v">↓</div>

                    {/* Step 5: Output */}
                    <div className="arch-flow-node-item">
                      <div className="arch-node-circle highlight-output">
                        <Send size={18} className="node-icon-svg" />
                      </div>
                      <span className="arch-node-title">Output / Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 14. Project Success Criteria */}
              <div className="bp-screen7-card" style={{ marginTop: '1.5rem' }}>
                <h4 className="bp-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Target size={18} color="#4F46E5" /> Project Success Criteria (Measurable MVP Results)
                </h4>
                <div className="criteria-table-wrap">
                  <table className="recs-table-card" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', fontSize: '0.78rem', color: '#64748B' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Criterion</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Measurable Target</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Verification Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {successCriteria.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#0F172A' }}>{item.criterion}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#4F46E5' }}>{item.target}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span className="rec-scale-badge">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        {/* TAB 2: MVP SCOPE */}
        {activeTab === 'mvp' && (
          <div className="tab-pane-fade">
            <div className="mvp-section-group">
              <div className="mvp-category-header">
                <h4 className="mvp-category-title must-have">
                  <CheckCircle2 size={18} color="#10B981" /> Must Have Features (Core MVP)
                </h4>
                <span className="mvp-category-desc">Non-negotiable features required to validate the core problem.</span>
              </div>

              <div className="mvp-cards-grid">
                {mvpScope.mustHave.map((item) => (
                  <div key={item.id} className="mvp-scope-card must-have">
                    <div className="scope-card-top">
                      <span className="priority-pill critical">{item.priority}</span>
                      <span className="effort-pill">{item.effort}</span>
                    </div>
                    <h5 className="scope-title">{item.title}</h5>
                    <p className="scope-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mvp-section-group" style={{ marginTop: '2rem' }}>
              <div className="mvp-category-header">
                <h4 className="mvp-category-title advanced">
                  <Sparkles size={18} color="#A78BFA" /> Advanced / Optional Features (Phase 2)
                </h4>
                <span className="mvp-category-desc">High-value enhancements if your team completes the MVP ahead of schedule.</span>
              </div>

              <div className="mvp-cards-grid">
                {mvpScope.advancedOptional.map((item) => (
                  <div key={item.id} className="mvp-scope-card optional">
                    <div className="scope-card-top">
                      <span className="priority-pill optional">{item.priority}</span>
                      <span className="effort-pill">{item.effort}</span>
                    </div>
                    <h5 className="scope-title">{item.title}</h5>
                    <p className="scope-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TECH STACK */}
        {activeTab === 'techstack' && (
          <div className="tab-pane-fade">
            <div className="tech-stack-grid">
              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">Frontend Client</span>
                  <h4 className="tech-name">{techStack.frontend.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.frontend.rationale}</p>
              </div>

              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">Backend Server</span>
                  <h4 className="tech-name">{techStack.backend.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.backend.rationale}</p>
              </div>

              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">Database & Storage</span>
                  <h4 className="tech-name">{techStack.database.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.database.rationale}</p>
              </div>

              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">AI / Machine Learning</span>
                  <h4 className="tech-name">{techStack.aiMl.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.aiMl.rationale}</p>
              </div>

              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">APIs & Messaging</span>
                  <h4 className="tech-name">{techStack.apis.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.apis.rationale}</p>
              </div>

              <div className="tech-card">
                <div className="tech-card-header">
                  <span className="tech-tier-tag">Deployment & Hosting</span>
                  <h4 className="tech-name">{techStack.deployment.technology}</h4>
                </div>
                <p className="tech-rationale">{techStack.deployment.rationale}</p>
              </div>

              {techStack.hardwareIoT && (
                <div className="tech-card highlight">
                  <div className="tech-card-header">
                    <span className="tech-tier-tag">Hardware / IoT Module</span>
                    <h4 className="tech-name">{techStack.hardwareIoT.technology}</h4>
                  </div>
                  <p className="tech-rationale">{techStack.hardwareIoT.rationale}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="tab-pane-fade">
            <VisualArchitectureFlow architecture={systemArchitecture} />
          </div>
        )}

        {/* TAB 5: CORE FEATURES */}
        {activeTab === 'features' && (
          <div className="tab-pane-fade">
            <div className="features-list-grid">
              {coreFeatures.map((feat, idx) => (
                <div key={feat.id} className="core-feature-card">
                  <div className="feature-header-bar">
                    <span className="feature-badge">Feature 0{idx + 1}</span>
                    <h4 className="feature-title">{feat.name}</h4>
                  </div>
                  
                  <div className="feature-purpose-box">
                    <span className="f-label">Purpose:</span>
                    <p className="f-text">{feat.purpose}</p>
                  </div>

                  <div className="f-pipeline-steps">
                    <div className="f-step-col">
                      <span className="step-col-label">📥 Input</span>
                      <p className="step-col-desc">{feat.input}</p>
                    </div>
                    <div className="f-step-col">
                      <span className="step-col-label">⚙️ Process</span>
                      <p className="step-col-desc">{feat.process}</p>
                    </div>
                    <div className="f-step-col">
                      <span className="step-col-label">📤 Output</span>
                      <p className="step-col-desc">{feat.output}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DATABASE */}
        {activeTab === 'database' && (
          <div className="tab-pane-fade">
            <div className="db-intro-banner">
              <Database size={20} color="var(--primary-cyan)" />
              <div>
                <strong>Engine: {databaseSchema.dbType}</strong>
                <p>Designed with relational integrity, indexing for sub-second telemetry lookups, and JSONB audit trails.</p>
              </div>
            </div>

            <div className="db-entities-grid">
              {databaseSchema.entities.map((entity, eIdx) => (
                <div key={eIdx} className="db-entity-card">
                  <div className="entity-card-header">
                    <span className="entity-tag">TABLE</span>
                    <h5 className="entity-name">{entity.name}</h5>
                    <p className="entity-desc">{entity.description}</p>
                  </div>

                  <div className="fields-table-wrap">
                    <table className="entity-fields-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Constraint</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entity.fields.map((f, fIdx) => (
                          <tr key={fIdx}>
                            <td className="field-name">{f.name}</td>
                            <td className="field-type">{f.type}</td>
                            <td className="field-constraint">{f.key || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="db-relations-box">
              <h5 className="relations-title">Entity Relationships (ER Cardinality):</h5>
              <div className="relations-list">
                {databaseSchema.relationships.map((rel, rIdx) => (
                  <div key={rIdx} className="relation-pill">
                    <code>{rel}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: AI/ML PLAN */}
        {activeTab === 'aiml' && (
          <div className="tab-pane-fade">
            <div className="content-card">
              <h4 className="card-block-title">🧠 Problem Formulation</h4>
              <p className="card-block-text" style={{ fontSize: '1rem', color: '#FFF' }}>
                {aiMlPlan.problemType}
              </p>
              <p className="card-block-text" style={{ marginTop: '0.5rem' }}>
                <strong>Input Vectors:</strong> {aiMlPlan.inputData}
              </p>
            </div>

            <div className="grid-2col" style={{ marginTop: '1.25rem' }}>
              <div className="content-card">
                <h4 className="card-block-title">⚙️ Preprocessing & Data Cleaning</h4>
                <ul className="clean-bullets">
                  {aiMlPlan.preprocessing.map((step, sIdx) => (
                    <li key={sIdx}>
                      <CheckCircle2 size={14} color="var(--primary-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="content-card">
                <h4 className="card-block-title">📐 Model Architecture & Strategy</h4>
                <div className="model-strategy-item">
                  <span className="strategy-tag">Baseline:</span>
                  <p className="strategy-desc">{aiMlPlan.modelApproach.baseline}</p>
                </div>
                <div className="model-strategy-item">
                  <span className="strategy-tag">Advanced:</span>
                  <p className="strategy-desc">{aiMlPlan.modelApproach.advanced}</p>
                </div>
                <div className="model-strategy-item">
                  <span className="strategy-tag">Inference Target:</span>
                  <p className="strategy-desc">{aiMlPlan.modelApproach.inferenceTarget}</p>
                </div>
              </div>
            </div>

            <div className="content-card" style={{ marginTop: '1.25rem' }}>
              <h4 className="card-block-title">📊 Evaluation Metrics & Acceptance Benchmarks</h4>
              <div className="criteria-table-wrap">
                <table className="blueprint-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Target Benchmark</th>
                      <th>Engineering Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiMlPlan.evaluationMetrics.map((em, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600, color: '#FFF' }}>{em.metric}</td>
                        <td style={{ color: 'var(--primary-cyan)', fontWeight: 700 }}>{em.target}</td>
                        <td>{em.rationale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: DATA SOURCES */}
        {activeTab === 'data' && (
          <div className="tab-pane-fade">
            <div className="content-card">
              <h4 className="card-block-title">📁 Required Dataset Specifications</h4>
              <p className="card-block-text">{datasetPlan.requiredData}</p>
              
              <div style={{ marginTop: '1rem' }}>
                <span className="sub-tag-label">Important Target Fields:</span>
                <div className="fields-tag-cloud">
                  {datasetPlan.importantFields.map((field, fIdx) => (
                    <span key={fIdx} className="field-tag-badge">
                      <code>{field}</code>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-2col" style={{ marginTop: '1.25rem' }}>
              <div className="content-card">
                <h4 className="card-block-title">🌐 Verified Public Repositories</h4>
                <div className="sources-list">
                  {datasetPlan.publicDataSources.map((source, sIdx) => (
                    <div key={sIdx} className="source-item-card">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h5 className="source-name">{source.name}</h5>
                        <ExternalLink size={14} color="var(--primary-cyan)" />
                      </div>
                      <p className="source-desc">{source.description}</p>
                      <code className="source-url">{source.url}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-card highlight">
                <h4 className="card-block-title">🧪 Synthetic Data Fallback Recipe</h4>
                <p className="card-block-text">
                  <strong>Strategy:</strong> {datasetPlan.syntheticDataOption.strategy}
                </p>
                <div className="recipe-box">
                  <span className="recipe-title">Execution Recipe:</span>
                  <p className="recipe-text">{datasetPlan.syntheticDataOption.recipe}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="tab-pane-fade">
            <RoadmapTimeline roadmap={roadmap} />
          </div>
        )}

        {/* TAB 10: TEAM */}
        {activeTab === 'team' && (
          <div className="tab-pane-fade">
            <TeamDistribution 
              teamDistribution={teamDistribution} 
              teamSize={blueprint.studentProfile.teamSize} 
            />
          </div>
        )}

        {/* TAB 11: INNOVATION & RISKS */}
        {activeTab === 'innovations' && (
          <div className="tab-pane-fade">
            <div className="innovations-section">
              <h4 className="section-title-highlight" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lightbulb size={20} color="#FBBF24" /> 3–5 Unique Innovations (High Academic Defense Impact)
              </h4>
              <div className="innovations-grid">
                {innovations.map((item, idx) => (
                  <div key={idx} className="innovation-card">
                    <div className="inn-card-top">
                      <span className="inn-num">0{idx + 1}</span>
                      <h5 className="inn-title">{item.title}</h5>
                    </div>
                    <p className="inn-desc">{item.description}</p>
                    <div className="inn-impact-box">
                      <Sparkles size={13} color="var(--primary-cyan)" />
                      <span>{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="risks-section" style={{ marginTop: '2.5rem' }}>
              <h4 className="section-title-highlight" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} color="#F87171" /> Technical Risks & Practical Mitigation Solutions
              </h4>
              <div className="risks-grid">
                {risksAndSolutions.map((item, idx) => (
                  <div key={idx} className="risk-solution-card">
                    <div className="risk-header">
                      <span className={`severity-tag ${item.severity.toLowerCase()}`}>
                        Severity: {item.severity}
                      </span>
                      <h5 className="risk-title">⚠️ Risk: {item.risk}</h5>
                    </div>
                    <div className="solution-block">
                      <span className="sol-label">✅ Practical Engineering Solution:</span>
                      <p className="sol-text">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      </main>

      {/* JSON Payload Modal for Stage 4 System Readiness */}
      {showJsonModal && (
        <div className="modal-backdrop" onClick={() => setShowJsonModal(false)}>
          <div className="modal-content-card json-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code2 size={20} color="var(--primary-cyan)" />
                <h3 className="modal-title">Structured Blueprint JSON</h3>
              </div>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setShowJsonModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="json-modal-body">
              <pre className="json-code-block">
                {JSON.stringify(blueprint, null, 2)}
              </pre>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="modal-action-btn btn-secondary"
                onClick={handleCopyJson}
              >
                {copiedJson ? (
                  <>
                    <Check size={16} color="#10B981" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="modal-action-btn btn-primary"
                onClick={handleDownloadJson}
              >
                <Download size={16} />
                <span>Download .json File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
