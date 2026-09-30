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

// Demonstration Datasets for Technical Governance & Licensing
const DEFAULT_DEMO_LICENSES = [
  {
    id: 'LIC-7891-KTR',
    key: 'KIAAN-PROD-8F92-4C10-99E1',
    productId: 'erp-enterprise',
    productName: 'Kiaan Enterprise ERP Suite',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@sharmalogistics.in',
    company: 'Sharma Logistics Pvt Ltd',
    domain: 'erp.sharmalogistics.in',
    status: 'Active',
    issuedDate: '2026-03-15',
    expiryDate: 'Perpetual',
    transferRequest: {
      id: 'TR-101',
      requestedDomain: 'cloud.sharmalogistics.in',
      reason: 'Migrating from on-premise hardware to private dedicated cloud server.',
      requestDate: '2026-09-20',
      status: 'Pending'
    },
    isDemo: true
  },
  {
    id: 'LIC-4421-KTR',
    key: 'KIAAN-PROD-22B4-9A77-31C8',
    productId: 'crm-omnichannel',
    productName: 'Kiaan OmniCRM Pro',
    customerName: 'Priya Patel',
    customerEmail: 'priya@apexretail.co',
    company: 'Apex Retail Solutions',
    domain: 'crm.apexretail.co',
    status: 'Active',
    issuedDate: '2026-05-10',
    expiryDate: 'Perpetual',
    transferRequest: null,
    isDemo: true
  },
  {
    id: 'LIC-9903-KTR',
    key: 'KIAAN-PROD-55D1-88EE-62B9',
    productId: 'hrms-workforce',
    productName: 'Kiaan Core HRMS',
    customerName: 'Vikram Mehta',
    customerEmail: 'vmehta@techinfra.org',
    company: 'TechInfra Global',
    domain: 'portal.techinfra.org',
    status: 'Inactive',
    issuedDate: '2026-06-01',
    expiryDate: 'Perpetual',
    transferRequest: null,
    isDemo: true
  }
];

