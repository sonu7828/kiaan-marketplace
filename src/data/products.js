/**
 * ============================================================================
 * KIAAN MARKETPLACE — CENTRALIZED PRODUCT CATALOG
 * ============================================================================
 * 
 * LOCATION: src/data/products.js
 * 
 * INSTRUCTIONS FOR ADDING YOUR REAL SOFTWARE & DEMOS:
 * 1. demoUrl:
 *    - Enter your actual hosted demo URL (e.g. 'https://erp.kiaantechnology.com').
 *    - If a demo is not yet hosted, leave as '' (empty string).
 *    - The marketplace will automatically show a clean "Demo Coming Soon" state.
 *    - When a valid URL is provided, clicking "Live Demo" opens the website in a new tab.
 * 
 * 2. demoVideoUrl:
 *    - Optional video walkthrough URL (YouTube, Vimeo, MP4, etc.).
 *    - If provided, a "Watch Demo Video" button appears on the product detail page.
 * 
 * 3. screenshots:
 *    - Add your actual screenshots: [{ url: 'https://...', caption: '...' }].
 *    - Leave as [] if screenshots are not yet available.
 * 
 * 4. pricing:
 *    - If unapproved or custom quote, leave priceDisplay as 'Contact for Pricing'.
 *    - If approved, set priceDisplay to your actual approved price (e.g., '₹48,500').
 * 
 * 5. customizationAvailable:
 *    - Set to true if Kiaan provides custom feature adaptation or development.
 * ============================================================================
 */

export const PRODUCTS = [
  {
    id: 'kiaan-erp-enterprise',
    slug: 'kiaan-erp-enterprise',
    name: 'KiaanERP Enterprise',
    category: 'Enterprise Resource Planning',
    categoryId: 'erp',
    shortDesc: 'Complete business management software for finance, inventory, purchasing, and operations.',
    fullDesc: 'KiaanERP Enterprise is an all-in-one business software solution designed to streamline your daily commercial operations. It unites financial accounting, multi-currency ledger management, procurement workflows, and real-time operational reporting into a single intuitive system that you can install on your own servers or cloud.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://erp.yourdomain.com'
    demoVideoUrl: '', // Example: 'https://youtube.com/watch?v=...'
    // ------------------------------------------------------------------------
    // SCREENSHOTS (Add real software screenshots below)
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Operational Dashboard & Analytics' 
      },
      { 
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Financial Ledger & Reporting' 
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
    whoShouldUse: 'Mid-sized to large enterprises, distributors, and manufacturing businesses that need centralized financial control, automated purchasing, and transparent operational ledgers.',
    techStack: 'React frontend, Node.js (Express) backend, MySQL relational database. Compatible with Linux (Ubuntu/Debian), Docker, AWS, or GCP.',
    // Commercial Details (Optional / On Request)
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual single-domain license with dedicated server deployment assistance.'
    },
    customizationAvailable: true,
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
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://crm.yourdomain.com'
    demoVideoUrl: '', 
    // ------------------------------------------------------------------------
    // SCREENSHOTS
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Visual Deal Pipeline Kanban' 
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
    whoShouldUse: 'B2B sales teams, agencies, real estate firms, and service consultancies looking to organize client leads and prevent lost sales opportunities.',
    techStack: 'React, Node.js (Express), MySQL database, WebSocket for real-time lead updates.',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual license with full deployment support on your own server.'
    },
    customizationAvailable: true,
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
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://hrms.yourdomain.com'
    demoVideoUrl: '',
    // ------------------------------------------------------------------------
    // SCREENSHOTS
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Employee Attendance & Shift Roster' 
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
    whoShouldUse: 'Companies with 20 to 2,000+ employees seeking automated payroll calculation, biometric integration, and an employee self-service portal.',
    techStack: 'React, Node.js, MySQL. Compatible with standard Linux servers and cloud hosts.',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual license. Includes payroll compliance updates.'
    },
    customizationAvailable: true,
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
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://inventory.yourdomain.com'
    demoVideoUrl: '',
    // ------------------------------------------------------------------------
    // SCREENSHOTS
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Warehouse Stock Balancing & Bin Allocation' 
      }
    ],
    features: [
      'Real-time multi-location inventory balancing with automated inter-warehouse transfers',
      'Batch and lot tracking with strict alerts for aging and expiring stock',
      'Barcode generation and handheld scanner integration for fast pick-and-pack fulfillment',
      'Automated minimum stock alerts and automated supplier purchase order creation'
    ],
    modules: [
      'Multi-Depot Stock Tracking',
      'Batch & Expiry Date Monitor',
      'Barcode Dispatch & Receiving',
      'Stock Transfer & Transit Slips',
      'Automated Reorder Level Triggers'
    ],
    whoShouldUse: 'Wholesalers, distributors, e-commerce fulfillment hubs, and retail chains managing inventory across multiple storage locations.',
    techStack: 'React, Node.js, MySQL, Redis for stock level caching.',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual license. Multi-branch deployment available.'
    },
    customizationAvailable: true,
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-swift-pos',
    slug: 'kiaan-swift-pos',
    name: 'Kiaan Swift POS & Billing',
    category: 'Billing, POS & Invoicing',
    categoryId: 'pos',
    shortDesc: 'Fast counter billing software with offline capability, thermal printing, and GST invoices.',
    fullDesc: 'Kiaan Swift POS is an ultra-fast counter billing application built for physical stores and retail counters. It operates smoothly even when your internet connection drops, syncs automatically when online, supports multiple payment methods, and prints GST invoices on thermal printers.',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://pos.yourdomain.com'
    demoVideoUrl: '',
    // ------------------------------------------------------------------------
    // SCREENSHOTS
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1000&auto=format&fit=crop&q=80', 
        caption: 'High-Speed Cashier Terminal' 
      }
    ],
    features: [
      'Sub-second item scanning with full keyboard shortcuts for fast checkout queues',
      'Offline-first capability ensures uninterrupted billing during internet disruptions',
      'Split payment support (Cash, Card, UPI, Store Credit) in a single bill',
      'Cashier shift management, drawer reconciliation, and end-of-day sales reports'
    ],
    modules: [
      'Fast Counter Checkout',
      'Offline Resilience Engine',
      'Thermal Invoice Printing',
      'Cash Drawer & Shift Settlement',
      'Customer Loyalty Points'
    ],
    whoShouldUse: 'Supermarkets, apparel stores, retail counters, and distributors requiring fast checkout, keyboard shortcuts, and offline reliability.',
    techStack: 'React + Local Storage / SQLite (Client) + Node.js / MySQL (Server Sync).',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual license per location/domain.'
    },
    customizationAvailable: true,
    isFlagship: false,
    isFeatured: true
  },
  {
    id: 'kiaan-flow-ai',
    slug: 'kiaan-flow-ai',
    name: 'Kiaan Flow AI Engine',
    category: 'AI & Business Automation',
    categoryId: 'automation',
    shortDesc: 'Automated invoice data extraction, event triggers, and workflow orchestration.',
    fullDesc: 'Kiaan Flow AI Engine automates tedious manual tasks by extracting structured data from vendor invoice PDFs, routing customer inquiries, and orchestrating cross-system business events without requiring expensive third-party SaaS subscriptions.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    // ------------------------------------------------------------------------
    // DEMO CONFIGURATION (Add your real demo link below)
    // ------------------------------------------------------------------------
    demoUrl: '', // Example: 'https://ai.yourdomain.com'
    demoVideoUrl: '',
    // ------------------------------------------------------------------------
    // SCREENSHOTS
    // ------------------------------------------------------------------------
    screenshots: [
      { 
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80', 
        caption: 'Invoice OCR Parser & Workflow Builder' 
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
    whoShouldUse: 'Businesses processing hundreds of monthly purchase bills, invoices, or customer support queries looking to automate data entry.',
    techStack: 'React, Node.js, Python OCR Service, MySQL.',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Dedicated setup assistance and server deployment included.'
    },
    customizationAvailable: true,
    isFlagship: false,
    isFeatured: true
  }
];

