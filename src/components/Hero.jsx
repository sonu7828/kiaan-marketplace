import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { productService } from '../services/productService';
import { CATEGORIES } from '../data/products';

export default function Hero({ onSearchSubmit, selectedCategory = 'all', onCategorySelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const heroConfig = productService.getHeroConfig();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedCategory || 'all');
    }
    const catSection = document.getElementById('featured-software');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    if (onCategorySelect) {
      onCategorySelect(catId);
    }
    const catSection = document.getElementById('featured-software');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="marketplace-hero hero-streamlined" id="hero">
      <div className="container hero-streamlined-container">
        
        {/* Single Punchy Headline with Colorful Lighting Gradient */}
        <h1 className="hero-streamlined-title">
          <span>{heroConfig.titlePrefix || 'Production-Ready Business Software, '}</span>
          <span className="hero-highlight-gradient">{heroConfig.titleHighlight || 'Built to Deploy & Scale'}</span>
        </h1>

        {/* Centered Search Bar with Backlit Glow Effects */}
        <form className="hero-streamlined-search-form" onSubmit={handleSearch}>
          <div className="hero-search-glow-backdrop" aria-hidden="true"></div>
          <div className="hero-search-inner-wrap">
            <Search size={18} className="hero-search-icon" />
            <input 
              type="text" 
              placeholder={heroConfig.searchPlaceholder || "Search software (e.g. ERP, CRM, Payroll, Invoicing, Inventory)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-streamlined-input"
              aria-label="Search software suites"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="hero-search-clear-btn"
                aria-label="Clear search text"
              >
                ✕
              </button>
            )}
            <button type="submit" className="hero-streamlined-btn">
              <span>Search</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Functional Category Shortcuts */}
        <div className="hero-trending-tags">
          <span className="trending-label">QUICK CATEGORIES:</span>
          <div className="trending-chips">
            <button
              type="button"
              className={`trending-chip ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Software
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`trending-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.shortName || cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
