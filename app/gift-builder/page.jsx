"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

// 1. EXCLUSIVE GIFT-ONLY ITEMS (Chocolates & Small Add-ons)
// NOTE: These items are EXCLUSIVELY defined on this page and NEVER in regular product listings!
const EXCLUSIVE_GIFT_ADDONS = [
  {
    id: "addon-ferrero-8",
    title: "Ferrero Rocher Royal Chocolates (8 Pcs)",
    category: "Gourmet Chocolates",
    price: 850,
    emoji: "🍫",
    badge: "Exclusive Gift Treat",
    description: "Crisp hazelnut pralines with whole roasted hazelnut center, wrapped in signature golden foil."
  },
  {
    id: "addon-silk-almond",
    title: "Cadbury Dairy Milk Silk Roasted Almond",
    category: "Gourmet Chocolates",
    price: 450,
    emoji: "🍫",
    badge: "Sweet Indulgence",
    description: "Velvety smooth imported milk chocolate bar enriched with crunchy roasted almond chunks."
  },
  {
    id: "addon-swiss-truffles",
    title: "Swiss Artisan Dark Cocoa Truffles",
    category: "Gourmet Chocolates",
    price: 650,
    emoji: "🍫",
    badge: "Swiss Delight",
    description: "Handcrafted dark chocolate ganache coated in pure unsweetened cocoa dust."
  },
  {
    id: "addon-calligraphy-card",
    title: "Personalized Calligraphy Greeting Card",
    category: "Personal Keepsake",
    price: 200,
    emoji: "💌",
    badge: "Handwritten Note",
    description: "Bespoke handwritten Urdu or English calligraphy message on thick gold-embossed cardstock."
  },
  {
    id: "addon-scented-candle",
    title: "French Lavender & Oud Aromatherapy Candle",
    category: "Fragrant Luxury",
    price: 550,
    emoji: "🕯️",
    badge: "Soy Wax Aroma",
    description: "Hand-poured 100% soy candle in a frosted glass jar with gold lid for a soothing atmosphere."
  },
  {
    id: "addon-pocket-attar",
    title: "Royal Dehn Al Oud Pocket Attar (6ml)",
    category: "Pure Essence",
    price: 350,
    emoji: "✨",
    badge: "Pure Non-Alcoholic",
    description: "Traditional pure concentrated oriental fragrance oil in an ornate crystal flacon."
  },
  {
    id: "addon-golden-pen",
    title: "Executive Golden Signature Pen",
    category: "Executive Keepsake",
    price: 400,
    emoji: "✒️",
    badge: "Metallic Gold",
    description: "Weighted metallic brass rollerball pen in an obsidian black velvet presentation sleeve."
  },
  {
    id: "addon-ribbon-seal",
    title: "Satin Ribbon & Embossed Wax Crest Finish",
    category: "Presentation Upgrade",
    price: 300,
    emoji: "🎀",
    badge: "Royal Wax Crest",
    description: "Rich emerald green or royal navy satin bow with hand-stamped gold Zargul wax crest."
  }
];

