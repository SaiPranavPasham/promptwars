import React, { useState } from 'react';
import {
  Sparkles, ArrowRight, Compass, Layers, Bot, Cpu, CheckCircle2,
  ChevronDown, Menu, X, Shield, ArrowUpRight, Award, Zap, Code2,
  GraduationCap, LineChart, Globe, Smartphone, Database, Wifi,
  Leaf, Sprout, Heart, Star, Mail, Check
} from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

export default function LandingPage({ onGetStarted, onLogin, user, onGoToDashboard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  const studentCommunities = [
    { name: 'Campus Builders', icon: '🏛️' },
    { name: 'Engineering Clubs', icon: '🎓' },
    { name: 'Student Innovators', icon: '🔬' },
    { name: 'Capstone Teams', icon: '⚡' },
    { name: 'Tech Communities', icon: '🌐' },
    { name: 'Future Founders', icon: '🚀' }
  ];

  const popularDomains = [
    { name: 'AI & ML', icon: Cpu, color: '#38BDF8' },
    { name: 'Web Development', icon: Globe, color: '#6366F1' },
    { name: 'Mobile Apps', icon: Smartphone, color: '#EC4899' },
    { name: 'Data Science', icon: LineChart, color: '#F59E0B' },
    { name: 'IoT', icon: Wifi, color: '#10B981' },
    { name: 'Blockchain', icon: Layers, color: '#8B5CF6' },
    { name: 'Cybersecurity', icon: Shield, color: '#EF4444' },
    { name: 'Healthcare', icon: Heart, color: '#EC4899' },
    { name: 'Agriculture', icon: Sprout, color: '#10B981' },
    { name: 'Education', icon: GraduationCap, color: '#3B82F6' },
    { name: 'Finance', icon: Zap, color: '#F59E0B' },
    { name: 'Environment', icon: Leaf, color: '#059669' }
  ];

  return (
    <div className="landing-root">
      {/* ── TOP NAVBAR ── */}
      <header className="landing-navbar">
        <div className="landing-nav-container">
          {/* Brand Logo */}
          <div className="landing-brand-wrap" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="brand-prism-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#prismGrad1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="url(#prismGrad2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="url(#prismGrad3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="prismGrad1" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" />
                    <stop offset="0.5" stopColor="#818CF8" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="prismGrad2" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EC4899" />
                    <stop offset="0.5" stopColor="#FB923C" />
                    <stop offset="1" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="prismGrad3" x1="2" y1="12" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#818CF8" />
                    <stop offset="1" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="landing-brand-name">ProjectPilot AI</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="landing-nav-links">
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('features')}>
              <span>Features</span>
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('workflow')}>
              <span>Use Cases</span>
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('about')}>
              <span>Resources</span>
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('domains')}>
              <span>Pricing</span>
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('about')}>
              <span>About</span>
            </button>
          </nav>

          {/* Auth CTA Buttons */}
          <div className="landing-nav-actions">
            {user ? (
              <button type="button" className="landing-cta-pill primary" onClick={onGoToDashboard}>
                <span>Go to Dashboard</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button type="button" className="landing-nav-login" onClick={onLogin}>
                  Login
                </button>
                <button type="button" className="landing-cta-pill primary" onClick={onGetStarted}>
                  Get Started
                </button>
              </>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-dropdown">
            <button type="button" onClick={() => scrollToSection('features')}>Features</button>
            <button type="button" onClick={() => scrollToSection('use-cases')}>Use Cases</button>
            <button type="button" onClick={() => scrollToSection('workflow')}>How It Works</button>
            <button type="button" onClick={() => scrollToSection('domains')}>Domains</button>
            <button type="button" onClick={() => scrollToSection('about')}>About</button>
            <div className="mobile-nav-divider" />
            {user ? (
              <button type="button" className="landing-cta-pill primary mobile-w" onClick={onGoToDashboard}>
                Go to Dashboard
              </button>
            ) : (
              <div className="mobile-auth-row">
                <button type="button" className="landing-nav-login" onClick={onLogin}>
                  Login
                </button>
                <button type="button" className="landing-cta-pill primary" onClick={onGetStarted}>
                  Get Started
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── SECTION 1: HERO ── */}
      <section className="landing-hero-section">
        {/* Animated Radial Dot Field (Matching Reference Screen 1) */}
        <ParticleCanvas />

        <div className="hero-content-wrapper">
          {/* Small Brand Pill */}
          <div className="hero-brand-pill">
            <span className="brand-pill-sparkle">
              <Sparkles size={13} />
            </span>
            <span className="brand-pill-text">AI-POWERED PROJECT DISCOVERY PLATFORM</span>
          </div>

          {/* Main Editorial Heading with Gradient Highlights on "project." and "future." */}
          <h1 className="hero-headline">
            Find the right <span className="gradient-text-hero">project.</span><br />
            Build the right <span className="gradient-text-hero alt">future.</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subheading">
            ProjectPilot AI helps final-year students discover, plan and build impactful projects with AI guidance at every step.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="landing-cta-pill primary hero-btn"
              onClick={user ? onGoToDashboard : onGetStarted}
            >
              <span>Get Started</span>
            </button>
            <button
              type="button"
              className="landing-cta-pill secondary hero-btn"
              onClick={() => scrollToSection('workflow')}
            >
              <span>Explore Features</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRUSTED BY SECTION ── */}
      <section className="trusted-by-strip">
        <p className="trusted-by-title">Built for ambitious student communities</p>
        <div className="trusted-badges-row">
          {studentCommunities.map((uni, idx) => (
            <div key={idx} className="trusted-badge-pill">
              <span className="uni-icon">{uni.icon}</span>
              <span className="uni-name">{uni.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: HOW PROJECTPILOT WORKS (4 STEPS) ── */}
      <section id="workflow" className="landing-section workflow-section">
        <div className="section-header-center">
          <span className="section-eyebrow">SIMPLE 4-STEP JOURNEY</span>
          <h2 className="section-title">How ProjectPilot AI Works</h2>
          <p className="section-desc">Your AI journey from idea to impact in 4 simple steps.</p>
        </div>

        <div className="four-steps-grid">
          <div className="step-card-box">
            <span className="step-num-badge">01</span>
            <h3 className="step-card-title">Tell us about you</h3>
            <p className="step-card-text">Share your skills, interests, team and timeline.</p>
          </div>
          <span className="step-flow-arrow">→</span>

          <div className="step-card-box">
            <span className="step-num-badge">02</span>
            <h3 className="step-card-title">Discover projects</h3>
            <p className="step-card-text">AI finds projects that match your profile and real-world opportunities.</p>
          </div>
          <span className="step-flow-arrow">→</span>

          <div className="step-card-box">
            <span className="step-num-badge">03</span>
            <h3 className="step-card-title">Plan your build</h3>
            <p className="step-card-text">Get a complete blueprint with architecture, tech stack & roadmap.</p>
          </div>
          <span className="step-flow-arrow">→</span>

          <div className="step-card-box">
            <span className="step-num-badge">04</span>
            <h3 className="step-card-title">Build with AI Mentor</h3>
            <p className="step-card-text">Your AI mentor guides you throughout the development cycle.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY STUDENTS LOVE PROJECTPILOT AI (6 FEATURES) ── */}
      <section id="features" className="landing-section features-bg">
        <div className="section-header-center">
          <span className="section-eyebrow">BUILT FOR CAPSTONE SUCCESS</span>
          <h2 className="section-title">Why Students Love ProjectPilot AI</h2>
          <p className="section-desc">Everything you need to build amazing projects.</p>
        </div>

        <div className="six-features-grid">
          <div className="feature-card-clean">
            <div className="feature-icon-circle blue">
              <Cpu size={22} />
            </div>
            <h4>AI-Powered Matching</h4>
            <p>Match projects with student profiles, technical skills, and available timeline.</p>
          </div>

          <div className="feature-card-clean">
            <div className="feature-icon-circle purple">
              <Award size={22} />
            </div>
            <h4>Opportunity Scoring</h4>
            <p>Evaluate projects across real-world relevance, technical feasibility, and scalability.</p>
          </div>

          <div className="feature-card-clean">
            <div className="feature-icon-circle pink">
              <Layers size={22} />
            </div>
            <h4>Complete Blueprints</h4>
            <p>Generate 3-tier architecture, system data flow, tech stack, and sprint roadmap.</p>
          </div>

          <div className="feature-card-clean">
            <div className="feature-icon-circle orange">
              <Bot size={22} />
            </div>
            <h4>AI Mentor</h4>
            <p>Get project-specific pair-programming guidance, debugging, and viva prep 24/7.</p>
          </div>

          <div className="feature-card-clean">
            <div className="feature-icon-circle cyan">
              <Zap size={22} />
            </div>
            <h4>Team Collaboration</h4>
            <p>Help teams organize and divide modular project work with role assignments.</p>
          </div>

          <div className="feature-card-clean">
            <div className="feature-icon-circle emerald">
              <Shield size={22} />
            </div>
            <h4>Resume & Showcase</h4>
            <p>Turn completed projects into a stunning portfolio piece ready for technical interviews.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: POPULAR PROJECT DOMAINS (12 PILLS) ── */}
      <section id="domains" className="landing-section">
        <div className="section-header-center">
          <span className="section-eyebrow">DIVERSE VERTICALS</span>
          <h2 className="section-title">Popular Project Domains</h2>
          <p className="section-desc">Explore trending domains and real-world project areas.</p>
        </div>

        <div className="domains-pills-wrap">
          {popularDomains.map((dom, idx) => {
            const Icon = dom.icon;
            return (
              <div key={idx} className="domain-pill-card">
                <Icon size={18} style={{ color: dom.color }} />
                <span>{dom.name}</span>
              </div>
            );
          })}
        </div>

        <div className="domains-cta-center">
          <button
            type="button"
            className="explore-all-domains-btn"
            onClick={user ? onGoToDashboard : onGetStarted}
          >
            <span>Explore All Domains</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── SECTION 6: TESTIMONIALS (3 CARDS) ── */}
      <section className="landing-section testimonials-section">
        <div className="section-header-center">
          <span className="section-eyebrow">STUDENT EXPERIENCES</span>
          <h2 className="section-title">What Students Say</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars-row">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="gold-star">{s}</span>
              ))}
            </div>
            <p className="testimonial-quote">
              "ProjectPilot AI helped me find a unique project idea that got selected in our college hackathon!"
            </p>
            <div className="testimonial-author">
              <strong>Ananya S.</strong>
              <span>Computer Science student</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="gold-star">{s}</span>
              ))}
            </div>
            <p className="testimonial-quote">
              "The AI mentor is like having a senior developer by my side 24/7. It's incredible!"
            </p>
            <div className="testimonial-author">
              <strong>Viven R.</strong>
              <span>Electronics student</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="gold-star">{s}</span>
              ))}
            </div>
            <p className="testimonial-quote">
              "The project blueprint saved us weeks of planning and helped us build faster with less stress."
            </p>
            <div className="testimonial-author">
              <strong>Priya K.</strong>
              <span>Information Technology student</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FINAL GRADIENT CTA CARD ── */}
      <section className="landing-section cta-section-wrap">
        <div className="large-gradient-cta-card">
          <h2 className="cta-headline">Ready to build your future?</h2>
          <p className="cta-subheadline">
            Join thousands of students building impactful projects with AI.
          </p>
          <button
            type="button"
            className="cta-card-btn"
            onClick={user ? onGoToDashboard : onGetStarted}
          >
            <span>Get Started for Free</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── SECTION 8: MULTI-COLUMN FOOTER ── */}
      <footer id="about" className="landing-footer-unified">
        <div className="footer-unified-inner">
          <div className="footer-brand-info">
            <div className="landing-brand-wrap">
              <div className="brand-prism-icon small">
                <Sparkles size={16} color="#38BDF8" />
              </div>
              <span className="landing-brand-name">ProjectPilot AI</span>
            </div>
            <p className="footer-brief">
              AI-powered platform helping final-year students discover, plan and build impactful projects.
            </p>
            <div className="footer-social-icons">
              <span className="social-icon">𝕏</span>
              <span className="social-icon">in</span>
              <span className="social-icon">⌨</span>
              <span className="social-icon">▶</span>
            </div>
          </div>

          <div className="footer-links-columns">
            <div className="footer-column">
              <h4>Platform</h4>
              <button type="button" onClick={() => scrollToSection('features')}>Features</button>
              <button type="button" onClick={() => scrollToSection('workflow')}>Projects</button>
              <button type="button" onClick={() => scrollToSection('workflow')}>AI Mentor</button>
              <button type="button" onClick={() => scrollToSection('domains')}>Pricing</button>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <span>Blog</span>
              <span>Guides</span>
              <span>FAQs</span>
              <span>Documentation</span>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <button type="button" onClick={() => scrollToSection('about')}>About Us</button>
              <span>Careers</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>

            <div className="footer-column newsletter-col">
              <h4>Newsletter</h4>
              <p className="newsletter-text">Get the latest updates and tips for your project journey.</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  {newsletterSubscribed ? <Check size={16} color="#10B981" /> : <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom-copyright">
          <p>© {new Date().getFullYear()} ProjectPilot AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
