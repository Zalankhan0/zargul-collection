"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

// 5 BASE SHALWAR KAMEEZ SUIT COLORS (FABRIC & SHADOW PALETTES)
const SUIT_COLORS = [
  {
    id: "white",
    name: "Pure White",
    hex: "#FFFFFF",
    desc: "Crisp Pure Cotton White",
    primary: "#FFFFFF",
    secondary: "#F3F4F6",
    shadow: "#D1D5DB",
    stitch: "#94A3B8",
    button: "#E2E8F0",
    textDark: true,
    border: "#CBD5E1",
    tagBg: "rgba(255,255,255,0.95)"
  },
  {
    id: "boski",
    name: "Royal Boski / Cream",
    hex: "#F4E6C3",
    desc: "Authentic Silk Boski Drape",
    primary: "#FFF8EA",
    secondary: "#F4E5BF",
    shadow: "#DCBF88",
    stitch: "#B88E3E",
    button: "#D4AF37",
    textDark: true,
    border: "#D6C39A",
    tagBg: "rgba(244, 230, 195, 0.95)"
  },
  {
    id: "black",
    name: "Jet Black",
    hex: "#141414",
    desc: "Deep Formal Midnight Black",
    primary: "#27272A",
    secondary: "#141416",
    shadow: "#09090B",
    stitch: "#52525B",
    button: "#71717A",
    textDark: false,
    border: "#3F3F46",
    tagBg: "rgba(20, 20, 22, 0.95)"
  },
  {
    id: "navy",
    name: "Deep Navy Blue",
    hex: "#1B263B",
    desc: "Royal Marine Midnight Navy",
    primary: "#253858",
    secondary: "#16233B",
    shadow: "#0C1422",
    stitch: "#3B82F6",
    button: "#60A5FA",
    textDark: false,
    border: "#334155",
    tagBg: "rgba(27, 38, 59, 0.95)"
  },
  {
    id: "charcoal",
    name: "Charcoal Grey",
    hex: "#373A40",
    desc: "Executive Slate Charcoal",
    primary: "#4B505A",
    secondary: "#33373E",
    shadow: "#1E2024",
    stitch: "#64748B",
    button: "#94A3B8",
    textDark: false,
    border: "#52525B",
    tagBg: "rgba(55, 58, 64, 0.95)"
  }
];

