import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ShoppingCart,
  User,
  ArrowRight,
  Layers,
  Users,
  Briefcase,
  Package,
  CreditCard,
  Cpu
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Header({ 
  onSearchClick: _onSearchClick, 
  onExploreClick, 
  onCategorySelect, 
  onSearchSubmit: _onSearchSubmit,
  cartCount = 0,
  onHomeClick,
  onNavigateSection,
  onOpenPortal,
  onOpenAdmin
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handling for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return <Layers size={16} />;
      case 'Users': return <Users size={16} />;
      case 'Briefcase': return <Briefcase size={16} />;
      case 'Package': return <Package size={16} />;
      case 'CreditCard': return <CreditCard size={16} />;
      case 'Cpu': return <Cpu size={16} />;
      default: return <Layers size={16} />;
    }
  };

  const handleNav = (sectionId, callback) => {
    setMobileMenuOpen(false);
    if (callback) {
      callback();
    } else if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`market-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          
          {/* 1. Kiaan Marketplace Logo */}
          <a 
            href="#" 
            className="brand-anchor"
            onClick={(e) => {
              if (onHomeClick) {
                e.preventDefault();
                onHomeClick();
              }
            }}
            aria-label="Kiaan Marketplace Homepage"
          >
            <div className="brand-mark">
              <span>K</span>
              <span className="mark-accent" />
            </div>
            <div className="brand-text">
              <span className="brand-primary-text">KIAAN</span>
              <span className="brand-secondary-text">MARKETPLACE</span>
            </div>
          </a>

          {/* Desktop Navigation Menu — Single Line */}
          <nav className="desktop-nav-menu" aria-label="Main Navigation">
            <a 
              href="#featured-software" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('featured-software', onExploreClick);
              }}
            >
              Software Catalog
            </a>

            <a 
              href="#industry-solutions" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('industry-solutions');
              }}
            >
              Industry Solutions
            </a>

            <a 
              href="#why-kiaan" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('why-kiaan');
              }}
            >
              Why Kiaan
            </a>

            <a 
              href="#customization-services" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('customization-services');
              }}
            >
              Customization Services
            </a>

            <a 
              href="#faqs" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('faqs');
              }}
            >
              FAQs
            </a>
          </nav>

          {/* 7-8. Right Action Utilities */}
          <div className="nav-actions">
            
            {/* 7. Admin Login */}
            <button 
              type="button" 
              className="btn-text sign-in-btn"
              onClick={() => {
                if (onOpenAdmin) {
                  onOpenAdmin();
                } else {
                  window.location.hash = '#admin';
                }
              }}
              title="Admin Console & Management Portal"
              aria-label="Admin Login"
            >
              <User size={15} />
              <span>Admin Login</span>
            </button>

            {cartCount > 0 && (
              <button 
                type="button" 
                className="cart-btn" 
                onClick={onExploreClick}
                aria-label="View Cart"
              >
                <ShoppingCart size={16} />
                <span className="cart-badge">{cartCount}</span>
              </button>
            )}

            {/* 8. Important Primary Action */}
            <button 
              type="button" 
              className="btn btn-primary btn-sm cta-explore-btn"
              onClick={onExploreClick}
            >
              <span>Explore Catalog</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              type="button" 
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-top">
              <div className="brand-mark small">
                <span>K</span>
              </div>
              <span className="font-bold text-dark">KIAAN MARKETPLACE</span>
              <button 
                type="button" 
                className="close-drawer-btn" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-content">
              <div className="mobile-links-list">
                <a 
                  href="#featured-software" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('featured-software', onExploreClick);
                  }}
                >
                  <span>Software Catalog</span>
                  <ArrowRight size={14} />
                </a>

                <a 
                  href="#industry-solutions" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('industry-solutions');
                  }}
                >
                  <span>Industry Solutions</span>
                  <ArrowRight size={14} />
                </a>

                <a 
                  href="#why-kiaan" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('why-kiaan');
                  }}
                >
                  <span>Why Kiaan</span>
                  <ArrowRight size={14} />
                </a>

                <a 
                  href="#customization-services" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('customization-services');
                  }}
                >
                  <span>Customization Services</span>
                  <ArrowRight size={14} />
                </a>

                <a 
                  href="#faqs" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('faqs');
                  }}
                >
                  <span>FAQs</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="mobile-categories-group">
                <span className="group-label">CATEGORIES</span>
                <div className="mobile-cats-grid">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      type="button"
                      className="cat-pill"
                      onClick={() => {
                        if (onCategorySelect) onCategorySelect(cat.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {getCategoryIcon(cat.icon)}
                      <span>{cat.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mobile-drawer-bottom">
                <button 
                  type="button" 
                  className="btn btn-secondary w-full mb-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenPortal) onOpenPortal();
                  }}
                >
                  <User size={15} />
                  <span>Customer Sign In</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExploreClick();
                  }}
                >
                  <span>Explore Software Catalog</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
