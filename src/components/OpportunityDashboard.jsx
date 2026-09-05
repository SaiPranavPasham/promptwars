import React, { useState, useMemo } from 'react';
import {
  Sparkles, Filter, ChevronRight, Layers, ArrowRight, Check,
  Cpu, Globe, Wifi, LineChart, SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppSidebar from './layout/AppSidebar';
import ParticleBackground from './common/ParticleBackground';
import { generateProjectOpportunities } from '../data/opportunityEngine';

export default function OpportunityDashboard({
  answers,
  selectedIndustry,
  onChangeIndustry,
  onEditProfile,
  onSelectProject,
  onNavigateSection
}) {
  const { logout } = useAuth();
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('overallScore');

  // Generate 5 opportunities strictly for selectedIndustry from profile answers
  const rawProjects = useMemo(() => {
    return generateProjectOpportunities(answers, selectedIndustry || 'General');
  }, [answers, selectedIndustry]);

  // Apply domain, difficulty, and sort filters
  const filteredProjects = useMemo(() => {
    let list = [...rawProjects];

    if (selectedDomainFilter !== 'All') {
      list = list.filter((p) => {
        const text = (p.domains?.join(' ') || p.title + ' ' + p.solution).toLowerCase();
        return text.includes(selectedDomainFilter.toLowerCase());
      });
    }

    if (difficultyFilter !== 'All') {
      list = list.filter((p) => (p.difficulty || '').toLowerCase() === difficultyFilter.toLowerCase());
    }

    if (timeFilter !== 'All') {
      list = list.filter((p) => (p.estimatedTime || '').toLowerCase().includes(timeFilter.toLowerCase()));
    }

    switch (sortBy) {
      case 'innovation':
        return list.sort((a, b) => (b.scores?.innovation || 0) - (a.scores?.innovation || 0));
      case 'scalability':
        return list.sort((a, b) => (b.scores?.scalability || 0) - (a.scores?.scalability || 0));
      case 'overallScore':
      default:
        return list.sort((a, b) => b.overallScore - a.overallScore);
    }
  }, [rawProjects, selectedDomainFilter, difficultyFilter, timeFilter, sortBy]);

  const domainPills = ['All', 'AI & ML', 'Web', 'IoT', 'Data Science'];

  return (
    <div className="unified-app-layout">
      <ParticleBackground density="sparse" />

      {/* LEFT SIDEBAR (Screen 6) */}
      <AppSidebar
        currentSection="projects"
        onNavigate={onNavigateSection || (() => {})}
        onLogout={logout}
      />

      {/* MAIN RECOMMENDATIONS CONTAINER */}
      <main className="recommendations-main-area">
        {/* Top Header */}
        <div className="recs-header-strip">
          <div>
            <h1 className="recs-page-title">Projects Built For You</h1>
            <p className="recs-page-subtitle">
              AI-powered recommendations based on your profile {selectedIndustry ? `• ${selectedIndustry}` : ''}
            </p>
          </div>

          <div className="recs-header-actions">
            {onChangeIndustry && (
              <button
                type="button"
                className="recs-action-btn"
                onClick={onChangeIndustry}
              >
                <Layers size={14} />
                <span>Change Industry</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar (Screen 6) */}
        <div className="recs-filters-bar">
          {/* Domain Category Pills */}
          <div className="domain-filters-group">
            {domainPills.map((dom) => (
              <button
                key={dom}
                type="button"
                className={`domain-filter-chip ${selectedDomainFilter === dom ? 'active' : ''}`}
                onClick={() => setSelectedDomainFilter(dom)}
              >
                {dom}
              </button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="recs-dropdowns-group">
            <select
              className="recs-select-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              aria-label="Filter by Difficulty"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              className="recs-select-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              aria-label="Filter by Time"
            >
              <option value="All">Time: All</option>
              <option value="1-2">1–2 Months</option>
              <option value="2-3">2–3 Months</option>
              <option value="3+">3+ Months</option>
            </select>

            <select
              className="recs-select-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by Score"
            >
              <option value="overallScore">Score: High to Low</option>
              <option value="innovation">Sort by Innovation</option>
              <option value="scalability">Sort by Scalability</option>
            </select>
          </div>
        </div>

        {/* 5 PROJECT ROWS LIST (Screen 6) */}
        <div className="projects-rows-container">
          {filteredProjects.slice(0, 5).map((project, idx) => {
            const rank = idx + 1;
            const primaryDomain = project.domains?.[0] || 'AI & ML';
            const scaleText = project.scores?.scalability >= 8.5 ? 'High' : 'Medium';

            return (
              <div
                key={project.id || idx}
                className="project-row-card"
                onClick={() => onSelectProject(project)}
              >
                {/* Rank Badge */}
                <div className="row-rank-box">
                  <span className="rank-number">{rank}</span>
                </div>

                {/* Title & Problem Icon */}
                <div className="row-title-info">
                  <div className="proj-avatar-icon">
                    <Sparkles size={16} color="#6366F1" />
                  </div>
                  <div className="title-text-group">
                    <h3 className="row-proj-title">{project.title}</h3>
                    <p className="row-proj-desc">{project.problem?.slice(0, 85)}...</p>
                  </div>
                </div>

                {/* Domain Pill */}
                <div className="row-domain-cell">
                  <span className="domain-bubble-tag">{primaryDomain}</span>
                </div>

                {/* Opportunity Score */}
                <div className="row-metric-cell">
                  <span className="metric-primary-val score-highlight">
                    {project.overallScore?.toFixed(1) || '8.8'}
                  </span>
                  <span className="metric-sublabel">Score</span>
                </div>

                {/* Difficulty */}
                <div className="row-metric-cell">
                  <span className="metric-primary-val">
                    {project.difficulty || 'Medium'}
                  </span>
                  <span className="metric-sublabel">Difficulty</span>
                </div>

                {/* Estimated Time */}
                <div className="row-metric-cell">
                  <span className="metric-primary-val">
                    {project.estimatedTime || '2–3 Months'}
                  </span>
                  <span className="metric-sublabel">Time</span>
                </div>

                {/* Scale Potential */}
                <div className="row-metric-cell">
                  <span className="metric-primary-val scale-tag">
                    {scaleText}
                  </span>
                  <span className="metric-sublabel">Scale Potential</span>
                </div>

                {/* Explore Action Button */}
                <div className="row-action-cell">
                  <button
                    type="button"
                    className="row-explore-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                  >
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="recs-bottom-note">
          <span>Showing top 5 projects ranked for your profile</span>
        </div>
      </main>
    </div>
  );
}