export const CATEGORIES = [
  { id: 'erp', name: 'ERP Systems', fullName: 'Enterprise Resource Planning', shortDesc: 'Complete business management for finance, operations, and purchasing.' },
  { id: 'crm', name: 'CRM Systems', fullName: 'Customer Relationship Management', shortDesc: 'Track leads, organize customer deals, and automate sales reminders.' },
  { id: 'hrms', name: 'HRMS & Payroll', fullName: 'Human Resource Management', shortDesc: 'Employee attendance, leave records, and automated statutory payroll.' },
  { id: 'inventory', name: 'Inventory & WMS', fullName: 'Supply Chain & Inventory', shortDesc: 'Multi-warehouse stock balancing, barcode dispatch, and expiry alerts.' },
  { id: 'pos', name: 'Billing & POS', fullName: 'Billing, POS & Invoicing', shortDesc: 'Fast counter billing with offline resilience and thermal receipt printing.' },
  { id: 'industry', name: 'Industry Solutions', fullName: 'Specialized Industry Solutions', shortDesc: 'Tailored software for manufacturing, retail, logistics, healthcare, and services.' },
  { id: 'automation', name: 'AI & Automation', fullName: 'AI & Business Automation', shortDesc: 'Automated invoice data extraction and cross-system workflow triggers.' }
];

export const INDUSTRIES = [
  { id: 'manufacturing', name: 'Manufacturing & Assembly', desc: 'Production bill of materials, machine scheduling, and batch quality tracking.' },
  { id: 'retail', name: 'Retail & Supermarkets', desc: 'Fast counter billing, barcode scanning, and multi-depot stock replenishment.' },
  { id: 'logistics', name: 'Logistics & Warehousing', desc: 'Multi-hub dispatching, consignment tracking, and freight cost verification.' },
  { id: 'healthcare', name: 'Healthcare & Clinics', desc: 'Patient appointments, pharmacy batch expiry locks, and doctor scheduling.' },
  { id: 'services', name: 'Professional Services', desc: 'Client project billing, team timesheets, and milestone invoice tracking.' },
  { id: 'tech', name: 'Technology & SaaS', desc: 'Pre-built foundational codebases with integrated licensing servers.' }
];
