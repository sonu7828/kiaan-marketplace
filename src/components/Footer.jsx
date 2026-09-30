import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';

export default function Footer({ onCategorySelect, onExploreClick, onNavigateSection, onOpenPortal }) {
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="global-footer" id="footer">
      <div className="container">
        
        {/* Footer Main Top Grid */}
        <div className="footer-grid">
          
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="logo-symbol">
                <span className="logo-letter">K</span>
                <div className="logo-accent-dot" />
              </div>
              <div className="logo-text-block">
                <span className="brand-name">KIAAN</span>
                <span className="brand-tagline">MARKETPLACE</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Kiaan Technology Pvt Ltd provides sovereign, business-ready software solutions with centralized cryptographic cloud licensing and direct engineering adaptation services.
            </p>

            <div className="footer-cloud-badge">
              <div className="cloud-dot" />
              <span>License Cloud Status: <strong>Service Active</strong></span>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="footer-col">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>About Kiaan Technology</a></li>
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Engineering Standards</a></li>
              <li><a href="#customization-services" onClick={(e) => handleLinkClick(e, 'customization-services')}>Custom Development Scope</a></li>
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Proprietary IP Policy</a></li>
              <li><a href="#customization-services" onClick={(e) => handleLinkClick(e, 'customization-services')}>Contact Engineering</a></li>
            </ul>
          </div>

          {/* Column 2: Software Catalog */}
          <div className="footer-col">
            <h4 className="footer-heading">SOFTWARE</h4>
            <ul className="footer-links">
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onExploreClick) onExploreClick(); }}>Browse Full Catalog</a></li>
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('erp'); }}>ERP Enterprise Suite</a></li>
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('crm'); }}>Omnichannel CRM</a></li>
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('hrms'); }}>Workforce HRMS</a></li>
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('inventory'); }}>Supply Chain & WMS</a></li>
              <li><a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('pos'); }}>Swift POS & Billing</a></li>
            </ul>
          </div>

          {/* Column 3: Architecture & Support */}
          <div className="footer-col">
            <h4 className="footer-heading">ARCHITECTURE & SUPPORT</h4>
            <ul className="footer-links">
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Deployment & Sovereignty</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleLinkClick(e, 'how-it-works')}>Software Delivery Workflow</a></li>
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Direct Engineering Support</a></li>
              <li><a href="#faqs" onClick={(e) => handleLinkClick(e, 'faqs')}>Frequently Asked Questions</a></li>
              <li><a href="#portal" onClick={(e) => { e.preventDefault(); if (onOpenPortal) onOpenPortal(); }}>Customer Portal Access</a></li>
            </ul>
          </div>

          {/* Column 4: Governance & Policies */}
          <div className="footer-col">
            <h4 className="footer-heading">GOVERNANCE & POLICIES</h4>
            <ul className="footer-links">
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Single-Vendor License Terms</a></li>
              <li><a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>Data Sovereignty & Privacy</a></li>
              <li><a href="#customization-services" onClick={(e) => handleLinkClick(e, 'customization-services')}>Custom Work Terms</a></li>
              <li><a href="#customization-services" onClick={(e) => handleLinkClick(e, 'customization-services')}>Commercial Estimates</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <span>© 2026 Kiaan Technology Pvt Ltd. All rights reserved.</span>
            <span className="bullet-sep">•</span>
            <span>Single-Vendor Software Commerce & Central Licensing Platform</span>
            <span className="footer-node-id" title="Sovereign Deployment Node">
              Cluster Node: KT-MKT-IN-01
            </span>
          </div>

          <div className="bottom-right">
            <div className="cert-pill">
              <ShieldCheck size={13} className="text-gold" />
              <span>Signed Token Verification</span>
            </div>
            <div className="cert-pill">
              <Server size={13} className="text-gold" />
              <span>Sovereign Self-Hosting</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
