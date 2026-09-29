import React from 'react';
import { 
  Layers, 
  Users, 
  Briefcase, 
  Package, 
  CreditCard, 
  Cpu, 
  CheckCircle2, 
  BarChart3,
  Server,
  Database
} from 'lucide-react';

export default function ProductScreenshot({ product, className = '', height = 180 }) {
  const cat = product?.categoryId || 'erp';
  const name = product?.name || 'Software Suite';

  // Check if product has a real custom screenshot (not an unsplash generic photo)
  const isGenericUnsplash = product?.coverImage && product.coverImage.includes('unsplash.com');
  const hasRealImage = product?.coverImage && !isGenericUnsplash;

  if (hasRealImage) {
    return (
      <div className={`product-screenshot-frame ${className}`} style={{ height }}>
        <img 
          src={product.coverImage} 
          alt={name} 
          className="product-screenshot-img" 
          loading="lazy" 
        />
      </div>
    );
  }

  // Authentic Category-Specific Branded Software Interface Placeholder
  return (
    <div className={`product-screenshot-frame category-${cat} ${className}`} style={{ height }}>
      
      {/* Top Browser Bar */}
      <div className="screenshot-topbar">
        <div className="screenshot-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="screenshot-url">
          <span>{cat}.kiaantechnology.com</span>
        </div>
        <span className="screenshot-tech-badge">Self-Hosted</span>
      </div>

      {/* Screen Canvas */}
      <div className="screenshot-canvas">
        {cat === 'erp' && (
          <div className="ui-mock-erp">
            <div className="ui-kpi-row">
              <div className="ui-kpi-card">
                <span className="kpi-label">GENERAL LEDGER</span>
                <span className="kpi-number">Consolidated</span>
              </div>
              <div className="ui-kpi-card highlight">
                <span className="kpi-label">VOUCHERS</span>
                <span className="kpi-number">Multi-Currency</span>
              </div>
            </div>
            <div className="ui-table-preview">
              <div className="ui-table-head"><span>ACCOUNT / HEAD</span><span>BALANCE</span></div>
              <div className="ui-table-row"><span>Operating Account</span><span className="text-green">Verified</span></div>
              <div className="ui-table-row"><span>GST Payable / Input</span><span>Audited</span></div>
            </div>
          </div>
        )}

        {cat === 'crm' && (
          <div className="ui-mock-crm">
            <div className="ui-kanban-row">
              <div className="ui-kanban-col">
                <span className="col-title">NEW LEADS</span>
                <div className="ui-deal-card">Inquiry Pipeline</div>
              </div>
              <div className="ui-kanban-col">
                <span className="col-title">NEGOTIATION</span>
                <div className="ui-deal-card highlight">Contract Scope</div>
              </div>
              <div className="ui-kanban-col">
                <span className="col-title">CLOSED</span>
                <div className="ui-deal-card won">Verified Customer</div>
              </div>
            </div>
          </div>
        )}

        {cat === 'hrms' && (
          <div className="ui-mock-hrms">
            <div className="ui-kpi-row">
              <div className="ui-kpi-card">
                <span className="kpi-label">ATTENDANCE</span>
                <span className="kpi-number">98.4% Shift Sync</span>
              </div>
              <div className="ui-kpi-card highlight">
                <span className="kpi-label">PAYROLL</span>
                <span className="kpi-number">ECR Compliant</span>
              </div>
            </div>
            <div className="ui-table-preview">
              <div className="ui-table-head"><span>EMPLOYEE</span><span>STATUS</span></div>
              <div className="ui-table-row"><span>Engineering Staff</span><span className="text-green">Active Shift</span></div>
              <div className="ui-table-row"><span>Operations Head</span><span className="text-green">Active Shift</span></div>
            </div>
          </div>
        )}

        {cat === 'inventory' && (
          <div className="ui-mock-inventory">
            <div className="ui-kpi-row">
              <div className="ui-kpi-card">
                <span className="kpi-label">DEPOT STOCK</span>
                <span className="kpi-number">Central Depot</span>
              </div>
              <div className="ui-kpi-card highlight">
                <span className="kpi-label">REORDER</span>
                <span className="kpi-number">Automated Lot</span>
              </div>
            </div>
            <div className="ui-barcode-strip">
              <div className="barcode-bars" />
              <span className="barcode-text">SKU-REGISTRY-SYNC</span>
            </div>
          </div>
        )}

        {cat === 'pos' && (
          <div className="ui-mock-pos">
            <div className="ui-pos-screen">
              <div className="pos-item-list">
                <div className="pos-line"><span>Invoice Item 01</span><span>GST Included</span></div>
                <div className="pos-line"><span>Invoice Item 02</span><span>GST Included</span></div>
              </div>
              <div className="pos-checkout-bar">
                <span>TOTAL PAYABLE</span>
                <span className="pos-total-val">Swift Terminal</span>
              </div>
            </div>
          </div>
        )}

        {cat === 'automation' && (
          <div className="ui-mock-ai">
            <div className="ui-flow-nodes">
              <div className="flow-node">Document Webhook</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node highlight">OCR Engine</div>
              <span className="flow-arrow">→</span>
              <div className="flow-node">MySQL Sync</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="screenshot-footer">
        <span className="footer-category-tag">{product?.category || 'Enterprise'}</span>
        <span className="footer-stack-tag">Node + React + MySQL</span>
      </div>

    </div>
  );
}