export default function GiftBuilderPage() {
  const { products, addToCart, storeConfig, showToast } = useStore();

  const safeProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Selected items inside the Custom Gift Box: map of id -> { item, qty, type: 'main' | 'exclusive' }
  const [boxItems, setBoxItems] = useState({});
  const [activeMainCategory, setActiveMainCategory] = useState("all");
  const [recipientName, setRecipientName] = useState("");
  const [customNote, setCustomNote] = useState("");

  const whatsappNumber = storeConfig?.whatsappNumber || "923485245955";

  // Filter main products by category
  const filteredMainProducts = useMemo(() => {
    return safeProducts.filter((p) => {
      if (!p || p.inStock === false) return false;
      const cat = (p.category || "").toLowerCase();
      if (activeMainCategory === "all") return true;
      if (activeMainCategory === "watches") return cat === "watches" || cat === "timepieces";
      if (activeMainCategory === "perfumes") return cat === "perfumes" || cat === "fragrances";
      if (activeMainCategory === "shawls") return cat === "shawls";
      if (activeMainCategory === "bags") return cat === "bags";
      return true;
    });
  }, [safeProducts, activeMainCategory]);

  // Quantity helpers
  const getItemQty = (id) => boxItems[id]?.qty || 0;

  const handleAddItem = (item, type) => {
    setBoxItems((prev) => {
      const current = prev[item.id];
      const newQty = (current?.qty || 0) + 1;
      return {
        ...prev,
        [item.id]: {
          item,
          type,
          qty: newQty
        }
      };
    });
    showToast(`Added ${item.title} to Gift Box!`);
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

  const handleRemoveItem = (id) => {
    setBoxItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Calculations
  const selectedList = Object.values(boxItems);
  const totalItemCount = selectedList.reduce((sum, entry) => sum + entry.qty, 0);

  const mainItemsTotal = selectedList
    .filter((entry) => entry.type === "main")
    .reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  const addonsTotal = selectedList
    .filter((entry) => entry.type === "exclusive")
    .reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  const grandTotal = mainItemsTotal + addonsTotal;

  // Build WhatsApp Order Link
  const handleWhatsAppCheckout = () => {
    if (totalItemCount === 0) {
      alert("Please add at least one item or exclusive treat to your gift box!");
      return;
    }

    let msg = `*Assalam-o-Alaikum Zargul Collection!*\n`;
    msg += `I would like to order a *Custom Luxury Gift Box* from zargul.net:\n\n`;
    msg += `🎁 *GIFT BOX CONTENTS (${totalItemCount} Items):*\n`;

    selectedList.forEach((entry, idx) => {
      const tag = entry.type === "exclusive" ? "[Exclusive Gift Treat]" : "[Main Luxury]";
      msg += `${idx + 1}. *${entry.item.title}* ${tag}\n   Qty: ${entry.qty} × Rs. ${entry.item.price.toLocaleString()} = Rs. ${(entry.qty * entry.item.price).toLocaleString()}\n`;
    });

    if (recipientName.trim()) {
      msg += `\n👤 *Recipient Name:* ${recipientName.trim()}\n`;
    }
    if (customNote.trim()) {
      msg += `💌 *Personalized Greeting Message:* "${customNote.trim()}"\n`;
    }

    msg += `\n📦 *Packaging:* Royal Velvet Gift Presentation Box (Free)\n`;
    msg += `🚚 *Shipping:* FREE Cash on Delivery (COD) Nationwide\n`;
    msg += `💰 *TOTAL PRICE:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    msg += `Please confirm my custom gift box order!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  // Add Complete Gift Box to Site Cart
  const handleAddToCartBundle = () => {
    if (totalItemCount === 0) {
      alert("Please add items to your gift box before adding to cart!");
      return;
    }

    const itemsSummary = selectedList
      .map((e) => `${e.qty}x ${e.item.title} (Rs. ${e.item.price * e.qty})`)
      .join(" + ");

    // Pick a featured image from selected items or fallback
    const firstMain = selectedList.find((e) => e.type === "main" && e.item.image?.startsWith("/"));
    const boxImage = firstMain ? firstMain.item.image : "/assets/gift_set_combo.jpg";

    const customBoxProduct = {
      id: `giftbox-${Date.now()}`,
      title: `Custom Gift Box (${totalItemCount} Items)`,
      category: "Gift Sets",
      price: grandTotal,
      originalPrice: grandTotal + 1000,
      rating: 5.0,
      reviewsCount: 42,
      image: boxImage,
      tag: "CUSTOM BUNDLE",
      badgeType: "sale",
      cardBg: "pink",
      inStock: true,
      description: `Custom curated gift box containing: ${itemsSummary}.${customNote ? ` Card Note: "${customNote}"` : ""}`,
      specs: {
        packaging: "Royal Velvet Presentation Box",
        contents: itemsSummary,
        greetingCard: customNote || "Standard Greetings",
        recipient: recipientName || "Doorstep Delivery"
      }
    };

    addToCart(customBoxProduct, "Custom Curated Gift Box", 0, 1);
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 5% 60px" }}>
      {/* HEADER SECTION */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div className="hero-tag clay-card pink" style={{ display: "inline-flex", marginBottom: "12px" }}>
          <span>✦ Bespoke Royal Gifting Service</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: "800",
            color: "var(--color-text-dark)",
            marginBottom: "12px",
            lineHeight: 1.2
          }}
        >
          🎁 Custom Gift Box Builder
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-muted)",
            maxWidth: "720px",
            margin: "0 auto",
            lineHeight: 1.5
          }}
        >
          Curate a one-of-a-kind luxury gift box. Pair our executive watches and French fragrances with{" "}
          <strong>exclusive gourmet chocolates, scented candles, and personalized calligraphy notes</strong>.
        </p>

        {/* TRUST BADGES ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginTop: "16px"
          }}
        >
          <span style={{ fontSize: "0.82rem", background: "#ffffff", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", fontWeight: "600", color: "#2b700f" }}>
            ✓ Free Royal Velvet Box Included
          </span>
          <span style={{ fontSize: "0.82rem", background: "#ffffff", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", fontWeight: "600", color: "#2b700f" }}>
            ✓ Free Cash on Delivery Nationwide
          </span>
          <span style={{ fontSize: "0.82rem", background: "#ffffff", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", fontWeight: "600", color: "#5c3c67" }}>
            ✓ 100% Doorstep Inspection Allowed
          </span>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: BUILDER SECTIONS (LEFT) & LIVE SUMMARY (RIGHT) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", alignItems: "start" }}>

        {/* LEFT COLUMN: PRODUCTS & EXCLUSIVE ADD-ONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* ======================================================== */}
          {/* SECTION 1: EXCLUSIVE GIFT-ONLY ITEMS (CHOCOLATES & ADD-ONS) */}
          {/* ======================================================== */}
          <div
            className="clay-card pink"
            style={{
              padding: "24px",
              borderRadius: "28px",
              border: "2px solid rgba(240, 142, 167, 0.4)",
              background: "linear-gradient(135deg, #fff7fa 0%, #faedf3 100%)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.8rem" }}>🍫</span>
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--color-accent-dark)",
                    background: "rgba(240, 142, 167, 0.25)",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    display: "inline-block"
                  }}
                >
                  ✦ Strictly Gift-Only Exclusives
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: "800",
                    color: "var(--color-text-dark)",
                    margin: "4px 0 0"
                  }}
                >
                  Gourmet Chocolates &amp; Small Add-ons
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--color-text-muted)", marginBottom: "20px", lineHeight: 1.4 }}>
              These premium treats and keepsakes are <strong>exclusive to the Gift Builder</strong> and cannot be purchased individually on regular store pages. Tap <strong>+</strong> to add them to your box.
            </p>

            {/* EXCLUSIVE ITEMS GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px"
              }}
            >
              {EXCLUSIVE_GIFT_ADDONS.map((addon) => {
                const qty = getItemQty(addon.id);
                const isSelected = qty > 0;

                return (
                  <div
                    key={addon.id}
                    className="clay-card white"
                    style={{
                      padding: "16px",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      border: isSelected ? "2px solid var(--color-accent)" : "1px solid rgba(0,0,0,0.06)",
                      boxShadow: isSelected ? "0 8px 24px rgba(240, 142, 167, 0.3)" : "none",
                      position: "relative",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div>
                      {/* Top Header: Badge + Price */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: "700",
                            background: "var(--pastel-pink)",
                            color: "var(--color-accent-dark)",
                            padding: "3px 8px",
                            borderRadius: "12px"
                          }}
                        >
                          {addon.badge}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: "800",
                            fontSize: "1.05rem",
                            color: "var(--color-accent-dark)"
                          }}
                        >
                          Rs. {addon.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0" }}>
                        <span
                          style={{
                            fontSize: "1.8rem",
                            width: "44px",
                            height: "44px",
                            background: "#fff5f8",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}
                        >
                          {addon.emoji}
                        </span>
                        <div>
                          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", margin: 0, color: "var(--color-text-dark)", lineHeight: 1.25 }}>
                            {addon.title}
                          </h3>
                          <span style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>
                            {addon.category}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: "6px 0 14px", lineHeight: 1.35 }}>
                        {addon.description}
                      </p>
                    </div>

                    {/* PRICE & PLUS (+) SYSTEM */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "10px", borderTop: "1px dashed rgba(0,0,0,0.08)" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#444" }}>
                        {qty > 0 ? `${qty} in Box (Rs. ${(qty * addon.price).toLocaleString()})` : "Rate: Rs. " + addon.price.toLocaleString()}
                      </span>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddItem(addon, "exclusive")}
                          className="clay-btn accent"
                          style={{
                            padding: "6px 14px",
                            borderRadius: "14px",
                            fontSize: "0.82rem",
                            fontWeight: "700",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            cursor: "pointer"
                          }}
                        >
                          <span>+</span> Add
                        </button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={() => handleDecrementItem(addon.id)}
                            className="clay-icon-btn"
                            style={{ width: "30px", height: "30px", fontSize: "1rem", fontWeight: "800", cursor: "pointer" }}
                          >
                            –
                          </button>
                          <span style={{ fontWeight: "800", fontSize: "0.9rem", minWidth: "18px", textAlign: "center" }}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddItem(addon, "exclusive")}
                            className="clay-icon-btn"
                            style={{ width: "30px", height: "30px", fontSize: "1rem", fontWeight: "800", background: "var(--pastel-pink)", cursor: "pointer" }}
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
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: CHOOSE MAIN LUXURY GIFTS (WATCHES, PERFUMES, ETC.) */}
          {/* ======================================================== */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div>
                <span className="hero-tag" style={{ fontSize: "0.72rem", padding: "4px 12px" }}>
                  ✦ Step 2: Main Luxury Pieces
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: "800", color: "var(--color-text-dark)", margin: "4px 0 0" }}>
                  Select Watches, Perfumes &amp; Accessories
                </h2>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: "4px 0 0" }}>
                  Choose high-end centerpieces to place alongside your chocolates and calligraphy card.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { id: "all", label: "All Items" },
                  { id: "watches", label: "Watches" },
                  { id: "perfumes", label: "Perfumes" },
                  { id: "shawls", label: "Shawls" },
                  { id: "bags", label: "Bags" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveMainCategory(tab.id)}
                    className="clay-btn"
                    style={{
                      padding: "6px 14px",
                      borderRadius: "16px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      background: activeMainCategory === tab.id ? "var(--color-text-dark)" : "#ffffff",
                      color: activeMainCategory === tab.id ? "#ffffff" : "var(--color-text-dark)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      cursor: "pointer"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN PRODUCTS GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px"
              }}
            >
              {filteredMainProducts.slice(0, 16).map((product) => {
                const qty = getItemQty(product.id);
                const isSelected = qty > 0;

                return (
                  <div
                    key={product.id}
                    className="clay-card white"
                    style={{
                      padding: "14px",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      border: isSelected ? "2px solid var(--color-accent)" : "1px solid rgba(0,0,0,0.06)",
                      boxShadow: isSelected ? "0 8px 24px rgba(240, 142, 167, 0.25)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div>
                      {/* Product Thumbnail */}
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          borderRadius: "14px",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          marginBottom: "10px",
                          border: "1px solid rgba(0,0,0,0.05)"
                        }}
                      >
                        <img
                          src={product.image || "/assets/logo.jpg"}
                          alt={product.title}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/logo.jpg";
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: "700",
                          color: "var(--color-accent-dark)",
                          textTransform: "uppercase"
                        }}
                      >
                        {product.category}
                      </span>
                      <h4
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: "700",
                          color: "var(--color-text-dark)",
                          margin: "2px 0 6px",
                          lineHeight: 1.3
                        }}
                      >
                        {product.title}
                      </h4>
                    </div>

                    {/* Price and Plus Button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <div>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "0.95rem", color: "var(--color-text-dark)", display: "block" }}>
                          Rs. {product.price?.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span style={{ fontSize: "0.72rem", color: "#999", textDecoration: "line-through" }}>
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddItem(product, "main")}
                          className="clay-btn accent"
                          style={{
                            padding: "6px 12px",
                            borderRadius: "12px",
                            fontSize: "0.78rem",
                            fontWeight: "700",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer"
                          }}
                        >
                          <span>+</span> Add
                        </button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <button
                            type="button"
                            onClick={() => handleDecrementItem(product.id)}
                            className="clay-icon-btn"
                            style={{ width: "26px", height: "26px", fontSize: "0.9rem", fontWeight: "800", cursor: "pointer" }}
                          >
                            –
                          </button>
                          <span style={{ fontWeight: "800", fontSize: "0.85rem", minWidth: "16px", textAlign: "center" }}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddItem(product, "main")}
                            className="clay-icon-btn"
                            style={{ width: "26px", height: "26px", fontSize: "0.9rem", fontWeight: "800", background: "var(--pastel-pink)", cursor: "pointer" }}
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
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME GIFT BOX SUMMARY (STICKY) */}
        <div style={{ position: "sticky", top: "90px" }}>
          <div
            className="clay-card white"
            style={{
              padding: "24px",
              borderRadius: "28px",
              border: "2px solid rgba(0,0,0,0.06)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.06)"
            }}
          >
            {/* Summary Title */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <div>
                <span style={{ fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)" }}>
                  ✦ Live Box Summary
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: "800", margin: "2px 0 0", color: "var(--color-text-dark)" }}>
                  Your Custom Gift Box
                </h3>
              </div>
              <span
                style={{
                  background: totalItemCount > 0 ? "var(--color-accent)" : "#eee",
                  color: totalItemCount > 0 ? "#ffffff" : "#666",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "800"
                }}
              >
                {totalItemCount} {totalItemCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Empty State */}
            {totalItemCount === 0 && (
              <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--color-text-muted)" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "10px" }}>🎁</span>
                <p style={{ fontWeight: "700", margin: "0 0 6px", color: "var(--color-text-dark)" }}>
                  Your Gift Box is Empty
                </p>
                <p style={{ fontSize: "0.82rem", margin: 0, lineHeight: 1.4 }}>
                  Click <strong>+ Add</strong> on chocolates, cards, watches, or perfumes to build your custom gift set.
                </p>
              </div>
            )}

            {/* Selected Items List */}
            {totalItemCount > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "280px", overflowY: "auto", marginBottom: "20px", paddingRight: "4px" }}>
                {selectedList.map((entry) => (
                  <div
                    key={entry.item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "14px",
                      background: entry.type === "exclusive" ? "#fff7fa" : "#faf9f6",
                      border: entry.type === "exclusive" ? "1px solid rgba(240, 142, 167, 0.3)" : "1px solid rgba(0,0,0,0.05)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                        {entry.item.emoji || "✦"}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: "700", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--color-text-dark)" }}>
                          {entry.item.title}
                        </p>
                        <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                          {entry.qty} × Rs. {entry.item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "0.85rem", color: "var(--color-text-dark)", marginRight: "4px" }}>
                        Rs. {(entry.qty * entry.item.price).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDecrementItem(entry.item.id)}
                        className="clay-icon-btn"
                        style={{ width: "22px", height: "22px", fontSize: "0.75rem", cursor: "pointer" }}
                        title="Decrease"
                      >
                        –
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddItem(entry.item, entry.type)}
                        className="clay-icon-btn"
                        style={{ width: "22px", height: "22px", fontSize: "0.75rem", cursor: "pointer" }}
                        title="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PERSONALIZATION FIELDS */}
            <div style={{ marginBottom: "20px", paddingTop: "14px", borderTop: "1px dashed rgba(0,0,0,0.1)" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--color-text-dark)", display: "block", marginBottom: "6px" }}>
                👤 Recipient Name (Optional):
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. For Muhammad Ali"
                className="clay-input"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "14px", fontSize: "0.85rem", marginBottom: "12px", border: "1px solid rgba(0,0,0,0.1)" }}
              />

              <label style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--color-text-dark)", display: "block", marginBottom: "6px" }}>
                💌 Calligraphy Card Message (Optional):
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Write your heartfelt wish or message to be penned on the card..."
                rows={2}
                className="clay-input"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "14px", fontSize: "0.85rem", resize: "none", border: "1px solid rgba(0,0,0,0.1)" }}
              />
            </div>

            {/* PRICE BREAKDOWN TABLE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", fontSize: "0.84rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
                <span>Main Luxury Pieces:</span>
                <span style={{ fontWeight: "700", color: "var(--color-text-dark)" }}>Rs. {mainItemsTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
                <span>Exclusive Chocolates &amp; Add-ons:</span>
                <span style={{ fontWeight: "700", color: "var(--color-text-dark)" }}>Rs. {addonsTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
                <span>Royal Velvet Packaging:</span>
                <span style={{ fontWeight: "700", color: "#2b700f" }}>FREE Included</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)" }}>
                <span>Nationwide COD Shipping:</span>
                <span style={{ fontWeight: "700", color: "#2b700f" }}>FREE</span>
              </div>

              {/* GRAND TOTAL */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  marginTop: "6px",
                  borderTop: "2px solid rgba(0,0,0,0.08)"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700", color: "var(--color-accent-dark)" }}>
                    Total Amount
                  </span>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: "900", margin: 0, color: "var(--color-text-dark)" }}>
                    Rs. {grandTotal.toLocaleString()}
                  </h4>
                </div>
                <span style={{ fontSize: "0.72rem", background: "#e8f7e6", color: "#2b700f", padding: "4px 10px", borderRadius: "12px", fontWeight: "700" }}>
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* CHECKOUT ACTION BUTTONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* PRIMARY CTA: WHATSAPP ORDER */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                disabled={totalItemCount === 0}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "18px",
                  background: totalItemCount > 0 ? "#25d366" : "#cccccc",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  border: "none",
                  cursor: totalItemCount > 0 ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: totalItemCount > 0 ? "0 8px 24px rgba(37, 211, 102, 0.35)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2c-5.514 0-9.99 4.478-9.99 9.99 0 1.996.586 3.856 1.597 5.433L2.053 22l4.743-1.222c1.517.931 3.29 1.464 5.235 1.464 5.514 0 9.99-4.478 9.99-9.99 0-5.512-4.476-9.99-9.99-9.99zm5.626 14.18c-.237.666-1.183 1.221-1.74 1.285-.506.059-1.157.085-1.871-.144-1.265-.405-2.228-.962-3.136-1.766-.81-.718-1.51-1.579-1.921-2.453-.306-.65-.411-1.28-.411-1.89 0-1.139.544-1.685.986-2.124.168-.166.368-.242.544-.242.176 0 .346.008.497.017.159.01.36.033.529.418.176.402.604 1.472.656 1.58.05.109.084.235.008.386-.075.151-.118.243-.235.378-.118.134-.244.302-.353.403-.118.109-.244.227-.101.47.143.243.638 1.05 1.378 1.706.958.85 1.764 1.118 2.016 1.243.252.126.395.101.546-.067.151-.168.647-.756.823-1.017.176-.26.353-.218.596-.126.244.092 1.546.73 1.815.865.269.135.445.202.513.319.067.118.067.68-.17 1.347z"/>
                </svg>
                Order Custom Gift Box on WhatsApp
              </button>

              {/* SECONDARY CTA: ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCartBundle}
                disabled={totalItemCount === 0}
                className="clay-btn secondary"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "18px",
                  fontSize: "0.88rem",
                  fontWeight: "700",
                  cursor: totalItemCount > 0 ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <span>🛍️</span> Add Box to Shopping Bag
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
