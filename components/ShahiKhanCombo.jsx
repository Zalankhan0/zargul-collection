"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

// TIER 1: WARDROBE (PRINCE COATS, WAISTCOATS & SWATI SHAWLS)
const TIER_1_ITEMS = [
  { id: 401, title: "Midnight Black Prince Coat", price: 4000, tag: "PRINCE COAT", image: "/assets/coats/midnight_black_prince_coat_4000.webp" },
  { id: 403, title: "Classic Brown Prince Coat", price: 4000, tag: "PRINCE COAT", image: "/assets/coats/classic_brown_prince_coat_4000.webp" },
  { id: 402, title: "Silver Grey Luxury Coat", price: 4000, tag: "PRINCE COAT", image: "/assets/coats/silver_grey_waistcoat_4000.webp" },
  { id: 405, title: "Charcoal Black Waistcoat", price: 3000, tag: "WAISTCOAT", image: "/assets/coats/classic_charcoal_black_waistcoat_3000.webp" },
  { id: 406, title: "Pearl Grey Classic Waistcoat", price: 3000, tag: "WAISTCOAT", image: "/assets/coats/pearl_grey_classic_waistcoat_3000.webp" },
  { id: 407, title: "Midnight Blue Waistcoat", price: 3000, tag: "WAISTCOAT", image: "/assets/coats/midnight_blue_classic_waistcoat_3000.webp" },
  { id: 301, title: "Slate Grey Swati Shawl", price: 3000, tag: "SWATI SHAWL", image: "/assets/shawls/slate_grey_shawl_3000.jpg" },
  { id: 303, title: "Midnight Black Swati Shawl", price: 2500, tag: "SWATI SHAWL", image: "/assets/shawls/midnight_black_shawl_2500.jpg" }
];

// TIER 2: LUXURY ACCESSORIES (WATCHES & PERFUMES)
const TIER_2_ITEMS = [
  { id: 1, title: "Bugatti Chiron Tourbillon Gold Watch", price: 8000, tag: "WATCH", image: "/assets/watches/Bugati_8000.webp" },
  { id: 2, title: "Cadisen Royal Oak Automatic Watch", price: 7500, tag: "WATCH", image: "/assets/watches/cadisen_7500.webp" },
  { id: 6, title: "Kademan Dual Display Sports Watch", price: 5000, tag: "WATCH", image: "/assets/watches/kademan_5000.webp" },
  { id: 7, title: "Poedagar Executive Chronograph", price: 4500, tag: "WATCH", image: "/assets/watches/poedagar_4500.webp" },
  { id: 101, title: "Hawajes Eau de Parfum (100ml)", price: 4000, tag: "PERFUME", image: "/assets/perfumes/Hawajes_4000.jpg" },
  { id: 103, title: "Murooj Caliph Luxury EDP (100ml)", price: 4000, tag: "PERFUME", image: "/assets/perfumes/Murooj_4000.jpg" },
  { id: 102, title: "Joyous S-PRO 8 AM EDP (100ml)", price: 4000, tag: "PERFUME", image: "/assets/perfumes/Joyous_4000.jpg" }
];

// TIER 3: FOOTWEAR (CHAPPALS, SHOES & LOAFERS)
const TIER_3_ITEMS = [
  { id: 11, title: "Royal Maroon Glossy Chappal", price: 4500, tag: "CHAPPAL", image: "/assets/chappal/royal_maroon_glossy_chappal_4500.jpg" },
  { id: 12, title: "Charcoal Matte Black Chappal", price: 4500, tag: "CHAPPAL", image: "/assets/chappal/charcoal_matte_black_chappal_4500.jpg" },
  { id: 501, title: "Black Leather Chelsea Boots", price: 5999, tag: "BOOTS", image: "/assets/shoes/black_chelsea_boots_5999.webp" },
  { id: 502, title: "Glossy Black Derby Shoes", price: 5999, tag: "FORMAL", image: "/assets/shoes/glossy_black_derby_shoes_5999.webp" },
  { id: 503, title: "Royal Oxblood Formal Shoes", price: 5999, tag: "FORMAL", image: "/assets/shoes/royal_oxblood_formal_shoes_5999.webp" },
  { id: 701, title: "Camel Tan Suede Loafer", price: 4999, tag: "LOAFER", image: "/assets/loafers/camel_tan_suede_loafer_4999.webp" },
  { id: 702, title: "Chocolate Brown Suede Loafer", price: 4999, tag: "LOAFER", image: "/assets/loafers/chocolate_brown_suede_loafer_4999.webp" },
  { id: 703, title: "Midnight Navy Suede Loafer", price: 4999, tag: "LOAFER", image: "/assets/loafers/midnight_navy_suede_loafer_4999.webp" }
];

