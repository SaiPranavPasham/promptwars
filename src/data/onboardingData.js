export const QUESTIONS = [
  {
    id: 1,
    key: 'branch',
    title: 'What is your branch or domain?',
    subtitle: 'Select your primary engineering specialization',
    badge: 'Step 1 of 6',
    type: 'single',
    options: [
      { id: 'CSE', label: 'Computer Science (CSE)', shortLabel: 'CSE', icon: 'Cpu' },
      { id: 'AI/ML', label: 'AI & Machine Learning (AI/ML)', shortLabel: 'AI/ML', icon: 'Brain' },
      { id: 'ECE', label: 'Electronics & Comm. (ECE)', shortLabel: 'ECE', icon: 'Radio' },
      { id: 'EEE', label: 'Electrical & Electronics (EEE)', shortLabel: 'EEE', icon: 'Zap' },
      { id: 'Mechanical', label: 'Mechanical Engineering', shortLabel: 'Mechanical', icon: 'Cog' },
      { id: 'Civil', label: 'Civil Engineering', shortLabel: 'Civil', icon: 'Building2' },
      { id: 'Other', label: 'Other Specialization', shortLabel: 'Other', icon: 'Sparkles' }
    ]
  },
  {
    id: 2,
    key: 'skills',
    title: 'What are your technical skills?',
    subtitle: 'Select all that apply',
    badge: 'Step 2 of 6',
    type: 'multi-custom',
    options: [
      { id: 'Python', label: 'Python', icon: 'Python' },
      { id: 'Java', label: 'Java', icon: 'Java' },
      { id: 'C++', label: 'C++', icon: 'Code2' },
      { id: 'JavaScript', label: 'JavaScript', icon: 'FileJson' },
      { id: 'React', label: 'React', icon: 'Layout' },
      { id: 'Node.js', label: 'Node.js', icon: 'Hexagon' },
      { id: 'SQL', label: 'SQL', icon: 'Database' },
      { id: 'Machine Learning', label: 'Machine Learning', icon: 'Bot' },
      { id: 'Data Analysis', label: 'Data Analysis', icon: 'BarChart3' },
      { id: 'IoT', label: 'IoT', icon: 'Wifi' },
      { id: 'Cloud', label: 'Cloud', icon: 'Cloud' },
      { id: 'Other', label: 'Other', icon: 'MoreHorizontal' }
    ]
  },
  {
    id: 3,
    key: 'interests',
    title: 'What are your project interests?',
    subtitle: 'Select domains and problem areas that excite you (Select all that apply)',
    badge: 'Step 3 of 6',
    type: 'multi-custom',
    options: [
      { id: 'AI', label: 'AI & Intelligence', icon: 'Brain' },
      { id: 'Web Development', label: 'Web Development', icon: 'Globe' },
      { id: 'App Development', label: 'App Development', icon: 'Smartphone' },
      { id: 'Data Science', label: 'Data Science', icon: 'LineChart' },
      { id: 'IoT', label: 'Internet of Things', icon: 'Cpu' },
      { id: 'Blockchain', label: 'Blockchain & Web3', icon: 'Layers' },
      { id: 'Cybersecurity', label: 'Cybersecurity', icon: 'ShieldCheck' },
      { id: 'Healthcare', label: 'Healthcare', icon: 'Activity' },
      { id: 'Education', label: 'Education', icon: 'GraduationCap' },
      { id: 'Finance', label: 'Finance & FinTech', icon: 'TrendingUp' },
      { id: 'Agriculture', label: 'Agriculture & AgriTech', icon: 'Sprout' },
      { id: 'Environment', label: 'Environment & Climate', icon: 'Leaf' },
      { id: 'Transportation', label: 'Transportation & Logistics', icon: 'Car' },
      { id: 'Social Impact', label: 'Social Impact', icon: 'Heart' },
      { id: 'Other', label: 'Other', icon: 'Sparkles' }
    ]
  },
  {
    id: 4,
    key: 'teamSize',
    title: 'What is your team size?',
    subtitle: 'Select the number of people building this project',
    badge: 'Step 4 of 6',
    type: 'single',
    options: [
      { id: '1', label: '1 (Solo)', desc: 'Individual Developer — Agile and self-directed', tag: 'Solo' },
      { id: '2', label: '2 Members', desc: 'Duo — Balanced frontend/backend or hardware/software duo', tag: 'Duo' },
      { id: '3', label: '3 Members', desc: 'Trio — Standard engineering capstone team', tag: 'Trio' },
      { id: '4', label: '4 Members', desc: 'Squad — Distributed sub-modules & full-stack roles', tag: 'Squad' },
      { id: '5+', label: '5+ Members', desc: 'Large Team — Multi-component enterprise system', tag: 'Large Team' }
    ]
  },
  {
    id: 5,
    key: 'timeAvailable',
    title: 'How much time do you have?',
    subtitle: 'Select your project submission deadline or target completion timeframe',
    badge: 'Step 5 of 6',
    type: 'single',
    options: [
      { id: 'Less than 1 month', label: 'Less than 1 month', desc: 'Fast Sprint — Rapid prototype & MVP focused', tag: 'Sprint' },
      { id: '1–2 months', label: '1–2 months', desc: 'Short Term — Modular features & functional prototype', tag: 'Short' },
      { id: '2–3 months', label: '2–3 months', desc: 'Standard Semester — Robust development & testing', tag: 'Standard' },
      { id: '3+ months', label: '3+ months', desc: 'Full Capstone — Production-grade system & research paper', tag: 'Extended' }
    ]
  },
  {
    id: 6,
    key: 'goal',
    title: 'What is your primary goal?',
    subtitle: 'Choose what you want to achieve with your final-year project',
    badge: 'Step 6 of 6',
    type: 'single',
    options: [
      { id: 'Build for learning', label: 'Build for learning', desc: 'Master new modern tech stacks and concepts', tag: 'Learning' },
      { id: 'Build for placement', label: 'Build for placement', desc: 'Impress interviewers with an industry-grade portfolio', tag: 'Placement' },
      { id: 'Build for competition', label: 'Build for competition', desc: 'Win hackathons and capstone presentation awards', tag: 'Competition' },
      { id: 'Build for startup', label: 'Build for startup', desc: 'Create a minimum viable product with commercial potential', tag: 'Startup' },
      { id: 'Solve a real-world problem', label: 'Solve a real-world problem', desc: 'Create tangible social or industrial impact', tag: 'Impact' }
    ]
  }
];

export const INITIAL_ANSWERS = {
  branch: '',
  customBranch: '',
  skills: [],
  customSkill: '',
  interests: [],
  customInterest: '',
  teamSize: '',
  timeAvailable: '',
  goal: ''
};
