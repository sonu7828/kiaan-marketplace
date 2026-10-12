import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Image as ImageIcon,
  FileText,
  ShoppingCart,
  Star
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
  onLaunchDemo,
  onAddToCart
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

  const handleTabClick = (catId) => {
    setActiveFilterTab(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  const handleLiveDemoClick = (product) => {
    if (onLaunchDemo) {
      onLaunchDemo(product);
    } else if (product.demoUrl) {
      window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter products based on search query and category
  const filteredProducts = sourceProducts.filter(product => {
    // 1. Category Filter
    if (activeFilterTab !== 'all' && product.categoryId !== activeFilterTab) {
      return false;
    }

    // 2. Search Query Filter
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = product.name?.toLowerCase().includes(q);
      const descMatch = product.shortDesc?.toLowerCase().includes(q) || product.description?.toLowerCase().includes(q);
      const tagMatch = product.tags?.some(tag => tag.toLowerCase().includes(q));
      const catMatch = product.category?.toLowerCase().includes(q);
      const stackMatch = product.techStack?.some(tech => tech.toLowerCase().includes(q));

      if (!nameMatch && !descMatch && !tagMatch && !catMatch && !stackMatch) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="featured-software" className="featured-software-section">
      <div className="container">
        
        {/* Modern Section Header */}
        <div className="catalog-header-wrap">
          <div className="catalog-title-group">
            <span className="section-eyebrow">READY-TO-DEPLOY SUITES</span>
            <h2 className="catalog-headline">Production-Ready Software Suites</h2>
            <p className="catalog-subdeck">
              Enterprise-grade systems with 100% source code, self-hosted deployment, and zero recurring royalties.
            </p>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="pro-category-tabs-nav" role="tablist">
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

        {/* Product Cards Grid: 4 cards per row */}
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
              const priceText = product.pricing?.priceDisplay || product.pricingTiers?.regular || '₹24,999';
              const ratingScore = (4.8 + (((product.id?.charCodeAt(0) || 7) % 3) * 0.1)).toFixed(1);
              const salesCount = 28 + (((product.id?.charCodeAt(1) || 9) * 4) % 150);

              return (
                <div key={product.id} className="market-product-card software-card-enhanced">
                  
                  {/* Card Image Area */}
                  <div 
                    className="card-screenshot-wrap"
                    onClick={() => onViewDetails && onViewDetails(product)}
                  >
                    <ProductScreenshot product={product} height={140} />
                    {product.isFlagship && (
                      <span className="card-flagship-pill">★ Flagship</span>
                    )}
                  </div>

                  {/* Card Main Info */}
                  <div className="card-info-pane">
                    
                    {/* 1. Name */}
                    <h3 
                      className="card-name"
                      onClick={() => onViewDetails && onViewDetails(product)}
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Author & Category line */}
                    <div className="card-author-line">
                      <span>by <strong>Kiaan Technology</strong> in {product.category || 'Software'}</span>
                    </div>

                    {/* Price */}
                    <div className="card-price-container">
                      <div className="price-tag-wrap">
                        <span className="price-main">{priceText}</span>
                      </div>
                    </div>

                    {/* 2. Rating & Sales */}
                    <div className="card-rating-sales-row">
                      <div className="card-rating-stars-wrap">
                        <span className="stars-symbol">★★★★★</span>
                        <span className="rating-score-num">({ratingScore})</span>
                      </div>
                      <span className="sales-count-badge">{salesCount} Sales</span>
                    </div>

                    {/* 3. Actions: Add to Cart, Live Demo, Document */}
                    <div className="card-marketplace-actions">
                      <button 
                        type="button"
                        className="card-btn-add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAddToCart) onAddToCart(product);
                        }}
                        title={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart size={14} />
                        <span>Add to Cart</span>
                      </button>

                      <div className="card-secondary-actions-row">
                        <button 
                          type="button"
                          className="card-btn-live-demo"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLiveDemoClick(product);
                          }}
                          title={`Launch Live Interactive Demo for ${product.name}`}
                        >
                          <Play size={11} />
                          <span>Live Demo</span>
                        </button>

                        <button 
                          type="button"
                          className="card-btn-doc-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDocModalProduct(product);
                          }}
                          title={`View Technical Architecture and Documentation for ${product.name}`}
                        >
                          <FileText size={11} />
                          <span>Document</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Bottom Quick Link */}
                    <div className="card-details-footer">
                      <button 
                        type="button"
                        className="btn-link-details"
                        onClick={() => onViewDetails && onViewDetails(product)}
                      >
                        <span>Full Details</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Catalog Action Bar */}
        <div className="catalog-bottom-bar" style={{ marginTop: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {(activeFilterTab !== 'all' || (searchQuery && searchQuery.trim())) ? (
            <button 
              type="button" 
              className="btn btn-secondary btn-md"
              onClick={() => {
                setActiveFilterTab('all');
                if (onSelectCategory) onSelectCategory('all');
              }}
            >
              <span>View All Software ({sourceProducts.length} Suites)</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <div className="catalog-count-note" style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--bg-soft)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              <span>Showing all {sourceProducts.length} production-ready enterprise software suites</span>
            </div>
          )}
        </div>

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
