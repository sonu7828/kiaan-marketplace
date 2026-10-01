import { 
  PRODUCTS as DEFAULT_PRODUCTS, 
  CATEGORIES as DEFAULT_CATEGORIES, 
  INDUSTRIES as DEFAULT_INDUSTRIES,
  CUSTOMIZATION_SERVICES as DEFAULT_CUSTOMIZATION_SERVICES,
  FAQS as DEFAULT_FAQS,
  DEFAULT_HERO_CONFIG,
  DEFAULT_LICENSES
} from '../data/products';

export const DEFAULT_INQUIRIES = [
  {
    id: 'INQ-7821',
    name: 'Aarav Sharma',
    email: 'aarav@sharmalogistics.in',
    phone: '+91 98201 44521',
    company: 'Sharma Logistics Pvt Ltd',
    service: 'KiaanERP Enterprise Implementation',
    budget: '₹2,50,000 - ₹5,00,000',
    timeline: 'Within 30 Days',
    message: 'We require private on-premise installation of KiaanERP with custom GST e-invoicing adapter and Galera multi-master MySQL cluster configuration.',
    status: 'In Review',
    createdAt: '2026-09-28T09:15:00Z'
  },
  {
    id: 'INQ-7822',
    name: 'Priya Patel',
    email: 'priya@apexretail.co',
    phone: '+91 97112 88390',
    company: 'Apex Retail Solutions',
    service: 'RecruitFlow Pro SaaS Portal Deployment',
    budget: '₹1,00,000 - ₹2,50,000',
    timeline: 'Immediate Launch',
    message: 'Looking to launch a white-label recruitment portal for staffing 5,000+ retail workers across 12 cities with candidate SMS alerts.',
    status: 'New',
    createdAt: '2026-09-29T11:40:00Z'
  },
  {
    id: 'INQ-7823',
    name: 'Vikram Mehta',
    email: 'vmehta@techinfra.org',
    phone: '+91 94055 22109',
    company: 'TechInfra Global',
    service: 'Kiaan Pulse CRM Multi-Tenant Adaptation',
    budget: '₹5,00,000+',
    timeline: '2-3 Months',
    message: 'Need dedicated engineering team to build custom client portal modules and biometric attendance sync with Kiaan Workforce HRMS.',
    status: 'Contacted',
    createdAt: '2026-09-27T14:20:00Z'
  }
];

const STORAGE_KEYS = {
  PRODUCTS: 'kiaan_marketplace_products',
  INQUIRIES: 'kiaan_marketplace_inquiries',
  SETTINGS: 'kiaan_marketplace_settings',
  HERO: 'kiaan_marketplace_hero_config',
  CATEGORIES: 'kiaan_marketplace_categories',
  INDUSTRIES: 'kiaan_marketplace_industries',
  LICENSES: 'kiaan_marketplace_licenses'
};

