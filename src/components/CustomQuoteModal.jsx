import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { productService } from '../services/productService';

export default function CustomQuoteModal({ serviceTitle, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceTitle || 'Custom Module Development',
    details: '',
    timeline: '2 to 4 weeks'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    productService.saveInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      details: formData.details,
      timeline: formData.timeline
    });
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content quote-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Top */}
        <div className="quote-top">
          <div>
            <span className="badge badge-gold">DIRECT ENGINEERING SCOPE</span>
            <h3 className="quote-title">Request Customization & Adaptation</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="quote-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} className="text-success" />
            </div>
            <h4 className="success-title">Customization Request Logged</h4>
            <p className="success-desc">
              Your engineering inquiry for <strong>{formData.service}</strong> has been assigned tracking ID <span className="font-mono">#REQ-2026-KT-419</span>. A Kiaan Technology principal architect will review your technical scope within 1 business day.
            </p>
            <button className="btn btn-primary btn-md" onClick={onClose}>
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form className="quote-form" onSubmit={handleSubmit}>
            <p className="quote-intro">
              Kiaan Technology engineers author and maintain our software solutions. Specify your operational requirements below for an architectural feasibility review and fixed-cost SLA estimate.
            </p>

            <div className="form-grid">
              <div className="form-field">
                <label className="field-lbl">Your Full Name *</label>
                <input 
                  type="text" 
                  required 
                  className="field-input" 
                  placeholder="e.g. Vikram Sharma" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-field">
                <label className="field-lbl">Work / Corporate Email *</label>
                <input 
                  type="email" 
                  required 
                  className="field-input" 
                  placeholder="v.sharma@company.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-field">
                <label className="field-lbl">Contact Phone / WhatsApp *</label>
                <input 
                  type="tel" 
                  required 
                  className="field-input" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-field">
                <label className="field-lbl">Company / Entity Name *</label>
                <input 
                  type="text" 
                  required 
                  className="field-input" 
                  placeholder="e.g. Apex Industries Pvt Ltd" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="field-lbl">Service Scope Category</label>
              <select 
                className="field-select"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="Custom Module Development">Custom Module Development (Tailored Business Logic)</option>
                <option value="ERP & Hardware Integrations">ERP & Hardware Integrations (Tally, SAP, IoT, Biometrics)</option>
                <option value="Enterprise White-Labeling">Enterprise White-Labeling (Custom Branding & Mobile Builds)</option>
                <option value="Dedicated Engineering SLA">Dedicated Engineering SLA (Mission-Critical Retainer)</option>
                <option value="General Architecture Consultation">General Architecture Consultation</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-lbl">Technical Scope & Operational Requirements *</label>
              <textarea 
                required 
                className="field-textarea" 
                rows="4"
                placeholder="Describe your workflows, integration targets, number of expected concurrent users, and current infrastructure environment..."
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>

            <div className="quote-form-footer">
              <div className="sla-guarantee">
                <ShieldCheck size={16} className="text-gold" />
                <span>Zero vendor lock-in • 100% confidential NDA protection</span>
              </div>

              <button type="submit" className="btn btn-primary btn-md">
                <Send size={15} />
                <span>Submit Customization Inquiry</span>
              </button>
            </div>
          </form>
        )}

      </div>

      <style>{`
        .quote-modal {
          max-width: 680px;
          padding: 28px;
        }

        .quote-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 18px;
        }

        .quote-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 6px;
        }

        .quote-intro {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .field-lbl {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .field-input, .field-select, .field-textarea {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-sm);
          padding: 9px 12px;
          font-size: 14px;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .field-input:focus, .field-select:focus, .field-textarea:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 1px var(--accent-gold-border);
        }

        .quote-form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
          margin-top: 8px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .sla-guarantee {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }

        /* Success State */
        .quote-success-state {
          padding: 32px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .success-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--status-active-bg);
          border: 1px solid var(--status-active-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .success-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 520px;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .quote-form-footer {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
