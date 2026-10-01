import React, { useState } from 'react';
import { 
  Factory, 
  ShoppingBag, 
  Truck, 
  Activity, 
  Building2, 
  Cpu, 
  ArrowRight, 
  Package, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { productService } from '../services/productService';

export default function IndustrySolutions({ onExploreSolutions, onViewProduct, onSelectCategory }) {
  const industries = productService.getIndustries();
  const allProducts = productService.getAllProducts();
  const [activeIndustryId, setActiveIndustryId] = useState(industries[0]?.id || 'manufacturing');

  const activeIndustry = industries.find(i => i.id === activeIndustryId) || industries[0] || {};

  const getIndustryIcon = (id) => {
    switch (id) {
      case 'manufacturing': return <Factory size={18} />;
      case 'retail': return <ShoppingBag size={18} />;
      case 'logistics': return <Truck size={18} />;
      case 'healthcare': return <Activity size={18} />;
      case 'services': return <Building2 size={18} />;
      case 'tech': return <Cpu size={18} />;
      default: return <Building2 size={18} />;
    }
  };

  return (
    <section className="industry-section" id="industry-solutions">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-compact text-center">
          <h2 className="section-title-compact">Software for Your Industry</h2>
          <p className="section-desc-compact">Pre-configured software suites adapted for specific business sectors.</p>
        </div>

        {/* Split Industry Layout */}
        <div className="industry-split-box">
          
          {/* Left: Industry Selector List */}
          <div className="industry-menu-pane">
            {industries.map((ind) => {
              const isActive = ind.id === activeIndustryId;

              return (
                <button
                  key={ind.id}
                  className={`industry-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndustryId(ind.id)}
                >
                  <div className="ind-icon">{getIndustryIcon(ind.id)}</div>
                  <span className="ind-name">{ind.title || ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Industry Architecture Card */}
          <div className="industry-detail-pane">
            <div className="ind-pane-header">
              <div>
                <span className="ind-eyebrow">{activeIndustry.eyebrow}</span>
                <h3 className="ind-title">{activeIndustry.title}</h3>
              </div>
              <div className="ind-timeline-pill">
                <Clock size={13} />
                <span>{activeIndustry.deploymentTimeline}</span>
              </div>
            </div>

            <p className="ind-desc">{activeIndustry.description}</p>

            {/* Industry Capabilities Highlights */}
            {activeIndustry.highlights && activeIndustry.highlights.length > 0 && (
              <div className="ind-highlights-box" style={{ margin: '14px 0', padding: '12px 14px', background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <span className="ind-box-label" style={{ marginBottom: '6px' }}>INDUSTRY CAPABILITIES & WORKFLOWS:</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px' }}>
                  {activeIndustry.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={13} className="text-orange" style={{ flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ind-recommended-box">
              <span className="ind-box-label">RECOMMENDED SOFTWARE PACKAGES:</span>
              <div className="ind-packages-list">
                {activeIndustry.recommendedPackages && activeIndustry.recommendedPackages.map((pkgName, idx) => {
                  const matched = allProducts.find(p => p.name.toLowerCase().includes(pkgName.toLowerCase()) || pkgName.toLowerCase().includes(p.name.toLowerCase()));
                  return (
                    <button
                      key={idx}
                      type="button"
                      className="ind-pkg-tag"
                      style={{ cursor: matched ? 'pointer' : 'default', transition: 'all 0.15s ease' }}
                      onClick={() => {
                        if (matched && onViewProduct) {
                          onViewProduct(matched);
                        } else if (onExploreSolutions) {
                          onExploreSolutions();
                        }
                      }}
                      title={matched ? `Click to view full specifications for ${matched.name}` : pkgName}
                    >
                      <Package size={13} className="text-orange" />
                      <span>{pkgName}</span>
                      {matched && <ArrowRight size={11} style={{ opacity: 0.6 }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ind-pane-footer">
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  if (onSelectCategory && activeIndustry.id === 'retail') {
                    onSelectCategory('pos');
                  } else if (onSelectCategory && (activeIndustry.id === 'manufacturing' || activeIndustry.id === 'logistics')) {
                    onSelectCategory('erp');
                  } else if (onSelectCategory && activeIndustry.id === 'tech') {
                    onSelectCategory('hrms');
                  } else if (onExploreSolutions) {
                    onExploreSolutions();
                  }
                }}
              >
                <span>Explore {activeIndustry.name || 'Industry'} Software</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
