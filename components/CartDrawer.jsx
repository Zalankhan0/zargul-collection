"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    comboDiscount,
    multiWatchDiscount,
    multiWatchTierLabel,
    totalWatches,
    deliveryFee,
    cartTotal,
    storeConfig,
    showToast
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "cod"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Swat",
    customCity: "",
    address: "",
    notes: ""
  });

  if (!isCartOpen) return null;

  const handleCODSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalCity = formData.city === "Other" ? (formData.customCity?.trim() || "Other City") : formData.city;

    // Save order in localStorage for Admin Orders tab
    try {
      const existingOrders = JSON.parse(localStorage.getItem("zargul_orders") || "[]");
      existingOrders.unshift({
        orderId,
        date: new Date().toISOString(),
        customer: { ...formData, city: finalCity },
        items: cart,
        subtotal: cartSubtotal,
        comboDiscount,
        multiWatchDiscount,
        deliveryFee,
        total: cartTotal,
        status: "Pending Confirmation"
      });
      localStorage.setItem("zargul_orders", JSON.stringify(existingOrders));
    } catch (err) {
      console.warn("Could not save order", err);
    }

    // Build WhatsApp Invoice message
    let msg = `🛍️ *NEW CASH ON DELIVERY (COD) ORDER*\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Date:* ${new Date().toLocaleDateString("en-GB")}\n\n`;

    msg += `👤 *CUSTOMER DETAILS:*\n`;
    msg += `• Name: ${formData.name}\n`;
    msg += `• WhatsApp: ${formData.phone}\n`;
    msg += `• City: ${finalCity}\n`;
    msg += `• Delivery Address: ${formData.address}\n`;
    if (formData.notes) msg += `• Order Notes: ${formData.notes}\n`;
    msg += `• Payment: Cash on Delivery (COD)\n\n`;

    msg += `📦 *ORDERED ITEMS:*\n`;
    cart.forEach((item, idx) => {
      const itemPrice = (item.product.price + (item.extraPrice || 0)) * item.quantity;
      const variantStr = item.variant ? ` (${item.variant})` : "";
      msg += `${idx + 1}. *${item.product.title}*${variantStr} x${item.quantity} — Rs. ${itemPrice.toLocaleString()}\n`;
    });

    msg += `\n💰 *PRICE BREAKDOWN:*\n`;
    msg += `• Subtotal: Rs. ${cartSubtotal.toLocaleString()}\n`;
    if (comboDiscount > 0) {
      msg += `• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()} (🎉 Applied)\n`;
    }
    if (multiWatchDiscount > 0) {
      msg += `• ⌚ Multi-Watch Deal: -Rs. ${multiWatchDiscount.toLocaleString()} (${multiWatchTierLabel})\n`;
    }
    msg += `• Delivery Fee: ${deliveryFee === 0 ? "FREE Nationwide 🇵🇰" : `Rs. ${deliveryFee.toLocaleString()}`}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔥 *TOTAL PAYABLE:* Rs. ${cartTotal.toLocaleString()} (Cash on Delivery)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Please confirm my order dispatch! ✨`;

    showToast(`Order ${orderId} placed! Redirecting to WhatsApp...`);

    // Reset and clear
    clearCart();
    setCheckoutStep("cart");
    setIsCartOpen(false);

    // Open WhatsApp
    const waNumber = (storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="cart-drawer-slider clay-card white">
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700" }}>
              {checkoutStep === "cart" ? "Your Shopping Bag" : "Cash on Delivery Checkout"}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              {cart.length} item{cart.length !== 1 ? "s" : ""} selected
            </span>
          </div>

          <button className="clay-icon-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Bag">
            ✕
          </button>
        </div>

        {checkoutStep === "cart" ? (
          <>
            {/* Items List */}
            <div className="cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "12px" }}>🛍️</span>
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const unitPrice = item.product.price + (item.extraPrice || 0);
                  return (
                    <div key={`${item.product.id}-${item.variant}-${idx}`} className="cart-item-card">
                      <img
                        src={item.product.image?.startsWith("/") || item.product.image?.startsWith("http") ? item.product.image : `/${item.product.image}`}
                        alt={item.product.title}
                        className="cart-item-thumb"
                        onError={(e) => { e.currentTarget.src = "/assets/logo.jpg"; }}
                      />

                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: "750" }}>
                          {item.product.title}
                        </h4>
                        {item.variant && (
                          <span style={{ fontSize: "0.72rem", color: "var(--color-accent)", fontWeight: "600" }}>
                            • {item.variant}
                          </span>
                        )}
                        <div style={{ fontWeight: "700", color: "var(--color-text-dark)", fontSize: "0.9rem", marginTop: "4px" }}>
                          Rs. {(unitPrice * item.quantity).toLocaleString()}
                        </div>

                        {/* Qty Controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
                          <button
                            className="clay-icon-btn"
                            style={{ width: "26px", height: "26px", fontSize: "0.85rem" }}
                            onClick={() => updateCartQty(idx, -1)}
                          >
                            -
                          </button>
                          <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>{item.quantity}</span>
                          <button
                            className="clay-icon-btn"
                            style={{ width: "26px", height: "26px", fontSize: "0.85rem" }}
                            onClick={() => updateCartQty(idx, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", fontSize: "0.85rem" }}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Deals & Tier Discounts */}
            {comboDiscount > 0 && (
              <div style={{ padding: "10px 14px", background: "var(--pastel-pink)", borderRadius: "14px", fontSize: "0.82rem", fontWeight: "700", color: "var(--brand-purple)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>👑</span>
                <span>Royal Combo Deal: -Rs. {comboDiscount.toLocaleString()} Saved!</span>
              </div>
            )}

            {multiWatchDiscount > 0 && (
              <div style={{ padding: "10px 14px", background: "linear-gradient(135deg, #fff0f5, #fde4eb)", border: "1.5px solid var(--color-accent)", borderRadius: "14px", fontSize: "0.82rem", fontWeight: "700", color: "var(--color-accent-dark)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⌚</span>
                <span>{multiWatchTierLabel} Unlocked! (-Rs. {multiWatchDiscount.toLocaleString()})</span>
              </div>
            )}

            {totalWatches === 1 && (
              <div style={{ padding: "8px 12px", background: "#f8f9fe", border: "1px dashed #c0b0cc", borderRadius: "12px", fontSize: "0.78rem", fontWeight: "600", color: "var(--color-text-muted)", marginBottom: "10px" }}>
                💡 Add 1 more watch to save Rs. 400, or 2 more to save Rs. 1,000!
              </div>
            )}

            {/* Summary */}
            <div style={{ paddingTop: "14px", borderTop: "2px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                <span>Subtotal</span>
                <span>Rs. {cartSubtotal.toLocaleString()}</span>
              </div>

              {comboDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem", color: "var(--color-accent-dark)", fontWeight: "600" }}>
                  <span>Royal Combo Discount</span>
                  <span>- Rs. {comboDiscount.toLocaleString()}</span>
                </div>
              )}

              {multiWatchDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem", color: "var(--color-accent-dark)", fontWeight: "600" }}>
                  <span>Multi-Watch Tier Discount</span>
                  <span>- Rs. {multiWatchDiscount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "0.9rem" }}>
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE Nationwide 🇵🇰" : `Rs. ${deliveryFee.toLocaleString()}`}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "1.25rem", fontWeight: "700", fontFamily: "var(--font-display)" }}>
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutStep("cod")}
                className="clay-btn accent"
                style={{ width: "100%" }}
              >
                Proceed to Checkout (COD) ✦
              </button>
            </div>
          </>
        ) : (
          /* COD Checkout Form Step */
          <form onSubmit={handleCODSubmit} style={{ flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <button
              type="button"
              onClick={() => setCheckoutStep("cart")}
              style={{ background: "none", border: "none", color: "var(--color-accent)", fontSize: "0.85rem", fontWeight: "700", textAlign: "left", marginBottom: "16px", cursor: "pointer" }}
            >
              ← Back to Shopping Bag
            </button>

            <div style={{ padding: "12px", background: "var(--pastel-green)", borderRadius: "16px", fontSize: "0.82rem", color: "#1e6c06", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛡️</span>
              <span><strong>Cash on Delivery (COD)</strong> • Pay in cash when parcel reaches your doorstep!</span>
            </div>

            <div className="floating-group">
              <input
                type="text"
                required
                className="floating-input"
                placeholder=" "
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label className="floating-label">Full Name *</label>
            </div>

            <div className="floating-group">
              <input
                type="tel"
                required
                className="floating-input"
                placeholder=" "
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <label className="floating-label">WhatsApp Mobile Number *</label>
            </div>

            <div className="floating-group">
              <select
                required
                className="floating-input"
                style={{ paddingTop: "20px", paddingBottom: "6px", cursor: "pointer" }}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                <option value="Swat">Swat</option>
                <option value="Barikot">Barikot (Swat)</option>
                <option value="Mingora">Mingora (Swat)</option>
                <option value="Mardan">Mardan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Malakand">Malakand</option>
                <option value="Dir">Dir</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Quetta">Quetta</option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Sukkur">Sukkur</option>
                <option value="Other">✦ Other City (Type below)</option>
              </select>
              <label className="floating-label" style={{ top: "10px", fontSize: "0.72rem", fontWeight: "700", color: "var(--color-accent-dark)" }}>
                Delivery City *
              </label>
            </div>

            {formData.city === "Other" && (
              <div className="floating-group" style={{ animation: "slideInUp 0.25s ease" }}>
                <input
                  type="text"
                  required
                  className="floating-input"
                  placeholder=" "
                  value={formData.customCity || ""}
                  onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                />
                <label className="floating-label">Enter Your City Name *</label>
              </div>
            )}

            <div className="floating-group">
              <input
                type="text"
                required
                className="floating-input"
                placeholder=" "
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <label className="floating-label">Complete Street Address &amp; House # *</label>
            </div>

            <div className="floating-group">
              <input
                type="text"
                className="floating-input"
                placeholder=" "
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
              <label className="floating-label">Order Notes / Landmark (Optional)</label>
            </div>

            {/* Total Payable Box */}
            <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "2px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "1.1rem", fontWeight: "700" }}>
                <span>Total Payable on Delivery:</span>
                <span style={{ color: "var(--color-accent-dark)" }}>Rs. {cartTotal.toLocaleString()}</span>
              </div>

              <button type="submit" className="clay-btn accent" style={{ width: "100%" }}>
                Confirm Order via WhatsApp ✦
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
