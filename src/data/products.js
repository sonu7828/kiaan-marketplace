/**
 * ============================================================================
 * KIAAN MARKETPLACE — CENTRALIZED PRODUCT CATALOG
 * ============================================================================
 * 
 * LOCATION: src/data/products.js
 * Comprehensive software catalog with full enterprise metadata, multiple screenshots,
 * live demo accounts, technical specifications, server requirements, and setup instructions.
 * ============================================================================
 */

export const PRODUCTS = [
  {
    id: 'recruitflow-pro-saas',
    slug: 'recruitflow-pro-saas',
    name: 'RecruitFlow Pro – Complete Recruitment SaaS Platform',
    category: 'HRMS & Recruitment SaaS',
    categoryId: 'hrms',
    shortDesc: 'Modern and feature-rich Laravel 13 Job Board & Recruitment SaaS platform designed for agencies, businesses, and staffing companies.',
    fullDesc: 'RecruitFlow Pro is a modern and feature-rich Laravel 13 Job Board & Recruitment SaaS platform designed for recruitment agencies, businesses, staffing companies and organizations. It provides dedicated experiences for Administrators, Employers and Jobseekers, along with a professional public-facing job portal. RecruitFlow Pro brings job publishing, candidate sourcing, applications, ATS workflows, employer management, subscriptions, content management and SEO tools together in one powerful platform.',
    whoShouldUse: 'Recruitment agencies, businesses, staffing companies, HR consultancies, and tech entrepreneurs looking to launch a professional job board, recruitment portal, or recruitment SaaS platform.',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://recruitflowpro.onlinefreegamezone.online/',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/recruitflow-pro',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Super Admin Command Center & Metrics Dashboard' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Employer ATS Candidate Pipeline & Interview Scheduler' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Jobseeker Career Portal & Resume Builder Dashboard' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', 
        caption: 'SaaS Subscription Plans & Billing Gateway Engine' 
      }
    ],
    demoAccounts: [
      { 
        role: 'Super Admin Console', 
        url: 'https://recruitflowpro.onlinefreegamezone.online/admin/login', 
        email: 'admin@demo.com', 
        password: 'password',
        note: 'Full command center access for platform monitoring, employer verification, and SEO.'
      },
      { 
        role: 'Employer / Business Workspace', 
        url: 'https://recruitflowpro.onlinefreegamezone.online/', 
        email: 'demo@employer.com', 
        password: 'Demo@123',
        note: 'Post jobs, review applicant resumes, manage ATS pipeline, and schedule interviews.'
      },
      { 
        role: 'Jobseeker / Student Portal', 
        url: 'https://recruitflowpro.onlinefreegamezone.online/', 
        email: 'demo@student.com', 
        password: 'Demo@123',
        note: 'Browse job opportunities, track submitted applications, and manage career profile.'
      }
    ],
    techSpecs: {
      framework: 'Laravel 13',
      language: 'PHP 8.2, PHP 8.3',
      database: 'MySQL 8.0+ / MariaDB',
      frontend: 'Modern Responsive UI (Blade, Tailwind/Vanilla CSS, Vanilla JS)',
      architecture: 'Laravel MVC Architecture & Repository Service Pattern',
      filesIncluded: '.php, .css, .html, .sql, .xml, JavaScript .js, Dockerfile, Documentation',
      softwareVersion: 'v2.4.0',
      firstRelease: '14 August 2026',
      lastUpdate: '26 August 2026'
    },
    requirements: [
      'PHP 8.2 or higher (PHP 8.3 fully supported)',
      'Laravel 13 framework core runtime',
      'MySQL 8.0+ or MariaDB database server',
      'Apache or Nginx Web Server with mod_rewrite enabled',
      'Composer package manager installed on server',
      'Required PHP Extensions (OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, cURL, Fileinfo, GD)',
      'URL Rewriting Support enabled in web server host configuration',
      'SSL/HTTPS Certificate Recommended for production data security',
      'Writable Laravel Storage & Bootstrap Cache Directories (chmod 775)'
    ],
    installInstructions: [
      'Upload and unpack the Laravel application zip bundle onto your production web hosting server.',
      'Create a dedicated MySQL database and database user with full GRANT privileges.',
      'Copy .env.example to .env and configure database connection parameters (DB_DATABASE, DB_USERNAME, DB_PASSWORD).',
      'Configure application domain URL (APP_URL) and SMTP email server settings.',
      'Install Composer dependencies: composer install --optimize-autoloader --no-dev',
      'Generate encryption key: php artisan key:generate',
      'Run database schema migrations and seed initial platform data: php artisan migrate --seed',
      'Link public storage for candidate resume and logo uploads: php artisan storage:link',
      'Point your web server (Nginx/Apache) document root to the /public folder.',
      'Access the portal in your browser and log in to the Super Admin Command Center using default credentials.'
    ],
    featureGroups: [
      {
        title: 'Super Admin Management',
        icon: 'ShieldCheck',
        items: [
          'Command Center Executive Dashboard',
          'Employer Verification & Account Controls',
          'Jobseeker Directory & Profile Verification',
          'Job Posting Moderation & Quality Check',
          'Application Monitoring & Real-time Metrics',
          'SEO Keywords & Meta Tag Management',
          'SEO Landing Pages Dynamic Engine',
          'Job Categories & Industry Management',
          'CMS Content, Blog & Announcements Moderation',
          'Campus Hiring & Bulk Placement Portal',
          'Security, Role Permissions & System Logs'
        ]
      },
      {
        title: 'Employer Features & ATS Pipeline',
        icon: 'Briefcase',
        items: [
          'Dedicated Employer Workspace & Company Profile',
          'Create & Publish Job Vacancies with Templates',
          'Visual Kanban ATS Candidate Pipeline',
          'Interview Scheduler with Calendar Sync',
          'Candidate Talent Pool & Direct Sourcing Search',
          'Team Members & HR Role Permission Management',
          'Real-time Chat Hub with Prospective Candidates',
          'Subscription, Plan Invoices & Usage Tracking'
        ]
      },
      {
        title: 'Jobseeker Portal & Career Experience',
        icon: 'User',
        items: [
          'Professional Jobseeker Career Dashboard',
          'Advanced Job Search with Dynamic Filters & City SEO',
          'One-Click Job Applications & Application Tracking',
          'Dynamic Resume Builder & PDF Attachment Manager',
          'Automated Instant Job Match Alerts',
          'Skill Badges, Gamification Points & Profile Views Counter',
          'Referral Engine & Career Milestones Rewards',
          'In-depth Profile Analytics & Visibility Score'
        ]
      },
      {
        title: 'SaaS Monetization & Invoicing',
        icon: 'CreditCard',
        items: [
          'Tiered Subscription Plans Management',
          'Automated Stripe, Razorpay & Gateway Billing',
          'Employer Job Posting Limits & Quota Tracking',
          'AI Resume Screening Credit Management',
          'Instant PDF Tax Invoices & GST Reporting'
        ]
      },
      {
        title: 'SEO & Content Management Engine',
        icon: 'Globe',
        items: [
          'Automated High-Performance SEO Landing Pages',
          'Job & Category Structured Schema (JSON-LD)',
          'City-specific & Location SEO Routing',
          'Integrated Blog & Career Guidance Publisher',
          'Custom CMS Static Pages & Compliance Documents'
        ]
      }
    ],
    features: [
      'Modern Laravel 13 Recruitment SaaS with complete MVC codebase',
      'Super Admin Command Center with real-time analytics',
      'Employer Workspace with full ATS candidate pipeline',
      'Jobseeker Dashboard with resume builder and alerts',
      'Subscription & SaaS Billing with customizable plans',
      'Live Chat & Real-Time Communication Hub',
      'Advanced SEO & Dynamic City Landing Pages Engine',
      '100% Responsive interface for desktop, tablet, and mobile'
    ],
    modules: [
      'Super Admin Command Center',
      'Employer Dashboard & ATS Pipeline',
      'Jobseeker Portal & Resume Manager',
      'SaaS Subscription & Billing Engine',
      'Live Chat & Notifications System',
      'SEO & Content Management Suite'
    ],
    techStack: 'Laravel 13, PHP 8.2/8.3, MySQL 8.0+, Tailwind/Vanilla CSS, Blade Templates, Docker Ready',
    pricing: {
      isApproved: true,
      priceDisplay: '₹24,999',
      pricingNote: 'Regular Perpetual License. One-time fee, 100% self-hosted, includes complete source code.'
    },
    pricingTiers: {
      regular: '₹24,999',
      extended: '₹64,999',
      installationService: '₹2,999'
    },
    tags: ['job board', 'laravel', 'job portal', 'recruitment', 'saas', 'ats', 'candidate management', 'recruitment platform', 'employer dashboard', 'applicant tracking'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: true,
    isFeatured: true
  },
  {
    id: 'kiaan-erp-enterprise',
    slug: 'kiaan-erp-enterprise',
    name: 'KiaanERP Enterprise',
    category: 'Enterprise Resource Planning',
    categoryId: 'erp',
    shortDesc: 'Complete business management software for finance, inventory, purchasing, and operations.',
    fullDesc: 'KiaanERP Enterprise is an all-in-one business software solution designed to streamline your daily commercial operations. It unites financial accounting, multi-currency ledger management, procurement workflows, and real-time operational reporting into a single intuitive system that you can install on your own servers or cloud.',
    whoShouldUse: 'Mid-sized to large enterprises, distributors, and manufacturing businesses that need centralized financial control, automated purchasing, and transparent operational ledgers.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://erp.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/erp-enterprise',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Operational Dashboard & Real-Time Executive KPI Analytics' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Multi-Currency Financial Ledger & Consolidated Profit/Loss' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Automated Procurement Approvals & Vendor Price History' 
      }
    ],
    demoAccounts: [
      { 
        role: 'System Administrator', 
        url: 'https://erp.kiaantechnology.com/admin', 
        email: 'admin@kiaantechnology.com', 
        password: 'password',
        note: 'Complete administrative access to general ledger, user permissions, and tax configuration.'
      },
      { 
        role: 'Finance Officer / Auditor', 
        url: 'https://erp.kiaantechnology.com', 
        email: 'finance@demo.com', 
        password: 'Demo@123',
        note: 'Review balance sheets, bank reconciliations, and voucher journals.'
      }
    ],
    techSpecs: {
      framework: 'Node.js (Express) & React 19',
      language: 'TypeScript / Node.js 20 LTS',
      database: 'MySQL 8.0+ / PostgreSQL 16+',
      frontend: 'React 19 SPA with Vite & Modern Glassmorphism UI',
      architecture: 'Clean Architecture with Domain-Driven Design & RESTful APIs',
      filesIncluded: 'Source Code, Docker Compose cluster, SQL schema, Environment config, Documentation',
      softwareVersion: 'v3.1.2',
      firstRelease: 'January 2026',
      lastUpdate: 'September 2026'
    },
    requirements: [
      'Node.js 20 LTS or higher / Docker Engine 24+',
      'MySQL 8.0+ or MariaDB 10.11+ database server',
      'Linux Ubuntu 22.04 / 24.04 LTS or Cloud VPS',
      'Minimum 2 CPU Cores and 4 GB RAM recommended',
      'Nginx Web Server for Reverse Proxy and SSL Termination',
      'SSL/HTTPS Certificate (Let\'s Encrypt supported)'
    ],
    installInstructions: [
      'Clone repository bundle or extract deployment archive on your Linux host.',
      'Copy .env.example to .env and configure DB_HOST, DB_USER, DB_PASSWORD, and PORT.',
      'Launch container cluster using Docker Compose: docker compose up -d',
      'Execute database initialization migration: npm run db:migrate',
      'Configure Nginx reverse proxy with SSL certificate pointing to port 3000.',
      'Open browser and log in with default administrator credentials.'
    ],
    featureGroups: [
      {
        title: 'Financial Accounting & General Ledger',
        icon: 'CreditCard',
        items: [
          'Multi-Currency General Ledger with Real-Time Balance Sheet',
          'Automated Profit & Loss, Trial Balance, and Cash Flow Reports',
          'Bank Statement Reconciliation with Automated Matching',
          'Tax & GST-Compliant Invoicing and Voucher Generation'
        ]
      },
      {
        title: 'Procurement & Vendor Hierarchy',
        icon: 'Briefcase',
        items: [
          'Purchase Requisition and Multi-Level Approval Workflows',
          'Vendor Performance Rating and Historical Price Comparison',
          'Automated Goods Received Notes (GRN) Verification'
        ]
      },
      {
        title: 'Enterprise Security & Governance',
        icon: 'ShieldCheck',
        items: [
          'Granular Role-Based Staff Permissions (RBAC)',
          'Immutable Audit Logs for All Financial Ledger Entries',
          'Two-Factor Authentication (2FA) Support'
        ]
      }
    ],
    features: [
      'Multi-currency financial ledger with real-time balance sheets and profit/loss reports',
      'Automated purchase order workflows with customizable multi-step approval hierarchies',
      'GST-compliant invoicing, tax calculation, and automated ledger synchronization',
      'Role-based staff permissions with detailed activity audit logs for accounting integrity',
      'Bank reconciliation and automated payment receipt generation',
      'REST APIs for seamless integration with external business applications'
    ],
    modules: [
      'Financial Accounting & General Ledger',
      'Purchase Orders & Vendor Management',
      'Sales Orders & Customer Invoicing',
      'Multi-Branch Consolidated Reporting',
      'Staff Access Roles & Permissions',
      'Tax & GST Calculation Engine'
    ],
    techStack: 'React frontend, Node.js (Express) backend, MySQL relational database. Compatible with Linux (Ubuntu/Debian), Docker, AWS, or GCP.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹49,999',
      pricingNote: 'Perpetual single-domain license with dedicated server deployment assistance.'
    },
    pricingTiers: {
      regular: '₹49,999',
      extended: '₹99,999',
      installationService: '₹4,999'
    },
    tags: ['erp', 'financial accounting', 'procurement', 'multi-currency', 'gst invoicing', 'docker', 'self-hosted', 'mysql'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: true,
    isFeatured: true
  },
  {
    id: 'kiaan-pulse-crm',
    slug: 'kiaan-pulse-crm',
    name: 'Kiaan Pulse CRM',
    category: 'Customer Relationship Mgmt',
    categoryId: 'crm',
    shortDesc: 'Sales pipeline, lead management, and automated customer communication software.',
    fullDesc: 'Kiaan Pulse CRM gives your sales and support teams complete visibility into client relationships. Track prospective deals through visual Kanban stages, automate follow-up reminders, synchronize customer communications, and measure sales representative velocity with actionable reporting.',
    whoShouldUse: 'B2B sales teams, agencies, real estate firms, and service consultancies looking to organize client leads and prevent lost sales opportunities.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://crm.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/pulse-crm',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Visual Deal Pipeline Kanban with Probability Weights' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Sales Representative Performance & Conversion Velocity' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Omnichannel Contact Activity Timeline' 
      }
    ],
    demoAccounts: [
      { 
        role: 'Sales Director', 
        url: 'https://crm.kiaantechnology.com', 
        email: 'sales.director@demo.com', 
        password: 'password',
        note: 'Oversee full pipeline, assign leads, and inspect conversion reports.'
      },
      { 
        role: 'Account Executive', 
        url: 'https://crm.kiaantechnology.com', 
        email: 'rep@demo.com', 
        password: 'Demo@123',
        note: 'Manage individual lead stages, log call notes, and generate proposals.'
      }
    ],
    techSpecs: {
      framework: 'Node.js & React 19',
      language: 'JavaScript / Node.js 20',
      database: 'MySQL 8.0+ / Redis for WebSockets',
      frontend: 'React 19 SPA, Tailwind/Vanilla CSS, Lucide Icons',
      architecture: 'Event-Driven Real-time WebSocket Architecture',
      filesIncluded: 'Frontend bundle, Node API backend, SQL migrations, Docker Compose, Postman collection',
      softwareVersion: 'v2.1.0',
      firstRelease: 'March 2026',
      lastUpdate: 'September 2026'
    },
    requirements: [
      'Node.js 20 LTS or Docker Engine',
      'MySQL 8.0+ Database Server',
      'Redis 7.0+ for WebSocket state (optional, included in Docker)',
      '1 GB RAM minimum for production container',
      'Linux VPS (Ubuntu 22.04 or 24.04)'
    ],
    installInstructions: [
      'Download package and extract on your server.',
      'Configure database credentials in .env file.',
      'Execute: npm install && npm run build',
      'Run database schema setup: npm run db:migrate',
      'Start application with PM2 or Docker Compose: docker compose up -d'
    ],
    featureGroups: [
      {
        title: 'Lead & Pipeline Management',
        icon: 'Briefcase',
        items: [
          'Visual Drag-and-Drop Deal Stages',
          'Lead Scoring & Stage Probability Weighting',
          'Automated Lead Assignment by Territory'
        ]
      },
      {
        title: 'Omnichannel Communication',
        icon: 'MessageSquare',
        items: [
          'Unified Email & Call Activity Logging',
          'WhatsApp Webhook Notification Bridge',
          'Automated Task Reminders for Follow-ups'
        ]
      }
    ],
    features: [
      'Visual drag-and-drop Kanban pipeline with custom deal stages and probability weights',
      'Omnichannel contact timeline syncing email, phone notes, and WhatsApp messages',
      'Automated task reminders for rep follow-ups, quotes, and contract expirations',
      'Sales performance dashboards tracking revenue targets and conversion rates'
    ],
    modules: [
      'Lead & Contact Management',
      'Visual Deal Pipeline',
      'Communication Timeline',
      'Sales Targets & Activity Tracking',
      'Proposal & Quote Generator'
    ],
    techStack: 'React, Node.js (Express), MySQL database, WebSocket for real-time lead updates.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹29,999',
      pricingNote: 'Perpetual license with full deployment support on your own server.'
    },
    pricingTiers: {
      regular: '₹29,999',
      extended: '₹69,999',
      installationService: '₹2,999'
    },
    tags: ['crm', 'sales pipeline', 'leads', 'kanban', 'self-hosted', 'react', 'mysql'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-workforce-hrms',
    slug: 'kiaan-workforce-hrms',
    name: 'Kiaan Workforce HRMS',
    category: 'Human Resource Management',
    categoryId: 'hrms',
    shortDesc: 'Employee lifecycle, biometric attendance, leave tracking, and payroll management.',
    fullDesc: 'Kiaan Workforce HRMS handles complete employee operations from recruitment and onboarding to biometric attendance tracking, leave requests, and automated statutory payroll runs with PF, ESI, and tax deductions.',
    whoShouldUse: 'Companies with 20 to 2,000+ employees seeking automated payroll calculation, biometric integration, and an employee self-service portal.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://hrms.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/workforce-hrms',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Employee Attendance & Shift Roster Management' 
      },
      {
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80',
        caption: 'Automated Statutory Payroll Calculation & Pay Slip Generator'
      }
    ],
    demoAccounts: [
      { 
        role: 'HR Administrator', 
        url: 'https://hrms.kiaantechnology.com', 
        email: 'hr.admin@demo.com', 
        password: 'password',
        note: 'Manage employees, biometric sync, and execute monthly payroll runs.'
      },
      { 
        role: 'Employee Self-Service', 
        url: 'https://hrms.kiaantechnology.com/portal', 
        email: 'employee@demo.com', 
        password: 'Demo@123',
        note: 'Apply for leave, check shift roster, and download salary slips.'
      }
    ],
    techSpecs: {
      framework: 'Node.js & React 19',
      language: 'JavaScript / Node.js 20',
      database: 'MySQL 8.0+',
      frontend: 'React 19 Responsive Dashboard',
      architecture: 'Modular HR & Payroll Engine',
      filesIncluded: 'Source Code, SQL, Docker, Documentation',
      softwareVersion: 'v2.0.4',
      firstRelease: 'February 2026',
      lastUpdate: 'August 2026'
    },
    requirements: [
      'Node.js 20+ / Docker Engine',
      'MySQL 8.0+ Database Server',
      'Biometric device API endpoint (optional)',
      'Linux VPS Server'
    ],
    installInstructions: [
      'Unpack package onto your Linux server.',
      'Configure database credentials in .env.',
      'Run docker compose up -d or npm start.',
      'Access HR Admin portal and import employee master data.'
    ],
    featureGroups: [
      {
        title: 'Employee Lifecycle & Attendance',
        icon: 'User',
        items: [
          'Biometric Fingerprint & RFID Device API Bridge',
          'Shift Rosters, Overtime & Leave Request Approvals',
          'Digital Document Locker for Employee Records'
        ]
      },
      {
        title: 'Statutory Payroll Engine',
        icon: 'CreditCard',
        items: [
          'One-Click Monthly Payroll Generation',
          'PF, ESI, Professional Tax & TDS Formulas',
          'Automated Bulk Pay Slip PDF Generation'
        ]
      }
    ],
    features: [
      'Automated payroll calculation with customizable rules for PF, ESI, TDS, and allowances',
      'Direct API bridge for standard biometric and RFID attendance hardware',
      'Employee self-service portal for payslip downloads, leave applications, and tax declarations',
      'Organizational charts, employee document storage, and asset allocation tracking'
    ],
    modules: [
      'Employee Directory & Documents',
      'Biometric Attendance Bridge',
      'Leave Management & Holidays',
      'Statutory Payroll & Payslips',
      'Employee Self-Service Portal'
    ],
    techStack: 'React, Node.js, MySQL. Compatible with standard Linux servers and cloud hosts.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹34,999',
      pricingNote: 'Perpetual license. Includes payroll compliance updates.'
    },
    pricingTiers: {
      regular: '₹34,999',
      extended: '₹79,999',
      installationService: '₹3,499'
    },
    tags: ['hrms', 'payroll', 'attendance', 'biometric', 'salary slips', 'self-hosted'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-flow-inventory',
    slug: 'kiaan-flow-inventory',
    name: 'Kiaan Flow Inventory & WMS',
    category: 'Supply Chain & Inventory',
    categoryId: 'inventory',
    shortDesc: 'Multi-warehouse stock balancing, batch expiry alerts, and barcode dispatch management.',
    fullDesc: 'Kiaan Flow Inventory is a warehouse management system designed to track stock levels accurately across multiple physical depots, manage batch numbers and expiration dates, generate barcodes, and automate purchase reorder warnings.',
    whoShouldUse: 'Distributors, FMCG wholesalers, pharma logistics depots, and multi-location retail chains needing real-time stock control.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://wms.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/flow-inventory',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Warehouse Depot Visual Stock Heatmap & Low Stock Alerts' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Batch Tracking, Expiry Locks & Barcode Dispatch Station' 
      }
    ],
    demoAccounts: [
      { 
        role: 'Warehouse Operations Manager', 
        url: 'https://wms.kiaantechnology.com', 
        email: 'warehouse.manager@demo.com', 
        password: 'password',
        note: 'Inspect warehouse bin locations, dispatch orders, and generate inventory valuation.'
      }
    ],
    techSpecs: {
      framework: 'Node.js & React 19',
      language: 'JavaScript / Node.js 20',
      database: 'MySQL 8.0+',
      frontend: 'React 19 Barcode-Optimized UI',
      architecture: 'High-Throughput Inventory Service',
      filesIncluded: 'Source Code, SQL, Docker, Barcode Printer Drivers Guide',
      softwareVersion: 'v1.8.0',
      firstRelease: 'March 2026',
      lastUpdate: 'August 2026'
    },
    requirements: [
      'Node.js 20+ or Docker Engine',
      'MySQL 8.0+ Database Server',
      'Barcode / QR Scanner hardware support (USB/HID/Bluetooth)'
    ],
    installInstructions: [
      'Extract code package on server.',
      'Configure database credentials in .env.',
      'Run docker compose up -d.',
      'Access warehouse dashboard and configure warehouse bin locations.'
    ],
    featureGroups: [
      {
        title: 'Depot & Warehouse Management',
        icon: 'Package',
        items: [
          'Multi-Depot Stock Transfers & In-Transit Tracking',
          'Bin Location Architecture (Aisle, Rack, Shelf, Bin)',
          'Automated Low-Stock Reorder Triggers'
        ]
      },
      {
        title: 'Quality & Expiry Compliance',
        icon: 'ShieldCheck',
        items: [
          'Batch & Lot Number Tracking with FIFO/LIFO Dispatch',
          'Automatic Expiration Locking for Regulated Goods',
          'Instant Barcode & Thermal Label Generator'
        ]
      }
    ],
    features: [
      'Multi-warehouse stock tracking with automated inter-depot transfer orders',
      'Batch and lot tracking with strict first-in, first-out (FIFO) and expiry locking',
      'Barcode and QR code generation for thermal label printers',
      'Minimum stock alert rules that trigger automated purchase requisitions'
    ],
    modules: [
      'Multi-Warehouse Inventory Ledger',
      'Batch & Expiry Date Controller',
      'Barcode & Label Printing',
      'Goods Receipt & Dispatch Inspection',
      'Stock Audit & Physical Reconciliation'
    ],
    techStack: 'React, Node.js, MySQL, Redis cache. Compatible with barcode scanners and thermal printers.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹29,999',
      pricingNote: 'Perpetual license with unlimited warehouse locations.'
    },
    pricingTiers: {
      regular: '₹29,999',
      extended: '₹69,999',
      installationService: '₹2,999'
    },
    tags: ['wms', 'warehouse', 'inventory', 'barcode', 'batch tracking', 'fifo', 'self-hosted'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-swift-pos',
    slug: 'kiaan-swift-pos',
    name: 'Kiaan Swift POS & Billing',
    category: 'Billing & Point of Sale',
    categoryId: 'pos',
    shortDesc: 'Fast counter billing, barcode scanning, offline capability, and thermal receipt printing.',
    fullDesc: 'Kiaan Swift POS is an agile retail checkout software built for high-speed counter billing. Featuring instant barcode scanning, keyboard-only shortcuts, offline transaction queuing, and seamless receipt printer integration.',
    whoShouldUse: 'Supermarkets, apparel stores, hardware shops, and retail chains that demand zero checkout lag and offline billing resilience.',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://pos.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/swift-pos',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1000&auto=format&fit=crop&q=80', 
        caption: 'High-Speed Counter Billing Interface with Touch & Shortcut Support' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Daily Cash Drawer Reconciliation & End of Day Z-Report' 
      }
    ],
    demoAccounts: [
      { 
        role: 'Head Cashier / Store Manager', 
        url: 'https://pos.kiaantechnology.com', 
        email: 'pos.manager@demo.com', 
        password: 'password',
        note: 'Inspect register shifts, cash float, and sales reports.'
      }
    ],
    techSpecs: {
      framework: 'React 19 & Offline IndexedDB Service Worker',
      language: 'JavaScript / Node.js 20',
      database: 'SQLite local offline + MySQL 8.0+ master sync',
      frontend: 'React 19 Touch & Keyboard-First Layout',
      architecture: 'Offline-First Progressive Architecture',
      filesIncluded: 'POS Web App, Sync Server, SQL, ESC/POS Printer Drivers',
      softwareVersion: 'v2.2.0',
      firstRelease: 'February 2026',
      lastUpdate: 'August 2026'
    },
    requirements: [
      'Modern web browser (Chrome, Edge, Firefox) on tablet or PC',
      'Node.js 20 server for centralized data synchronization',
      'Thermal receipt printer (ESC/POS compatible via USB or Network)'
    ],
    installInstructions: [
      'Deploy sync backend using Node.js or Docker.',
      'Configure store tax rates (GST / VAT) and register terminal IDs.',
      'Open POS frontend on counter terminals and pair thermal receipt printer.'
    ],
    featureGroups: [
      {
        title: 'Counter Speed & Hardware',
        icon: 'CreditCard',
        items: [
          'Sub-second item scanning with barcode reader integration',
          'Direct thermal receipt printing (ESC/POS 2-inch and 3-inch)',
          'Cash drawer kick trigger via printer interface'
        ]
      },
      {
        title: 'Offline Resiliency',
        icon: 'ShieldCheck',
        items: [
          'Offline queue storing sales locally during internet outages',
          'Automatic background sync to central server upon reconnect',
          'Daily register open/close cash float tally'
        ]
      }
    ],
    features: [
      'Sub-second item lookup via barcode scanner, touch screen, or keyboard shortcuts',
      'Offline-capable billing with automatic synchronization when internet reconnects',
      'Supports thermal receipt printers (ESC/POS), barcode label printers, and cash drawers',
      'Daily register shift management with cash drawer open/close tally'
    ],
    modules: [
      'Quick Counter Billing',
      'Barcode & Product Catalog',
      'Cash Drawer & Shift Settlement',
      'Thermal Printer Engine',
      'Customer Loyalty Points'
    ],
    techStack: 'React PWA, Node.js sync server, SQLite/MySQL. ESC/POS thermal printer support.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹19,999',
      pricingNote: 'Perpetual license. Unlimited billing counters within single store.'
    },
    pricingTiers: {
      regular: '₹19,999',
      extended: '₹49,999',
      installationService: '₹1,999'
    },
    tags: ['pos', 'billing', 'thermal printing', 'offline pos', 'retail', 'barcode', 'self-hosted'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-flow-ai',
    slug: 'kiaan-flow-ai',
    name: 'Kiaan Flow AI Engine',
    category: 'AI & Automation',
    categoryId: 'automation',
    shortDesc: 'Automated invoice data extraction, customer intent routing, and webhook workflow engine.',
    fullDesc: 'Kiaan Flow AI Engine automates tedious manual tasks by extracting structured data from vendor invoice PDFs, routing customer inquiries, and orchestrating cross-system business events without requiring expensive third-party SaaS subscriptions.',
    whoShouldUse: 'Businesses processing hundreds of monthly purchase bills, invoices, or customer support queries looking to automate data entry.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    demoUrl: 'https://ai.kiaantechnology.com',
    demoVideoUrl: '',
    docUrl: 'https://docs.kiaantechnology.com/flow-ai',
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Invoice OCR Parser & Table Extractor' 
      },
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
        caption: 'Visual Drag-and-Drop Workflow & Webhook Trigger Builder'
      }
    ],
    demoAccounts: [
      { 
        role: 'AI Operations Specialist', 
        url: 'https://ai.kiaantechnology.com', 
        email: 'ai.admin@demo.com', 
        password: 'password',
        note: 'Inspect document OCR pipelines, configure webhook endpoints, and test parsing accuracy.'
      }
    ],
    techSpecs: {
      framework: 'Python FastAPI & Node.js Bridge',
      language: 'Python 3.11+ / Node.js 20',
      database: 'PostgreSQL & pgvector for document embeddings',
      frontend: 'React 19 Visual Pipeline Canvas',
      architecture: 'Microservice Event Pipeline with Celery Task Queue',
      filesIncluded: 'FastAPI Backend, React Web UI, Docker Compose cluster, Postman specs',
      softwareVersion: 'v1.4.0',
      firstRelease: 'April 2026',
      lastUpdate: 'September 2026'
    },
    requirements: [
      'Docker Engine 24+ and Docker Compose',
      'Python 3.11+ / Node.js 20',
      'PostgreSQL 15+ with pgvector support',
      '4 GB RAM minimum for local OCR parser execution',
      'Linux VPS Server (Ubuntu 22.04 / 24.04)'
    ],
    installInstructions: [
      'Clone repository onto Linux host.',
      'Configure environment credentials (.env).',
      'Run: docker compose up -d --build',
      'Access AI Engine canvas at http://localhost:8000'
    ],
    featureGroups: [
      {
        title: 'Document OCR & Parsing',
        icon: 'FileText',
        items: [
          'Automatic PDF Invoice Header & Line Item Extraction',
          'Confidence Scoring & Human-in-the-Loop Review Panel',
          'Export to JSON, CSV, or direct ERP database injection'
        ]
      },
      {
        title: 'Workflow Orchestration',
        icon: 'Sparkles',
        items: [
          'Universal Inbound & Outbound Webhook Dispatcher',
          'Conditional Branching on Business Rules',
          'Self-Hosted Internal Knowledge Base Assistant'
        ]
      }
    ],
    features: [
      'Automated invoice PDF text and table extraction directly into ERP purchase vouchers',
      'Visual drag-and-drop workflow trigger builder for business events',
      'Self-hosted company knowledge assistant for internal employee standard operating procedures',
      'Webhooks listener for connecting external landing pages, payment gateways, and databases'
    ],
    modules: [
      'Document OCR & Extraction',
      'Visual Workflow Builder',
      'Knowledge Base Assistant',
      'Universal Webhook Dispatcher'
    ],
    techStack: 'React, Node.js, Python OCR Service, MySQL.',
    pricing: {
      isApproved: true,
      priceDisplay: '₹39,999',
      pricingNote: 'Dedicated setup assistance and server deployment included.'
    },
    pricingTiers: {
      regular: '₹39,999',
      extended: '₹89,999',
      installationService: '₹3,999'
    },
    tags: ['ai', 'ocr', 'automation', 'webhooks', 'invoice parser', 'fastapi', 'self-hosted'],
    customizationAvailable: true,
    status: 'published',
    isFlagship: false,
    isFeatured: true
  }
];

