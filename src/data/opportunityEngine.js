/**
 * ProjectPilot AI - Stage 2 Industry-Specific Opportunity Engine
 *
 * CORE RULE: selectedIndustry is a HARD CONSTRAINT.
 * Projects are ONLY generated from the chosen industry.
 * No fallback to other industries. No mixing.
 */

// ============================================================
// INDUSTRY PROJECT LIBRARY
// 10 Industries × 6+ templates each
// ============================================================
const INDUSTRY_PROJECT_LIBRARY = {

  Healthcare: [
    {
      id: 'hc-1',
      title: 'MedPulse AI — ICU Vitals Anomaly Predictor',
      problem: 'ICU staff face alarm fatigue due to excessive false alerts, delaying response to genuine patient deterioration events.',
      solution: 'An AI monitoring engine analyzing multi-lead PPG/ECG signals to predict patient deterioration 4 hours before onset using lightweight LSTM models.',
      targetUsers: 'Intensive care staff, remote patient monitoring providers, cardiac care units',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Healthcare', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 19, scalability: 19, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 8, impact: 10 },
      whyRecommended: [
        'Directly solves the ICU alarm fatigue crisis affecting 72% of critical care units',
        'Leverages AI/ML skills for a high-stakes life-saving clinical challenge',
        'Modular edge MVP is buildable within your target timeframe',
        'Strong commercial potential as a SaaS middleware for medical device OEMs'
      ],
      mvpScope: ['PhysioNet ECG signal ingestion pipeline', 'Lightweight LSTM anomaly detection model', 'Real-time React dashboard with WebSocket telemetry', 'Automated triage alert notification system']
    },
    {
      id: 'hc-2',
      title: 'DermScan — Dermatology Lesion Triage Assistant',
      problem: 'Dermatology specialist wait times exceed 6 months in most countries, leaving early-stage skin conditions undetected.',
      solution: 'A CNN-based mobile triage tool that classifies skin lesion images into urgency tiers and recommends specialist referral timelines.',
      targetUsers: 'Primary care physicians, rural health clinics, telemedicine platforms',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Healthcare', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Addresses a critical dermatology access gap in primary care globally',
        'CNN image classifiers using ISIC dataset are well-documented for student projects',
        'High potential for telemedicine platform integration',
        'Explainability layer (SHAP/Grad-CAM) impresses academic reviewers'
      ],
      mvpScope: ['ISIC skin lesion dataset ingestion & augmentation', 'EfficientNet/ResNet-50 transfer learning classifier', 'Mobile-responsive upload & triage UI', 'Urgency-tier output with referral recommendation card']
    },
    {
      id: 'hc-3',
      title: 'PharmaChain — Drug Expiry & Supply Chain Tracker',
      problem: 'Hospitals waste millions annually due to poor drug expiry visibility, while critical medications stock out without early warning.',
      solution: 'A predictive inventory management system that forecasts drug expiry, consumption patterns, and auto-triggers procurement alerts.',
      targetUsers: 'Hospital pharmacists, supply chain managers, public health departments',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Healthcare', 'Python', 'SQL', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 12, studentFit: 10, feasibility: 10, impact: 9 },
      whyRecommended: [
        'Solves a universally documented hospital operational inefficiency',
        'Strong fit for SQL and data engineering skills',
        'Government health departments are active procurement targets for this category',
        'Clear measurable impact: cost savings in drug waste reporting'
      ],
      mvpScope: ['Drug inventory CSV/ERP import module', 'Expiry risk scoring algorithm', 'Predictive restock alert dashboard', 'Exportable wastage audit reports']
    },
    {
      id: 'hc-4',
      title: 'MindBridge — Mental Health Screening & Triage Platform',
      problem: 'Over 75% of people with mental health disorders receive no professional support due to stigma and access barriers.',
      solution: 'An NLP-powered conversational screening tool that conducts validated PHQ-9/GAD-7 assessments and triages to appropriate resources.',
      targetUsers: 'University counseling centers, corporate HR departments, primary care clinics',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Healthcare', 'AI/ML', 'Python', 'React', 'Node.js'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 15, innovation: 13, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Mental health tech is one of the fastest growing digital health segments',
        'NLP + clinically validated questionnaires makes the project both technical and impactful',
        'University campuses are an immediate accessible testing ground',
        'Can integrate with existing teletherapy platforms for referral pathways'
      ],
      mvpScope: ['Conversational PHQ-9/GAD-7 assessment flow', 'NLP sentiment & crisis keyword detector', 'Triage result dashboard with resource links', 'Anonymous session mode for user privacy']
    },
    {
      id: 'hc-5',
      title: 'RehabTrack — Post-Surgery Physiotherapy Compliance Monitor',
      problem: 'Post-surgical patients fail to adhere to physiotherapy programs at home, leading to poor recovery outcomes and hospital readmissions.',
      solution: 'A computer vision system using smartphone cameras to analyze exercise form correctness and track physiotherapy compliance remotely.',
      targetUsers: 'Orthopedic surgeons, physiotherapists, post-surgery recovery patients',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Healthcare', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 17, scalability: 18, futureDemand: 14, innovation: 14, studentFit: 8, feasibility: 8, impact: 9 },
      whyRecommended: [
        'Remote physiotherapy is a validated post-pandemic care delivery model',
        'MediaPipe/OpenPose pose estimation enables this without proprietary hardware',
        'Physiotherapist dashboard provides a B2B monetization path',
        'Strong differentiation from existing rehab tracking apps through AI form correction'
      ],
      mvpScope: ['MediaPipe pose estimation module for joint angle tracking', 'Exercise form correctness classifier', 'Patient compliance streak dashboard', 'Physiotherapist remote monitoring portal']
    },
    {
      id: 'hc-6',
      title: 'GlucoGuard — Continuous Glucose Pattern Intelligence for Type-2 Diabetics',
      problem: 'Type-2 diabetics lack actionable insight into how diet and activity patterns directly affect their blood glucose trajectories.',
      solution: 'A time-series AI engine that ingests CGM sensor data and correlates glucose spikes with meal logs, activity, and sleep for personalized guidance.',
      targetUsers: 'Type-2 diabetes patients, endocrinologists, chronic disease management platforms',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Healthcare', 'AI/ML', 'Python', 'IoT'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 14, innovation: 14, studentFit: 8, feasibility: 8, impact: 10 },
      whyRecommended: [
        'Diabetes management is a multi-billion dollar digital health segment',
        'CGM data streams are publicly available for model training via Tidepool/Open Humans',
        'Time-series forecasting is a highly valued ML skill for academic reviewers',
        'Personalized nutrition correlation provides clear patient-facing value'
      ],
      mvpScope: ['CGM data ingestion (synthetic + Tidepool API)', 'Glucose spike correlation engine (meals, sleep, activity)', 'Personalized pattern insights dashboard', 'Alert system for predicted high/low events']
    }
  ],

  Finance: [
    {
      id: 'fi-1',
      title: 'FinShield — Graph Neural Network Anti-Money Laundering Engine',
      problem: 'Digital fintech platforms struggle to detect synthetic identity rings laundering money across multi-layered peer transactions.',
      solution: 'A GNN-powered engine detecting suspicious circular transaction loops and synthetic identity anomalies in real-time across payment networks.',
      targetUsers: 'Fintech compliance officers, neo-banks, peer-to-peer payment networks',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Finance', 'AI/ML', 'Python', 'SQL'],
      branches: ['CSE', 'AIML'],
      baseScores: { relevance: 19, scalability: 18, futureDemand: 14, innovation: 15, studentFit: 8, feasibility: 7, impact: 9 },
      whyRecommended: [
        'AML compliance failures cost financial institutions billions in regulatory fines annually',
        'Combines high-demand fintech domain knowledge with cutting-edge Graph AI',
        'Feasible to prototype using IEEE-CIS Fraud Detection open dataset',
        'Strong portfolio asset for engineering roles in fintech and banking'
      ],
      mvpScope: ['IEEE-CIS transaction graph construction', 'Sub-graph pattern detector for circular money flows', 'Real-time transaction risk scoring API', 'Compliance investigator graph visualization dashboard']
    },
    {
      id: 'fi-2',
      title: 'CreditLens — Alternative Credit Scoring for Unbanked Populations',
      problem: 'Over 1.4 billion adults are unbanked and excluded from formal credit due to lack of traditional credit history.',
      solution: 'An ML credit scoring model using alternative data signals (mobile usage, utility payments, merchant interactions) to assess creditworthiness.',
      targetUsers: 'Microfinance institutions, fintech lenders, financial inclusion NGOs',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Finance', 'AI/ML', 'Python', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 19, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Financial inclusion is a top priority for government and NGO funding globally',
        'Alternative credit scoring is a documented, well-studied ML research area',
        'High social impact component strengthens capstone viva defense narrative',
        'Fits perfectly for a team with Python and data science skills'
      ],
      mvpScope: ['Synthetic alternative credit dataset generator', 'XGBoost/LightGBM credit risk classifier', 'Loan officer decision support dashboard', 'Fairness bias audit report (demographic parity analysis)']
    },
    {
      id: 'fi-3',
      title: 'PortfolioPilot — AI-Powered Retail Investor Rebalancing Engine',
      problem: 'Retail investors consistently underperform due to emotional decision-making and lack of systematic, data-driven portfolio rebalancing.',
      solution: 'An ML portfolio management assistant that monitors asset allocation drift, simulates rebalancing scenarios, and suggests optimized trades.',
      targetUsers: 'Retail stock investors, personal finance app users, discount brokerages',
      trend: 'Stable',
      scalePotential: 'Global',
      domains: ['Finance', 'Python', 'AI/ML', 'React', 'JavaScript'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 18, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Robo-advisory and algorithmic portfolio tools have clear consumer demand',
        'Yahoo Finance API provides free real market data for backtesting',
        'Monte Carlo simulation component demonstrates strong quantitative skills',
        'Accessible to students with JavaScript + Python for a full-stack build'
      ],
      mvpScope: ['Yahoo Finance portfolio data ingestion', 'Asset drift detection and risk exposure calculator', 'Rebalancing scenario simulator (Monte Carlo)', 'Interactive allocation chart dashboard']
    },
    {
      id: 'fi-4',
      title: 'InsureIQ — Claims Fraud Pattern Detector for Insurance Companies',
      problem: 'Insurance fraud costs the industry over $40 billion annually in the US alone, with traditional rule-based detection missing sophisticated schemes.',
      solution: 'An ML anomaly detection pipeline flagging suspicious claim patterns using clustering, network analysis, and behavioral anomaly scoring.',
      targetUsers: 'Insurance claims adjusters, fraud investigation units, insurtech platforms',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Finance', 'AI/ML', 'Python', 'SQL'],
      branches: ['CSE', 'AIML'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 9, feasibility: 8, impact: 9 },
      whyRecommended: [
        'Insurance fraud detection is a well-funded priority for every major insurer',
        'Kaggle Insurance Fraud Detection dataset provides strong starting point',
        'Anomaly detection + network graph analysis demonstrates multi-technique ML mastery',
        'Clear ROI story for commercial adoption: every caught fraud case pays for the system'
      ],
      mvpScope: ['Insurance claims dataset ingestion and feature engineering', 'Isolation Forest + DBSCAN anomaly clustering', 'Suspicious claim scoring and flagging API', 'Fraud investigation analyst dashboard']
    },
    {
      id: 'fi-5',
      title: 'ExpenseAI — Smart SME Cash Flow Forecaster',
      problem: 'Over 60% of small business failures are caused by cash flow mismanagement and inability to forecast upcoming financial shortfalls.',
      solution: 'A time-series AI engine analyzing bank transaction history to forecast 90-day cash flow and identify dangerous spending patterns.',
      targetUsers: 'Small business owners, freelancers, SME accounting software platforms',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Finance', 'AI/ML', 'Python', 'React', 'Node.js'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 12, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'SME financial health tools are a $10B+ market with strong SMB adoption',
        'Time-series forecasting (Prophet/ARIMA/LSTM) is a teachable, buildable ML task',
        'Open Banking APIs (Plaid/Yodlee) provide real transaction data for integration',
        'Immediate real-world testability with personal or business bank data'
      ],
      mvpScope: ['Bank transaction CSV ingestion and categorization', 'Prophet/ARIMA 90-day cash flow forecast model', 'Cash flow risk alert system', 'Interactive financial health dashboard']
    },
    {
      id: 'fi-6',
      title: 'TaxMind — Automated Tax Liability Optimizer for Salaried Employees',
      problem: 'Most salaried employees overpay taxes due to unawareness of eligible deductions and lack of year-round tax planning tools.',
      solution: 'An intelligent tax calculation engine that ingests salary slips, recommends eligible deductions, and simulates tax saving strategies.',
      targetUsers: 'Salaried employees, HR departments, CA firms, personal finance platforms',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Finance', 'Python', 'React', 'Node.js', 'SQL'],
      branches: ['CSE', 'Other'],
      baseScores: { relevance: 17, scalability: 16, futureDemand: 12, innovation: 12, studentFit: 10, feasibility: 10, impact: 8 },
      whyRecommended: [
        'Tax filing season creates massive demand for accessible optimization tools',
        'Rule-based + ML hybrid approach is buildable without complex infrastructure',
        'Every salaried person is a potential user — inherent wide market reach',
        'Government tax rule APIs (e.g. India IT portal, IRS API) provide source-of-truth data'
      ],
      mvpScope: ['Salary slip OCR parser', 'Deduction eligibility recommender engine', 'Tax liability simulator with regime comparison', 'Year-round planning calendar dashboard']
    }
  ],

  Agriculture: [
    {
      id: 'ag-1',
      title: 'AgriSense — Multispectral Crop Micro-Climate & Disease Intelligence',
      problem: 'Smallholder farmers lack affordable tools to detect early localized crop pestilence and soil moisture imbalance before yield losses occur.',
      solution: 'An affordable IoT solar node network paired with drone computer vision for hyper-local crop health diagnostics and irrigation alerts.',
      targetUsers: 'Agronomists, farming cooperatives, precision agriculture enterprise providers',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Agriculture', 'IoT', 'AI/ML', 'Python'],
      branches: ['ECE', 'EEE', 'AIML', 'Mechanical', 'CSE'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Directly addresses food security and climate-resilient agricultural sustainability',
        'Ideal balance of hardware sensors (IoT) and software intelligence (AI/ML)',
        'High potential for government research grants, incubators, and agtech awards',
        'Clear path to scale across regional farming zones'
      ],
      mvpScope: ['ESP32 sensor telemetry nodes (soil moisture, temp, humidity)', 'YOLOv8 leaf pest & blight image classifier', 'Mobile-first offline PWA dashboard for field farmers', 'Automated drip irrigation trigger controller API']
    },
    {
      id: 'ag-2',
      title: 'YieldCast — AI Crop Yield Prediction & Market Timing Advisor',
      problem: 'Farmers make planting and selling decisions without reliable yield forecasts, often resulting in oversupply crashes or missed peak price windows.',
      solution: 'A machine learning yield prediction model integrating satellite NDVI, weather API data, and historical harvest records for pre-season forecasting.',
      targetUsers: 'Commercial farmers, agri-commodity traders, state agricultural departments',
      trend: 'Growing',
      scalePotential: 'Regional',
      domains: ['Agriculture', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Satellite NDVI data from NASA/ESA is freely accessible for model training',
        'Crop yield prediction is an established ML research area with solid benchmarks',
        'Market timing intelligence component adds direct financial value for farmers',
        'State agriculture departments are active buyers of decision support systems'
      ],
      mvpScope: ['Sentinel-2 NDVI satellite data ingestion pipeline', 'Random Forest/LSTM yield prediction model', 'Weather API integration for real-time forecast inputs', 'Farmer-facing market timing recommendation dashboard']
    },
    {
      id: 'ag-3',
      title: 'SoilIQ — Precision Soil Health Diagnostic & Fertilizer Optimizer',
      problem: 'Farmers over-apply fertilizers due to generic recommendations, causing soil degradation, groundwater contamination, and unnecessary costs.',
      solution: 'An AI engine analyzing soil test reports and crop variety requirements to generate precise, field-specific NPK fertilizer application plans.',
      targetUsers: 'Individual farmers, agrochemical retailers, agricultural extension officers',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Agriculture', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Civil', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 12, studentFit: 10, feasibility: 10, impact: 10 },
      whyRecommended: [
        'Soil health degradation is a globally documented agricultural crisis',
        'ICAR and FAO publish open soil fertility datasets suitable for model training',
        'Fertilizer cost optimization provides immediate measurable ROI for farmers',
        'Extension officer web portal creates a B2B government distribution channel'
      ],
      mvpScope: ['Soil test report OCR parser', 'NPK requirement prediction model per crop variety', 'Fertilizer cost optimizer with brand recommendations', 'Extension officer management dashboard']
    },
    {
      id: 'ag-4',
      title: 'FarmCredit — Agricultural Loan Risk Scorer for Rural Microfinance',
      problem: 'Rural farmers are denied microloans due to lack of formal credit history, despite demonstrating consistent cropping cycles and land ownership.',
      solution: 'A credit risk scoring platform using satellite crop health data, weather patterns, and historical harvest records as alternative creditworthiness signals.',
      targetUsers: 'Rural cooperative banks, microfinance institutions, agri-insurance companies',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Agriculture', 'Finance', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 14, studentFit: 9, feasibility: 8, impact: 10 },
      whyRecommended: [
        'Agricultural financial inclusion is a priority for NABARD and rural development banks',
        'Cross-domain project combining agri-tech and fintech impresses academic panels',
        'Satellite-based alternative credit signals are novel and research-ready',
        'High social impact narrative for grant applications and viva defense'
      ],
      mvpScope: ['Satellite NDVI-based farm health scoring module', 'Alternative credit risk model (cropping consistency + weather resilience)', 'Loan officer decision support dashboard', 'Farmer eligibility self-assessment portal']
    },
    {
      id: 'ag-5',
      title: 'ColdChain AI — Perishable Produce Quality Predictor for Post-Harvest Logistics',
      problem: 'India wastes 30-40% of perishable agricultural produce annually due to poor cold chain management and delayed spoilage detection.',
      solution: 'An IoT cold storage monitoring system predicting produce quality degradation based on temperature fluctuation patterns and batch entry timestamps.',
      targetUsers: 'Cold storage operators, food logistics companies, wholesale produce markets',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Agriculture', 'IoT', 'AI/ML', 'Python'],
      branches: ['ECE', 'EEE', 'Mechanical', 'CSE'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Post-harvest losses are a documented national food security challenge',
        'Temperature + humidity time-series data is easily synthetic-generatable for MVP',
        'IoT + AI combination showcases multi-discipline engineering mastery',
        'Clear commercial buyer segment: warehouse operators and logistics companies'
      ],
      mvpScope: ['DHT22/ESP32 temperature-humidity telemetry pipeline', 'Produce spoilage probability predictor (time-series LSTM)', 'Cold chain breach alert system', 'Warehouse operator monitoring dashboard']
    },
    {
      id: 'ag-6',
      title: 'WaterWise — Smart Irrigation Scheduling Optimizer for Water-Scarce Regions',
      problem: 'Flood irrigation methods waste up to 40% of agricultural water in arid regions where groundwater depletion is already critical.',
      solution: 'An AI irrigation scheduler combining soil moisture sensor data, evapotranspiration calculations, and weather forecasts to optimize drip irrigation timing.',
      targetUsers: 'Farmers in water-scarce regions, irrigation cooperatives, state water boards',
      trend: 'Growing',
      scalePotential: 'Regional',
      domains: ['Agriculture', 'IoT', 'AI/ML', 'Python'],
      branches: ['ECE', 'EEE', 'Civil', 'Mechanical', 'CSE'],
      baseScores: { relevance: 18, scalability: 16, futureDemand: 14, innovation: 12, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Water scarcity in agriculture is a crisis affecting 2 billion people globally',
        'ET-based irrigation scheduling is scientifically validated and implementable',
        'Government water conservation mandates create procurement demand',
        'Sensor network MVP is buildable with ESP32 + soil moisture probes under budget'
      ],
      mvpScope: ['Soil moisture + weather API data ingestion', 'Penman-Monteith ET calculator', 'AI irrigation schedule optimizer', 'Farmer SMS + app irrigation command dispatcher']
    }
  ],

  Education: [
    {
      id: 'ed-1',
      title: 'MindTrack AI — Adaptive Skill Gap Graph & Real-Time Tutor Engine',
      problem: 'Higher education students drop out or lag behind because curriculum pacing does not adapt to individual concept mastery levels.',
      solution: 'A Knowledge Graph engine mapping student coding/math submission patterns to diagnose exact prerequisite misconceptions in real-time.',
      targetUsers: 'University professors, online coding bootcamps, self-paced STEM learners',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Education', 'Campus', 'React', 'JavaScript', 'Python'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 19, futureDemand: 14, innovation: 14, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Directly applicable on college campuses with immediate peer-testing feedback',
        'Uses graph data structures and lightweight LLM tutoring prompts',
        'Highly scalable SaaS model for universities and online learning platforms',
        'High student-project fit given skills and timeline'
      ],
      mvpScope: ['Prerequisite Knowledge Graph visual node editor', 'Automated code/quiz diagnostic evaluator', 'AI hint engine (guides reasoning without giving answers)', 'Teacher analytics dashboard tracking cohort concept velocity']
    },
    {
      id: 'ed-2',
      title: 'LectureLens — Automated Lecture Summarizer & Exam Prep Generator',
      problem: 'Students spend excessive time reviewing lengthy lecture recordings, while professors have no tools to assess concept comprehension from lectures.',
      solution: 'An NLP pipeline that transcribes lecture recordings, generates structured summaries, flashcards, and auto-generates practice MCQs mapped to syllabus topics.',
      targetUsers: 'University students, professors, online education platforms',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Education', 'AI/ML', 'Python', 'React', 'JavaScript'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 14, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Immediately useful for every student in your own university — easy user testing',
        'Whisper ASR + GPT-style summarization pipeline is well-documented and buildable',
        'LMS integration path (Moodle/Canvas APIs) provides scalable deployment channel',
        'Flashcard + MCQ generation differentiates from basic transcription tools'
      ],
      mvpScope: ['Whisper ASR lecture audio transcription', 'NLP topic segmentation and structured summarizer', 'Auto-MCQ generator from transcript content', 'Student study dashboard with spaced repetition scheduler']
    },
    {
      id: 'ed-3',
      title: 'PeerGrade AI — Automated Peer Review Quality Validator for Assignments',
      problem: 'Peer review in large university courses is inconsistently executed, with students either being too lenient or too harsh without structured guidance.',
      solution: 'An NLP system that evaluates peer review quality, detects bias or plagiarism in feedback, and scores review accuracy against rubric criteria.',
      targetUsers: 'University professors, LMS administrators, MOOC platforms',
      trend: 'Stable',
      scalePotential: 'Global',
      domains: ['Education', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 12, innovation: 14, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Peer assessment quality is an unresolved challenge at every large university',
        'NLP sentiment and rubric-alignment scoring is a well-studied research area',
        'LMS plugin architecture enables seamless Moodle/Canvas deployment',
        'Novel framing: not replacing human grading, but improving peer feedback quality'
      ],
      mvpScope: ['Assignment submission + rubric ingestion system', 'NLP peer feedback quality scorer', 'Bias and plagiarism detector in written feedback', 'Professor peer review analytics dashboard']
    },
    {
      id: 'ed-4',
      title: 'LearnPath — AI Personalized Study Roadmap Generator for Competitive Exams',
      problem: 'Students preparing for competitive exams (GATE, JEE, UPSC) study inefficiently, revisiting strong topics while neglecting genuine weak areas.',
      solution: 'A diagnostic assessment platform that identifies weak concepts, builds a personalized time-boxed study roadmap, and tracks mastery progression.',
      targetUsers: 'Engineering exam aspirants, coaching institutes, EdTech preparation platforms',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Education', 'AI/ML', 'Python', 'React', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 12, studentFit: 10, feasibility: 10, impact: 8 },
      whyRecommended: [
        'Millions of engineering exam aspirants represent an enormous addressable market',
        'Item Response Theory (IRT) diagnostic scoring is well-researched and implementable',
        'Coaching institutes are proven paying customers for structured study tools',
        'Immediate self-use case: you are your own first user and tester'
      ],
      mvpScope: ['Topic-mapped diagnostic test bank', 'IRT-based weakness identification algorithm', 'Personalized time-boxed study roadmap generator', 'Mastery progression tracker with predicted exam readiness score']
    },
    {
      id: 'ed-5',
      title: 'ParentConnect — Real-Time Student Behavior & Learning Outcome Reporter',
      problem: 'Parents of K-12 students receive only termly report cards with no visibility into day-to-day engagement, behavior, or concept difficulty.',
      solution: 'A school management integration that delivers weekly AI-generated parent summaries of attendance, assignment completion, and teacher feedback highlights.',
      targetUsers: 'K-12 schools, school administrators, parents',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Education', 'AI/ML', 'React', 'Node.js', 'SQL'],
      branches: ['CSE', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 12, innovation: 12, studentFit: 10, feasibility: 10, impact: 8 },
      whyRecommended: [
        'School management SaaS is an established and funded EdTech vertical',
        'NLP summary generation from structured data is highly implementable',
        'Parent engagement is a documented lever for improving student outcomes',
        'Clear B2B school subscription revenue model'
      ],
      mvpScope: ['School ERP data integration API', 'AI weekly parent summary generator', 'Parent mobile notification dashboard', 'Teacher behavior and assignment feedback portal']
    }
  ],

  Environment: [
    {
      id: 'ev-1',
      title: 'EcoGrid — Microgrid Solar Load Balancer & Battery Storage AI',
      problem: 'Commercial buildings with rooftop solar waste up to 35% of generated power due to uncoordinated battery storage charging cycles.',
      solution: 'An intelligent edge micro-controller system predicting solar irradiance and dynamic building consumption to optimize battery dispatch.',
      targetUsers: 'Commercial facility managers, green building operators, microgrid installers',
      trend: 'Growing',
      scalePotential: 'Regional',
      domains: ['Environment', 'EEE', 'IoT', 'AI/ML', 'Python'],
      branches: ['EEE', 'Mechanical', 'Civil', 'ECE', 'CSE'],
      baseScores: { relevance: 19, scalability: 17, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 8, impact: 10 },
      whyRecommended: [
        'Aligns with global clean energy transition goals and smart city initiatives',
        'Excellent interdisciplinary project combining power electronics and control software',
        'Clear financial ROI story for commercial building adopters',
        'Proven testbed feasibility using building energy simulation models (EnergyPlus)'
      ],
      mvpScope: ['Solar + battery load simulation model (EnergyPlus/PVLib)', 'Solar irradiance forecast model', 'Automated relay switching control logic', 'Energy cost savings & carbon offset tracking dashboard']
    },
    {
      id: 'ev-2',
      title: 'AirWatch — Hyperlocal Air Quality Intelligence & Health Alert Platform',
      problem: 'Official air quality monitoring stations are sparsely distributed, leaving millions of urban residents with no visibility into neighborhood-level pollution.',
      solution: 'A low-cost IoT sensor mesh providing hyperlocal PM2.5, CO, and VOC readings with ML-powered health impact alerts and daily exposure reports.',
      targetUsers: 'Urban residents, municipal public health departments, asthma/allergy patients',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Environment', 'IoT', 'AI/ML', 'React'],
      branches: ['ECE', 'EEE', 'CSE', 'Civil'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Air quality data gaps are well-documented in every major developing-world city',
        'MQ-135/PMS5003 sensors are inexpensive and well-supported by Arduino/ESP32',
        'AQICN open API provides calibration reference data for sensor normalization',
        'Municipal government procurement is a viable commercial adoption path'
      ],
      mvpScope: ['ESP32 + PM2.5/CO sensor telemetry node network', 'AQI computation and pollution spike detector', 'Hyperlocal air quality heatmap dashboard', 'Personal health impact alert notification system']
    },
    {
      id: 'ev-3',
      title: 'WasteSort AI — Computer Vision Waste Classification & Recycling Route Optimizer',
      problem: 'Contamination of recyclable waste streams is primarily caused by citizens misclassifying waste at source, costing municipalities millions in processing.',
      solution: 'A real-time computer vision classifier deployed on smart bins that identifies waste type and guides users to the correct disposal compartment.',
      targetUsers: 'Municipal waste management authorities, smart city operators, residential complexes',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Environment', 'AI/ML', 'React', 'Python'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 14, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'TACO waste dataset provides training data for real-time waste classification',
        'Raspberry Pi + camera module deployment makes hardware MVP affordable',
        'Smart city initiatives worldwide are actively funding waste management innovation',
        'High visual impact project that photographs well for presentations and demos'
      ],
      mvpScope: ['TACO dataset waste classification CNN (MobileNetV3)', 'Real-time camera inference module on Raspberry Pi', 'Smart bin UI with disposal guidance overlay', 'Recycling route optimization map for collection trucks']
    },
    {
      id: 'ev-4',
      title: 'CarbonLedger — SME Carbon Footprint Tracker & Scope 3 Reporter',
      problem: 'SMEs face growing ESG compliance pressure but lack affordable tools to measure, report, and reduce their Scope 1/2/3 carbon emissions accurately.',
      solution: 'An automated carbon accounting platform that ingests expense data, energy bills, and supplier invoices to compute emissions and generate ESG reports.',
      targetUsers: 'Small and medium enterprises, ESG consultants, sustainability officers',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Environment', 'Python', 'React', 'SQL', 'Node.js'],
      branches: ['CSE', 'Other'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 15, innovation: 13, studentFit: 10, feasibility: 9, impact: 9 },
      whyRecommended: [
        'ESG reporting mandates are being introduced globally for SMEs from 2025',
        'GHG Protocol emission factors are open-access and sufficient for MVP accuracy',
        'Clear SaaS subscription monetization with per-user or per-report pricing',
        'Strong timing: building this now positions the project ahead of regulatory demand'
      ],
      mvpScope: ['Expense and utility bill data ingestion pipeline', 'GHG Protocol-aligned emission calculator', 'Scope 1/2/3 breakdown dashboard with reduction suggestions', 'Exportable ESG compliance report generator']
    },
    {
      id: 'ev-5',
      title: 'FloodRisk — Urban Flash Flood Early Warning Intelligence System',
      problem: 'Urban local bodies lack real-time drainage capacity monitoring and flood early warning systems, resulting in repeated preventable flood casualties.',
      solution: 'A sensor network monitoring stormwater drainage levels combined with rainfall forecast integration to issue tiered flood risk alerts 2 hours ahead.',
      targetUsers: 'Municipal drainage departments, city emergency management, citizens in flood-prone zones',
      trend: 'Growing',
      scalePotential: 'Regional',
      domains: ['Environment', 'IoT', 'AI/ML', 'Python', 'React'],
      branches: ['Civil', 'ECE', 'CSE', 'EEE'],
      baseScores: { relevance: 18, scalability: 16, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 8, impact: 10 },
      whyRecommended: [
        'Urban flash flooding causes documented annual casualties and property losses',
        'IMD / OpenWeatherMap rainfall API provides forecast data for alert triggering',
        'Ultrasonic water level sensors (HC-SR04) cost under $5 per node',
        'Civil engineering + computer science collaboration makes this unique for panel evaluation'
      ],
      mvpScope: ['HC-SR04 ultrasonic water level sensor network', 'OpenWeatherMap rainfall forecast integration', 'LSTM flood surge predictor model', 'Tiered flood alert notification system with map visualization']
    }
  ],

  Transportation: [
    {
      id: 'tr-1',
      title: 'FleetVision — Driver Fatigue & Predictive Maintenance Edge Node',
      problem: 'Commercial trucking fleets face high accident rates and unpredicted vehicle breakdowns due to delayed telemetry analytics.',
      solution: 'An all-in-one OBD-II port telemetry reader combined with cabin computer vision driver attentiveness monitoring on edge hardware.',
      targetUsers: 'Logistics fleet managers, long-haul trucking companies, insurance underwriters',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Transportation', 'AI/ML', 'IoT', 'Python'],
      branches: ['Mechanical', 'ECE', 'CSE', 'AIML'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 13, innovation: 13, studentFit: 9, feasibility: 8, impact: 9 },
      whyRecommended: [
        'Solves dual challenges: vehicle hardware health + driver safety simultaneously',
        'Strong relevance for logistics, automotive, and fleet management sectors',
        'Edge deployment ensures real-time offline alerts without constant cellular data',
        'Scalable subscription model per vehicle in fleet'
      ],
      mvpScope: ['Raspberry Pi / Jetson Nano edge camera driver drowsiness detection', 'OBD-II CAN bus telemetry data logger simulator', 'Fleet manager centralized map dashboard with risk alerts', 'Automated maintenance alert schedule recommendation engine']
    },
    {
      id: 'tr-2',
      title: 'SmartPark — AI Parking Space Predictor & Dynamic Pricing Engine',
      problem: 'Urban drivers waste an average of 17 minutes per trip searching for parking, contributing to traffic congestion and fuel waste.',
      solution: 'A computer vision system using CCTV feeds to detect real-time parking occupancy and an ML model predicting availability 30 minutes ahead.',
      targetUsers: 'Municipal parking authorities, shopping mall operators, parking aggregator apps',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Transportation', 'AI/ML', 'React', 'Python'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 9, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Urban parking is a $100B+ global industry with poor technology penetration',
        'YOLOv8 overhead camera vehicle detection is well-documented and achievable',
        'Dynamic pricing engine demonstrates operations research + ML integration',
        'Municipal smart city programs are active buyers of parking management systems'
      ],
      mvpScope: ['CCTV feed parking occupancy detector (YOLOv8)', 'Time-series availability predictor model', 'Dynamic pricing engine based on demand forecasting', 'Driver-facing real-time availability map app']
    },
    {
      id: 'tr-3',
      title: 'RouteIQ — Last-Mile Delivery Route Optimizer for Urban E-Commerce',
      problem: 'Last-mile delivery costs account for 41-53% of total logistics spend, with inefficient routing causing late deliveries and fuel waste.',
      solution: 'A hybrid VRP (Vehicle Routing Problem) solver combining heuristic algorithms with ML demand forecasting to optimize multi-stop delivery routes.',
      targetUsers: 'E-commerce logistics companies, food delivery platforms, courier aggregators',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Transportation', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Last-mile delivery efficiency is a top operational priority for every logistics company',
        'OR-Tools (Google) and OSRM provide open-source routing solver infrastructure',
        'Demand forecasting + route optimization is an advanced ML+OR combined capability',
        'Direct commercial path to logistics startup or e-commerce company partnership'
      ],
      mvpScope: ['Delivery order data ingestion with OSRM route computation', 'OR-Tools VRP solver with time-window constraints', 'Real-time driver dispatch mobile interface', 'Fleet manager route efficiency analytics dashboard']
    },
    {
      id: 'tr-4',
      title: 'TransitPulse — Public Bus Network Delay Predictor & Passenger Advisor',
      problem: 'Commuters on public bus networks have no reliable delay prediction, causing frustration, missed connections, and over-reliance on private vehicles.',
      solution: 'A GTFS-RT data aggregator with ML delay prediction models providing real-time ETA corrections and alternative route suggestions to commuters.',
      targetUsers: 'Municipal bus corporations, commuters, mobility-as-a-service platforms',
      trend: 'Stable',
      scalePotential: 'Regional',
      domains: ['Transportation', 'AI/ML', 'Python', 'React', 'Node.js'],
      branches: ['CSE', 'AIML', 'Civil'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 12, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'GTFS-RT open transit data is freely available for hundreds of cities globally',
        'Random Forest delay prediction on historical GTFS data is well-benchmarked',
        'Strong direct user impact: every bus commuter is a potential user',
        'Civil engineering + software integration makes this interdisciplinary and notable'
      ],
      mvpScope: ['GTFS-RT feed ingestion and parsing pipeline', 'Random Forest/XGBoost delay prediction model', 'Real-time commuter ETA alert app', 'Alternative route suggestion engine']
    },
    {
      id: 'tr-5',
      title: 'PotholeScan — Crowdsourced Road Defect Detection & Priority Repair Planner',
      problem: 'Municipal road maintenance departments lack systematic data on pothole locations, severity, and repair urgency across their networks.',
      solution: 'A smartphone app using accelerometer data and camera computer vision to automatically detect and geo-tag road surface defects during normal driving.',
      targetUsers: 'Municipal road maintenance departments, smart city platforms, highway authorities',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Transportation', 'AI/ML', 'React', 'Python'],
      branches: ['CSE', 'AIML', 'Civil', 'ECE'],
      baseScores: { relevance: 17, scalability: 16, futureDemand: 12, innovation: 13, studentFit: 10, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Road defect data collection is a solved problem in several smart city pilots',
        'Accelerometer-based pothole detection is feasible on any smartphone without additional hardware',
        'Priority repair scoring system provides immediate municipal operational value',
        'Citizen science + government use case creates a compelling viva narrative'
      ],
      mvpScope: ['Smartphone accelerometer pothole vibration classifier', 'Camera CV road surface crack detector', 'Geo-tagged defect map with severity scoring', 'Municipal repair priority planner dashboard']
    }
  ],

  Cybersecurity: [
    {
      id: 'cy-1',
      title: 'ZeroTrust Mesh — Automated Microsegmentation for Cloud Containers',
      problem: 'Microservice clusters in Kubernetes suffer from lateral threat movement when a single container is compromised.',
      solution: 'An automated eBPF-powered network security mesh that dynamically generates zero-trust microsegmentation policies based on live traffic analysis.',
      targetUsers: 'DevOps engineers, cloud security analysts, SaaS mid-market enterprise teams',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Cybersecurity', 'Cloud', 'Python', 'Node.js'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 20, scalability: 19, futureDemand: 14, innovation: 14, studentFit: 8, feasibility: 7, impact: 9 },
      whyRecommended: [
        'Zero-Trust architecture is the highest priority budget item for cloud security teams',
        'Provides a distinctive infrastructure-level capstone that stands out to recruiters',
        'High scalability across Docker, Kubernetes, and serverless environments',
        'Solves critical lateral movement vulnerabilities in modern cloud deployments'
      ],
      mvpScope: ['eBPF kernel probe traffic inspector container', 'Dynamic policy generator using network graph analysis', 'Visual topology traffic dashboard showing active vs blocked paths', 'CLI tool for automated policy deployment into Kubernetes']
    },
    {
      id: 'cy-2',
      title: 'PhishGuard — Real-Time Phishing URL & Email Intent Classifier',
      problem: 'Phishing attacks account for 36% of all data breaches, with attackers constantly evolving techniques that bypass static blocklist-based filters.',
      solution: 'An ML-powered real-time classifier analyzing URL lexical features, domain age, and email content patterns to detect phishing with sub-100ms latency.',
      targetUsers: 'Enterprise security teams, email service providers, browser extension users',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Cybersecurity', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML'],
      baseScores: { relevance: 19, scalability: 18, futureDemand: 14, innovation: 13, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Phishing datasets (PhishTank, OpenPhish) are freely accessible for model training',
        'NLP + URL lexical feature engineering demonstrates multi-technique ML mastery',
        'Browser extension deployment provides a direct consumer-facing distribution path',
        'High relevance for SOC analyst and ML engineering roles'
      ],
      mvpScope: ['PhishTank URL dataset ingestion and feature extractor', 'Random Forest + NLP email body phishing classifier', 'Real-time classification API (sub-100ms)', 'Browser extension + SOC analyst dashboard']
    },
    {
      id: 'cy-3',
      title: 'LogSentry — AI-Powered SIEM Anomaly Correlation Engine',
      problem: 'Security Operations Centers drown in millions of daily log events, with 76% of analysts reporting they cannot investigate all critical alerts.',
      solution: 'An ML log correlation engine that clusters related security events, prioritizes genuine threats, and auto-generates incident investigation summaries.',
      targetUsers: 'SOC analysts, MSSP teams, enterprise IT security departments',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Cybersecurity', 'AI/ML', 'Python', 'SQL'],
      branches: ['CSE', 'AIML'],
      baseScores: { relevance: 19, scalability: 18, futureDemand: 14, innovation: 14, studentFit: 8, feasibility: 8, impact: 9 },
      whyRecommended: [
        'SOC alert fatigue is the most frequently cited problem in enterprise security surveys',
        'MITRE ATT&CK framework provides structured attack pattern taxonomy for ML labeling',
        'Anomaly clustering + NLP summary generation showcases advanced ML capabilities',
        'High-value commercial segment: enterprise SIEM market is worth $4B+'
      ],
      mvpScope: ['Synthetic SIEM log event generator (Apache, Windows, firewall formats)', 'Isolation Forest anomaly detector + DBSCAN event clustering', 'Attack chain correlation engine (MITRE ATT&CK mapping)', 'SOC incident priority queue dashboard with auto-generated summaries']
    },
    {
      id: 'cy-4',
      title: 'VaultScan — Static Code Vulnerability Scanner with Remediation Advisor',
      problem: 'Developers introduce security vulnerabilities during coding due to lack of real-time security feedback in their development workflow.',
      solution: 'A static code analysis tool that detects OWASP Top 10 vulnerability patterns using AST analysis and provides AI-generated remediation code snippets.',
      targetUsers: 'Software developers, DevSecOps teams, application security engineers',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Cybersecurity', 'Python', 'JavaScript', 'React'],
      branches: ['CSE', 'AIML'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 9, impact: 9 },
      whyRecommended: [
        'DevSecOps is among the fastest growing practices in software engineering teams',
        'Python AST + regex pattern matching for OWASP Top 10 is buildable in a semester',
        'VS Code extension distribution provides immediate developer adoption channel',
        'AI remediation suggestion layer differentiates from existing Semgrep-style tools'
      ],
      mvpScope: ['Python/JavaScript AST parser with OWASP Top 10 pattern library', 'Vulnerability severity scorer and CWE mapper', 'AI remediation code snippet generator', 'VS Code extension + web dashboard for CI/CD integration']
    },
    {
      id: 'cy-5',
      title: 'DNSGuard — Malicious DNS Tunneling & DGA Domain Detector',
      problem: 'Malware increasingly uses DNS tunneling and Domain Generation Algorithms (DGA) to exfiltrate data and communicate with C2 servers evading firewalls.',
      solution: 'An ML classifier analyzing DNS query entropy, query frequency, subdomain length distributions, and NXDomain rates to detect malicious DNS activity.',
      targetUsers: 'Enterprise network security teams, ISPs, managed security service providers',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Cybersecurity', 'AI/ML', 'Python', 'Node.js'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 14, studentFit: 8, feasibility: 8, impact: 9 },
      whyRecommended: [
        'DNS-based attacks are growing as firewalls block traditional C2 communication channels',
        'Publicly available DGA domain datasets (Bambenek Consulting) enable direct model training',
        'Entropy analysis + frequency domain features are teachable ML feature engineering techniques',
        'Network security specialization is among the highest-paying career tracks in cybersecurity'
      ],
      mvpScope: ['DNS query log dataset ingestion and feature extraction', 'DGA detection classifier (entropy + n-gram features)', 'DNS tunneling anomaly detector (query size and rate analysis)', 'Network security analyst alert dashboard']
    }
  ],

  'Social Impact': [
    {
      id: 'si-1',
      title: 'SafeStreet — Women Safety Real-Time Alert & Route Intelligence System',
      problem: 'Women face significant safety risks navigating urban environments at night, with no proactive system to identify unsafe route segments or trigger rapid alerts.',
      solution: 'A mobile application using crime heatmap overlays, crowd-sourced safety ratings, and auto-SOS triggering with live location sharing for trusted contacts.',
      targetUsers: 'Women commuters, college students, campus safety administrators',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Social Impact', 'React', 'Node.js', 'Python'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Women safety technology is a high-priority social impact domain with strong NGO and government backing',
        'Crime data APIs (NCRB, police.uk open data) enable real location intelligence',
        'Shake-to-SOS + geo-fencing alert system is buildable with standard React Native APIs',
        'Strong narrative for academic defense: directly measurable societal benefit'
      ],
      mvpScope: ['Crime heatmap data integration and route safety scorer', 'Shake-to-SOS auto-alert with live GPS location sharing', 'Community-sourced unsafe zone report system', 'Safe route navigation overlay on maps']
    },
    {
      id: 'si-2',
      title: 'AccessAble — AI Accessibility Auditor for Public Digital Platforms',
      problem: 'Over 1 billion people with disabilities are excluded from digital services because most websites and apps fail basic WCAG accessibility standards.',
      solution: 'An automated accessibility auditing platform that scans web applications, generates WCAG 2.2 compliance reports, and provides AI-generated fix code snippets.',
      targetUsers: 'Government digital services, e-commerce platforms, accessibility consultants',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Social Impact', 'React', 'JavaScript', 'Python', 'Node.js'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 13, studentFit: 10, feasibility: 9, impact: 10 },
      whyRecommended: [
        'EU Accessibility Act mandates compliance for all public digital services from 2025',
        'Axe-core open library provides the accessibility rule engine infrastructure',
        'Government contract procurement creates a strong B2B revenue path',
        'AI fix code snippet generator is a highly publishable innovation angle'
      ],
      mvpScope: ['URL-based WCAG 2.2 automated accessibility scanner', 'AI remediation code snippet generator for common violations', 'Compliance score dashboard with issue priority ranking', 'CI/CD GitHub Action integration for continuous audit']
    },
    {
      id: 'si-3',
      title: 'FoodBridge — Surplus Food Rescue & Distribution Logistics Optimizer',
      problem: 'Restaurants, canteens, and events discard massive quantities of edible surplus food daily while food banks struggle with demand and logistics coordination.',
      solution: 'A platform matching surplus food donors with nearby NGOs and food banks, optimizing pickup logistics with real-time route assignment and perishability windows.',
      targetUsers: 'Restaurant chains, corporate canteens, food bank NGOs, volunteer networks',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Social Impact', 'React', 'Node.js', 'Python', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 12, studentFit: 10, feasibility: 10, impact: 10 },
      whyRecommended: [
        'Food waste is the third largest source of greenhouse gas emissions globally',
        'Real-time donor-NGO matching is a logistics routing problem solvable with OR-Tools',
        'High immediate impact: prototype can be tested with local restaurants on day 1',
        'Strong CSR partnership potential with restaurant chains and corporate campuses'
      ],
      mvpScope: ['Donor surplus food listing module with perishability timer', 'Logistics optimizer matching donors to nearest NGO recipients', 'Volunteer pickup route assignment engine', 'Impact dashboard (meals rescued, CO2 saved, beneficiaries served)']
    },
    {
      id: 'si-4',
      title: 'JobBridge — AI Skill-to-Job Matching Platform for Informal Workers',
      problem: 'Millions of daily wage and informal sector workers lack access to formal job discovery platforms matched to their vocational skills and location.',
      solution: 'A lightweight WhatsApp/SMS-accessible job matching engine that captures informal worker skill profiles and matches them to verified local employer opportunities.',
      targetUsers: 'Daily wage workers, domestic workers, vocational training institutions, NGOs',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Social Impact', 'AI/ML', 'Python', 'React', 'Node.js'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Informal economy inclusion is a documented development priority for ILO and government agencies',
        'WhatsApp Business API + NLP chatbot integration extends reach without smartphone requirement',
        'Skill-to-job NLP matching is a buildable ML task using embedding similarity',
        'NGO distribution networks provide an immediate deployment and testing channel'
      ],
      mvpScope: ['WhatsApp chatbot skill profile collector', 'NLP skill-to-job semantic similarity matcher', 'Employer job posting and verification portal', 'Placement success analytics dashboard for NGO coordinators']
    },
    {
      id: 'si-5',
      title: 'ElderCare Hub — Elderly Isolation Detection & Community Support Connector',
      problem: 'Chronic social isolation in elderly populations is linked to 50% increased risk of dementia and premature mortality, yet detection remains informal.',
      solution: 'A passive behavioral monitoring system using smart home sensor patterns to detect isolation anomalies and connect isolated elders with volunteer networks.',
      targetUsers: 'Senior care organizations, community health workers, elderly care families',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Social Impact', 'IoT', 'AI/ML', 'React', 'Python'],
      branches: ['CSE', 'AIML', 'ECE'],
      baseScores: { relevance: 17, scalability: 16, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 9, impact: 10 },
      whyRecommended: [
        'Aging population is a structural demographic shift creating long-term demand',
        'PIR motion sensor + smart plug usage patterns are low-cost isolation indicators',
        'Community volunteer network integration provides a human-centered tech narrative',
        'Strong differentiation: wellness focus vs traditional emergency alert only systems'
      ],
      mvpScope: ['Smart home sensor activity log ingestion (PIR, smart plug)', 'Isolation anomaly detector (activity pattern deviation model)', 'Family and care worker alert notification system', 'Community volunteer engagement and check-in portal']
    }
  ],

  Business: [
    {
      id: 'bu-1',
      title: 'ChurnSight — AI Customer Churn Predictor & Retention Playbook Engine',
      problem: 'SaaS businesses lose 5-7% of customers monthly to preventable churn, yet identify at-risk accounts too late for effective intervention.',
      solution: 'An ML churn prediction pipeline analyzing product usage patterns, support tickets, and billing signals to flag at-risk accounts 30 days in advance.',
      targetUsers: 'SaaS startup CEOs, customer success teams, subscription businesses',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Business', 'AI/ML', 'Python', 'React', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 18, futureDemand: 14, innovation: 13, studentFit: 10, feasibility: 9, impact: 9 },
      whyRecommended: [
        'Customer churn prediction is among the most commercially deployed ML applications',
        'Kaggle Telco churn dataset provides immediate training data for a working MVP',
        'Personalized retention playbook generation adds an LLM-powered differentiator',
        'Clear B2B SaaS revenue path with CS team subscription model'
      ],
      mvpScope: ['Usage telemetry + support ticket data ingestion', 'XGBoost churn risk classifier with SHAP explanations', 'At-risk account alert dashboard for CS teams', 'AI-generated retention playbook recommendation engine']
    },
    {
      id: 'bu-2',
      title: 'PricePilot — Dynamic Pricing Intelligence Engine for E-Commerce Sellers',
      problem: 'E-commerce marketplace sellers manually reprice products, leaving revenue on the table during demand surges and losing sales during competitive pricing wars.',
      solution: 'An ML pricing engine monitoring competitor prices, demand signals, and inventory levels to recommend optimal dynamic pricing with expected revenue uplift.',
      targetUsers: 'Amazon/Flipkart marketplace sellers, D2C e-commerce brands, pricing analysts',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Business', 'AI/ML', 'Python', 'React'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 9, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Dynamic pricing is standard practice at Amazon and is spreading to SME sellers',
        'Competitor price scraping + demand forecasting pipeline is a teachable engineering stack',
        'Revenue uplift calculator provides clear measurable ROI for seller adoption',
        'API-first design enables marketplace plugin integration as a growth channel'
      ],
      mvpScope: ['Competitor price scraper with rate-limiting and proxy rotation', 'Demand forecast model (Prophet/XGBoost)', 'Dynamic price recommendation engine', 'Seller dashboard with expected revenue impact calculator']
    },
    {
      id: 'bu-3',
      title: 'ReviewRadar — Customer Sentiment Intelligence Platform for Product Teams',
      problem: 'Product managers at consumer companies manually review thousands of app store and e-commerce reviews, missing critical sentiment patterns and feature requests.',
      solution: 'An NLP pipeline that ingests multi-platform reviews, clusters sentiment themes, extracts actionable feature requests, and tracks brand perception trends.',
      targetUsers: 'Product managers, brand managers, e-commerce category heads',
      trend: 'Stable',
      scalePotential: 'Global',
      domains: ['Business', 'AI/ML', 'Python', 'React', 'Node.js'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Review analytics is a universally demanded product intelligence tool',
        'Google Play Store, App Store, and Amazon review APIs are openly accessible',
        'Aspect-based sentiment analysis (ABSA) is a well-researched NLP task',
        'SaaS dashboard with competitor comparison adds strong commercial differentiation'
      ],
      mvpScope: ['Multi-platform review ingestion (Play Store, Amazon, Twitter)', 'ABSA sentiment theme extractor', 'Feature request cluster mapper', 'Competitor brand sentiment comparison dashboard']
    },
    {
      id: 'bu-4',
      title: 'SupplySync — Supplier Risk Intelligence & Diversification Advisor',
      problem: 'Manufacturing and retail companies are exposed to catastrophic supply disruptions from over-reliance on single-source suppliers with no early warning system.',
      solution: 'A supplier risk monitoring platform analyzing news sentiment, financial distress signals, and geopolitical data to score supplier reliability and suggest alternatives.',
      targetUsers: 'Procurement heads, supply chain managers, manufacturing operations teams',
      trend: 'Growing',
      scalePotential: 'Global',
      domains: ['Business', 'AI/ML', 'Python', 'React', 'SQL'],
      branches: ['CSE', 'AIML', 'Mechanical', 'Other'],
      baseScores: { relevance: 18, scalability: 17, futureDemand: 14, innovation: 14, studentFit: 9, feasibility: 8, impact: 9 },
      whyRecommended: [
        'Post-COVID supply chain resilience is a top board-level priority for manufacturers',
        'News sentiment NLP + financial data APIs (Alpha Vantage) are accessible',
        'Risk scoring combined with alternative supplier recommendation is commercially novel',
        'Mechanical engineering + CS combination makes this unique for cross-discipline panels'
      ],
      mvpScope: ['Supplier news sentiment scraper and NLP risk signal extractor', 'Financial distress early warning scorer', 'Supplier risk dashboard with geo-concentration heat map', 'Alternative supplier recommendation engine']
    },
    {
      id: 'bu-5',
      title: 'HRPulse — Employee Attrition Predictor & Engagement Action Engine',
      problem: 'Employee attrition costs 50-200% of annual salary per departed employee, yet HR teams lack predictive signals to intervene before resignation decisions are made.',
      solution: 'An ML attrition predictor analyzing engagement survey scores, attendance patterns, performance history, and compensation benchmarks to flag flight risks.',
      targetUsers: 'HR departments, people analytics teams, startup CEOs managing talent',
      trend: 'Stable',
      scalePotential: 'Global',
      domains: ['Business', 'AI/ML', 'Python', 'React', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'IBM HR Analytics Employee Attrition dataset provides training data out of the box',
        'XGBoost + SHAP explainability makes the model transparent enough for HR trust',
        'Engagement action recommendation engine differentiates from pure prediction tools',
        'Every company with > 50 employees is a potential customer'
      ],
      mvpScope: ['HR dataset ingestion with feature engineering pipeline', 'XGBoost attrition risk classifier with SHAP explanations', 'Flight risk dashboard for HR managers', 'Engagement intervention action recommendation engine']
    }
  ],

  Campus: [
    {
      id: 'ca-1',
      title: 'CampusPulse — Student Mental Health & Burnout Early Detection System',
      problem: 'University mental health centers are overwhelmed, with 1 in 3 students showing signs of burnout, yet detection happens only after academic performance collapses.',
      solution: 'A passive behavioral monitoring platform using digital footprints (library login patterns, app usage, assignment submission delays) to identify burnout risk early.',
      targetUsers: 'University counseling centers, dean of students offices, student welfare departments',
      trend: 'Growing',
      scalePotential: 'National',
      domains: ['Campus', 'AI/ML', 'React', 'Node.js', 'Python'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 19, scalability: 17, futureDemand: 14, innovation: 14, studentFit: 10, feasibility: 9, impact: 10 },
      whyRecommended: [
        'University mental health crisis is a documented and funded priority globally',
        'Passive behavioral data collection is ethically approvable with proper consent flows',
        'You are your own target user: test and validate with your own campus peers',
        'Strong institutional procurement path through student welfare departments'
      ],
      mvpScope: ['Opt-in behavioral data consent and collection module', 'Burnout risk ML predictor (assignment delay + engagement patterns)', 'Counselor dashboard with anonymized risk population view', 'Proactive student check-in and resource recommendation system']
    },
    {
      id: 'ca-2',
      title: 'LabBook — Smart Laboratory Equipment Booking & Usage Analytics System',
      problem: 'University laboratories face equipment underutilization and scheduling conflicts due to manual booking systems, delaying student research projects.',
      solution: 'A smart booking platform with predictive availability, equipment usage analytics, and automated maintenance scheduling for university laboratory management.',
      targetUsers: 'University lab administrators, research students, departmental heads',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Campus', 'React', 'Node.js', 'SQL'],
      branches: ['CSE', 'AIML', 'ECE', 'Other'],
      baseScores: { relevance: 18, scalability: 16, futureDemand: 12, innovation: 12, studentFit: 10, feasibility: 10, impact: 8 },
      whyRecommended: [
        'Directly testable and deployable at your own university with zero data acquisition challenge',
        'Full-stack CRUD + scheduling optimization is a thorough capstone engineering exercise',
        'Equipment usage analytics dashboard demonstrates data visualization skills',
        'Immediate institutional adoption potential: your HOD could use this next semester'
      ],
      mvpScope: ['Equipment catalog with real-time availability slot display', 'Predictive availability system based on usage history', 'Automated maintenance reminder scheduler', 'Lab administrator usage analytics dashboard']
    },
    {
      id: 'ca-3',
      title: 'CollegeBuzz — AI-Personalized Campus Event & Opportunity Aggregator',
      problem: 'Students miss high-value campus events, placement drives, hackathons, and scholarships due to fragmented announcement channels across email, notice boards, and WhatsApp groups.',
      solution: 'An AI aggregator that collects campus opportunity announcements, personalizes relevance ranking per student profile, and delivers curated daily digests.',
      targetUsers: 'Undergraduate and postgraduate students, student unions, placement offices',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Campus', 'React', 'Node.js', 'AI/ML', 'Python'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 12, innovation: 13, studentFit: 10, feasibility: 10, impact: 8 },
      whyRecommended: [
        'Every student on your campus is a potential immediate user for validation',
        'NLP opportunity classification + collaborative filtering ranking is buildable in a semester',
        'Multi-campus expansion path creates a clear product growth roadmap',
        'Strong differentiation from existing college notice boards: intelligent personalization'
      ],
      mvpScope: ['Campus announcement scraper (email, website, WhatsApp webhook)', 'NLP opportunity classifier and relevance tagger', 'Student profile-based personalized digest generator', 'Mobile-responsive event and opportunity discovery app']
    },
    {
      id: 'ca-4',
      title: 'GradeAid — Academic Probation Early Alert & Peer Tutoring Connector',
      problem: 'Students heading toward academic probation are identified only when semester results are published, leaving no time for remediation interventions.',
      solution: 'An early warning system tracking assignment scores, quiz performance, and attendance velocity to flag at-risk students and connect them with peer tutors automatically.',
      targetUsers: 'Academic advisors, professors, student success coordinators',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Campus', 'React', 'Node.js', 'SQL', 'Python'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 16, futureDemand: 12, innovation: 12, studentFit: 10, feasibility: 10, impact: 9 },
      whyRecommended: [
        'Academic early warning systems are a proven intervention in US universities',
        'Grade trajectory analysis is a straightforward time-series prediction task',
        'Peer tutoring matching component adds social network value beyond simple alerts',
        'Institutional integration with existing LMS (Moodle) increases adoption potential'
      ],
      mvpScope: ['Assignment and attendance data ingestion pipeline', 'Grade trajectory early warning predictor', 'Automatic peer tutor matching engine', 'Academic advisor intervention dashboard']
    },
    {
      id: 'ca-5',
      title: 'AlumniConnect — AI-Powered Alumni Mentorship & Career Path Intelligence Platform',
      problem: 'Universities have millions of alumni but fail to systematically match graduating students with relevant alumni mentors for career guidance.',
      solution: 'A smart alumni-student matching platform using career path ML similarity to connect students with industry-relevant alumni mentors and track engagement outcomes.',
      targetUsers: 'University alumni cells, placement offices, graduating students',
      trend: 'Stable',
      scalePotential: 'National',
      domains: ['Campus', 'React', 'Node.js', 'AI/ML', 'SQL'],
      branches: ['CSE', 'AIML', 'Other'],
      baseScores: { relevance: 17, scalability: 17, futureDemand: 13, innovation: 13, studentFit: 10, feasibility: 9, impact: 8 },
      whyRecommended: [
        'Alumni engagement platforms are a strategic priority for every NAAC-accredited institution',
        'LinkedIn profile scraping + career path embedding similarity is a publishable ML technique',
        'Placement office is your immediate institutional customer and deployment partner',
        'Network effects compound: each alumni connected increases platform value'
      ],
      mvpScope: ['Alumni and student profile ingestion (LinkedIn/manual)', 'Career path embedding similarity matcher', 'Mentorship session scheduler and tracking system', 'Alumni engagement analytics dashboard for placement office']
    }
  ]
};

