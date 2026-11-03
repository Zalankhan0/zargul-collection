"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

// 5 BASE SHALWAR KAMEEZ SUIT COLORS
const SUIT_COLORS = [
  { id: "white", name: "Pure White", hex: "#FFFFFF", text: "#18181b", border: "#d4d4d8", desc: "Crisp Pure Cotton White" },
  { id: "boski", name: "Royal Boski / Cream", hex: "#F4E6C3", text: "#18181b", border: "#d6c39a", desc: "Authentic Silk Boski Drape" },
  { id: "black", name: "Jet Black", hex: "#141414", text: "#ffffff", border: "#3f3f46", desc: "Deep Formal Midnight Black" },
  { id: "navy", name: "Deep Navy Blue", hex: "#1B263B", text: "#ffffff", border: "#334155", desc: "Royal Marine Midnight Navy" },
  { id: "charcoal", name: "Charcoal Grey", hex: "#373A40", text: "#ffffff", border: "#52525b", desc: "Executive Slate Charcoal" }
];

// ZARGUL OVERWEAR ITEMS (PRINCE COATS, WAISTCOATS & SHAWLS)
const OVERWEAR_ITEMS = [
  // PRINCE COATS (Rs. 4,000)
  {
    id: 401,
    title: "Midnight Black Prince Coat",
    type: "Prince Coat",
    price: 4000,
    image: "/assets/coats/midnight_black_prince_coat_4000.webp",
    color: "Midnight Black"
  },
  {
    id: 403,
    title: "Classic Brown Prince Coat",
    type: "Prince Coat",
    price: 4000,
    image: "/assets/coats/classic_brown_prince_coat_4000.webp",
    color: "Classic Brown"
  },
  {
    id: 402,
    title: "Silver Grey Luxury Coat",
    type: "Prince Coat",
    price: 4000,
    image: "/assets/coats/silver_grey_waistcoat_4000.webp",
    color: "Silver Grey"
  },
  {
    id: 404,
    title: "Beige Royal Prince Coat",
    type: "Prince Coat",
    price: 4000,
    image: "/assets/coats/beige_royal_waistcoat_4000.webp",
    color: "Royal Beige"
  },

  // CLASSIC WAISTCOATS (Rs. 3,000)
  {
    id: 405,
    title: "Charcoal Black Waistcoat",
    type: "Classic Waistcoat",
    price: 3000,
    image: "/assets/coats/classic_charcoal_black_waistcoat_3000.webp",
    color: "Charcoal Black"
  },
  {
    id: 406,
    title: "Pearl Grey Classic Waistcoat",
    type: "Classic Waistcoat",
    price: 3000,
    image: "/assets/coats/pearl_grey_classic_waistcoat_3000.webp",
    color: "Pearl Grey"
  },
  {
    id: 407,
    title: "Midnight Blue Waistcoat",
    type: "Classic Waistcoat",
    price: 3000,
    image: "/assets/coats/midnight_blue_classic_waistcoat_3000.webp",
    color: "Midnight Blue"
  },

  // SWATI SHAWLS (Rs. 2,500 - 3,000)
  {
    id: 301,
    title: "Slate Grey Swati Shawl",
    type: "Swati Shawl",
    price: 3000,
    image: "/assets/shawls/slate_grey_shawl_3000.jpg",
    color: "Slate Grey"
  },
  {
    id: 303,
    title: "Midnight Black Swati Shawl",
    type: "Swati Shawl",
    price: 2500,
    image: "/assets/shawls/midnight_black_shawl_2500.jpg",
    color: "Midnight Black"
  },
  {
    id: 302,
    title: "Royal Maroon Swati Shawl",
    type: "Swati Shawl",
    price: 2500,
    image: "/assets/shawls/royal_maroon_shawl_2500.jpg",
    color: "Royal Maroon"
  }
];

