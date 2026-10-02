import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedSoftware from './components/FeaturedSoftware';
import IndustrySolutions from './components/IndustrySolutions';
import WhyKiaan from './components/WhyKiaan';
import HowItWorks from './components/HowItWorks';
import CustomizationServices from './components/CustomizationServices';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

// Product Catalog & Detail Page
import { productService } from './services/productService';
import ProductDetailPage from './components/ProductDetailPage';

// Admin Panel (Private Isolated Console)
import AdminPanel from './components/admin/AdminPanel';

// Modals
import CustomQuoteModal from './components/CustomQuoteModal';
import ClientPortalModal from './components/ClientPortalModal';
import { ShieldCheck, Info, Lock } from 'lucide-react';

export default function App() {
  // Navigation & View State: 'home' | 'product-detail' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [activeProductSlug, setActiveProductSlug] = useState(null);
  const [pendingScrollSection, setPendingScrollSection] = useState(null);

  // Dynamic Product Store State
  const [products, setProducts] = useState(() => productService.getAllProducts());

  // Derived Active Product for Detail View
  const activeProduct = products.find(p => p.slug === activeProductSlug || p.id === activeProductSlug) || products[0] || null;

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  
  // Custom Quote & Inquiry Modal
  const [quoteServiceTitle, setQuoteServiceTitle] = useState(null);

  // Customer Portal Modal
  const [portalModalOpen, setPortalModalOpen] = useState(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return sessionStorage.getItem('kiaan_admin_auth') === 'true';
      }
    } catch {}
    return false;
  });
  const [adminEmail, setAdminEmail] = useState('admin@kiaantechnology.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Synchronize with URL hash for navigation & browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const slug = hash.replace('#product/', '');
        setActiveProductSlug(slug);
        setCurrentView('product-detail');
        window.scrollTo(0, 0);
      } else if (hash === '#admin') {
        setCurrentView('admin');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#') && hash.length > 1) {
        const sectionId = hash.substring(1);
        setCurrentView('home');
        setPendingScrollSection(sectionId);
      } else {
        setCurrentView('home');
      }
    };

    // Check hash on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Admin Shortcut: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleAdminKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        window.location.hash = '#admin';
      }
    };
    window.addEventListener('keydown', handleAdminKey);
    return () => window.removeEventListener('keydown', handleAdminKey);
  }, []);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminPassword.trim().length > 0) {
      setIsAdminAuthenticated(true);
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('kiaan_admin_auth', 'true');
        }
      } catch {}
      setAdminLoginError('');
    } else {
      setAdminLoginError('Please enter the administrator password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.removeItem('kiaan_admin_auth');
      }
    } catch {}
    window.location.hash = '';
    setCurrentView('home');
  };

  // Cross-view section scroll coordinator: waits for homepage DOM to mount before scrolling
  useEffect(() => {
    if (currentView === 'home' && pendingScrollSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingScrollSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setPendingScrollSection(null);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [currentView, pendingScrollSection]);

  const handleNavigateSection = useCallback((sectionId, categoryId = null) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      setPendingScrollSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentView]);

  const handleSearchClick = useCallback(() => {
    handleNavigateSection('featured-software');
  }, [handleNavigateSection]);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to jump to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSearchClick]);

  const handleExploreClick = () => {
    handleNavigateSection('featured-software');
  };

  const handleCategorySelect = (catId) => {
    handleNavigateSection('featured-software', catId);
  };

  const handleHeroSearchSubmit = (query, catId) => {
    setSearchQuery(query);
    if (catId && catId !== 'all') {
      setSelectedCategory(catId);
    }
    const catalogSection = document.getElementById('featured-software');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // View Navigation Handlers
  const handleViewProduct = (product) => {
    const slug = product.slug || product.id;
    setActiveProductSlug(slug);
    setCurrentView('product-detail');
    window.location.hash = `#product/${slug}`;
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  // Live Demo Launch Handler
  const handleLaunchDemo = (productOrId) => {
    let product;
    if (typeof productOrId === 'string') {
      product = productService.getProductById(productOrId) || productService.getProductBySlug(productOrId);
    } else {
      product = productOrId;
    }

    if (!product) return;

    if (product.demoUrl && product.demoUrl.startsWith('http')) {
      window.open(product.demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Render Private Admin Console or Login Gate
  if (currentView === 'admin') {
    if (isAdminAuthenticated) {
      return (
        <AdminPanel 
          products={products}
          onSaveProduct={(updated) => {
            productService.saveProduct(updated);
            setProducts(productService.getAllProducts());
          }}
          onDeleteProduct={(id) => {
            productService.deleteProduct(id);
            setProducts(productService.getAllProducts());
          }}
          onToggleStatus={(id) => {
            productService.toggleProductStatus(id);
            setProducts(productService.getAllProducts());
          }}
          onResetDefaults={() => {
            productService.resetDefaults();
            setProducts(productService.getAllProducts());
          }}
          onBackToMarketplace={() => {
            window.location.hash = '';
            setProducts(productService.getAllProducts());
            setCurrentView('home');
          }}
          onPreviewProduct={(product) => {
            handleViewProduct(product);
          }}
        />
      );
    }

    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-k-badge">KIAAN TECH</span>
            <h2 className="admin-login-title">Admin Console Access</h2>
            <p className="admin-login-subtitle">Private administrative controls for marketplace software catalog, categories, inquiries, and licensing.</p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="admin-login-form">
            {adminLoginError && (
              <div className="admin-login-error mb-3">
                <Info size={14} />
                <span>{adminLoginError}</span>
              </div>
            )}

            <div className="field-group mb-3">
              <label className="field-label">Administrator Account</label>
              <input 
                type="email" 
                className="field-text"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@kiaantechnology.com"
                required
              />
            </div>

            <div className="field-group mb-3">
              <label className="field-label">Passkey / Password</label>
              <input 
                type="password" 
                className="field-text"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="demo-credentials-note mb-4">
              <Lock size={14} className="text-accent-gold" />
              <span>Demo Passkey: <strong>admin123</strong> (pre-filled for testing)</span>
            </div>

            <div className="admin-login-actions">
              <button 
                type="button" 
                className="btn btn-secondary btn-md"
                onClick={() => {
                  window.location.hash = '';
                  setCurrentView('home');
                }}
              >
                Return to Storefront
              </button>
              <button type="submit" className="btn btn-primary btn-md">
                <ShieldCheck size={16} />
                <span>Sign In to Console</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-app">
      {/* PUBLIC HEADER */}
      <Header 
        onSearchClick={handleSearchClick}
        onExploreClick={handleExploreClick}
        onCategorySelect={handleCategorySelect}
        onSearchSubmit={handleHeroSearchSubmit}
        cartCount={cartCount}
        onHomeClick={handleBackToHome}
        onNavigateSection={handleNavigateSection}
        onOpenPortal={() => setPortalModalOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setCurrentView('admin');
        }}
      />

      {currentView === 'product-detail' ? (
        /* DEDICATED PUBLIC PRODUCT DETAIL PAGE */
        <ProductDetailPage 
          product={activeProduct}
          onBack={handleBackToHome}
          onLaunchDemo={handleLaunchDemo}
          onRequestQuote={(title) => setQuoteServiceTitle(title)}
          onAddToCart={() => setCartCount(c => c + 1)}
        />
      ) : (
        /* PUBLIC HOMEPAGE */
        <main>
          {/* STEP 1: Streamlined Hero Section */}
          <Hero 
            onSearchSubmit={handleHeroSearchSubmit}
            selectedCategory={selectedCategory}
          />

          {/* STEP 2: Production-Ready Software Catalog */}
          <FeaturedSoftware 
            products={products.filter(p => p.status !== 'draft')}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onViewDetails={handleViewProduct}
            onLaunchDemo={handleLaunchDemo}
          />

          {/* STEP 5: Browse by Industry */}
          <IndustrySolutions 
            onExploreSolutions={handleExploreClick}
            onViewProduct={handleViewProduct}
            onSelectCategory={handleCategorySelect}
          />

          {/* STEP 6: Why Choose Kiaan Technology */}
          <WhyKiaan />

          {/* STEP 7: How It Works */}
          <HowItWorks />

          {/* STEP 8: Custom Software Development */}
          <CustomizationServices 
            onRequestQuote={(serviceTitle) => setQuoteServiceTitle(serviceTitle)}
          />

          {/* STEP 9: FAQs */}
          <FaqSection 
            onOpenContact={() => setQuoteServiceTitle('General Inquiry')}
          />
        </main>
      )}

      {/* FOOTER */}
      <Footer 
        onCategorySelect={handleCategorySelect}
        onExploreClick={handleExploreClick}
        onNavigateSection={handleNavigateSection}
        onOpenPortal={() => setPortalModalOpen(true)}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setCurrentView('admin');
        }}
      />

      {/* CUSTOM QUOTE / CUSTOMIZATION INQUIRY MODAL */}
      {quoteServiceTitle && (
        <CustomQuoteModal 
          serviceTitle={quoteServiceTitle}
          onClose={() => setQuoteServiceTitle(null)}
        />
      )}

      {/* CLIENT PORTAL & LICENSE LOOKUP MODAL */}
      <ClientPortalModal 
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </div>
  );
}