// Supported industry list
export const SUPPORTED_INDUSTRIES = [
  'Healthcare',
  'Finance',
  'Agriculture',
  'Education',
  'Environment',
  'Transportation',
  'Cybersecurity',
  'Social Impact',
  'Business',
  'Campus'
];

/**
 * Main Opportunity Engine Function
 * HARD CONSTRAINT: selectedIndustry filters which templates are used.
 * Returns exactly 5 personalized, ranked projects from the selected industry.
 */
export function generateProjectOpportunities(profile, selectedIndustry) {
  const {
    branch = '',
    skills = [],
    interests = [],
    teamSize = '3',
    timeAvailable = '3 Months'
  } = profile || {};

  // Determine which industry to use
  // If no industry selected, try to infer from interests, else fallback to top templates across all
  const resolvedIndustry = selectedIndustry || inferIndustryFromProfile(interests, branch);

  // Get templates strictly from the selected industry
  const templates = INDUSTRY_PROJECT_LIBRARY[resolvedIndustry] || Object.values(INDUSTRY_PROJECT_LIBRARY).flat();

  // Score boost algorithm based on student alignment
  const rankedProjects = templates.map((tpl) => {
    let studentFitBonus = 0;
    let feasibilityBonus = 0;

    // Check branch match
    if (tpl.branches.includes(branch)) {
      studentFitBonus += 1;
    }

    // Check skill match
    const matchingSkills = skills.filter(s =>
      tpl.domains.some(d =>
        d.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(d.toLowerCase())
      )
    );
    studentFitBonus += Math.min(2, matchingSkills.length);

    // Adjust feasibility based on team size
    const teamNum = parseInt(teamSize, 10) || 3;
    if (teamNum >= 3) {
      feasibilityBonus += 1;
    }

    // Timeline bonus: shorter projects for 1-month timeline
    if (timeAvailable.includes('1 Month') && tpl.baseScores.feasibility >= 9) {
      feasibilityBonus += 1;
    }

    const scores = {
      relevance: Math.min(20, tpl.baseScores.relevance),
      scalability: Math.min(20, tpl.baseScores.scalability),
      futureDemand: Math.min(15, tpl.baseScores.futureDemand),
      innovation: Math.min(15, tpl.baseScores.innovation),
      studentFit: Math.min(10, tpl.baseScores.studentFit + studentFitBonus),
      feasibility: Math.min(10, tpl.baseScores.feasibility + feasibilityBonus),
      impact: Math.min(10, tpl.baseScores.impact)
    };

    const overallScore =
      scores.relevance +
      scores.scalability +
      scores.futureDemand +
      scores.innovation +
      scores.studentFit +
      scores.feasibility +
      scores.impact;

    return {
      ...tpl,
      scores,
      overallScore: Math.min(99, overallScore),
      selectedIndustry: resolvedIndustry
    };
  });

  // Sort descending by overall score
  rankedProjects.sort((a, b) => b.overallScore - a.overallScore);

  // Return top 5 projects with rank
  return rankedProjects.slice(0, 5).map((project, index) => ({
    ...project,
    rank: index + 1
  }));
}