export const CATEGORIES = [
  { id: 'erp', name: 'ERP Systems', shortName: 'ERP', icon: 'Layers', fullName: 'Enterprise Resource Planning', shortDesc: 'Complete business management for finance, operations, and purchasing.' },
  { id: 'crm', name: 'CRM Systems', shortName: 'CRM', icon: 'Users', fullName: 'Customer Relationship Management', shortDesc: 'Track leads, organize customer deals, and automate sales reminders.' },
  { id: 'hrms', name: 'HRMS & Payroll', shortName: 'HRMS', icon: 'Briefcase', fullName: 'Human Resource Management', shortDesc: 'Employee attendance, leave records, and automated statutory payroll.' },
  { id: 'inventory', name: 'Inventory & WMS', shortName: 'Inventory', icon: 'Package', fullName: 'Supply Chain & Inventory', shortDesc: 'Multi-warehouse stock balancing, barcode dispatch, and expiry alerts.' },
  { id: 'pos', name: 'Billing & POS', shortName: 'POS & Billing', icon: 'CreditCard', fullName: 'Billing, POS & Invoicing', shortDesc: 'Fast counter billing with offline resilience and thermal receipt printing.' },
  { id: 'industry', name: 'Industry Solutions', shortName: 'Industry', icon: 'Building2', fullName: 'Specialized Industry Solutions', shortDesc: 'Tailored software for manufacturing, retail, logistics, healthcare, and services.' },
  { id: 'automation', name: 'AI & Automation', shortName: 'AI & Automate', icon: 'Cpu', fullName: 'AI & Business Automation', shortDesc: 'Automated invoice data extraction and cross-system workflow triggers.' }
];

