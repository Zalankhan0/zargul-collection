"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

// 5 BASE SHALWAR KAMEEZ FABRIC COLORS
export const SUIT_COLORS = [
  {
    id: "navy",
    name: "Deep Navy Blue",
    hex: "#1B263B",
    desc: "Royal Marine Midnight Navy",
    filter: "hue-rotate(0deg) saturate(1.1) brightness(1)",
    accent: "#3b82f6"
  },
  {
    id: "white",
    name: "Pure White",
    hex: "#F8FAFC",
    desc: "Crisp Egyptian Cotton White",
    filter: "saturate(0.1) brightness(1.65) contrast(0.9)",
    accent: "#ffffff"
  },
  {
    id: "boski",
    name: "Royal Boski / Cream",
    hex: "#F4E6C3",
    desc: "Authentic Silk Boski Drape",
    filter: "sepia(0.55) saturate(1.4) brightness(1.25) hue-rotate(-15deg)",
    accent: "#d4af37"
  },
  {
    id: "black",
    name: "Jet Black",
    hex: "#141416",
    desc: "Deep Formal Midnight Black",
    filter: "saturate(0.1) brightness(0.4) contrast(1.3)",
    accent: "#52525b"
  },
  {
    id: "charcoal",
    name: "Charcoal Grey",
    hex: "#373A40",
    desc: "Executive Slate Charcoal",
    filter: "saturate(0.2) brightness(0.75)",
    accent: "#94a3b8"
  }
];

