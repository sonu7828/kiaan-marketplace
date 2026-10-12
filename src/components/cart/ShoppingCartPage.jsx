import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  X, 
  Download, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function ShoppingCartPage({
  cartItems = [],
  onContinueShopping,
  onEmptyCart,
  onRemoveItem,
  onUpdateQuantity,
  onToggleExtendedSupport,
  onViewProduct
}) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Checkout form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
    paymentMethod: 'upi'
  });

  const [formErrors, setFormErrors] = useState({});

  // Helper to parse numeric price
  const parseNum = (val) => {
    if (typeof val === 'number') return val;
    const num = parseInt((val || '').toString().replace(/[^\d]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  // Determine currency based on items
  const isDollar = cartItems.some(item => (item.priceDisplay || '').includes('$'));
  const currency = isDollar ? 'US$' : '₹';

  // Calculate cart subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const base = parseNum(item.price || item.priceDisplay || 24999);
    const qty = item.quantity || 1;
    const supportAddon = item.extendedSupport ? parseNum(item.extendedSupportPrice || (isDollar ? 19 : 4999)) : 0;
    return acc + (base + supportAddon) * qty;
  }, 0);

  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please enter a valid work email';
    if (!formData.phone.trim()) errors.phone = 'Please enter phone or WhatsApp number';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const orderId = `KT-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const licenseKey = `KT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-PRO-2026`;

    setOrderData({
      orderId,
      licenseKey,
      customer: formData,
      items: [...cartItems],
      totalAmount: subtotal,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });

    setOrderComplete(true);
    if (onEmptyCart) {
      onEmptyCart(true); // silent clear
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container-main">

        {/* Top Breadcrumbs / Navigation */}
        <div className="cart-breadcrumb-bar">
          <button 
            type="button" 
            className="cart-breadcrumb-back"
            onClick={onContinueShopping}
          >
            <ArrowLeft size={14} />
            <span>Back to Software Catalog</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="cart-page-header">
          <h1 className="cart-page-title">Shopping Cart</h1>
          <span className="cart-item-count-text">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </span>
        </div>

        {cartItems.length === 0 && !orderComplete ? (
          /* Empty Cart State */
          <div className="cart-empty-box">
            <div className="cart-empty-icon-circle">
              <ShoppingCart size={40} className="text-secondary" />
            </div>
            <h2 className="cart-empty-title">Your shopping cart is empty</h2>
            <p className="cart-empty-subtext">
              Browse our production-ready, self-hosted enterprise software catalog and add suites to your cart.
            </p>
            <button 
              type="button" 
              className="btn btn-primary btn-md"
              onClick={onContinueShopping}
            >
              <span>Explore Software Catalog</span>
            </button>
          </div>
        ) : (
          /* 2-Column Cart Layout (Matching Screenshot 3) */
          <div className="cart-layout-grid">
            
            {/* Left Column: Cart Items Table */}
            <div className="cart-items-column">
              
              {/* Table Action Bar */}
              <div className="cart-table-actionbar">
                <button 
                  type="button" 
                  className="btn-cart-continue"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </button>

                <button 
                  type="button" 
                  className="btn-cart-empty"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to empty your shopping cart?')) {
                      onEmptyCart();
                    }
                  }}
                >
                  Empty Cart
                </button>
              </div>

              {/* Items List */}
              <div className="cart-items-stack">
                {cartItems.map((item) => {
                  const basePrice = parseNum(item.price || item.priceDisplay || 24999);
                  const qty = item.quantity || 1;
                  const extPrice = parseNum(item.extendedSupportPrice || (isDollar ? 19 : 4999));
                  const itemTotal = (basePrice + (item.extendedSupport ? extPrice : 0)) * qty;

                  return (
                    <div key={item.id} className="cart-item-row-card">
                      
                      {/* Top Item Row */}
                      <div className="cart-item-main-row">
                        
                        {/* Thumbnail */}
                        <div 
                          className="cart-item-thumb-box"
                          onClick={() => onViewProduct && onViewProduct(item)}
                        >
                          {item.coverImage ? (
                            <img src={item.coverImage} alt={item.name} className="cart-item-thumb" />
                          ) : (
                            <div className="cart-item-thumb-fallback">
                              <span>{item.name ? item.name.substring(0, 2).toUpperCase() : 'KT'}</span>
                            </div>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="cart-item-info">
                          <h3 
                            className="cart-item-name"
                            onClick={() => onViewProduct && onViewProduct(item)}
                          >
                            {item.name}
                          </h3>
                          <div className="cart-item-author">
                            Item by <strong>Kiaan Technology</strong>
                          </div>
                          <div className="cart-item-license-badge-row">
                            <span className="cart-lic-label">License:</span>
                            <span className="cart-lic-val">
                              {item.licenseType === 'extended' ? 'Extended License' : 'Regular License'}
                            </span>
                            <span className="cart-lic-divider">•</span>
                            <span className="cart-lic-label">Support:</span>
                            <span className="cart-lic-val">
                              {item.licenseType === 'extended' ? '12 months support' : '6 months support'}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="cart-item-qty-cell">
                          <div className="cart-qty-inline">
                            <span className="qty-tag">Qty</span>
                            <input 
                              type="number"
                              min="1"
                              max="10"
                              className="cart-qty-input"
                              value={qty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val >= 1) {
                                  onUpdateQuantity(item.id, val);
                                }
                              }}
                            />
                          </div>
                          <button 
                            type="button" 
                            className="btn-update-link"
                            onClick={() => {
                              // trigger visual acknowledgment
                            }}
                          >
                            Update
                          </button>
                        </div>

                        {/* Price */}
                        <div className="cart-item-price-cell">
                          <span className="cart-item-price-val">
                            {currency}{itemTotal.toLocaleString()}
                          </span>
                        </div>

                        {/* Remove Action */}
                        <button 
                          type="button" 
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item from cart"
                          aria-label="Remove item"
                        >
                          <X size={15} />
                        </button>

                      </div>

                      {/* Extended Support Addon Checkbox (Matching Screenshot 3) */}
                      <div className="cart-item-addon-row">
                        <label className="support-addon-label">
                          <input 
                            type="checkbox"
                            checked={!!item.extendedSupport}
                            onChange={(e) => onToggleExtendedSupport(item.id, e.target.checked)}
                            className="support-addon-checkbox"
                          />
                          <span className="support-addon-text">
                            Extend support to 12 months. <strong>+{currency}{extPrice.toLocaleString()}</strong> <span className="support-save-pill">Save 40%</span>
                          </span>
                        </label>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Sticky Summary Box (Matching Screenshot 3) */}
            <div className="cart-summary-column">
              <div className="cart-summary-sticky-card">
                
                <h2 className="summary-card-title">Your Cart Total</h2>

                <div className="summary-total-amount">
                  <span className="summary-currency">{currency}</span>
                  <span className="summary-number">{subtotal.toLocaleString()}</span>
                </div>

                <button 
                  type="button" 
                  className="btn-secure-checkout"
                  onClick={() => setCheckoutModalOpen(true)}
                >
                  <Lock size={16} />
                  <span>Secure Checkout</span>
                </button>

                <p className="summary-tax-note">
                  Price displayed excludes any applicable taxes and a handling fee.
                </p>

                <div className="summary-secure-seal">
                  <ShieldCheck size={16} className="text-success" />
                  <span>Secure 256-bit SSL encrypted checkout</span>
                </div>

                <div className="summary-perks-list">
                  <div className="summary-perk-item">
                    <CheckCircle2 size={13} className="text-success" />
                    <span>Instant Source Code & Git Access</span>
                  </div>
                  <div className="summary-perk-item">
                    <CheckCircle2 size={13} className="text-success" />
                    <span>Commercial Self-Hosted License</span>
                  </div>
                  <div className="summary-perk-item">
                    <CheckCircle2 size={13} className="text-success" />
                    <span>Free Server Installation Assistance</span>
                  </div>
                  <div className="summary-perk-item">
                    <CheckCircle2 size={13} className="text-success" />
                    <span>Full Docker & Setup Documentation</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Checkout Modal Dialog */}
      {checkoutModalOpen && (
        <div className="cart-modal-backdrop" onClick={() => setCheckoutModalOpen(false)}>
          <div 
            className="checkout-dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button" 
              className="added-cart-close-btn"
              onClick={() => setCheckoutModalOpen(false)}
            >
              <X size={18} />
            </button>

            {!orderComplete ? (
              <div>
                <div className="checkout-dialog-header">
                  <div className="checkout-badge-pill">
                    <Lock size={12} />
                    <span>256-BIT ENCRYPTED</span>
                  </div>
                  <h2 className="checkout-dialog-title">Complete Your Commercial Order</h2>
                  <p className="checkout-dialog-subtitle">
                    Enter your organization details to issue the commercial license and deliver download access.
                  </p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  
                  <div className="checkout-form-grid">
                    <div className="form-field">
                      <label className="field-lbl">Full Name *</label>
                      <input 
                        type="text" 
                        className={`field-input ${formErrors.fullName ? 'error' : ''}`}
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                      {formErrors.fullName && <span className="field-err">{formErrors.fullName}</span>}
                    </div>

                    <div className="form-field">
                      <label className="field-lbl">Work Email (for Code Delivery) *</label>
                      <input 
                        type="email" 
                        className={`field-input ${formErrors.email ? 'error' : ''}`}
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      {formErrors.email && <span className="field-err">{formErrors.email}</span>}
                    </div>

                    <div className="form-field">
                      <label className="field-lbl">Phone / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        className={`field-input ${formErrors.phone ? 'error' : ''}`}
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      {formErrors.phone && <span className="field-err">{formErrors.phone}</span>}
                    </div>

                    <div className="form-field">
                      <label className="field-lbl">Company / Entity Name</label>
                      <input 
                        type="text" 
                        className="field-input"
                        placeholder="e.g. Apex Enterprises Pvt Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="payment-select-group">
                    <label className="field-lbl">Select Payment Mode</label>
                    <div className="payment-options-grid">
                      <label className={`payment-pill ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="upi" 
                          checked={formData.paymentMethod === 'upi'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })} 
                        />
                        <span>UPI / QR Code (Instant)</span>
                      </label>
                      <label className={`payment-pill ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="netbanking" 
                          checked={formData.paymentMethod === 'netbanking'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'netbanking' })} 
                        />
                        <span>NetBanking / Cards</span>
                      </label>
                      <label className={`payment-pill ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="bank" 
                          checked={formData.paymentMethod === 'bank'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })} 
                        />
                        <span>Direct Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Summary in modal */}
                  <div className="checkout-summary-mini">
                    <div className="mini-summary-row">
                      <span>Subtotal ({cartItems.length} software)</span>
                      <span>{currency}{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="mini-summary-row total-highlight">
                      <span>Total Payable</span>
                      <span>{currency}{subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="checkout-actions-row">
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-md"
                      onClick={() => setCheckoutModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-pay-now"
                    >
                      <ShieldCheck size={16} />
                      <span>Confirm Order & Access Source Code</span>
                    </button>
                  </div>

                </form>
              </div>
            ) : (
              /* Success / Order Confirmation View */
              <div className="order-success-pane">
                <div className="success-icon-badge">
                  <CheckCircle2 size={44} className="text-success" />
                </div>
                <h2 className="success-title">Order Placed Successfully!</h2>
                <p className="success-subtext">
                  Thank you, <strong>{orderData?.customer?.fullName}</strong>. Your commercial license has been provisioned and source code access details have been sent to <strong>{orderData?.customer?.email}</strong>.
                </p>

                <div className="order-details-card">
                  <div className="order-detail-item">
                    <span className="lbl">Order ID</span>
                    <span className="val-mono">{orderData?.orderId}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="lbl">License Key</span>
                    <span className="val-mono key-highlight">{orderData?.licenseKey}</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="lbl">Status</span>
                    <span className="val-status">Active Commercial License</span>
                  </div>
                  <div className="order-detail-item">
                    <span className="lbl">Total Paid</span>
                    <span className="val-bold">{currency}{orderData?.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="order-success-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary btn-md"
                    onClick={() => {
                      alert(`Downloading source code zip archive for ${orderData?.items?.map(i => i.name).join(', ')}...`);
                    }}
                  >
                    <Download size={15} />
                    <span>Download Source Code Bundle (.zip)</span>
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-md"
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setOrderComplete(false);
                      onContinueShopping();
                    }}
                  >
                    <span>Return to Storefront</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
