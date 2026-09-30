import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { productService } from '../services/productService';
import ProductScreenshot from './ProductScreenshot';
import ScreenshotGalleryModal from './ScreenshotGalleryModal';
import DocumentationModal from './DocumentationModal';

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

  // Modals local state
  const [screenshotModalProduct, setScreenshotModalProduct] = useState(null);
  const [docModalProduct, setDocModalProduct] = useState(null);

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
      (product.shortDesc && product.shortDesc.toLowerCase().includes(query)) ||
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

  const handleLiveDemoClick = (product) => {
    if (onLaunchDemo) {
      onLaunchDemo(product.id || product);
    } else if (product.demoUrl && product.demoUrl.startsWith('http')) {
      window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="catalog-section" id="featured-software">
      <div className="container">
        
        {/* Section Header */}
        <div className="catalog-header-bar">
          <div>
            <h2 className="catalog-title">Explore Production Software</h2>
            <p className="catalog-subtitle">Production-ready, self-hosted enterprise solutions built by Kiaan Technology.</p>
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

        {/* Professional Enterprise Category Tabs (Linear / Stripe / Vercel style) */}
        <div className="pro-category-nav-bar" role="tablist" aria-label="Software Categories">
          <button 
            type="button"
            role="tab"
            aria-selected={activeFilterTab === 'all'}
            className={`pro-category-tab ${activeFilterTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            <span className="tab-title">All Software</span>
            <span className="tab-count-badge">{sourceProducts.length}</span>
          </button>
          {CATEGORIES.map(cat => {
            const count = sourceProducts.filter(p => p.categoryId === cat.id).length;
            return (
              <button 
                key={cat.id} 
                type="button"
                role="tab"
                aria-selected={activeFilterTab === cat.id}
                className={`pro-category-tab ${activeFilterTab === cat.id ? 'active' : ''}`}
                onClick={() => handleTabClick(cat.id)}
              >
                <span className="tab-title">{cat.name}</span>
                <span className={`tab-count-badge ${count === 0 ? 'badge-zero' : ''}`}>{count}</span>
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
              const priceText = product.pricing?.priceDisplay || '₹49,999';

              return (
                <div key={product.id} className="market-product-card software-card-enhanced">
                  
                  {/* Top Screenshot Area */}
                  <div 
                    className="card-screenshot-wrap"
                    onClick={() => onViewDetails && onViewDetails(product)}
                  >
                    <ProductScreenshot product={product} height={175} />
                    <div className="card-top-badges">
                      <span className="card-cat-badge">{product.category}</span>
                      {product.isFlagship && (
                        <span className="badge badge-gold">Flagship</span>
                      )}
                    </div>
                  </div>

                  {/* Card Main Info */}
                  <div className="card-info-pane">
                    
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        className="card-name"
                        onClick={() => onViewDetails && onViewDetails(product)}
                        title="Click to view full specifications"
                      >
                        {product.name}
                      </h3>
                    </div>

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

                    {/* Price Section */}
                    <div className="card-price-container">
                      <div className="price-tag-wrap">
                        <span className="price-main">{priceText}</span>
                        <span className="price-sub">One-Time License • Self-Hosted</span>
                      </div>
                    </div>

                    {/* The 3 Dedicated Action Options: Live Demo, Screenshot, Document */}
                    <div className="card-triple-actions">
                      <button 
                        type="button"
                        className="action-btn demo-btn"
                        onClick={() => handleLiveDemoClick(product)}
                        title={`Test live interactive demo for ${product.name}`}
                      >
                        <Play size={13} />
                        <span>View Live Demo</span>
                      </button>

                      <button 
                        type="button"
                        className="action-btn screenshot-btn"
                        onClick={() => setScreenshotModalProduct(product)}
                        title={`View high-resolution screenshots for ${product.name}`}
                      >
                        <ImageIcon size={13} />
                        <span>View Screenshot</span>
                      </button>

                      <button 
                        type="button"
                        className="action-btn doc-btn"
                        onClick={() => setDocModalProduct(product)}
                        title={`View technical architecture and deployment documentation for ${product.name}`}
                      >
                        <FileText size={13} />
                        <span>View Document</span>
                      </button>
                    </div>

                    {/* Card Bottom Quick Link */}
                    <div className="card-details-footer">
                      <button 
                        type="button"
                        className="btn-link-details"
                        onClick={() => onViewDetails && onViewDetails(product)}
                      >
                        <span>Full Product Details</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Screenshot Gallery Modal */}
      {screenshotModalProduct && (
        <ScreenshotGalleryModal 
          product={screenshotModalProduct}
          onClose={() => setScreenshotModalProduct(null)}
          onViewDetails={onViewDetails}
        />
      )}

      {/* Documentation Modal */}
      {docModalProduct && (
        <DocumentationModal 
          product={docModalProduct}
          onClose={() => setDocModalProduct(null)}
          onViewDetails={onViewDetails}
        />
      )}

    </section>
  );
}
