import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ 
  onCategorySelect, 
  onExploreClick, 
  onNavigateSection, 
  onOpenPortal,
  onOpenAdmin 
}) {
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
        
        {/* Footer Main Clean Grid */}
        <div className="footer-grid">
          
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="brand-mark small">
                <span>K</span>
                <span className="mark-accent" />
              </div>
              <div className="brand-text">
                <span className="brand-primary-text">KIAAN</span>
                <span className="brand-secondary-text">MARKETPLACE</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Production-ready, self-hosted enterprise software suites with single-vendor licenses and direct engineering support.
            </p>

            <div className="footer-status-pill">
              <span className="status-dot-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 1: Software Suites */}
          <div className="footer-col">
            <h4 className="footer-heading">SOFTWARE SUITES</h4>
            <ul className="footer-links">
              <li>
                <a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onExploreClick) onExploreClick(); }}>
                  Browse All Software
                </a>
              </li>
              <li>
                <a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('erp'); }}>
                  ERP Enterprise
                </a>
              </li>
              <li>
                <a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('crm'); }}>
                  Omnichannel CRM
                </a>
              </li>
              <li>
                <a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('hrms'); }}>
                  Workforce HRMS
                </a>
              </li>
              <li>
                <a href="#featured-software" onClick={(e) => { e.preventDefault(); if (onCategorySelect) onCategorySelect('pos'); }}>
                  POS & Billing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions & Services */}
          <div className="footer-col">
            <h4 className="footer-heading">SOLUTIONS & SERVICES</h4>
            <ul className="footer-links">
              <li>
                <a href="#industry-solutions" onClick={(e) => handleLinkClick(e, 'industry-solutions')}>
                  Industry Solutions
                </a>
              </li>
              <li>
                <a href="#customization-services" onClick={(e) => handleLinkClick(e, 'customization-services')}>
                  Custom Development
                </a>
              </li>
              <li>
                <a href="#why-kiaan" onClick={(e) => handleLinkClick(e, 'why-kiaan')}>
                  Why Kiaan Technology
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, 'faqs')}>
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Access */}
          <div className="footer-col">
            <h4 className="footer-heading">PLATFORM</h4>
            <ul className="footer-links">
              <li>
                <a href="#portal" onClick={(e) => { e.preventDefault(); if (onOpenPortal) onOpenPortal(); }}>
                  Customer License Portal
                </a>
              </li>
              <li>
                <a href="#admin" onClick={(e) => { 
                  e.preventDefault(); 
                  if (onOpenAdmin) {
                    onOpenAdmin();
                  } else {
                    window.location.hash = '#admin';
                  }
                }}>
                  Admin Console
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleLinkClick(e, 'how-it-works')}>
                  How Delivery Works
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <span>© 2026 Kiaan Technology Pvt Ltd. All rights reserved.</span>
          </div>

          <div className="bottom-right">
            <div className="cert-pill">
              <ShieldCheck size={13} style={{ color: '#F59E0B' }} />
              <span>Full Source Code • Self-Hosted • Single-Vendor Verified</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
