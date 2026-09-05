/**
 * ProjectPilot AI - Stage 3 Project Blueprint Engine
 * Generates an end-to-end, realistic, actionable project blueprint in structured JSON.
 * Tailored dynamically based on:
 * - Selected Stage-2 project
 * - Student's Stage-1 profile (branch, skills, interests, teamSize, timeAvailable)
 */

export function generateProjectBlueprint(project, studentProfile) {
  if (!project) return null;

  const {
    branch = 'CSE',
    skills = [],
    interests = [],
    teamSize = '3',
    timeAvailable = '3 Months'
  } = studentProfile || {};

  const numTeam = parseInt(teamSize, 10) || 3;
  const projectTitle = project.title || 'Innovative AI Capstone';

  // 1. PROJECT OVERVIEW
  const overview = {
    title: projectTitle,
    oneLineDescription: project.solution || 'An intelligent full-stack solution addressing critical industry pain points.',
    problem: project.problem || 'Current legacy workflows lack real-time predictive automation, resulting in severe inefficiencies.',
    targetUsers: project.targetUsers || 'Industry professionals, domain specialists, and end-consumers',
    proposedSolution: project.solution || 'A lightweight, modular, AI-powered system providing automated diagnostics and actionable decision support.',
    expectedImpact: 'Reduces operational turnaround by 60%, minimizes critical human oversight errors, and establishes an enterprise-grade reference architecture for academic review.'
  };

  // 2. MVP SCOPE (Must Have vs Advanced / Optional)
  const mvpScope = {
    mustHave: [
      {
        id: 'mvp-1',
        title: 'Core Ingestion & Preprocessing Pipeline',
        description: 'Robust telemetry/data ingestion engine with schema validation, normalization, and error handling.',
        priority: 'P0 - Critical',
        effort: '2 Weeks'
      },
      {
        id: 'mvp-2',
        title: 'Primary Inference / Processing Service',
        description: 'Baseline computational or machine learning inference module providing accurate domain predictions.',
        priority: 'P0 - Critical',
        effort: '2-3 Weeks'
      },
      {
        id: 'mvp-3',
        title: 'Interactive Student/Admin Web Interface',
        description: 'Responsive dashboard displaying live metrics, status gauges, query filters, and decision outputs.',
        priority: 'P0 - Critical',
        effort: '2 Weeks'
      },
      {
        id: 'mvp-4',
        title: 'RESTful API & Database Persistence',
        description: 'Secure backend service with structured database storage and audited transaction history.',
        priority: 'P0 - Critical',
        effort: '1-2 Weeks'
      }
    ],
    advancedOptional: [
      {
        id: 'opt-1',
        title: 'Multi-Tenant RBAC & Auth Gateways',
        description: 'Role-based access controls for enterprise departments and team collaborators.',
        priority: 'P2 - Stretch',
        effort: '1-2 Weeks'
      },
      {
        id: 'opt-2',
        title: 'Real-time WebSocket Push Telemetry',
        description: 'Sub-second streaming updates replacing polling for ultra-low latency alerts.',
        priority: 'P2 - Stretch',
        effort: '1 Week'
      },
      {
        id: 'opt-3',
        title: 'Automated CI/CD Containerization',
        description: 'Docker multi-stage builds and automated GitHub Actions test pipelines.',
        priority: 'P3 - Stretch',
        effort: '3-4 Days'
      }
    ]
  };

  // 3. TECH STACK (Tailored to student skills)
  const hasSkill = (sk) => skills.some(s => s.toLowerCase().includes(sk.toLowerCase()));

  const techStack = {
    frontend: {
      technology: hasSkill('React') ? 'React 18 + Vite' : hasSkill('JavaScript') ? 'Modern JavaScript (ES6+) + CSS Modules' : 'React.js (Component-driven)',
      rationale: 'Provides fast component re-rendering, rich ecosystem, and seamless state synchronization for real-time dashboards.'
    },
    backend: {
      technology: hasSkill('Python') 
        ? 'Python (FastAPI / Uvicorn)' 
        : hasSkill('Node.js') 
        ? 'Node.js + Express.js' 
        : hasSkill('Django') 
        ? 'Python (Django REST Framework)' 
        : hasSkill('Java')
        ? 'Java (Spring Boot 3)'
        : 'FastAPI (Python async high-performance backend)',
      rationale: 'Async non-blocking I/O with auto-generated OpenAPI documentation for rapid client-server contract synchronization.'
    },
    database: {
      technology: hasSkill('SQL') ? 'PostgreSQL 16 + Prisma/SQLAlchemy' : 'PostgreSQL with TimescaleDB / SQLite for rapid prototyping',
      rationale: 'ACID-compliant relational integrity with native JSONB support for unstructured logs and telemetry time-series.'
    },
    aiMl: {
      technology: (hasSkill('AI/ML') || hasSkill('Python')) 
        ? 'PyTorch 2.x / Scikit-Learn + ONNX Runtime' 
        : 'Scikit-Learn / HuggingFace Transformers API',
      isNecessary: true,
      rationale: 'Optimized inference latency with ONNX graph optimizations; enables lightweight CPU execution without GPU cost.'
    },
    apis: {
      technology: 'RESTful JSON endpoints + WebSocket for live broadcast + Webhooks',
      rationale: 'Decoupled protocol communication enabling modular unit testing and independent service scaling.'
    },
    deployment: {
      technology: hasSkill('Cloud') ? 'Docker + AWS ECS / GCP Cloud Run' : 'Docker containers + Render.com / Vercel (Free tier student credits)',
      rationale: 'Zero-downtime containerized builds deployable on standard free-tier student cloud infrastructure.'
    }
  };

  // Check if project requires hardware/IoT
  if (project.domains?.includes('IoT') || branch === 'ECE' || branch === 'EEE' || branch === 'Mechanical') {
    techStack.hardwareIoT = {
      technology: 'ESP32 / Raspberry Pi 4 + MQTT (Mosquitto Broker) + MicroPython/C++',
      rationale: 'Ultra-low-power dual-core SoC with integrated 2.4GHz Wi-Fi and Bluetooth BLE sensors.'
    };
  }

  // 4. SYSTEM ARCHITECTURE
  const systemArchitecture = {
    overview: 'A decoupled micro-modular architecture prioritizing sub-second processing latency, clear data contracts, and fault isolation.',
    flowNodes: [
      {
        id: 'node-user',
        label: 'Client User / Sensor',
        type: 'source',
        description: 'End-user browser client or edge sensor hardware node generating requests and telemetry.',
        protocol: 'HTTPS / TLS 1.3'
      },
      {
        id: 'node-frontend',
        label: 'Frontend SPA Application',
        type: 'client',
        description: `${techStack.frontend.technology} UI presenting interactive telemetry charts, input forms, and alerts.`,
        protocol: 'REST JSON / WebSocket'
      },
      {
        id: 'node-backend',
        label: 'API Gateway & App Server',
        type: 'server',
        description: `${techStack.backend.technology} handling authentication, input sanitization, business validation, and task queuing.`,
        protocol: 'Internal Async RPC'
      },
      {
        id: 'node-processing',
        label: 'AI Inference / Compute Engine',
        type: 'engine',
        description: `${techStack.aiMl.technology} worker evaluating feature vectors against trained model checkpoints.`,
        protocol: 'SQLAlchemy / Native Driver'
      },
      {
        id: 'node-storage',
        label: 'Database & Persistent Lake',
        type: 'storage',
        description: `${techStack.database.technology} persisting audit logs, time-series vectors, user profiles, and model scores.`,
        protocol: 'State Response'
      },
      {
        id: 'node-output',
        label: 'Actionable Output & Alerts',
        type: 'output',
        description: 'Rendered visual insights, real-time trigger notifications, and exportable academic audit reports.',
        protocol: 'Delivery Complete'
      }
    ],
    connections: [
      { from: 'node-user', to: 'node-frontend', label: 'User Action / Sensor Stream' },
      { from: 'node-frontend', to: 'node-backend', label: 'Authenticated HTTPS API Call' },
      { from: 'node-backend', to: 'node-processing', label: 'Extracted Feature Payload' },
      { from: 'node-processing', to: 'node-storage', label: 'Persist Diagnostics & Predictions' },
      { from: 'node-backend', to: 'node-output', label: 'Render Analytics & Trigger Alerts' }
    ]
  };

  // 5. CORE FEATURES (Purpose, Input, Process, Output)
  const coreFeatures = [
    {
      id: 'feat-1',
      name: 'Dynamic Ingestion & Feature Normalizer',
      purpose: 'Sanitizes raw domain data, detects null values, and converts heterogeneous inputs into standard vectors.',
      input: 'Raw incoming telemetry or CSV/JSON dataset payloads.',
      process: 'Z-score normalization, missing value imputation, out-of-bounds clipping, and timestamp alignment.',
      output: 'Validated standardized tensor / feature dictionary ready for compute.'
    },
    {
      id: 'feat-2',
      name: 'Real-Time Anomaly & Scoring Inference Engine',
      purpose: 'Evaluates normalized vectors against the trained intelligence pipeline to produce confidence scores.',
      input: 'Normalized data records + active model checkpoint weights.',
      process: 'Vector matrix multiplication, boundary evaluation, threshold cross-verification, and trend slope calculation.',
      output: 'Confidence probability score [0.0 - 1.0], classification label, and risk severity tier.'
    },
    {
      id: 'feat-3',
      name: 'Exploratory Analytics & Visualization Hub',
      purpose: 'Provides human operators and evaluators with interactive visual telemetry for diagnostic transparency.',
      input: 'Historical database records and real-time inference streams.',
      process: 'Time-window aggregation, rolling average smoothing, anomaly marker highlighting, and correlation plotting.',
      output: 'Dynamic interactive charts, filterable incident data tables, and exportable CSV/PDF reports.'
    },
    {
      id: 'feat-4',
      name: 'Proactive Alert & Mitigation Dispatcher',
      purpose: 'Automatically notifies relevant stakeholders when system thresholds or high-risk anomalies occur.',
      input: 'Trigger event payload with anomaly timestamp, severity tier, and contextual metadata.',
      process: 'Deduplication cooldown filter (prevents notification spam), template formatting, and multi-channel dispatch.',
      output: 'Instant UI toast banner, sound alert chime, and simulated/live webhook dispatch.'
    }
  ];

  // 6. DATABASE SCHEMA
  const databaseSchema = {
    dbType: techStack.database.technology,
    entities: [
      {
        name: 'users',
        description: 'Stores authenticated students, evaluators, and system administrators.',
        fields: [
          { name: 'id', type: 'UUID', key: 'PRIMARY KEY', description: 'Unique user identifier' },
          { name: 'full_name', type: 'VARCHAR(120)', key: '', description: 'Student or researcher full name' },
          { name: 'email', type: 'VARCHAR(255)', key: 'UNIQUE', description: 'Institutional email address' },
          { name: 'password_hash', type: 'VARCHAR(255)', key: '', description: 'Bcrypt hashed password credential' },
          { name: 'role', type: 'VARCHAR(30)', key: 'DEFAULT "student"', description: 'Access tier (student, evaluator, admin)' },
          { name: 'created_at', type: 'TIMESTAMPTZ', key: 'DEFAULT NOW()', description: 'Account registration timestamp' }
        ]
      },
      {
        name: 'data_records',
        description: 'Raw and sanitized domain time-series or interaction events.',
        fields: [
          { name: 'id', type: 'BIGSERIAL', key: 'PRIMARY KEY', description: 'Auto-incrementing telemetry sequence' },
          { name: 'source_id', type: 'VARCHAR(60)', key: 'INDEX', description: 'Sensor node or client session origin' },
          { name: 'payload', type: 'JSONB', key: '', description: 'Structured raw domain parameters and attributes' },
          { name: 'status', type: 'VARCHAR(30)', key: '', description: 'Ingestion status (pending, processed, flagged)' },
          { name: 'recorded_at', type: 'TIMESTAMPTZ', key: 'INDEX', description: 'Sampling timestamp' }
        ]
      },
      {
        name: 'model_predictions',
        description: 'Historical outputs and confidence ratings generated by the intelligence engine.',
        fields: [
          { name: 'id', type: 'UUID', key: 'PRIMARY KEY', description: 'Unique prediction run identifier' },
          { name: 'record_id', type: 'BIGINT', key: 'FOREIGN KEY -> data_records(id)', description: 'Referenced input record' },
          { name: 'score', type: 'NUMERIC(6,3)', key: '', description: 'Calculated risk or opportunity score' },
          { name: 'predicted_class', type: 'VARCHAR(60)', key: 'INDEX', description: 'Categorical anomaly classification' },
          { name: 'latency_ms', type: 'INT', key: '', description: 'Inference latency turnaround time' },
          { name: 'created_at', type: 'TIMESTAMPTZ', key: 'DEFAULT NOW()', description: 'Timestamp of computation' }
        ]
      },
      {
        name: 'system_alerts',
        description: 'Logged incident events triggered by critical anomalies.',
        fields: [
          { name: 'id', type: 'UUID', key: 'PRIMARY KEY', description: 'Unique alert identifier' },
          { name: 'prediction_id', type: 'UUID', key: 'FOREIGN KEY -> model_predictions(id)', description: 'Triggering prediction reference' },
          { name: 'severity', type: 'VARCHAR(20)', key: 'INDEX', description: 'Severity tier (INFO, WARNING, CRITICAL)' },
          { name: 'resolved', type: 'BOOLEAN', key: 'DEFAULT FALSE', description: 'Resolution status flag' }
        ]
      }
    ],
    relationships: [
      'users (1) ── creates ──< data_records (N)',
      'data_records (1) ── evaluated by ──< model_predictions (1)',
      'model_predictions (1) ── triggers ──< system_alerts (N)'
    ]
  };

  // 7. AI/ML PLAN
  const aiMlPlan = {
    isApplicable: true,
    problemType: 'Supervised Anomaly Classification & Multivariate Time-Series Regression',
    inputData: 'Standardized multi-dimensional feature vectors (e.g. signal telemetry, operational transaction logs, numerical sensor readings).',
    preprocessing: [
      'Missing-value handling via linear forward-fill and rolling median interpolation.',
      'Feature scaling using RobustScaler to prevent sensor outlier bias.',
      'Sliding window sequence formulation (e.g. 30 timesteps window, 5 timesteps stride).',
      'Stratified 80/10/10 train/validation/test dataset split.'
    ],
    modelApproach: {
      baseline: 'RandomForestClassifier / Logistic Regression for fast interpretable benchmark.',
      advanced: '1D Convolutional Neural Network (1D-CNN) + Lightweight Bi-LSTM or LightGBM.',
      inferenceTarget: 'ONNX Runtime CPU deployment with quantized INT8 weights (< 25MB checkpoint size).'
    },
    output: 'Continuous risk score (0.0 to 100.0) + multi-class categorization flag + Top 3 contributing SHAP feature attribution weights.',
    evaluationMetrics: [
      { metric: 'ROC-AUC Score', target: '>= 0.88', rationale: 'Measures discrimination capacity under imbalanced real-world class distributions.' },
      { metric: 'Precision @ High Recall (0.90)', target: '>= 0.82', rationale: 'Minimizes false alarms while capturing critical safety-critical edge anomalies.' },
      { metric: 'Inference Latency', target: '< 45ms per record', rationale: 'Ensures snappy interactive UX on standard university laptop hardware.' },
      { metric: 'F1-Score Macro', target: '>= 0.85', rationale: 'Balanced harmonic mean across all anomaly severity tiers.' }
    ]
  };

  // 8. DATASET / DATA SOURCES
  const datasetPlan = {
    requiredData: 'Domain-specific time-series or structured tabular records with annotated ground truth labels and chronological timestamps.',
    importantFields: [
      'timestamp (ISO 8601 UTC)',
      'entity_id / sensor_node_id',
      'feature_vector_primary (e.g. voltage, heart_rate, transaction_val, packet_count)',
      'feature_vector_secondary (e.g. temperature, deviation_index, frequency)',
      'ground_truth_label (0: Normal, 1: Minor Anomaly, 2: Critical Anomaly)'
    ],
    publicDataSources: [
      {
        name: 'PhysioNet & Kaggle Open Repositories',
        url: 'https://physionet.org / https://kaggle.com/datasets',
        description: 'Gold-standard open access biomedical, financial transaction, and industrial sensor datasets.'
      },
      {
        name: 'UCI Machine Learning Repository & IEEE Dataport',
        url: 'https://archive.ics.uci.edu / https://ieee-dataport.org',
        description: 'Peer-reviewed academic research datasets with documented baseline benchmarks.'
      }
    ],
    syntheticDataOption: {
      available: true,
      strategy: 'Built-in Python Synthetic Data Generator Script using NumPy & Faker',
      recipe: 'Simulate baseline Gaussian noise distributions with injected anomalous spike vectors, drift trends, and seasonal sine waveforms to validate model robustness prior to real data onboarding.'
    }
  };

  // 9. DEVELOPMENT ROADMAP (Adapted to student timeframe)
  const isOneMonth = timeAvailable.includes('1 Month');
  const isSixMonthsOrMore = timeAvailable.includes('6 Months') || timeAvailable.includes('1 Year');

  const roadmap = isOneMonth ? [
    {
      phase: 'Phase 1: Sprint 1 (Days 1–7)',
      milestone: 'Problem Definition & Dataset Ingestion',
      tasks: [
        'Finalize domain dataset (open source / synthetic generator)',
        'Set up GitHub repository and initial project environment',
        'Build exploratory data analysis (EDA) Jupyter notebook'
      ],
      expectedOutput: 'Cleaned CSV dataset with summary statistics and correlation charts.'
    },
    {
      phase: 'Phase 2: Sprint 2 (Days 8–14)',
      milestone: 'Model Training & Core Backend API',
      tasks: [
        'Train baseline machine learning classifier in Scikit-Learn / PyTorch',
        'Serialize model weights into ONNX / Pickle binary format',
        'Scaffold FastAPI / Express backend server with prediction endpoint'
      ],
      expectedOutput: 'Working /api/predict endpoint tested via Postman / Curl.'
    },
    {
      phase: 'Phase 3: Sprint 3 (Days 15–22)',
      milestone: 'Frontend Dashboard & Data Visualization',
      tasks: [
        'Build React client with navigation, cards, and input forms',
        'Integrate Chart.js / Recharts for live anomaly trajectory curves',
        'Connect frontend fetch calls to backend API'
      ],
      expectedOutput: 'End-to-end interactive dashboard displaying predictions dynamically.'
    },
    {
      phase: 'Phase 4: Sprint 4 (Days 23–30)',
      milestone: 'Testing, Polish & Capstone Report',
      tasks: [
        'Perform boundary test cases and latency benchmarking',
        'Deploy project to Render / Vercel with free-tier domain',
        'Compile final project documentation, demo slides, and viva video'
      ],
      expectedOutput: 'Live production URL + complete final year thesis report.'
    }
  ] : isSixMonthsOrMore ? [
    {
      phase: 'Month 1',
      milestone: 'Literature Survey, System Design & Architecture',
      tasks: [
        'Exhaustive survey of existing academic papers and competitor platforms',
        'Detailed architectural diagram, data flow diagrams (DFD), and UML specifications',
        'Finalize hardware/software bill of materials and tech stack dependencies'
      ],
      expectedOutput: 'Approved capstone proposal document and validated data pipeline spec.'
    },
    {
      phase: 'Month 2',
      milestone: 'Data Pipeline Engineering & Synthetic Generators',
      tasks: [
        'Collect, clean, and structure primary domain datasets',
        'Develop parametric synthetic data generator for edge-case simulation',
        'Implement database schemas with migration scripts in PostgreSQL'
      ],
      expectedOutput: 'Automated ingestion pipeline with automated data validation suites.'
    },
    {
      phase: 'Month 3',
      milestone: 'Core AI/ML Modeling & Algorithmic Optimization',
      tasks: [
        'Train and compare multiple model architectures (baseline vs deep learning)',
        'Conduct hyperparameter tuning via Optuna / GridSearch',
        'Optimize inference speed using model quantization and ONNX runtime'
      ],
      expectedOutput: 'High-accuracy model benchmarked with comprehensive ROC-AUC & confusion matrix.'
    },
    {
      phase: 'Month 4',
      milestone: 'Backend Services, API & Real-Time Telemetry',
      tasks: [
        'Build robust microservices / REST API with JWT authentication',
        'Implement WebSocket gateway for real-time telemetry streaming',
        'Set up automated unit and integration tests with pytest / Jest'
      ],
      expectedOutput: 'Fully documented OpenAPI backend with >= 85% test coverage.'
    },
    {
      phase: 'Month 5',
      milestone: 'Frontend UX & Evaluator Analytics Portal',
      tasks: [
        'Create high-fidelity reactive dashboard with modern design system',
        'Build advanced query filters, anomaly inspection cards, and export wizards',
        'Conduct end-to-end integration and user acceptance testing (UAT)'
      ],
      expectedOutput: 'Polished client application ready for peer evaluation.'
    },
    {
      phase: 'Month 6',
      milestone: 'Deployment, Research Paper Draft & Viva Defense',
      tasks: [
        'Deploy production cluster with Docker and automated health probes',
        'Draft IEEE/Springer format academic research paper',
        'Prepare presentation slides, demonstration video, and viva question bank'
      ],
      expectedOutput: 'Live hosted capstone project + published research preprint.'
    }
  ] : [
    // Standard 3 Months timeline
    {
      phase: 'Month 1 (Weeks 1–4)',
      milestone: 'Research, System Architecture & Data Prep',
      tasks: [
        'Formulate problem statement, research existing solutions, and define MVP requirements',
        'Source public datasets or generate calibrated synthetic data records',
        'Scaffold database schema and configure Dockerized dev environment'
      ],
      expectedOutput: 'Version-controlled repository with running database and cleaned data.'
    },
    {
      phase: 'Month 2 (Weeks 5–8)',
      milestone: 'Model Training, Backend API & Core Pipeline',
      tasks: [
        'Train domain predictive model and evaluate accuracy against test benchmarks',
        'Build RESTful API endpoints for data ingestion and prediction inference',
        'Implement automated validation, error handling, and structured logging'
      ],
      expectedOutput: 'Verified backend API returning inference responses in < 50ms.'
    },
    {
      phase: 'Month 3 (Weeks 9–12)',
      milestone: 'Frontend Interface, Integration, Polish & Viva Prep',
      tasks: [
        'Build responsive React dashboard with real-time charts and status gauges',
        'Connect frontend to API and execute end-to-end user journey tests',
        'Deploy project live on cloud and finalize project presentation deck'
      ],
      expectedOutput: 'Complete deployed capstone project + ready-for-viva thesis documentation.'
    }
  ];

  // 10. TEAM TASK DISTRIBUTION (Dynamically adapts to teamSize)
  const teamDistribution = [];
  if (numTeam === 1) {
    teamDistribution.push({
      member: 'Solo Engineer (You)',
      role: 'Full-Stack Architect & AI Specialist',
      focusArea: 'End-to-end delivery: Architecture, Model Training, API & UI',
      tasks: [
        'Define system architecture and establish GitHub repository',
        'Train and evaluate core AI/ML model and serialize for production',
        'Develop FastAPI backend server with database integration',
        'Build responsive React frontend interface and deploy live'
      ]
    });
  } else if (numTeam === 2) {
    teamDistribution.push(
      {
        member: 'Team Member 1 (Lead)',
        role: 'AI / Backend & Data Engineer',
        focusArea: 'Data pipeline, Machine Learning model, API endpoints & DB',
        tasks: [
          'Source, clean, and preprocess training datasets',
          'Train, fine-tune, and optimize inference models',
          'Implement backend REST API and database persistence schemas',
          'Dockerize services and configure cloud deployment'
        ]
      },
      {
        member: 'Team Member 2',
        role: 'Frontend UI/UX & Integration Specialist',
        focusArea: 'Dashboard components, State management, Data visualizer & Testing',
        tasks: [
          'Design UI components using clean modern design system',
          'Implement interactive telemetry charts and responsive dashboards',
          'Connect frontend to backend APIs with comprehensive error handling',
          'Prepare project documentation, diagrams, and demonstration deck'
        ]
      }
    );
  } else if (numTeam === 3) {
    teamDistribution.push(
      {
        member: 'Team Member 1 (Lead)',
        role: 'AI/ML & Algorithm Specialist',
        focusArea: 'Data curation, feature engineering, model training & optimization',
        tasks: [
          'Curate and annotate ground-truth datasets and synthetic generators',
          'Develop baseline and advanced neural network / ensemble models',
          'Calculate evaluation metrics (ROC-AUC, Precision, Latency) and ablation studies',
          'Package inference pipeline into optimized ONNX container'
        ]
      },
      {
        member: 'Team Member 2',
        role: 'Backend Architect & Systems Engineer',
        focusArea: 'REST/WebSocket APIs, Database schemas, Authentication & Cloud',
        tasks: [
          'Design and implement database schema with migrations and indexing',
          'Build secure API endpoints with rate limiting and input validation',
          'Bridge model inference engine with asynchronous background worker queues',
          'Deploy cloud infrastructure with Docker and automated health monitoring'
        ]
      },
      {
        member: 'Team Member 3',
        role: 'Frontend Engineer & Technical Writer',
        focusArea: 'Interactive UI, Visual data representations, User testing & Thesis report',
        tasks: [
          'Develop responsive React dashboard with real-time status indicators',
          'Build interactive graph/chart visualizers for inspection results',
          'Execute cross-browser UI/UX testing and user validation tests',
          'Draft final year capstone thesis, literature survey, and defense slides'
        ]
      }
    );
  } else {
    // 4 or 5+ members
    teamDistribution.push(
      {
        member: 'Team Member 1 (Project Lead)',
        role: 'Systems Architect & Cloud Engineer',
        focusArea: 'Overall architecture, DevOps, API gateway & Cloud deployment',
        tasks: [
          'Coordinate sprint milestones and Git pull request reviews',
          'Build core API gateway and manage Docker/Cloud deployment',
          'Implement system security, authentication, and error logging'
        ]
      },
      {
        member: 'Team Member 2',
        role: 'AI / Machine Learning Engineer',
        focusArea: 'Feature engineering, Model research, Training & Hyperparameter tuning',
        tasks: [
          'Clean dataset and develop synthetic edge-case simulation pipeline',
          'Train, evaluate, and benchmark multiple model candidates',
          'Optimize model size and export runtime weights'
        ]
      },
      {
        member: 'Team Member 3',
        role: 'Frontend UI/UX Specialist',
        focusArea: 'Client web application, charts, responsive layouts & animations',
        tasks: [
          'Build modern dark-mode user interface and component library',
          'Integrate real-time telemetry graphs, filters, and alert banners',
          'Ensure seamless client-side state synchronization with backend'
        ]
      },
      {
        member: 'Team Member 4' + (numTeam > 4 ? ' & 5' : ''),
        role: 'QA, Data Validation & Academic Research Lead',
        focusArea: 'Testing suites, Dataset ground truth, IEEE paper & Thesis documentation',
        tasks: [
          'Write automated unit and integration tests for API and model endpoints',
          'Perform edge-case stress testing and latency benchmarking',
          'Author project documentation, literature review, and academic thesis paper'
        ]
      }
    );
  }

  // 11. INNOVATION (3-5 realistic differentiators)
  const innovations = [
    {
      title: 'Explainable AI (XAI) Feature Attribution',
      description: 'Integrate lightweight TreeSHAP/LIME to explain why a particular anomaly score was predicted, turning the system from a "black box" into a trusted clinical/operational assistant.',
      impact: 'Significantly impresses academic project evaluators and publication reviewers.'
    },
    {
      title: 'Edge-Optimized Quantized Inference',
      description: 'Quantize floating-point FP32 weights into INT8, allowing the complete inference pipeline to run on low-power Raspberry Pi / standard laptops at < 35ms latency without requiring dedicated GPUs.',
      impact: 'Demonstrates practical engineering mastery over resource-constrained computing.'
    },
    {
      title: 'Self-Calibrating Dynamic Thresholding',
      description: 'Replace static hardcoded alarm thresholds with an exponential moving average (EMA) baseline that adapts dynamically to environmental drift and daily cyclic patterns.',
      impact: 'Reduces false-positive alarm rates by up to 45% compared to conventional rules engines.'
    },
    {
      title: 'Offline-First Local Storage Resilience',
      description: 'Equip the client and edge nodes with IndexedDB/SQLite caching so that telemetry is safely buffered during network disconnections and seamlessly syncs upon reconnection.',
      impact: 'Guarantees zero data loss in mission-critical environments.'
    }
  ];

  // 12. RISKS & PRACTICAL SOLUTIONS
  const risksAndSolutions = [
    {
      risk: 'Real-world dataset scarcity or strict privacy restrictions (e.g. HIPAA/GDPR)',
      severity: 'Medium',
      solution: 'Use certified de-identified open repositories (PhysioNet / Kaggle) supplemented by a calibrated synthetic data generation script with realistic Gaussian noise.'
    },
    {
      risk: 'Severe class imbalance (normal events heavily outnumbering rare critical anomalies)',
      severity: 'High',
      solution: 'Apply SMOTE (Synthetic Minority Over-sampling Technique), focal loss functions, and evaluate with PR-AUC / Macro-F1 rather than raw accuracy.'
    },
    {
      risk: 'Integration delays between Frontend and AI Backend near project deadline',
      severity: 'High',
      solution: 'Define clear OpenAPI / JSON schema contracts during Week 1 so the frontend team can develop with mock JSON payloads concurrently.'
    },
    {
      risk: 'Cloud hosting costs or server downtime during final project demonstration',
      severity: 'Medium',
      solution: 'Maintain a 100% self-contained local Docker compose environment on laptops alongside the cloud deployment for seamless offline viva defense.'
    }
  ];

  // 13. FIRST MILESTONE (Concrete immediate action step)
  const firstMilestone = {
    title: 'Initialize Workspace & Generate Baseline Dataset',
    timeframe: 'Immediate (Next 48 Hours)',
    oneActionTask: 'Clone the project repository, set up the virtual environment, and run the exploratory data script to produce your first 1,000 validated feature records.',
    checklist: [
      'Create GitHub repository with README and .gitignore',
      'Download the starter dataset or generate synthetic CSV samples',
      'Run a 10-line Python/Node script to verify record counts and column headers',
      'Confirm all team members have access to the repository'
    ]
  };

  // 14. PROJECT SUCCESS CRITERIA (Measurable MVP results)
  const successCriteria = [
    {
      criterion: 'Model Anomaly Detection Precision',
      target: '>= 85% Precision with >= 80% Recall on unseen test data',
      status: 'Target Metric'
    },
    {
      criterion: 'End-to-End Inference Latency',
      target: '< 50ms from API request ingestion to dashboard response',
      status: 'Target Metric'
    },
    {
      criterion: 'System Stability & Uptime',
      target: 'Zero crash errors across a continuous 2-hour telemetry simulation run',
      status: 'Target Metric'
    },
    {
      criterion: 'Academic Defense Readiness',
      target: 'Fully working live interactive demonstration + documented architecture viva slides',
      status: 'Target Metric'
    }
  ];

  return {
    projectId: project.id,
    generatedAt: new Date().toISOString(),
    studentProfile: {
      branch,
      skills,
      interests,
      teamSize,
      timeAvailable
    },
    meta: {
      opportunityScore: project.overallScore || 92,
      difficulty: numTeam === 1 ? 'Challenging (Solo)' : 'Moderate (Team-Feasible)',
      estimatedTimeline: timeAvailable,
      rank: project.rank || 1,
      trend: project.trend || 'Growing',
      scalePotential: project.scalePotential || 'Global'
    },
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
  };
}
