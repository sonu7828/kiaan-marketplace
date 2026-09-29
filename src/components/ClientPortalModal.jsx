import React, { useState } from 'react';
import { X, Lock, KeyRound, ArrowRight, ShieldCheck, CheckCircle2, User, Building, ExternalLink } from 'lucide-react';

export default function ClientPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('license'); // 'license' | 'login'
  const [licenseKey, setLicenseKey] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLicenseLookup = (e) => {
    e.preventDefault();
    if (!licenseKey.trim() && !domain.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLookupResult({
        status: 'Active',
        product: 'KiaanERP Enterprise',
        licenseType: 'Single Domain Perpetual',
        issuedDomain: domain || 'demo.enterprise.com',
        keyMasked: (licenseKey || 'KT-ERP-9821-X99').toUpperCase(),
        updatesValidUntil: 'March 2027',
        supportTier: 'Priority Business'
      });
    }, 600);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Client workspace session initialized. Welcome to Kiaan Enterprise Customer Portal.');
      onClose();
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="portal-modal-title">
      <div className="client-portal-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="portal-modal-header">
          <div className="portal-header-brand">
            <div className="portal-logo-icon">
              <span className="font-bold text-gold">K</span>
            </div>
            <div>
              <h2 id="portal-modal-title" className="portal-title">Client License & Account Portal</h2>
              <p className="portal-subtitle">Access your software licenses, releases, and deployment packages</p>
            </div>
          </div>
          <button 
            type="button" 
            className="portal-close-btn" 
            onClick={onClose}
            aria-label="Close portal modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="portal-tabs-bar">
          <button 
            type="button"
            className={`portal-tab ${activeTab === 'license' ? 'active' : ''}`}
            onClick={() => { setActiveTab('license'); setLookupResult(null); }}
          >
            <KeyRound size={15} />
            <span>Verify License Key</span>
          </button>
          <button 
            type="button"
            className={`portal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setLookupResult(null); }}
          >
            <User size={15} />
            <span>Customer Sign In</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="portal-modal-body">
          {activeTab === 'license' ? (
            <div className="portal-tab-content">
              <p className="portal-tab-desc">
                Enter your issued Kiaan License Key or registered domain name to check activation status, release downloads, and maintenance validity.
              </p>

              <form onSubmit={handleLicenseLookup} className="portal-form">
                <div className="form-group">
                  <label htmlFor="portal-license-key">License Key (e.g. KT-ERP-XXXX-XXXX)</label>
                  <input 
                    id="portal-license-key"
                    type="text" 
                    className="portal-input"
                    placeholder="KT-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portal-domain">Registered Domain Name</label>
                  <input 
                    id="portal-domain"
                    type="text" 
                    className="portal-input"
                    placeholder="erp.yourcompany.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Verifying with Licensing Cloud...' : 'Verify License Details'}
                </button>
              </form>

              {lookupResult && (
                <div className="license-verification-card">
                  <div className="license-card-header">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-gold" />
                      <strong>{lookupResult.product}</strong>
                    </div>
                    <span className="license-status-badge status-active">{lookupResult.status}</span>
                  </div>

                  <div className="license-details-grid">
                    <div>
                      <span className="label">License Tier:</span>
                      <span className="value">{lookupResult.licenseType}</span>
                    </div>
                    <div>
                      <span className="label">Bound Domain:</span>
                      <span className="value">{lookupResult.issuedDomain}</span>
                    </div>
                    <div>
                      <span className="label">License Key:</span>
                      <span className="value font-mono">{lookupResult.keyMasked}</span>
                    </div>
                    <div>
                      <span className="label">Updates SLA:</span>
                      <span className="value">{lookupResult.updatesValidUntil}</span>
                    </div>
                  </div>

                  <div className="license-card-footer">
                    <span className="text-xs text-muted">Cryptographic signature valid on Kiaan sovereign node.</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="portal-tab-content">
              <p className="portal-tab-desc">
                Sign in with your enterprise account credentials to access source code repositories, staging builds, and direct SLA support.
              </p>

              <form onSubmit={handleSignIn} className="portal-form">
                <div className="form-group">
                  <label htmlFor="portal-email">Corporate Email Address</label>
                  <input 
                    id="portal-email"
                    type="email" 
                    required
                    className="portal-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portal-password">Password</label>
                  <input 
                    id="portal-password"
                    type="password" 
                    required
                    className="portal-input"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="portal-form-row">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Remember my enterprise session</span>
                  </label>
                  <a href="#support-licensing" className="forgot-link" onClick={() => { onClose(); }}>
                    Reset key?
                  </a>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Client Portal'}
                </button>
              </form>

              <div className="portal-support-footer">
                <ShieldCheck size={14} className="text-gold" />
                <span>Protected by sovereign 256-bit enterprise encryption.</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
