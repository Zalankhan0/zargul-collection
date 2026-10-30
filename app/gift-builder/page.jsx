"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function GiftBuilderPage() {
  const { products, addToCart, storeConfig, showToast } = useStore();

  const safeProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Selected items inside the Custom Gift Box: map of id -> { item, qty }
  const [boxItems, setBoxItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [recipientName, setRecipientName] = useState("");
  const [customNote, setCustomNote] = useState("");

  const whatsappNumber = storeConfig?.whatsappNumber || "923485245955";

  // Filter real store products by category
  const filteredProducts = useMemo(() => {
    return safeProducts.filter((p) => {
      if (!p || p.inStock === false) return false;
      const cat = (p.category || "").toLowerCase();
      if (activeCategory === "all") return true;
      if (activeCategory === "watches") return cat === "watches" || cat === "timepieces";
      if (activeCategory === "perfumes") return cat === "perfumes" || cat === "fragrances";
      if (activeCategory === "shawls") return cat === "shawls";
      if (activeCategory === "bags") return cat === "bags";
      if (activeCategory === "coats") return cat === "coats" || cat === "wascot";
      if (activeCategory === "shoes") return cat === "shoes";
      return true;
    });
  }, [safeProducts, activeCategory]);

  // Quantity helpers
  const getItemQty = (id) => boxItems[id]?.qty || 0;

  const handleAddItem = (item) => {
    setBoxItems((prev) => {
      const current = prev[item.id];
      const newQty = (current?.qty || 0) + 1;
      return {
        ...prev,
        [item.id]: {
          item,
          qty: newQty
        }
      };
    });
    showToast(`Added ${item.title} (Rs. ${item.price?.toLocaleString()}) to Box!`);
  };

  const handleDecrementItem = (id) => {
    setBoxItems((prev) => {
      const current = prev[id];
      if (!current) return prev;
      if (current.qty <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          qty: current.qty - 1
        }
      };
    });
  };

  // Calculations
  const selectedList = Object.values(boxItems);
  const totalItemCount = selectedList.reduce((sum, entry) => sum + entry.qty, 0);
  const grandTotal = selectedList.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  // WhatsApp Checkout
  const handleWhatsAppCheckout = () => {
    if (totalItemCount === 0) {
      alert("Please add at least one item to your gift box!");
      return;
    }

    let msg = `*Assalam-o-Alaikum Zargul Collection!*\n`;
    msg += `I want to order a *Custom Gift Box* from zargul.net:\n\n`;
    msg += `🎁 *SELECTED ITEMS (${totalItemCount} Items):*\n`;

    selectedList.forEach((entry, idx) => {
      msg += `${idx + 1}. *${entry.item.title}*\n   Qty: ${entry.qty} × Rs. ${entry.item.price.toLocaleString()} = Rs. ${(entry.qty * entry.item.price).toLocaleString()}\n`;
    });

    if (recipientName.trim()) {
      msg += `\n👤 *Recipient Name:* ${recipientName.trim()}\n`;
    }
    if (customNote.trim()) {
      msg += `💌 *Card Message:* "${customNote.trim()}"\n`;
    }

    msg += `\n📦 *Packaging:* Royal Velvet Presentation Box\n`;
    msg += `🚚 *Shipping:* Cash on Delivery (COD) Nationwide\n`;
    msg += `💰 *TOTAL AMOUNT:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    msg += `Please confirm my order!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  // Add Complete Gift Box to Shopping Bag
  const handleAddToCartBundle = () => {
    if (totalItemCount === 0) {
      alert("Please add items to your gift box first!");
      return;
    }

    const itemsSummary = selectedList
      .map((e) => `${e.qty}x ${e.item.title} (Rs. ${(e.item.price * e.qty).toLocaleString()})`)
      .join(" + ");

    const firstItem = selectedList[0]?.item;
    const boxImage = firstItem?.image?.startsWith("/") ? firstItem.image : "/assets/gift_set_combo.jpg";

    const customBoxProduct = {
      id: `giftbox-${Date.now()}`,
      title: `Custom Gift Box (${totalItemCount} Items)`,
      category: "Gift Sets",
      price: grandTotal,
      originalPrice: grandTotal + 1000,
      rating: 5.0,
      reviewsCount: 35,
      image: boxImage,
      tag: "CUSTOM BUNDLE",
      badgeType: "sale",
      cardBg: "pink",
      inStock: true,
      description: `Custom curated gift box containing: ${itemsSummary}.${customNote ? ` Card: "${customNote}"` : ""}`,
      specs: {
        packaging: "Royal Velvet Presentation Box",
        contents: itemsSummary,
        greetingCard: customNote || "Standard Gift",
        recipient: recipientName || "Doorstep COD"
      }
    };

    addToCart(customBoxProduct, "Custom Curated Gift Box", 0, 1);
  };

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "14px 4% 100px" }}>
      {/* COMPACT HEADER */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div className="hero-tag clay-card pink" style={{ display: "inline-flex", padding: "2px 10px", fontSize: "0.7rem", marginBottom: "4px" }}>
          <span>✦ Custom Gift Service</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            fontWeight: "800",
            color: "var(--color-text-dark)",
            margin: "0 0 4px",
            lineHeight: 1.2
          }}
        >
          🎁 Custom Gift Box Builder
        </h1>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0 }}>
          Apni pasand ke items box mein <strong>+</strong> karke add karein. Har click par total price live update hoti rahegi.
        </p>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px", alignItems: "center", justifyContent: "center" }}>
        {[
          { id: "all", label: "All Items" },
          { id: "watches", label: "Watches" },
          { id: "perfumes", label: "Perfumes" },
          { id: "shawls", label: "Shawls" },
          { id: "bags", label: "Bags" },
          { id: "coats", label: "Coats" },
          { id: "shoes", label: "Shoes" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className="clay-btn"
            style={{
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "0.72rem",
              fontWeight: "700",
              background: activeCategory === tab.id ? "var(--color-text-dark)" : "#ffffff",
              color: activeCategory === tab.id ? "#ffffff" : "var(--color-text-dark)",
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ULTRA-COMPACT GRID: 5 ITEMS PER LINE (5 IN A ROW) */}
      <div className="gift-builder-grid">
        {filteredProducts.map((product) => {
          const qty = getItemQty(product.id);
          const isSelected = qty > 0;

          return (
            <div
              key={product.id}
              className="clay-card white"
              style={{
                padding: "5px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: isSelected ? "1.5px solid var(--color-accent)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: isSelected ? "0 4px 12px rgba(240, 142, 167, 0.25)" : "none",
                background: isSelected ? "#fff7fa" : "#ffffff",
                transition: "all 0.15s ease"
              }}
            >
              <div>
                {/* Small Square Image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    marginBottom: "3px",
                    border: "1px solid rgba(0,0,0,0.04)"
                  }}
                >
                  <img
                    src={product.image || "/assets/logo.jpg"}
                    alt={product.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "2px" }}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/logo.jpg";
                    }}
                  />
                </div>

                {/* Category Label */}
                <span
                  style={{
                    fontSize: "0.52rem",
                    fontWeight: "700",
                    color: "var(--color-accent-dark)",
                    textTransform: "uppercase",
                    display: "block",
                    lineHeight: 1
                  }}
                >
                  {product.category}
                </span>

                {/* Truncated Title */}
                <h3
                  style={{
                    fontSize: "0.64rem",
                    fontWeight: "700",
                    color: "var(--color-text-dark)",
                    margin: "2px 0",
                    lineHeight: 1.2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "22px"
                  }}
                  title={product.title}
                >
                  {product.title}
                </h3>
              </div>

              {/* Compact Price & Plus Button */}
              <div style={{ marginTop: "auto", paddingTop: "3px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "800",
                    fontSize: "0.72rem",
                    color: "var(--color-text-dark)",
                    display: "block",
                    marginBottom: "3px",
                    textAlign: "center"
                  }}
                >
                  Rs. {product.price?.toLocaleString()}
                </span>

                {qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => handleAddItem(product)}
                    className="clay-btn accent"
                    style={{
                      width: "100%",
                      padding: "3px 0",
                      borderRadius: "6px",
                      fontSize: "0.66rem",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                      cursor: "pointer"
                    }}
                  >
                    <span>+</span> Add
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ffffff", borderRadius: "6px", padding: "1px 2px", border: "1px solid var(--color-accent)" }}>
                    <button
                      type="button"
                      onClick={() => handleDecrementItem(product.id)}
                      className="clay-icon-btn"
                      style={{ width: "18px", height: "18px", fontSize: "0.7rem", fontWeight: "800", cursor: "pointer", border: "none", background: "transparent" }}
                    >
                      –
                    </button>
                    <span style={{ fontWeight: "800", fontSize: "0.7rem", minWidth: "10px", textAlign: "center", color: "var(--color-accent-dark)" }}>
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddItem(product)}
                      className="clay-icon-btn"
                      style={{ width: "18px", height: "18px", fontSize: "0.7rem", fontWeight: "800", background: "var(--pastel-pink)", cursor: "pointer", border: "none" }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* 2. STICKY FLOATING REAL-TIME PRICE & ACTION BAR                 */}
      {/* Shows live total as customer clicks '+' without scrolling down!  */}
      {/* ================================================================ */}
      {totalItemCount > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(680px, calc(100% - 24px))",
            zIndex: 999,
            background: "rgba(20, 16, 22, 0.94)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "20px",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(240, 142, 167, 0.4)",
            color: "#ffffff",
            animation: "slideUp 0.25s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.4rem" }}>🎁</span>
            <div>
              <span style={{ fontSize: "0.68rem", color: "#f08ea7", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                Box Total ({totalItemCount} {totalItemCount === 1 ? "Item" : "Items"})
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "900", color: "#ffffff" }}>
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("gift-box-final-summary");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "8px 12px",
                borderRadius: "12px",
                fontSize: "0.74rem",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Review Box ↓
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              style={{
                background: "#25d366",
                color: "#ffffff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "12px",
                fontSize: "0.76rem",
                fontWeight: "800",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)"
              }}
            >
              Order on WhatsApp →
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 3. DETAILED BOX SUMMARY & CHECKOUT AT THE BOTTOM                */}
      {/* ================================================================ */}
      <div id="gift-box-final-summary" style={{ marginTop: "40px", maxWidth: "680px", margin: "40px auto 0" }}>
        <div
          className="clay-card white"
          style={{
            padding: "20px",
            borderRadius: "22px",
            border: "1.5px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.06)"
          }}
        >
          {/* Summary Title */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div>
              <span style={{ fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)" }}>
                ✦ Complete Box Summary
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "800", margin: "2px 0 0", color: "var(--color-text-dark)" }}>
                Your Custom Gift Box
              </h3>
            </div>
            <span
              style={{
                background: totalItemCount > 0 ? "var(--color-accent)" : "#eee",
                color: totalItemCount > 0 ? "#ffffff" : "#666",
                padding: "3px 10px",
                borderRadius: "14px",
                fontSize: "0.75rem",
                fontWeight: "800"
              }}
            >
              {totalItemCount} {totalItemCount === 1 ? "Item" : "Items"}
            </span>
          </div>

          {/* Empty State */}
          {totalItemCount === 0 && (
            <div style={{ textAlign: "center", padding: "24px 8px", color: "var(--color-text-muted)" }}>
              <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "6px" }}>🎁</span>
              <p style={{ fontWeight: "700", margin: "0 0 4px", fontSize: "0.88rem", color: "var(--color-text-dark)" }}>
                Box is currently empty
              </p>
              <p style={{ fontSize: "0.76rem", margin: 0, lineHeight: 1.35 }}>
                Upar kisi bhi item par <strong>+ Add</strong> dabayein taaki woh box mein add ho jaye.
              </p>
            </div>
          )}

          {/* Selected Items List */}
          {totalItemCount > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "280px", overflowY: "auto", marginBottom: "16px" }}>
              {selectedList.map((entry) => (
                <div
                  key={entry.item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    background: "#faf9f6",
                    border: "1px solid rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                    <img
                      src={entry.item.image || "/assets/logo.jpg"}
                      alt={entry.item.title}
                      style={{ width: "34px", height: "34px", objectFit: "contain", borderRadius: "6px", background: "#fff", flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: "700", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--color-text-dark)" }}>
                        {entry.item.title}
                      </p>
                      <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                        {entry.qty} × Rs. {entry.item.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "6px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "0.82rem", color: "var(--color-text-dark)", marginRight: "2px" }}>
                      Rs. {(entry.qty * entry.item.price).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDecrementItem(entry.item.id)}
                      className="clay-icon-btn"
                      style={{ width: "22px", height: "22px", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      –
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddItem(entry.item)}
                      className="clay-icon-btn"
                      style={{ width: "22px", height: "22px", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* OPTIONAL NOTE FIELDS */}
          <div style={{ marginBottom: "14px", paddingTop: "10px", borderTop: "1px dashed rgba(0,0,0,0.1)" }}>
            <label style={{ fontSize: "0.72rem", fontWeight: "700", color: "var(--color-text-dark)", display: "block", marginBottom: "4px" }}>
              👤 Recipient Name (Optional):
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. For Muhammad Ali"
              className="clay-input"
              style={{ width: "100%", padding: "7px 10px", borderRadius: "10px", fontSize: "0.78rem", marginBottom: "8px", border: "1px solid rgba(0,0,0,0.1)" }}
            />

            <label style={{ fontSize: "0.72rem", fontWeight: "700", color: "var(--color-text-dark)", display: "block", marginBottom: "4px" }}>
              💌 Special Greeting Message (Optional):
            </label>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Gift card par likhne ke liye koi paigham..."
              rows={2}
              className="clay-input"
              style={{ width: "100%", padding: "7px 10px", borderRadius: "10px", fontSize: "0.78rem", resize: "none", border: "1px solid rgba(0,0,0,0.1)" }}
            />
          </div>

          {/* BREAKDOWN & TOTAL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px", fontSize: "0.78rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
              <span>Selected Items ({totalItemCount}):</span>
              <span style={{ fontWeight: "700", color: "var(--color-text-dark)" }}>Rs. {grandTotal.toLocaleString()}</span>
            </div>

            {/* TOTAL AMOUNT */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                marginTop: "4px",
                borderTop: "1.5px solid rgba(0,0,0,0.08)"
              }}
            >
              <div>
                <span style={{ fontSize: "0.68rem", textTransform: "uppercase", fontWeight: "700", color: "var(--color-accent-dark)" }}>
                  Total Price
                </span>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "900", margin: 0, color: "var(--color-text-dark)" }}>
                  Rs. {grandTotal.toLocaleString()}
                </h4>
              </div>
              <span style={{ fontSize: "0.68rem", background: "#e8f7e6", color: "#2b700f", padding: "3px 8px", borderRadius: "10px", fontWeight: "700" }}>
                Cash on Delivery
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              disabled={totalItemCount === 0}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "14px",
                background: totalItemCount > 0 ? "#25d366" : "#cccccc",
                color: "#ffffff",
                fontSize: "0.88rem",
                fontWeight: "800",
                border: "none",
                cursor: totalItemCount > 0 ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: totalItemCount > 0 ? "0 4px 16px rgba(37, 211, 102, 0.3)" : "none"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2c-5.514 0-9.99 4.478-9.99 9.99 0 1.996.586 3.856 1.597 5.433L2.053 22l4.743-1.222c1.517.931 3.29 1.464 5.235 1.464 5.514 0 9.99-4.478 9.99-9.99 0-5.512-4.476-9.99-9.99-9.99zm5.626 14.18c-.237.666-1.183 1.221-1.74 1.285-.506.059-1.157.085-1.871-.144-1.265-.405-2.228-.962-3.136-1.766-.81-.718-1.51-1.579-1.921-2.453-.306-.65-.411-1.28-.411-1.89 0-1.139.544-1.685.986-2.124.168-.166.368-.242.544-.242.176 0 .346.008.497.017.159.01.36.033.529.418.176.402.604 1.472.656 1.58.05.109.084.235.008.386-.075.151-.118.243-.235.378-.118.134-.244.302-.353.403-.118.109-.244.227-.101.47.143.243.638 1.05 1.378 1.706.958.85 1.764 1.118 2.016 1.243.252.126.395.101.546-.067.151-.168.647-.756.823-1.017.176-.26.353-.218.596-.126.244.092 1.546.73 1.815.865.269.135.445.202.513.319.067.118.067.68-.17 1.347z"/>
              </svg>
              Order Custom Gift Box on WhatsApp
            </button>

            <button
              type="button"
              onClick={handleAddToCartBundle}
              disabled={totalItemCount === 0}
              className="clay-btn secondary"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "14px",
                fontSize: "0.82rem",
                fontWeight: "700",
                cursor: totalItemCount > 0 ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <span>🛍️</span> Add Box to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
