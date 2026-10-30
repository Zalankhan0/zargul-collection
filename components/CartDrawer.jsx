"use client";

import React, { useState, useEffect } from "react";
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

  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" on open | "cod" on form view
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Swat",
    customCity: "",
    address: "",
    notes: ""
  });

  // Whenever the drawer opens or re-opens, always reset to the cart items view
  useEffect(() => {
    if (isCartOpen) {
      setCheckoutStep("cart");
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setCheckoutStep("cart");
    setIsCartOpen(false);
  };

  // Direct WhatsApp Checkout from Cart with user-adjusted quantities
  const handleDirectWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `🛍️ *ORDER VIA WHATSAPP (ZARGUL COLLECTION)*\n`;
    msg += `*Order Ref:* ${orderId}\n`;
    msg += `*Date:* ${new Date().toLocaleDateString("en-GB")}\n\n`;

    msg += `📦 *SELECTED ITEMS:*\n`;
    cart.forEach((item, idx) => {
      const itemPrice = (item.product.price + (item.extraPrice || 0)) * item.quantity;
      const variantStr = item.variant ? ` (${item.variant})` : "";
      msg += `${idx + 1}. *${item.product.title}*${variantStr} x${item.quantity} — Rs. ${itemPrice.toLocaleString()}\n`;
    });

    msg += `\n💰 *ORDER SUMMARY:*\n`;
    msg += `• Subtotal: Rs. ${cartSubtotal.toLocaleString()}\n`;
    if (comboDiscount > 0) {
      msg += `• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()}\n`;
    }
    if (multiWatchDiscount > 0) {
      msg += `• ⌚ Multi-Watch Deal: -Rs. ${multiWatchDiscount.toLocaleString()} (${multiWatchTierLabel})\n`;
    }
    msg += `• Delivery: Cash on Delivery (Standard Charges)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔥 *TOTAL PAYABLE:* Rs. ${cartTotal.toLocaleString()} + Delivery Charges (COD)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Assalam o Alaikum! I would like to confirm my order for these items. Please share dispatch details and delivery timeline. ✨`;

    showToast(`Opening WhatsApp with your bag details...`);

    clearCart();
    setCheckoutStep("cart");
    setIsCartOpen(false);

    const waNumber = (storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    try {
      window.location.href = waUrl;
    } catch {
      window.open(waUrl, "_blank");
    }
  };

  // COD Form Submit
  const handleCODSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalCity = formData.city === "Other" ? (formData.customCity?.trim() || "Other City") : formData.city;

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
      msg += `• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()}\n`;
    }
    if (multiWatchDiscount > 0) {
      msg += `• ⌚ Multi-Watch Deal: -Rs. ${multiWatchDiscount.toLocaleString()} (${multiWatchTierLabel})\n`;
    }
    msg += `• Delivery: Cash on Delivery (Standard Charges)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🔥 *TOTAL PAYABLE:* Rs. ${cartTotal.toLocaleString()} + Delivery Charges (COD)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `Please confirm my order dispatch! ✨`;

    showToast(`Order ${orderId} placed! Redirecting to WhatsApp...`);

    clearCart();
    setCheckoutStep("cart");
    setIsCartOpen(false);

    const waNumber = (storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    try {
      window.location.href = waUrl;
    } catch {
      window.open(waUrl, "_blank");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="cart-overlay" onClick={handleClose} />

      {/* Mini Bag Drawer */}
      <div className="cart-drawer-slider clay-card white">
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "750", margin: 0, color: "var(--color-text-dark)" }}>
              {checkoutStep === "cart" ? "Your Shopping Bag" : "Cash on Delivery Checkout"}
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {checkoutStep === "cart" ? `${cart.length} item${cart.length !== 1 ? "s" : ""} selected` : "Fill delivery details to confirm"}
            </span>
          </div>

          <button
            className="clay-icon-btn"
            onClick={handleClose}
            aria-label="Close Bag"
            style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.08)", background: "#f5f3f4", cursor: "pointer", fontSize: "0.9rem" }}
          >
            ✕
          </button>
        </div>

        {checkoutStep === "cart" ? (
          <>
            {/* Items List */}
            <div className="cart-items-list" style={{ flexGrow: 1, overflowY: "auto", margin: "10px 0", paddingRight: "4px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "50px 20px", color: "var(--color-text-muted)" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "12px" }}>🛍️</span>
                  <p style={{ fontSize: "0.92rem", fontWeight: "600", marginBottom: "16px" }}>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="clay-btn accent"
                    style={{ padding: "8px 18px", fontSize: "0.82rem", borderRadius: "10px" }}
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const unitPrice = item.product.price + (item.extraPrice || 0);
                  return (
                    <div
                      key={`${item.product.id}-${item.variant}-${idx}`}
                      className="cart-item-card"
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "10px 12px",
                        borderRadius: "14px",
                        marginBottom: "10px",
                        background: "#ffffff",
                        border: "1px solid rgba(0,0,0,0.06)",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={item.product.image?.startsWith("/") || item.product.image?.startsWith("http") ? item.product.image : `/${item.product.image}`}
                        alt={item.product.title}
                        className="cart-item-thumb"
                        style={{ width: "54px", height: "54px", borderRadius: "10px", objectFit: "contain", background: "#faf9f6", padding: "2px" }}
                        onError={(e) => { e.currentTarget.src = "/assets/logo.jpg"; }}
                      />

                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: "700", margin: "0 0 2px", color: "var(--color-text-dark)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.product.title}
                        </h4>
                        {item.variant && (
                          <span style={{ fontSize: "0.68rem", color: "var(--color-accent-dark)", fontWeight: "600", display: "block" }}>
                            • {item.variant}
                          </span>
                        )}
                        <div style={{ fontWeight: "750", color: "var(--color-text-dark)", fontSize: "0.85rem", marginTop: "2px" }}>
                          Rs. {(unitPrice * item.quantity).toLocaleString()}
                        </div>

                        {/* Quantity (+ / -) Controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                          <button
                            type="button"
                            className="clay-icon-btn"
                            style={{
                              width: "28px",
                              height: "28px",
                              fontSize: "1rem",
                              fontWeight: "750",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                              border: "1px solid rgba(0,0,0,0.12)",
                              background: "#f6f4f5",
                              cursor: "pointer"
                            }}
                            onClick={() => updateCartQty(idx, -1)}
                            title="Decrease quantity"
                          >
                            -
                          </button>
                          <span style={{ fontSize: "0.88rem", fontWeight: "800", minWidth: "18px", textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="clay-icon-btn"
                            style={{
                              width: "28px",
                              height: "28px",
                              fontSize: "1rem",
                              fontWeight: "750",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                              border: "1px solid rgba(0,0,0,0.12)",
                              background: "#f6f4f5",
                              cursor: "pointer"
                            }}
                            onClick={() => updateCartQty(idx, 1)}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#9e9aa0",
                          cursor: "pointer",
                          fontSize: "1rem",
                          padding: "6px"
                        }}
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
              <div style={{ padding: "8px 12px", background: "var(--pastel-pink)", borderRadius: "12px", fontSize: "0.78rem", fontWeight: "700", color: "var(--brand-purple)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>👑</span>
                <span>Royal Combo Deal: -Rs. {comboDiscount.toLocaleString()} Saved!</span>
              </div>
            )}

            {multiWatchDiscount > 0 && (
              <div style={{ padding: "8px 12px", background: "linear-gradient(135deg, #fff0f5, #fde4eb)", border: "1px solid var(--color-accent)", borderRadius: "12px", fontSize: "0.78rem", fontWeight: "700", color: "var(--color-accent-dark)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>⌚</span>
                <span>{multiWatchTierLabel} Unlocked! (-Rs. {multiWatchDiscount.toLocaleString()})</span>
              </div>
            )}

            {/* Summary & Actions */}
            {cart.length > 0 && (
              <div style={{ paddingTop: "10px", borderTop: "1.5px solid rgba(0,0,0,0.06)", marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>Subtotal</span>
                  <span style={{ fontWeight: "600" }}>Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {comboDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.85rem", color: "var(--color-accent-dark)", fontWeight: "600" }}>
                    <span>Royal Combo Discount</span>
                    <span>- Rs. {comboDiscount.toLocaleString()}</span>
                  </div>
                )}

                {multiWatchDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.85rem", color: "var(--color-accent-dark)", fontWeight: "600" }}>
                    <span>Multi-Watch Tier Discount</span>
                    <span>- Rs. {multiWatchDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>Delivery</span>
                  <span style={{ color: "var(--color-text-dark)", fontWeight: "600" }}>Cash on Delivery (Standard Charges)</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "1.15rem", fontWeight: "800", fontFamily: "var(--font-display)" }}>
                  <span>Total</span>
                  <span style={{ color: "var(--color-accent-dark)" }}>Rs. {cartTotal.toLocaleString()}</span>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {/* MAIN ACTION: ORDER VIA WHATSAPP */}
                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={handleDirectWhatsAppCheckout}
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "0.92rem",
                      fontWeight: "750",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                      background: "#25d366",
                      color: "#ffffff",
                      border: "none",
                      boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
                      transition: "transform 0.15s ease"
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 2c-5.514 0-9.99 4.478-9.99 9.99 0 1.996.586 3.856 1.597 5.433L2.053 22l4.743-1.222c1.517.931 3.29 1.464 5.235 1.464 5.514 0 9.99-4.478 9.99-9.99 0-5.512-4.476-9.99-9.99-9.99zm5.626 14.18c-.237.666-1.183 1.221-1.74 1.285-.506.059-1.157.085-1.871-.144-1.265-.405-2.228-.962-3.136-1.766-.81-.718-1.51-1.579-1.921-2.453-.306-.65-.411-1.28-.411-1.89 0-1.139.544-1.685.986-2.124.168-.166.368-.242.544-.242.176 0 .346.008.497.017.159.01.36.033.529.418.176.402.604 1.472.656 1.58.05.109.084.235.008.386-.075.151-.118.243-.235.378-.118.134-.244.302-.353.403-.118.109-.244.227-.101.47.143.243.638 1.05 1.378 1.706.958.85 1.764 1.118 2.016 1.243.252.126.395.101.546-.067.151-.168.647-.756.823-1.017.176-.26.353-.218.596-.126.244.092 1.546.73 1.815.865.269.135.445.202.513.319.067.118.067.68-.17 1.347z"/>
                    </svg>
                    Order via WhatsApp
                  </button>

                  {/* SECONDARY OPTION: COD FORM */}
                  <button
                    type="button"
                    disabled={cart.length === 0}
                    onClick={() => setCheckoutStep("cod")}
                    className="clay-btn secondary"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer",
                      background: "#fdfaf3",
                      border: "1px solid rgba(197, 160, 89, 0.4)",
                      color: "var(--color-text-dark)"
                    }}
                  >
                    <span>📝</span> Fill Delivery Form (COD)
                  </button>

                  {/* CONTINUE SHOPPING */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="clay-btn secondary"
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      cursor: "pointer"
                    }}
                  >
                    ← Continue Shopping (Add More)
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* COD Form Step */
          <form onSubmit={handleCODSubmit} style={{ flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <button
                type="button"
                onClick={() => setCheckoutStep("cart")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-accent-dark)",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                ← Back to Shopping Bag
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppCheckout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#16a34a",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Skip Form &amp; WhatsApp →
              </button>
            </div>

            <div style={{ padding: "10px 12px", background: "var(--pastel-green)", borderRadius: "12px", fontSize: "0.78rem", color: "#1e6c06", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🛡️</span>
              <span><strong>Cash on Delivery (COD)</strong> • Fill details below to place order!</span>
            </div>

            <div className="floating-group" style={{ marginBottom: "12px" }}>
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

            <div className="floating-group" style={{ marginBottom: "12px" }}>
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

            <div className="floating-group" style={{ marginBottom: "12px" }}>
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
              <div className="floating-group" style={{ marginBottom: "12px", animation: "slideInUp 0.25s ease" }}>
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

            <div className="floating-group" style={{ marginBottom: "12px" }}>
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

            <div className="floating-group" style={{ marginBottom: "14px" }}>
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
            <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1.5px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "1.05rem", fontWeight: "800" }}>
                <span>Total Payable (COD):</span>
                <span style={{ color: "var(--color-accent-dark)" }}>Rs. {cartTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="clay-btn accent"
                style={{
                  width: "100%",
                  padding: "11px",
                  fontSize: "0.88rem",
                  fontWeight: "750",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
                  color: "#ffffff",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(197, 160, 89, 0.35)",
                  cursor: "pointer"
                }}
              >
                Confirm Order via WhatsApp ✦
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
