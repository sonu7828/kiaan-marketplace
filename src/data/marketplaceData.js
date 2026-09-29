// Kiaan Marketplace — Blueprint Mock Data
// NOTE: All pricing and specifications are clearly identified sample reference placeholders for Phase 1 review.

export const CATEGORIES = [
  {
    id: 'erp',
    name: 'Enterprise Resource Planning',
    shortName: 'ERP Systems',
    description: 'Unified financial, operations, and procurement management for modern enterprises.',
    count: 3,
    icon: 'Layers',
    previewType: 'erp',
    popularItems: ['KiaanERP Enterprise', 'ProcureFlow Suite']
  },
  {
    id: 'crm',
    name: 'Customer Relationship Mgmt',
    shortName: 'Omnichannel CRM',
    description: 'Pipeline tracking, lead scoring, deal velocity, and automated customer communication.',
    count: 4,
    icon: 'Users',
    previewType: 'crm',
    popularItems: ['Kiaan Pulse CRM', 'OmniDesk Chat']
  },
  {
    id: 'hrms',
    name: 'Human Resource Management',
    shortName: 'HRMS & Payroll',
    description: 'End-to-end workforce planning, attendance, compliance, and automated payroll runs.',
    count: 2,
    icon: 'Briefcase',
    previewType: 'hrms',
    popularItems: ['Kiaan Workforce HRMS', 'BioBridge Sync']
  },
  {
    id: 'inventory',
    name: 'Supply Chain & Inventory',
    shortName: 'Inventory & WMS',
    description: 'Multi-warehouse stock balancing, barcode dispatch, SKU tracking, and supplier portals.',
    count: 3,
    icon: 'Package',
    previewType: 'inventory',
    popularItems: ['Kiaan Flow Inventory', 'DepotTrack WMS']
  },
  {
    id: 'pos',
    name: 'Billing, POS & Invoicing',
    shortName: 'Billing & POS',
    description: 'High-speed counter checkout, GST/tax compliant invoicing, and ledger sync.',
    count: 3,
    icon: 'CreditCard',
    previewType: 'pos',
    popularItems: ['Kiaan Swift POS', 'GST Express Desk']
  },
  {
    id: 'industry',
    name: 'Industry Solutions',
    shortName: 'Industry Solutions',
    description: 'Specialized systems for manufacturing, retail, logistics, healthcare, and services.',
    count: 3,
    icon: 'Layers',
    previewType: 'erp',
    popularItems: ['SteelFab Manufacturing', 'MedClinic Suite']
  },
  {
    id: 'automation',
    name: 'AI & Business Automation',
    shortName: 'AI & Automation',
    description: 'Event-driven triggers, document extraction, API orchestrators, and smart workflows.',
    count: 2,
    icon: 'Cpu',
    previewType: 'automation',
    popularItems: ['Kiaan Flow AI Engine', 'DocuParse OCR']
  }
];

