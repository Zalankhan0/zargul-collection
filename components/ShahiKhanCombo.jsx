"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function ShahiKhanCombo() {
  const { products, addToCart, isVaultUnlocked, storeConfig } = useStore();
  const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");

  // Real store inventory fallback
  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real inventory filtering
  const tier1Products = allProducts.filter((p) => p.category === "Coats" || p.category === "Shawls");
  const tier2Products = allProducts.filter(
    (p) => p.category === "Watches" || p.category === "Perfumes" || p.category === "Fragrances"
  );
  const tier3Products = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );

  // Subcategory filters
  const [tier1Filter, setTier1Filter] = useState("all");
  const [tier2Filter, setTier2Filter] = useState("all");
  const [tier3Filter, setTier3Filter] = useState("all");

  const filteredTier1 = tier1Products.filter((p) => {
    if (tier1Filter === "coats") return p.category === "Coats";
    if (tier1Filter === "shawls") return p.category === "Shawls";
    return true;
  });

  const filteredTier2 = tier2Products.filter((p) => {
    if (tier2Filter === "perfumes") return p.category === "Perfumes" || p.category === "Fragrances";
    if (tier2Filter === "watches") return p.category === "Watches";
    return true;
  });

  const filteredTier3 = tier3Products.filter((p) => {
    if (tier3Filter === "chappals") return p.category === "Peshawari Chappals";
    if (tier3Filter === "shoes") return p.category === "Footwear" && (p.title.includes("Boots") || p.title.includes("Shoes"));
    if (tier3Filter === "loafers") return p.category === "Footwear" && p.title.includes("Loafer");
    return true;
  });

  // Selected state
  const [tier1Selected, setTier1Selected] = useState(tier1Products[0] || INITIAL_PRODUCTS[0]);
  const [tier2Selected, setTier2Selected] = useState(tier2Products[0] || INITIAL_PRODUCTS[1]);
  const [tier3Selected, setTier3Selected] = useState(tier3Products[0] || INITIAL_PRODUCTS[2]);
  const [addedAll, setAddedAll] = useState(false);

  const subtotal = (tier1Selected?.price || 0) + (tier2Selected?.price || 0) + (tier3Selected?.price || 0);
  const comboDiscount = 1000;
  const finalPrice = Math.max(0, subtotal - comboDiscount);

  const handleAddComboToBag = () => {
    if (tier1Selected) addToCart(tier1Selected, "Khan Combo Set (Tier 1)", 0, 1);
    if (tier2Selected) addToCart(tier2Selected, "Khan Combo Set (Tier 2)", 0, 1);
    if (tier3Selected) addToCart(tier3Selected, "Khan Combo Set (Tier 3)", -comboDiscount, 1);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI selected my 3-Piece Khan Combo:\n• Tier 1: ${tier1Selected?.title} (Rs. ${(tier1Selected?.price || 0).toLocaleString()})\n• Tier 2: ${tier2Selected?.title} (Rs. ${(tier2Selected?.price || 0).toLocaleString()})\n• Tier 3: ${tier3Selected?.title} (Rs. ${(tier3Selected?.price || 0).toLocaleString()})\n• Subtotal: Rs. ${subtotal.toLocaleString()}\n• 👑 Combo Discount: -Rs. ${comboDiscount.toLocaleString()} OFF\n🔥 Final Payable: Rs. ${finalPrice.toLocaleString()} (COD)${vaultLine}\nPlease confirm dispatch!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "850px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
        borderRadius: "20px",
        padding: "12px 10px 16px",
        color: "#ffffff",
        boxSizing: "border-box"
      }}
    >
      {/* ULTRA-COMPACT HEADER */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "1rem" }}>👑</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: "900",
              margin: 0,
              background: "linear-gradient(135deg, #ffffff 0%, #fef08a 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2
            }}
          >
            Shahi Khan Combo Machine
          </h2>
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: "800",
              background: "#b91c1c",
              color: "#ffffff",
              padding: "2px 7px",
              borderRadius: "10px",
              letterSpacing: "0.5px"
            }}
          >
            -Rs. 1,000 OFF
          </span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: "#a1a1aa", lineHeight: 1.2 }}>
          Pick 1 Wardrobe + 1 Accessory + 1 Footwear. Instant Rs. 1,000 discount applied!
        </p>
      </div>

      {/* 3 COMPACT HORIZONTAL CAROUSEL ROWS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
        
        {/* ROW 1: TIER 1 WARDROBE */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: "6px 8px 7px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span style={{ fontSize: "0.64rem", fontWeight: "900", color: "#fef08a", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                T1: Wardrobe
              </span>
              <span style={{ fontSize: "0.62rem", color: "#d4af37", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ✓ {tier1Selected?.title} (Rs. {(tier1Selected?.price || 0).toLocaleString()})
              </span>
            </div>
            <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
              {[
                { key: "all", label: "All" },
                { key: "coats", label: "Coats" },
                { key: "shawls", label: "Shawls" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier1Filter(tb.key)}
                  style={{
                    padding: "1px 6px",
                    borderRadius: "6px",
                    fontSize: "0.58rem",
                    fontWeight: "700",
                    background: tier1Filter === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                    color: tier1Filter === tb.key ? "#000000" : "#d4d4d8",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Scrolling Row */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "3px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {filteredTier1.map((item) => {
              const isSelected = item.id === tier1Selected?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier1Selected(item)}
                  style={{
                    flex: "0 0 68px",
                    width: "68px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.12)",
                    background: isSelected ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.04)",
                    padding: "4px 3px",
                    boxShadow: isSelected ? "0 0 8px rgba(212, 175, 55, 0.45)" : "none",
                    transition: "all 0.15s ease",
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ width: "100%", height: "54px", overflow: "hidden", borderRadius: "7px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.55rem", fontWeight: "700", color: "#ffffff", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "900", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: TIER 2 ACCESSORIES */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: "6px 8px 7px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span style={{ fontSize: "0.64rem", fontWeight: "900", color: "#fef08a", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                T2: Accessories
              </span>
              <span style={{ fontSize: "0.62rem", color: "#d4af37", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ✓ {tier2Selected?.title} (Rs. {(tier2Selected?.price || 0).toLocaleString()})
              </span>
            </div>
            <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
              {[
                { key: "all", label: "All" },
                { key: "perfumes", label: "Perfumes" },
                { key: "watches", label: "Watches" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier2Filter(tb.key)}
                  style={{
                    padding: "1px 6px",
                    borderRadius: "6px",
                    fontSize: "0.58rem",
                    fontWeight: "700",
                    background: tier2Filter === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                    color: tier2Filter === tb.key ? "#000000" : "#d4d4d8",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Scrolling Row */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "3px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {filteredTier2.map((item) => {
              const isSelected = item.id === tier2Selected?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier2Selected(item)}
                  style={{
                    flex: "0 0 68px",
                    width: "68px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.12)",
                    background: isSelected ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.04)",
                    padding: "4px 3px",
                    boxShadow: isSelected ? "0 0 8px rgba(212, 175, 55, 0.45)" : "none",
                    transition: "all 0.15s ease",
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ width: "100%", height: "54px", overflow: "hidden", borderRadius: "7px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.55rem", fontWeight: "700", color: "#ffffff", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "900", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3: TIER 3 FOOTWEAR */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: "6px 8px 7px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span style={{ fontSize: "0.64rem", fontWeight: "900", color: "#fef08a", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                T3: Footwear
              </span>
              <span style={{ fontSize: "0.62rem", color: "#d4af37", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ✓ {tier3Selected?.title} (Rs. {(tier3Selected?.price || 0).toLocaleString()})
              </span>
            </div>
            <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
              {[
                { key: "all", label: "All" },
                { key: "chappals", label: "Chappals" },
                { key: "shoes", label: "Shoes" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier3Filter(tb.key)}
                  style={{
                    padding: "1px 6px",
                    borderRadius: "6px",
                    fontSize: "0.58rem",
                    fontWeight: "700",
                    background: tier3Filter === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                    color: tier3Filter === tb.key ? "#000000" : "#d4d4d8",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Scrolling Row */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "3px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {filteredTier3.map((item) => {
              const isSelected = item.id === tier3Selected?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier3Selected(item)}
                  style={{
                    flex: "0 0 68px",
                    width: "68px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.12)",
                    background: isSelected ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.04)",
                    padding: "4px 3px",
                    boxShadow: isSelected ? "0 0 8px rgba(212, 175, 55, 0.45)" : "none",
                    transition: "all 0.15s ease",
                    boxSizing: "border-box"
                  }}
                >
                  <div style={{ width: "100%", height: "54px", overflow: "hidden", borderRadius: "7px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.55rem", fontWeight: "700", color: "#ffffff", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "900", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* COMPACT PRICING STRIP & ACTION BUTTONS */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(24, 24, 27, 0.9) 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          padding: "8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "0.72rem", color: "#a1a1aa", textDecoration: "line-through" }}>
              Rs. {subtotal.toLocaleString()}
            </span>
            <span style={{ fontSize: "1.05rem", fontWeight: "900", color: "#fef08a" }}>
              Rs. {finalPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: "0.6rem", fontWeight: "800", color: "#22c55e", background: "rgba(34,197,94,0.15)", padding: "1px 6px", borderRadius: "6px" }}>
              Save Rs. 1,000
            </span>
          </div>

          {isVaultUnlocked && (
            <span style={{ fontSize: "0.62rem", color: "#86efac", fontWeight: "700" }}>
              🎁 +1 Free Perfume Included
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          <button
            onClick={handleAddComboToBag}
            style={{
              background: addedAll
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)",
              color: addedAll ? "#ffffff" : "#18181b",
              border: "none",
              borderRadius: "10px",
              padding: "9px 8px",
              fontSize: "0.74rem",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap"
            }}
          >
            {addedAll ? "✓ Added to Bag!" : "🛍️ Add Set to Bag"}
          </button>

          <a
            href={`https://wa.me/${waNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "9px 8px",
              fontSize: "0.74rem",
              fontWeight: "800",
              textDecoration: "none",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            💬 WhatsApp Order
          </a>
        </div>
      </div>
    </div>
  );
}