const DEFAULT_DEMO_TICKETS = [
  {
    id: 'TCK-2026-081',
    subject: 'Deployment guidance for Docker Compose with external MySQL cluster',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@sharmalogistics.in',
    company: 'Sharma Logistics Pvt Ltd',
    product: 'Kiaan Enterprise ERP Suite',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-09-28T09:30:00Z',
    messages: [
      {
        id: 'msg-1',
        sender: 'Aarav Sharma',
        senderType: 'customer',
        text: 'We are preparing our on-premise Ubuntu 24.04 LTS server. Does the ERP Docker Compose package support pointing to an existing high-availability MySQL cluster rather than the default container?',
        timestamp: '2026-09-28T09:30:00Z'
      },
      {
        id: 'msg-2',
        sender: 'Kiaan Technical Support',
        senderType: 'agent',
        text: 'Hello Aarav. Yes, the .env template includes DB_HOST, DB_PORT, DB_NAME, and DB_USER parameters. You can disable the local mysql container block in docker-compose.yml and supply your existing HA cluster endpoint directly.',
        timestamp: '2026-09-28T10:15:00Z'
      }
    ],
    internalNotes: [
      {
        id: 'note-1',
        author: 'Lead Architect',
        text: 'Client is using Galera cluster with SSL certs. Ensure DB_SSL=true documentation is referenced.',
        timestamp: '2026-09-28T10:00:00Z'
      }
    ],
    isDemo: true
  },
  {
    id: 'TCK-2026-082',
    subject: 'Assistance with REST API authentication for third-party courier webhook',
    customerName: 'Priya Patel',
    customerEmail: 'priya@apexretail.co',
    company: 'Apex Retail Solutions',
    product: 'Kiaan OmniCRM Pro',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-09-27T14:10:00Z',
    messages: [
      {
        id: 'msg-3',
        sender: 'Priya Patel',
        senderType: 'customer',
        text: 'We need to trigger order dispatch status changes in OmniCRM whenever our courier partner posts a tracking update. Can you verify the Bearer token header format?',
        timestamp: '2026-09-27T14:10:00Z'
      },
      {
        id: 'msg-4',
        sender: 'Kiaan Technical Support',
        senderType: 'agent',
        text: 'Hi Priya. The endpoint accepts `Authorization: Bearer <API_KEY>` with `Content-Type: application/json`. Please refer to section 4.2 of the OmniCRM API reference guide.',
        timestamp: '2026-09-27T15:00:00Z'
      }
    ],
    internalNotes: [],
    isDemo: true
  }
];

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
  // Logical Modules: 'overview' | 'catalog' | 'form' | 'categories' | 'industry' | 'homepage' | 'orders' | 'customers' | 'inquiries' | 'licenses' | 'domains' | 'tickets' | 'settings'
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

  // Orders & Customers State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');

  // Category / Industry Editing State
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [industriesList, setIndustriesList] = useState(DEFAULT_INDUSTRIES);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingIndustry, setEditingIndustry] = useState(null);

  // Licenses & Domains State
  const [licensesList, setLicensesList] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('kiaan_demo_licenses');
        if (stored) return JSON.parse(stored);
      }
    } catch {}
    return DEFAULT_DEMO_LICENSES;
  });
  const [licenseSearch, setLicenseSearch] = useState('');
  const [licenseStatusFilter, setLicenseStatusFilter] = useState('all');
  const [revealedKeys, setRevealedKeys] = useState(new Set());
  const [selectedLicense, setSelectedLicense] = useState(null);

  // Support Tickets State
  const [ticketsList, setTicketsList] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('kiaan_demo_tickets');
        if (stored) return JSON.parse(stored);
      }
    } catch {}
    return DEFAULT_DEMO_TICKETS;
  });
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState('all');
  const [ticketPriorityFilter, setTicketPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [activeComposerTab, setActiveComposerTab] = useState('reply');

  // Marketplace Settings State
  const [siteSettings, setSiteSettings] = useState(() => productService.getSettings());

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
    techStack: 'React, Node.js (Express), MySQL',
    demoUrl: '',
    demoVideoUrl: '',
    docUrl: '',
    pricing: {
      isApproved: true,
      priceDisplay: '₹49,999',
      pricingNote: 'Perpetual single-domain license with dedicated server deployment assistance.'
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
  const [formTab, setFormTab] = useState('basic'); // 'basic' | 'capabilities' | 'media' | 'demo' | 'commercial' | 'seo'

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
      version: product.version || '1.0.0',
      releaseDate: product.releaseDate || new Date().toISOString().split('T')[0],
      currency: product.currency || 'INR',
      sourceCodeAvailable: !!product.sourceCodeAvailable,
      seoTitle: product.seoTitle || '',
      seoDesc: product.seoDesc || '',
      features: product.features && product.features.length ? product.features : [''],
      modules: product.modules && product.modules.length ? product.modules : [''],
      screenshots: product.screenshots && product.screenshots.length ? product.screenshots : [{ url: '', caption: '' }],
      docUrl: product.docUrl || '',
      pricing: product.pricing || { isApproved: true, priceDisplay: '₹49,999', pricingNote: '' }
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
    const cleaned = {
      ...formData,
      status: finalStatus,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      version: formData.version || '1.0.0',
      releaseDate: formData.releaseDate || new Date().toISOString().split('T')[0],
      currency: formData.currency || 'INR',
      sourceCodeAvailable: !!formData.sourceCodeAvailable,
      seoTitle: formData.seoTitle ? formData.seoTitle.trim() : `${formData.name} — Kiaan Software`,
      seoDesc: formData.seoDesc ? formData.seoDesc.trim() : formData.shortDesc,
      features: (formData.features || []).filter(f => f && f.trim()),
      modules: (formData.modules || []).filter(m => m && m.trim()),
      screenshots: (formData.screenshots || []).filter(s => s && s.url && s.url.trim()),
      coverImage: formData.coverImage || formData.screenshots?.[0]?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'
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
    const updated = categoriesList.map(c => c.id === editingCategory.id ? editingCategory : c);
    setCategoriesList(updated);
    setEditingCategory(null);
    showToast(`Updated Category: ${editingCategory.name}`);
  };

  const handleSaveIndustry = (e) => {
    e.preventDefault();
    if (!editingIndustry) return;
    const updated = industriesList.map(ind => ind.id === editingIndustry.id ? editingIndustry : ind);
    setIndustriesList(updated);
    setEditingIndustry(null);
    showToast(`Updated Industry Solution: ${editingIndustry.name}`);
  };

  const handleSaveHeroConfig = () => {
    try {
      localStorage.setItem('kiaan_marketplace_hero_config', JSON.stringify(heroConfig));
    } catch {}
    showToast('Homepage hero content updated successfully.');
  };

  const handleSaveSettings = () => {
    productService.saveSettings(siteSettings);
    showToast('Marketplace settings saved successfully.');
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
    const updated = licensesList.map(lic => {
      if (lic.id === licenseId) {
        const nextStat = lic.status === 'Active' ? 'Inactive' : 'Active';
        return { ...lic, status: nextStat };
      }
      return lic;
    });
    setLicensesList(updated);
    try { localStorage.setItem('kiaan_demo_licenses', JSON.stringify(updated)); } catch {}
    if (selectedLicense && selectedLicense.id === licenseId) {
      setSelectedLicense(updated.find(l => l.id === licenseId));
    }
    showToast('License status updated.');
  };

  const handleRevokeLicense = (licenseId) => {
    if (!window.confirm('Are you sure you want to revoke this software license?')) return;
    const updated = licensesList.map(lic => {
      if (lic.id === licenseId) {
        return { ...lic, status: 'Revoked' };
      }
      return lic;
    });
    setLicensesList(updated);
    try { localStorage.setItem('kiaan_demo_licenses', JSON.stringify(updated)); } catch {}
    if (selectedLicense && selectedLicense.id === licenseId) {
      setSelectedLicense(updated.find(l => l.id === licenseId));
    }
    showToast('Software license revoked.');
  };

  const handleSimulateDomainTransfer = (licenseId, action) => {
    const target = licensesList.find(l => l.id === licenseId);
    if (!target || !target.transferRequest) return;

    const newTransferStatus = action === 'approve' ? 'Approved' : 'Rejected';
    let updatedDomain = target.domain;
    if (action === 'approve') {
      updatedDomain = target.transferRequest.requestedDomain;
    }

    const updated = licensesList.map(lic => {
      if (lic.id === licenseId) {
        return {
          ...lic,
          domain: updatedDomain,
          transferRequest: {
            ...lic.transferRequest,
            status: newTransferStatus
          }
        };
      }
      return lic;
    });

    setLicensesList(updated);
    try { localStorage.setItem('kiaan_demo_licenses', JSON.stringify(updated)); } catch {}
    if (selectedLicense && selectedLicense.id === licenseId) {
      setSelectedLicense(updated.find(l => l.id === licenseId));
    }
    showToast(`Domain transfer request ${action === 'approve' ? 'approved and bound to ' + updatedDomain : 'rejected'}.`);
  };

  // Support Ticket Handlers
  const handleSendTicketReply = (ticketId) => {
    if (!replyText.trim()) {
      showToast('Please enter a response message before sending.', 'error');
      return;
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'Kiaan Technical Support',
      senderType: 'agent',
      text: replyText.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = ticketsList.map(tck => {
      if (tck.id === ticketId) {
        return {
          ...tck,
          status: tck.status === 'Open' ? 'In Progress' : tck.status,
          messages: [...(tck.messages || []), newMsg]
        };
      }
      return tck;
    });

    setTicketsList(updated);
    try { localStorage.setItem('kiaan_demo_tickets', JSON.stringify(updated)); } catch {}
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(updated.find(t => t.id === ticketId));
    }
    setReplyText('');
    showToast('Reply posted to client ticket thread.');
  };

  const handleAddInternalNote = (ticketId) => {
    if (!internalNoteText.trim()) {
      showToast('Please enter an internal note.', 'error');
      return;
    }

    const newNote = {
      id: `note-${Date.now()}`,
      author: 'Admin Team',
      text: internalNoteText.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = ticketsList.map(tck => {
      if (tck.id === ticketId) {
        return {
          ...tck,
          internalNotes: [...(tck.internalNotes || []), newNote]
        };
      }
      return tck;
    });

    setTicketsList(updated);
    try { localStorage.setItem('kiaan_demo_tickets', JSON.stringify(updated)); } catch {}
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(updated.find(t => t.id === ticketId));
    }
    setInternalNoteText('');
    showToast('Internal note saved.');
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    const updated = ticketsList.map(tck => tck.id === ticketId ? { ...tck, status: newStatus } : tck);
    setTicketsList(updated);
    try { localStorage.setItem('kiaan_demo_tickets', JSON.stringify(updated)); } catch {}
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(updated.find(t => t.id === ticketId));
    }
    showToast(`Ticket status updated to ${newStatus}.`);
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

  // Pending Domain Transfers
  const pendingDomainTransfers = licensesList.filter(l => l.transferRequest && l.transferRequest.status === 'Pending');

  // Filtered Tickets
  const filteredTickets = ticketsList.filter(tck => {
    const matchSearch = !ticketSearch.trim() ||
      tck.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tck.subject.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tck.customerName.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      tck.product.toLowerCase().includes(ticketSearch.toLowerCase());
    const matchStatus = ticketStatusFilter === 'all' || tck.status === ticketStatusFilter;
    const matchPriority = ticketPriorityFilter === 'all' || tck.priority === ticketPriorityFilter;
    return matchSearch && matchStatus && matchPriority;
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

  // Customer Directory Aggregation
  const customerDirectory = (() => {
    const map = {};
    inquiriesList.forEach(inq => {
      const key = (inq.email || '').toLowerCase();
      if (!key) return;
      if (!map[key]) {
        map[key] = {
          name: inq.name,
          email: inq.email,
          phone: inq.phone || '',
          company: inq.company || '',
          firstContact: inq.createdAt || '',
          inquiries: []
        };
      }
      map[key].inquiries.push(inq);
    });
    return Object.values(map);
  })();

  const filteredCustomers = customerDirectory.filter(c => {
    if (!customerSearch.trim()) return true;
    const q = customerSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q);
  });

  // Orders derived from customer quote submissions
  const orderRecords = inquiriesList.map((inq, idx) => ({
    id: `ORD-2026-${(idx + 1).toString().padStart(4, '0')}`,
    inquiryId: inq.id,
    customerName: inq.name,
    customerEmail: inq.email,
    company: inq.company || '',
    product: inq.service || 'Custom Development',
    amount: 'Custom Agreement',
    currency: 'INR',
    date: inq.createdAt || new Date().toISOString(),
    status: inq.status === 'Closed' ? 'Completed' : 'Quote Agreement'
  }));

  const filteredOrders = orderRecords.filter(o => {
    const matchSearch = !orderSearch.trim() ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.product.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
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
  const publishedCount = productsList.filter(p => p.status === 'published').length;
  const draftCount = productsList.filter(p => p.status === 'draft').length;
  const archivedCount = productsList.filter(p => p.status === 'archived').length;
  const demoActiveCount = productsList.filter(p => p.demoUrl && p.demoUrl.startsWith('http')).length;
  const newInquiriesCount = inquiriesList.filter(i => (i.status || 'New') === 'New').length;
  const openTicketsCount = ticketsList.filter(t => t.status === 'Open').length;
  const pendingTransfersCount = pendingDomainTransfers.length;

  // Recent Activity Feed
  const recentActivity = [
    ...inquiriesList.slice(0, 3).map(inq => ({
      id: `act-inq-${inq.id}`,
      icon: <MessageSquare size={14} />,
      title: `New inquiry from ${inq.name}`,
      meta: `${inq.service || 'Custom Solution'} • ${inq.company || 'Enterprise Lead'}`,
      time: inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'
    })),
    ...productsList.filter(p => p.status === 'published').slice(0, 2).map(prod => ({
      id: `act-prod-${prod.id}`,
      icon: <Package size={14} />,
      title: `Software published: ${prod.name}`,
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
          
          {/* GROUP: OVERVIEW */}
          <div className="sidebar-group-title">OVERVIEW</div>
          <button 
            className={`admin-nav-item ${activeModule === 'overview' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('overview')}
          >
            <TrendingUp size={16} />
            <span>Dashboard</span>
          </button>

          {/* GROUP: PRODUCT MANAGEMENT */}
          <div className="sidebar-group-title mt-4">PRODUCT MANAGEMENT</div>
          <button 
            className={`admin-nav-item ${activeModule === 'catalog' || activeModule === 'form' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('catalog')}
          >
            <Package size={16} />
            <span>Software</span>
            <span className="nav-count-badge">{totalCount}</span>
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
            className={`admin-nav-item ${activeModule === 'homepage' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('homepage')}
          >
            <Sparkles size={16} />
            <span>Homepage Content</span>
          </button>

          {/* GROUP: SALES & CUSTOMERS */}
          <div className="sidebar-group-title mt-4">SALES & CUSTOMERS</div>
          <button 
            className={`admin-nav-item ${activeModule === 'orders' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('orders')}
          >
            <CreditCard size={16} />
            <span>Orders</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'customers' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('customers')}
          >
            <Users size={16} />
            <span>Customers</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'inquiries' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('inquiries')}
          >
            <MessageSquare size={16} />
            <span>Inquiries</span>
            {newInquiriesCount > 0 && <span className="nav-count-badge alert-count">{newInquiriesCount}</span>}
          </button>

          {/* GROUP: LICENSE MANAGEMENT */}
          <div className="sidebar-group-title mt-4">LICENSE MANAGEMENT</div>
          <button 
            className={`admin-nav-item ${activeModule === 'licenses' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('licenses')}
          >
            <ShieldCheck size={16} />
            <span>Licenses</span>
          </button>

          <button 
            className={`admin-nav-item ${activeModule === 'domains' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('domains')}
          >
            <Globe size={16} />
            <span>Domain Activations</span>
            {pendingTransfersCount > 0 && <span className="nav-count-badge alert-count">{pendingTransfersCount}</span>}
          </button>

          {/* GROUP: CUSTOMER SERVICE */}
          <div className="sidebar-group-title mt-4">CUSTOMER SERVICE</div>
          <button 
            className={`admin-nav-item ${activeModule === 'tickets' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('tickets')}
          >
            <LifeBuoy size={16} />
            <span>Support Tickets</span>
            {openTicketsCount > 0 && <span className="nav-count-badge alert-count">{openTicketsCount}</span>}
          </button>

          {/* GROUP: CONFIGURATION */}
          <div className="sidebar-group-title mt-4">CONFIGURATION</div>
          <button 
            className={`admin-nav-item ${activeModule === 'settings' ? 'nav-active' : ''}`}
            onClick={() => setActiveModule('settings')}
          >
            <Settings size={16} />
            <span>Marketplace Settings</span>
          </button>
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
                  <button className="btn btn-primary btn-sm" onClick={handleAddNewProduct}>
                    <Plus size={14} />
                    <span>Add Software</span>
                  </button>
                </div>
              </div>

              {/* 6 Business Metrics */}
              <div className="dashboard-metrics-grid">
                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Package size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Total Software</span>
                    <strong className="kpi-num">{totalCount}</strong>
                    <span className="kpi-sub">Catalog assets</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><FileCheck size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Published</span>
                    <strong className="kpi-num">{publishedCount}</strong>
                    <span className="kpi-sub">Available on storefront</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Edit3 size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Drafts</span>
                    <strong className="kpi-num">{draftCount}</strong>
                    <span className="kpi-sub">Unpublished products</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Tag size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Archived</span>
                    <strong className="kpi-num">{archivedCount}</strong>
                    <span className="kpi-sub">Preserved records</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('catalog')}>
                  <div className="kpi-icon-pill"><Globe size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">Live Demos</span>
                    <strong className="kpi-num">{demoActiveCount}</strong>
                    <span className="kpi-sub">Active test sandboxes</span>
                  </div>
                </div>

                <div className="kpi-metric-card" onClick={() => setActiveModule('inquiries')}>
                  <div className="kpi-icon-pill"><MessageSquare size={20} className="text-gold" /></div>
                  <div className="kpi-meta">
                    <span className="kpi-label">New Inquiries</span>
                    <strong className="kpi-num">{newInquiriesCount}</strong>
                    <span className="kpi-sub">Awaiting sales review</span>
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
                  className={`form-tab-btn ${formTab === 'basic' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('basic')}
                >
                  1. Basic Details
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'capabilities' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('capabilities')}
                >
                  2. Capabilities & Architecture
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'media' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('media')}
                >
                  3. Media & Screenshots
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'demo' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('demo')}
                >
                  4. Live Interactive Demo
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'commercial' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('commercial')}
                >
                  5. Commercial Terms
                </button>
                <button 
                  className={`form-tab-btn ${formTab === 'seo' ? 'tab-active' : ''}`}
                  onClick={() => setFormTab('seo')}
                >
                  6. SEO & Meta
                </button>
              </div>

              <div className="form-card-panel">
                
                {/* TAB 1: BASIC DETAILS */}
                {formTab === 'basic' && (
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label className="field-label">Software Name *</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. Kiaan Enterprise ERP Suite"
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
                        placeholder="erp-enterprise-suite"
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
                        placeholder="1.0.0"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
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
                        rows={5}
                        className="field-textarea" 
                        placeholder="Detailed overview covering architecture, modules, operational benefits, and deployment specs."
                        value={formData.fullDesc}
                        onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: CAPABILITIES */}
                {formTab === 'capabilities' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Target Audience & Who Should Use</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. Mid-to-large manufacturers, distributors, and logistics operations"
                        value={formData.whoShouldUse}
                        onChange={(e) => setFormData({ ...formData, whoShouldUse: e.target.value })}
                      />
                    </div>

                    <div className="field-group full-span">
                      <label className="field-label">Technology Stack Specification</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="e.g. React 19, Node.js (Express), MySQL 8.0, Redis, Docker"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      />
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
                            placeholder={`Module #${idx + 1} (e.g. Financial Accounting & Multi-Currency Ledger)`}
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
                        <div key={idx} className="screenshot-entry-row mb-3">
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
                              placeholder="Feature Caption (e.g. Real-Time Production Ledger)"
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

                {/* TAB 4: LIVE INTERACTIVE DEMO */}
                {formTab === 'demo' && (
                  <div className="form-fields-grid">
                    <div className="field-group full-span">
                      <label className="field-label">Interactive Live Demo Sandbox URL</label>
                      <input 
                        type="url" 
                        className="field-text font-mono" 
                        placeholder="https://demo-erp.kiaantechnology.com"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      />
                      <span className="field-hint">Points to a live hosted sandbox environment for prospective buyers to test.</span>
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
                      <span className="field-hint">External documentation link opened when visitors click 'View Document' on the software card.</span>
                    </div>

                    <div className="field-group">
                      <label className="toggle-switch-lbl">
                        <input 
                          type="checkbox" 
                          checked={formData.customizationAvailable}
                          onChange={(e) => setFormData({ ...formData, customizationAvailable: e.target.checked })}
                        />
                        <span>Bespoke Engineering & Customization Services Available</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 5: COMMERCIAL TERMS */}
                {formTab === 'commercial' && (
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label className="field-label">Display Price / Commercial Format</label>
                      <input 
                        type="text" 
                        className="field-text" 
                        placeholder="Contact for Pricing / Custom Quote"
                        value={formData.pricing?.priceDisplay || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          pricing: { ...(formData.pricing || {}), priceDisplay: e.target.value }
                        })}
                      />
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
                      <label className="field-label">Standard Commercial Licensing Note</label>
                      <textarea 
                        rows={2}
                        className="field-textarea" 
                        placeholder="e.g. Perpetual single-domain license with 1-year security updates and deployment guidance."
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
                        <span>Full Uncompiled Source Code Escrow Available</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 6: SEO & META */}
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
          {/* MODULE: ORDERS & SALES                                           */}
          {/* ================================================================ */}
          {activeModule === 'orders' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Orders & Sales</h2>
                  <p className="pane-subtitle">Track customer purchase agreements and quote commitments.</p>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by order ID, customer, or product..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="filter-input"
                  />
                </div>
                <select 
                  value={orderStatusFilter} 
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="Quote Agreement">Quote Agreement</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Order Reference</th>
                      <th>Customer</th>
                      <th>Product / Service</th>
                      <th>Agreed Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7">
                          <div className="admin-empty-state">
                            <div className="admin-empty-icon"><CreditCard size={24} /></div>
                            <h4 className="admin-empty-title">No orders recorded yet</h4>
                            <p className="admin-empty-desc">
                              Direct online payment gateway checkout is scheduled for future release. Confirmed customer quote agreements will appear here.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td><span className="cell-mono">{order.id}</span></td>
                          <td>
                            <div>
                              <strong className="cell-title">{order.customerName}</strong>
                              {order.company && <span className="cell-slug">{order.company}</span>}
                            </div>
                          </td>
                          <td><span className="badge badge-subtle">{order.product}</span></td>
                          <td><span className="text-muted">{order.amount}</span></td>
                          <td>
                            <span className="text-xs text-muted">
                              {order.date ? new Date(order.date).toLocaleDateString() : '—'}
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill ${order.status === 'Completed' ? 'pill-closed' : 'pill-contacted'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="text-right">
                            <button 
                              className="btn btn-secondary btn-xs"
                              onClick={() => setSelectedOrder(order)}
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
          {/* MODULE: CUSTOMERS DIRECTORY                                      */}
          {/* ================================================================ */}
          {activeModule === 'customers' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Customer Directory</h2>
                  <p className="pane-subtitle">Directory of client accounts, leads, and organizations interacting with the marketplace.</p>
                </div>
              </div>

              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by customer name, organization, or email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>

              {filteredCustomers.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-icon"><Users size={24} /></div>
                  <h4 className="admin-empty-title">No customer profiles found</h4>
                  <p className="admin-empty-desc">
                    Customer records will be compiled automatically as inquiries and quote requests are submitted through the storefront.
                  </p>
                </div>
              ) : (
                <div className="admin-grid-cards">
                  {filteredCustomers.map(cust => (
                    <div 
                      key={cust.email} 
                      className="customer-profile-card"
                      onClick={() => setSelectedCustomer(cust)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="cust-card-avatar">
                          {cust.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="cust-card-info">
                          <strong className="cust-card-name">{cust.name}</strong>
                          <span className="cust-card-company">{cust.company || 'Enterprise Client'}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted mt-2">{cust.email}</div>
                      <div className="cust-card-meta">
                        <span className="badge badge-subtle">{cust.inquiries.length} Inquiries</span>
                        <span className="btn-link text-xs">View Profile →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

          {/* ================================================================ */}
          {/* MODULE: DOMAIN ACTIVATIONS & TRANSFERS                           */}
          {/* ================================================================ */}
          {activeModule === 'domains' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Domain Activations & Transfers</h2>
                  <p className="pane-subtitle">Manage authorized installation domains and process domain rebind requests.</p>
                </div>
              </div>

              {/* Section 1: Domain Transfer Queue */}
              <div className="admin-settings-fieldset mb-6">
                <legend className="admin-settings-legend">
                  <RefreshCw size={16} className="text-gold" />
                  <span>Domain Transfer Request Queue</span>
                  {pendingDomainTransfers.length > 0 && (
                    <span className="badge badge-gold ml-2">{pendingDomainTransfers.length} Pending</span>
                  )}
                </legend>
                <p className="admin-settings-desc">
                  Customer migration requests to rebind software licenses to a new host domain or cloud instance.
                </p>

                {pendingDomainTransfers.length === 0 ? (
                  <div className="admin-empty-state py-6">
                    <div className="admin-empty-icon"><Globe size={20} /></div>
                    <h4 className="admin-empty-title">No pending domain transfer requests</h4>
                    <p className="admin-empty-desc">
                      Client domain migration requests will appear here for review and rebind approval.
                    </p>
                  </div>
                ) : (
                  <div className="transfer-requests-list">
                    {pendingDomainTransfers.map(lic => (
                      <div key={lic.id} className="transfer-request-card">
                        <div className="transfer-req-header">
                          <div>
                            <strong>{lic.customerName}</strong> • <span className="text-muted">{lic.productName}</span>
                            <div className="text-xs text-muted mt-1">License: <span className="cell-mono">{lic.id}</span></div>
                          </div>
                          <span className="badge badge-subtle">{lic.transferRequest.requestDate}</span>
                        </div>
                        <div className="transfer-req-domains">
                          <div className="domain-box">
                            <span className="domain-lbl">Current Bound Domain:</span>
                            <span className="cell-mono text-sm">{lic.domain}</span>
                          </div>
                          <div className="transfer-arrow">➔</div>
                          <div className="domain-box target">
                            <span className="domain-lbl">Requested Target Domain:</span>
                            <span className="cell-mono text-sm">{lic.transferRequest.requestedDomain}</span>
                          </div>
                        </div>
                        {lic.transferRequest.reason && (
                          <p className="transfer-reason">
                            <strong>Reason:</strong> {lic.transferRequest.reason}
                          </p>
                        )}
                        <div className="transfer-actions-bar">
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleSimulateDomainTransfer(lic.id, 'reject')}
                          >
                            <XCircle size={14} />
                            <span>Reject Rebind</span>
                          </button>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleSimulateDomainTransfer(lic.id, 'approve')}
                          >
                            <Check size={14} />
                            <span>Approve Domain Rebind</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Active Bound Domains Roster */}
              <div className="admin-card-panel">
                <h3 className="panel-heading mb-3">Active Bound Domains Roster</h3>
                <div className="admin-table-card">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Host Domain</th>
                        <th>Software Product</th>
                        <th>Customer / Organization</th>
                        <th>License ID</th>
                        <th>Status</th>
                        <th>Activation Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {licensesList.map(lic => (
                        <tr key={lic.id}>
                          <td><span className="cell-mono font-bold text-sm">{lic.domain}</span></td>
                          <td><span className="badge badge-subtle">{lic.productName}</span></td>
                          <td>
                            <strong>{lic.customerName}</strong>
                            <div className="text-xs text-muted">{lic.company}</div>
                          </td>
                          <td><span className="cell-mono text-xs">{lic.id}</span></td>
                          <td>
                            <span className={`status-pill ${lic.status === 'Active' ? 'pill-closed' : 'status-archived'}`}>
                              {lic.status}
                            </span>
                          </td>
                          <td><span className="text-xs text-muted">{lic.issuedDate}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* MODULE: SUPPORT TICKETS                                          */}
          {/* ================================================================ */}
          {activeModule === 'tickets' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Support Tickets</h2>
                  <p className="pane-subtitle">Manage technical support requests, deployment inquiries, and client communications.</p>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="table-filter-bar">
                <div className="search-filter-wrap">
                  <Search size={15} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by ticket ID, subject, customer, or product..."
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    className="filter-input"
                  />
                </div>
                <select 
                  value={ticketStatusFilter} 
                  onChange={(e) => setTicketStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses ({ticketsList.length})</option>
                  <option value="Open">Open ({ticketsList.filter(t => t.status === 'Open').length})</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select 
                  value={ticketPriorityFilter} 
                  onChange={(e) => setTicketPriorityFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="admin-table-card">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Subject</th>
                      <th>Customer & Organization</th>
                      <th>Product</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.length === 0 ? (
                      <tr>
                        <td colSpan="8">
                          <div className="admin-empty-state">
                            <div className="admin-empty-icon"><LifeBuoy size={24} /></div>
                            <h4 className="admin-empty-title">No support tickets found</h4>
                            <p className="admin-empty-desc">
                              Customer support and technical requests submitted from client portals will appear here.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTickets.map(tck => (
                        <tr key={tck.id}>
                          <td><span className="cell-mono font-bold">{tck.id}</span></td>
                          <td><strong className="cell-title">{tck.subject}</strong></td>
                          <td>
                            <div>
                              <span>{tck.customerName}</span>
                              <div className="text-xs text-muted">{tck.company}</div>
                            </div>
                          </td>
                          <td><span className="badge badge-subtle">{tck.product}</span></td>
                          <td>
                            <span className={`status-pill ${
                              tck.priority === 'High' ? 'alert-count' : tck.priority === 'Medium' ? 'pill-contacted' : 'status-draft'
                            }`}>
                              {tck.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill ${
                              tck.status === 'Open' ? 'alert-count' : tck.status === 'In Progress' ? 'pill-new' : 'pill-closed'
                            }`}>
                              {tck.status}
                            </span>
                          </td>
                          <td>
                            <span className="text-xs text-muted">
                              {tck.createdAt ? new Date(tck.createdAt).toLocaleDateString() : '—'}
                            </span>
                          </td>
                          <td className="text-right">
                            <button 
                              className="btn btn-secondary btn-xs"
                              onClick={() => setSelectedTicket(tck)}
                            >
                              Open Thread
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
          {/* MODULE: MARKETPLACE SETTINGS                                     */}
          {/* ================================================================ */}
          {activeModule === 'settings' && (
            <div className="admin-module-view">
              <div className="pane-header">
                <div>
                  <h2 className="pane-title">Marketplace Settings</h2>
                  <p className="pane-subtitle">Configure marketplace identity, communication channels, and display preferences.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={() => setSiteSettings(productService.getSettings())}>
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={handleSaveSettings}>
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* Group 1: Marketplace Identity */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <Building2 size={16} className="text-gold" />
                  <span>Marketplace Identity</span>
                </legend>
                <p className="admin-settings-desc">
                  General marketplace brand name and operating legal entity displayed across storefront and email signatures.
                </p>
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label className="field-label">Marketplace Name</label>
                    <input 
                      type="text" 
                      className="field-text" 
                      value={siteSettings.marketplaceName} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, marketplaceName: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Operating Legal Entity</label>
                    <input 
                      type="text" 
                      className="field-text" 
                      value={siteSettings.operatingCompany} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, operatingCompany: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Contact Information */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>Contact Information</span>
                </legend>
                <p className="admin-settings-desc">
                  Public contact communication details displayed on the footer and customer support channels.
                </p>
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label className="field-label">Support Email Address</label>
                    <input 
                      type="email" 
                      className="field-text" 
                      value={siteSettings.supportEmail} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Sales Hotline</label>
                    <input 
                      type="tel" 
                      className="field-text" 
                      value={siteSettings.salesHotline} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, salesHotline: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Group 3: Homepage Configuration */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <Sparkles size={16} className="text-gold" />
                  <span>Homepage Configuration</span>
                </legend>
                <p className="admin-settings-desc">
                  Hero discovery headlines, trust points, and flagship spotlight software can be updated directly in the Homepage Content module.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveModule('homepage')}>
                  Open Homepage Content Module →
                </button>
              </div>

              {/* Group 4: Inquiry Handling */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <MessageSquare size={16} className="text-gold" />
                  <span>Inquiry Handling & Lead Routing</span>
                </legend>
                <p className="admin-settings-desc">
                  Configure notification emails and dispatch channels for custom quotes and customer inquiries.
                </p>
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label className="field-label">Primary Quote Notification Recipient</label>
                    <input 
                      type="email" 
                      className="field-text" 
                      value={siteSettings.inquiryRecipientEmail} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, inquiryRecipientEmail: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">CC Notifications Mailbox</label>
                    <input 
                      type="email" 
                      className="field-text" 
                      value={siteSettings.inquiryCcEmail || ''} 
                      onChange={(e) => setSiteSettings({ ...siteSettings, inquiryCcEmail: e.target.value })}
                    />
                  </div>
                  <div className="field-group full-span">
                    <label className="field-label">Lead Routing Channel</label>
                    <select 
                      className="field-select"
                      value={siteSettings.inquiryDispatchMode || 'both'}
                      onChange={(e) => setSiteSettings({ ...siteSettings, inquiryDispatchMode: e.target.value })}
                    >
                      <option value="both">Both Email Notification & Dashboard Queue</option>
                      <option value="email">Direct Email Notification Only</option>
                      <option value="queue">Internal Dashboard Queue Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 5: Display Preferences */}
              <div className="admin-settings-fieldset">
                <legend className="admin-settings-legend">
                  <CreditCard size={16} className="text-gold" />
                  <span>Display Preferences</span>
                </legend>
                <p className="admin-settings-desc">
                  Standard currency presentation across software product cards, quote estimations, and licensing notes.
                </p>
                <div className="currency-selector-grid">
                  <label className={`currency-option-card ${siteSettings.primaryCurrency === 'INR' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="currency" 
                      value="INR" 
                      checked={siteSettings.primaryCurrency === 'INR'}
                      onChange={() => setSiteSettings({ ...siteSettings, primaryCurrency: 'INR' })}
                    />
                    <div>
                      <strong className="block text-primary">Indian Rupee (INR — ₹)</strong>
                      <span className="text-xs text-muted">Primary domestic commerce standard for South Asia deployments.</span>
                    </div>
                  </label>

                  <label className={`currency-option-card ${siteSettings.primaryCurrency === 'USD' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="currency" 
                      value="USD" 
                      checked={siteSettings.primaryCurrency === 'USD'}
                      onChange={() => setSiteSettings({ ...siteSettings, primaryCurrency: 'USD' })}
                    />
                    <div>
                      <strong className="block text-primary">US Dollar (USD — $)</strong>
                      <span className="text-xs text-muted">International standard for global enterprise installations.</span>
                    </div>
                  </label>

                  <label className={`currency-option-card ${siteSettings.primaryCurrency === 'DUAL' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="currency" 
                      value="DUAL" 
                      checked={siteSettings.primaryCurrency === 'DUAL'}
                      onChange={() => setSiteSettings({ ...siteSettings, primaryCurrency: 'DUAL' })}
                    />
                    <div>
                      <strong className="block text-primary">Dual Display (INR & USD)</strong>
                      <span className="text-xs text-muted">Show multi-currency reference pricing across product details.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Danger Zone: Factory Reset */}
              <div className="admin-card-panel">
                <div className="danger-zone-card">
                  <h4 className="danger-zone-title">Factory Reset Data</h4>
                  <p className="danger-zone-desc">
                    Reset all products, categories, licenses, and settings back to original factory specifications.
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
      {/* MODAL: ORDER DETAILS                                             */}
      {/* ================================================================ */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div>
                <span className="badge badge-gold">ORDER RECORD</span>
                <h3 className="inquiry-client-title">{selectedOrder.id}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedOrder(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="inq-detail-row">
                <span className="inq-lbl">Customer:</span>
                <strong>{selectedOrder.customerName}</strong>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Organization:</span>
                <span>{selectedOrder.company || 'Enterprise Client'}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Email Address:</span>
                <span>{selectedOrder.customerEmail}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Software / Service:</span>
                <span className="badge badge-subtle">{selectedOrder.product}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Agreement Status:</span>
                <span className="status-pill pill-closed">{selectedOrder.status}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Commercial Terms:</span>
                <span>Perpetual single-domain enterprise license with direct deployment assistance.</span>
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: CUSTOMER PROFILE                                          */}
      {/* ================================================================ */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div className="flex items-center gap-3">
                <div className="cust-card-avatar large">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="inquiry-client-title">{selectedCustomer.name}</h3>
                  <span className="text-xs text-muted">{selectedCustomer.company || 'Enterprise Client'}</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedCustomer(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="inq-detail-row">
                <span className="inq-lbl">Email:</span>
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">Phone:</span>
                <span>{selectedCustomer.phone || 'Not Specified'}</span>
              </div>
              <div className="inq-detail-row">
                <span className="inq-lbl">First Contact:</span>
                <span>{selectedCustomer.firstContact ? new Date(selectedCustomer.firstContact).toLocaleDateString() : 'Recent'}</span>
              </div>

              <div className="mt-4">
                <h4 className="panel-heading mb-2 text-sm">Interaction History ({selectedCustomer.inquiries.length})</h4>
                <div className="inquiries-mini-table">
                  {selectedCustomer.inquiries.map((inq, i) => (
                    <div key={i} className="inquiry-mini-row" onClick={() => { setSelectedInquiry(inq); setSelectedCustomer(null); }}>
                      <div>
                        <strong>{inq.service}</strong>
                        <div className="text-xs text-muted">
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                      </div>
                      <span className={`status-pill pill-${(inq.status || 'New').toLowerCase().replace(/\s+/g, '-')}`}>
                        {inq.status || 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedCustomer(null)}>
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

      {/* ================================================================ */}
      {/* MODAL: SUPPORT TICKET THREAD                                     */}
      {/* ================================================================ */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content inquiry-modal ticket-thread-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-modal-header">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="cell-mono text-xs">{selectedTicket.id}</span>
                  <span className={`status-pill ${selectedTicket.status === 'Open' ? 'alert-count' : 'pill-closed'}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <h3 className="inquiry-client-title">{selectedTicket.subject}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedTicket(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="inquiry-modal-body">
              <div className="ticket-meta-bar mb-4">
                <span><strong>Customer:</strong> {selectedTicket.customerName} ({selectedTicket.company})</span>
                <span><strong>Software:</strong> {selectedTicket.product}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Status:</span>
                  <select 
                    className="filter-select text-xs py-1"
                    value={selectedTicket.status}
                    onChange={(e) => handleUpdateTicketStatus(selectedTicket.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Message Thread */}
              <div className="ticket-conversation-stream">
                {(selectedTicket.messages || []).map((msg) => (
                  <div key={msg.id} className={`thread-message-bubble ${msg.senderType === 'agent' ? 'agent-reply' : 'customer-msg'}`}>
                    <div className="message-meta-head">
                      <strong>{msg.sender}</strong>
                      <span className="text-xs text-muted">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="message-text-body">{msg.text}</div>
                  </div>
                ))}

                {/* Internal Notes Roster */}
                {(selectedTicket.internalNotes || []).length > 0 && (
                  <div className="internal-notes-subblock mt-3">
                    <span className="text-xs font-bold text-muted mb-2 block">Internal Staff Notes</span>
                    {selectedTicket.internalNotes.map(n => (
                      <div key={n.id} className="internal-note-box">
                        <div className="text-xs font-bold">{n.author} • {new Date(n.timestamp).toLocaleTimeString()}</div>
                        <div className="text-xs mt-1">{n.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="ticket-reply-composer mt-4">
                <div className="composer-tab-strip">
                  <button 
                    className={`composer-tab-btn ${activeComposerTab === 'reply' ? 'active' : ''}`}
                    onClick={() => setActiveComposerTab('reply')}
                  >
                    Post Reply
                  </button>
                  <button 
                    className={`composer-tab-btn ${activeComposerTab === 'note' ? 'active' : ''}`}
                    onClick={() => setActiveComposerTab('note')}
                  >
                    Add Internal Note
                  </button>
                </div>

                {activeComposerTab === 'reply' ? (
                  <div className="composer-input-area">
                    <textarea 
                      rows={3}
                      className="field-textarea text-sm"
                      placeholder="Type a technical response to the customer..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSendTicketReply(selectedTicket.id)}
                      >
                        <Send size={13} />
                        <span>Send Response</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="composer-input-area internal-bg">
                    <textarea 
                      rows={2}
                      className="field-textarea text-sm"
                      placeholder="Add an internal staff note visible only to marketplace administrators..."
                      value={internalNoteText}
                      onChange={(e) => setInternalNoteText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAddInternalNote(selectedTicket.id)}
                      >
                        <Save size={13} />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="inquiry-modal-footer">
              <button className="btn btn-primary btn-md" onClick={() => setSelectedTicket(null)}>
                Close Thread
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