export const PRODUCTS = [
  {
    id: 'kiaan-erp-core',
    name: 'KiaanERP Enterprise',
    shortDesc: 'Comprehensive enterprise operational core with multi-entity consolidation, procurement, and financial reporting.',
    category: 'Enterprise Resource Planning',
    categoryId: 'erp',
    isFlagship: true,
    capabilityTags: ['Multi-Entity Accounting', 'Procurement Engine', 'GST Compliance', 'Audit Trail', 'REST API'],
    priceNumeric: 48500,
    priceDisplay: '₹48,500',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology Core',
    readinessBadge: 'Production Stable',
    version: 'v4.2.0',
    previewType: 'erp',
    specs: {
      stack: 'React + Node.js (Express) + MySQL',
      deployment: 'Self-hosted (Ubuntu/Debian, Docker, AWS/GCP)',
      licensingModel: 'Perpetual Single Domain with Cryptographic Token Verification',
      updatesIncluded: '12 Months security updates & minor releases included',
      sourceCode: 'Standard Compiled Bundle (Developer Source Available)',
      database: 'Relational MySQL Schema with Migration Scripts'
    },
    demoUrl: '#demo-erp',
    features: [
      'Multi-currency ledger with real-time balance sheet generation',
      'Automated purchase order workflows with multi-level approval hierarchies',
      'Role-based granular access control (RBAC) with immutable audit logging',
      'Centralized cloud licensing integration with offline grace periods'
    ]
  },
  {
    id: 'kiaan-crm-pulse',
    name: 'Kiaan Pulse CRM',
    shortDesc: 'High-velocity sales pipeline, omnichannel ticket integration, and automated lead nurturing system.',
    category: 'Customer Relationship Mgmt',
    categoryId: 'crm',
    isFlagship: false,
    capabilityTags: ['Visual Deal Pipeline', 'WhatsApp & Email Sync', 'Lead Scoring', 'Analytics'],
    priceNumeric: 28000,
    priceDisplay: '₹28,000',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology',
    readinessBadge: 'Production Stable',
    version: 'v3.1.2',
    previewType: 'crm',
    specs: {
      stack: 'React + Node.js + MySQL + Socket.io',
      deployment: 'Docker or Native Linux Service',
      licensingModel: 'Perpetual Domain Bind',
      updatesIncluded: '12 Months standard updates',
      sourceCode: 'Full Developer Source Available'
    },
    demoUrl: '#demo-crm',
    features: [
      'Visual drag-and-drop Kanban deal pipeline with custom stages',
      'Integrated communication inbox syncing email, SMS, and WhatsApp alerts',
      'Sales rep activity tracking and commission calculation module',
      'Webhook engine for seamless ERP & landing page integrations'
    ]
  },
  {
    id: 'kiaan-hrms-workforce',
    name: 'Kiaan Workforce HRMS',
    shortDesc: 'Full employee lifecycle management from onboarding, biometric attendance, leaves, to automated statutory payroll.',
    category: 'Human Resource Management',
    categoryId: 'hrms',
    isFlagship: false,
    capabilityTags: ['Statutory Payroll', 'Biometric API', 'Leave Approvals', 'Employee Portal'],
    priceNumeric: 34500,
    priceDisplay: '₹34,500',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology',
    readinessBadge: 'Production Stable',
    version: 'v2.8.0',
    previewType: 'hrms',
    specs: {
      stack: 'React + Node.js + MySQL',
      deployment: 'Linux / Docker / Cloud VM',
      licensingModel: 'Perpetual Single Domain Bind',
      updatesIncluded: '12 Months compliance updates'
    },
    demoUrl: '#demo-hrms',
    features: [
      'Configurable payroll rules for PF, ESI, TDS, PT, and gratuity calculations',
      'Direct hardware bridge for standard biometric and RFID attendance logs',
      'Employee self-service portal for payslips, tax declarations, and claims',
      'Comprehensive organization charts and document vault'
    ]
  },
  {
    id: 'kiaan-inventory-flow',
    name: 'Kiaan Flow Inventory & WMS',
    shortDesc: 'Multi-warehouse stock tracking, real-time batch & expiry alerts, and barcode-ready dispatch management.',
    category: 'Supply Chain & Inventory',
    categoryId: 'inventory',
    isFlagship: false,
    capabilityTags: ['Multi-Warehouse', 'Batch/Lot Tracking', 'Barcode Scanner', 'Reorder Engine'],
    priceNumeric: 31000,
    priceDisplay: '₹31,000',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology',
    readinessBadge: 'Production Stable',
    version: 'v3.0.4',
    previewType: 'inventory',
    specs: {
      stack: 'React + Node.js + MySQL + Redis Cache',
      deployment: 'Self-hosted or Hybrid Cloud',
      licensingModel: 'Perpetual Single Domain Bind',
      updatesIncluded: '12 Months updates'
    },
    demoUrl: '#demo-inventory',
    features: [
      'Real-time inventory valuation using FIFO and weighted average methods',
      'Automated reorder point triggers with predictive purchase draft creation',
      'Fast barcode generation and handheld terminal scanning endpoints',
      'Inter-warehouse stock transfer with in-transit tracking'
    ]
  },
  {
    id: 'kiaan-pos-retail',
    name: 'Kiaan Swift POS & Billing',
    shortDesc: 'Ultra-fast counter billing engine with offline resilience, cash drawer triggers, and instant GST invoice printing.',
    category: 'Billing, POS & Invoicing',
    categoryId: 'pos',
    isFlagship: false,
    capabilityTags: ['Offline Mode', 'Fast Keyboard Shortcuts', 'Thermal Printing', 'Daily Reconciliation'],
    priceNumeric: 22500,
    priceDisplay: '₹22,500',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology',
    readinessBadge: 'Production Stable',
    version: 'v2.4.1',
    previewType: 'pos',
    specs: {
      stack: 'React + SQLite/IndexedDB (Client) + Node/MySQL (Sync)',
      deployment: 'Counter Terminal / Web App',
      licensingModel: 'Per Counter / Domain Bind',
      updatesIncluded: '12 Months updates'
    },
    demoUrl: '#demo-pos',
    features: [
      'Sub-second item scanning with full keyboard navigation and zero lag',
      'Offline-first architecture with automatic sync when connectivity resumes',
      'Multiple payment splits (Cash, Card, UPI, Store Credit) in a single bill',
      'Shift-wise cash drawer reconciliation and end-of-day Z-reports'
    ]
  },
  {
    id: 'kiaan-ai-orchestrator',
    name: 'Kiaan Flow AI Engine',
    shortDesc: 'Event-driven process orchestration, automated invoice OCR extraction, and contextual customer support bots.',
    category: 'AI & Business Automation',
    categoryId: 'automation',
    isFlagship: false,
    capabilityTags: ['Document OCR', 'Workflow Builder', 'Smart Triggers', 'LLM Connectors'],
    priceNumeric: 42000,
    priceDisplay: '₹42,000',
    pricingNote: '[Sample Reference Tier — Single Domain Perpetual]',
    author: 'Kiaan Technology',
    readinessBadge: 'Release Candidate',
    version: 'v1.6.0',
    previewType: 'automation',
    specs: {
      stack: 'React + Node.js + Python Microservice + MySQL',
      deployment: 'Dedicated Linux Host / Docker',
      licensingModel: 'Perpetual Core Bind',
      updatesIncluded: '12 Months updates & model integrations'
    },
    demoUrl: '#demo-ai',
    features: [
      'Automatic invoice PDF parsing with structured data extraction into ERP',
      'Visual drag-and-drop workflow automation trigger system',
      'Self-hosted knowledge base assistant for employee SOP guidance',
      'Universal webhook listener and scheduled event dispatcher'
    ]
  }
];

