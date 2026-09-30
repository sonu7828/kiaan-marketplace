import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function ScreenshotGalleryModal({ product, onClose, onViewDetails }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return null;

  const screenshots = (product.screenshots && product.screenshots.length > 0)
    ? product.screenshots
    : [{ url: product.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', caption: 'Overview & Main Dashboard' }];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const activeScreenshot = screenshots[currentIndex] || screenshots[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="screenshot-modal-header">
          <div className="screenshot-modal-title-wrap">
            <span className="badge badge-gold">{product.category}</span>
            <h3 className="screenshot-modal-title">{product.name} — Screenshots Gallery</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close screenshot gallery">
            <X size={18} />
          </button>
        </div>

        {/* Main Display Area */}
        <div className="screenshot-main-viewport">
          <img 
            src={activeScreenshot.url} 
            alt={activeScreenshot.caption || `${product.name} preview`} 
            className="screenshot-main-img" 
          />
          
          {screenshots.length > 1 && (
            <>
              <button 
                type="button" 
                className="gallery-nav-btn prev" 
                onClick={handlePrev} 
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button" 
                className="gallery-nav-btn next" 
                onClick={handleNext} 
                aria-label="Next screenshot"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className="screenshot-caption-bar">
            <span className="caption-text">{activeScreenshot.caption || 'Interface Overview'}</span>
            <span className="caption-counter">{currentIndex + 1} of {screenshots.length}</span>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {screenshots.length > 1 && (
          <div className="screenshot-thumb-strip">
            {screenshots.map((s, idx) => (
              <button 
                key={idx}
                type="button"
                className={`gallery-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={s.url} alt={s.caption || `Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Footer info & CTA */}
        <div className="screenshot-modal-footer">
          <div className="screenshot-price-info">
            <span className="text-muted text-xs">Standard License:</span>
            <strong className="text-primary ml-1">{product.pricing?.priceDisplay || '₹49,999'}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
            {onViewDetails && (
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
              >
                <span>View Full Product Details</span>
                <ExternalLink size={13} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
