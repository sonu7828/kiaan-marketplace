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
  Building2,
  Check,
  Layers,
  Sparkles,
  Info,
  KeyRound
} from 'lucide-react';
import ProductScreenshot from './ProductScreenshot';

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onLaunchDemo, 
  onRequestQuote,
  onAddToCart 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'modules' | 'tech'

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

  const mainImageUrl = screenshots[activeImageIndex]?.url || product.coverImage || screenshots[0]?.url;
  const hasLiveDemo = product.demoUrl && product.demoUrl.trim().startsWith('http');

  const handleLiveDemoClick = () => {
    if (hasLiveDemo) {
      if (onLaunchDemo) {
        onLaunchDemo(product);
      } else {
        window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="product-detail-page">
      
      {/* Top Breadcrumbs Bar */}
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
        </div>
      </nav>

      {/* Main Detail Content */}
      <main className="container detail-main-content">
        
        {/* Header Block */}
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
            {product.customizationAvailable && (
              <span className="badge badge-secondary">Customization Available</span>
            )}
          </div>

          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-lead-summary">{product.shortDesc}</p>
        </div>

        {/* 2-Column Grid: Left Content (68%) & Right Evaluation Card (32%) */}
        <div className="detail-layout-grid">
          
          {/* LEFT COLUMN: Media & Tabs */}
          <div className="detail-left-col">
            
            {/* High-Resolution Screenshot Showcase */}
            <div className="detail-gallery-card">
              <div className="detail-main-image-wrap">
                {mainImageUrl && !mainImageUrl.includes('unsplash.com') ? (
                  <img 
                    src={mainImageUrl} 
                    alt={screenshots[activeImageIndex]?.caption || product.name} 
                    className="detail-main-image"
                  />
                ) : (
                  <ProductScreenshot product={product} height={360} />
                )}
                <div className="detail-image-caption">
                  <span>{screenshots[activeImageIndex]?.caption || `${product.name} Interface Overview`}</span>
                </div>
              </div>

              {/* Thumbnails Bar */}
              {screenshots.length > 1 && (
                <div className="detail-thumbnails-strip">
                  {screenshots.map((shot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`detail-thumb-btn ${idx === activeImageIndex ? 'thumb-active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      title={shot.caption || `Screenshot ${idx + 1}`}
                    >
                      <img src={shot.url} alt={shot.caption || `Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
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
                <span>Capabilities ({product.features?.length || 0})</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'modules'}
                className={`detail-tab-btn ${activeTab === 'modules' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('modules')}
              >
                <span>Integrated Modules ({product.modules?.length || 0})</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'tech'}
                className={`detail-tab-btn ${activeTab === 'tech' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                <span>Technical Specs</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <h2 className="content-card-title">Software Overview</h2>
                  <div className="content-paragraphs">
                    <p>{product.fullDesc || product.shortDesc}</p>
                  </div>
                </section>

                {product.whoShouldUse && (
                  <section className="detail-content-card">
                    <h2 className="content-card-title">Who Should Use This Software</h2>
                    <p className="audience-text">{product.whoShouldUse}</p>
                  </section>
                )}

                <section className="detail-content-card">
                  <h2 className="content-card-title">Commercial & Deployment Advantages</h2>
                  <div className="advantages-grid">
                    <div className="adv-item">
                      <div className="adv-icon"><Server size={18} className="text-gold" /></div>
                      <div>
                        <strong>100% Data Sovereignty</strong>
                        <p>Deploy on your private Linux, Docker, or Cloud server. Zero vendor telemetry.</p>
                      </div>
                    </div>
                    <div className="adv-item">
                      <div className="adv-icon"><KeyRound size={18} className="text-gold" /></div>
                      <div>
                        <strong>No Monthly SaaS Lock-in</strong>
                        <p>One-time perpetual licensing with complete deployment sovereignty.</p>
                      </div>
                    </div>
                    <div className="adv-item">
                      <div className="adv-icon"><ShieldCheck size={18} className="text-gold" /></div>
                      <div>
                        <strong>Custom Adaptation Ready</strong>
                        <p>Direct engagement with Kiaan software architects to adapt modules to your business rules.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: FEATURES */}
            {activeTab === 'features' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <h2 className="content-card-title">Verified Capabilities & Features</h2>
                  <p className="content-sub-text">Engineered for commercial precision, daily operational efficiency, and multi-user reliability.</p>
                  
                  <div className="features-checklist-grid">
                    {(product.features || []).map((feat, idx) => (
                      <div key={idx} className="feature-check-row">
                        <CheckCircle2 size={18} className="text-success feature-icon" />
                        <span className="feature-text">{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 3: MODULES */}
            {activeTab === 'modules' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <h2 className="content-card-title">Integrated Functional Modules</h2>
                  <p className="content-sub-text">This software package includes the following production-ready functional modules:</p>
                  
                  <div className="modules-badge-grid">
                    {(product.modules || []).map((mod, idx) => (
                      <div key={idx} className="module-item-card">
                        <div className="module-index-pill">{idx + 1}</div>
                        <h3 className="module-name">{mod}</h3>
                        <span className="module-tag">Included Component</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 4: TECHNICAL SPECIFICATIONS */}
            {activeTab === 'tech' && (
              <div className="detail-tab-content">
                <section className="detail-content-card">
                  <div className="tech-header-line">
                    <Code2 size={20} className="text-gold" />
                    <h2 className="content-card-title">Technical Information</h2>
                  </div>
                  <p className="content-sub-text">Architectural specifications for your IT team or system administrator.</p>

                  <div className="tech-specs-table">
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Technology Stack</span>
                      <span className="tech-spec-val">{product.techStack || 'React, Node.js (Express), MySQL'}</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Deployment Target</span>
                      <span className="tech-spec-val">Linux (Ubuntu / Debian), Docker, Cloud VPS (AWS, GCP, DigitalOcean)</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Database Engine</span>
                      <span className="tech-spec-val">MySQL 8.0+ / MariaDB / PostgreSQL compatible</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">API & Interoperability</span>
                      <span className="tech-spec-val">RESTful JSON APIs for external ERP/accounting bridge</span>
                    </div>
                    <div className="tech-spec-row">
                      <span className="tech-spec-lbl">Source Code Availability</span>
                      <span className="tech-spec-val">{product.sourceCodeAvailable ? 'Full source code option available on contract' : 'Available with Enterprise License'}</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Evaluation Card */}
          <div className="detail-right-col">
            <aside className="sticky-action-card">
              
              {/* Commercial Status */}
              <div className="action-pricing-box">
                <span className="price-lead-label">Licensing & Commercials:</span>
                <div className="price-big-display">
                  {product.pricing?.priceDisplay || 'Contact for Pricing'}
                </div>
                <p className="price-note-text">
                  {product.pricing?.pricingNote || 'Perpetual single-domain license with dedicated server deployment assistance.'}
                </p>
              </div>

              {/* Primary Actions */}
              <div className="action-buttons-stack">
                
                {/* Live Demo Button */}
                {hasLiveDemo ? (
                  <button 
                    type="button"
                    className="btn btn-gold btn-lg w-full demo-launch-cta"
                    onClick={handleLiveDemoClick}
                  >
                    <Play size={16} />
                    <span>Launch Live Interactive Demo</span>
                    <ExternalLink size={14} className="ml-auto" />
                  </button>
                ) : (
                  <div className="demo-unavailable-box">
                    <Info size={16} className="text-muted flex-shrink-0" />
                    <span>Demo Coming Soon</span>
                  </div>
                )}

                {/* Optional Demo Video */}
                {product.demoVideoUrl && (
                  <a 
                    href={product.demoVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-md w-full"
                  >
                    <Video size={15} className="text-gold" />
                    <span>Watch Walkthrough Video</span>
                  </a>
                )}

                {/* Request Customization / Quote Button */}
                <button 
                  type="button"
                  className="btn btn-secondary btn-md w-full"
                  onClick={() => onRequestQuote && onRequestQuote(`Customization for ${product.name}`)}
                >
                  <FileText size={15} className="text-gold" />
                  <span>Request Customization / Quote</span>
                </button>

              </div>

              {/* Trust & Guarantee Box */}
              <div className="action-trust-reassurances">
                <h4 className="trust-box-title">Why Buy from Kiaan Technology:</h4>
                <ul className="trust-bullets">
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>100% Self-Hosted:</strong> Installed on your server</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>Deployment Assistance:</strong> Included with license</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>Direct Engineers:</strong> Built & maintained by Kiaan</span>
                  </li>
                  <li>
                    <Check size={14} className="text-gold" />
                    <span><strong>No Per-User Fees:</strong> Unlimited internal team users</span>
                  </li>
                </ul>
              </div>

            </aside>
          </div>

        </div>

      </main>

    </div>
  );
}