export const INDUSTRY_SOLUTIONS = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Assembly',
    eyebrow: 'Production & Shop Floor',
    description: 'End-to-end bill of materials (BOM), shop floor scheduling, inventory replenishment, and batch tracing for precision manufacturing.',
    recommendedPackages: ['KiaanERP Enterprise', 'Kiaan Flow Inventory & WMS'],
    highlights: [
      'Multi-level Bill of Materials (BOM) explosion',
      'Work order tracking & machine run-time allocation',
      'Raw material shortage forecasting & vendor scoring',
      'Traceable batch quality inspection stages'
    ],
    deploymentTimeline: 'Self-hosted Docker / Linux environment'
  },
  {
    id: 'retail',
    title: 'Retail & Omnichannel Commerce',
    eyebrow: 'Fast-Moving Consumer Retail',
    description: 'Synchronize brick-and-mortar checkout points with central warehouse inventory, real-time GST invoicing, and customer loyalty rewards.',
    recommendedPackages: ['Kiaan Swift POS & Billing', 'Kiaan Flow Inventory & WMS', 'Kiaan Pulse CRM'],
    highlights: [
      'Unified inventory catalog across all counters and warehouses',
      'Sub-second billing with offline mode survival',
      'Integrated loyalty points and customer purchase history',
      'Centralized daily cash and digital payment settlement'
    ],
    deploymentTimeline: 'Counter terminal & server deployment'
  },
  {
    id: 'logistics',
    title: 'Logistics, Fleet & Distribution',
    eyebrow: 'Supply Chain & Freight',
    description: 'Dispatch planning, consignment tracking, multi-depot stock transfers, and automated transporter rate calculations.',
    recommendedPackages: ['Kiaan Flow Inventory & WMS', 'KiaanERP Enterprise'],
    highlights: [
      'Consignment generation with barcoded packing slips',
      'In-transit stock visibility across transit hubs',
      'Transporter bill verification and freight ledger sync',
      'Proof of delivery (POD) document attachment'
    ],
    deploymentTimeline: 'Standard Linux / Cloud VM'
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinical Operations',
    eyebrow: 'Hospitality & Health Facilities',
    description: 'Patient appointment scheduling, pharmacy batch & expiry management, doctor consultation billing, and staff shifts.',
    recommendedPackages: ['Kiaan Workforce HRMS', 'Kiaan Swift POS & Billing', 'Kiaan Pulse CRM'],
    highlights: [
      'Strict medicine batch and expiry date dispatch locks',
      'Doctor roster management and attendance shifts',
      'IPD / OPD billing workflows with insurance claims logging',
      'Secure patient communication and reminder workflows'
    ],
    deploymentTimeline: 'Self-hosted clinical server'
  },
  {
    id: 'services',
    title: 'Professional & Financial Services',
    eyebrow: 'Consulting, Legal & IT Agencies',
    description: 'Project milestone billing, timesheet tracking, deal velocity management, and automated tax reporting for consulting firms.',
    recommendedPackages: ['Kiaan Pulse CRM', 'KiaanERP Enterprise', 'Kiaan Workforce HRMS'],
    highlights: [
      'Timesheet logging linked directly to project deliverables',
      'Milestone-based retainer and invoicing triggers',
      'Employee utilization and project margin analysis',
      'Client relationship history and document storage'
    ],
    deploymentTimeline: 'Cloud or dedicated hosting'
  },
  {
    id: 'tech',
    title: 'Technology & SaaS Companies',
    eyebrow: 'ISVs & Digital Platforms',
    description: 'Turnkey foundational codebases with integrated licensing servers, customer billing, and authentication ready for white-labeling.',
    recommendedPackages: ['Kiaan Flow AI Engine', 'Kiaan Pulse CRM', 'KiaanERP Enterprise'],
    highlights: [
      'Clean modular MVC / Service layer architecture in Node.js & React',
      'Ready-to-use centralized cryptographic licensing system',
      'Complete REST APIs with OpenAPI specifications',
      'Zero vendor lock-in with clean full source ownership'
    ],
    deploymentTimeline: 'Instant package download upon license issue'
  }
];

