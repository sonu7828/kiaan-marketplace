import React from 'react';
import { ShieldCheck, Server, KeyRound, ArrowRight, Database, Code2 } from 'lucide-react';

export default function EnterpriseBanner({ onLicensingClick, onExploreClick }) {
  return (
    <section className="enterprise-banner-section">
      <div className="container">
        
        <div className="banner-surface">
          <div className="banner-left">
            <div className="banner-badge">
              <span className="b-dot" />
              <span>ENTERPRISE ARCHITECTURE GUARANTEE</span>
            </div>

            <h2 className="banner-heading">
              Self-Hosted Source Code & Cryptographic Cloud Licensing
            </h2>

            <p className="banner-desc">
              Deploy sovereignly on your private AWS, GCP, or bare-metal Linux servers. No third-party data harvesting, zero vendor lock-in, and guaranteed 30-day offline grace periods with asymmetric RSA-4096 signature verification.
            </p>

            <div className="banner-actions">
              <a href="#support-licensing" className="btn btn-gold btn-md" onClick={onLicensingClick}>
                <span>Explore Licensing Models</span>
                <ArrowRight size={15} />
              </a>
              <a href="#featured-software" className="btn btn-secondary btn-md text-white border-subtle" onClick={onExploreClick}>
                <span>Browse Full Catalog</span>
              </a>
            </div>
          </div>

          <div className="banner-right">
            <div className="tech-stack-cards">
              <div className="stack-pill-box">
                <Code2 size={16} className="text-gold" />
                <div>
                  <strong>React 19 + Node.js</strong>
                  <span>Full MVC Architecture</span>
                </div>
              </div>

              <div className="stack-pill-box">
                <Database size={16} className="text-gold" />
                <div>
                  <strong>MySQL 8.0 Relational</strong>
                  <span>Auto-Migrated Tables</span>
                </div>
              </div>

              <div className="stack-pill-box">
                <KeyRound size={16} className="text-gold" />
                <div>
                  <strong>ECDSA Signed Tokens</strong>
                  <span>Central Cloud Validation</span>
                </div>
              </div>

              <div className="stack-pill-box">
                <Server size={16} className="text-gold" />
                <div>
                  <strong>Docker & Bare Metal</strong>
                  <span>100% Data Sovereignty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .enterprise-banner-section {
          padding-top: 24px;
          padding-bottom: 32px;
          background: #FAFAF8;
        }

        .banner-surface {
          background: linear-gradient(135deg, #101318 0%, #171C25 100%);
          border: 1px solid #232B39;
          border-radius: var(--radius-lg);
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 36px;
          align-items: center;
          color: #FFFFFF;
          box-shadow: 0 16px 36px -6px rgba(18, 20, 23, 0.28);
          position: relative;
          overflow: hidden;
        }

        .banner-surface::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .banner-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 2;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-gold);
          background: rgba(217, 119, 6, 0.12);
          border: 1px solid rgba(217, 119, 6, 0.3);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
          width: fit-content;
        }

        .b-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-gold);
        }

        .banner-heading {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.25;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .banner-desc {
          font-size: 14.5px;
          color: #9DA8B8;
          line-height: 1.6;
          max-width: 620px;
        }

        .banner-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .border-subtle {
          border-color: #2F394A !important;
          background: #171C24 !important;
        }

        .border-subtle:hover {
          background: #202733 !important;
          border-color: #435168 !important;
        }

        .text-white {
          color: #FFFFFF !important;
        }

        .banner-right {
          display: flex;
          justify-content: flex-end;
          z-index: 2;
        }

        .tech-stack-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 380px;
        }

        .stack-pill-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stack-pill-box strong {
          display: block;
          font-size: 12.5px;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .stack-pill-box span {
          display: block;
          font-size: 10px;
          color: #8E99A8;
          margin-top: 2px;
        }

        @media (max-width: 1024px) {
          .banner-surface {
            grid-template-columns: 1fr;
            padding: 28px;
          }

          .banner-right {
            justify-content: flex-start;
          }

          .tech-stack-cards {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .banner-heading {
            font-size: 22px;
          }

          .tech-stack-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
