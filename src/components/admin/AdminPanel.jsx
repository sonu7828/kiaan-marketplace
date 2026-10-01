import React, { useState } from 'react';
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
  RotateCcw, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Building2,
  MessageSquare,
  Sparkles,
  Settings,
  TrendingUp,
  Tag,
  X,
  CreditCard,
  Users,
  LifeBuoy,
  Info,
  Copy,
  Check,
  Key,
  Send,
  AlertTriangle,
  RefreshCw,
  Clock,
  EyeOff,
  XCircle,
  Activity,
  FileCheck
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
  // 7 Core Synced Modules: 'overview' | 'catalog' | 'form' | 'categories' | 'industry' | 'homepage' | 'inquiries' | 'licenses'
  const [activeModule, setActiveModule] = useState('overview');

  const [productsList, setProductsList] = useState(initialProducts || productService.getAllProducts());
  const [inquiriesList, setInquiriesList] = useState(() => productService.getInquiries());
  const [notification, setNotification] = useState(null);

  // Filters for Product Table
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Selected Inquiry for Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Category / Industry Editing State
  const [categoriesList, setCategoriesList] = useState(() => productService.getCategories());
  const [industriesList, setIndustriesList] = useState(() => productService.getIndustries());
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingIndustry, setEditingIndustry] = useState(null);

  // Licenses State
  const [licensesList, setLicensesList] = useState(() => productService.getLicenses());
  const [licenseSearch, setLicenseSearch] = useState('');
  const [licenseStatusFilter, setLicenseStatusFilter] = useState('all');
  const [revealedKeys, setRevealedKeys] = useState(new Set());
  const [selectedLicense, setSelectedLicense] = useState(null);

  // Product Form State
  const emptyForm = {
    id: '',
    name: '',
    slug: '',
    version: '1.0.0',
    releaseDate: new Date().toISOString().split('T')[0],
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
    techStack: 'Laravel 13, PHP 8.2+, MySQL 8.0+, Modern Responsive UI',
    techSpecs: {
      framework: 'Laravel 13',
      language: 'PHP 8.2, PHP 8.3',
      database: 'MySQL 8.0+',
      frontend: 'Modern Responsive UI',
      architecture: 'Laravel MVC Architecture',
      filesIncluded: '.php, .css, .html, .sql, .xml, JavaScript .js',
      softwareVersion: 'v1.0.0',
      lastUpdate: 'August 2026'
    },
    requirementsText: 'PHP 8.2 or higher\nLaravel 13\nMySQL Database\nApache or Nginx Web Server\nComposer\nRequired PHP Extensions\nURL Rewriting Support\nSSL/HTTPS Recommended\nWritable Laravel Storage Directories',
    installInstructionsText: 'Upload the application archive to your server.\nCreate a MySQL database and database user.\nConfigure application environment settings (.env).\nConfigure database connection.\nSet application URL.\nInstall Composer dependencies.\nGenerate Laravel application key.\nRun database migrations and seeders.\nLink storage directory.\nSet required folder permissions.\nPoint web server document root to public folder.\nOpen application and complete initial setup.',
    tagsText: 'job board, laravel, recruitment, saas, ats, applicant tracking, software',
    demoUrl: '',
    demoVideoUrl: '',
    docUrl: '',
    demoAccounts: [
      {
        role: 'Super Admin Console',
        url: '',
        email: 'admin@demo.com',
        password: 'password',
        note: 'Full command center access'
      },
      {
        role: 'Employer / Business Workspace',
        url: '',
        email: 'demo@employer.com',
        password: 'Demo@123',
        note: 'ATS Pipeline & Job Vacancies'
      },
      {
        role: 'Jobseeker / Candidate Portal',
        url: '',
        email: 'demo@student.com',
        password: 'Demo@123',
        note: 'Candidate Profile & Job Applications'
      }
    ],
    pricing: {
      isApproved: true,
      priceDisplay: '₹24,999',
      pricingNote: 'Regular Perpetual License. One-time fee, 100% self-hosted, includes complete source code.'
    },
    pricingTiers: {
      regular: '₹24,999',
      extended: '₹64,999',
      installationService: '₹2,999'
    },
    currency: 'INR',
    sourceCodeAvailable: false,
    seoTitle: '',
    seoDesc: '',
    customizationAvailable: true,
    status: 'published', // 'published' | 'draft' | 'archived'
    isFeatured: false,
    isFlagship: false
  };

  const [formData, setFormData] = useState(emptyForm);
  const [formTab, setFormTab] = useState('basic'); // 'basic' | 'capabilities' | 'media' | 'demo' | 'commercial' | 'setup' | 'seo'

  // Homepage Config State
  const [heroConfig, setHeroConfig] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('kiaan_marketplace_hero_config');
        if (stored) return JSON.parse(stored);
      }
    } catch {}
    return {
      pillText: 'Kiaan Technology • Enterprise Software Marketplace',
      headline: 'Production-Ready Business Software, Built to Deploy',
      subheadline: 'Discover battle-tested ERP, CRM, HRMS, and Inventory systems. Evaluate with live interactive demos, deploy on your own servers or cloud, and scale with full customization support.',
      trustPoint1: '100% Self-Hosted & Private',
      trustPoint2: 'Full Source Customization',
      trustPoint3: 'Verified Live Demos'
    };
  });

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshData = () => {
    const fresh = productService.getAllProducts();
    setProductsList(fresh);
    setInquiriesList(productService.getInquiries());
    setCategoriesList(productService.getCategories());
    setIndustriesList(productService.getIndustries());
    setLicensesList(productService.getLicenses());
  };

  // --- Handlers for Product Actions ---
  const handleAddNewProduct = () => {
    setFormData(emptyForm);
    setFormTab('basic');
    setActiveModule('form');
  };

  const handleEditProduct = (product) => {
    const reqText = Array.isArray(product.requirements) 
      ? product.requirements.join('\n') 
      : (product.requirements || '');
    
    const instText = Array.isArray(product.installInstructions) 
      ? product.installInstructions.join('\n') 
      : (product.installInstructions || '');
    
    const tText = Array.isArray(product.tags) 
      ? product.tags.join(', ') 
      : (product.tags || '');

    const regularPrice = product.pricingTiers?.regular || product.pricing?.priceDisplay || '₹24,999';

    setFormData({
      ...product,
      version: product.version || product.techSpecs?.softwareVersion || '1.0.0',
      releaseDate: product.releaseDate || new Date().toISOString().split('T')[0],
      currency: product.currency || (regularPrice.includes('$') ? 'USD' : 'INR'),
      sourceCodeAvailable: !!product.sourceCodeAvailable,
      seoTitle: product.seoTitle || '',
      seoDesc: product.seoDesc || '',
      features: product.features && product.features.length ? product.features : [''],
      modules: product.modules && product.modules.length ? product.modules : [''],
      screenshots: product.screenshots && product.screenshots.length ? product.screenshots : [{ url: '', caption: '' }],
      docUrl: product.docUrl || '',
      pricing: product.pricing || { isApproved: true, priceDisplay: regularPrice, pricingNote: '' },
      pricingTiers: {
        regular: regularPrice,
        extended: product.pricingTiers?.extended || '₹64,999',
        installationService: product.pricingTiers?.installationService || '₹2,999'
      },
      techSpecs: {
        framework: product.techSpecs?.framework || (product.techStack?.includes('Laravel') ? 'Laravel 13' : 'Node.js / Express'),
        language: product.techSpecs?.language || (product.techStack?.includes('PHP') ? 'PHP 8.2, PHP 8.3' : 'JavaScript / TypeScript'),
        database: product.techSpecs?.database || 'MySQL 8.0+',
        frontend: product.techSpecs?.frontend || 'Modern Responsive UI',
        architecture: product.techSpecs?.architecture || 'Laravel MVC Architecture',
        filesIncluded: product.techSpecs?.filesIncluded || '.php, .css, .html, .sql, JavaScript .js',
        softwareVersion: product.techSpecs?.softwareVersion || product.version || '1.0.0',
        lastUpdate: product.techSpecs?.lastUpdate || 'August 2026'
      },
      requirementsText: reqText,
      installInstructionsText: instText,
      tagsText: tText,
      demoAccounts: product.demoAccounts && product.demoAccounts.length ? product.demoAccounts : [
        { role: 'Super Admin Console', url: product.demoUrl || '', email: 'admin@demo.com', password: 'password', note: 'Command Center' }
      ]
    });
    setFormTab('basic');
    setActiveModule('form');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from the catalog? To hide without deleting, use Archive instead.`)) {
      if (onDeleteProduct) {
        onDeleteProduct(id);
      } else {
        productService.deleteProduct(id);
      }
      refreshData();
      showToast(`Removed "${name}" from catalog.`);
    }
  };

  const handleArchive = (id, name) => {
    const target = productsList.find(p => p.id === id);
    if (!target) return;
    const isCurrentlyArchived = target.status === 'archived';
    const newStatus = isCurrentlyArchived ? 'draft' : 'archived';
    const updated = { ...target, status: newStatus };
    if (onSaveProduct) {
      onSaveProduct(updated);
    } else {
      productService.saveProduct(updated);
    }
    refreshData();
    showToast(isCurrentlyArchived ? `"${name}" restored to Drafts.` : `"${name}" moved to Archives.`);
  };

  const handlePreview = (product) => {
    if (onPreviewProduct) {
      onPreviewProduct(product);
    } else {
      window.location.hash = `#product/${product.slug || product.id}`;
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
      showToast('Please enter a software name.', 'error');
      return;
    }

    const finalStatus = targetStatus || formData.status || 'published';

    const requirementsArr = (formData.requirementsText || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const installInstructionsArr = (formData.installInstructionsText || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const tagsArr = (formData.tagsText || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const cleanedDemoAccounts = (formData.demoAccounts || []).filter(
      acc => (acc.role && acc.role.trim()) || (acc.email && acc.email.trim())
    );

    const regularPrice = formData.pricingTiers?.regular || formData.pricing?.priceDisplay || '₹24,999';

    const cleaned = {
      ...formData,
      status: finalStatus,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      version: formData.version || formData.techSpecs?.softwareVersion || '1.0.0',
      releaseDate: formData.releaseDate || new Date().toISOString().split('T')[0],
      currency: formData.currency || (regularPrice.includes('$') ? 'USD' : 'INR'),
      sourceCodeAvailable: !!formData.sourceCodeAvailable,
      seoTitle: formData.seoTitle ? formData.seoTitle.trim() : `${formData.name} — Kiaan Software`,
      seoDesc: formData.seoDesc ? formData.seoDesc.trim() : formData.shortDesc,
      features: (formData.features || []).filter(f => f && f.trim()),
      modules: (formData.modules || []).filter(m => m && m.trim()),
      screenshots: (formData.screenshots || []).filter(s => s && s.url && s.url.trim()),
      coverImage: formData.coverImage || formData.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      pricing: {
        isApproved: true,
        priceDisplay: regularPrice,
        pricingNote: formData.pricing?.pricingNote || ''
      },
      pricingTiers: {
        regular: regularPrice,
        extended: formData.pricingTiers?.extended || '₹64,999',
        installationService: formData.pricingTiers?.installationService || '₹2,999'
      },
      techSpecs: formData.techSpecs || {},
      requirements: requirementsArr,
      installInstructions: installInstructionsArr,
      tags: tagsArr,
      demoAccounts: cleanedDemoAccounts
    };

    if (onSaveProduct) {
      onSaveProduct(cleaned);
    } else {
      productService.saveProduct(cleaned);
    }
    refreshData();
    showToast(`Saved "${cleaned.name}" (${finalStatus === 'published' ? 'Published' : finalStatus === 'draft' ? 'Draft' : 'Archived'}).`);
    setActiveModule('catalog');
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog products back to standard factory defaults? All custom changes will be replaced.')) {
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
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Inquiry marked as ${newStatus}`);
  };

  const handleDeleteInquiry = (inqId) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      productService.deleteInquiry(inqId);
      refreshData();
      setSelectedInquiry(null);
      showToast('Inquiry record deleted.');
    }
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!editingCategory) return;
    productService.saveCategory(editingCategory);
    setCategoriesList(productService.getCategories());
    setEditingCategory(null);
    showToast(`Updated Category: ${editingCategory.name}`);
  };

  const handleSaveIndustry = (e) => {
    e.preventDefault();
    if (!editingIndustry) return;
    productService.saveIndustry(editingIndustry);
    setIndustriesList(productService.getIndustries());
    setEditingIndustry(null);
    showToast(`Updated Industry Solution: ${editingIndustry.name}`);
  };

  const handleSaveHeroConfig = () => {
    productService.saveHeroConfig(heroConfig);
    showToast('Homepage hero content updated successfully.');
  };

  // License Handlers
  const handleToggleKeyReveal = (licId) => {
    setRevealedKeys(prev => {
      const next = new Set(prev);
      if (next.has(licId)) {
        next.delete(licId);
      } else {
        next.add(licId);
      }
      return next;
    });
  };

  const handleCopyKey = (keyText) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(keyText);
      showToast('License key copied to clipboard.');
    }
  };

  const handleToggleLicenseStatus = (licenseId) => {
    const target = licensesList.find(l => l.id === licenseId);
    if (!target) return;
    const nextStat = target.status === 'Active' ? 'Inactive' : 'Active';
    const updated = { ...target, status: nextStat };
    productService.saveLicense(updated);
    setLicensesList(productService.getLicenses());
    if (selectedLicense && selectedLicense.id === licenseId) {
      setSelectedLicense(updated);
    }
    showToast(`License status set to ${nextStat}.`);
  };

  const handleRevokeLicense = (licenseId) => {
    if (!window.confirm('Are you sure you want to revoke this software license?')) return;
    const target = licensesList.find(l => l.id === licenseId);
    if (!target) return;
    const updated = { ...target, status: 'Revoked' };
    productService.saveLicense(updated);
    setLicensesList(productService.getLicenses());
    if (selectedLicense && selectedLicense.id === licenseId) {
      setSelectedLicense(updated);
    }
    showToast('Software license revoked.');
  };

  // Filtered Licenses
  const filteredLicenses = licensesList.filter(lic => {
    const matchSearch = !licenseSearch.trim() ||
      lic.id.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.key.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.productName.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.customerName.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.domain.toLowerCase().includes(licenseSearch.toLowerCase());
    const matchStatus = licenseStatusFilter === 'all' || lic.status === licenseStatusFilter;
    return matchSearch && matchStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiriesList.filter(inq => {
    const matchSearch = !inquirySearch.trim() ||
      (inq.name || '').toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.company || '').toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.service || '').toLowerCase().includes(inquirySearch.toLowerCase());
    const matchStatus = inquiryStatusFilter === 'all' || (inq.status || 'New') === inquiryStatusFilter;
    return matchSearch && matchStatus;
  });



  // Filtered Products for Catalog Table
  const displayedProducts = productsList.filter(p => {
    const matchCat = filterCategory === 'all' || p.categoryId === filterCategory;
    const matchStat = filterStatus === 'all' || 
      (filterStatus === 'published' && p.status === 'published') ||
      (filterStatus === 'draft' && p.status === 'draft') ||
      (filterStatus === 'archived' && p.status === 'archived');
    const matchQ = !searchFilter.trim() || 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchCat && matchStat && matchQ;
  });

  // Metrics
  const totalCount = productsList.length;
  const publishedCount = productsList.filter(p => (p.status || 'published') === 'published').length;
  const draftCount = productsList.filter(p => p.status === 'draft').length;
  const archivedCount = productsList.filter(p => p.status === 'archived').length;
  const demoActiveCount = productsList.filter(p => p.demoUrl && p.demoUrl.startsWith('http')).length;
  const newInquiriesCount = inquiriesList.filter(i => (i.status || 'New') === 'New').length;
  const activeLicensesCount = licensesList.filter(l => l.status === 'Active').length;

  // Recent Activity Feed
  const recentActivity = [
    {
      id: 'act-license-1',
      icon: <Key size={14} className="text-gold" />,
      title: 'License issued to Sharma Logistics',
      meta: 'KiaanERP Enterprise • Perpetual Signature',
      time: 'Today, 11:20 AM'
    },
    ...inquiriesList.slice(0, 2).map(inq => ({
      id: `act-inq-${inq.id}`,
      icon: <MessageSquare size={14} className="text-primary" />,
      title: `Lead request from ${inq.name}`,
      meta: `${inq.service || 'Custom Solution'} • ${inq.company || 'Enterprise Lead'}`,
      time: inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'
    })),
    ...productsList.filter(p => (p.status || 'published') === 'published').slice(0, 2).map(prod => ({
      id: `act-prod-${prod.id}`,
      icon: <Package size={14} className="text-success" />,
      title: `Software live: ${prod.name}`,
      meta: `Version ${prod.version || '1.0.0'} • ${prod.category}`,
      time: prod.releaseDate || 'Catalog release'
    }))
  ];

  return (
    <div className="admin-app-layout">
      
      {/* Top Header */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-brand-cluster">
            <button className="admin-storefront-btn" onClick={onBackToMarketplace} title="Return to public marketplace storefront">
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
            <div className="topbar-environment-pill">
              <span className="status-indicator" />
              <span>Production Console</span>
            </div>

            {activeModule === 'form' ? (
              <div className="form-head-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('catalog')}>
                  Cancel
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleSaveForm('draft')}>
                  Save Draft
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => handleSaveForm('published')}>
                  <Save size={14} />
                  <span>{formData.status === 'published' ? 'Update Software' : 'Publish Software'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button className="btn btn-secondary btn-sm" onClick={onBackToMarketplace}>
                  <ExternalLink size={14} />
                  <span>View Public Store</span>
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                  <Plus size={15} />
                  <span>Add Software</span>
                </button>
              </div>
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
          <div className="sidebar-scrollable-links">
            <button 
              className={`admin-nav-item ${activeModule === 'overview' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('overview')}
            >
              <span className="nav-icon-wrap"><TrendingUp size={14} /></span>
              <span className="nav-label-text">Dashboard</span>
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'catalog' || activeModule === 'form' ? 'nav-active' : ''}`}
              onClick={() => { setActiveModule('catalog'); setFilterStatus('all'); }}
            >
              <span className="nav-icon-wrap"><Package size={14} /></span>
              <span className="nav-label-text">All Software</span>
              <span className="nav-count-badge">{totalCount}</span>
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'categories' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('categories')}
            >
              <span className="nav-icon-wrap"><Layers size={14} /></span>
              <span className="nav-label-text">Categories</span>
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'industry' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('industry')}
            >
              <span className="nav-icon-wrap"><Building2 size={14} /></span>
              <span className="nav-label-text">Industry Solutions</span>
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'homepage' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('homepage')}
            >
              <span className="nav-icon-wrap"><Sparkles size={14} /></span>
              <span className="nav-label-text">Homepage Content</span>
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'inquiries' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('inquiries')}
            >
              <span className="nav-icon-wrap"><MessageSquare size={14} /></span>
              <span className="nav-label-text">Lead Inquiries</span>
              {newInquiriesCount > 0 ? (
                <span className="nav-count-badge alert-count">{newInquiriesCount} new</span>
              ) : (
                <span className="nav-count-badge">{inquiriesList.length}</span>
              )}
            </button>

            <button 
              className={`admin-nav-item ${activeModule === 'licenses' ? 'nav-active' : ''}`}
              onClick={() => setActiveModule('licenses')}
            >
              <span className="nav-icon-wrap"><ShieldCheck size={14} /></span>
              <span className="nav-label-text">Active Licenses</span>
              <span className="nav-count-badge">{licensesList.length}</span>
            </button>
          </div>
        </aside>

        {/* RIGHT WORKSPACE AREA */}
        <main className="admin-content-pane">
          
          {/* ================================================================ */}
          {/* MODULE: DASHBOARD                                                */}
          {/* ================================================================ */}
          {activeModule === 'overview' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Dashboard</h2>
                  <p className="pane-subtitle">Manage your software catalog, customer requests, and marketplace activity.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('homepage')}>
                    <Sparkles size={14} />
                    <span>Manage Homepage</span>
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('inquiries')}>
                    <MessageSquare size={14} />
                    <span>View Inquiries</span>
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={handleResetCatalog} title="Restore all software and data to original factory defaults">
                    <RotateCcw size={14} />
                    <span>Factory Reset</span>
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                    <Plus size={14} />
                    <span>Add Software</span>
                  </button>
                </div>
              </div>

              {/* 6 Business Metrics - Connected & Interactive */}
              <div className="dashboard-metrics-grid">
                <div className="kpi-metric-card kpi-indigo" onClick={() => { setActiveModule('catalog'); setFilterStatus('all'); }}>
                  <div className="kpi-icon-pill"><Package size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Software</span>
                    <strong className="kpi-num">{totalCount}</strong>
                    <span className="kpi-sub">All catalog assets →</span>
                  </div>
                </div>

                <div className="kpi-metric-card kpi-emerald" onClick={() => { setActiveModule('catalog'); setFilterStatus('published'); }}>
                  <div className="kpi-icon-pill"><FileCheck size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Published</span>
                    <strong className="kpi-num">{publishedCount}</strong>
                    <span className="kpi-sub">Active on storefront →</span>
                  </div>
                </div>

                <div className="kpi-metric-card kpi-amber" onClick={() => { setActiveModule('catalog'); setFilterStatus('draft'); }}>
                  <div className="kpi-icon-pill"><Edit3 size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Drafts</span>
                    <strong className="kpi-num">{draftCount}</strong>
                    <span className="kpi-sub">Unpublished work →</span>
                  </div>
                </div>

                <div className="kpi-metric-card kpi-slate" onClick={() => { setActiveModule('catalog'); setFilterStatus('archived'); }}>
                  <div className="kpi-icon-pill"><Tag size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Archived</span>
                    <strong className="kpi-num">{archivedCount}</strong>
                    <span className="kpi-sub">Preserved records →</span>
                  </div>
                </div>

                <div className="kpi-metric-card kpi-cyan" onClick={() => { setActiveModule('catalog'); setFilterStatus('all'); }}>
                  <div className="kpi-icon-pill"><Globe size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Live Demos</span>
                    <strong className="kpi-num">{demoActiveCount}</strong>
                    <span className="kpi-sub">Active test sandboxes →</span>
                  </div>
                </div>

                <div className="kpi-metric-card kpi-rose" onClick={() => { setActiveModule('inquiries'); setInquiryStatusFilter('all'); }}>
                  <div className="kpi-icon-pill"><MessageSquare size={20} /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Lead Inquiries</span>
                    <strong className="kpi-num">{inquiriesList.length}</strong>
                    <span className="kpi-sub">{newInquiriesCount} new awaiting →</span>
                  </div>
                </div>
              </div>

              {/* 2-Column Split: Recent Inquiries + Recent Activity */}
              <div className="dashboard-split-grid">
                
                {/* Recent Inquiries Card */}
                <div className="admin-card-panel">
                  <div className="panel-header-split">
                    <h3 className="panel-heading">Recent Inquiries</h3>
                    <button className="btn-link" onClick={() => setActiveModule('inquiries')}>
                      View All Inquiries →
                    </button>
                  </div>

                  {inquiriesList.length === 0 ? (
                    <div className="admin-empty-state">
                      <div className="admin-empty-icon"><MessageSquare size={24} /></div>
                      <h4 className="admin-empty-title">No inquiries yet</h4>
                      <p className="admin-empty-desc">
                        Customer requests submitted through the storefront will appear here.
                      </p>
                      <button className="btn btn-secondary btn-sm" onClick={onBackToMarketplace}>
                        Preview Storefront
                      </button>
                    </div>
                  ) : (
                    <div className="admin-table-card mt-3">
                      <table className="admin-data-table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Software / Scope</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiriesList.slice(0, 5).map(inq => (
                            <tr key={inq.id}>
                              <td>
                                <strong className="cell-title">{inq.name}</strong>
                                {inq.company && <span className="cell-slug">{inq.company}</span>}
                              </td>
                              <td>
                                <span className="badge badge-subtle">{inq.service || 'Custom Solution'}</span>
                              </td>
                              <td>
                                <span className="text-xs text-muted">
                                  {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                                </span>
                              </td>
                              <td>
                                <span className={`status-pill pill-${(inq.status || 'New').toLowerCase().replace(/\s+/g, '-')}`}>
                                  {inq.status || 'New'}
                                </span>
                              </td>
                              <td className="text-right">
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => setSelectedInquiry(inq)}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Recent Activity Card */}
                <div className="admin-card-panel">
                  <h3 className="panel-heading">Recent Activity</h3>
                  {recentActivity.length === 0 ? (
                    <div className="admin-empty-state py-8">
                      <div className="admin-empty-icon"><Activity size={20} /></div>
                      <h4 className="admin-empty-title">No activity recorded</h4>
                      <p className="admin-empty-desc">
                        Storefront customer interactions and software updates will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="admin-activity-list">
                      {recentActivity.map(act => (
                        <div key={act.id} className="admin-activity-item">
                          <div className="activity-bullet">{act.icon}</div>
                          <div className="activity-content">
                            <strong className="activity-text">{act.title}</strong>
                            <span className="activity-time">{act.meta} • {act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE: SOFTWARE CATALOG                                         */}
          {/* ================================================================ */}
          {activeModule === 'catalog' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Software Catalog</h2>
                  <p className="pane-subtitle">Manage your software offerings, release versions, live demos, and publication lifecycle.</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                  <Plus size={15} />
                  <span>Add Software</span>
                </button>
              </div>

              {/* Table Filters Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search software catalog by name, category, or description..."
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
                  <option value="all">All Statuses ({totalCount})</option>
                  <option value="published">Published ({publishedCount})</option>
                  <option value="draft">Drafts ({draftCount})</option>
                  <option value="archived">Archived ({archivedCount})</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Software</th>
                      <th>Category & Industry</th>
                      <th>Pricing Model</th>
                      <th>Live Demo</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6">
                          <div className="admin-empty-state">
                            <div className="admin-empty-icon"><Package size={24} /></div>
                            <h4 className="admin-empty-title">No software matches your criteria</h4>
                            <p className="admin-empty-desc">
                              Try clearing filters or search keywords, or create a new software entry.
                            </p>
                            <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                              <Plus size={14} />
                              <span>Add Software</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      displayedProducts.map(product => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-table-cell">
                              <img 
                                src={product.coverImage || product.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'} 
                                alt={product.name} 
                                className="table-thumb"
                              />
                              <div>
                                <strong className="cell-title">{product.name}</strong>
                                <span className="cell-slug">v{product.version || '1.0.0'} • /{product.slug}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div>
                              <span className="badge badge-subtle">{product.category}</span>
                              {product.industry && (
                                <div className="text-xs text-muted mt-1">{product.industry}</div>
                              )}
                            </div>
                          </td>

                          <td>
                            <span className="text-sm font-medium">
                              {product.pricing?.priceDisplay || 'Contact for Pricing'}
                            </span>
                          </td>

                          <td>
                            {product.demoUrl && product.demoUrl.startsWith('http') ? (
                              <a 
                                href={product.demoUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="demo-link-cell"
                                title="Open Live Test Sandbox"
                              >
                                <ExternalLink size={13} />
                                <span>Active Demo</span>
                              </a>
                            ) : (
                              <span className="demo-pending-cell">No Sandbox</span>
                            )}
                          </td>

                          <td>
                            <span className={`admin-status-badge admin-status-${product.status || 'published'}`}>
                              {product.status === 'published' ? 'Published' : product.status === 'draft' ? 'Draft' : 'Archived'}
                            </span>
                          </td>

                          <td className="text-right">
                            <div className="table-actions-cluster">
                              <button 
                                className="btn btn-secondary btn-xs"
                                onClick={() => handleEditProduct(product)}
                                title="Edit Software Specifications"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>

                              <button 
                                className="btn btn-secondary btn-xs"
                                onClick={() => handlePreview(product)}
                                title="Preview on Public Storefront"
                              >
                                <Eye size={13} />
                                <span>Preview</span>
                              </button>

                              {product.status === 'draft' ? (
                                <button 
                                  className="btn btn-primary btn-xs"
                                  onClick={() => handleToggle(product.id)}
                                  title="Publish software to live marketplace"
                                >
                                  Publish Software
                                </button>
                              ) : product.status === 'published' ? (
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => handleToggle(product.id)}
                                  title="Unpublish software and move to drafts"
                                >
                                  Unpublish
                                </button>
                              ) : null}

                              {product.status === 'archived' ? (
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => handleArchive(product.id, product.name)}
                                  title="Restore archived software to drafts"
                                >
                                  Restore Software
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => handleArchive(product.id, product.name)}
                                  title="Move to archives without deleting"
                                >
                                  Archive Software
                                </button>
                              )}

                              <button 
                                className="icon-action-btn delete-btn"
                                onClick={() => handleDelete(product.id, product.name)}
                                title="Permanently delete from database"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
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
          {/* MODULE: ADD / EDIT SOFTWARE FORM                                 */}
          {/* ================================================================ */}
          {activeModule === 'form' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">
                    {formData.id ? `Edit Software — ${formData.name}` : 'Add New Software'}
                  </h2>
                  <p className="pane-subtitle">
                    Configure enterprise software specifications, media assets, and commercial availability.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('catalog')}>
                    Cancel
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleSaveForm('draft')}>
                    Save Draft
                  </button>
                  {formData.id && (
                    <button className="btn btn-secondary btn-sm" onClick={() => handlePreview(formData)}>
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm" onClick={() => handleSaveForm('published')}>
                    <Save size={14} />
                    <span>{formData.status === 'published' ? 'Update Software' : 'Publish Software'}</span>
                  </button>
                </div>
              </div>

              {/* Form Tabs */}
              <div className="form-tabs-bar">
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'basic' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('basic')}
                >
                  1. Basic & Tags
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'capabilities' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('capabilities')}
                >
                  2. Tech Specs & Modules
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'media' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('media')}
                >
                  3. Media & Screenshots
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'demo' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('demo')}
                >
                  4. Live Demo & Logins
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'commercial' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('commercial')}
                >
                  5. Commercial & Pricing
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'setup' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('setup')}
                >
                  6. Requirements & Setup
                </button>
                <button 
                  type="button"
                  className={`form-tab-btn ${formTab === 'seo' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('seo')}
                >
                  7. SEO & Meta
                </button>
              </div>

              <div className="form-card-panel">
                
                {/* TAB 1: BASIC DETAILS & TAGS */}
                {formTab === 'basic' && (
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label className="field-label">Software Name *</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. RecruitFlow Pro – Complete Recruitment SaaS Platform"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">URL Slug</label>
                      <input 
                        type="text" 
                        className="field-text font-mono" 
                        placeholder="recruitflow-pro-saas"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                      <span className="field-hint">Leave blank to automatically generate from name.</span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Software Version</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="v2.4.0"
                        value={formData.version}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          version: e.target.value,
                          techSpecs: { ...(formData.techSpecs || {}), softwareVersion: e.target.value }
                        })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Release Date</label>
                      <input 
                        type="date" 
                        className="field-text" 
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Product Category *</label>
                      <select 
                        className="field-select"
                        value={formData.categoryId}
                        onChange={(e) => {
                          const cat = DEFAULT_CATEGORIES.find(c => c.id === e.target.value);
                          setFormData({ 
                            ...formData, 
                            categoryId: e.target.value,
                            category: cat ? cat.name : formData.category
                          });
                        }}
                      >
                        {DEFAULT_CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Primary Industry Target</label>
                      <select 
                        className="field-select"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      >
                        {DEFAULT_INDUSTRIES.map(ind => (
                          <option key={ind.id} value={ind.name}>{ind.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Marketplace Tags & Search Keywords</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="job board, laravel, recruitment, saas, ats, applicant tracking, candidate management"
                        value={formData.tagsText || ''}
                        onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                      />
                      <span className="field-hint">Comma-separated tags shown as search filter badges on the product detail page.</span>
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Short Summary (Catalog Teaser) *</label>
                      <textarea 
                        rows={2}
                        className="field-textarea" 
                        placeholder="Concise 1-2 sentence description explaining the core software capability."
                        value={formData.shortDesc}
                        onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Full Comprehensive Description</label>
                      <textarea 
                        rows={6}
                        className="field-textarea" 
                        placeholder="Detailed overview covering ecosystem, operational benefits, architecture, and value proposition."
                        value={formData.fullDesc}
                        onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      />
                    </div>

                    <div className="field-group flex items-center gap-4">
                      <label className="toggle-switch-lbl">
                        <input 
                          type="checkbox" 
                          checked={!!formData.isFeatured}
                          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        />
                        <span>Featured on Homepage</span>
                      </label>
                      <label className="toggle-switch-lbl">
                        <input 
                          type="checkbox" 
                          checked={!!formData.isFlagship}
                          onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                        />
                        <span>Flagship Enterprise Suite</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 2: TECH SPECS & CAPABILITIES */}
                {formTab === 'capabilities' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Target Audience & Who Should Use</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. Recruitment agencies, staffing companies, HR consultancies, and tech startups"
                        value={formData.whoShouldUse}
                        onChange={(e) => setFormData({ ...formData, whoShouldUse: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Technology Stack Summary</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. Laravel 13, PHP 8.2+, MySQL 8.0+, Tailwind/Vanilla CSS, Blade Templates, Docker Ready"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <h4 className="text-sm font-bold text-primary mb-3">Structured Technical Specifications</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="field-label text-xs">Framework / Core Engine</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder="Laravel 13"
                            value={formData.techSpecs?.framework || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), framework: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="field-label text-xs">Programming Language</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder="PHP 8.2, PHP 8.3"
                            value={formData.techSpecs?.language || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), language: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="field-label text-xs">Database Engine</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder="MySQL 8.0+ / MariaDB"
                            value={formData.techSpecs?.database || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), database: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="field-label text-xs">Frontend Interface</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder="Modern Responsive UI (Blade, CSS, Vanilla JS)"
                            value={formData.techSpecs?.frontend || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), frontend: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="field-label text-xs">Architecture Pattern</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder="Laravel MVC Architecture & Repository Pattern"
                            value={formData.techSpecs?.architecture || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), architecture: e.target.value } 
                            })}
                          />
                        </div>
                        <div>
                          <label className="field-label text-xs">Files Included</label>
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder=".php, .css, .html, .sql, .xml, JavaScript .js, Dockerfile"
                            value={formData.techSpecs?.filesIncluded || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              techSpecs: { ...(formData.techSpecs || {}), filesIncluded: e.target.value } 
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field-group full-span">
                      <div className="flex justify-between items-center mb-2">
                        <label className="field-label mb-0">Core Functional Features</label>
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setFormData({ ...formData, features: [...(formData.features || []), ''] })}
                        >
                          <Plus size={12} /> Add Feature
                        </button>
                      </div>
                      {(formData.features || []).map((feat, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder={`Feature item #${idx + 1}`}
                            value={feat}
                            onChange={(e) => {
                              const updated = [...formData.features];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, features: updated });
                            }}
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const updated = formData.features.filter((_, i) => i !== idx);
                              setFormData({ ...formData, features: updated });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="field-group full-span">
                      <div className="flex justify-between items-center mb-2">
                        <label className="field-label mb-0">Included Architectural Modules</label>
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setFormData({ ...formData, modules: [...(formData.modules || []), ''] })}
                        >
                          <Plus size={12} /> Add Module
                        </button>
                      </div>
                      {(formData.modules || []).map((mod, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            className="field-text" 
                            placeholder={`Module #${idx + 1} (e.g. ATS Candidate Pipeline & Interview Scheduler)`}
                            value={mod}
                            onChange={(e) => {
                              const updated = [...formData.modules];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, modules: updated });
                            }}
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const updated = formData.modules.filter((_, i) => i !== idx);
                              setFormData({ ...formData, modules: updated });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: MEDIA & SCREENSHOTS */}
                {formTab === 'media' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Primary Cover / Hero Image URL</label>
                      <input 
                        type="url" 
                        className="field-text" 
                        placeholder="https://images.unsplash.com/..."
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      />
                      {formData.coverImage && (
                        <div className="mt-3 cover-preview-wrap">
                          <img src={formData.coverImage} alt="Cover Preview" className="cover-img-preview" />
                        </div>
                      )}
                    </div>

                    <div className="field-group full-span">
                      <div className="flex justify-between items-center mb-2">
                        <label className="field-label mb-0">Product UI Screenshots & Captions</label>
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setFormData({ 
                            ...formData, 
                            screenshots: [...(formData.screenshots || []), { url: '', caption: '' }] 
                          })}
                        >
                          <Plus size={12} /> Add Screenshot
                        </button>
                      </div>

                      {(formData.screenshots || []).map((scr, idx) => (
                        <div key={idx} className="screenshot-entry-row mb-3 flex items-center gap-3 p-3 bg-surface-subtle border border-default rounded-md">
                          {scr.url ? (
                            <img src={scr.url} alt="" className="w-16 h-12 object-cover rounded border border-default" onError={(e) => e.target.style.display = 'none'} />
                          ) : (
                            <div className="w-16 h-12 rounded bg-surface border border-default flex items-center justify-center text-xs text-muted">No Img</div>
                          )}
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <input 
                              type="url" 
                              className="field-text" 
                              placeholder="Image URL (https://...)"
                              value={scr.url}
                              onChange={(e) => {
                                const updated = [...formData.screenshots];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setFormData({ ...formData, screenshots: updated });
                              }}
                            />
                            <input 
                              type="text" 
                              className="field-text" 
                              placeholder="Feature Caption (e.g. ATS Candidate Pipeline)"
                              value={scr.caption}
                              onChange={(e) => {
                                const updated = [...formData.screenshots];
                                updated[idx] = { ...updated[idx], caption: e.target.value };
                                setFormData({ ...formData, screenshots: updated });
                              }}
                            />
                          </div>
                          <button 
                            type="button" 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              const updated = formData.screenshots.filter((_, i) => i !== idx);
                              setFormData({ ...formData, screenshots: updated });
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: LIVE INTERACTIVE DEMO & ACCOUNTS */}
                {formTab === 'demo' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Interactive Live Demo Sandbox URL</label>
                      <input 
                        type="url" 
                        className="field-text font-mono" 
                        placeholder="https://recruitflowpro.onlinefreegamezone.online/"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      />
                      <span className="field-hint">Points to a live hosted demo application where buyers can test the system in real time.</span>
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Demo Video Walkthrough Embed URL (YouTube/Vimeo)</label>
                      <input 
                        type="url" 
                        className="field-text" 
                        placeholder="https://www.youtube.com/embed/..."
                        value={formData.demoVideoUrl || ''}
                        onChange={(e) => setFormData({ ...formData, demoVideoUrl: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Technical Documentation URL</label>
                      <input 
                        type="url" 
                        className="field-text font-mono" 
                        placeholder="https://docs.kiaantechnology.com/..."
                        value={formData.docUrl || ''}
                        onChange={(e) => setFormData({ ...formData, docUrl: e.target.value })}
                      />
                      <span className="field-hint">Documentation link opened when visitors click 'View Document' on the product page.</span>
                    </div>

                    <div className="field-group full-span">
                      <label className="toggle-switch-lbl">
                        <input 
                          type="checkbox" 
                          checked={formData.customizationAvailable}
                          onChange={(e) => setFormData({ ...formData, customizationAvailable: e.target.checked })}
                        />
                        <span>Bespoke Engineering & Customization Services Available</span>
                      </label>
                    </div>

                    {/* DEMO ACCOUNTS LIST */}
                    <div className="field-group full-span mt-4 pt-4 border-t border-default">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <label className="field-label mb-0 text-base">Live Demo Access Credentials & Test Accounts</label>
                          <span className="field-hint">Displayed on the product detail page with 1-click copy buttons for instant testing.</span>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setFormData({ 
                            ...formData, 
                            demoAccounts: [
                              ...(formData.demoAccounts || []), 
                              { role: 'New Role Account', url: formData.demoUrl || '', email: '', password: '', note: '' }
                            ] 
                          })}
                        >
                          <Plus size={12} /> Add Demo Account
                        </button>
                      </div>

                      {(formData.demoAccounts || []).map((acc, idx) => (
                        <div key={idx} className="p-4 mb-3 rounded-lg border border-default bg-surface-subtle">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-gold uppercase tracking-wider">Demo Account #{idx + 1}</span>
                            <button 
                              type="button" 
                              className="btn btn-secondary btn-xs text-danger"
                              onClick={() => {
                                const updated = formData.demoAccounts.filter((_, i) => i !== idx);
                                setFormData({ ...formData, demoAccounts: updated });
                              }}
                            >
                              <X size={13} /> Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                              <label className="field-label text-xs">Role / Account Name *</label>
                              <input 
                                type="text" 
                                className="field-text" 
                                placeholder="e.g. Super Admin Console, Employer Demo, Jobseeker Portal"
                                value={acc.role}
                                onChange={(e) => {
                                  const updated = [...formData.demoAccounts];
                                  updated[idx] = { ...updated[idx], role: e.target.value };
                                  setFormData({ ...formData, demoAccounts: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label className="field-label text-xs">Specific Login URL (Optional)</label>
                              <input 
                                type="url" 
                                className="field-text font-mono text-xs" 
                                placeholder="e.g. https://domain.com/admin/login"
                                value={acc.url || ''}
                                onChange={(e) => {
                                  const updated = [...formData.demoAccounts];
                                  updated[idx] = { ...updated[idx], url: e.target.value };
                                  setFormData({ ...formData, demoAccounts: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label className="field-label text-xs">Email Address *</label>
                              <input 
                                type="text" 
                                className="field-text font-mono text-xs" 
                                placeholder="admin@demo.com"
                                value={acc.email}
                                onChange={(e) => {
                                  const updated = [...formData.demoAccounts];
                                  updated[idx] = { ...updated[idx], email: e.target.value };
                                  setFormData({ ...formData, demoAccounts: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label className="field-label text-xs">Password *</label>
                              <input 
                                type="text" 
                                className="field-text font-mono text-xs" 
                                placeholder="password"
                                value={acc.password}
                                onChange={(e) => {
                                  const updated = [...formData.demoAccounts];
                                  updated[idx] = { ...updated[idx], password: e.target.value };
                                  setFormData({ ...formData, demoAccounts: updated });
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="field-label text-xs">Access Scope / Description</label>
                            <input 
                              type="text" 
                              className="field-text" 
                              placeholder="e.g. Full command center access for platform monitoring, employer verification, and SEO."
                              value={acc.note || ''}
                              onChange={(e) => {
                                const updated = [...formData.demoAccounts];
                                updated[idx] = { ...updated[idx], note: e.target.value };
                                setFormData({ ...formData, demoAccounts: updated });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: COMMERCIAL TERMS & PRICING */}
                {formTab === 'commercial' && (
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label className="field-label">Regular License Price *</label>
                      <input 
                        type="text" 
                        className="field-text font-bold" 
                        placeholder="₹24,999 or $25"
                        value={formData.pricingTiers?.regular || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricingTiers: { ...(formData.pricingTiers || {}), regular: e.target.value },
                          pricing: { ...(formData.pricing || {}), priceDisplay: e.target.value }
                        })}
                      />
                      <span className="field-hint">Single project personal/commercial license price.</span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Extended License Price *</label>
                      <input 
                        type="text" 
                        className="field-text font-bold" 
                        placeholder="₹64,999 or $75"
                        value={formData.pricingTiers?.extended || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricingTiers: { ...(formData.pricingTiers || {}), extended: e.target.value }
                        })}
                      />
                      <span className="field-hint">Multi-project commercial usage license price.</span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Server Installation Addon Price</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="₹2,999 or $39"
                        value={formData.pricingTiers?.installationService || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricingTiers: { ...(formData.pricingTiers || {}), installationService: e.target.value }
                        })}
                      />
                      <span className="field-hint">Optional add-on for server setup and configuration.</span>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Primary Currency</label>
                      <select 
                        className="field-select"
                        value={formData.currency || 'INR'}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      >
                        <option value="INR">INR (₹ — Indian Rupee)</option>
                        <option value="USD">USD ($ — US Dollar)</option>
                      </select>
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Commercial Licensing Note</label>
                      <textarea 
                        rows={2}
                        className="field-textarea" 
                        placeholder="e.g. Perpetual single-domain license with 1-year security updates, deployment guidance, and full source code included."
                        value={formData.pricing?.pricingNote || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricing: { ...(formData.pricing || {}), pricingNote: e.target.value }
                        })}
                      />
                    </div>

                    <div className="field-group">
                      <label className="toggle-switch-lbl">
                        <input 
                          type="checkbox" 
                          checked={formData.sourceCodeAvailable}
                          onChange={(e) => setFormData({ ...formData, sourceCodeAvailable: e.target.checked })}
                        />
                        <span>Full Uncompiled Source Code Included</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 6: REQUIREMENTS & SETUP GUIDE */}
                {formTab === 'setup' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Server & Hosting Requirements (One per line)</label>
                      <textarea 
                        rows={7}
                        className="field-textarea font-mono text-xs" 
                        placeholder={"PHP 8.2 or higher\nLaravel 13 framework\nMySQL 8.0+ or MariaDB\nApache or Nginx Web Server with mod_rewrite\nComposer package manager\nRequired PHP Extensions (OpenSSL, PDO, Mbstring, Tokenizer, XML, JSON)\nURL Rewriting Support\nSSL/HTTPS Recommended\nWritable Laravel Storage Directories (chmod 775)"}
                        value={formData.requirementsText || ''}
                        onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                      />
                      <span className="field-hint">Enter each server or software requirement on a new line. Rendered as a checklist on the product page.</span>
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Step-by-Step Installation Instructions (One step per line)</label>
                      <textarea 
                        rows={9}
                        className="field-textarea font-mono text-xs" 
                        placeholder={"Upload the software application zip archive to your production web server.\nCreate a dedicated MySQL database and database user.\nCopy .env.example to .env and configure database connection parameters.\nConfigure your application domain URL (APP_URL) and SMTP email settings.\nInstall Composer dependencies: composer install --optimize-autoloader --no-dev\nGenerate application security encryption key: php artisan key:generate\nRun database schema migrations and seed initial default records: php artisan migrate --seed\nConfigure web server virtual host pointing to the /public directory.\nAccess the application in your browser and complete the initial setup wizard."}
                        value={formData.installInstructionsText || ''}
                        onChange={(e) => setFormData({ ...formData, installInstructionsText: e.target.value })}
                      />
                      <span className="field-hint">Enter each installation or deployment step on a new line. Rendered as a numbered installation guide on the product page.</span>
                    </div>
                  </div>
                )}

                {/* TAB 7: SEO & META */}
                {formTab === 'seo' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">SEO Meta Page Title</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder={`${formData.name || 'Software'} — Kiaan Technology`}
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">SEO Meta Description</label>
                      <textarea 
                        rows={3}
                        className="field-textarea" 
                        placeholder="Search engine summary snippet (150-160 characters recommended)."
                        value={formData.seoDesc}
                        onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Form Bottom Action Bar */}
                <div className="form-bottom-actions mt-6 pt-4 border-t flex justify-end gap-3">
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('catalog')}>
                    Cancel
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleSaveForm('draft')}>
                    Save Draft
                  </button>
                  {formData.id && (
                    <button className="btn btn-secondary btn-sm" onClick={() => handlePreview(formData)}>
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm" onClick={() => handleSaveForm('published')}>
                    <Save size={14} />
                    <span>{formData.status === 'published' ? 'Update Software' : 'Publish Software'}</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE: CATEGORIES                                               */}
          {/* ================================================================ */}
          {activeModule === 'categories' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Software Categories</h2>
                  <p className="pane-subtitle">Manage product classification taxonomies and storefront catalog filters.</p>
                </div>
              </div>

              <div className="admin-grid-cards">
                {categoriesList.map(cat => (
                  <div key={cat.id} className="category-admin-card">
                    <div className="cat-admin-top">
                      <div>
                        <strong className="cat-admin-name">{cat.name}</strong>
                        <span className="badge badge-subtle ml-2">{cat.id}</span>
                      </div>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => setEditingCategory({ ...cat })}
                        title="Edit Category Details"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <p className="cat-admin-desc">{cat.shortDesc}</p>
                    <div className="cat-admin-footer">
                      <span className="text-muted text-xs">
                        {productsList.filter(p => p.categoryId === cat.id).length} Active Software
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE: INDUSTRY SOLUTIONS                                       */}
          {/* ================================================================ */}
          {activeModule === 'industry' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Industry Solutions</h2>
                  <p className="pane-subtitle">Manage industry vertical collections and targeted software bundles.</p>
                </div>
              </div>

              <div className="admin-grid-cards">
                {industriesList.map(ind => (
                  <div key={ind.id} className="category-admin-card">
                    <div className="cat-admin-top">
                      <div>
                        <strong className="cat-admin-name">{ind.name}</strong>
                        <span className="badge badge-subtle ml-2">{ind.id}</span>
                      </div>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => setEditingIndustry({ ...ind })}
                        title="Edit Industry Details"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                    </div>
                    <p className="cat-admin-desc">{ind.desc}</p>
                    <div className="cat-admin-footer">
                      <span className="badge badge-gold">Active Vertical</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE: HOMEPAGE CONTENT                                         */}
          {/* ================================================================ */}
          {activeModule === 'homepage' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Homepage Content</h2>
                  <p className="pane-subtitle">Manage storefront hero messaging, trust guarantees, and flagship software spotlight.</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={handleSaveHeroConfig}>
                  <Save size={14} />
                  <span>Save Homepage Content</span>
                </button>
              </div>

              {/* Section 1: Hero Discovery Copy */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <Sparkles size={16} className="text-gold" />
                  <span>Hero Messaging & Trust Highlights</span>
                </legend>
                <p className="admin-settings-desc">
                  Customize the primary discovery headline, value copy, and trust badges on the storefront homepage.
                </p>

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

              {/* Section 2: Flagship Spotlight */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <Tag size={16} className="text-gold" />
                  <span>Flagship Software Spotlight</span>
                </legend>
                <p className="admin-settings-desc">
                  Select which production software suite is featured on the homepage hero preview card.
                </p>

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
                        showToast(`Set "${p.name}" as the Flagship Spotlight Suite.`);
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
          {/* MODULE: CUSTOMER INQUIRIES                                       */}
          {/* ================================================================ */}
          {activeModule === 'inquiries' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Customer Inquiries</h2>
                  <p className="pane-subtitle">Review and respond to custom development quotes and software deployment inquiries.</p>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search inquiries by client name, email, company, or scope..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="filter-input"
                  />
                </div>

                <select 
                  value={inquiryStatusFilter} 
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses ({inquiriesList.length})</option>
                  <option value="New">New ({inquiriesList.filter(i => (i.status || 'New') === 'New').length})</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Customer & Organization</th>
                      <th>Requested Software / Scope</th>
                      <th>Contact Info</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6">
                          <div className="admin-empty-state">
                            <div className="admin-empty-icon"><MessageSquare size={24} /></div>
                            <h4 className="admin-empty-title">No customer inquiries found</h4>
                            <p className="admin-empty-desc">
                              Customer requests submitted via the storefront Custom Quote Modal will appear here in real time.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map(inq => (
                        <tr key={inq.id}>
                          <td>
                            <div>
                              <strong className="cell-title">{inq.name}</strong>
                              <span className="cell-slug">{inq.company || 'Direct Buyer'}</span>
                            </div>
                          </td>
                          <td><span className="badge badge-subtle">{inq.service}</span></td>
                          <td>
                            <div className="text-xs">
                              <div>{inq.email}</div>
                              {inq.phone && <div className="text-muted">{inq.phone}</div>}
                            </div>
                          </td>
                          <td>
                            <span className="text-xs text-muted">
                              {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill pill-${(inq.status || 'New').toLowerCase().replace(/\s+/g, '-')}`}>
                              {inq.status || 'New'}
                            </span>
                          </td>
                          <td className="text-right">
                            <button 
                              className="btn btn-secondary btn-xs"
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
          {/* MODULE: LICENSES                                                 */}
          {/* ================================================================ */}
          {activeModule === 'licenses' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Software Licenses</h2>
                  <p className="pane-subtitle">Manage software license keys, client assignments, and activation status.</p>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by license ID, key, customer, or domain..."
                    value={licenseSearch}
                    onChange={(e) => setLicenseSearch(e.target.value)}
                    className="filter-input"
                  />
                </div>
                <select 
                  value={licenseStatusFilter} 
                  onChange={(e) => setLicenseStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Licenses ({licensesList.length})</option>
                  <option value="Active">Active ({licensesList.filter(l => l.status === 'Active').length})</option>
                  <option value="Inactive">Inactive ({licensesList.filter(l => l.status === 'Inactive').length})</option>
                  <option value="Revoked">Revoked ({licensesList.filter(l => l.status === 'Revoked').length})</option>
                </select>
              </div>

              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>License ID</th>
                      <th>Software</th>
                      <th>Customer & Organization</th>
                      <th>Bound Domain</th>
                      <th>License Key</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLicenses.length === 0 ? (
                      <tr>
                        <td colSpan="7">
                          <div className="admin-empty-state">
                            <div className="admin-empty-icon"><ShieldCheck size={24} /></div>
                            <h4 className="admin-empty-title">No software licenses found</h4>
                            <p className="admin-empty-desc">
                              Software licenses will appear here once issued to enterprise customers.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredLicenses.map(lic => {
                        const isRevealed = revealedKeys.has(lic.id);
                        return (
                          <tr key={lic.id}>
                            <td><span className="cell-mono font-bold">{lic.id}</span></td>
                            <td><span className="badge badge-subtle">{lic.productName}</span></td>
                            <td>
                              <div>
                                <strong className="cell-title">{lic.customerName}</strong>
                                <span className="cell-slug">{lic.company}</span>
                              </div>
                            </td>
                            <td><span className="cell-mono text-xs">{lic.domain}</span></td>
                            <td>
                              <div className="key-cell-wrap">
                                <span className="cell-mono text-xs">
                                  {isRevealed ? lic.key : '••••-••••-••••-••••'}
                                </span>
                                <button 
                                  className="icon-action-btn"
                                  onClick={() => handleToggleKeyReveal(lic.id)}
                                  title={isRevealed ? 'Mask Key' : 'Reveal Key'}
                                >
                                  {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                                <button 
                                  className="icon-action-btn"
                                  onClick={() => handleCopyKey(lic.key)}
                                  title="Copy Key to Clipboard"
                                >
                                  <Copy size={13} />
                                </button>
                              </div>
                            </td>
                            <td>
                              <span className={`status-pill ${
                                lic.status === 'Active' ? 'pill-closed' : lic.status === 'Revoked' ? 'status-archived' : 'pill-contacted'
                              }`}>
                                {lic.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <div className="table-actions-cluster">
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => setSelectedLicense(lic)}
                                >
                                  View Details
                                </button>
                                <button 
                                  className="btn btn-secondary btn-xs"
                                  onClick={() => handleToggleLicenseStatus(lic.id)}
                                >
                                  {lic.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                {lic.status !== 'Revoked' && (
                                  <button 
                                    className="icon-action-btn delete-btn"
                                    onClick={() => handleRevokeLicense(lic.id)}
                                    title="Revoke License"
                                  >
                                    <XCircle size={13} />
                                  </button>
                                )}
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







        </main>
      </div>

      {/* ================================================================ */}
      {/* MODAL: INQUIRY DETAILS                                           */}
      {/* ================================================================ */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div>
                <span className="badge badge-gold">QUOTE INQUIRY</span>
                <h3 className="inquiry-client-title">{selectedInquiry.name}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedInquiry(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="inq-detail-row">
                <span className="inq-lbl">Inquiry ID:</span>
                <span className="cell-mono text-sm">{selectedInquiry.id}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Company / Org:</span>
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
                <span className="badge badge-subtle">{selectedInquiry.service}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Submitted Date:</span>
                <span>{selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : 'Recent'}</span>
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
              <button 
                className="btn btn-secondary btn-sm delete-btn"
                onClick={() => handleDeleteInquiry(selectedInquiry.id)}
              >
                <Trash2 size={14} />
                <span>Delete Inquiry</span>
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedInquiry(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ================================================================ */}
      {/* MODAL: CATEGORY EDIT                                             */}
      {/* ================================================================ */}
      {editingCategory && (
        <div className="modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <h3 className="inquiry-client-title">Edit Category — {editingCategory.name}</h3>
              <button className="modal-close-btn" onClick={() => setEditingCategory(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <div className="inquiry-modal-body">
                <div className="field-group mb-3">
                  <label className="field-label">Category Name</label>
                  <input 
                    type="text" 
                    className="field-text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Description</label>
                  <textarea 
                    rows={3}
                    className="field-textarea"
                    value={editingCategory.shortDesc || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, shortDesc: e.target.value })}
                  />
                </div>
              </div>
              <div className="inquiry-modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingCategory(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: INDUSTRY EDIT                                             */}
      {/* ================================================================ */}
      {editingIndustry && (
        <div className="modal-overlay" onClick={() => setEditingIndustry(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <h3 className="inquiry-client-title">Edit Industry — {editingIndustry.name}</h3>
              <button className="modal-close-btn" onClick={() => setEditingIndustry(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveIndustry}>
              <div className="inquiry-modal-body">
                <div className="field-group mb-3">
                  <label className="field-label">Industry Name</label>
                  <input 
                    type="text" 
                    className="field-text"
                    value={editingIndustry.name}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, name: e.target.value })}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Description</label>
                  <textarea 
                    rows={3}
                    className="field-textarea"
                    value={editingIndustry.desc || ''}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, desc: e.target.value })}
                  />
                </div>
              </div>
              <div className="inquiry-modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingIndustry(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: LICENSE DETAILS                                           */}
      {/* ================================================================ */}
      {selectedLicense && (
        <div className="modal-overlay" onClick={() => setSelectedLicense(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div>
                <span className="badge badge-gold">SOFTWARE LICENSE</span>
                <h3 className="inquiry-client-title">{selectedLicense.id}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedLicense(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="inq-detail-row">
                <span className="inq-lbl">Software Product:</span>
                <strong>{selectedLicense.productName}</strong>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">License Key:</span>
                <div className="key-cell-wrap">
                  <span className="cell-mono text-sm font-bold">{selectedLicense.key}</span>
                  <button className="btn btn-secondary btn-xs" onClick={() => handleCopyKey(selectedLicense.key)}>
                    <Copy size={12} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Customer:</span>
                <span>{selectedLicense.customerName} ({selectedLicense.customerEmail})</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Organization:</span>
                <span>{selectedLicense.company}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Bound Domain:</span>
                <span className="cell-mono text-sm">{selectedLicense.domain}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">License Status:</span>
                <span className={`status-pill ${selectedLicense.status === 'Active' ? 'pill-closed' : 'status-archived'}`}>
                  {selectedLicense.status}
                </span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Issued Date:</span>
                <span>{selectedLicense.issuedDate}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Term:</span>
                <span>{selectedLicense.expiryDate}</span>
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleToggleLicenseStatus(selectedLicense.id)}
              >
                {selectedLicense.status === 'Active' ? 'Deactivate License' : 'Activate License'}
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedLicense(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
