import React from 'react';
import { 
  Code2, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  GitBranch 
} from 'lucide-react';
import { CUSTOMIZATION_SERVICES } from '../data/marketplaceData';

export default function CustomizationServices({ onRequestQuote }) {
  return (
    <section className="customization-section" id="customization-services">
      <div className="container">
        
        <div className="section-head-compact text-center">
          <h2 className="section-title-compact">Custom Software Development</h2>
          <p className="section-desc-compact">
            Because our team authored every codebase, we can adapt, customize, or build proprietary integrations for your company.
          </p>
        </div>

        {/* 4 Customization Tiers Grid */}
        <div className="custom-tiers-grid">
          {CUSTOMIZATION_SERVICES.map((service) => (
            <div key={service.id} className="custom-tier-card">
              
              <div className="custom-card-header">
                <span className="tier-badge">{service.badge}</span>
                <span className="tier-timeline">
                  <Clock size={12} />
                  <span>{service.timeline}</span>
                </span>
              </div>

              <h3 className="tier-title">{service.title}</h3>
              <p className="tier-desc">{service.description}</p>

              <div className="tier-deliverables">
                <span className="deliv-heading">DELIVERABLES:</span>
                <ul className="deliv-bullets">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="text-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tier-card-footer">
                <button 
                  type="button"
                  className="btn btn-secondary btn-sm w-full"
                  onClick={() => onRequestQuote && onRequestQuote(service.title)}
                >
                  <span>Request Scope</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom SLA Callout Strip */}
        <div className="git-isolation-banner">
          <div className="banner-left">
            <GitBranch size={18} className="text-orange" />
            <div>
              <strong>Clean Codebase Isolation:</strong> Custom business modules are structured via clean plugin interfaces or dedicated Git branches, ensuring upstream security updates apply smoothly.
            </div>
          </div>
          <button 
            type="button"
            className="btn btn-primary btn-sm flex-shrink-0"
            onClick={() => onRequestQuote && onRequestQuote('Custom Development Consultation')}
          >
            <span>Talk to an Architect</span>
          </button>
        </div>

      </div>
    </section>
  );
}
