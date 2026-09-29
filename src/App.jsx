import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
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

// Admin Panel Console
import AdminPanel from './components/admin/AdminPanel';

// Modals
import CustomQuoteModal from './components/CustomQuoteModal';

export default function App() {
  // Navigation & View State: 'home' | 'product-detail' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [activeProductSlug, setActiveProductSlug] = useState(null);

  // Dynamic Product Store State
  const [products, setProducts] = useState(() => productService.getAllProducts());

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  
  // Custom Quote & Inquiry Modal
  const [quoteServiceTitle, setQuoteServiceTitle] = useState(null);

  // Synchronize with URL hash for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView('admin');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#product/')) {
        const slug = hash.replace('#product/', '');
        setActiveProductSlug(slug);
        setCurrentView('product-detail');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    // Check hash on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSearchClick = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    setTimeout(() => {
      const searchSection = document.getElementById('featured-software');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
  }, [currentView]);

  const handleExploreClick = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    setTimeout(() => {
      const catalogSection = document.getElementById('featured-software');
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
    }
    setTimeout(() => {
      const catalogSection = document.getElementById('featured-software');
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#admin';
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
    } else {
      alert(`The live demo for ${product.name} is currently being prepared. You can request a private walkthrough or custom demo via Contact.`);
    }
  };

  // Admin Data Modification Handlers
  const handleSaveProduct = (productData) => {
    const res = productService.saveProduct(productData);
    setProducts(productService.getAllProducts());
    return res;
  };

  const handleDeleteProduct = (productId) => {
    const res = productService.deleteProduct(productId);
    setProducts(productService.getAllProducts());
    return res;
  };

  const handleToggleStatus = (productId) => {
    const res = productService.toggleProductStatus(productId);
    setProducts(productService.getAllProducts());
    return res;
  };

  const handleResetDefaults = () => {
    const res = productService.resetDefaults();
    setProducts(productService.getAllProducts());
    return res;
  };

  // Active product for detail page
  const activeProduct = productService.getProductBySlug(activeProductSlug) || productService.getProductById(activeProductSlug) || products[0];

  return (
    <div className="marketplace-app">
      
      {currentView === 'admin' ? (
        /* ============================================================ */
        /* ADMIN DASHBOARD CONSOLE (Module-Based Management)            */
        /* ============================================================ */
        <AdminPanel 
          products={products}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={handleDeleteProduct}
          onToggleStatus={handleToggleStatus}
          onPreviewProduct={(prod) => {
            handleViewProduct(prod);
          }}
          onBackToMarketplace={handleBackToHome}
          onResetDefaults={handleResetDefaults}
        />
      ) : (
        /* ============================================================ */
        /* PUBLIC MARKETPLACE STOREFRONT                                */
        /* ============================================================ */
        <>
          {/* PUBLIC HEADER */}
          <Header 
            onSearchClick={handleSearchClick}
            onExploreClick={handleExploreClick}
            onCategorySelect={handleCategorySelect}
            onSearchSubmit={handleHeroSearchSubmit}
            cartCount={cartCount}
            onHomeClick={handleBackToHome}
            onAdminClick={handleNavigateAdmin}
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
              
              {/* STEP 1: Hero Section */}
              <Hero 
                onExploreClick={handleExploreClick}
                onDemoClick={(productId) => handleLaunchDemo(productId)}
                onSearchSubmit={handleHeroSearchSubmit}
                onViewDetails={handleViewProduct}
              />

              {/* STEP 2: Browse by Category */}
              <CategoryNav 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />

              {/* STEP 3 & 4: Production-Ready Software Catalog */}
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
            onAdminClick={handleNavigateAdmin}
          />

          {/* CUSTOM QUOTE / CUSTOMIZATION INQUIRY MODAL */}
          {quoteServiceTitle && (
            <CustomQuoteModal 
              serviceTitle={quoteServiceTitle}
              onClose={() => setQuoteServiceTitle(null)}
            />
          )}
        </>
      )}

    </div>
  );
}
