import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { INITIAL_ANSWERS } from './data/onboardingData';
import LandingPage from './components/landing/LandingPage';
import AuthPage from './components/auth/AuthPage';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import StudentDashboard from './components/dashboard/StudentDashboard';
import OpportunityDashboard from './components/OpportunityDashboard';
import ProjectBlueprintDashboard from './components/blueprint/ProjectBlueprintDashboard';
import MentorChat from './components/mentor/MentorChat';

const DEMO_DEFAULT_PROJECT = {
  id: 'ai-waste-management',
  title: 'AI-Powered Waste Management System',
  selectedIndustry: 'AI & ML',
  industry: 'AI & ML',
  domain: 'AI & ML',
  domains: ['AI & ML', 'IoT', 'Computer Vision'],
  overallScore: 92,
  score: 9.2,
  difficulty: 'Medium',
  estimatedTime: '2–3 Months',
  scalePotential: 'High',
  problem: 'Inefficient municipal waste collection causes high cost and environmental pollution in smart cities.',
  solution: 'Build an AI system to predict waste generation, optimize collection routes and provide better waste management.',
  targetUsers: 'Municipal Corporations, Waste Management Companies',
  techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB']
};

function MainAppContent() {
  const { user, loading, updateUserProfile } = useAuth();
  // View states: 'landing' | 'auth' | 'onboarding' | 'dashboard' | 'projects' | 'blueprints' | 'mentor'
  const [viewMode, setViewMode] = useState('landing');
  const [authInitialMode, setAuthInitialMode] = useState('register'); // 'register' | 'login'
  const [selectedIndustry, setSelectedIndustry] = useState('AI & ML');
  const [selectedBlueprintProject, setSelectedBlueprintProject] = useState(DEMO_DEFAULT_PROJECT);
  const [currentBlueprint, setCurrentBlueprint] = useState(null);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);

  // Sync profile data whenever authenticated user changes
  useEffect(() => {
    if (user && user.profile && Object.keys(user.profile).length > 0) {
      setAnswers((prev) => ({
        ...prev,
        ...user.profile
      }));
    }
  }, [user]);

  // Avoid briefly showing signed-out content while the existing session is restored.
  if (loading) {
    return <div className="app-loading">Loading ProjectPilot AI…</div>;
  }

  // Check if student profile is already completed
  const isProfileComplete = (u) => {
    const p = u?.profile;
    return Boolean(
      p &&
      p.branch &&
      Array.isArray(p.skills) && p.skills.length > 0 &&
      Array.isArray(p.interests) && p.interests.length > 0 &&
      p.teamSize &&
      p.timeAvailable
    );
  };

  // 1. Landing Navigation
  const handleGetStartedFromLanding = () => {
    if (user) {
      if (isProfileComplete(user)) {
        setViewMode('dashboard');
      } else {
        setViewMode('onboarding');
      }
    } else {
      setAuthInitialMode('register');
      setViewMode('auth');
    }
  };

  const handleLoginFromLanding = () => {
    if (user) {
      if (isProfileComplete(user)) {
        setViewMode('dashboard');
      } else {
        setViewMode('onboarding');
      }
    } else {
      setAuthInitialMode('login');
      setViewMode('auth');
    }
  };

  // 2. Auth Flow Success Callbacks
  const handleSuccessRegister = () => {
    setViewMode('onboarding');
  };

  const handleSuccessLogin = (loggedInUser) => {
    if (isProfileComplete(loggedInUser)) {
      setViewMode('dashboard');
    } else {
      setViewMode('onboarding');
    }
  };

  // 3. Onboarding Save
  const handleSaveProfile = async (completedAnswers) => {
    setAnswers(completedAnswers);
    if (user) {
      await updateUserProfile(completedAnswers);
    }
  };

  // 4. Onboarding Complete -> Transition to Stage 2 project recommendations
  const handleFinishToStage2 = () => {
    setViewMode('projects');
  };

  // 5. Sidebar Global Navigation Handler
  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'dashboard') setViewMode('dashboard');
    else if (sectionId === 'projects') setViewMode('projects');
    else if (sectionId === 'blueprints') setViewMode('blueprints');
    else if (sectionId === 'mentor') setViewMode('mentor');
    else if (sectionId === 'team' || sectionId === 'saved' || sectionId === 'settings') {
      setViewMode('dashboard');
    }
  };

  // ── VIEW ROUTING ──

  // LANDING PAGE (Screen 1)
  if (viewMode === 'landing') {
    return (
      <LandingPage
        user={user}
        onGetStarted={handleGetStartedFromLanding}
        onLogin={handleLoginFromLanding}
        onGoToDashboard={() => {
          if (isProfileComplete(user)) {
            setViewMode('dashboard');
          } else {
            setViewMode('onboarding');
          }
        }}
      />
    );
  }

  // AUTH VIEW (Screens 2 & 3: Register / Login / Forgot)
  if (viewMode === 'auth') {
    return (
      <AuthPage
        initialMode={authInitialMode}
        onSuccessRegister={handleSuccessRegister}
        onSuccessLogin={handleSuccessLogin}
        onBackToHome={() => setViewMode('landing')}
      />
    );
  }

  // ONBOARDING VIEW (Screen 4: Question 1 of 6 ... 6 of 6 -> Profile Ready)
  if (viewMode === 'onboarding') {
    return (
      <OnboardingFlow
        initialAnswers={answers}
        user={user}
        onSaveProfile={handleSaveProfile}
        onFinishToStage2={handleFinishToStage2}
        onExitToHome={() => setViewMode('landing')}
      />
    );
  }

  // DASHBOARD (Screen 5)
  if (viewMode === 'dashboard') {
    return (
      <StudentDashboard
        studentProfile={answers}
        onNavigateSection={handleNavigateSection}
        onSelectProject={(proj) => {
          setSelectedBlueprintProject(proj);
          setViewMode('blueprints');
        }}
        onOpenMentor={(proj, bp) => {
          if (proj) setSelectedBlueprintProject(proj);
          if (bp) setCurrentBlueprint(bp);
          setViewMode('mentor');
        }}
      />
    );
  }

  // PROJECT RECOMMENDATIONS ("Projects Built For You" - Screen 6)
  if (viewMode === 'projects') {
    return (
      <OpportunityDashboard
        answers={answers}
        selectedIndustry={selectedIndustry}
        onChangeIndustry={() => setSelectedIndustry('AI & ML')}
        onEditProfile={() => setViewMode('onboarding')}
        onNavigateSection={handleNavigateSection}
        onSelectProject={(proj) => {
          setSelectedBlueprintProject(proj);
          setViewMode('blueprints');
        }}
      />
    );
  }

  // PROJECT DETAIL / BLUEPRINT (Screen 7)
  if (viewMode === 'blueprints') {
    return (
      <ProjectBlueprintDashboard
        project={selectedBlueprintProject || DEMO_DEFAULT_PROJECT}
        studentProfile={answers}
        onBack={() => setViewMode('projects')}
        onNavigateSection={handleNavigateSection}
        onOpenMentor={(proj, bp) => {
          if (proj) setSelectedBlueprintProject(proj);
          if (bp) setCurrentBlueprint(bp);
          setViewMode('mentor');
        }}
      />
    );
  }

  // AI MENTOR (Screen 8: 3-Column AI Chat)
  if (viewMode === 'mentor') {
    return (
      <MentorChat
        project={selectedBlueprintProject || DEMO_DEFAULT_PROJECT}
        studentProfile={answers}
        blueprint={currentBlueprint}
        onBack={() => setViewMode('blueprints')}
        onNavigateSection={handleNavigateSection}
      />
    );
  }

  // Fallback to Dashboard
  return (
    <StudentDashboard
      studentProfile={answers}
      onNavigateSection={handleNavigateSection}
      onSelectProject={(proj) => {
        setSelectedBlueprintProject(proj);
        setViewMode('blueprints');
      }}
      onOpenMentor={() => setViewMode('mentor')}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