export const TRUST_PILLARS = [
  {
    id: 'ip-ownership',
    title: '100% In-House Intellectual Property',
    description: 'Every software product is designed and developed in-house by Kiaan Technology. Zero unverified third-party dependencies that compromise commercial reliability.',
    metric: '100%',
    metricLabel: 'In-House Codebase',
    icon: 'ShieldCheck'
  },
  {
    id: 'licensing',
    title: 'Cryptographic License Cloud',
    description: 'Enterprise domain verification powered by asymmetric RSA/ECDSA signed tokens. Enforces offline grace period safeguards without unexpected service lockouts.',
    metric: 'Signed',
    metricLabel: 'Token Verification',
    icon: 'KeyRound'
  },
  {
    id: 'independence',
    title: 'Zero Vendor Lock-in',
    description: 'Deploy on your own infrastructure (AWS, DigitalOcean, bare-metal Linux). Your customer, inventory, and financial databases remain strictly under your control.',
    metric: 'Sovereign',
    metricLabel: 'Self-Hosted Data',
    icon: 'Server'
  },
  {
    id: 'engineering',
    title: 'Direct Engineering Support',
    description: 'Collaborate directly with the engineers who built the system. Access dedicated adaptation services, migration support, and security maintenance.',
    metric: 'Direct',
    metricLabel: 'Engineering Support',
    icon: 'Headphones'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Browse & Test Live Demos',
    summary: 'Evaluate real software interfaces and technical capabilities.',
    detail: 'Explore full product specifications, test live interactive environments with sample data, and inspect relational database schemas and runtime requirements directly.'
  },
  {
    step: '02',
    title: 'Transparent Verified Purchase',
    summary: 'Clear perpetual licensing with zero hidden recurring fees.',
    detail: 'Select your license tier (Single Domain, Multi-Branch, or Developer Source). Automated GST tax invoice generated upon verified webhook confirmation.'
  },
  {
    step: '03',
    title: 'Secure Customer Portal Access',
    summary: 'Instant download of signed release archives and tools.',
    detail: 'Access your authenticated Customer Portal to download verified release packages, deployment scripts, documentation, and cryptographic license tokens.'
  },
  {
    step: '04',
    title: 'Instant Cloud Activation',
    summary: 'Bind to your production domain in seconds.',
    detail: 'Deploy to your server, enter your License Key, and our License Cloud returns a signed activation token. Periodic verification ensures continuous security.'
  }
];

