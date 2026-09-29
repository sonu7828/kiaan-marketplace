import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  ExternalLink,
  Check,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { productService } from '../services/productService';
import ProductScreenshot from './ProductScreenshot';

export default function FeaturedSoftware({ 
  products = null,
  selectedCategory = 'all', 
  onSelectCategory,
  searchQuery = '', 
  onViewDetails, 
  onLaunchDemo 
}) {
  const [activeFilterTab, setActiveFilterTab] = useState(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');

  const sourceProducts = products && products.length > 0 ? products : productService.getPublishedProducts();

  React.useEffect(() => {
    if (selectedCategory) {
      setActiveFilterTab(selectedCategory);
    }
  }, [selectedCategory]);

  let filteredProducts = sourceProducts.filter((product) => {
    const matchesCategory = activeFilterTab === 'all' || product.categoryId === activeFilterTab;
    const tags = product.capabilityTags || product.features || [];
    const query = (searchQuery || '').trim().toLowerCase();
    
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.shortDesc.toLowerCase().includes(query) ||
      (product.category && product.category.toLowerCase().includes(query)) ||
      tags.some(t => typeof t === 'string' && t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (a.isFlagship) return -1;
    if (b.isFlagship) return 1;
    if (a.isFeatured) return -1;
    if (b.isFeatured) return 1;
    return 0;
  });

  const handleTabClick = (catId) => {
    setActiveFilterTab(catId);
    if (onSelectCategory) onSelectCategory(catId);
  };

  return (
    <section className="catalog-section" id="featured-software">
      <div className="container">
        
        {/* Section Header */}
        <div className="catalog-header-bar">
          <div>
            <h2 className="catalog-title">Explore Software</h2>
            <p className="catalog-subtitle">Production-ready, self-hosted business solutions built by Kiaan Technology.</p>
          </div>

          {/* Sort Selector */}
          <div className="catalog-sort-wrapper">
            <SlidersHorizontal size={14} className="sort-icon" />
            <select 
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort software"
            >
              <option value="featured">Featured Suites</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="filter-tabs-strip" role="tablist">
          <button 
            role="tab"
            aria-selected={activeFilterTab === 'all'}
            className={`filter-tab ${activeFilterTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            All Software ({sourceProducts.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = sourceProducts.filter(p => p.categoryId === cat.id).length;
            return (
              <button 
                key={cat.id}
                role="tab"
                aria-selected={activeFilterTab === cat.id}
                className={`filter-tab ${activeFilterTab === cat.id ? 'active' : ''}`}
                onClick={() => handleTabClick(cat.id)}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Search Indicator */}
        {searchQuery && searchQuery.trim() && (
          <div className="search-status-bar">
            <span>Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} suites)</span>
            <button type="button" className="btn-text-sm" onClick={() => onSelectCategory && onSelectCategory('all')}>
              Clear search
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-state">
            <h3>No software suites match your search</h3>
            <p>Try resetting the category filter or searching for another keyword.</p>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => handleTabClick('all')}
            >
              View All Software
            </button>
          </div>
        ) : (
          <div className="software-cards-grid">
            {filteredProducts.map((product) => {
              const tags = (product.features || []).slice(0, 3);
              const hasLiveDemo = product.demoUrl && product.demoUrl.trim().startsWith('http');

              return (
                <div key={product.id} className="market-product-card">
                  
                  {/* Top Screenshot Area */}
                  <div 
                    className="card-screenshot-wrap"
                    onClick={() => onViewDetails && onViewDetails(product)}
                  >
                    <ProductScreenshot product={product} height={165} />
                    <span className="card-cat-badge">{product.category}</span>
                  </div>

                  {/* Card Main Info */}
                  <div className="card-info-pane">
                    
                    <h3 
                      className="card-name"
                      onClick={() => onViewDetails && onViewDetails(product)}
                    >
                      {product.name}
                    </h3>

                    <p className="card-one-line-desc">
                      {product.shortDesc}
                    </p>

                    {/* Key Features List (Max 3) */}
                    <ul className="card-features-list">
                      {tags.map((tag, idx) => (
                        <li key={idx} className="card-feature-item">
                          <Check size={12} className="check-icon" />
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Verified Tech Stack */}
                    {product.techStack && (
                      <div className="card-tech-stack">
                        <span className="tech-stack-label">STACK:</span>
                        <span className="tech-stack-text">{product.techStack}</span>
                      </div>
                    )}

                    {/* Card Bottom Pricing & Actions */}
                    <div className="card-bottom-row">
                      
                      <div className="card-pricing-info">
                        <span className="price-tag">
                          {product.pricing?.priceDisplay || 'Contact for Pricing'}
                        </span>
                        <span className="license-tag">Perpetual License</span>
                      </div>

                      <div className="card-btn-group">
                        {hasLiveDemo ? (
                          <a 
                            href={product.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm demo-action-btn"
                            title={`Live demo for ${product.name}`}
                          >
                            <Play size={12} />
                            <span>Demo</span>
                          </a>
                        ) : (
                          <span className="demo-soon-pill">Demo Soon</span>
                        )}

                        <button 
                          type="button"
                          className="btn btn-primary btn-sm details-action-btn"
                          onClick={() => onViewDetails && onViewDetails(product)}
                        >
                          <span>Details</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
