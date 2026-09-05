import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles, Send, ArrowLeft, Bot, User, Check, Copy, AlertCircle,
  RefreshCw, Terminal, Layers, Clock, Users, Code2, Database,
  Cpu, CheckCircle2, Circle, HelpCircle, FileText, Bug, Flame,
  Lightbulb, Compass, ChevronRight, RotateCcw, Square
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AppSidebar from '../layout/AppSidebar';
import ParticleBackground from '../common/ParticleBackground';

// Conversational quick actions to start discussions
const QUICK_ACTIONS = [
  { id: 'start', label: 'Help me start', prompt: 'How should I start my project?' },
  { id: 'explain', label: 'Explain this simply', prompt: 'Can you explain what my project does in simple terms?' },
  { id: 'today', label: 'What should I do today?', prompt: 'What should I work on today based on my current progress?' },
  { id: 'debug', label: 'Help me debug', prompt: 'I got an error while running my project. Can you help me debug it?' },
  { id: 'architecture', label: 'Review my architecture', prompt: 'Can you review my project architecture and suggest the best setup?' }
];

// Mentor modes prescribed by requirements
const MENTOR_MODES = [
  { id: 'BUILD', label: 'Build', desc: 'Code strategy & implementation' },
  { id: 'EXPLAIN', label: 'Explain', desc: 'Simple concept clarity' },
  { id: 'DEBUG', label: 'Debug', desc: 'Fix errors & bottlenecks' },
  { id: 'DATA', label: 'Data', desc: 'Datasets & preprocessing' },
  { id: 'ROADMAP', label: 'Roadmap', desc: 'Sprint planning & deadlines' },
  { id: 'DOCUMENTATION', label: 'Docs', desc: 'Reports, diagrams & viva' }
];