export default function KhanLookStudio() {
  const { products, addToCart, isVaultUnlocked } = useStore();

  // Dynamic products from real shop inventory
  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real Overwear & Footwear
  const realOverwear = allProducts.filter((p) => p.category === "Coats" || p.category === "Shawls");
  const realFootwear = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );

  // States
  const [selectedSuit, setSelectedSuit] = useState(SUIT_COLORS[0]); // Pure White
  const [selectedOverwear, setSelectedOverwear] = useState(realOverwear[0] || INITIAL_PRODUCTS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(realFootwear[0] || INITIAL_PRODUCTS[1]);
  const [overwearFilter, setOverwearFilter] = useState("all");
  const [footwearFilter, setFootwearFilter] = useState("all");
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Check garment type for tailored mask
  const isPrinceCoat = selectedOverwear?.title?.toLowerCase().includes("prince");
  const isShawl = selectedOverwear?.category === "Shawls";

  // Filtered lists for selector drawers
  const filteredOverwear = realOverwear.filter((p) => {
    if (overwearFilter === "coats") return p.category === "Coats" && p.price === 4000;
    if (overwearFilter === "waistcoats") return p.category === "Coats" && p.price === 3000;
    if (overwearFilter === "shawls") return p.category === "Shawls";
    return true;
  });

  const filteredFootwear = realFootwear.filter((p) => {
    if (footwearFilter === "chappals") return p.category === "Peshawari Chappals";
    if (footwearFilter === "shoes") return p.category === "Footwear" && (p.title.includes("Boots") || p.title.includes("Shoes"));
    if (footwearFilter === "loafers") return p.category === "Footwear" && p.title.includes("Loafer");
    return true;
  });

  // Cycle footwear at feet
  const currentFootwearIdx = filteredFootwear.findIndex((f) => f.id === selectedFootwear?.id);
  const handlePrevFootwear = () => {
    if (filteredFootwear.length === 0) return;
    const prev = (currentFootwearIdx - 1 + filteredFootwear.length) % filteredFootwear.length;
    setSelectedFootwear(filteredFootwear[prev]);
  };
  const handleNextFootwear = () => {
    if (filteredFootwear.length === 0) return;
    const next = (currentFootwearIdx + 1) % filteredFootwear.length;
    setSelectedFootwear(filteredFootwear[next]);
  };

  const totalLookPrice = (selectedOverwear?.price || 0) + (selectedFootwear?.price || 0);

  const handleBuyThisLook = () => {
    if (selectedOverwear) addToCart(selectedOverwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    if (selectedFootwear) addToCart(selectedFootwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2400);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI styled my Complete Khan Look on the Full-Body Virtual Mannequin:\n• Base Shalwar Kameez: ${selectedSuit.name} (${selectedSuit.desc})\n• Overwear: ${selectedOverwear?.title} (Rs. ${(selectedOverwear?.price || 0).toLocaleString()})\n• Footwear: ${selectedFootwear?.title} (Rs. ${(selectedFootwear?.price || 0).toLocaleString()})\n• Total Look Price: Rs. ${totalLookPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\nPlease confirm dispatch details!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
        borderRadius: "26px",
        border: "2px solid rgba(212, 175, 55, 0.45)",
        boxShadow: "0 18px 45px rgba(0,0,0,0.45), 0 0 35px rgba(197, 160, 89, 0.15)",
        padding: "24px 16px 32px",
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
            Khan Look Studio • Head-to-Toe Virtual Avatar
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
          Apna Pura Khan Look Customize Karein
        </h2>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#a1a1aa" }}>
          Single unified standing mannequin: Change Shalwar Kameez color, fit your Waistcoat/Coat, and match Footwear in one frame.
        </p>
      </div>

      {/* 1. STEP 1: SHALWAR KAMEEZ FABRIC COLOR SELECTOR SWATCHES */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "0.74rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", marginBottom: "10px" }}>
          Step 1: Select Base Shalwar Kameez Fabric:
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
                  gap: "8px",
                  padding: "8px 15px",
                  borderRadius: "22px",
                  background: isSelected ? "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)" : "rgba(255,255,255,0.06)",
                  color: isSelected ? "#000000" : "#ffffff",
                  border: isSelected ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.15)",
                  boxShadow: isSelected ? "0 4px 16px rgba(212, 175, 55, 0.45)" : "none",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  transition: "all 0.2s ease"
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: suit.hex,
                    border: `1.5px solid ${suit.border}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                  }}
                />
                <span>{suit.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. THE UNIFIED FULL-BODY VIRTUAL MANNEQUIN (HEAD-TO-TOE CENTER STAGE) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto 24px",
          minHeight: "580px",
          borderRadius: "28px",
          background: "radial-gradient(circle at 50% 25%, #2a2a30 0%, #18181c 60%, #0d0d10 100%)",
          border: "2px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 2px 14px rgba(212, 175, 55, 0.15)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "16px 12px 14px",
          boxSizing: "border-box"
        }}
      >
        {/* TOP STATUS BADGES */}
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 6px", marginBottom: "4px", zIndex: 20 }}>
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "10px",
              padding: "4px 8px",
              fontSize: "0.65rem",
              fontWeight: "750",
              color: "#fef08a"
            }}
          >
            👔 {selectedSuit.name} Suit
          </div>
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "10px",
              padding: "4px 8px",
              fontSize: "0.65rem",
              fontWeight: "750",
              color: "#d4af37"
            }}
          >
            🧥 {selectedOverwear?.title}
          </div>
        </div>

        {/* FULL-BODY SVG MANNEQUIN (320px x 540px) */}
        <svg
          viewBox="0 0 320 540"
          style={{
            width: "100%",
            height: "460px",
            overflow: "visible"
          }}
        >
          <defs>
            {/* Dynamic Shalwar Kameez Fabric Gradients based on selectedSuit */}
            <linearGradient id="suitFabricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={selectedSuit.primary} />
              <stop offset="50%" stopColor={selectedSuit.secondary} />
              <stop offset="100%" stopColor={selectedSuit.shadow} />
            </linearGradient>

            <linearGradient id="suitSleeveGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={selectedSuit.primary} />
              <stop offset="70%" stopColor={selectedSuit.secondary} />
              <stop offset="100%" stopColor={selectedSuit.shadow} />
            </linearGradient>

            <linearGradient id="suitSleeveGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={selectedSuit.primary} />
              <stop offset="70%" stopColor={selectedSuit.secondary} />
              <stop offset="100%" stopColor={selectedSuit.shadow} />
            </linearGradient>

            <linearGradient id="suitCollarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={selectedSuit.primary} />
              <stop offset="100%" stopColor={selectedSuit.secondary} />
            </linearGradient>

            <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.65)" />
              <stop offset="55%" stopColor="rgba(0,0,0,0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <filter id="vestShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.6)" />
            </filter>

            {/* 1. TAILORED WAISTCOAT MASK (Cut-out armholes, V-neck opening, and notched bottom points) */}
            <clipPath id="waistcoatVestMask" clipPathUnits="userSpaceOnUse">
              <path d="
                M 124,46
                L 78,68
                C 86,105 92,130 92,148
                C 92,180 98,210 94,228
                L 125,242
                L 160,228
                L 195,242
                L 226,228
                C 222,210 228,180 228,148
                C 228,130 234,105 242,68
                L 196,46
                C 185,62 173,70 160,70
                C 147,70 135,62 124,46
                Z
              " />
            </clipPath>

            {/* 2. TAILORED PRINCE COAT MASK (Longer Imperial Cut) */}
            <clipPath id="princeCoatMask" clipPathUnits="userSpaceOnUse">
              <path d="
                M 124,44
                L 68,66
                C 56,120 50,175 52,230
                L 84,235
                L 94,150
                L 96,275
                C 135,282 185,282 224,275
                L 226,150
                L 236,235
                L 268,230
                C 270,175 264,120 252,66
                L 196,44
                C 185,58 173,66 160,66
                C 147,66 135,58 124,44
                Z
              " />
            </clipPath>

            {/* 3. SWATI SHAWL DRAPE MASK */}
            <clipPath id="swatiShawlMask" clipPathUnits="userSpaceOnUse">
              <path d="
                M 60,66
                C 110,58 210,58 260,66
                L 272,265
                C 210,290 110,290 48,265
                Z
              " />
            </clipPath>
          </defs>

          {/* A. STUDIO FLOOR PEDESTAL & OVAL SHADOW */}
          <ellipse cx="160" cy="495" rx="115" ry="18" fill="url(#floorShadow)" />
          <ellipse cx="160" cy="495" rx="122" ry="19" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" strokeDasharray="6,4" />

          {/* B. PAKISTANI PLEATED SHALWAR (LEGS FROM WAIST TO ANKLES) */}
          <g id="mannequinShalwar">
            {/* Left Leg Pleats */}
            <path
              d="M 88,285 C 72,335 82,398 114,442 L 146,442 C 136,395 146,340 156,295 Z"
              fill="url(#suitFabricGradient)"
              stroke={selectedSuit.stitch}
              strokeWidth="1"
            />
            <path d="M 112,305 C 100,350 110,405 125,442" fill="none" stroke={selectedSuit.shadow} strokeWidth="1.5" />
            {/* Left Ankle Paanha (Cuff) */}
            <rect x="114" y="436" width="32" height="7" fill={selectedSuit.secondary} stroke={selectedSuit.stitch} strokeWidth="1" rx="2" />

            {/* Right Leg Pleats */}
            <path
              d="M 232,285 C 248,335 238,398 206,442 L 174,442 C 184,395 174,340 164,295 Z"
              fill="url(#suitFabricGradient)"
              stroke={selectedSuit.stitch}
              strokeWidth="1"
            />
            <path d="M 208,305 C 220,350 210,405 195,442" fill="none" stroke={selectedSuit.shadow} strokeWidth="1.5" />
            {/* Right Ankle Paanha (Cuff) */}
            <rect x="174" y="436" width="32" height="7" fill={selectedSuit.secondary} stroke={selectedSuit.stitch} strokeWidth="1" rx="2" />
          </g>

          {/* C. KAMEEZ LOWER DAMAN (HEM EXTENDING BELOW WAISTCOAT) */}
          <g id="mannequinKameezDaman">
            <path
              d="M 96,215 L 86,290 C 125,298 195,298 234,290 L 224,215 Z"
              fill="url(#suitFabricGradient)"
              stroke={selectedSuit.stitch}
              strokeWidth="1.2"
            />
            {/* Daman bottom double stitching */}
            <path d="M 88,286 C 125,294 195,294 232,286" fill="none" stroke={selectedSuit.stitch} strokeWidth="1" strokeDasharray="3,2" />
            {/* Side Chaak Slits */}
            <line x1="86" y1="230" x2="86" y2="290" stroke={selectedSuit.stitch} strokeWidth="1.5" />
            <line x1="234" y1="230" x2="234" y2="290" stroke={selectedSuit.stitch} strokeWidth="1.5" />
          </g>

          {/* D. FULL KURTA SLEEVES (LEFT & RIGHT ARMS - 100% VISIBLE OUTSIDE VEST) */}
          <g id="mannequinSleeves">
            {/* Left Arm Full Sleeve */}
            <path
              d="M 62,66 C 44,120 40,205 46,275 L 84,272 C 80,210 82,130 92,86 Z"
              fill="url(#suitSleeveGradientLeft)"
              stroke={selectedSuit.stitch}
              strokeWidth="1.2"
            />
            {/* Left Sleeve Drape Fold */}
            <path d="M 58,110 C 50,165 52,220 56,268" fill="none" stroke={selectedSuit.shadow} strokeWidth="1.2" />
            {/* Left Cuff (Kaaf) at wrist */}
            <rect x="46" y="254" width="38" height="18" fill={selectedSuit.secondary} stroke={selectedSuit.stitch} strokeWidth="1" rx="2" />
            <circle cx="65" cy="263" r="2.5" fill={selectedSuit.button} />

            {/* Right Arm Full Sleeve */}
            <path
              d="M 258,66 C 276,120 280,205 274,275 L 236,272 C 240,210 238,130 228,86 Z"
              fill="url(#suitSleeveGradientRight)"
              stroke={selectedSuit.stitch}
              strokeWidth="1.2"
            />
            {/* Right Sleeve Drape Fold */}
            <path d="M 262,110 C 270,165 268,220 264,268" fill="none" stroke={selectedSuit.shadow} strokeWidth="1.2" />
            {/* Right Cuff (Kaaf) at wrist */}
            <rect x="236" y="254" width="38" height="18" fill={selectedSuit.secondary} stroke={selectedSuit.stitch} strokeWidth="1" rx="2" />
            <circle cx="255" cy="263" r="2.5" fill={selectedSuit.button} />
          </g>

          {/* E. MANDARIN BAN COLLAR & NECK PLACKET (POPS OUT ABOVE VEST) */}
          <g id="mannequinCollar">
            {/* Stand-up Ban Collar */}
            <path
              d="M 126,26 C 140,20 180,20 194,26 C 196,44 194,48 160,50 C 126,48 124,44 126,26 Z"
              fill="url(#suitCollarGradient)"
              stroke={selectedSuit.stitch}
              strokeWidth="1.5"
            />
            {/* Collar top stitch */}
            <path d="M 128,30 C 140,24 180,24 192,30" fill="none" stroke={selectedSuit.stitch} strokeWidth="1" strokeDasharray="3,2" />

            {/* Front Chest Placket (Teera) */}
            <rect x="154" y="49" width="12" height="58" fill={selectedSuit.secondary} stroke={selectedSuit.stitch} strokeWidth="1" />
            {/* Tailored Buttons */}
            <circle cx="160" cy="62" r="2.5" fill={selectedSuit.button} stroke={selectedSuit.stitch} strokeWidth="0.5" />
            <circle cx="160" cy="80" r="2.5" fill={selectedSuit.button} stroke={selectedSuit.stitch} strokeWidth="0.5" />
            <circle cx="160" cy="98" r="2.5" fill={selectedSuit.button} stroke={selectedSuit.stitch} strokeWidth="0.5" />
          </g>

          {/* F. WORN OVERWEAR GARMENT SILHOUETTE (WAISTCOAT / PRINCE COAT / SHAWL) */}
          {/* Strictly clipped by tailored vest mask - NO square screenshot boxes! */}
          <g filter="url(#vestShadow)">
            <g clipPath={isShawl ? "url(#swatiShawlMask)" : isPrinceCoat ? "url(#princeCoatMask)" : "url(#waistcoatVestMask)"}>
              <image
                href={selectedOverwear?.image}
                x={isPrinceCoat ? "45" : "68"}
                y="42"
                width={isPrinceCoat ? "230" : "184"}
                height={isPrinceCoat ? "245" : "205"}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </g>

          {/* Overwear Border Outline Accent */}
          {!isShawl && !isPrinceCoat && (
            <path
              d="M 124,46 L 78,68 C 86,105 92,130 92,148 C 92,180 98,210 94,228 L 125,242 L 160,228 L 195,242 L 226,228 C 222,210 228,180 228,148 C 228,130 234,105 242,68 L 196,46 C 185,62 173,70 160,70 C 147,70 135,62 124,46 Z"
              fill="none"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="1.2"
            />
          )}

          {/* G. FOOTWEAR MOUNTED DIRECTLY AT THE ANKLES / FEET (BOTTOM OF MANNEQUIN) */}
          <g id="mannequinFootwear">
            <image
              href={selectedFootwear?.image}
              x="55"
              y="432"
              width="210"
              height="85"
              preserveAspectRatio="xMidYMid contain"
            />
          </g>
        </svg>

        {/* FOOTWEAR CONTROLS AT FEET (FLOATING ON PEDESTAL) */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(18, 18, 20, 0.85)",
            border: "1px solid rgba(212, 175, 55, 0.45)",
            backdropFilter: "blur(8px)",
            borderRadius: "18px",
            padding: "5px 10px",
            zIndex: 25
          }}
        >
          <button
            onClick={handlePrevFootwear}
            aria-label="Previous Shoes"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.2)",
              color: "#fef08a",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "900"
            }}
          >
            ‹
          </button>

          <div style={{ textAlign: "center", overflow: "hidden", padding: "0 6px" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              👞 {selectedFootwear?.title}
            </div>
            <div style={{ fontSize: "0.62rem", color: "#fef08a", fontWeight: "750" }}>
              Rs. {(selectedFootwear?.price || 0).toLocaleString()} (At Feet)
            </div>
          </div>

          <button
            onClick={handleNextFootwear}
            aria-label="Next Shoes"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.2)",
              color: "#fef08a",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "900"
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* 3. STEP 2: SELECT WAISTCOAT / PRINCE COAT / SHAWL DRAWER */}
      <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
            STEP 2: CHOOSE WAISTCOAT / COAT ({realOverwear.length} REAL ITEMS):
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[
              { key: "all", label: "All" },
              { key: "coats", label: "Prince Coats (Rs. 4,000)" },
              { key: "waistcoats", label: "Waistcoats (Rs. 3,000)" },
              { key: "shawls", label: "Swati Shawls" }
            ].map((tb) => (
              <button
                key={tb.key}
                onClick={() => setOverwearFilter(tb.key)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "10px",
                  fontSize: "0.64rem",
                  fontWeight: "750",
                  background: overwearFilter === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                  color: overwearFilter === tb.key ? "#000000" : "#d4d4d8",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: "0.7rem", fontWeight: "750", color: "#d4af37", marginBottom: "8px" }}>
          Active Garment: {selectedOverwear?.title} (Rs. {(selectedOverwear?.price || 0).toLocaleString()})
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
          {filteredOverwear.map((item) => {
            const isSelected = item.id === selectedOverwear?.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedOverwear(item)}
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

      {/* 4. STEP 3: SELECT FOOTWEAR DRAWER */}
      <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "0.8px" }}>
            STEP 3: CHOOSE FOOTWEAR ({realFootwear.length} REAL ITEMS):
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
                onClick={() => setFootwearFilter(tb.key)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "10px",
                  fontSize: "0.64rem",
                  fontWeight: "750",
                  background: footwearFilter === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                  color: footwearFilter === tb.key ? "#000000" : "#d4d4d8",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: "0.7rem", fontWeight: "750", color: "#d4af37", marginBottom: "8px" }}>
          Active Shoes: {selectedFootwear?.title} (Rs. {(selectedFootwear?.price || 0).toLocaleString()})
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
          {filteredFootwear.map((item) => {
            const isSelected = item.id === selectedFootwear?.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFootwear(item)}
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

      {/* 5. FINAL LOOK SUMMARY & INSTANT PURCHASE ACTIONS */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(24, 24, 27, 0.9) 100%)",
          borderRadius: "20px",
          border: "1.5px solid rgba(212, 175, 55, 0.6)",
          padding: "16px 20px",
          marginBottom: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
              Complete Avatar Lookbook:
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: "750", color: "#fef08a", marginTop: "2px" }}>
              {selectedSuit.name} Kurta &amp; Shalwar + {selectedOverwear?.title} + {selectedFootwear?.title}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.7rem", color: "#fef08a", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
              Total Look Price (COD):
            </div>
            <div style={{ fontSize: "1.45rem", fontWeight: "900", color: "#d4af37", textShadow: "0 0 15px rgba(212, 175, 55, 0.4)" }}>
              Rs. {totalLookPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* VAULT BONUS BADGE */}
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
            <span>SHAHI TIJORI PERK ACTIVE: +1 FREE 30ml Luxury Perfume will be dispatched with this complete look!</span>
          </div>
        )}
      </div>

      {/* CTA BUTTONS */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={handleBuyThisLook}
          style={{
            flex: "1 1 200px",
            background: addedAnimation
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)",
            color: addedAnimation ? "#ffffff" : "#18181b",
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
          {addedAnimation ? "✓ Complete Look Added to Bag!" : "Add Complete Look to Bag"}
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
          <span>💬 Order Complete Look via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
