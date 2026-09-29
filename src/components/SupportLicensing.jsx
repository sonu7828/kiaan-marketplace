import React from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  X, 
  RefreshCw, 
  Globe, 
  FileText,
  Lock,
  Headphones
} from 'lucide-react';

export default function SupportLicensing() {
  const licenseTiers = [
    {
      name: 'Single Domain Perpetual',
      badge: 'Standard Production',
      desc: 'Ideal for single-company operations deploying to one primary domain.',
      features: [
        { text: '1 Production Domain Bind', included: true },
        { text: '1 Local / Staging Environment', included: true },
        { text: 'Production Build Packages', included: true },
        { text: '12 Months Security Updates', included: true },
        { text: 'Full Unobfuscated Source Code', included: false },
        { text: 'Unlimited Subdomain Deployment', included: false }
      ]
    },
    {
      name: 'Multi-Branch Enterprise',
      badge: 'Multi-Entity',
      desc: 'For multi-location or holding entities running several regional branches.',
      features: [
        { text: 'Up to 5 Production Domains', included: true },
        { text: 'Unlimited Staging Envs', included: true },
        { text: 'Production Build Packages', included: true },
        { text: '12 Months Priority Updates', included: true },
        { text: 'Standard Customization Rights', included: true },
        { text: 'Dedicated 4h SLA Escalation', included: false }
      ]
    },
    {
      name: 'Full Developer Source Tier',
      badge: 'Maximum Freedom',
      desc: 'For software engineering teams needing total architectural independence.',
      features: [
        { text: 'Unlimited Internal Deployments', included: true },
        { text: 'Full React & Node.js Source Code', included: true },
        { text: 'Complete Git Repository Access', included: true },
        { text: 'Right to Modify Core Modules', included: true },
        { text: 'Automated Migration Scripts', included: true },
        { text: 'Direct Architect Support Channel', included: true }
      ]
    }
  ];

  return (
    <section className="licensing-section" id="support-licensing">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Clarity & Governance</span>
          <h2 className="section-title">Transparent Software Ownership & Licensing Rules</h2>
          <p className="section-subtitle">
            Know exactly what you own, how your license works, and how our support protects your business operations with zero hidden surprises.
          </p>
        </div>

        {/* 3 Tier Comparison Cards */}
        <div className="license-tiers-grid">
          {licenseTiers.map((tier, idx) => (
            <div key={idx} className={`tier-card ${idx === 0 ? 'tier-highlighted' : ''}`}>
              <div className="tier-badge-bar">
                <span className="badge badge-gold">{tier.badge}</span>
              </div>

              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-desc">{tier.desc}</p>

              <div className="tier-features-list">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="tier-feat-row">
                    {feat.included ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <X size={16} className="text-muted" />
                    )}
                    <span className={feat.included ? 'feat-text-active' : 'feat-text-disabled'}>
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="tier-footer">
                <span className="tier-note">Sample Reference Specification</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Governance Rules Grid */}
        <div className="rules-grid">
          
          <div className="rule-box">
            <div className="rule-icon-wrap">
              <Globe size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="rule-title">Domain Binding & Transfer Policy</h4>
              <p className="rule-desc">
                Licenses bind cryptographically to authorized production Fully Qualified Domain Names (FQDN). Need to migrate servers or rebrand? Initiate a domain transfer in the Customer Portal with rapid admin verification.
              </p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-icon-wrap">
              <RefreshCw size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="rule-title">Offline Grace Period Guarantee</h4>
              <p className="rule-desc">
                Network outages will never lock you out of your mission-critical ERP or POS. Signed tokens are cached locally with a guaranteed 30-day offline grace period. The license authority verifies quietly when connectivity resumes.
              </p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-icon-wrap">
              <Lock size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="rule-title">Server-Side Authority Architecture</h4>
              <p className="rule-desc">
                Per the blueprint requirements, customer-facing screens never determine license validity alone. Kiaan's License Cloud generates asymmetric cryptographic tokens verified securely by your backend server.
              </p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-icon-wrap">
              <Headphones size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="rule-title">Direct In-House Support SLA</h4>
              <p className="rule-desc">
                Support tickets are triaged directly by engineers at Kiaan Technology. We do not outsource customer service to external call centers. Fast resolution for database migrations, updates, and configuration queries.
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .licensing-section {
          padding-top: var(--space-4xl);
          padding-bottom: var(--space-4xl);
          background-color: var(--bg-page);
        }

        .license-tiers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .tier-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xs);
          transition: all var(--transition-fast);
        }

        .tier-card:hover {
          border-color: var(--border-default);
          box-shadow: var(--shadow-md);
        }

        .tier-highlighted {
          border-color: var(--accent-gold);
          background: var(--bg-surface-tint);
          position: relative;
        }

        .tier-highlighted::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-gold);
          border-top-left-radius: var(--radius-md);
          border-top-right-radius: var(--radius-md);
        }

        .tier-badge-bar {
          margin-bottom: 14px;
        }

        .tier-name {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }

        .tier-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .tier-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          flex: 1;
        }

        .tier-feat-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
        }

        .text-success { color: #10B981; }

        .feat-text-active {
          color: var(--text-primary);
          font-weight: 500;
        }

        .feat-text-disabled {
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .tier-footer {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          text-align: center;
        }

        .tier-note {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        /* Rules Grid */
        .rules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .rule-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .rule-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--accent-gold-subtle);
          border: 1px solid var(--accent-gold-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rule-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .rule-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .license-tiers-grid {
            grid-template-columns: 1fr;
          }

          .rules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
