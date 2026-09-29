import { PRODUCTS as DEFAULT_PRODUCTS, CATEGORIES as DEFAULT_CATEGORIES, INDUSTRIES as DEFAULT_INDUSTRIES } from '../data/products';

const STORAGE_KEYS = {
  PRODUCTS: 'kiaan_marketplace_products',
  INQUIRIES: 'kiaan_marketplace_inquiries',
  SETTINGS: 'kiaan_marketplace_settings',
  HERO: 'kiaan_marketplace_hero_config'
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
      }
    } catch {
      // LocalStorage access fallback
    }
  }

  // --- Products Retrieval ---
  getAllProducts() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {
      // Fall back to defaults
    }
    return DEFAULT_PRODUCTS;
  }

  getPublishedProducts() {
    return this.getAllProducts().filter(p => p.status !== 'draft');
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
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // storage error fallback
    }
    return [];
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
}

export const productService = new ProductService();
export const CATEGORIES = DEFAULT_CATEGORIES;
export const INDUSTRIES = DEFAULT_INDUSTRIES;
export const PRODUCTS = DEFAULT_PRODUCTS;

