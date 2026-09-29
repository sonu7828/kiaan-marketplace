import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
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
import ClientPortalModal from './ClientPortalModal';

export default function Header({ 
  onSearchClick, 
  onExploreClick, 
  onCategorySelect, 
  cartCount = 0,
  onHomeClick
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside and Escape key handling for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCategoryDropdownOpen(false);
        setMobileMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    setCategoryDropdownOpen(false);
    if (callback) {
      callback();
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(navSearch, 'all');
    }
    const el = document.getElementById('featured-software');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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

          {/* 2-5. Desktop Navigation Menu */}
          <nav className="desktop-nav-menu" aria-label="Main Navigation">
            
            {/* 2. Software Catalog */}
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

            {/* 3. Categories Dropdown */}
            <div 
              className="dropdown-wrap" 
              ref={dropdownRef}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button 
                type="button" 
                className={`nav-link dropdown-toggle ${categoryDropdownOpen ? 'active' : ''}`}
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                aria-expanded={categoryDropdownOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDown size={14} className={`chevron-icon ${categoryDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="dropdown-menu-card" role="menu">
                  <div className="dropdown-grid">
                    {CATEGORIES.map(cat => (
                      <a 
                        key={cat.id} 
                        href="#featured-software"
                        className="dropdown-item"
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onCategorySelect) onCategorySelect(cat.id);
                          setCategoryDropdownOpen(false);
                          const el = document.getElementById('featured-software');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div className="dropdown-item-icon">
                          {getCategoryIcon(cat.icon)}
                        </div>
                        <div className="dropdown-item-info">
                          <span className="item-title">{cat.name}</span>
                          <span className="item-subtitle">{cat.count || 2} Suites</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Industry Solutions */}
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

            {/* 5. Custom Development */}
            <a 
              href="#customization-services" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNav('customization-services');
              }}
            >
              Custom Development
            </a>
          </nav>

          {/* 6. Refined Functional Search Field */}
          <form className="navbar-search-form" onSubmit={handleNavSearchSubmit}>
            <Search size={14} className="search-icon" />
            <input 
              ref={searchInputRef}
              type="text" 
              className="nav-search-input"
              placeholder="Search software..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              aria-label="Search software suites"
            />
            <kbd className="kbd-shortcut" title="Press Ctrl+K or ⌘K to focus search">⌘K</kbd>
          </form>

          {/* 7-8. Right Action Utilities */}
          <div className="nav-actions">
            
            {/* 7. Sign In / Account */}
            <button 
              type="button" 
              className="btn-text sign-in-btn"
              onClick={() => setPortalModalOpen(true)}
              aria-label="Sign in to client portal"
            >
              <User size={15} />
              <span>Sign In</span>
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
              
              <div 
                className="mobile-search-bar"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSearchClick) onSearchClick();
                }}
              >
                <Search size={15} />
                <span>Search ERP, CRM, HRMS...</span>
              </div>

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
                  href="#customization-services" 
                  className="mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('customization-services');
                  }}
                >
                  <span>Custom Development</span>
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
                        const el = document.getElementById('featured-software');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
                    setPortalModalOpen(true);
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

      {/* Client License & Account Portal Modal */}
      <ClientPortalModal 
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </>
  );
}
