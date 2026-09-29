import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Play, 
  Server, 
  KeyRound, 
  Clock, 
  ArrowRight,
  Database,
  ExternalLink,
  Code
} from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onLaunchDemo }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header Bar */}
        <div className="product-modal-top">
          <div className="top-category-meta">
            <span className="badge badge-gold">{product.category}</span>
            <span className="version-tag">{product.version}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Hero / Summary */}
        <div className="product-modal-hero">
          <div className="hero-left-summary">
            <h2 className="product-modal-title">{product.name}</h2>
            <p className="product-modal-desc">{product.shortDesc}</p>
            
            <div className="modal-tags">
              {product.capabilityTags.map((tag, i) => (
                <span key={i} className="modal-tag-item">
                  <CheckCircle2 size={12} className="text-gold" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="hero-right-purchase-box">
            <div className="price-badge-row">
              <span className="modal-price tabular-nums">{product.priceDisplay}</span>
              <span className="price-period">Perpetual License</span>
            </div>
            <span className="sample-disclaimer">{product.pricingNote}</span>

            <div className="modal-actions-col">
              <button 
                className="btn btn-gold btn-md w-full"
                onClick={() => {
                  onClose();
                  onLaunchDemo(product.id);
                }}
              >
                <Play size={14} />
                <span>Launch Live Demo</span>
              </button>
              <button 
                className="btn btn-primary btn-md w-full"
                onClick={() => alert(`[PROCEED TO CHECKOUT PREVIEW] Initiating order verification for ${product.name}.`)}
              >
                <span>Purchase Perpetual License</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs-bar">
          <button 
            className={`modal-tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Features
          </button>
          <button 
            className={`modal-tab ${activeTab === 'technical' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Stack & Schema
          </button>
          <button 
            className={`modal-tab ${activeTab === 'licensing' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('licensing')}
          >
            Licensing & Updates
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="modal-tab-body">
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <h4 className="pane-heading">Core Module Features</h4>
              <div className="features-checklist">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="feat-check-item">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="deployment-note-box">
                <Server size={18} className="text-gold" />
                <div>
                  <strong>Self-Hosted Deployment Target:</strong>
                  <p>{product.specs.deployment}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="tab-pane">
              <h4 className="pane-heading">Architecture & Technology Specifications</h4>
              <div className="tech-specs-table">
                <div className="spec-row">
                  <span className="spec-key">Core Runtime Stack:</span>
                  <span className="spec-val">{product.specs.stack}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Relational Database:</span>
                  <span className="spec-val">{product.specs.databaseTables || 'MySQL 8.0 with InnoDB foreign key constraints'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Source Code Rights:</span>
                  <span className="spec-val">{product.specs.sourceCode || 'Compiled Production Bundle (Developer Source Available)'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Data Sovereignty:</span>
                  <span className="spec-val">100% self-hosted; Zero third-party telemetry calls</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'licensing' && (
            <div className="tab-pane">
              <h4 className="pane-heading">Cryptographic Licensing Terms</h4>
              <div className="licensing-details-box">
                <div className="lic-rule-item">
                  <KeyRound size={16} className="text-gold" />
                  <div>
                    <strong>Domain Binding Model:</strong>
                    <p>{product.specs.licensingModel}</p>
                  </div>
                </div>
                <div className="lic-rule-item">
                  <Clock size={16} className="text-gold" />
                  <div>
                    <strong>Maintenance & Update Window:</strong>
                    <p>{product.specs.updatesIncluded}</p>
                  </div>
                </div>
                <div className="lic-rule-item">
                  <ShieldCheck size={16} className="text-gold" />
                  <div>
                    <strong>Offline Grace Policy:</strong>
                    <p>Guaranteed 30-day offline execution buffer with automatic background re-verification.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .product-modal {
          max-width: 820px;
          padding: 28px;
        }

        .product-modal-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 20px;
        }

        .top-category-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .version-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-surface-subtle);
          padding: 2px 8px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-subtle);
        }

        .modal-close-btn {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface-subtle);
        }

        .product-modal-hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: start;
          margin-bottom: 24px;
        }

        .product-modal-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .product-modal-desc {
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .modal-tag-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          color: var(--text-primary);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
        }

        .hero-right-purchase-box {
          background: var(--bg-surface-tint);
          border: 1px solid var(--accent-gold-border);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-badge-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .modal-price {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-period {
          font-size: 11.5px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .sample-disclaimer {
          font-size: 10.5px;
          color: var(--accent-gold-dark);
          font-weight: 500;
          line-height: 1.35;
        }

        .modal-actions-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 6px;
        }

        /* Tabs */
        .modal-tabs-bar {
          display: flex;
          border-bottom: 1px solid var(--border-subtle);
          gap: 16px;
          margin-bottom: 20px;
        }

        .modal-tab {
          padding: 10px 4px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
        }

        .modal-tab:hover {
          color: var(--text-primary);
        }

        .modal-tab.tab-active {
          color: var(--accent-gold-dark);
          border-bottom-color: var(--accent-gold);
        }

        .modal-tab-body {
          min-height: 180px;
        }

        .pane-heading {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .features-checklist {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .feat-check-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .deployment-note-box {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .tech-specs-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-xs);
          font-size: 13px;
        }

        .spec-key {
          font-weight: 600;
          color: var(--text-secondary);
        }

        .spec-val {
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 12.5px;
        }

        .licensing-details-box {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .lic-rule-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
        }

        .lic-rule-item strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 2px;
        }

        .lic-rule-item p {
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .product-modal-hero {
            grid-template-columns: 1fr;
          }

          .features-checklist {
            grid-template-columns: 1fr;
          }

          .spec-row {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}