export const INDUSTRIES = [
  {
    id: 'manufacturing',
    name: 'Manufacturing & Assembly',
    title: 'Manufacturing & Assembly',
    eyebrow: 'Production & Shop Floor',
    desc: 'End-to-end bill of materials (BOM), shop floor scheduling, inventory replenishment, and batch tracing for precision manufacturing.',
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
    name: 'Retail & Supermarkets',
    title: 'Retail & Omnichannel Commerce',
    eyebrow: 'Fast-Moving Consumer Retail',
    desc: 'Synchronize brick-and-mortar checkout points with central warehouse inventory, real-time GST invoicing, and customer loyalty rewards.',
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
    name: 'Logistics & Warehousing',
    title: 'Logistics, Fleet & Distribution',
    eyebrow: 'Supply Chain & Freight',
    desc: 'Dispatch planning, consignment tracking, multi-depot stock transfers, and automated transporter rate calculations.',
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
    name: 'Healthcare & Clinics',
    title: 'Healthcare & Clinical Operations',
    eyebrow: 'Hospitality & Health Facilities',
    desc: 'Patient appointment scheduling, pharmacy batch & expiry management, doctor consultation billing, and staff shifts.',
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
    name: 'Professional Services',
    title: 'Professional & Financial Services',
    eyebrow: 'Consulting, Legal & IT Agencies',
    desc: 'Project milestone billing, timesheet tracking, deal velocity management, and automated tax reporting for consulting firms.',
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
    name: 'Technology & SaaS',
    title: 'Technology & SaaS Companies',
    eyebrow: 'ISVs & Digital Platforms',
    desc: 'Turnkey foundational codebases with integrated licensing servers, customer billing, and authentication ready for white-labeling.',
    description: 'Turnkey foundational codebases with integrated licensing servers, customer billing, and authentication ready for white-labeling.',
    recommendedPackages: ['RecruitFlow Pro – Complete Recruitment SaaS Platform', 'Kiaan Automate AI Engine', 'Kiaan Pulse CRM'],
    highlights: [
      'Clean modular MVC / Service layer architecture in Node.js & React / Laravel',
      'Ready-to-use centralized cryptographic licensing system',
      'Complete REST APIs with OpenAPI specifications',
      'Zero vendor lock-in with clean full source ownership'
    ],
    deploymentTimeline: 'Instant package download upon license issue'
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
  },
  {
    q: 'Are there any recurring monthly subscription fees or per-user seat limits?',
    a: 'No. Unlike SaaS platforms that charge monthly per-user fees, all Kiaan Marketplace software is sold under a one-time perpetual license. You get unlimited internal users, administrative seats, and operational transactions with zero recurring subscription pressure.'
  },
  {
    q: 'How can we evaluate software and test features before purchasing?',
    a: 'Every software product in our catalog features an interactive live demo sandbox. You can log in using pre-configured Super Admin, Staff, or Customer accounts to test real workflows, inspect technical architecture documents, and browse full screenshot galleries directly from the marketplace.'
  }
];

