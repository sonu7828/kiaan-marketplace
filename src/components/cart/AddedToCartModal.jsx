import React, { useState } from 'react';
import { Check, X, Minus, Plus } from 'lucide-react';

export default function AddedToCartModal({ 
  product, 
  onClose, 
  onGoToCheckout,
  onUpdateCartItem 
}) {
  if (!product) return null;

  // Helper to parse numeric price
  const parseNum = (val) => {
    if (typeof val === 'number') return val;
    const num = parseInt((val || '').toString().replace(/[^\d]/g, ''), 10);
    return isNaN(num) ? 24999 : num;
  };

  const rawRegular = product.pricingTiers?.regular || product.pricing?.priceDisplay || '₹24,999';
  const isDollar = rawRegular.includes('$');
  const currency = isDollar ? '$' : '₹';
  const regularNum = parseNum(rawRegular);
  const extendedNum = parseNum(product.pricingTiers?.extended) || Math.round(regularNum * 2.4);

  const [licenseType, setLicenseType] = useState('regular'); // 'regular' | 'extended'
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [updatedFlash, setUpdatedFlash] = useState(false);

  const currentUnitPrice = licenseType === 'regular' ? regularNum : extendedNum;
  const itemTotal = currentUnitPrice * quantity;

  const handleQtyChange = (delta) => {
    const next = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(next);
    if (onUpdateCartItem) {
      onUpdateCartItem(product.id, { quantity: next, licenseType });
    }
  };

  const handleLicenseChange = (e) => {
    const nextType = e.target.value;
    setLicenseType(nextType);
    if (onUpdateCartItem) {
      onUpdateCartItem(product.id, { 
        licenseType: nextType, 
        price: nextType === 'regular' ? regularNum : extendedNum,
        priceDisplay: `${currency}${(nextType === 'regular' ? regularNum : extendedNum).toLocaleString()}`
      });
    }
  };

  const handleUpdateClick = () => {
    if (onUpdateCartItem) {
      onUpdateCartItem(product.id, { 
        quantity, 
        licenseType,
        price: currentUnitPrice,
        priceDisplay: `${currency}${currentUnitPrice.toLocaleString()}`
      });
    }
    setUpdatedFlash(true);
    setTimeout(() => setUpdatedFlash(false), 1500);
  };

  return (
    <div className="cart-modal-backdrop" onClick={onClose}>
      <div 
        className="added-to-cart-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="added-cart-title"
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="added-cart-close-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Top Checkmark Header */}
        <div className="added-cart-header">
          <div className="added-cart-check-icon">
            <Check size={28} strokeWidth={3.5} />
          </div>
          <h2 id="added-cart-title" className="added-cart-title">
            Item added to your cart
          </h2>
        </div>

        {/* Form Controls */}
        <div className="added-cart-form">
          
          {/* License Type Selector */}
          <div className="added-cart-field-row">
            <label htmlFor="modal-license-select" className="added-cart-label">
              License Type
            </label>
            <select 
              id="modal-license-select"
              className="added-cart-select"
              value={licenseType}
              onChange={handleLicenseChange}
            >
              <option value="regular">
                Regular - 6 months support - {currency}{regularNum.toLocaleString()}
              </option>
              <option value="extended">
                Extended - 12 months support - {currency}{extendedNum.toLocaleString()}
              </option>
            </select>
          </div>

          {/* Quantity Controls */}
          <div className="added-cart-field-row qty-row">
            <label className="added-cart-label">
              Quantity
            </label>
            <div className="added-cart-qty-wrapper">
              <div className="added-cart-stepper">
                <button 
                  type="button" 
                  className="qty-step-btn" 
                  onClick={() => handleQtyChange(-1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="qty-number-display">{quantity}</span>
                <button 
                  type="button" 
                  className="qty-step-btn" 
                  onClick={() => handleQtyChange(1)}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button 
                type="button" 
                className={`btn-update-cart-subtle ${updatedFlash ? 'updated' : ''}`}
                onClick={handleUpdateClick}
              >
                {updatedFlash ? '✓ Updated' : 'Update Cart'}
              </button>
            </div>
          </div>

        </div>

        {/* Item Summary Box (Matching Screenshot 2) */}
        <div className="added-cart-item-preview">
          <div className="preview-thumb-box">
            {product.coverImage ? (
              <img 
                src={product.coverImage} 
                alt={product.name} 
                className="preview-thumb-img" 
              />
            ) : (
              <div className="preview-thumb-fallback">
                <span>{product.name ? product.name.substring(0, 2).toUpperCase() : 'KT'}</span>
              </div>
            )}
          </div>

          <div className="preview-meta-box">
            <h4 className="preview-item-name">{product.name}</h4>
            <span className="preview-item-author">by Kiaan Technology</span>
          </div>

          <div className="preview-pricing-box">
            <div className="preview-price-tag">
              {currency}{itemTotal.toLocaleString()}
            </div>
            <div className="preview-license-info">
              <span>License: <strong>{licenseType === 'regular' ? 'Regular' : 'Extended'}</strong></span>
              <span>Support: <strong>{licenseType === 'regular' ? '6 months support' : '12 months support'}</strong></span>
            </div>
          </div>
        </div>

        {/* Tax Note */}
        <p className="added-cart-tax-note">
          Price is in {isDollar ? 'US dollars' : 'INR'} and excludes tax and handling fees
        </p>

        {/* Bottom Actions */}
        <div className="added-cart-actions">
          <button 
            type="button" 
            className="btn-keep-browsing"
            onClick={onClose}
          >
            Keep Browsing
          </button>
          
          <button 
            type="button" 
            className="btn-go-checkout"
            onClick={onGoToCheckout}
          >
            Go to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
