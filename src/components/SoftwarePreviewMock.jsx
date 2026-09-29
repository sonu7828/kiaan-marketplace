import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Database,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function SoftwarePreviewMock({ type, size = 'normal' }) {
  // Renders clean, high-fidelity UI mockup previews for commercial software discovery
  
  if (type === 'erp' || type === 'kiaan-erp-core') {
    return (
      <div className={`preview-graphic erp-theme ${size}`}>
        <div className="preview-top-strip">
          <div className="preview-brand-tag">
            <span className="dot dot-gold" />
            <span>KiaanERP Enterprise Core</span>
          </div>
          <span className="preview-live-badge">STABLE RELEASE</span>
        </div>

        <div className="preview-canvas">
          {/* Mini Sidebar */}
          <div className="mock-sidebar">
            <div className="sb-item active" />
            <div className="sb-item" />
            <div className="sb-item" />
            <div className="sb-item" />
          </div>

          {/* Main Area */}
          <div className="mock-dashboard">
            <div className="mock-kpi-row">
              <div className="mock-kpi-box gold-tint">
                <span className="kpi-title">CONSOLIDATED LEDGER</span>
                <span className="kpi-val">[Sample Financials]</span>
                <span className="kpi-sub text-green">Multi-Currency Sync</span>
              </div>
              <div className="mock-kpi-box">
                <span className="kpi-title">PURCHASE VOUCHERS</span>
                <span className="kpi-val">[Active Records]</span>
                <span className="kpi-sub">Relational MySQL</span>
              </div>
            </div>

            {/* Mini Chart Graphic */}
            <div className="mock-chart-box">
              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '40%' }} />
                <div className="chart-bar" style={{ height: '65%' }} />
                <div className="chart-bar" style={{ height: '50%' }} />
                <div className="chart-bar bar-gold" style={{ height: '85%' }} />
                <div className="chart-bar" style={{ height: '70%' }} />
                <div className="chart-bar bar-gold" style={{ height: '95%' }} />
              </div>
              <span className="chart-label">Entity Performance Analytics</span>
            </div>
          </div>
        </div>

        <div className="preview-bottom-bar">
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">React</span>
          <span className="tech-badge">MySQL</span>
          <span className="tech-badge badge-accent">Signed Cloud License</span>
        </div>
      </div>
    );
  }

  if (type === 'crm' || type === 'kiaan-crm-pulse') {
    return (
      <div className={`preview-graphic crm-theme ${size}`}>
        <div className="preview-top-strip">
          <div className="preview-brand-tag">
            <span className="dot dot-blue" />
            <span>Kiaan Pulse CRM</span>
          </div>
          <span className="preview-live-badge blue-badge">OMNICHANNEL</span>
        </div>

        <div className="preview-canvas">
          {/* Kanban Columns */}
          <div className="mock-kanban">
            <div className="kanban-col">
              <div className="col-header">LEADS INBOX</div>
              <div className="kanban-card">
                <span className="kc-title">Enterprise Deal A</span>
                <span className="kc-val">Pipeline Qualified</span>
              </div>
              <div className="kanban-card">
                <span className="kc-title">Commercial Deal B</span>
                <span className="kc-val">In Followup</span>
              </div>
            </div>
            <div className="kanban-col">
              <div className="col-header">NEGOTIATION</div>
              <div className="kanban-card highlight-card">
                <span className="kc-title">SLA Contract Review</span>
                <span className="kc-val text-green">Draft Stage</span>
              </div>
            </div>
            <div className="kanban-col">
              <div className="col-header">VERIFIED</div>
              <div className="kanban-card won-card">
                <span className="kc-title">Annual Retainer</span>
                <span className="kc-val">Active Customer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-bottom-bar">
          <span className="tech-badge">WhatsApp Sync</span>
          <span className="tech-badge">Visual Kanban</span>
          <span className="tech-badge badge-accent">REST API</span>
        </div>
      </div>
    );
  }

  if (type === 'hrms' || type === 'kiaan-hrms-workforce') {
    return (
      <div className={`preview-graphic hrms-theme ${size}`}>
        <div className="preview-top-strip">
          <div className="preview-brand-tag">
            <span className="dot dot-purple" />
            <span>Kiaan Workforce HRMS</span>
          </div>
          <span className="preview-live-badge purple-badge">PAYROLL READY</span>
        </div>

        <div className="preview-canvas">
          <div className="mock-hrms-grid">
            <div className="hrms-stat">
              <span className="hrms-label">ATTENDANCE COMPLIANCE</span>
              <strong className="hrms-num">[Verified Shift Logs]</strong>
              <div className="attendance-bar"><div className="att-fill" style={{ width: '92%' }} /></div>
            </div>
            <div className="hrms-table">
              <div className="ht-row head"><span>EMPLOYEE</span><span>STATUS</span><span>PAYROLL</span></div>
              <div className="ht-row"><span>Engineering Staff</span><span className="tag-ok">Present</span><span>[Tax Verified]</span></div>
              <div className="ht-row"><span>Operations Team</span><span className="tag-ok">Present</span><span>[ESI/PF Synced]</span></div>
            </div>
          </div>
        </div>

        <div className="preview-bottom-bar">
          <span className="tech-badge">Biometric Bridge</span>
          <span className="tech-badge">Statutory Payroll</span>
          <span className="tech-badge badge-accent">Self-Service</span>
        </div>
      </div>
    );
  }

  if (type === 'inventory' || type === 'kiaan-inventory-flow') {
    return (
      <div className={`preview-graphic wms-theme ${size}`}>
        <div className="preview-top-strip">
          <div className="preview-brand-tag">
            <span className="dot dot-amber" />
            <span>Kiaan Flow Inventory & WMS</span>
          </div>
          <span className="preview-live-badge amber-badge">MULTI-DEPOT</span>
        </div>

        <div className="preview-canvas">
          <div className="mock-wms-content">
            <div className="wms-depot-grid">
              <div className="depot-card">
                <span className="depot-title">Central Distribution Depot</span>
                <span className="depot-count">Active Inventory Balance</span>
              </div>
              <div className="depot-card">
                <span className="depot-title">Regional Transit Hub</span>
                <span className="depot-count">Automated Reorder Level</span>
              </div>
            </div>
            <div className="barcode-strip">
              <div className="barcode-lines" />
              <span className="barcode-code">SAMPLE-DISPATCH-LOT</span>
            </div>
          </div>
        </div>

        <div className="preview-bottom-bar">
          <span className="tech-badge">Barcode Scanner</span>
          <span className="tech-badge">FIFO Valuation</span>
          <span className="tech-badge badge-accent">Multi-Warehouse</span>
        </div>
      </div>
    );
  }

  if (type === 'pos' || type === 'kiaan-pos-retail') {
    return (
      <div className={`preview-graphic pos-theme ${size}`}>
        <div className="preview-top-strip">
          <div className="preview-brand-tag">
            <span className="dot dot-teal" />
            <span>Kiaan Swift POS & Billing</span>
          </div>
          <span className="preview-live-badge teal-badge">OFFLINE-FIRST</span>
        </div>

        <div className="preview-canvas">
          <div className="mock-pos-terminal">
            <div className="pos-left-bill">
              <div className="pos-item-line"><span>Sample Item Line 01</span><span>[Sample Price]</span></div>
              <div className="pos-item-line"><span>Sample Item Line 02</span><span>[Sample Price]</span></div>
              <div className="pos-total-line"><span>TOTAL GST INCL</span><strong className="text-green">[Tax Inclusive]</strong></div>
            </div>
            <div className="pos-shortcuts">
              <div className="key-btn">F1 Search</div>
              <div className="key-btn">F4 Cash</div>
              <div className="key-btn key-gold">F8 Digital</div>
            </div>
          </div>
        </div>

        <div className="preview-bottom-bar">
          <span className="tech-badge">Fast Scan</span>
          <span className="tech-badge">Thermal Print</span>
          <span className="tech-badge badge-accent">GST Ready</span>
        </div>
      </div>
    );
  }

  // Default / AI Automation
  return (
    <div className={`preview-graphic ai-theme ${size}`}>
      <div className="preview-top-strip">
        <div className="preview-brand-tag">
          <span className="dot dot-gold" />
          <span>Kiaan Flow AI Engine</span>
        </div>
        <span className="preview-live-badge">WORKFLOW ENGINE</span>
      </div>

      <div className="preview-canvas">
        <div className="mock-ai-workflow">
          <div className="wf-node start-node">
            <span>Webhook: Document Upload</span>
          </div>
          <div className="wf-line" />
          <div className="wf-node proc-node">
            <span>Data Extraction Engine</span>
          </div>
          <div className="wf-line" />
          <div className="wf-node ok-node">
            <span>Sync to MySQL Database</span>
          </div>
        </div>
      </div>

      <div className="preview-bottom-bar">
        <span className="tech-badge">PDF Parser</span>
        <span className="tech-badge">Event Triggers</span>
        <span className="tech-badge badge-accent">Self-Hosted Model</span>
      </div>
    </div>
  );
}