export default function MentorChat({ project, studentProfile, blueprint, onBack, onNavigateSection }) {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState('BUILD');
  const [errorBanner, setErrorBanner] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [progressState, setProgressState] = useState({
    requirements: 'done',
    database: 'done',
    backend: 'done',
    aiml: 'in_progress',
    frontend: 'todo',
    testing: 'todo',
    deployment: 'todo'
  });

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const safeProject = project || {
    id: 'ai-waste-management',
    title: 'AI-Powered Waste Management System',
    selectedIndustry: 'AI & ML',
    industry: 'AI & ML',
    domain: 'AI & ML',
    overallScore: 92,
    difficulty: 'Medium',
    estimatedTime: '2–3 Months',
    techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB']
  };

  const projectId = safeProject.id || 'default-project';
  const projectTitle = safeProject.title || blueprint?.overview?.title || 'Selected Final-Year Project';
  const industry = safeProject.selectedIndustry || safeProject.domain || 'Technology';
  const firstMilestone = blueprint?.firstMilestone || {
    title: 'Phase 1: Foundation & Ingestion Pipeline',
    oneActionTask: 'Setup project repository and baseline dependencies'
  };

  // Calculate Overall Progress
  const calculateProgress = () => {
    const weights = {
      requirements: 15,
      database: 15,
      backend: 20,
      aiml: 20,
      frontend: 15,
      testing: 10,
      deployment: 5
    };
    let total = 0;
    Object.keys(progressState).forEach((key) => {
      if (progressState[key] === 'done') total += weights[key] || 10;
      else if (progressState[key] === 'in_progress') total += (weights[key] || 10) * 0.5;
    });
    return Math.round(total);
  };

  const progressPercent = calculateProgress();

  // Load existing conversation on mount
  useEffect(() => {
    let isMounted = true;
    async function loadConversation() {
      try {
        const res = await fetch(`/api/chat/${projectId}`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error('Failed to load conversation history:', err);
      }
    }

    if (projectId) {
      loadConversation();
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle textarea autosize
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  };

  const abortControllerRef = useRef(null);

  // Stop ongoing response generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  // Regenerate last response
  const handleRegenerate = () => {
    if (isLoading) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove last assistant message and re-send
      setMessages((prev) => {
        const next = [...prev];
        if (next.length > 0 && next[next.length - 1].role === 'assistant') {
          next.pop();
        }
        return next;
      });
      handleSendMessage(lastUserMsg.content, true);
    }
  };

  // Send message
  const handleSendMessage = async (textToSend, isRegenerate = false) => {
    const content = (textToSend || inputValue).trim();
    if (!content || isLoading) return;

    setErrorBanner(null);

    // Only add optimistic user message if this is NOT a re-generation of previous message
    let optimisticMessageTimestamp = null;
    if (!isRegenerate) {
      optimisticMessageTimestamp = new Date().toISOString();
      const userMsg = {
        role: 'user',
        content,
        timestamp: optimisticMessageTimestamp
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    if (!textToSend) setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const payload = {
        message: content,
        projectId,
        chatMode: activeMode,
        studentProfile: {
          branch: studentProfile?.branch || user?.profile?.branch || 'Engineering',
          skills: studentProfile?.skills || user?.profile?.skills || [],
          interests: studentProfile?.interests || user?.profile?.interests || [],
          teamSize: studentProfile?.teamSize || user?.profile?.teamSize || '1',
          timeAvailable: studentProfile?.timeAvailable || user?.profile?.timeAvailable || '3–4 months'
        },
        projectContext: {
          id: project?.id,
          title: projectTitle,
          selectedIndustry: industry,
          problem: project?.problem || blueprint?.overview?.problem,
          solution: project?.solution || blueprint?.overview?.proposedSolution,
          targetUsers: project?.targetUsers || blueprint?.overview?.targetUsers,
          techStack: project?.domains || blueprint?.techStack,
          difficulty: project?.difficulty || blueprint?.meta?.difficulty,
          estimatedTime: project?.estimatedTime || blueprint?.meta?.estimatedTimeline,
          opportunityScore: project?.overallScore || blueprint?.meta?.opportunityScore
        },
        blueprintSummary: {
          overview: blueprint?.overview,
          mvpScope: blueprint?.mvpScope,
          techStack: blueprint?.techStack,
          architecture: blueprint?.systemArchitecture,
          roadmap: blueprint?.roadmap,
          firstMilestone: blueprint?.firstMilestone,
          successCriteria: blueprint?.successCriteria
        },
        currentProgress: {
          overall: progressPercent,
          statusBreakdown: progressState
        }
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal: controller.signal,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "I couldn't connect to the mentor right now. Please try again.");
      }

      const data = await res.json();
      const assistantMsg = {
        role: 'assistant',
        content: data.reply,
        timestamp: data.timestamp || new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Chat generation cancelled by user.');
        return;
      }
      console.error('Chat error:', err);
      if (optimisticMessageTimestamp) {
        setMessages((prev) => prev.filter((message) => message.timestamp !== optimisticMessageTimestamp));
      }
      setErrorBanner(err.message || "I couldn't connect to the mentor right now. Please try again.");
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (codeText, blockId) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(blockId);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Format timestamp helper
  const formatTime = (ts) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Simple, safe Markdown & Code Renderer
  const renderMessageContent = (content, msgIdx) => {
    if (!content) return null;

    // Split message by code blocks ```lang ... ```
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Code block
      parts.push({
        type: 'code',
        language: match[1] || 'bash',
        code: match[2]
      });

      lastIndex = match.index + match[0].length;
    }

    // Remaining text after code block
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return (
      <div className="message-content-flow">
        {parts.map((part, pIdx) => {
          if (part.type === 'code') {
            const blockId = `${msgIdx}-${pIdx}`;
            const isCopied = copiedIndex === blockId;
            return (
              <div key={pIdx} className="mentor-code-block">
                <div className="code-block-header">
                  <span className="code-lang-label">
                    <Code2 size={13} /> {part.language.toUpperCase() || 'CODE'}
                  </span>
                  <button
                    type="button"
                    className="copy-code-btn"
                    onClick={() => handleCopyCode(part.code, blockId)}
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} color="#10B981" />
                        <span style={{ color: '#10B981' }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="code-pre">
                  <code>{part.code.trim()}</code>
                </pre>
              </div>
            );
          }

          // Plain text formatting with simple markdown handling
          return (
            <div key={pIdx} className="formatted-text-segment">
              {formatMarkdownText(part.content)}
            </div>
          );
        })}
      </div>
    );
  };

  // Simple markdown processor for bold, headers, and bullet lists
  const formatMarkdownText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();

      // Heading 3: ### Heading
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="chat-md-h3">
            {parseInline(trimmed.replace('### ', ''))}
          </h4>
        );
      }

      // Heading 2: ## Heading
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lIdx} className="chat-md-h2">
            {parseInline(trimmed.replace('## ', ''))}
          </h3>
        );
      }

      // Heading 1: # Heading
      if (trimmed.startsWith('# ')) {
        return (
          <h2 key={lIdx} className="chat-md-h1">
            {parseInline(trimmed.replace('# ', ''))}
          </h2>
        );
      }

      // Bullet: - or *
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <div key={lIdx} className="chat-md-bullet">
            <span className="bullet-dot">•</span>
            <span>{parseInline(trimmed.slice(2))}</span>
          </div>
        );
      }

      // Numbered item: 1. 2.
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={lIdx} className="chat-md-number">
            <span className="num-badge">{numMatch[1]}.</span>
            <span>{parseInline(numMatch[2])}</span>
          </div>
        );
      }

      // Empty line
      if (!trimmed) {
        return <div key={lIdx} className="chat-empty-line" />;
      }

      // Standard paragraph
      return (
        <p key={lIdx} className="chat-md-p">
          {parseInline(line)}
        </p>
      );
    });
  };

  // Helper for **bold** and `inline-code`
  const parseInline = (text) => {
    const parts = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="chat-inline-bold">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={match.index} className="chat-inline-code">
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIdx = match.index + token.length;
    }

    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }

    return parts.length > 0 ? parts : text;
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Reset conversation history with your mentor?')) return;
    try {
      await fetch(`/api/chat/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setMessages([]);
    } catch (e) {
      console.error(e);
    }
  };

  const opportunityScoreStr = useMemo(() => {
    if (safeProject.score) return safeProject.score.toString();
    if (safeProject.overallScore) return (safeProject.overallScore / 10).toFixed(1);
    if (blueprint?.meta?.opportunityScore) return (blueprint.meta.opportunityScore / 10).toFixed(1);
    return '9.2';
  }, [safeProject, blueprint]);

  const techStackList = useMemo(() => {
    if (safeProject.techStack && Array.isArray(safeProject.techStack) && safeProject.techStack.length > 0) {
      return safeProject.techStack;
    }
    if (blueprint?.techStack) {
      const items = [];
      if (blueprint.techStack.frontend?.name) items.push(blueprint.techStack.frontend.name);
      if (blueprint.techStack.backend?.name) items.push(blueprint.techStack.backend.name);
      if (blueprint.techStack.database?.name) items.push(blueprint.techStack.database.name);
      if (blueprint.techStack.aiMl?.framework) items.push(blueprint.techStack.aiMl.framework);
      if (items.length > 0) return items;
    }
    return ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'];
  }, [safeProject, blueprint]);

  const activeMilestoneTitle = blueprint?.roadmap?.phases?.[1]?.name || 'AI Model Development';

  return (
    <div className="unified-app-layout">
      <ParticleBackground density="sparse" />

      {/* LEFT SIDEBAR (Screen 8) */}
      <AppSidebar
        currentSection="mentor"
        onNavigate={onNavigateSection || (() => {})}
        onLogout={logout}
      />

      {/* 3-COLUMN WRAPPER: Center Chat + Right Project Context */}
      <div className="mentor-screen8-main-wrapper">
        {/* CENTER COLUMN: AI CONVERSATION */}
        <section className="mentor-screen8-chat-col">
          {/* Header */}
          <div className="mentor-screen8-chat-header">
            <div className="mentor-screen8-header-top">
              <div>
                <h1 className="mentor-screen8-title">AI Mentor</h1>
                <p className="mentor-screen8-sub">Your personal AI mentor for your project.</p>
              </div>

              <div className="mentor-screen8-actions">
                {onBack && (
                  <button type="button" className="screen8-back-btn" onClick={onBack} title="Back to Blueprint">
                    <ArrowLeft size={14} />
                    <span>Blueprint</span>
                  </button>
                )}
                {messages.length > 0 && (
                  <button
                    type="button"
                    className="screen8-clear-btn"
                    onClick={handleClearHistory}
                    title="Reset conversation"
                  >
                    <RotateCcw size={13} />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Messages Scroll Viewport */}
          <div className="mentor-screen8-messages-viewport">
            {/* INITIAL WELCOME STATE (Screen 8) */}
            {messages.length === 0 && (
              <div className="mentor-screen8-starter-box">
                <div className="screen8-ai-bubble starter-greeting">
                  <p>
                    Hi! I'm your ProjectPilot AI Mentor. I have full context of your blueprint for <strong>{projectTitle}</strong>, your tech stack ({techStackList.join(', ')}), and your roadmap.
                  </p>
                  <p style={{ marginTop: '0.6rem' }}>
                    Ask me anything about architecture, milestone planning, code implementation, or viva prep.
                  </p>
                </div>

                <div className="screen8-quick-chips">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="screen8-chip-btn"
                      onClick={() => handleSendMessage(action.prompt)}
                      disabled={isLoading}
                    >
                      <span>{action.prompt}</span>
                      <ChevronRight size={13} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE BUBBLES */}
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`mentor-screen8-bubble-row ${isAssistant ? 'assistant-row' : 'user-row'}`}
                >
                  <div className={`screen8-bubble ${isAssistant ? 'screen8-ai-bubble' : 'screen8-user-bubble'}`}>
                    {isAssistant ? (
                      <>
                        <div className="screen8-ai-content">
                          {renderMessageContent(msg.content, idx)}
                        </div>

                        {idx === messages.length - 1 && !isLoading && (
                          <div className="screen8-msg-footer-bar">
                            <button
                              type="button"
                              className="screen8-regen-btn"
                              onClick={handleRegenerate}
                              title="Regenerate this response"
                            >
                              <RotateCcw size={11} />
                              <span>Regenerate response</span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="screen8-user-text">{msg.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* TYPING INDICATOR (Screen 8 '...') */}
            {isLoading && (
              <div className="mentor-screen8-bubble-row assistant-row">
                <div className="screen8-bubble screen8-ai-bubble typing-box">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {/* ERROR BANNER */}
            {errorBanner && (
              <div className="screen8-error-banner">
                <AlertCircle size={15} color="#EF4444" />
                <span className="error-text">{errorBanner}</span>
                <button
                  type="button"
                  className="error-retry-link"
                  onClick={() => handleSendMessage(inputValue || 'Please continue')}
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* CHAT INPUT BAR (Screen 8) */}
          <div className="mentor-screen8-input-container">
            <form
              className="mentor-screen8-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim() && !isLoading) handleSendMessage();
              }}
            >
              <input
                ref={textareaRef}
                type="text"
                className="mentor-screen8-input-field"
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim() && !isLoading) handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="mentor-screen8-send-button"
                disabled={!inputValue.trim() || isLoading}
                title="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: PROJECT CONTEXT PANEL (Screen 8) */}
        <aside className="mentor-screen8-context-col">
          <div className="screen8-ctx-header-title">Project Context</div>

          {/* Project Name */}
          <div className="screen8-ctx-section">
            <span className="screen8-ctx-label">Project:</span>
            <h3 className="screen8-ctx-project-title">{projectTitle}</h3>
          </div>

          {/* Opportunity Score */}
          <div className="screen8-ctx-section">
            <span className="screen8-ctx-label">Opportunity Score:</span>
            <div className="screen8-score-highlight">
              <span className="score-number-big">{opportunityScoreStr}</span>
              <span className="score-denom-text"> / 10</span>
            </div>
          </div>

          {/* Tech Stack List */}
          <div className="screen8-ctx-section">
            <span className="screen8-ctx-label">Tech Stack:</span>
            <ul className="screen8-tech-items-list">
              {techStackList.map((tech, idx) => (
                <li key={idx} className="tech-item-li">
                  <span className="tech-bullet">•</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Milestone */}
          <div className="screen8-ctx-section">
            <span className="screen8-ctx-label">Current Milestone:</span>
            <div className="screen8-milestone-box">
              {activeMilestoneTitle}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="screen8-ctx-section">
            <div className="screen8-progress-header-row">
              <span className="screen8-ctx-label">Progress:</span>
              <span className="screen8-progress-percentage">{progressPercent}%</span>
            </div>
            <div className="screen8-progress-track">
              <div
                className="screen8-progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
