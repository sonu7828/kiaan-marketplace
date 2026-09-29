import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Play, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { productService } from '../services/productService';
import ProductScreenshot from './ProductScreenshot';

export default function Hero({ onExploreClick, onDemoClick, onSearchSubmit, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const flagshipProduct = productService.getAllProducts().find(p => p.isFlagship) || productService.getAllProducts()[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedCategory);
    }
    const catSection = document.getElementById('featured-software');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryShortcut = (catId) => {
    setSelectedCategory(catId);
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, catId);
    }
    const catSection = document.getElementById('featured-software');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="marketplace-hero" id="hero">
      <div className="container hero-split-grid">
        
        {/* Left: Headline, Short Description, Search, Actions */}
        <div className="hero-content">
          
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>BUSINESS SOFTWARE MARKETPLACE</span>
          </div>

          <h1 className="hero-title">
            Business Software for <span className="highlight-text">Every Stage of Growth</span>
          </h1>

          <p className="hero-subtitle">
            Explore ready-to-use business software, review product features, try available demos, and get solutions customized for your business.
          </p>

          {/* Prominent Search Bar */}
          <form className="hero-search-bar" onSubmit={handleSearch}>
            <div className="hero-search-cat">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Select Category"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="hero-search-divider" />

            <div className="hero-search-input-group">
              <Search size={16} className="search-input-icon" />
              <input 
                type="text" 
                placeholder="Search software (e.g. ERP, CRM, Payroll, Invoicing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary hero-btn-search">
              <span>Search</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Category Shortcuts */}
          <div className="hero-shortcuts">
            <span className="shortcuts-label">POPULAR:</span>
            <div className="shortcuts-chips">
              <button 
                type="button" 
                className={`shortcut-chip ${selectedCategory === 'erp' ? 'active' : ''}`}
                onClick={() => handleCategoryShortcut('erp')}
              >
                ERP Systems
              </button>
              <button 
                type="button" 
                className={`shortcut-chip ${selectedCategory === 'crm' ? 'active' : ''}`}
                onClick={() => handleCategoryShortcut('crm')}
              >
                CRM & Sales
              </button>
              <button 
                type="button" 
                className={`shortcut-chip ${selectedCategory === 'hrms' ? 'active' : ''}`}
                onClick={() => handleCategoryShortcut('hrms')}
              >
                HRMS & Payroll
              </button>
              <button 
                type="button" 
                className={`shortcut-chip ${selectedCategory === 'inventory' ? 'active' : ''}`}
                onClick={() => handleCategoryShortcut('inventory')}
              >
                Inventory & WMS
              </button>
              <button 
                type="button" 
                className={`shortcut-chip ${selectedCategory === 'pos' ? 'active' : ''}`}
                onClick={() => handleCategoryShortcut('pos')}
              >
                Billing & POS
              </button>
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="hero-cta-row">
            <button 
              type="button" 
              className="btn btn-primary btn-md"
              onClick={onExploreClick}
            >
              <span>Browse Catalog</span>
              <ArrowRight size={15} />
            </button>
            <a 
              href="#customization-services" 
              className="btn btn-secondary btn-md"
            >
              <span>Custom Development</span>
            </a>
          </div>

          {/* Trust Reassurance Strip */}
          <div className="hero-trust-indicators">
            <div className="trust-pill">
              <Server size={13} className="text-orange" />
              <span>Self-Hosted & Cloud</span>
            </div>
            <div className="trust-pill">
              <CheckCircle2 size={13} className="text-orange" />
              <span>Source Code Included</span>
            </div>
            <div className="trust-pill">
              <ShieldCheck size={13} className="text-orange" />
              <span>Direct Engineer Support</span>
            </div>
          </div>

        </div>

        {/* Right: Software Interface Preview */}
        <div className="hero-preview-col">
          <div className="hero-preview-card">
            
            <div className="preview-card-header">
              <div>
                <span className="preview-label">FEATURED SOFTWARE</span>
                <h3 className="preview-name">{flagshipProduct ? flagshipProduct.name : 'KiaanERP Enterprise'}</h3>
              </div>
              <span className="preview-badge">Self-Hosted</span>
            </div>

            {/* Software Screenshot Frame */}
            <div className="preview-screenshot-container">
              <ProductScreenshot product={flagshipProduct} height={230} />
            </div>

            {/* Bottom Action Bar */}
            <div className="preview-card-footer">
              <div className="preview-tech-info">
                <span>Node.js • React • MySQL</span>
              </div>
              <div className="preview-buttons">
                {flagshipProduct?.demoUrl && flagshipProduct.demoUrl.startsWith('http') ? (
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={() => onDemoClick && onDemoClick(flagshipProduct)}
                  >
                    <Play size={12} />
                    <span>Live Demo</span>
                  </button>
                ) : (
                  <span className="badge-demo-soon">Demo Coming Soon</span>
                )}
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onViewDetails && onViewDetails(flagshipProduct)}
                >
                  <span>View Details</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