// Infer industry from student interests (fallback if no industry explicitly selected)
function inferIndustryFromProfile(interests, branch) {
  const interestMap = {
    Healthcare: ['Healthcare'],
    Finance: ['Finance'],
    Agriculture: ['Agriculture'],
    Education: ['Education', 'Campus'],
    Environment: ['Environment'],
    Transportation: ['Transportation'],
    Cybersecurity: ['Cybersecurity'],
    'Social Impact': ['Social Impact'],
    Business: ['Business'],
    Campus: ['Campus']
  };

  for (const [industry, keywords] of Object.entries(interestMap)) {
    if (interests.some(i => keywords.some(k => k.toLowerCase() === i.toLowerCase()))) {
      return industry;
    }
  }

  // Branch-based fallback
  if (branch === 'EEE' || branch === 'Mechanical') return 'Environment';
  if (branch === 'Civil') return 'Transportation';

  return 'Healthcare'; // absolute last resort
}

export const SCORE_CRITERIA_INFO = [
  { key: 'relevance', name: 'Current Problem Relevance', max: 20, weight: '20%' },
  { key: 'scalability', name: 'Scalability Potential', max: 20, weight: '20%' },
  { key: 'futureDemand', name: 'Future Market Demand', max: 15, weight: '15%' },
  { key: 'innovation', name: 'Innovation & Differentiation', max: 15, weight: '15%' },
  { key: 'studentFit', name: 'Student Skill Fit', max: 10, weight: '10%' },
  { key: 'feasibility', name: 'Timeline Feasibility', max: 10, weight: '10%' },
  { key: 'impact', name: 'Social / Business Impact', max: 10, weight: '10%' }
];