export const DEFAULT_HERO_CONFIG = {
  titlePrefix: 'Production-Ready Business Software, ',
  titleHighlight: 'Built to Deploy & Scale',
  searchPlaceholder: 'Search software (e.g. ERP, CRM, Payroll, Invoicing, Inventory)...'
};

export const DEFAULT_LICENSES = [
  {
    id: 'LIC-9011',
    key: 'KT-ERP-7821-X99',
    product: 'KiaanERP Enterprise',
    productId: 'kiaan-erp-enterprise',
    clientName: 'Sharma Logistics Pvt Ltd',
    domain: 'erp.sharmalogistics.in',
    status: 'Active',
    licenseType: 'Single Domain Perpetual',
    issuedDate: '2026-09-15',
    validUntil: 'March 2027',
    supportTier: 'Priority Business'
  },
  {
    id: 'LIC-9012',
    key: 'KT-REC-5542-P81',
    product: 'RecruitFlow Pro – Complete Recruitment SaaS Platform',
    productId: 'recruitflow-pro-saas',
    clientName: 'Apex Staffing Solutions',
    domain: 'jobs.apexstaffing.co',
    status: 'Active',
    licenseType: 'SaaS Platform License',
    issuedDate: '2026-09-20',
    validUntil: 'September 2027',
    supportTier: 'Enterprise SLA'
  },
  {
    id: 'LIC-9013',
    key: 'KT-CRM-2290-K14',
    product: 'Kiaan Pulse CRM',
    productId: 'kiaan-pulse-crm',
    clientName: 'TechInfra Global',
    domain: 'crm.techinfra.org',
    status: 'Active',
    licenseType: 'Multi-Branch Perpetual',
    issuedDate: '2026-09-25',
    validUntil: 'October 2027',
    supportTier: 'Standard Support'
  }
];