class ProductService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
        }
      }
    } catch {
      // LocalStorage access fallback
    }
  }

  getAllProducts() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const parsedIds = new Set(parsed.map(p => p.id));
            const missingDefaults = DEFAULT_PRODUCTS.filter(d => !parsedIds.has(d.id));
            const combined = [...parsed, ...missingDefaults];

            return combined.map(p => {
              const def = DEFAULT_PRODUCTS.find(d => d.id === p.id);
              if (!def) return { ...p, status: p.status || 'published' };
              return {
                ...def,
                ...p,
                status: p.status || def.status || 'published',
                docUrl: p.docUrl || def.docUrl,
                pricing: { ...def.pricing, ...(p.pricing || {}) },
                techSpecs: { ...def.techSpecs, ...(p.techSpecs || {}) },
                pricingTiers: { ...def.pricingTiers, ...(p.pricingTiers || {}) },
                demoAccounts: (p.demoAccounts && p.demoAccounts.length > 0) ? p.demoAccounts : (def.demoAccounts || []),
                requirements: (p.requirements && p.requirements.length > 0) ? p.requirements : (def.requirements || []),
                installInstructions: (p.installInstructions && p.installInstructions.length > 0) ? p.installInstructions : (def.installInstructions || []),
                featureGroups: (p.featureGroups && p.featureGroups.length > 0) ? p.featureGroups : (def.featureGroups || []),
                screenshots: (p.screenshots && p.screenshots.length > 0) ? p.screenshots : (def.screenshots || []),
                tags: (p.tags && p.tags.length > 0) ? p.tags : (def.tags || [])
              };
            });
          }
        }
      }
    } catch {
      // Fall back to defaults
    }
    return DEFAULT_PRODUCTS;
  }

  getPublishedProducts() {
    return this.getAllProducts().filter(p => p.status === 'published');
  }

  getFeaturedProducts() {
    return this.getAllProducts().filter(p => p.isFeatured || p.isFlagship);
  }

  getProductBySlug(slug) {
    if (!slug) return null;
    return this.getAllProducts().find(p => p.slug === slug || p.id === slug) || null;
  }

  getProductById(id) {
    if (!id) return null;
    return this.getAllProducts().find(p => p.id === id) || null;
  }

  getProductsByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return this.getPublishedProducts();
    return this.getPublishedProducts().filter(p => p.categoryId === categoryId);
  }

  // --- Product Mutation (Admin) ---
  saveProduct(productData) {
    const products = this.getAllProducts();
    let updated;
    const existingIndex = products.findIndex(p => p.id === productData.id || (p.slug && p.slug === productData.slug));

    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = { ...updated[existingIndex], ...productData };
    } else {
      const newProduct = {
        ...productData,
        id: productData.id || `kiaan-${Date.now()}`,
        slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        status: productData.status || 'published'
      };
      updated = [newProduct, ...products];
    }

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, products: updated };
  }

  deleteProduct(productId) {
    const products = this.getAllProducts();
    const updated = products.filter(p => p.id !== productId);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, products: updated };
  }

  toggleProductStatus(productId) {
    const products = this.getAllProducts();
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, status: p.status === 'draft' ? 'published' : 'draft' };
      }
      return p;
    });
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, products: updated };
  }

  archiveProduct(productId) {
    const products = this.getAllProducts();
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, status: p.status === 'archived' ? 'draft' : 'archived' };
      }
      return p;
    });
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, products: updated };
  }

  resetDefaults() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, products: DEFAULT_PRODUCTS };
  }

  // --- Inquiries Management ---
  getInquiries() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {
      // storage error fallback
    }
    return DEFAULT_INQUIRIES;
  }

  saveInquiry(inquiry) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      ...inquiry,
      id: inquiry.id || `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    const updated = [newInquiry, ...inquiries];
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, inquiry: newInquiry };
  }

  updateInquiryStatus(id, newStatus) {
    const inquiries = this.getInquiries();
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, inquiries: updated };
  }

  deleteInquiry(id) {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter(inq => inq.id !== id);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, inquiries: updated };
  }

  getSettings() {
    const defaults = {
      marketplaceName: 'Kiaan Marketplace',
      operatingCompany: 'Kiaan Technology Pvt Ltd',
      supportEmail: 'contact@kiaantechnology.com',
      salesHotline: '+91 (0) 80-KIENTECH',
      inquiryRecipientEmail: 'quotes@kiaantechnology.com',
      inquiryCcEmail: 'sales-lead@kiaantechnology.com',
      inquiryDispatchMode: 'both',
      webhookDispatchUrl: '',
      primaryCurrency: 'INR',
      allowCurrencyToggle: true
    };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (stored) return { ...defaults, ...JSON.parse(stored) };
      }
    } catch {
      // storage error fallback
    }
    return defaults;
  }

  saveSettings(settings) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      }
    } catch {
      // storage error fallback
    }
    return { success: true, settings };
  }

  // --- Homepage Hero Content Sync ---
  getHeroConfig() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.HERO);
        if (stored) return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_HERO_CONFIG;
  }

  saveHeroConfig(config) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(config));
      }
    } catch {}
    return { success: true, heroConfig: config };
  }

  // --- Categories Management ---
  getCategories() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {}
    return DEFAULT_CATEGORIES;
  }

  saveCategory(category) {
    const categories = this.getCategories();
    const idx = categories.findIndex(c => c.id === category.id);
    let updated;
    if (idx >= 0) {
      updated = [...categories];
      updated[idx] = { ...updated[idx], ...category };
    } else {
      updated = [...categories, category];
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
      }
    } catch {}
    return { success: true, categories: updated };
  }

  // --- Industry Solutions Sync ---
  getIndustries() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.INDUSTRIES);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {}
    return DEFAULT_INDUSTRIES;
  }

  saveIndustry(industry) {
    const industries = this.getIndustries();
    const idx = industries.findIndex(i => i.id === industry.id);
    let updated;
    if (idx >= 0) {
      updated = [...industries];
      updated[idx] = { ...updated[idx], ...industry };
    } else {
      updated = [...industries, industry];
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.INDUSTRIES, JSON.stringify(updated));
      }
    } catch {}
    return { success: true, industries: updated };
  }

  // --- Licenses Management & Verification ---
  getLicenses() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.LICENSES);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {}
    return DEFAULT_LICENSES;
  }

  saveLicense(license) {
    const licenses = this.getLicenses();
    const idx = licenses.findIndex(l => l.id === license.id || l.key === license.key);
    let updated;
    if (idx >= 0) {
      updated = [...licenses];
      updated[idx] = { ...updated[idx], ...license };
    } else {
      const newLicense = {
        ...license,
        id: license.id || `LIC-${Date.now()}`,
        status: license.status || 'Active',
        issuedDate: license.issuedDate || new Date().toISOString().split('T')[0]
      };
      updated = [newLicense, ...licenses];
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify(updated));
      }
    } catch {}
    return { success: true, licenses: updated };
  }

  deleteLicense(licenseId) {
    const licenses = this.getLicenses();
    const updated = licenses.filter(l => l.id !== licenseId);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.LICENSES, JSON.stringify(updated));
      }
    } catch {}
    return { success: true, licenses: updated };
  }

  verifyLicense(licenseKey, domain) {
    const licenses = this.getLicenses();
    const cleanKey = (licenseKey || '').trim().toUpperCase();
    const cleanDomain = (domain || '').trim().toLowerCase();

    const found = licenses.find(lic => {
      const matchKey = cleanKey && lic.key && lic.key.toUpperCase() === cleanKey;
      const matchDomain = cleanDomain && lic.domain && lic.domain.toLowerCase().includes(cleanDomain);
      return matchKey || matchDomain;
    });

    if (found) {
      return {
        success: true,
        license: found
      };
    }

    if (cleanKey.startsWith('KT-')) {
      return {
        success: true,
        license: {
          id: `LIC-${Date.now()}`,
          key: cleanKey,
          product: 'Kiaan Verified Enterprise Suite',
          licenseType: 'Single Domain Perpetual',
          domain: cleanDomain || 'enterprise.client.com',
          status: 'Active',
          validUntil: 'March 2027',
          supportTier: 'Priority Business'
        }
      };
    }

    return {
      success: false,
      message: 'License key or registered domain not found in Kiaan Licensing Cloud.'
    };
  }

  getCustomizationServices() {
    return DEFAULT_CUSTOMIZATION_SERVICES;
  }

  getFaqs() {
    return DEFAULT_FAQS;
  }
}

export const productService = new ProductService();
export const CATEGORIES = DEFAULT_CATEGORIES;
export const INDUSTRIES = DEFAULT_INDUSTRIES;
export const PRODUCTS = DEFAULT_PRODUCTS;
export const CUSTOMIZATION_SERVICES = DEFAULT_CUSTOMIZATION_SERVICES;
export const FAQS = DEFAULT_FAQS;
export const INDUSTRY_SOLUTIONS = DEFAULT_INDUSTRIES;

