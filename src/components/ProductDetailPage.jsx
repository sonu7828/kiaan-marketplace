import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Video, 
  ExternalLink, 
  CheckCircle2, 
  Server, 
  Code2, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft,
  Building2,
  Check,
  Layers,
  Sparkles,
  Info,
  KeyRound,
  Copy,
  Lock,
  User,
  Briefcase,
  Globe,
  Database,
  Terminal,
  Cpu,
  Star,
  Download,
  ShoppingCart,
  Wrench,
  Calendar,
  Tag,
  Maximize2,
  CreditCard
} from 'lucide-react';
import ScreenshotGalleryModal from './ScreenshotGalleryModal';

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onLaunchDemo, 
  onRequestQuote,
  onAddToCart 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'demo' | 'tech' | 'requirements' | 'install'
  const [licenseType, setLicenseType] = useState('regular'); // 'regular' | 'extended'
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted mb-6">The requested software product could not be located in our catalog.</p>
        <button className="btn btn-primary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Marketplace</span>
        </button>
      </div>
    );
  }

  const screenshots = (product.screenshots && product.screenshots.length > 0)
    ? product.screenshots
    : product.coverImage 
      ? [{ url: product.coverImage, caption: `${product.name} Overview` }]
      : [{ url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', caption: 'Overview' }];

  const currentScreenshot = screenshots[activeImageIndex] || screenshots[0];
  const hasLiveDemo = product.demoUrl && product.demoUrl.trim().startsWith('http');

  // Commercial Pricing Calculation
  const regularPriceStr = product.pricingTiers?.regular || product.pricing?.priceDisplay || '₹29,999';
  const extendedPriceStr = product.pricingTiers?.extended || '₹69,999';
  const installPriceStr = product.pricingTiers?.installationService || '₹2,999';

  // Helper to parse numeric part of price string (e.g. "₹29,999" -> 29999)
  const parsePriceNum = (str) => {
    const num = parseInt((str || '').replace(/[^\d]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const basePriceNum = licenseType === 'regular' ? parsePriceNum(regularPriceStr) : parsePriceNum(extendedPriceStr);
  const installPriceNum = parsePriceNum(installPriceStr);
  const totalPriceNum = basePriceNum + (includeInstallation ? installPriceNum : 0);
  const currencySymbol = (regularPriceStr.includes('$')) ? '$' : '₹';
  const formattedTotalPrice = `${currencySymbol}${totalPriceNum.toLocaleString()}`;

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handleLiveDemoClick = () => {
    if (hasLiveDemo) {
      if (onLaunchDemo) {
        onLaunchDemo(product);
      } else {
        window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleBuyNow = () => {
    if (onAddToCart) {
      onAddToCart();
    }
    alert(`License order initiated for ${product.name} (${licenseType === 'regular' ? 'Regular License' : 'Extended License'}${includeInstallation ? ' + Installation Support' : ''}). Total: ${formattedTotalPrice}.\n\nConnecting to secure payment gateway...`);
  };

  // Demo accounts fallback if not configured
  const demoAccounts = (product.demoAccounts && product.demoAccounts.length > 0)
    ? product.demoAccounts
    : [
        {
          role: 'Super Admin Console',
          url: product.demoUrl || 'https://demo.kiaantechnology.com/admin/login',
          email: 'admin@demo.com',
          password: 'password',
          note: 'Full command center access to inspect modules, user accounts, and system configuration.'
        },
        {
          role: 'Staff / Business Workspace',
          url: product.demoUrl || 'https://demo.kiaantechnology.com',
          email: 'demo@employer.com',
          password: 'Demo@123',
          note: 'Access operational workflows, daily pipelines, reports, and team collaboration.'
        }
      ];

  // Tech specs fallback
  const techSpecs = product.techSpecs || {
    framework: product.techStack?.includes('Laravel') ? 'Laravel 13' : 'Node.js / Express',
    language: product.techStack?.includes('PHP') ? 'PHP 8.2+' : 'TypeScript / JavaScript',
    database: 'MySQL 8.0+ / MariaDB',
    frontend: 'React 19 / Modern Responsive UI',
    architecture: 'Clean MVC Architecture & Service Layer',
    filesIncluded: '.zip, Complete Source Code, Docker Cluster, SQL Dump, Documentation',
    softwareVersion: 'v2.4.0',
    firstRelease: 'January 2026',
    lastUpdate: 'September 2026'
  };

  // Requirements fallback
  const requirements = (product.requirements && product.requirements.length > 0)
    ? product.requirements
    : [
        'Web Server: Apache or Nginx with URL rewriting enabled',
        'Database: MySQL 8.0+ or MariaDB 10.11+',
        'PHP 8.2+ or Node.js 20 LTS runtime environment',
        'Composer or npm package manager installed on server',
        'Required extensions: OpenSSL, PDO, Mbstring, Tokenizer, XML, cURL, JSON',
        'SSL/HTTPS Certificate Recommended (Let\'s Encrypt supported)',
        'Writable storage and cache directories permissions (chmod 775)'
      ];

  // Installation steps fallback
  const installInstructions = (product.installInstructions && product.installInstructions.length > 0)
    ? product.installInstructions
    : [
        'Upload the software application zip archive to your production web server.',
        'Create a dedicated MySQL database and database user with full grant privileges.',
        'Copy .env.example to .env and configure database connection parameters.',
        'Configure your application domain URL (APP_URL) and SMTP email settings.',
        'Run dependency installation: composer install --optimize-autoloader or npm install',
        'Generate application security encryption key: php artisan key:generate',
        'Execute automated database schema migrations and seed initial default records.',
        'Configure web server virtual host pointing to the /public directory.',
        'Access the application in your browser and complete the initial setup wizard.'
      ];

  return (
    <div className="product-detail-page">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav className="detail-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="container breadcrumb-inner">
          <button className="breadcrumb-back-btn" onClick={onBack}>
            <ArrowLeft size={15} />
            <span>All Software</span>
          </button>
          <div className="breadcrumb-path">
            <span className="crumb-segment" onClick={onBack}>Marketplace</span>
            <ChevronRight size={13} className="crumb-divider" />
            <span className="crumb-segment">{product.category || 'Software'}</span>
            <ChevronRight size={13} className="crumb-divider" />
            <span className="crumb-active">{product.name}</span>
          </div>
          <div className="breadcrumb-right-badges">
            <span className="breadcrumb-verified-badge">
              <ShieldCheck size={14} className="text-gold" />
              <span>Verified Sovereign Codebase</span>
            </span>
          </div>
        </div>
      </nav>

      {/* 2. Main Page Content */}
      <main className="container detail-main-content">
        
        {/* Top Header Block */}
        <div className="detail-header-block">
          <div className="detail-badges-row">
            <span className="badge badge-gold">{product.category}</span>
            <span className="badge badge-subtle">
              <Server size={12} className="inline mr-1 text-gold" />
              Self-Hosted
            </span>
            {product.isFlagship && (
              <span className="badge badge-active">Flagship Suite</span>
            )}
            <span className="badge badge-subtle">
              <Code2 size={12} className="inline mr-1 text-primary" />
              100% Source Code Included
            </span>
          </div>

          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-lead-summary">{product.shortDesc}</p>

          <div className="detail-meta-bar">
            <div className="meta-stars">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="star-filled" />
                ))}
              </div>
              <span className="rating-score">4.9 / 5.0</span>
              <span className="rating-count">(Enterprise Production Verified)</span>
            </div>
            <div className="meta-divider"></div>
            <div className="meta-item">
              <Calendar size={14} className="text-muted" />
              <span>Last Updated: <strong>{techSpecs.lastUpdate || 'August 2026'}</strong></span>
            </div>
            <div className="meta-divider"></div>
            <div className="meta-item">
              <ShieldCheck size={14} className="text-success" />
              <span>Security & Quality Checked by Kiaan Technology</span>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout Grid: Left Content (68%) & Right Commercial Sidebar (32%) */}
        <div className="detail-layout-grid">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: Media Showcase & Rich Tabs                           */}
          {/* ================================================================= */}
          <div className="detail-left-col">
            
            {/* Compact Media Showcase (Image Badi Nahi Hai, Compact & Balanced) */}
            <div className="detail-gallery-card">
              <div className="detail-main-viewport">
                <img 
                  src={currentScreenshot.url} 
                  alt={currentScreenshot.caption || product.name} 
                  className="detail-main-img"
                  onClick={() => setGalleryModalOpen(true)}
                  title="Click to view full-resolution screenshot"
                />

                {/* Top Overlay Badge & Action */}
                <div className="viewport-overlay-top">
                  <span className="viewport-badge">Screenshot {activeImageIndex + 1} of {screenshots.length}</span>
                  <button 
                    type="button" 
                    className="viewport-expand-btn"
                    onClick={() => setGalleryModalOpen(true)}
                    title="Open Full Screen Gallery"
                  >
                    <Maximize2 size={14} />
                    <span>View All Screenshots</span>
                  </button>
                </div>

                {/* Left/Right Arrow Navigation */}
                {screenshots.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      className="viewport-nav-arrow arrow-left" 
                      onClick={handlePrevImage}
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      type="button" 
                      className="viewport-nav-arrow arrow-right" 
                      onClick={handleNextImage}
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Caption Bar */}
                <div className="viewport-caption-bar">
                  <span>{currentScreenshot.caption || `${product.name} Overview`}</span>
                </div>
              </div>

              {/* Clickable Thumbnails Strip */}
              {screenshots.length > 1 && (
                <div className="detail-thumbnails-strip">
                  {screenshots.map((shot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`detail-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      title={shot.caption || `Screenshot ${idx + 1}`}
                    >
                      <img src={shot.url} alt={shot.caption || `Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Tabs Bar */}
            <div className="detail-tabs-bar" role="tablist">
              <button 
                role="tab"
                aria-selected={activeTab === 'overview'}
                className={`detail-tab-btn ${activeTab === 'overview' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span>Overview & Fit</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'features'}
                className={`detail-tab-btn ${activeTab === 'features' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <span>Features & Modules</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'demo'}
                className={`detail-tab-btn ${activeTab === 'demo' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('demo')}
              >
                <Play size={13} className="text-gold" />
                <span>Live Demo & Logins</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'tech'}
                className={`detail-tab-btn ${activeTab === 'tech' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                <span>Architecture & Specs</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'requirements'}
                className={`detail-tab-btn ${activeTab === 'requirements' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('requirements')}
              >
                <span>Requirements</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'install'}
                className={`detail-tab-btn ${activeTab === 'install' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('install')}
              >
                <span>Setup Guide</span>
              </button>
            </div>

            {/* ============================================================= */}
            {/* TAB 1: OVERVIEW & ECOSYSTEM                                   */}
            {/* ============================================================= */}
            {activeTab === 'overview' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <h2 className="content-card-title">Software Overview & Ecosystem</h2>
                  <div className="content-paragraphs">
                    <p className="lead-paragraph">{product.fullDesc || product.shortDesc}</p>
                    <p>
                      Built with modern enterprise standards, this software suite is delivered with complete, 
                      unencrypted source code. It empowers your engineering and business teams to launch without 
                      per-user subscription overhead, vendor lock-in, or third-party data tracking.
                    </p>
                  </div>
                </section>

                {/* Who Should Use This Software */}
                {product.whoShouldUse && (
                  <section className="detail-content-card">
                    <h2 className="content-card-title">Target Audience & Ideal Use-Cases</h2>
                    <p className="audience-text">{product.whoShouldUse}</p>
                  </section>
                )}

                {/* 4 Sovereign Commercial Pillars */}
                <section className="detail-content-card">
                  <h2 className="content-card-title">Commercial & Architecture Advantages</h2>
                  <div className="advantages-quad-grid">
                    <div className="adv-quad-card">
                      <div className="adv-icon"><Server size={20} className="text-gold" /></div>
                      <div>
                        <strong>100% Data Sovereignty</strong>
                        <p>Deploy on your private Linux, Docker, or Cloud server. Zero vendor telemetry or data leaks.</p>
                      </div>
                    </div>
                    <div className="adv-quad-card">
                      <div className="adv-icon"><KeyRound size={20} className="text-gold" /></div>
                      <div>
                        <strong>No Monthly Per-User Fees</strong>
                        <p>One-time perpetual licensing. Unlimited internal employees, admins, and operational seats.</p>
                      </div>
                    </div>
                    <div className="adv-quad-card">
                      <div className="adv-icon"><Code2 size={20} className="text-gold" /></div>
                      <div>
                        <strong>Full Source Code Included</strong>
                        <p>Complete unencrypted codebase (.php, .js, .sql, Docker) for complete customization control.</p>
                      </div>
                    </div>
                    <div className="adv-quad-card">
                      <div className="adv-icon"><ShieldCheck size={20} className="text-gold" /></div>
                      <div>
                        <strong>Direct Engineer Support</strong>
                        <p>Direct consultation and optional adaptation services from Kiaan Technology software engineers.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 2: FEATURES & MODULE BREAKDOWN                            */}
            {/* ============================================================= */}
            {activeTab === 'features' && (
              <div className="detail-tab-content">
                
                {/* Feature Groups (Structured Cards) */}
                {product.featureGroups && product.featureGroups.length > 0 ? (
                  <div className="feature-groups-container">
                    {product.featureGroups.map((group, gIdx) => (
                      <section key={gIdx} className="detail-content-card group-card">
                        <div className="group-card-header">
                          <div className="group-header-left">
                            <span className="group-badge-icon">
                              {group.icon === 'ShieldCheck' && <ShieldCheck size={18} className="text-gold" />}
                              {group.icon === 'Briefcase' && <Briefcase size={18} className="text-gold" />}
                              {group.icon === 'User' && <User size={18} className="text-gold" />}
                              {group.icon === 'CreditCard' && <CreditCard size={18} className="text-gold" />}
                              {group.icon === 'Globe' && <Globe size={18} className="text-gold" />}
                              {!['ShieldCheck', 'Briefcase', 'User', 'CreditCard', 'Globe'].includes(group.icon) && <Sparkles size={18} className="text-gold" />}
                            </span>
                            <h3 className="group-title">{group.title}</h3>
                          </div>
                          <span className="group-count">{group.items?.length || 0} Features</span>
                        </div>
                        <div className="group-items-grid">
                          {(group.items || []).map((item, iIdx) => (
                            <div key={iIdx} className="group-item-row">
                              <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <section className="detail-content-card">
                    <h2 className="content-card-title">Verified Core Capabilities</h2>
                    <div className="features-checklist-grid">
                      {(product.features || []).map((feat, idx) => (
                        <div key={idx} className="feature-check-row">
                          <CheckCircle2 size={18} className="text-success feature-icon" />
                          <span className="feature-text">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Integrated Functional Modules */}
                {product.modules && product.modules.length > 0 && (
                  <section className="detail-content-card mt-4">
                    <h2 className="content-card-title">Included Software Functional Modules</h2>
                    <div className="modules-badge-grid">
                      {product.modules.map((mod, idx) => (
                        <div key={idx} className="module-item-card">
                          <div className="module-index-pill">{idx + 1}</div>
                          <h4 className="module-name">{mod}</h4>
                          <span className="module-tag">Production Ready</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 3: LIVE DEMO & TEST LOGINS                                */}
            {/* ============================================================= */}
            {activeTab === 'demo' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <div className="demo-header-banner">
                    <div>
                      <h2 className="content-card-title">Live Interactive Demo Access</h2>
                      <p className="content-sub-text">
                        Test all available dashboards and administrative workflows in a sandbox environment.
                      </p>
                    </div>
                    {hasLiveDemo && (
                      <button 
                        type="button"
                        className="btn btn-gold btn-md"
                        onClick={handleLiveDemoClick}
                      >
                        <Play size={15} />
                        <span>Open Live Demo</span>
                        <ExternalLink size={13} className="ml-1" />
                      </button>
                    )}
                  </div>

                  {/* Demo URL Bar */}
                  <div className="demo-url-box">
                    <Globe size={18} className="text-gold flex-shrink-0" />
                    <div className="demo-url-text">
                      <span className="demo-url-lbl">DEMO HOST URL:</span>
                      <a 
                        href={product.demoUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="demo-url-link font-mono"
                      >
                        {product.demoUrl || 'https://demo.kiaantechnology.com'}
                      </a>
                    </div>
                    <button 
                      type="button" 
                      className="demo-copy-url-btn"
                      onClick={() => handleCopy(product.demoUrl || 'https://demo.kiaantechnology.com', 'demo-url')}
                    >
                      <Copy size={13} />
                      <span>{copiedKey === 'demo-url' ? 'Copied URL!' : 'Copy Link'}</span>
                    </button>
                  </div>

                  {/* Multi-Role Demo Credentials Cards */}
                  <div className="demo-accounts-stack">
                    <h3 className="demo-accounts-heading">Pre-configured Demo Test Accounts:</h3>
                    
                    {demoAccounts.map((acc, idx) => (
                      <div key={idx} className="demo-account-card">
                        <div className="demo-acc-top">
                          <div className="demo-acc-role-wrap">
                            <span className="demo-acc-badge">{acc.role}</span>
                            {acc.url && acc.url !== product.demoUrl && (
                              <a href={acc.url} target="_blank" rel="noopener noreferrer" className="demo-acc-direct-link">
                                <span>Login URL</span>
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          {acc.note && <span className="demo-acc-note">{acc.note}</span>}
                        </div>

                        <div className="demo-acc-creds-row">
                          <div className="cred-pill">
                            <span className="cred-lbl">Email:</span>
                            <span className="cred-val font-mono">{acc.email}</span>
                            <button 
                              type="button"
                              className="cred-copy-btn"
                              onClick={() => handleCopy(acc.email, `email-${idx}`)}
                              title="Copy email"
                            >
                              <Copy size={12} />
                              <span>{copiedKey === `email-${idx}` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <div className="cred-pill">
                            <span className="cred-lbl">Password:</span>
                            <span className="cred-val font-mono">{acc.password}</span>
                            <button 
                              type="button"
                              className="cred-copy-btn"
                              onClick={() => handleCopy(acc.password, `pass-${idx}`)}
                              title="Copy password"
                            >
                              <Copy size={12} />
                              <span>{copiedKey === `pass-${idx}` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          {acc.url && (
                            <a 
                              href={acc.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn btn-secondary btn-sm ml-auto"
                            >
                              <span>Launch {acc.role.split(' ')[0]}</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="demo-info-note">
                    <Info size={16} className="text-gold flex-shrink-0" />
                    <span>
                      Demo accounts are refreshed automatically every 24 hours. Feel free to explore features, 
                      create test data, and review administrative controls.
                    </span>
                  </div>
                </section>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 4: ARCHITECTURE & TECHNICAL SPECS                         */}
            {/* ============================================================= */}
            {activeTab === 'tech' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <div className="tech-header-line">
                    <Code2 size={20} className="text-gold" />
                    <h2 className="content-card-title">Technology Stack & Specifications</h2>
                  </div>
                  <p className="content-sub-text">Architectural details and file deliverables for technical evaluation.</p>

                  <div className="tech-specs-table">
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Core Framework</span>
                      <span className="tech-spec-val font-mono"><strong>{techSpecs.framework}</strong></span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Programming Language</span>
                      <span className="tech-spec-val font-mono">{techSpecs.language}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Database Engine</span>
                      <span className="tech-spec-val font-mono">{techSpecs.database}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Frontend Architecture</span>
                      <span className="tech-spec-val">{techSpecs.frontend}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Architectural Pattern</span>
                      <span className="tech-spec-val">{techSpecs.architecture}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Files Included</span>
                      <span className="tech-spec-val">{techSpecs.filesIncluded}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Software Version</span>
                      <span className="tech-spec-val font-mono">{techSpecs.softwareVersion}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">First Release</span>
                      <span className="tech-spec-val">{techSpecs.firstRelease}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Last Production Update</span>
                      <span className="tech-spec-val">{techSpecs.lastUpdate}</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 5: SERVER REQUIREMENTS                                    */}
            {/* ============================================================= */}
            {activeTab === 'requirements' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <div className="tech-header-line">
                    <Server size={20} className="text-gold" />
                    <h2 className="content-card-title">Production Server & Hosting Requirements</h2>
                  </div>
                  <p className="content-sub-text">Ensure your target server or cloud VPS fulfills these prerequisites.</p>

                  <div className="requirements-checklist">
                    {requirements.map((req, idx) => (
                      <div key={idx} className="requirement-row">
                        <CheckCircle2 size={17} className="text-success flex-shrink-0" />
                        <span className="requirement-text">{req}</span>
                        <span className="requirement-badge">Verified</span>
                      </div>
                    ))}
                  </div>

                  <div className="requirements-callout">
                    <ShieldCheck size={18} className="text-gold flex-shrink-0" />
                    <div>
                      <strong>Need Server Installation Assistance?</strong>
                      <p>Select the optional PHP/Node Installation Support option on the right sidebar, and our certified engineers will handle full configuration for you.</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ============================================================= */}
            {/* TAB 6: SETUP & INSTALLATION GUIDE                             */}
            {/* ============================================================= */}
            {activeTab === 'install' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <div className="tech-header-line">
                    <Terminal size={20} className="text-gold" />
                    <h2 className="content-card-title">Deployment & Installation Instructions</h2>
                  </div>
                  <p className="content-sub-text">Standard deployment workflow to get this software operational on your server.</p>

                  <div className="install-steps-timeline">
                    {installInstructions.map((step, idx) => (
                      <div key={idx} className="install-step-item">
                        <div className="step-number-circle">{idx + 1}</div>
                        <div className="step-content">
                          <p className="step-instruction">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="install-docs-footer">
                    <FileText size={18} className="text-gold" />
                    <span>Complete PDF documentation and Docker Quickstart guide is packaged within the download bundle.</span>
                  </div>
                </section>
              </div>
            )}

          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Codester/Envato Style Commercial Action Sidebar     */}
          {/* ================================================================= */}
          <div className="detail-right-col">
            <aside className="sticky-action-card">
              
              {/* License Option Selector */}
              <div className="license-picker-box">
                <span className="license-picker-label">SELECT LICENSE TIER:</span>
                
                <div className="license-options-grid">
                  <div 
                    className={`license-option-card ${licenseType === 'regular' ? 'active' : ''}`}
                    onClick={() => setLicenseType('regular')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="license-card-head">
                      <span className="license-name">Regular License</span>
                      <strong className="license-price">{regularPriceStr}</strong>
                    </div>
                    <p className="license-desc">
                      Use in 1 live project for personal or commercial purposes, by you or for a client.
                    </p>
                  </div>

                  <div 
                    className={`license-option-card ${licenseType === 'extended' ? 'active' : ''}`}
                    onClick={() => setLicenseType('extended')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="license-card-head">
                      <span className="license-name">Extended License</span>
                      <strong className="license-price">{extendedPriceStr}</strong>
                    </div>
                    <p className="license-desc">
                      Use in multiple commercial projects, SaaS reselling, or enterprise distribution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional Installation Service Add-on */}
              <div className="addon-service-card">
                <label className="addon-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="addon-checkbox"
                  />
                  <div className="addon-text-wrap">
                    <div className="addon-title-row">
                      <Wrench size={14} className="text-gold" />
                      <strong className="addon-name">Server Installation Service</strong>
                      <span className="addon-cost">+{installPriceStr}</span>
                    </div>
                    <p className="addon-desc">
                      Certified engineers install, configure database, and test your server within 24 hours.
                    </p>
                  </div>
                </label>
              </div>

              {/* Price Calculation Summary */}
              <div className="action-pricing-summary">
                <div className="total-price-row">
                  <span className="total-lbl">Total Investment:</span>
                  <div className="total-val">{formattedTotalPrice}</div>
                </div>
                <span className="total-note">One-time license payment • No recurring monthly SaaS fees</span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="action-buttons-stack">
                <button 
                  type="button"
                  className="btn btn-primary btn-lg w-full buy-now-btn"
                  onClick={handleBuyNow}
                >
                  <ShoppingCart size={17} />
                  <span>Buy License & Download</span>
                </button>

                {hasLiveDemo ? (
                  <button 
                    type="button"
                    className="btn btn-gold btn-md w-full demo-launch-cta"
                    onClick={handleLiveDemoClick}
                  >
                    <Play size={15} />
                    <span>Launch Live Interactive Demo</span>
                    <ExternalLink size={13} className="ml-auto" />
                  </button>
                ) : (
                  <div className="demo-unavailable-box">
                    <Info size={15} className="text-muted flex-shrink-0" />
                    <span>Demo Coming Soon</span>
                  </div>
                )}

                {/* Request Customization Button */}
                <button 
                  type="button"
                  className="btn btn-secondary btn-md w-full"
                  onClick={() => onRequestQuote && onRequestQuote(`Customization for ${product.name}`)}
                >
                  <FileText size={15} className="text-gold" />
                  <span>Request Custom Feature Adaptation</span>
                </button>
              </div>

              {/* Commercial Guarantees Box */}
              <div className="action-trust-reassurances">
                <h4 className="trust-box-title">Why Buy from Kiaan Marketplace:</h4>
                <ul className="trust-bullets">
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>100% Unencrypted Source Code:</strong> Included in .zip</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>6 Months Engineer Support:</strong> Included free</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>Future Product Updates:</strong> Free lifelong updates</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>Quality Verified:</strong> Tested & certified by Kiaan</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>Self-Hosted:</strong> Zero monthly per-seat subscription</span>
                  </li>
                </ul>
              </div>

              {/* Quick Demo Credentials Box on Sidebar */}
              <div className="sidebar-quick-demo-box">
                <div className="quick-demo-head">
                  <KeyRound size={14} className="text-gold" />
                  <span>Quick Demo Logins</span>
                </div>
                <div className="quick-demo-content">
                  <div className="quick-demo-row">
                    <span className="lbl">Admin:</span>
                    <span className="val font-mono">{demoAccounts[0]?.email || 'admin@demo.com'}</span>
                    <button 
                      type="button" 
                      className="sidebar-copy-btn"
                      onClick={() => handleCopy(`${demoAccounts[0]?.email || 'admin@demo.com'} / ${demoAccounts[0]?.password || 'password'}`, 'quick-admin')}
                    >
                      {copiedKey === 'quick-admin' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="quick-demo-pass-row">
                    <span className="lbl">Pass:</span>
                    <span className="val font-mono">{demoAccounts[0]?.password || 'password'}</span>
                  </div>
                </div>
              </div>

              {/* Codester/Envato Style Product Metadata Table */}
              <div className="product-meta-specs-card">
                <h4 className="meta-card-title">Software Specifications</h4>
                
                <div className="meta-specs-table">
                  <div className="meta-spec-row">
                    <span className="spec-label">Category:</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  <div className="meta-spec-row">
                    <span className="spec-label">Software Version:</span>
                    <span className="spec-value font-mono">{techSpecs.softwareVersion}</span>
                  </div>
                  <div className="meta-spec-row">
                    <span className="spec-label">First Release:</span>
                    <span className="spec-value">{techSpecs.firstRelease}</span>
                  </div>
                  <div className="meta-spec-row">
                    <span className="spec-label">Last Production Update:</span>
                    <span className="spec-value">{techSpecs.lastUpdate}</span>
                  </div>
                  <div className="meta-spec-row">
                    <span className="spec-label">Files Included:</span>
                    <span className="spec-value text-xs">{techSpecs.filesIncluded}</span>
                  </div>
                </div>

                {/* Tags Chips */}
                {product.tags && product.tags.length > 0 && (
                  <div className="meta-tags-container">
                    <span className="tags-label">Tags:</span>
                    <div className="tags-chips-wrap">
                      {product.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="meta-tag-chip">
                          <Tag size={10} />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </aside>
          </div>

        </div>

      </main>

      {/* Screenshot Gallery Modal (Full Screen Carousel) */}
      {galleryModalOpen && (
        <ScreenshotGalleryModal 
          product={product}
          onClose={() => setGalleryModalOpen(false)}
        />
      )}

    </div>
  );
}
