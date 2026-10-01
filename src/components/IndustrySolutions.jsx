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
  Clock 
} from 'lucide-react';
import { productService } from '../services/productService';

export default function IndustrySolutions({ onExploreSolutions }) {
  const industries = productService.getIndustries();
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

            <div className="ind-recommended-box">
              <span className="ind-box-label">RECOMMENDED SOFTWARE PACKAGES:</span>
              <div className="ind-packages-list">
                {activeIndustry.recommendedPackages.map((pkg, idx) => (
                  <div key={idx} className="ind-pkg-tag">
                    <Package size={13} className="text-orange" />
                    <span>{pkg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ind-pane-footer">
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={onExploreSolutions}
              >
                <span>Explore Packages</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
