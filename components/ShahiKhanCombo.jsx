"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

export default function ShahiKhanCombo() {
  const { products, addToCart, isVaultUnlocked } = useStore();
  
  // Dynamically use real shop inventory with fallback to INITIAL_PRODUCTS
  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real inventory filtering with 100% verified paths and shop items
  const tier1Products = allProducts.filter((p) => p.category === "Coats" || p.category === "Shawls");
  const tier2Products = allProducts.filter(
    (p) => p.category === "Watches" || p.category === "Perfumes" || p.category === "Fragrances"
  );
  const tier3Products = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );

  // Subcategory filters for ease of navigation
  const [tier1Filter, setTier1Filter] = useState("all"); // 'all' | 'coats' | 'shawls'
  const [tier2Filter, setTier2Filter] = useState("all"); // 'all' | 'perfumes' | 'watches'
  const [tier3Filter, setTier3Filter] = useState("all"); // 'all' | 'chappals' | 'shoes' | 'loafers'

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

  // Selected state initialized with verified real items
  const [tier1Selected, setTier1Selected] = useState(tier1Products[0] || INITIAL_PRODUCTS[0]);
  const [tier2Selected, setTier2Selected] = useState(tier2Products[0] || INITIAL_PRODUCTS[1]);
  const [tier3Selected, setTier3Selected] = useState(tier3Products[0] || INITIAL_PRODUCTS[2]);
  const [addedAll, setAddedAll] = useState(false);

  const subtotal = (tier1Selected?.price || 0) + (tier2Selected?.price || 0) + (tier3Selected?.price || 0);
  const comboDiscount = 1000; // Rs. 1,000 automatic Khan Combo Discount
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
    `Assalam-o-Alaikum Zargul Collection!\nI designed a complete 3-Piece Royal Khan Combo:\n• Tier 1 (Wardrobe): ${tier1Selected?.title} (Rs. ${(tier1Selected?.price || 0).toLocaleString()})\n• Tier 2 (Accessory): ${tier2Selected?.title} (Rs. ${(tier2Selected?.price || 0).toLocaleString()})\n• Tier 3 (Footwear): ${tier3Selected?.title} (Rs. ${(tier3Selected?.price || 0).toLocaleString()})\n• Subtotal: Rs. ${subtotal.toLocaleString()}\n• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()} OFF\n🔥 Final Payable: Rs. ${finalPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\nPlease confirm dispatch!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
        borderRadius: "24px",
        border: "2px solid rgba(212, 175, 55, 0.45)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4), 0 0 30px rgba(197, 160, 89, 0.15)",
        padding: "24px 16px 30px",
        color: "#ffffff",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(212, 175, 55, 0.15)",
            padding: "5px 16px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            marginBottom: "8px"
          }}
        >
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>👑</span>
          <span style={{ fontSize: "0.72rem", fontWeight: "800", letterSpacing: "1.5px", color: "#fef08a", textTransform: "uppercase" }}>
            Shahi Khan Combo Machine • 3-Tier Mix &amp; Match
          </span>
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>👑</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: "800",
            margin: "2px 0 4px",
            background: "linear-gradient(135deg, #ffffff 0%, #fef08a 60%, #d4af37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Build Your 3-Piece Royal Khan Combo
        </h2>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#a1a1aa" }}>
          Pick 1 from Wardrobe + 1 from Accessories + 1 from Footwear and get instant <strong>Rs. 1,000 OFF</strong> + Free Gift!
        </p>
      </div>

      {/* 3-ROW HORIZONTAL SLIDERS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "22px" }}>
        
        {/* TIER 1: WARDROBE SLIDER */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 1 • WARDROBE ({tier1Products.length} REAL ITEMS):
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { key: "all", label: "All" },
                { key: "coats", label: "Coats & Waistcoats" },
                { key: "shawls", label: "Swati Shawls" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier1Filter(tb.key)}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "0.65rem",
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

          <div style={{ fontSize: "0.72rem", fontWeight: "750", color: "#d4af37", marginBottom: "8px" }}>
            Selected: {tier1Selected?.title} (Rs. {(tier1Selected?.price || 0).toLocaleString()})
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "6px",
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
                    flex: "0 0 95px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.22)" : "rgba(255,255,255,0.04)",
                    padding: "6px 5px",
                    boxShadow: isSelected ? "0 0 12px rgba(212, 175, 55, 0.4)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: "700", color: "#ffffff", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 2: LUXURY ACCESSORIES SLIDER */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 2 • ACCESSORIES ({tier2Products.length} REAL ITEMS):
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { key: "all", label: "All" },
                { key: "perfumes", label: "Luxury Perfumes" },
                { key: "watches", label: "Designer Watches" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier2Filter(tb.key)}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "0.65rem",
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

          <div style={{ fontSize: "0.72rem", fontWeight: "750", color: "#d4af37", marginBottom: "8px" }}>
            Selected: {tier2Selected?.title} (Rs. {(tier2Selected?.price || 0).toLocaleString()})
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "6px",
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
                    flex: "0 0 95px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.22)" : "rgba(255,255,255,0.04)",
                    padding: "6px 5px",
                    boxShadow: isSelected ? "0 0 12px rgba(212, 175, 55, 0.4)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: "700", color: "#ffffff", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 3: FOOTWEAR SLIDER */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 3 • FOOTWEAR ({tier3Products.length} REAL ITEMS):
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { key: "all", label: "All" },
                { key: "chappals", label: "Chappals" },
                { key: "shoes", label: "Boots/Shoes" },
                { key: "loafers", label: "Loafers" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setTier3Filter(tb.key)}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "0.65rem",
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

          <div style={{ fontSize: "0.72rem", fontWeight: "750", color: "#d4af37", marginBottom: "8px" }}>
            Selected: {tier3Selected?.title} (Rs. {(tier3Selected?.price || 0).toLocaleString()})
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "6px",
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
                    flex: "0 0 95px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.22)" : "rgba(255,255,255,0.04)",
                    padding: "6px 5px",
                    boxShadow: isSelected ? "0 0 12px rgba(212, 175, 55, 0.4)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "#ffffff" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: "700", color: "#ffffff", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.65rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* PRICE & DISCOUNT CALCULATION CARD */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(24, 24, 27, 0.8) 100%)",
          borderRadius: "18px",
          border: "1.5px solid rgba(212, 175, 55, 0.6)",
          padding: "16px",
          marginBottom: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
              Standard 3-Item Subtotal:
            </div>
            <div style={{ fontSize: "1rem", color: "#d4d4d8", textDecoration: "line-through", fontWeight: "600" }}>
              Rs. {subtotal.toLocaleString()}
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
              color: "#ffffff",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "0.72rem",
              fontWeight: "800",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <span>👑 ROYAL COMBO:</span>
            <span>-Rs. {comboDiscount.toLocaleString()} OFF</span>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", color: "#fef08a", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
              Final Combo Price (COD):
            </div>
            <div style={{ fontSize: "1.45rem", fontWeight: "900", color: "#d4af37", textShadow: "0 0 15px rgba(212, 175, 55, 0.4)" }}>
              Rs. {finalPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* VAULT BONUS NOTIFICATION */}
        {isVaultUnlocked && (
          <div
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              background: "rgba(212, 175, 55, 0.2)",
              border: "1px solid rgba(212, 175, 55, 0.6)",
              borderRadius: "10px",
              fontSize: "0.74rem",
              color: "#fef08a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "750"
            }}
          >
            <span>🎁</span>
            <span>SHAHI TIJORI PERK ACTIVE: +1 FREE 30ml Luxury Perfume will be added automatically to this order!</span>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={handleAddComboToBag}
          style={{
            flex: "1 1 200px",
            background: addedAll
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)",
            color: addedAll ? "#ffffff" : "#18181b",
            border: "none",
            borderRadius: "16px",
            padding: "14px 16px",
            fontSize: "0.85rem",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease"
          }}
        >
          {addedAll ? "✓ 3-Piece Set Added to Bag!" : "Add Complete 3-Piece Set to Bag"}
        </button>

        <a
          href={`https://wa.me/923336712345?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: "1 1 200px",
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "14px 16px",
            fontSize: "0.85rem",
            fontWeight: "800",
            textDecoration: "none",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 6px 18px rgba(37, 211, 102, 0.35)",
            cursor: "pointer"
          }}
        >
          <span>💬 Order Combo via WhatsApp (-Rs. 1,000)</span>
        </a>
      </div>
    </div>
  );
}
