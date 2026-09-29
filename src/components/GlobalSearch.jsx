import React, { useState } from 'react';
import { Search, Sparkles, Filter, X, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/marketplaceData';

export default function GlobalSearch({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onProductSelect }) {
  const [isFocused, setIsFocused] = useState(false);

  const popularPills = [
    'ERP Systems',
    'GST Invoicing',
    'Multi-Warehouse',
    'Biometric HRMS',
    'Cryptographic Licensing',
    'Omnichannel CRM'
  ];

  const filteredPreview = searchQuery.trim() 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.capabilityTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <section className="search-section" id="global-search">
      <div className="container">
        
        <div className={`search-box-card ${isFocused ? 'search-card-focused' : ''}`}>
          
          <div className="search-input-row">
            
            {/* Category Dropdown Filter */}
            <div className="search-category-select-wrapper">
              <Filter size={15} className="filter-icon" />
              <select 
                className="search-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter search by category"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.shortName}</option>
                ))}
              </select>
            </div>

            <div className="search-divider" />

            {/* Main Search Input */}
            <div className="search-input-field-wrapper">
              <Search size={20} className="search-lens-icon" />
              <input 
                type="text" 
                className="search-main-input"
                placeholder="Search software products, capabilities, modules, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                aria-label="Search software catalog"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Search Action Button */}
            <a href="#featured-software" className="btn btn-primary search-action-btn">
              <span>Find Software</span>
            </a>

          </div>

          {/* Quick Search Tag Pills */}
          <div className="search-pills-row">
            <span className="pills-label">
              <Sparkles size={13} className="text-gold" />
              <span>POPULAR SEARCHES:</span>
            </span>
            <div className="pills-list">
              {popularPills.map((pill, idx) => (
                <button 
                  key={idx} 
                  className="search-pill-btn"
                  onClick={() => setSearchQuery(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Live Search Suggestion Dropdown */}
          {isFocused && searchQuery.trim() && (
            <div className="search-results-dropdown">
              <div className="dropdown-meta">
                <span>Matching Software Products ({filteredPreview.length})</span>
                <span className="text-muted">Press Enter to view catalog</span>
              </div>
              {filteredPreview.length > 0 ? (
                <div className="dropdown-list">
                  {filteredPreview.map(product => (
                    <div 
                      key={product.id}
                      className="dropdown-item"
                      onMouseDown={() => onProductSelect(product)}
                    >
                      <div className="dropdown-item-main">
                        <span className="dropdown-item-title">{product.name}</span>
                        <span className="dropdown-item-category">{product.category}</span>
                      </div>
                      <div className="dropdown-item-right">
                        <span className="dropdown-item-price tabular-nums">{product.priceDisplay}</span>
                        <ArrowUpRight size={15} className="dropdown-arrow" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dropdown-empty">
                  No software package found matching "{searchQuery}". Try searching for ERP, CRM, HRMS, or Inventory.
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      <style>{`
        .search-section {
          padding-top: var(--space-xl);
          padding-bottom: var(--space-xl);
          position: relative;
          z-index: 20;
          margin-top: -32px;
        }

        .search-box-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 16px 20px;
          position: relative;
          transition: all var(--transition-fast);
        }

        .search-card-focused {
          border-color: var(--accent-gold);
          box-shadow: 0 12px 28px rgba(18, 20, 23, 0.12), 0 0 0 1px var(--accent-gold-border);
        }

        .search-input-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* Category Filter Select */
        .search-category-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }

        .filter-icon {
          color: var(--text-muted);
        }

        .search-category-select {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
        }

        .search-divider {
          width: 1px;
          height: 36px;
          background: var(--border-default);
          flex-shrink: 0;
        }

        /* Main Input Field */
        .search-input-field-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .search-lens-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        .search-main-input {
          width: 100%;
          font-size: 15px;
          color: var(--text-primary);
        }

        .search-main-input::placeholder {
          color: var(--text-muted);
        }

        .search-clear-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 50%;
        }

        .search-clear-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface-subtle);
        }

        .search-action-btn {
          flex-shrink: 0;
        }

        /* Search Pills */
        .search-pills-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        .pills-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .pills-list {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .search-pill-btn {
          font-size: 12px;
          color: var(--text-secondary);
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
          transition: all var(--transition-fast);
        }

        .search-pill-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-gold-border);
          background: var(--accent-gold-subtle);
        }

        /* Results Dropdown */
        .search-results-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
          padding: 12px;
          z-index: 100;
          animation: fadeIn 150ms ease;
        }

        .dropdown-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-secondary);
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .dropdown-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dropdown-item:hover {
          background: var(--bg-surface-subtle);
        }

        .dropdown-item-main {
          display: flex;
          flex-direction: column;
        }

        .dropdown-item-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dropdown-item-category {
          font-size: 12px;
          color: var(--text-muted);
        }

        .dropdown-item-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dropdown-item-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent-gold-dark);
        }

        .dropdown-arrow {
          color: var(--text-muted);
        }

        .dropdown-empty {
          padding: 16px;
          text-align: center;
          font-size: 13.5px;
          color: var(--text-muted);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .search-input-row {
            flex-direction: column;
            align-items: stretch;
          }

          .search-divider {
            display: none;
          }

          .search-action-btn {
            width: 100%;
          }

          .search-category-select-wrapper {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