export default function ShahiKhanCombo() {
  const { addToCart, isVaultUnlocked } = useStore();
  const [tier1Selected, setTier1Selected] = useState(TIER_1_ITEMS[0]);
  const [tier2Selected, setTier2Selected] = useState(TIER_2_ITEMS[0]);
  const [tier3Selected, setTier3Selected] = useState(TIER_3_ITEMS[0]);
  const [addedAll, setAddedAll] = useState(false);

  const subtotal = tier1Selected.price + tier2Selected.price + tier3Selected.price;
  const comboDiscount = 1000; // Rs. 1,000 automatic Khan Combo Discount
  const finalPrice = Math.max(0, subtotal - comboDiscount);

  const handleAddComboToBag = () => {
    addToCart(tier1Selected, "Khan Combo Set (Tier 1)", 0, 1);
    addToCart(tier2Selected, "Khan Combo Set (Tier 2)", 0, 1);
    addToCart(tier3Selected, "Khan Combo Set (Tier 3)", -comboDiscount, 1);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI designed a complete 3-Piece Royal Khan Combo:\n• Tier 1 (Wardrobe): ${tier1Selected.title} (Rs. ${tier1Selected.price.toLocaleString()})\n• Tier 2 (Accessory): ${tier2Selected.title} (Rs. ${tier2Selected.price.toLocaleString()})\n• Tier 3 (Footwear): ${tier3Selected.title} (Rs. ${tier3Selected.price.toLocaleString()})\n• Subtotal: Rs. ${subtotal.toLocaleString()}\n• 👑 Royal Combo Discount: -Rs. ${comboDiscount.toLocaleString()} OFF\n🔥 Final Payable: Rs. ${finalPrice.toLocaleString()} (COD)${vaultLine}\nPlease confirm dispatch!`
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
            Shahi Khan Combo Machine • 3-Tier Builder
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 1 • WARDROBE (COATS / WAISTCOATS / SHAWLS):
            </span>
            <span style={{ fontSize: "0.74rem", fontWeight: "750", color: "#d4af37" }}>
              Selected: {tier1Selected.title} (Rs. {tier1Selected.price.toLocaleString()})
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {TIER_1_ITEMS.map((item) => {
              const isSelected = item.id === tier1Selected.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier1Selected(item)}
                  style={{
                    flex: "0 0 82px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.04)",
                    padding: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#ccc", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 2: LUXURY ACCESSORIES SLIDER */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 2 • LUXURY ACCESSORIES (WATCHES / PERFUMES):
            </span>
            <span style={{ fontSize: "0.74rem", fontWeight: "750", color: "#d4af37" }}>
              Selected: {tier2Selected.title} (Rs. {tier2Selected.price.toLocaleString()})
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {TIER_2_ITEMS.map((item) => {
              const isSelected = item.id === tier2Selected.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier2Selected(item)}
                  style={{
                    flex: "0 0 82px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.04)",
                    padding: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#ccc", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIER 3: FOOTWEAR SLIDER */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
              TIER 3 • FOOTWEAR (BOOTS / DERBY / LOAFERS / CHAPPALS):
            </span>
            <span style={{ fontSize: "0.74rem", fontWeight: "750", color: "#d4af37" }}>
              Selected: {tier3Selected.title} (Rs. {tier3Selected.price.toLocaleString()})
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {TIER_3_ITEMS.map((item) => {
              const isSelected = item.id === tier3Selected.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setTier3Selected(item)}
                  style={{
                    flex: "0 0 82px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSelected ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.04)",
                    padding: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "0.58rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#ccc", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC COMBO UNLOCK BANNER & PRICING BAR */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(202, 138, 4, 0.25) 100%)",
          border: "1.5px solid #eab308",
          borderRadius: "18px",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.4rem" }}>👑</span>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: "900", color: "#fef08a", letterSpacing: "0.5px" }}>
                KHAN ROYAL COMBO UNLOCKED!
              </div>
              <div style={{ fontSize: "0.74rem", color: "#ffffff", opacity: 0.9 }}>
                3-Piece Complete Set • Instant Rs. 1,000 Special Discount Applied
              </div>
            </div>
          </div>

          {isVaultUnlocked && (
            <div style={{ background: "#18181b", border: "1px dashed #eab308", padding: "4px 10px", borderRadius: "10px", fontSize: "0.72rem", color: "#fef08a", fontWeight: "800" }}>
              🎁 +1 FREE 30ml Luxury Perfume
            </div>
          )}
        </div>

        {/* PRICE BREAKDOWN */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: "10px",
            borderTop: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          <div>
            <span style={{ fontSize: "0.78rem", color: "#a1a1aa" }}>Original Total: </span>
            <span style={{ fontSize: "0.9rem", color: "#a1a1aa", textDecoration: "line-through" }}>
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.78rem", color: "#fef08a", marginRight: "8px" }}>Combo Price (-Rs. 1,000):</span>
            <span style={{ fontSize: "1.45rem", fontWeight: "900", color: "#fef08a" }}>
              Rs. {finalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 1-CLICK ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleAddComboToBag}
            style={{
              flex: "1 1 180px",
              padding: "12px 18px",
              borderRadius: "14px",
              background: addedAll ? "#10b981" : "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
              color: "#18181b",
              border: "none",
              fontSize: "0.85rem",
              fontWeight: "900",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(212,175,55,0.4)",
              transition: "all 0.2s ease"
            }}
          >
            {addedAll ? "✓ Added All 3 to Bag!" : "✦ ADD 3-PIECE SET TO BAG"}
          </button>

          <a
            href={`https://wa.me/923339194200?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "12px 20px",
              borderRadius: "14px",
              background: "#25D366",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: "900",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
              flex: "1 1 200px"
            }}
          >
            <span>💬</span>
            <span>Order Complete Khan Set on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