export const CUSTOMIZATION_SERVICES = [
  {
    id: 'module-extension',
    title: 'Custom Module Development',
    badge: 'Tailored Logic',
    description: 'Need specialized business rules, custom reports, or proprietary tax algorithms? Our engineers build dedicated modules that plug cleanly into standard Kiaan products.',
    timeline: 'Scope-Based Estimate',
    deliverables: ['Custom Express routes', 'React UI components', 'MySQL schema migrations', 'Integration unit tests']
  },
  {
    id: 'third-party-integration',
    title: 'ERP & Hardware Integrations',
    badge: 'Connectivity',
    description: 'Connect Kiaan software with existing SAP/Tally accounting, proprietary IoT sensors, weighbridges, custom payment gateways, or legacy internal databases.',
    timeline: 'Scope-Based Estimate',
    deliverables: ['Bi-directional sync workers', 'Webhook handlers', 'Failover logging queues', 'Full API documentation']
  },
  {
    id: 'white-labeling',
    title: 'Enterprise White-Labeling',
    badge: 'Brand Sovereignty',
    description: 'Deploy Kiaan software under your own corporate branding, custom domain names, specific color palettes, and dedicated mobile application builds.',
    timeline: 'Scope-Based Estimate',
    deliverables: ['Custom design tokens applied', 'Branded email templates', 'Custom favicon & splash screens', 'Signed mobile APK builds']
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Engineering SLA',
    badge: 'Mission Critical',
    description: 'For operations where downtime is not an option. Includes dedicated Slack/WhatsApp channels, priority issue response, and guaranteed upgrade assistance.',
    timeline: 'Annual Retainer',
    deliverables: ['Direct engineer access', 'Periodic security reviews', 'Automated backup validation', 'Priority patch backports']
  }
];

export const FAQS = [
  {
    q: 'Can we host the purchased software on our own AWS, GCP, or on-premise servers?',
    a: 'Yes, absolutely. All Kiaan software is architected for sovereign self-hosting. You can deploy packages to standard Ubuntu/Debian Linux virtual machines, Docker containers, or any cloud environment of your choice (AWS, GCP, DigitalOcean, Azure). Your database and business records remain strictly under your control.'
  },
  {
    q: 'How does domain-based license activation work if our domain or server changes?',
    a: 'Each license is bound to an authorized domain via our centralized License Cloud. If your company rebrands or migrates servers, you can initiate a Domain Transfer request directly inside your Customer Portal. Once verified, the old domain is cleanly released and your new domain is issued an updated signed token.'
  },
  {
    q: 'Is complete source code provided with the software packages?',
    a: 'We offer distinct licensing tiers: Standard Enterprise Deployments provide clean, production-ready build packages with configuration endpoints. For organizations requiring deep customization, we offer Developer Source Tiers with full, unobfuscated React frontend and Node.js backend codebases.'
  },
  {
    q: 'What happens if our production server loses internet connection to the License Cloud?',
    a: 'Our licensing architecture features an intelligent offline grace period policy. Once a license token is cryptographically signed and stored locally on your server, your application remains fully functional even during prolonged internet outages. Periodic re-verification is handled quietly in the background without user disruption.'
  },
  {
    q: 'How are software updates and security patches delivered?',
    a: 'When an update is released, you receive an automated notification in your Customer Portal. You can review detailed changelogs and release notes, and download the new verified release archive. Automated database migration scripts are included with every minor and major version bump.'
  },
  {
    q: 'Can Kiaan Technology customize features specifically for our business workflows?',
    a: 'Yes. Kiaan Technology provides direct bespoke engineering services. Because our in-house engineering team authored the complete platform architecture, we can adapt, extend, or build custom modules tailored exactly to your unique operational requirements.'
  }
];
