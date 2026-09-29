import React from 'react';
import { ShieldCheck, Lock, ArrowUpRight, Heart, Server } from 'lucide-react';

export default function Footer({ onCategorySelect, onExploreClick, onAdminClick }) {
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
              <li><a href="#why-kiaan">About Kiaan Technology</a></li>
              <li><a href="#why-kiaan">Engineering Standards</a></li>
              <li><a href="#customization-services">Custom Development SLAs</a></li>
              <li><a href="#why-kiaan">Proprietary IP Policy</a></li>
              <li><a href="#customization-services">Contact Engineering</a></li>
            </ul>
          </div>

          {/* Column 2: Software Catalog */}
          <div className="footer-col">
            <h4 className="footer-heading">SOFTWARE</h4>
            <ul className="footer-links">
              <li><a href="#featured-software" onClick={onExploreClick}>Browse Full Catalog</a></li>
              <li><a href="#featured-software" onClick={() => onCategorySelect('erp')}>ERP Enterprise Suite</a></li>
              <li><a href="#featured-software" onClick={() => onCategorySelect('crm')}>Omnichannel CRM</a></li>
              <li><a href="#featured-software" onClick={() => onCategorySelect('hrms')}>Workforce HRMS</a></li>
              <li><a href="#featured-software" onClick={() => onCategorySelect('inventory')}>Supply Chain & WMS</a></li>
              <li><a href="#featured-software" onClick={() => onCategorySelect('pos')}>Swift POS & Billing</a></li>
            </ul>
          </div>

          {/* Column 3: Support & Portal */}
          <div className="footer-col">
            <h4 className="footer-heading">SUPPORT & PORTAL</h4>
            <ul className="footer-links">
              <li><a href="#support-licensing">Customer Portal Access</a></li>
              <li><a href="#support-licensing">License Activation Guide</a></li>
              <li><a href="#support-licensing">Domain Transfer Policy</a></li>
              <li><a href="#support-licensing">Offline Grace Period Terms</a></li>
              <li><a href="#faqs">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies */}
          <div className="footer-col">
            <h4 className="footer-heading">LEGAL & POLICIES</h4>
            <ul className="footer-links">
              <li><a href="#support-licensing">Software License Agreement</a></li>
              <li><a href="#support-licensing">Terms of Service</a></li>
              <li><a href="#support-licensing">Privacy Policy</a></li>
              <li><a href="#support-licensing">Refund & Cancellation Policy</a></li>
              <li><a href="#support-licensing">Tax & GST Invoicing</a></li>
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
