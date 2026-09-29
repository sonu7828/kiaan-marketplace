import React from 'react';
import { 
  Layers, 
  Users, 
  Briefcase, 
  Package, 
  CreditCard, 
  Cpu, 
  ArrowRight,
  Check
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { productService } from '../services/productService';

export default function CategoryNav({ selectedCategory, onSelectCategory }) {
  const allProducts = productService.getAllProducts();

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'erp': return <Layers size={20} />;
      case 'crm': return <Users size={20} />;
      case 'hrms': return <Briefcase size={20} />;
      case 'inventory': return <Package size={20} />;
      case 'pos': return <CreditCard size={20} />;
      case 'automation': return <Cpu size={20} />;
      default: return <Layers size={20} />;
    }
  };

  const getProductCount = (catId) => {
    return allProducts.filter(p => p.categoryId === catId).length;
  };

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        
        <div className="section-head-compact">
          <div>
            <h2 className="section-title-compact">Software Categories</h2>
            <p className="section-desc-compact">Select an operational domain to filter production-ready software suites.</p>
          </div>
          {selectedCategory !== 'all' && (
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectCategory('all')}
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="categories-grid-row">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getProductCount(cat.id);

            return (
              <div 
                key={cat.id}
                className={`category-item-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectCategory(isSelected ? 'all' : cat.id);
                  const el = document.getElementById('featured-software');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
              >
                <div className="cat-icon-wrap">
                  {getCategoryIcon(cat.id)}
                </div>
                <div className="cat-text-info">
                  <h3 className="cat-name">{cat.name}</h3>
                  <span className="cat-count">{count} {count === 1 ? 'Suite' : 'Suites'}</span>
                </div>
                <div className="cat-arrow">
                  {isSelected ? <Check size={14} className="text-orange" /> : <ArrowRight size={14} />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
