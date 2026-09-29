import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Save, 
  Globe, 
  Play,
  Video, 
  FileText, 
  Sliders, 
  RotateCcw, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Building2,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Settings,
  ChevronRight,
  TrendingUp,
  Tag,
  Check,
  X,
  Clock,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import { CATEGORIES as DEFAULT_CATEGORIES, INDUSTRIES as DEFAULT_INDUSTRIES } from '../../data/products';
import { productService } from '../../services/productService';

export default function AdminPanel({ 
  products: initialProducts, 
  onSaveProduct, 
  onDeleteProduct, 
  onToggleStatus, 
  onPreviewProduct,
  onBackToMarketplace,
  onResetDefaults 
}) {
  // Navigation & Active Module
  const [activeModule, setActiveModule] = useState('overview'); 
  // 'overview' | 'catalog' | 'form' | 'categories' | 'industry' | 'hero' | 'featured' | 'pricing' | 'faqs' | 'services' | 'inquiries' | 'settings'

  const [productsList, setProductsList] = useState(initialProducts || productService.getAllProducts());
  const [inquiriesList, setInquiriesList] = useState(() => productService.getInquiries());
  const [notification, setNotification] = useState(null);

  // Filters for Product Table
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Selected Inquiry for Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Product Form State
  const emptyForm = {
    id: '',
    name: '',
    slug: '',
    shortDesc: '',
    fullDesc: '',
    category: 'Enterprise Resource Planning',
    categoryId: 'erp',
    industry: 'Manufacturing & Distribution',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    whoShouldUse: '',
    features: [''],
    modules: [''],
    screenshots: [{ url: '', caption: '' }],
    techStack: 'React, Node.js (Express), MySQL',
    demoUrl: '',
    demoVideoUrl: '',
    pricing: {
      isApproved: false,
      priceDisplay: 'Contact for Pricing',
      pricingNote: 'Perpetual single-domain license with dedicated server deployment assistance.'
    },
    customizationAvailable: true,
    status: 'published', // 'published' | 'draft'
    isFeatured: false,
    isFlagship: false
  };

  const [formData, setFormData] = useState(emptyForm);
  const [formTab, setFormTab] = useState('basic'); // 'basic' | 'capabilities' | 'media' | 'demo' | 'commercial' | 'publishing'

  // Homepage Config State
  const [heroConfig, setHeroConfig] = useState({
    pillText: 'Kiaan Technology • Enterprise Software Marketplace',
    headline: 'Production-Ready Business Software, Built to Deploy',
    subheadline: 'Discover battle-tested ERP, CRM, HRMS, and Inventory systems. Evaluate with live interactive demos, deploy on your own servers or cloud, and scale with full customization support.',
    trustPoint1: '100% Self-Hosted & Private',
    trustPoint2: 'Full Source Customization',
    trustPoint3: 'Verified Live Demos'
  });

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshData = () => {
    const fresh = productService.getAllProducts();
    setProductsList(fresh);
    setInquiriesList(productService.getInquiries());
  };

  // --- Handlers for Product Actions ---
  const handleAddNewProduct = () => {
    setFormData(emptyForm);
    setFormTab('basic');
    setActiveModule('form');
  };

  const handleEditProduct = (product) => {
    setFormData({
      ...product,
      features: product.features && product.features.length ? product.features : [''],
      modules: product.modules && product.modules.length ? product.modules : [''],
      screenshots: product.screenshots && product.screenshots.length ? product.screenshots : [{ url: '', caption: '' }],
      pricing: product.pricing || { isApproved: false, priceDisplay: 'Contact for Pricing', pricingNote: '' }
    });
    setFormTab('basic');
    setActiveModule('form');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      if (onDeleteProduct) {
        onDeleteProduct(id);
      } else {
        productService.deleteProduct(id);
      }
      refreshData();
      showToast(`Removed "${name}" from catalog.`);
    }
  };

  const handleToggle = (id) => {
    if (onToggleStatus) {
      onToggleStatus(id);
    } else {
      productService.toggleProductStatus(id);
    }
    refreshData();
    showToast('Product publication status updated.');
  };

  const handleSaveForm = (targetStatus) => {
    if (!formData.name.trim()) {
      showToast('Please enter a software product name.', 'error');
      return;
    }

    const cleaned = {
      ...formData,
      status: targetStatus || formData.status,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      features: (formData.features || []).filter(f => f.trim()),
      modules: (formData.modules || []).filter(m => m.trim()),
      screenshots: (formData.screenshots || []).filter(s => s.url && s.url.trim()),
      coverImage: formData.coverImage || formData.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'
    };

    if (onSaveProduct) {
      onSaveProduct(cleaned);
    } else {
      productService.saveProduct(cleaned);
    }
    refreshData();
    showToast(`Saved "${cleaned.name}" successfully!`);
    setActiveModule('catalog');
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog products back to standard Kiaan factory defaults?')) {
      if (onResetDefaults) {
        onResetDefaults();
      } else {
        productService.resetDefaults();
      }
      refreshData();
      showToast('Catalog restored to default factory products.');
    }
  };

  const handleInquiryStatusChange = (inqId, newStatus) => {
    productService.updateInquiryStatus(inqId, newStatus);
    refreshData();
    showToast(`Inquiry marked as ${newStatus}`);
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Filtered Products for Catalog Table
  const displayedProducts = productsList.filter(p => {
    const matchCat = filterCategory === 'all' || p.categoryId === filterCategory;
    const matchStat = filterStatus === 'all' || p.status === filterStatus;
    const matchQ = !searchFilter.trim() || 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchStat && matchQ;
  });

  // KPI Calculations
  const totalCount = productsList.length;
  const publishedCount = productsList.filter(p => p.status === 'published').length;
  const draftCount = productsList.filter(p => p.status === 'draft').length;
  const demoActiveCount = productsList.filter(p => p.demoUrl && p.demoUrl.startsWith('http')).length;
  const inquiriesCount = inquiriesList.length;

  return (
    <div className="admin-app-layout">
      
      {/* Top Header */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-brand-cluster">
            <button className="admin-storefront-btn" onClick={onBackToMarketplace}>
              <ArrowLeft size={16} />
              <span>Back to Storefront</span>
            </button>
            <div className="topbar-divider" />
            <div className="admin-tag-title">
              <span className="admin-k-badge">KIAAN TECH</span>
              <h1 className="admin-screen-title">Marketplace Administration</h1>
            </div>
          </div>

          <div className="admin-topbar-utilities">
            <div className="demo-notice-chip">
              <span className="demo-pulse-dot" />
              <span>Demonstration Mode • LocalStorage Persistence</span>
            </div>
            {activeModule === 'form' ? (
              <div className="form-head-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('catalog')}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => handleSaveForm()}>
                  <Save size={14} />
                  <span>Save Product</span>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                <Plus size={15} />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className={`admin-notification-toast ${notification.type === 'error' ? 'toast-err' : 'toast-ok'}`}>
          {notification.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="admin-body-container">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="admin-sidebar-nav">
          <div className="sidebar-group-title">MAIN MANAGEMENT</div>
          
          <button 
            className={`admin-nav-item ${activeModule === 'overview' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('overview')}
          >
            <TrendingUp size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'catalog' || activeModule === 'form' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('catalog')}
          >
            <Package size={16} />
            <span>Products Catalog</span>
            <span className="nav-count-badge">{totalCount}</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'inquiries' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('inquiries')}
          >
            <MessageSquare size={16} />
            <span>Customer Inquiries</span>
            {inquiriesCount > 0 && <span className="nav-count-badge alert-count">{inquiriesCount}</span>}
          </button>

          <div className="sidebar-group-title mt-4">SHOWCASE CONTROLS</div>

          <button 
            className={`admin-nav-item ${activeModule === 'hero' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('hero')}
          >
            <Sparkles size={16} />
            <span>Hero & Banners</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'categories' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('categories')}
          >
            <Layers size={16} />
            <span>Categories</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'industry' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('industry')}
          >
            <Building2 size={16} />
            <span>Industry Solutions</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'featured' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('featured')}
          >
            <Tag size={16} />
            <span>Spotlight & Ordering</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'pricing' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('pricing')}
          >
            <ShieldCheck size={16} />
            <span>Pricing & Licensing</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'faqs' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('faqs')}
          >
            <HelpCircle size={16} />
            <span>FAQs & Content</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'services' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('services')}
          >
            <Briefcase size={16} />
            <span>Custom Services</span>
          </button>

          <div className="sidebar-group-title mt-4">SYSTEM</div>

          <button 
            className={`admin-nav-item ${activeModule === 'settings' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('settings')}
          >
            <Settings size={16} />
            <span>Site Settings</span>
          </button>
        </aside>

        {/* RIGHT WORKSPACE AREA */}
        <main className="admin-content-pane">
          
          {/* ================================================================ */}
          {/* MODULE 1: DASHBOARD OVERVIEW                                      */}
          {/* ================================================================ */}
          {activeModule === 'overview' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Marketplace Overview</h2>
                  <p className="pane-subtitle">Live health status, catalog metrics, and incoming client requests.</p>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={onBackToMarketplace}>
                  <ExternalLink size={14} />
                  <span>Preview Public Store</span>
                </button>
              </div>

              {/* KPI Cards Grid */}
              <div className="kpi-cards-grid">
                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Package size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Software Products</span>
                    <strong className="kpi-num">{totalCount}</strong>
                    <span className="kpi-sub">{publishedCount} Published • {draftCount} Drafts</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Globe size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Active Live Demos</span>
                    <strong className="kpi-num">{demoActiveCount}</strong>
                    <span className="kpi-sub">External test environments</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('inquiries')}>
                  <div className="kpi-icon-pill"><MessageSquare size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Quote Inquiries Logged</span>
                    <strong className="kpi-num">{inquiriesCount}</strong>
                    <span className="kpi-sub">Client customization scopes</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('categories')}>
                  <div className="kpi-icon-pill"><Layers size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Active Categories</span>
                    <strong className="kpi-num">{DEFAULT_CATEGORIES.length}</strong>
                    <span className="kpi-sub">Core operational domains</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="admin-card-panel mt-6">
                <h3 className="panel-heading">Quick Actions</h3>
                <div className="quick-actions-row">
                  <button className="btn btn-secondary btn-md" onClick={handleAddNewProduct}>
                    <Plus size={15} />
                    <span>Create New Software Entry</span>
                  </button>
                  <button className="btn btn-secondary btn-md" onClick={() => setActiveModule('hero')}>
                    <Sparkles size={15} />
                    <span>Edit Homepage Hero Copy</span>
                  </button>
                  <button className="btn btn-secondary btn-md" onClick={() => setActiveModule('inquiries')}>
                    <MessageSquare size={15} />
                    <span>View Customer Inquiries ({inquiriesCount})</span>
                  </button>
                  <button className="btn btn-secondary btn-md" onClick={handleResetCatalog}>
                    <RotateCcw size={15} />
                    <span>Restore Factory Defaults</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Snapshot */}
              <div className="admin-card-panel mt-6">
                <div className="panel-header-split">
                  <h3 className="panel-heading">Recent Customization Requests</h3>
                  <button className="btn-link" onClick={() => setActiveModule('inquiries')}>View All →</button>
                </div>

                {inquiriesList.length === 0 ? (
                  <p className="text-muted py-4">No client inquiries received yet. Inquiries submitted through the Custom Quote Modal will appear here in real time.</p>
                ) : (
                  <div className="inquiries-mini-table">
                    {inquiriesList.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="inquiry-mini-row" onClick={() => setSelectedInquiry(inq)}>
                        <div>
                          <strong>{inq.name}</strong> ({inq.company || 'Direct Buyer'})
                          <div className="text-muted text-xs">{inq.service} • {inq.email}</div>
                        </div>
                        <span className={`status-pill pill-${(inq.status || 'New').toLowerCase()}`}>
                          {inq.status || 'New'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 2: PRODUCT CATALOG TABLE                                  */}
          {/* ================================================================ */}
          {activeModule === 'catalog' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Software Catalog Management</h2>
                  <p className="pane-subtitle">Manage products, update live demo URLs, and control published status.</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                  <Plus size={15} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Table Filters Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by title or description..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="filter-input"
                  />
                </div>

                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {DEFAULT_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Live Demo URL</th>
                      <th>Pricing</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-muted">
                          No products found matching the current filters.
                        </td>
                      </tr>
                    ) : (
                      displayedProducts.map(p => {
                        const hasDemo = p.demoUrl && p.demoUrl.startsWith('http');
                        return (
                          <tr key={p.id}>
                            <td>
                              <div className="product-table-cell">
                                <img 
                                  src={p.coverImage || p.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'} 
                                  alt={p.name}
                                  className="table-thumb"
                                />
                                <div>
                                  <strong className="cell-title">{p.name}</strong>
                                  <span className="cell-slug">/{p.slug}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-subtle">{p.category}</span>
                            </td>
                            <td>
                              {hasDemo ? (
                                <a 
                                  href={p.demoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="demo-link-cell"
                                >
                                  <Play size={12} className="text-gold" />
                                  <span className="truncate max-w-xs">{p.demoUrl}</span>
                                  <ExternalLink size={11} className="text-muted" />
                                </a>
                              ) : (
                                <span className="demo-pending-cell">Demo Coming Soon</span>
                              )}
                            </td>
                            <td>
                              <span className="price-tag-cell">
                                {p.pricing?.priceDisplay || 'Contact for Pricing'}
                              </span>
                            </td>
                            <td>
                              <button 
                                className={`status-toggle-btn status-${p.status || 'published'}`}
                                onClick={() => handleToggle(p.id)}
                                title="Click to toggle status"
                              >
                                {p.status === 'published' ? 'Published' : 'Draft'}
                              </button>
                            </td>
                            <td className="text-right">
                              <div className="table-actions-cluster">
                                <button 
                                  className="icon-action-btn"
                                  onClick={() => handleEditProduct(p)}
                                  title="Edit product"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button 
                                  className="icon-action-btn delete-btn"
                                  onClick={() => handleDelete(p.id, p.name)}
                                  title="Delete product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 3: PRODUCT EDITOR FORM (Multi-Tab)                         */}
          {/* ================================================================ */}
          {activeModule === 'form' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">{formData.id ? `Edit: ${formData.name}` : 'Create New Software Product'}</h2>
                  <p className="pane-subtitle">Configure software overview, capabilities, screenshots, demo links, and pricing.</p>
                </div>
                <div className="header-btn-row">
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('catalog')}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleSaveForm()}>
                    <Save size={14} />
                    <span>Save Product</span>
                  </button>
                </div>
              </div>

              {/* Form Navigation Tabs */}
              <div className="form-tabs-bar">
                <button 
                  className={`form-tab-btn ${formTab === 'basic' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('basic')}
                >
                  1. Basic Details
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'capabilities' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('capabilities')}
                >
                  2. Capabilities & Modules
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'media' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('media')}
                >
                  3. Screenshots & Media
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'demo' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('demo')}
                >
                  4. Live Demo Settings
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'commercial' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('commercial')}
                >
                  5. Commercial & Licensing
                </button>
              </div>

              {/* Form Body Panel */}
              <div className="form-card-panel">
                
                {/* TAB 1: BASIC DETAILS */}
                {formTab === 'basic' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Software Name *</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. KiaanERP Enterprise"
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Category</label>
                      <select 
                        className="field-text"
                        value={formData.categoryId}
                        onChange={(e) => {
                          const catId = e.target.value;
                          const found = DEFAULT_CATEGORIES.find(c => c.id === catId);
                          setFormData({ 
                            ...formData, 
                            categoryId: catId, 
                            category: found ? found.name : formData.category 
                          });
                        }}
                      >
                        {DEFAULT_CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">URL Slug</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        value={formData.slug} 
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. kiaan-erp-enterprise"
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Short Summary (1-2 sentences for catalog cards) *</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        value={formData.shortDesc} 
                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                        placeholder="Complete business management software for finance, inventory, and operations."
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Full Comprehensive Description</label>
                      <textarea 
                        rows={4}
                        className="field-textarea"
                        value={formData.fullDesc}
                        onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                        placeholder="Detailed multi-paragraph description for the dedicated product detail page..."
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Target Audience / Who Should Use</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        value={formData.whoShouldUse} 
                        onChange={(e) => setFormData({ ...formData, whoShouldUse: e.target.value })}
                        placeholder="Mid-sized enterprises, distributors, and manufacturing businesses."
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: CAPABILITIES & MODULES */}
                {formTab === 'capabilities' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Key Features & Capabilities (One per line)</label>
                      {(formData.features || []).map((feat, idx) => (
                        <div key={idx} className="array-input-row">
                          <input 
                            type="text"
                            className="field-text"
                            value={feat}
                            onChange={(e) => {
                              const arr = [...formData.features];
                              arr[idx] = e.target.value;
                              setFormData({ ...formData, features: arr });
                            }}
                            placeholder="e.g. Multi-currency financial ledger with real-time balance sheet"
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const arr = formData.features.filter((_, i) => i !== idx);
                              setFormData({ ...formData, features: arr.length ? arr : [''] });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={() => setFormData({ ...formData, features: [...(formData.features || []), ''] })}
                      >
                        <Plus size={14} /> Add Feature
                      </button>
                    </div>

                    <div className="field-group full-span mt-4">
                      <label className="field-label">Functional Modules (One per line)</label>
                      {(formData.modules || []).map((mod, idx) => (
                        <div key={idx} className="array-input-row">
                          <input 
                            type="text"
                            className="field-text"
                            value={mod}
                            onChange={(e) => {
                              const arr = [...formData.modules];
                              arr[idx] = e.target.value;
                              setFormData({ ...formData, modules: arr });
                            }}
                            placeholder="e.g. Financial Accounting & General Ledger"
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const arr = formData.modules.filter((_, i) => i !== idx);
                              setFormData({ ...formData, modules: arr.length ? arr : [''] });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={() => setFormData({ ...formData, modules: [...(formData.modules || []), ''] })}
                      >
                        <Plus size={14} /> Add Module
                      </button>
                    </div>

                    <div className="field-group full-span mt-4">
                      <label className="field-label">Technology Stack</label>
                      <input 
                        type="text"
                        className="field-text"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        placeholder="React frontend, Node.js (Express), MySQL database"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: MEDIA & SCREENSHOTS */}
                {formTab === 'media' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Primary Cover Image URL</label>
                      <input 
                        type="url"
                        className="field-text"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="field-group full-span mt-4">
                      <label className="field-label">Screenshot Gallery</label>
                      {(formData.screenshots || []).map((shot, idx) => (
                        <div key={idx} className="screenshot-edit-card">
                          <div className="shot-fields">
                            <input 
                              type="url"
                              className="field-text"
                              value={shot.url}
                              onChange={(e) => {
                                const arr = [...formData.screenshots];
                                arr[idx] = { ...arr[idx], url: e.target.value };
                                setFormData({ ...formData, screenshots: arr });
                              }}
                              placeholder="Image URL: https://..."
                            />
                            <input 
                              type="text"
                              className="field-text"
                              value={shot.caption}
                              onChange={(e) => {
                                const arr = [...formData.screenshots];
                                arr[idx] = { ...arr[idx], caption: e.target.value };
                                setFormData({ ...formData, screenshots: arr });
                              }}
                              placeholder="Caption: Operational Dashboard"
                            />
                          </div>
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const arr = formData.screenshots.filter((_, i) => i !== idx);
                              setFormData({ ...formData, screenshots: arr.length ? arr : [{ url: '', caption: '' }] });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={() => setFormData({ 
                          ...formData, 
                          screenshots: [...(formData.screenshots || []), { url: '', caption: '' }] 
                        })}
                      >
                        <Plus size={14} /> Add Screenshot
                      </button>
                    </div>

                    <div className="field-group full-span mt-4">
                      <label className="field-label">Demo Walkthrough Video URL (Optional)</label>
                      <input 
                        type="url"
                        className="field-text"
                        value={formData.demoVideoUrl || ''}
                        onChange={(e) => setFormData({ ...formData, demoVideoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                      />
                    </div>
                  </div>
                )}

                {/* TAB 4: LIVE DEMO SETTINGS */}
                {formTab === 'demo' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Live Demo External URL</label>
                      <input 
                        type="url"
                        className="field-text"
                        value={formData.demoUrl || ''}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                        placeholder="https://erp.kiaantechnology.com (Leave blank if pending)"
                      />
                      <span className="field-hint">
                        If provided, clicking "Live Demo" opens this external website in a new tab. If blank, the public storefront displays "Demo Coming Soon".
                      </span>
                    </div>
                  </div>
                )}

                {/* TAB 5: COMMERCIAL & LICENSING */}
                {formTab === 'commercial' && (
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label className="field-label">Pricing Display Text</label>
                      <input 
                        type="text"
                        className="field-text"
                        value={formData.pricing?.priceDisplay || 'Contact for Pricing'}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricing: { ...formData.pricing, priceDisplay: e.target.value } 
                        })}
                        placeholder="Contact for Pricing or ₹48,500"
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Licensing Note</label>
                      <input 
                        type="text"
                        className="field-text"
                        value={formData.pricing?.pricingNote || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricing: { ...formData.pricing, pricingNote: e.target.value } 
                        })}
                        placeholder="Perpetual single-domain license with deployment support."
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="checkbox-row">
                        <input 
                          type="checkbox"
                          checked={!!formData.isFlagship}
                          onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                        />
                        <span>Feature this software as the Flagship Spotlight Suite on the homepage</span>
                      </label>
                    </div>

                    <div className="field-group full-span">
                      <label className="checkbox-row">
                        <input 
                          type="checkbox"
                          checked={formData.status === 'published'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                        />
                        <span>Publish immediately to public showcase storefront</span>
                      </label>
                    </div>
                  </div>
                )}

              </div>

              {/* Form Bottom Bar */}
              <div className="form-bottom-actions">
                <button className="btn btn-secondary btn-md" onClick={() => setActiveModule('catalog')}>
                  Discard Changes
                </button>
                <button className="btn btn-primary btn-md" onClick={() => handleSaveForm()}>
                  <Save size={16} />
                  <span>Save and Update Storefront</span>
                </button>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 4: CATEGORIES MANAGEMENT                                   */}
          {/* ================================================================ */}
          {activeModule === 'categories' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Marketplace Categories</h2>
                  <p className="pane-subtitle">Manage catalog categories and operational classification.</p>
                </div>
              </div>

              <div className="admin-grid-cards">
                {DEFAULT_CATEGORIES.map(cat => (
                  <div key={cat.id} className="category-admin-card">
                    <div className="cat-admin-top">
                      <strong className="cat-admin-name">{cat.name}</strong>
                      <span className="badge badge-subtle">{cat.id}</span>
                    </div>
                    <p className="cat-admin-desc">{cat.shortDesc}</p>
                    <div className="cat-admin-footer">
                      <span className="text-muted text-xs">{productsList.filter(p => p.categoryId === cat.id).length} Active Products</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 5: INDUSTRY SOLUTIONS                                      */}
          {/* ================================================================ */}
          {activeModule === 'industry' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Industry Solutions</h2>
                  <p className="pane-subtitle">Manage specialized vertical software solutions.</p>
                </div>
              </div>

              <div className="admin-grid-cards">
                {DEFAULT_INDUSTRIES.map(ind => (
                  <div key={ind.id} className="category-admin-card">
                    <div className="cat-admin-top">
                      <strong className="cat-admin-name">{ind.name}</strong>
                      <span className="badge badge-subtle">{ind.id}</span>
                    </div>
                    <p className="cat-admin-desc">{ind.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 6: HERO & HOMEPAGE BANNERS                                 */}
          {/* ================================================================ */}
          {activeModule === 'hero' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Homepage Hero & Banners</h2>
                  <p className="pane-subtitle">Customize the primary discovery headline, value copy, and trust badges.</p>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast('Hero settings updated successfully!')}
                >
                  <Save size={14} /> Save Hero Config
                </button>
              </div>

              <div className="admin-card-panel">
                <div className="form-fields-grid">
                  <div className="field-group full-span">
                    <label className="field-label">Announcement Eyebrow Pill</label>
                    <input 
                      type="text" 
                      className="field-text"
                      value={heroConfig.pillText}
                      onChange={(e) => setHeroConfig({ ...heroConfig, pillText: e.target.value })}
                    />
                  </div>

                  <div className="field-group full-span">
                    <label className="field-label">Hero Main Title Headline</label>
                    <input 
                      type="text" 
                      className="field-text"
                      value={heroConfig.headline}
                      onChange={(e) => setHeroConfig({ ...heroConfig, headline: e.target.value })}
                    />
                  </div>

                  <div className="field-group full-span">
                    <label className="field-label">Hero Supporting Subheadline</label>
                    <textarea 
                      rows={3}
                      className="field-textarea"
                      value={heroConfig.subheadline}
                      onChange={(e) => setHeroConfig({ ...heroConfig, subheadline: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Trust Guarantee #1</label>
                    <input 
                      type="text" 
                      className="field-text"
                      value={heroConfig.trustPoint1}
                      onChange={(e) => setHeroConfig({ ...heroConfig, trustPoint1: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Trust Guarantee #2</label>
                    <input 
                      type="text" 
                      className="field-text"
                      value={heroConfig.trustPoint2}
                      onChange={(e) => setHeroConfig({ ...heroConfig, trustPoint2: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 7: FEATURED PRODUCTS & SPOTLIGHT                           */}
          {/* ================================================================ */}
          {activeModule === 'featured' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Spotlight & Ordering</h2>
                  <p className="pane-subtitle">Choose which software suite is showcased in the primary hero spotlight.</p>
                </div>
              </div>

              <div className="admin-card-panel">
                <h3 className="panel-heading mb-4">Select Flagship Suite</h3>
                <div className="flagship-selection-list">
                  {productsList.map(p => (
                    <div 
                      key={p.id} 
                      className={`flagship-option-item ${p.isFlagship ? 'item-active' : ''}`}
                      onClick={() => {
                        const updated = productsList.map(item => ({
                          ...item,
                          isFlagship: item.id === p.id
                        }));
                        setProductsList(updated);
                        productService.saveProduct({ ...p, isFlagship: true });
                        showToast(`Set "${p.name}" as the Flagship Spotlight Suite!`);
                      }}
                    >
                      <img 
                        src={p.coverImage || p.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'} 
                        alt={p.name} 
                        className="flagship-mini-img"
                      />
                      <div className="flagship-meta">
                        <strong>{p.name}</strong>
                        <span className="text-muted text-xs">{p.category}</span>
                      </div>
                      {p.isFlagship ? (
                        <span className="badge badge-gold">Active Flagship</span>
                      ) : (
                        <span className="btn btn-secondary btn-sm">Set as Flagship</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 8: PRICING & LICENSING RULES                               */}
          {/* ================================================================ */}
          {activeModule === 'pricing' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Pricing & Licensing Policy</h2>
                  <p className="pane-subtitle">Manage standard commercial terms, default pricing notes, and currencies.</p>
                </div>
              </div>

              <div className="admin-card-panel">
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label className="field-label">Default Commercial Mode</label>
                    <input type="text" className="field-text" value="Contact for Pricing / Custom Quote" disabled />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Default Currency</label>
                    <input type="text" className="field-text" value="INR (₹) / USD ($)" disabled />
                  </div>
                  <div className="field-group full-span">
                    <label className="field-label">Standard License Terms Description</label>
                    <textarea 
                      rows={3} 
                      className="field-textarea"
                      defaultValue="Perpetual single-domain license. Installed on client-owned servers with full data privacy and zero recurring monthly fees."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 9: FAQS MANAGEMENT                                         */}
          {/* ================================================================ */}
          {activeModule === 'faqs' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Frequently Asked Questions</h2>
                  <p className="pane-subtitle">Manage customer-facing answers regarding licensing, demos, and customization.</p>
                </div>
              </div>

              <div className="admin-card-panel">
                <div className="faq-admin-list">
                  <div className="faq-admin-item">
                    <strong>Can I host the software on my own servers?</strong>
                    <p className="text-muted text-sm mt-1">Yes, all Kiaan Marketplace software products are engineered for 100% self-hosted deployment on your Linux, Docker, or Cloud infrastructure.</p>
                  </div>
                  <div className="faq-admin-item mt-3">
                    <strong>Are live demos real software environments?</strong>
                    <p className="text-muted text-sm mt-1">Yes, all live demos open actual hosted test environments so you can evaluate the true user experience before purchasing.</p>
                  </div>
                  <div className="faq-admin-item mt-3">
                    <strong>Can Kiaan customize features for our business?</strong>
                    <p className="text-muted text-sm mt-1">Yes, our software architects provide direct bespoke engineering services to adapt workflows and APIs to your requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 10: CUSTOM DEVELOPMENT SERVICES                           */}
          {/* ================================================================ */}
          {activeModule === 'services' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Custom Development Offerings</h2>
                  <p className="pane-subtitle">Manage custom engineering services displayed on the storefront.</p>
                </div>
              </div>

              <div className="admin-grid-cards">
                <div className="category-admin-card">
                  <strong className="cat-admin-name">Custom Module Development</strong>
                  <p className="cat-admin-desc">Bespoke functional adaptations and custom database workflows.</p>
                </div>
                <div className="category-admin-card">
                  <strong className="cat-admin-name">Legacy Database Migration</strong>
                  <p className="cat-admin-desc">Secure extraction and migration from legacy ERPs to modern MySQL.</p>
                </div>
                <div className="category-admin-card">
                  <strong className="cat-admin-name">Third-Party API Integration</strong>
                  <p className="cat-admin-desc">Connecting payment gateways, biometric devices, and courier APIs.</p>
                </div>
                <div className="category-admin-card">
                  <strong className="cat-admin-name">Dedicated Server Deployment</strong>
                  <p className="cat-admin-desc">Turnkey server installation, SSL setup, and automated backup routines.</p>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 11: CUSTOMER INQUIRIES LOG                                 */}
          {/* ================================================================ */}
          {activeModule === 'inquiries' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Customer Inquiries & Quote Requests</h2>
                  <p className="pane-subtitle">Client customization requests submitted through the storefront.</p>
                </div>
              </div>

              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Company</th>
                      <th>Service / Product</th>
                      <th>Contact Info</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiriesList.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-muted">
                          No inquiries received yet. Submit an inquiry through the "Request Custom Quote" modal to test this view.
                        </td>
                      </tr>
                    ) : (
                      inquiriesList.map(inq => (
                        <tr key={inq.id}>
                          <td><strong>{inq.name}</strong></td>
                          <td>{inq.company || '—'}</td>
                          <td><span className="badge badge-gold">{inq.service}</span></td>
                          <td>
                            <div className="contact-col">
                              <span><Mail size={12} className="inline mr-1 text-muted" />{inq.email}</span>
                              {inq.phone && <span><Phone size={12} className="inline mr-1 text-muted" />{inq.phone}</span>}
                            </div>
                          </td>
                          <td>
                            <select 
                              value={inq.status || 'New'}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                              className="inquiry-status-select"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="text-right">
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => setSelectedInquiry(inq)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE 12: SITE SETTINGS                                          */}
          {/* ================================================================ */}
          {activeModule === 'settings' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Marketplace Settings</h2>
                  <p className="pane-subtitle">Platform configuration and data management.</p>
                </div>
              </div>

              <div className="admin-card-panel">
                <h3 className="panel-heading mb-4">Platform Identity</h3>
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label className="field-label">Marketplace Name</label>
                    <input type="text" className="field-text" defaultValue="Kiaan Marketplace" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Operating Company</label>
                    <input type="text" className="field-text" defaultValue="Kiaan Technology Pvt Ltd" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Support Email</label>
                    <input type="email" className="field-text" defaultValue="contact@kiaantechnology.com" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Sales Hotline</label>
                    <input type="tel" className="field-text" defaultValue="+91 (0) 80-KIENTECH" />
                  </div>
                </div>

                <div className="danger-zone-card mt-8">
                  <h4 className="danger-zone-title">Factory Reset Data</h4>
                  <p className="danger-zone-desc">
                    Reset all products, categories, and settings back to default factory specifications. All local modifications will be replaced with initial catalog records.
                  </p>
                  <button className="btn btn-secondary btn-sm" onClick={handleResetCatalog}>
                    <RotateCcw size={14} />
                    <span>Reset to Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div>
                <span className="badge badge-gold">INQUIRY DETAILS</span>
                <h3 className="inquiry-client-title">{selectedInquiry.name}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedInquiry(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="inq-detail-row">
                <span className="inq-lbl">Company:</span>
                <strong>{selectedInquiry.company || 'Not Specified'}</strong>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Email:</span>
                <span>{selectedInquiry.email}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Phone:</span>
                <span>{selectedInquiry.phone || 'Not Specified'}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Requested Scope:</span>
                <span>{selectedInquiry.service}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Scope Details:</span>
                <p className="inq-message-box">{selectedInquiry.details || 'No additional details provided.'}</p>
              </div>

              <div className="inq-status-bar">
                <span>Update Status:</span>
                <select 
                  value={selectedInquiry.status || 'New'}
                  onChange={(e) => handleInquiryStatusChange(selectedInquiry.id, e.target.value)}
                  className="filter-select"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button className="btn btn-primary btn-md" onClick={() => setSelectedInquiry(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