// FOOTWEAR OPTIONS
const FOOTWEAR_ITEMS = [
  {
    id: 501,
    title: "Black Leather Chelsea Boots",
    type: "Chelsea Boots",
    price: 5999,
    image: "/assets/shoes/black_chelsea_boots_5999.webp"
  },
  {
    id: 502,
    title: "Glossy Black Derby Shoes",
    type: "Formal Derby",
    price: 5999,
    image: "/assets/shoes/glossy_black_derby_shoes_5999.webp"
  },
  {
    id: 503,
    title: "Royal Oxblood Formal Shoes",
    type: "Formal Shoes",
    price: 5999,
    image: "/assets/shoes/royal_oxblood_formal_shoes_5999.webp"
  },
  {
    id: 701,
    title: "Camel Tan Suede Loafer",
    type: "Loro Piana Style",
    price: 4999,
    image: "/assets/loafers/camel_tan_suede_loafer_4999.webp"
  },
  {
    id: 702,
    title: "Chocolate Brown Suede Loafer",
    type: "Loro Piana Style",
    price: 4999,
    image: "/assets/loafers/chocolate_brown_suede_loafer_4999.webp"
  },
  {
    id: 11,
    title: "Royal Maroon Peshawari Chappal",
    type: "Peshawari Chappal",
    price: 4500,
    image: "/assets/chappal/royal_maroon_glossy_chappal_4500.jpg"
  },
  {
    id: 12,
    title: "Charcoal Matte Black Chappal",
    type: "Peshawari Chappal",
    price: 4500,
    image: "/assets/chappal/charcoal_matte_black_chappal_4500.jpg"
  }
];

