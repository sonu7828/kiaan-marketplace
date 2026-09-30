import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Server, 
  Cpu, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Code
} from 'lucide-react';

export default function DocumentationModal({ product, onClose, onViewDetails }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('quickstart'); // 'quickstart' | 'architecture' | 'api' | 'requirements'

  if (!product) return null;

  const dockerCommand = `# Clone deployment bundle & configure environment
git clone https://github.com/kiaan-technology/${product.slug || 'software-suite'}.git
cd ${product.slug || 'software-suite'}
cp .env.example .env

# Launch verified Docker Compose cluster
docker compose up -d

# Verify operational status
docker compose ps`;

  const handleCopyDocker = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dockerCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content doc-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="doc-modal-header">
          <div className="doc-modal-title-cluster">
            <div className="doc-icon-pill">
              <BookOpen size={18} className="text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-gold">{product.category}</span>
                <span className="cell-mono text-xs">v{product.version || '1.0.0'}</span>
              </div>
              <h3 className="doc-modal-title">{product.name} — Technical Documentation</h3>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close documentation">
            <X size={18} />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="doc-modal-tabs">
          <button 
            type="button"
            className={`doc-tab-btn ${activeTab === 'quickstart' ? 'active' : ''}`}
            onClick={() => setActiveTab('quickstart')}
          >
            <Terminal size={14} />
            <span>Quickstart & Deploy</span>
          </button>
          <button 
            type="button"
            className={`doc-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <Server size={14} />
            <span>Modules & Architecture</span>
          </button>
          <button 
            type="button"
            className={`doc-tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <Cpu size={14} />
            <span>System Requirements</span>
          </button>
          <button 
            type="button"
            className={`doc-tab-btn ${activeTab === 'api' ? 'active' : ''}`}
            onClick={() => setActiveTab('api')}
          >
            <Code size={14} />
            <span>REST API Integration</span>
          </button>
        </div>

        {/* Body Container */}
        <div className="doc-modal-body">
          
          {/* TAB 1: QUICKSTART */}
          {activeTab === 'quickstart' && (
            <div className="doc-content-section">
              <h4 className="doc-section-heading">Turnkey Docker Deployment</h4>
              <p className="doc-text">
                All Kiaan software products are containerized with self-contained Docker Compose templates. You can deploy this suite on any on-premise Linux machine, private VPS, or dedicated cloud instance (AWS, GCP, Azure, DigitalOcean).
              </p>

              <div className="doc-code-block-wrap">
                <div className="doc-code-header">
                  <span className="cell-mono text-xs">Bash Terminal (Ubuntu / Debian / RHEL)</span>
                  <button type="button" className="btn-copy-code" onClick={handleCopyDocker}>
                    {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Commands'}</span>
                  </button>
                </div>
                <pre className="doc-code-pre">
                  <code>{dockerCommand}</code>
                </pre>
              </div>

              <div className="doc-callout-note mt-3">
                <ShieldCheck size={16} className="text-accent-gold" />
                <div>
                  <strong>Zero Vendor Lock-in & 100% Privacy:</strong>
                  <p className="text-xs text-secondary mt-0.5">
                    Data is stored entirely within your local or self-hosted relational database. No telemetry or external cloud tracking is bundled into the distribution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="doc-content-section">
              <h4 className="doc-section-heading">Software Modules & Technical Stack</h4>
              <p className="doc-text mb-3">
                <strong>Verified Stack:</strong> {product.techStack || 'React, Node.js, MySQL'}
              </p>

              <h5 className="text-xs font-bold uppercase text-muted mb-2">Included Functional Modules</h5>
              <div className="doc-modules-grid">
                {(product.modules && product.modules.length > 0 ? product.modules : [
                  'Central Administrative Console',
                  'Relational Database Schema & Migrations',
                  'Role-Based Access Control (RBAC)',
                  'Automated Daily Database Backups',
                  'Audit Logs & Activity Monitoring',
                  'REST Webhook Dispatcher'
                ]).map((mod, i) => (
                  <div key={i} className="doc-module-card">
                    <span className="mod-num">0{i + 1}</span>
                    <strong className="mod-title">{mod}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="doc-content-section">
              <h4 className="doc-section-heading">Hardware & Operating Environment</h4>
              <p className="doc-text">
                Recommended minimum server specifications for reliable production throughput:
              </p>

              <div className="doc-specs-table-wrap">
                <table className="doc-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Operating System</td>
                      <td className="spec-value">Ubuntu 22.04 / 24.04 LTS, Debian 12, RHEL 9, or Windows Server with WSL2/Docker</td>
                    </tr>
                    <tr>
                      <td className="spec-label">CPU Cores</td>
                      <td className="spec-value">Minimum 2 vCPUs (4 vCPUs recommended for concurrent teams of 50+ users)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">RAM</td>
                      <td className="spec-value">Minimum 4 GB (8 GB recommended for in-memory caching and Redis queues)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Disk Storage</td>
                      <td className="spec-value">40 GB SSD / NVMe minimum (expands with transaction volume and file uploads)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Database</td>
                      <td className="spec-value">MySQL 8.0+ / MariaDB 10.6+ or PostgreSQL (Docker container included)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Reverse Proxy</td>
                      <td className="spec-value">Nginx / Traefik / Caddy with automated Let's Encrypt SSL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: REST API */}
          {activeTab === 'api' && (
            <div className="doc-content-section">
              <h4 className="doc-section-heading">RESTful API Endpoints</h4>
              <p className="doc-text">
                Connect external CRM systems, payment gateways, biometric devices, and courier tracking webhooks using standardized JSON endpoints:
              </p>

              <div className="doc-api-list">
                <div className="doc-api-item">
                  <span className="api-method get">GET</span>
                  <span className="api-endpoint font-mono">/api/v1/health</span>
                  <span className="api-desc">System heartbeat and database connectivity probe.</span>
                </div>
                <div className="doc-api-item">
                  <span className="api-method post">POST</span>
                  <span className="api-endpoint font-mono">/api/v1/auth/token</span>
                  <span className="api-desc">Bearer JWT authentication for administrative and staff sessions.</span>
                </div>
                <div className="doc-api-item">
                  <span className="api-method get">GET</span>
                  <span className="api-endpoint font-mono">/api/v1/records</span>
                  <span className="api-desc">Paginated entity list with filtering by date, status, and department.</span>
                </div>
                <div className="doc-api-item">
                  <span className="api-method post">POST</span>
                  <span className="api-endpoint font-mono">/api/v1/webhooks/incoming</span>
                  <span className="api-desc">Receive real-time external event payloads with HMAC SHA-256 signature verification.</span>
                </div>
              </div>

              {product.docUrl && product.docUrl.startsWith('http') && (
                <div className="mt-4 pt-3 border-t">
                  <a 
                    href={product.docUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-secondary btn-sm inline-flex items-center gap-2"
                  >
                    <span>Open External Developer Documentation Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="doc-modal-footer">
          <div className="doc-footer-meta">
            <span className="text-xs text-muted">Perpetual Source Code & Deployment Rights</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
            {onViewDetails && (
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
              >
                <span>View Full Product Page</span>
                <ExternalLink size={13} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