export default function KhanLookStudio() {
  const { products, addToCart, isVaultUnlocked } = useStore();

  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real store inventory filters
  const realWaistcoatsAndCoats = allProducts.filter((p) => p.category === "Coats");
  const realShawls = allProducts.filter((p) => p.category === "Shawls");
  const realFootwear = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );
  const realWatches = allProducts.filter((p) => p.category === "Watches");

  // Selection States
  const [selectedSuit, setSelectedSuit] = useState(SUIT_COLORS[0]); // Navy Default
  const [selectedOverwear, setSelectedOverwear] = useState(realWaistcoatsAndCoats[4] || realWaistcoatsAndCoats[0]); // Classic Charcoal Black Waistcoat
  const [isChadorActive, setIsChadorActive] = useState(true);
  const [selectedShawl, setSelectedShawl] = useState(realShawls[0]); // Slate Grey Swati Shawl
  const [selectedFootwear, setSelectedFootwear] = useState(realFootwear[0]); // Chelsea Boots
  const [selectedWatch, setSelectedWatch] = useState(realWatches[0]); // Rolex Gold

  // Active step in selector drawer
  const [activeStep, setActiveStep] = useState(1); // 1: Suit, 2: Overwear & Shawl, 3: Footwear
  const [overwearTab, setOverwearTab] = useState("all"); // 'all', 'waistcoats', 'coats', 'shawls'
  const [footwearTab, setFootwearTab] = useState("all"); // 'all', 'boots', 'chappals', 'loafers'

  // Highlight pill state (when user clicks an in-system floating pointer)
  const [highlightedPill, setHighlightedPill] = useState(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Dynamic pricing
  const baseSuitPrice = 3500;
  const overwearPrice = selectedOverwear?.price || 3000;
  const chadorPrice = isChadorActive ? (selectedShawl?.price || 2500) : 0;
  const footwearPrice = selectedFootwear?.price || 4500;
  const totalLookPrice = baseSuitPrice + overwearPrice + chadorPrice + footwearPrice;

  // Filtered overwear list
  const filteredOverwear = realWaistcoatsAndCoats.filter((item) => {
    if (overwearTab === "coats") return item.price === 4000 && item.title.toLowerCase().includes("prince");
    if (overwearTab === "waistcoats") return item.title.toLowerCase().includes("waistcoat");
    return true;
  });

  // Filtered footwear list
  const filteredFootwear = realFootwear.filter((item) => {
    if (footwearTab === "boots") return item.title.toLowerCase().includes("boot") || item.title.toLowerCase().includes("derby") || item.title.toLowerCase().includes("shoe");
    if (footwearTab === "chappals") return item.category === "Peshawari Chappals";
    if (footwearTab === "loafers") return item.title.toLowerCase().includes("loafer");
    return true;
  });

  const handlePillClick = (stepNum, pillName) => {
    setActiveStep(stepNum);
    setHighlightedPill(pillName);
    setTimeout(() => setHighlightedPill(null), 2500);
  };

  const handleAddToCartCompleteLook = () => {
    // Add real items to cart
    if (selectedOverwear) addToCart(selectedOverwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    if (isChadorActive && selectedShawl) addToCart(selectedShawl, `Suit Match: ${selectedSuit.name}`, 0, 1);
    if (selectedFootwear) addToCart(selectedFootwear, `Suit Match: ${selectedSuit.name}`, 0, 1);

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2400);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI styled my Complete Khan Look on the Digital Avatar Studio:\n• Base Shalwar Kameez: ${selectedSuit.name} (${selectedSuit.desc}) - Rs. ${baseSuitPrice.toLocaleString()}\n• Torso Overwear: ${selectedOverwear?.title} (Rs. ${overwearPrice.toLocaleString()})\n• Swati Chador: ${isChadorActive ? `${selectedShawl?.title} (Rs. ${chadorPrice.toLocaleString()})` : "None"}\n• Footwear: ${selectedFootwear?.title} (Rs. ${footwearPrice.toLocaleString()})\n• Total Complete Look: Rs. ${totalLookPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\nPlease confirm dispatch details!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1140px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #141416 0%, #0a0a0c 100%)",
        borderRadius: "28px",
        border: "2px solid rgba(212, 175, 55, 0.45)",
        boxShadow: "0 22px 55px rgba(0,0,0,0.65), 0 0 35px rgba(212, 175, 55, 0.15)",
        padding: "24px 16px 32px",
        color: "#ffffff",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* 1. STUDIO TITLE HEADER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(212, 175, 55, 0.15)",
            padding: "5px 18px",
            borderRadius: "30px",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            marginBottom: "8px"
          }}
        >
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>👑</span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "800",
              letterSpacing: "1.5px",
              color: "#fef08a",
              textTransform: "uppercase"
            }}
          >
            KHAN LOOK STUDIO • DIGITAL AVATAR EXPERIENCE
          </span>
          <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>👑</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.45rem",
            fontWeight: "800",
            margin: "4px 0 6px",
            background: "linear-gradient(135deg, #ffffff 0%, #fef08a 60%, #d4af37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Head-to-Toe Luxury Mannequin Lookbook
        </h2>
        <p style={{ margin: "0 auto", maxWidth: "650px", fontSize: "0.82rem", color: "#a1a1aa", lineHeight: 1.4 }}>
          Natural wearable 3-layer overlay. Match your Base Shalwar Kameez color, fit tailored Waistcoats &amp; Prince Coats, drape a Swati Chador, and pair luxury footwear in one unified frame.
        </p>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO WORKBENCH (VERTICAL AVATAR ON LEFT/CENTER, CONTROLS ON RIGHT) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "start",
          marginBottom: "20px"
        }}
      >
        {/* === COLUMN 1: THE TALL VERTICAL HUMAN AVATAR STAGE === */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "420px",
            margin: "0 auto",
            borderRadius: "24px",
            overflow: "hidden",
            background: "radial-gradient(circle at 50% 25%, #232328 0%, #151518 70%, #0d0d10 100%)",
            border: "2px solid rgba(212, 175, 55, 0.4)",
            boxShadow: "0 20px 45px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.5)",
            boxSizing: "border-box"
          }}
        >
          {/* TOP AVATAR STATUS BADGE */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              right: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 30,
              pointerEvents: "none"
            }}
          >
            <div
              style={{
                background: "rgba(10, 10, 12, 0.75)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                backdropFilter: "blur(6px)",
                borderRadius: "12px",
                padding: "4px 10px",
                fontSize: "0.68rem",
                fontWeight: "800",
                color: "#fef08a"
              }}
            >
              👔 {selectedSuit.name} Suit
            </div>

            <div
              style={{
                background: "rgba(10, 10, 12, 0.75)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                backdropFilter: "blur(6px)",
                borderRadius: "12px",
                padding: "4px 10px",
                fontSize: "0.68rem",
                fontWeight: "800",
                color: "#d4af37"
              }}
            >
              🧥 {selectedOverwear?.title?.split(" ")[0]} {selectedOverwear?.title?.split(" ")[1]}
            </div>
          </div>

          {/* THE MANNEQUIN VIEWPORT */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "500 / 1450",
              overflow: "hidden"
            }}
          >
            {/* BASE PHOTOREALISTIC AVATAR IMAGE */}
            <img
              src="/assets/avatar_studio_mannequin.jpg"
              alt="Digital Mannequin Head-to-Toe Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />

            {/* LAYER 1: BASE SUIT DYNAMIC COLOR FILTER OVERLAY */}
            {selectedSuit.id !== "navy" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  mixBlendMode: selectedSuit.id === "black" ? "multiply" : "color",
                  filter: selectedSuit.filter,
                  opacity: selectedSuit.id === "white" ? 0.75 : 0.85,
                  transition: "all 0.4s ease"
                }}
              >
                {/* SVG Silhouette Mask for Kameez Sleeves, Collar & Daman */}
                <svg
                  viewBox="0 0 500 1450"
                  style={{ width: "100%", height: "100%", display: "block" }}
                >
                  {/* Collar Ban */}
                  <ellipse cx="248" cy="245" rx="36" ry="14" fill={selectedSuit.hex} />
                  {/* Left Sleeve (arm) */}
                  <path
                    d="M 60,310 C 45,390 42,560 52,690 L 115,670 C 110,540 115,380 135,310 Z"
                    fill={selectedSuit.hex}
                  />
                  {/* Right Sleeve (under chador) */}
                  <path
                    d="M 410,430 C 445,450 465,490 472,550 L 440,560 C 430,510 415,480 395,450 Z"
                    fill={selectedSuit.hex}
                  />
                  {/* Kameez Daman (Hem below waistcoat) */}
                  <path
                    d="M 115,740 L 98,990 C 160,1005 240,1005 295,990 L 295,740 Z"
                    fill={selectedSuit.hex}
                  />
                  {/* Shalwar Trousers */}
                  <path
                    d="M 105,1000 C 95,1150 115,1300 145,1370 L 225,1370 C 215,1280 230,1150 240,1010 Z"
                    fill={selectedSuit.hex}
                  />
                  <path
                    d="M 260,1010 C 270,1150 285,1280 275,1370 L 355,1370 C 385,1300 405,1150 395,1000 Z"
                    fill={selectedSuit.hex}
                  />
                </svg>
              </div>
            )}

            {/* LAYER 2: OVERWEAR TORSO MASK (WAISTCOAT / PRINCE COAT) */}
            {selectedOverwear?.id !== 405 && (
              <div
                style={{
                  position: "absolute",
                  top: "16.5%",
                  left: "17%",
                  width: "48%",
                  height: "36%",
                  pointerEvents: "none",
                  zIndex: 15,
                  mixBlendMode: "multiply",
                  opacity: 0.94,
                  clipPath: "polygon(22% 0%, 78% 0%, 100% 18%, 88% 95%, 52% 100%, 12% 95%, 0% 18%)",
                  transition: "all 0.3s ease"
                }}
              >
                <img
                  src={selectedOverwear?.image}
                  alt={selectedOverwear?.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            )}

            {/* LAYER 2B: SWATI SHAWL / CHADOR OVERLAY */}
            {isChadorActive && selectedShawl?.id !== 301 && (
              <div
                style={{
                  position: "absolute",
                  top: "17%",
                  right: "4%",
                  width: "52%",
                  height: "56%",
                  pointerEvents: "none",
                  zIndex: 18,
                  mixBlendMode: "multiply",
                  opacity: 0.92,
                  clipPath: "polygon(15% 0%, 85% 0%, 100% 25%, 85% 95%, 45% 100%, 0% 75%)",
                  transition: "all 0.3s ease"
                }}
              >
                <img
                  src={selectedShawl?.image}
                  alt={selectedShawl?.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            )}

            {/* LAYER 3: FOOTWEAR OVERLAY AT FEET */}
            {selectedFootwear?.id !== 501 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "1.2%",
                  left: "14%",
                  right: "14%",
                  height: "11%",
                  pointerEvents: "none",
                  zIndex: 20,
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-end"
                }}
              >
                <img
                  src={selectedFootwear?.image}
                  alt={selectedFootwear?.title}
                  style={{
                    width: "92%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.85))"
                  }}
                />
              </div>
            )}

            {/* ============================================================== */}
            {/* IN-SYSTEM FLOATING UI POINTER PILLS (MATCHING IMAGE_61.PNG) */}
            {/* ============================================================== */}

            {/* 1. Mandarin Collar Pill */}
            <div
              onClick={() => handlePillClick(1, "collar")}
              style={{
                position: "absolute",
                top: "14.5%",
                left: "8%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "collar" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "collar" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "collar" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Mandarin Collar</span>
            </div>

            {/* 2. Sleeves Visibility Pill */}
            <div
              onClick={() => handlePillClick(1, "sleeves")}
              style={{
                position: "absolute",
                top: "27%",
                left: "4%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "sleeves" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "sleeves" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "sleeves" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Sleeves Visibility</span>
            </div>

            {/* 3. Waistcoat Fits On Torso Pill */}
            <div
              onClick={() => handlePillClick(2, "waistcoat")}
              style={{
                position: "absolute",
                top: "39%",
                left: "5%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "waistcoat" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "waistcoat" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "waistcoat" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Waistcoat Torso Fit</span>
            </div>

            {/* 4. Chador Layer Pill */}
            <div
              onClick={() => handlePillClick(2, "chador")}
              style={{
                position: "absolute",
                top: "14.5%",
                right: "8%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "chador" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "chador" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "chador" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Chador Drape Layer</span>
            </div>

            {/* 5. Luxury Gold Watch Pill */}
            <div
              onClick={() => handlePillClick(2, "watch")}
              style={{
                position: "absolute",
                top: "47%",
                right: "6%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "watch" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "watch" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "watch" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Luxury Gold Watch</span>
            </div>

            {/* 6. Floor Level Footwear Pill */}
            <div
              onClick={() => handlePillClick(3, "footwear")}
              style={{
                position: "absolute",
                bottom: "5%",
                left: "8%",
                zIndex: 25,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: highlightedPill === "footwear" ? "rgba(212, 175, 55, 0.9)" : "rgba(18, 18, 22, 0.82)",
                color: highlightedPill === "footwear" ? "#000000" : "#ffffff",
                border: "1px solid rgba(212, 175, 55, 0.6)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                padding: "4px 9px",
                borderRadius: "20px",
                fontSize: "0.62rem",
                fontWeight: "800",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ color: highlightedPill === "footwear" ? "#000000" : "#fef08a" }}>✦</span>
              <span>Floor Level Footwear</span>
            </div>
          </div>
        </div>

        {/* === COLUMN 2: 3-STEP CUSTOMIZATION CONTROL PANEL === */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* STEP TABS (1, 2, 3) */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              background: "rgba(255,255,255,0.04)",
              padding: "4px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            {[
              { num: 1, label: "Step 1: Kameez" },
              { num: 2, label: "Step 2: Waistcoat / Shawl" },
              { num: 3, label: "Step 3: Footwear" }
            ].map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  border: "none",
                  background: activeStep === st.num ? "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)" : "transparent",
                  color: activeStep === st.num ? "#000000" : "#a1a1aa",
                  boxShadow: activeStep === st.num ? "0 4px 12px rgba(212, 175, 55, 0.3)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* === CONTENT FOR STEP 1: BASE SHALWAR KAMEEZ FABRIC COLOR === */}
          {activeStep === 1 && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "20px",
                padding: "16px"
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "#fef08a", marginBottom: "4px" }}>
                STEP 1: SELECT BASE SHALWAR KAMEEZ COLOR
              </div>
              <p style={{ margin: "0 0 14px", fontSize: "0.75rem", color: "#a1a1aa" }}>
                Real-time fabric drape with visible collar, cuffs &amp; pleats:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {SUIT_COLORS.map((suit) => {
                  const isSelected = suit.id === selectedSuit.id;
                  return (
                    <div
                      key={suit.id}
                      onClick={() => setSelectedSuit(suit)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        background: isSelected ? "rgba(212, 175, 55, 0.18)" : "rgba(255,255,255,0.03)",
                        border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isSelected ? "0 0 14px rgba(212, 175, 55, 0.35)" : "none",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            background: suit.hex,
                            border: "2px solid #ffffff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                          }}
                        />
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#ffffff" }}>
                            {suit.name}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "#a1a1aa" }}>{suit.desc}</div>
                        </div>
                      </div>

                      <div style={{ fontSize: "0.74rem", fontWeight: "800", color: "#d4af37" }}>
                        Rs. {baseSuitPrice.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === CONTENT FOR STEP 2: CHOOSE WAISTCOAT / PRINCE COAT & SWATI CHADOR === */}
          {activeStep === 2 && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "20px",
                padding: "16px"
              }}
            >
              {/* Overwear Filter Tabs */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: "800", color: "#fef08a" }}>
                  STEP 2: CHOOSE TORSO OVERWEAR
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[
                    { key: "all", label: "All Coats" },
                    { key: "waistcoats", label: "Waistcoats (Rs. 3k-4k)" },
                    { key: "coats", label: "Prince Coats (Rs. 4k)" }
                  ].map((tb) => (
                    <button
                      key={tb.key}
                      onClick={() => setOverwearTab(tb.key)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "8px",
                        fontSize: "0.62rem",
                        fontWeight: "750",
                        background: overwearTab === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                        color: overwearTab === tb.key ? "#000000" : "#d4d4d8",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overwear Horizontal Reel */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "10px",
                  marginBottom: "16px",
                  scrollbarWidth: "none"
                }}
              >
                {filteredOverwear.map((item) => {
                  const isSelected = item.id === selectedOverwear?.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedOverwear(item)}
                      style={{
                        flex: "0 0 100px",
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
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <div style={{ fontSize: "0.64rem", fontWeight: "750", color: "#ffffff", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.68rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#d4af37" }}>
                        Rs. {item.price.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SWATI CHADOR TOGGLE & DRAWER */}
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "14px",
                  padding: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.25)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      id="chadorCheck"
                      checked={isChadorActive}
                      onChange={(e) => setIsChadorActive(e.target.checked)}
                      style={{ width: "16px", height: "16px", accentColor: "#d4af37", cursor: "pointer" }}
                    />
                    <label htmlFor="chadorCheck" style={{ fontSize: "0.75rem", fontWeight: "800", color: "#fef08a", cursor: "pointer" }}>
                      Wear Swati Woolen Chador (+Rs. {selectedShawl?.price?.toLocaleString()})
                    </label>
                  </div>
                  <span style={{ fontSize: "0.68rem", color: isChadorActive ? "#10b981" : "#a1a1aa", fontWeight: "750" }}>
                    {isChadorActive ? "✓ Draped on Shoulder" : "Removed"}
                  </span>
                </div>

                {isChadorActive && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      overflowX: "auto",
                      paddingBottom: "4px",
                      scrollbarWidth: "none"
                    }}
                  >
                    {realShawls.map((shawl) => {
                      const isSel = shawl.id === selectedShawl?.id;
                      return (
                        <div
                          key={shawl.id}
                          onClick={() => setSelectedShawl(shawl)}
                          style={{
                            flex: "0 0 85px",
                            cursor: "pointer",
                            textAlign: "center",
                            borderRadius: "10px",
                            border: isSel ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                            background: isSel ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.03)",
                            padding: "4px",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                            <img src={shawl.image} alt={shawl.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          </div>
                          <div style={{ fontSize: "0.58rem", fontWeight: "700", color: "#ffffff", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {shawl.title}
                          </div>
                          <div style={{ fontSize: "0.62rem", fontWeight: "800", color: "#d4af37" }}>
                            Rs. {shawl.price.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === CONTENT FOR STEP 3: CHOOSE FOOTWEAR === */}
          {activeStep === 3 && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "20px",
                padding: "16px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: "800", color: "#fef08a" }}>
                  STEP 3: CHOOSE FOOTWEAR ({filteredFootwear.length} ITEMS)
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[
                    { key: "all", label: "All" },
                    { key: "boots", label: "Boots/Shoes" },
                    { key: "chappals", label: "Chappals" },
                    { key: "loafers", label: "Loafers" }
                  ].map((tb) => (
                    <button
                      key={tb.key}
                      onClick={() => setFootwearTab(tb.key)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "8px",
                        fontSize: "0.62rem",
                        fontWeight: "750",
                        background: footwearTab === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                        color: footwearTab === tb.key ? "#000000" : "#d4d4d8",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))",
                  gap: "10px",
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px",
                  scrollbarWidth: "thin"
                }}
              >
                {filteredFootwear.map((shoe) => {
                  const isSelected = shoe.id === selectedFootwear?.id;
                  return (
                    <div
                      key={shoe.id}
                      onClick={() => setSelectedFootwear(shoe)}
                      style={{
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
                          src={shoe.image}
                          alt={shoe.title}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <div style={{ fontSize: "0.62rem", fontWeight: "750", color: "#ffffff", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {shoe.title}
                      </div>
                      <div style={{ fontSize: "0.68rem", fontWeight: "800", color: isSelected ? "#fef08a" : "#d4af37" }}>
                        Rs. {shoe.price.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === PRICE BREAKDOWN & 1-CLICK CHECKOUT CARD === */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.16) 0%, rgba(20, 20, 24, 0.95) 100%)",
              borderRadius: "20px",
              border: "1.5px solid rgba(212, 175, 55, 0.6)",
              padding: "16px 18px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "0.68rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Active Avatar Outfit:
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#fef08a", marginTop: "2px" }}>
                  {selectedSuit.name} Suit + {selectedOverwear?.title?.split(" ")[0]} {selectedOverwear?.title?.split(" ")[1]} + {selectedFootwear?.title?.split(" ")[0]} {selectedFootwear?.title?.split(" ")[1]}
                </div>
                {isChadorActive && (
                  <div style={{ fontSize: "0.72rem", color: "#d4af37", marginTop: "2px" }}>
                    + {selectedShawl?.title}
                  </div>
                )}
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.68rem", color: "#fef08a", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Total Look Price:
                </div>
                <div style={{ fontSize: "1.45rem", fontWeight: "900", color: "#d4af37", textShadow: "0 0 16px rgba(212, 175, 55, 0.45)" }}>
                  Rs. {totalLookPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* VAULT BONUS BADGE */}
            {isVaultUnlocked && (
              <div
                style={{
                  marginBottom: "12px",
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
                <span>SHAHI TIJORI ACTIVE: +1 FREE 30ml Luxury Perfume will be dispatched with this outfit!</span>
              </div>
            )}

            {/* CTA BUTTONS */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={handleAddToCartCompleteLook}
                style={{
                  flex: "1 1 180px",
                  background: addedAnimation
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)",
                  color: addedAnimation ? "#ffffff" : "#18181b",
                  border: "none",
                  borderRadius: "14px",
                  padding: "13px 16px",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                  transition: "all 0.2s ease"
                }}
              >
                {addedAnimation ? "✓ Complete Look Added to Bag!" : "🛒 Add Complete Look to Bag"}
              </button>

              <a
                href={`https://wa.me/923336712345?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: "1 1 180px",
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  color: "#ffffff",
                  borderRadius: "14px",
                  padding: "13px 16px",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                  cursor: "pointer"
                }}
              >
                <span>💬 Order Look on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