export default function KhanLookStudio() {
  const { addToCart, isVaultUnlocked } = useStore();
  const [selectedSuit, setSelectedSuit] = useState(SUIT_COLORS[0]); // default White
  const [selectedOverwear, setSelectedOverwear] = useState(OVERWEAR_ITEMS[0]); // default Midnight Black Prince Coat
  const [selectedFootwear, setSelectedFootwear] = useState(FOOTWEAR_ITEMS[0]); // default Chelsea Boots
  const [addedAnimation, setAddedAnimation] = useState(false);

  const totalLookPrice = selectedOverwear.price + selectedFootwear.price;

  const handleBuyThisLook = () => {
    // Add both Overwear & Footwear to cart
    addToCart(selectedOverwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    addToCart(selectedFootwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI designed my Khan Look on the Live Studio:\n• Base Shalwar Kameez: ${selectedSuit.name} (${selectedSuit.desc})\n• Overwear: ${selectedOverwear.title} (Rs. ${selectedOverwear.price.toLocaleString()})\n• Footwear: ${selectedFootwear.title} (Rs. ${selectedFootwear.price.toLocaleString()})\n• Total Look Price: Rs. ${totalLookPrice.toLocaleString()}${vaultLine}\nPlease confirm dispatch details!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #ffffff 0%, #faf8fa 100%)",
        borderRadius: "24px",
        border: "1.5px solid rgba(197, 160, 89, 0.3)",
        boxShadow: "0 12px 35px rgba(20, 16, 22, 0.05)",
        padding: "24px 16px 30px",
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
            background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
            padding: "5px 16px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            marginBottom: "8px"
          }}
        >
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>✦</span>
          <span style={{ fontSize: "0.72rem", fontWeight: "800", letterSpacing: "1.5px", color: "#fef08a", textTransform: "uppercase" }}>
            Khan Look Studio • Live Color Matcher
          </span>
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>✦</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: "800",
            color: "#18181b",
            margin: "2px 0 4px"
          }}
        >
          Apne Shalwar Kameez Ka Rang Select Karein
        </h2>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#666666" }}>
          Select your base suit color and swipe through Zargul waistcoats, coats, shawls &amp; footwear for the perfect Khan Look
        </p>
      </div>

      {/* 1. BASE SUIT COLOR SELECTOR BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "0.74rem", fontWeight: "800", color: "#444", textTransform: "uppercase", letterSpacing: "0.8px", textAlign: "center", marginBottom: "8px" }}>
          Step 1: Choose Your Base Shalwar Kameez:
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0 4px"
          }}
        >
          {SUIT_COLORS.map((suit) => {
            const isSelected = suit.id === selectedSuit.id;
            return (
              <button
                key={suit.id}
                onClick={() => setSelectedSuit(suit)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 14px",
                  borderRadius: "20px",
                  background: isSelected ? "#18181b" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#27272a",
                  border: isSelected ? "2px solid #c5a059" : "1.5px solid rgba(0,0,0,0.12)",
                  boxShadow: isSelected ? "0 4px 14px rgba(197, 160, 89, 0.35)" : "0 2px 6px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  transition: "all 0.2s ease"
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: suit.hex,
                    border: `1.5px solid ${suit.border}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }}
                />
                <span>{suit.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. STUDIO STAGE PREVIEW (TORSO + OVERWEAR + FOOTWEAR) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "center",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "20px 16px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)",
          marginBottom: "22px"
        }}
      >
        {/* LEFT COLUMN: LIVE VISUAL TORSO COMPOSITION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              width: "240px",
              height: "290px",
              borderRadius: "18px",
              background: "radial-gradient(circle at 50% 30%, #fefcfb 0%, #f4eef5 100%)",
              border: "1px solid rgba(197, 160, 89, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
            }}
          >
            {/* BASE SHALWAR KAMEEZ LAYER (SVG VECTOR TORSO) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.4s ease"
              }}
            >
              <svg width="200" height="260" viewBox="0 0 200 260" fill="none">
                {/* Kameez Shoulders & Body */}
                <path
                  d="M40 50 L100 32 L160 50 L175 120 L165 250 L35 250 L25 120 Z"
                  fill={selectedSuit.hex}
                  stroke={selectedSuit.border}
                  strokeWidth="1.5"
                />
                {/* Traditional Mandarin Ban Collar */}
                <path
                  d="M75 35 C75 22, 125 22, 125 35 L120 48 C120 38, 80 38, 80 48 Z"
                  fill={selectedSuit.hex}
                  stroke={selectedSuit.border}
                  strokeWidth="1.5"
                />
                {/* Front Button Placket (Patti) */}
                <path
                  d="M94 48 L106 48 L106 140 L94 140 Z"
                  fill="rgba(0,0,0,0.04)"
                  stroke={selectedSuit.border}
                  strokeWidth="1"
                />
                {/* Buttons on Placket */}
                <circle cx="100" cy="62" r="2.5" fill={selectedSuit.text === "#ffffff" ? "#888" : "#aaa"} />
                <circle cx="100" cy="85" r="2.5" fill={selectedSuit.text === "#ffffff" ? "#888" : "#aaa"} />
                <circle cx="100" cy="108" r="2.5" fill={selectedSuit.text === "#ffffff" ? "#888" : "#aaa"} />
                <circle cx="100" cy="130" r="2.5" fill={selectedSuit.text === "#ffffff" ? "#888" : "#aaa"} />
                {/* Chest Pocket Outline */}
                <path
                  d="M50 78 L78 78 L78 110 C78 114, 50 114, 50 110 Z"
                  fill="none"
                  stroke={selectedSuit.border}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* OVERLAID ZARGUL PRODUCT PHOTO (COAT / WAISTCOAT / SHAWL) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.22))"
              }}
            >
              <img
                src={selectedOverwear.image}
                alt={selectedOverwear.title}
                style={{
                  width: "82%",
                  height: "82%",
                  objectFit: "contain",
                  display: "block",
                  transition: "all 0.3s ease"
                }}
              />
            </div>

            {/* Suit Label Badge on Preview */}
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(24, 24, 27, 0.85)",
                backdropFilter: "blur(4px)",
                color: "#ffffff",
                fontSize: "0.62rem",
                fontWeight: "750",
                padding: "3px 10px",
                borderRadius: "12px",
                whiteSpace: "nowrap",
                zIndex: 20
              }}
            >
              {selectedSuit.name} + {selectedOverwear.color}
            </div>
          </div>

          {/* MATCHING FOOTWEAR CHOSEN PREVIEW */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "12px",
              background: "#faf8fa",
              padding: "6px 14px",
              borderRadius: "14px",
              border: "1px solid rgba(0,0,0,0.06)"
            }}
          >
            <img
              src={selectedFootwear.image}
              alt={selectedFootwear.title}
              style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "8px" }}
            />
            <div>
              <div style={{ fontSize: "0.64rem", color: "#888", fontWeight: "700" }}>Matched Footwear:</div>
              <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#18181b" }}>
                {selectedFootwear.title} (Rs. {selectedFootwear.price.toLocaleString()})
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTORS & SUMMARY */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* OVERWEAR HORIZONTAL CAROUSEL */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: "800", color: "#333", textTransform: "uppercase" }}>
                Step 2: Choose Overwear (Coat / Waistcoat / Shawl):
              </span>
              <span style={{ fontSize: "0.72rem", color: "#c5a059", fontWeight: "800" }}>
                Rs. {selectedOverwear.price.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "8px",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {OVERWEAR_ITEMS.map((item) => {
                const isSelected = item.id === selectedOverwear.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedOverwear(item)}
                    style={{
                      flex: "0 0 74px",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "12px",
                      border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.1)",
                      background: isSelected ? "rgba(197, 160, 89, 0.08)" : "#ffffff",
                      padding: "4px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px" }}>
                      <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ fontSize: "0.58rem", fontWeight: "800", color: isSelected ? "#c5a059" : "#333", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.color}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTWEAR HORIZONTAL CAROUSEL */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: "800", color: "#333", textTransform: "uppercase" }}>
                Step 3: Choose Footwear (Shoes / Loafers / Chappal):
              </span>
              <span style={{ fontSize: "0.72rem", color: "#c5a059", fontWeight: "800" }}>
                Rs. {selectedFootwear.price.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "8px",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {FOOTWEAR_ITEMS.map((shoe) => {
                const isSelected = shoe.id === selectedFootwear.id;
                return (
                  <div
                    key={shoe.id}
                    onClick={() => setSelectedFootwear(shoe)}
                    style={{
                      flex: "0 0 74px",
                      cursor: "pointer",
                      textAlign: "center",
                      borderRadius: "12px",
                      border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.1)",
                      background: isSelected ? "rgba(197, 160, 89, 0.08)" : "#ffffff",
                      padding: "4px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px" }}>
                      <img src={shoe.image} alt={shoe.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                    <div style={{ fontSize: "0.58rem", fontWeight: "800", color: isSelected ? "#c5a059" : "#333", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Rs. {shoe.price.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOTAL & BUY BUTTONS */}
          <div
            style={{
              paddingTop: "10px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#666" }}>Complete Khan Look Total:</span>
                <div style={{ fontSize: "1.35rem", fontWeight: "900", color: "#c5a059" }}>
                  Rs. {totalLookPrice.toLocaleString()}
                </div>
              </div>
              {isVaultUnlocked && (
                <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#854d0e", background: "#fef08a", padding: "3px 8px", borderRadius: "8px" }}>
                  🎁 +1 FREE 30ml Perfume Included
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={handleBuyThisLook}
                style={{
                  flex: "1 1 140px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: addedAnimation ? "#10b981" : "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                  transition: "all 0.2s ease"
                }}
              >
                {addedAnimation ? "✓ Added Both to Bag!" : "✦ BUY THIS LOOK"}
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
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: "#25D366",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)"
                }}
              >
                <span>💬</span>
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
