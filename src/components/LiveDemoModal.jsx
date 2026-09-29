import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Play, 
  ShieldCheck, 
  Layers, 
  Users, 
  Briefcase, 
  RefreshCw, 
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { PRODUCTS } from '../data/marketplaceData';

export default function LiveDemoModal({ productId, onClose, onSelectProduct }) {
  const [currentId, setCurrentId] = useState(productId || 'kiaan-erp-core');
  const [activeTab, setActiveTab] = useState('overview');

  const product = PRODUCTS.find(p => p.id === currentId) || PRODUCTS[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content demo-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Sandbox Bar */}
        <div className="demo-header-bar">
          <div className="sandbox-info">
            <span className="live-pulse" />
            <span className="sandbox-title">KIAAN INTERACTIVE SANDBOX // ISOLATED DEMO CONTAINER</span>
          </div>

          <div className="demo-header-right">
            <span className="badge badge-active">AUTHENTICATED DEMO</span>
            <button className="demo-close-btn" onClick={onClose} aria-label="Close demo">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Product Switcher Bar */}
        <div className="demo-product-switcher">
          <span className="switcher-lbl">SWITCH DEMO SUITE:</span>
          <div className="switcher-buttons">
            {PRODUCTS.slice(0, 4).map(p => (
              <button 
                key={p.id}
                className={`switch-btn ${p.id === currentId ? 'switch-active' : ''}`}
                onClick={() => setCurrentId(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated Sandbox Interface */}
        <div className="demo-sandbox-canvas">
          
          {/* Simulated App Header */}
          <div className="app-header-sim">
            <div className="app-title-block">
              <div className="mini-logo">K</div>
              <span className="app-name">{product.name}</span>
              <span className="app-env-tag">STAGING / DEMO</span>
            </div>

            <div className="app-license-sim">
              <ShieldCheck size={14} className="text-success" />
              <span>License Cloud: <strong>ACTIVE (ECDSA-VERIFIED)</strong></span>
            </div>
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="app-content-sim">
            
            <div className="sim-stats-grid">
              <div className="sim-stat-card">
                <span className="sim-stat-lbl">ACTIVE TRANSACTIONS</span>
                <span className="sim-stat-val tabular-nums">1,842</span>
                <span className="sim-stat-trend text-success">↑ 18% vs last cycle</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-lbl">CONSOLIDATED BALANCE</span>
                <span className="sim-stat-val tabular-nums">₹84,20,500</span>
                <span className="sim-stat-trend">Sovereign Ledger Synced</span>
              </div>
              <div className="sim-stat-card">
                <span className="sim-stat-lbl">SYSTEM HEALTH</span>
                <span className="sim-stat-val text-success">99.99%</span>
                <span className="sim-stat-trend">0 Grace Alerts</span>
              </div>
            </div>

            {/* Interactive Mock Table */}
            <div className="sim-table-card">
              <div className="sim-table-head">
                <span>REFERENCE</span>
                <span>ENTITY / CLIENT</span>
                <span>CATEGORY</span>
                <span>STATUS</span>
                <span>AMOUNT</span>
              </div>

              <div className="sim-table-row">
                <span className="font-mono">TX-2026-9041</span>
                <span>Aura Healthcare Pvt Ltd</span>
                <span>Enterprise Core</span>
                <span className="badge badge-active">VERIFIED</span>
                <span className="tabular-nums font-semibold">₹1,45,000</span>
              </div>
              <div className="sim-table-row">
                <span className="font-mono">TX-2026-9042</span>
                <span>Zenith Logistics Hub</span>
                <span>WMS Module</span>
                <span className="badge badge-gold">INSPECTING</span>
                <span className="tabular-nums font-semibold">₹68,500</span>
              </div>
              <div className="sim-table-row">
                <span className="font-mono">TX-2026-9043</span>
                <span>Nexus Retail Systems</span>
                <span>Swift POS</span>
                <span className="badge badge-active">SETTLED</span>
                <span className="tabular-nums font-semibold">₹34,200</span>
              </div>
            </div>

            <div className="sim-console-strip">
              <Terminal size={13} className="text-gold" />
              <span>[Kiaan Sandbox Daemon] Rest API listening on localhost:5000 • MySQL InnoDB connected</span>
            </div>

          </div>

        </div>

        {/* Demo Bottom Footer */}
        <div className="demo-footer-bar">
          <div className="demo-note">
            <span>Ready to deploy {product.name} on your own sovereign servers?</span>
          </div>

          <div className="demo-actions">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close Demo
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                onClose();
                onSelectProduct(product);
              }}
            >
              <span>View Full Tech Specs & Pricing</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .demo-modal {
          max-width: 900px;
          padding: 0;
          background: #0E1116;
          color: #E2E8F0;
          border-color: #232A37;
        }

        .demo-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #080A0E;
          border-bottom: 1px solid #1E2532;
        }

        .sandbox-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .live-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .sandbox-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #94A3B8;
          letter-spacing: 0.04em;
        }

        .demo-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .demo-close-btn {
          color: #94A3B8;
          padding: 4px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .demo-close-btn:hover {
          color: #FFFFFF;
          background: #1B212C;
        }

        /* Product Switcher */
        .demo-product-switcher {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px;
          background: #131720;
          border-bottom: 1px solid #1F2735;
          flex-wrap: wrap;
        }

        .switcher-lbl {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #7E8C9D;
        }

        .switcher-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .switch-btn {
          font-size: 12px;
          font-weight: 600;
          color: #94A3B8;
          background: #1A202C;
          border: 1px solid #283244;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .switch-btn:hover {
          color: #FFFFFF;
          border-color: #3B465A;
        }

        .switch-active {
          color: #FFFFFF;
          background: var(--accent-gold);
          border-color: var(--accent-gold);
        }

        /* Canvas */
        .demo-sandbox-canvas {
          padding: 20px;
          background: #10141B;
          min-height: 380px;
        }

        .app-header-sim {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #171C25;
          border: 1px solid #252D3C;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
        }

        .app-title-block {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mini-logo {
          width: 24px;
          height: 24px;
          background: var(--accent-gold);
          color: #000;
          font-weight: 800;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .app-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .app-env-tag {
          font-family: var(--font-mono);
          font-size: 9.5px;
          background: #252D3C;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          color: #94A3B8;
        }

        .app-license-sim {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94A3B8;
          font-family: var(--font-mono);
        }

        /* Stats Grid */
        .sim-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .sim-stat-card {
          background: #171C25;
          border: 1px solid #252D3C;
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .sim-stat-lbl {
          font-size: 9.5px;
          font-weight: 700;
          color: #7E8C9D;
          font-family: var(--font-mono);
        }

        .sim-stat-val {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          margin-top: 4px;
        }

        .sim-stat-trend {
          font-size: 10.5px;
          color: #94A3B8;
          margin-top: 2px;
        }

        /* Table */
        .sim-table-card {
          background: #131720;
          border: 1px solid #222938;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 16px;
        }

        .sim-table-head {
          display: grid;
          grid-template-columns: 1.2fr 1.6fr 1.2fr 1fr 1fr;
          padding: 10px 14px;
          background: #0E1218;
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          font-family: var(--font-mono);
          border-bottom: 1px solid #1E2533;
        }

        .sim-table-row {
          display: grid;
          grid-template-columns: 1.2fr 1.6fr 1.2fr 1fr 1fr;
          padding: 12px 14px;
          align-items: center;
          font-size: 12px;
          color: #E2E8F0;
          border-bottom: 1px solid #1A202C;
        }

        .sim-console-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #0A0C10;
          border: 1px solid #1C2330;
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 11px;
          color: #7E8D9F;
        }

        /* Footer */
        .demo-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: #090B0F;
          border-top: 1px solid #1D2431;
          gap: 16px;
          flex-wrap: wrap;
        }

        .demo-note {
          font-size: 13px;
          color: #94A3B8;
        }

        .demo-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .sim-stats-grid {
            grid-template-columns: 1fr;
          }

          .sim-table-head, .sim-table-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
