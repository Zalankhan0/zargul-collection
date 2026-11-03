"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

// 5 BASE SHALWAR KAMEEZ SUIT COLORS WITH REALISTIC FABRIC TEXTURES & STITCH DETAILS
const SUIT_COLORS = [
  {
    id: "white",
    name: "Pure White",
    hex: "#FFFFFF",
    desc: "Crisp Pure Cotton White",
    bgGradient: "linear-gradient(145deg, #ffffff 0%, #f4f4f6 55%, #e5e5e8 100%)",
    collarGradient: "linear-gradient(180deg, #ffffff 0%, #ededf1 100%)",
    sleeveGradient: "linear-gradient(135deg, #ffffff 0%, #f1f1f4 50%, #e2e2e6 100%)",
    stitchColor: "#cbd5e1",
    buttonColor: "#e2e8f0",
    textColor: "#18181b",
    border: "#d4d4d8",
    shadow: "rgba(0,0,0,0.12)"
  },
  {
    id: "boski",
    name: "Royal Boski / Cream",
    hex: "#F4E6C3",
    desc: "Authentic Silk Boski Drape",
    bgGradient: "linear-gradient(145deg, #fffbf0 0%, #f5e7c4 50%, #e7d29f 100%)",
    collarGradient: "linear-gradient(180deg, #fff8e7 0%, #edd8a8 100%)",
    sleeveGradient: "linear-gradient(135deg, #fff8e7 0%, #f2dfb6 50%, #e3cb94 100%)",
    stitchColor: "#c9a962",
    buttonColor: "#d4af37",
    textColor: "#18181b",
    border: "#d6c39a",
    shadow: "rgba(197, 160, 89, 0.25)"
  },
  {
    id: "black",
    name: "Jet Black",
    hex: "#141414",
    desc: "Deep Formal Midnight Black",
    bgGradient: "linear-gradient(145deg, #27272a 0%, #18181b 50%, #09090b 100%)",
    collarGradient: "linear-gradient(180deg, #2c2c30 0%, #141416 100%)",
    sleeveGradient: "linear-gradient(135deg, #2d2d31 0%, #1a1a1d 50%, #101012 100%)",
    stitchColor: "#3f3f46",
    buttonColor: "#52525b",
    textColor: "#ffffff",
    border: "#3f3f46",
    shadow: "rgba(0,0,0,0.4)"
  },
  {
    id: "navy",
    name: "Deep Navy Blue",
    hex: "#1B263B",
    desc: "Royal Marine Midnight Navy",
    bgGradient: "linear-gradient(145deg, #223352 0%, #1b263b 50%, #101826 100%)",
    collarGradient: "linear-gradient(180deg, #273a5e 0%, #162033 100%)",
    sleeveGradient: "linear-gradient(135deg, #273b5f 0%, #1c273e 50%, #121927 100%)",
    stitchColor: "#2e4a78",
    buttonColor: "#3b82f6",
    textColor: "#ffffff",
    border: "#334155",
    shadow: "rgba(15, 23, 42, 0.4)"
  },
  {
    id: "charcoal",
    name: "Charcoal Grey",
    hex: "#373A40",
    desc: "Executive Slate Charcoal",
    bgGradient: "linear-gradient(145deg, #484c55 0%, #373a40 50%, #25272c 100%)",
    collarGradient: "linear-gradient(180deg, #4f545e 0%, #2e3136 100%)",
    sleeveGradient: "linear-gradient(135deg, #515661 0%, #383c44 50%, #292c31 100%)",
    stitchColor: "#5b606c",
    buttonColor: "#71717a",
    textColor: "#ffffff",
    border: "#52525b",
    shadow: "rgba(0,0,0,0.3)"
  }
];

export default function KhanLookStudio() {
  const { products, addToCart, isVaultUnlocked } = useStore();

  // Dynamically load real products from shop inventory
  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real Overwear items (Prince Coats, Waistcoats & Swati Shawls)
  const realOverwear = allProducts.filter((p) => p.category === "Coats" || p.category === "Shawls");

  // Real Footwear items (Peshawari Chappals & Footwear / Boots / Derby / Loafers)
  const realFootwear = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );

  // States
  const [selectedSuit, setSelectedSuit] = useState(SUIT_COLORS[0]); // default White
  const [selectedOverwear, setSelectedOverwear] = useState(realOverwear[0] || INITIAL_PRODUCTS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(realFootwear[0] || INITIAL_PRODUCTS[1]);
  const [overwearFilter, setOverwearFilter] = useState("all"); // 'all' | 'coats' | 'waistcoats' | 'shawls'
  const [footwearFilter, setFootwearFilter] = useState("all"); // 'all' | 'chappals' | 'shoes' | 'loafers'
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Filtered lists for carousels
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

  // Carousel navigation for large footwear showcase
  const currentFootwearIndex = filteredFootwear.findIndex((f) => f.id === selectedFootwear?.id);
  const handlePrevFootwear = () => {
    if (filteredFootwear.length === 0) return;
    const nextIdx = (currentFootwearIndex - 1 + filteredFootwear.length) % filteredFootwear.length;
    setSelectedFootwear(filteredFootwear[nextIdx]);
  };
  const handleNextFootwear = () => {
    if (filteredFootwear.length === 0) return;
    const nextIdx = (currentFootwearIndex + 1) % filteredFootwear.length;
    setSelectedFootwear(filteredFootwear[nextIdx]);
  };

  const totalLookPrice = (selectedOverwear?.price || 0) + (selectedFootwear?.price || 0);

  const handleBuyThisLook = () => {
    if (selectedOverwear) addToCart(selectedOverwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    if (selectedFootwear) addToCart(selectedFootwear, `Suit Match: ${selectedSuit.name}`, 0, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI designed my 3-Piece Luxury Khan Look:\n• Base Shalwar Kameez: ${selectedSuit.name} (${selectedSuit.desc})\n• Overwear: ${selectedOverwear?.title} (Rs. ${(selectedOverwear?.price || 0).toLocaleString()})\n• Footwear: ${selectedFootwear?.title} (Rs. ${(selectedFootwear?.price || 0).toLocaleString()})\n• Total Look Price: Rs. ${totalLookPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\nPlease confirm dispatch details!`
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1150px",
        margin: "0 auto",
        background: "linear-gradient(180deg, #ffffff 0%, #faf8fa 100%)",
        borderRadius: "24px",
        border: "1.5px solid rgba(197, 160, 89, 0.35)",
        boxShadow: "0 14px 40px rgba(20, 16, 22, 0.08)",
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
            Khan Look Studio • 3-Piece Luxury Lookbook
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
          Select your suit color to see real stitched Kurta sleeves &amp; collar paired with your choice of Coat and HD Footwear.
        </p>
      </div>

      {/* 1. BASE SUIT COLOR SELECTOR BUTTONS */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "0.74rem", fontWeight: "800", color: "#444", textTransform: "uppercase", letterSpacing: "0.8px", textAlign: "center", marginBottom: "10px" }}>
          Step 1: Choose Base Shalwar Kameez Color:
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
                  padding: "8px 14px",
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
                    width: "15px",
                    height: "15px",
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

      {/* 2. MAIN 3-PIECE LUXURY LOOKBOOK SHOWCASE (KURTA TORSO + LARGE HD FOOTWEAR CARD) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "24px",
          alignItems: "stretch",
          marginBottom: "24px"
        }}
      >
        {/* PANEL A: REALISTIC STITCHED KURTA FABRIC CARD WITH SLEEVES & COLLAR */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
              Kurta &amp; Overwear Fit
            </span>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#c5a059" }}>
              {selectedSuit.name}
            </span>
          </div>

          {/* REALISTIC TAILORED KURTA CANVAS */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              height: "380px",
              borderRadius: "20px",
              background: "radial-gradient(circle at 50% 30%, #ffffff 0%, #f4f4f7 100%)",
              border: "1.5px solid rgba(197, 160, 89, 0.3)",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02), 0 8px 20px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}
          >
            {/* 1. VISIBLE MANDARIN / NEHRU KURTA COLLAR (BAN / GALA) */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "36px",
                background: selectedSuit.collarGradient,
                borderRadius: "18px 18px 6px 6px",
                border: `1.5px solid ${selectedSuit.stitchColor}`,
                borderBottom: `2.5px dashed ${selectedSuit.stitchColor}`,
                boxShadow: `0 3px 8px ${selectedSuit.shadow}`,
                zIndex: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: "2px",
                boxSizing: "border-box"
              }}
            >
              {/* Placket neck slit & buttons */}
              <div style={{ width: "22px", height: "18px", borderLeft: `1.5px dashed ${selectedSuit.stitchColor}`, borderRight: `1.5px dashed ${selectedSuit.stitchColor}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: selectedSuit.buttonColor, boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
              </div>
            </div>

            {/* 2. LEFT KURTA SLEEVE (REALISTIC FABRIC WITH CUFF) */}
            <div
              style={{
                position: "absolute",
                top: "32px",
                left: "12px",
                width: "55px",
                height: "320px",
                background: selectedSuit.sleeveGradient,
                borderRadius: "18px 0 0 16px",
                transform: "rotate(4deg)",
                transformOrigin: "top right",
                boxShadow: `-6px 10px 20px ${selectedSuit.shadow}`,
                borderLeft: `1.5px dashed ${selectedSuit.stitchColor}`,
                borderBottom: `2.5px solid ${selectedSuit.stitchColor}`,
                zIndex: 4,
                overflow: "hidden"
              }}
            >
              {/* Stitched Cuff (Kaaf) at wrist */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "28px",
                  background: selectedSuit.collarGradient,
                  borderTop: `1.5px dashed ${selectedSuit.stitchColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: selectedSuit.buttonColor }} />
              </div>
            </div>

            {/* 3. RIGHT KURTA SLEEVE (REALISTIC FABRIC WITH CUFF) */}
            <div
              style={{
                position: "absolute",
                top: "32px",
                right: "12px",
                width: "55px",
                height: "320px",
                background: selectedSuit.sleeveGradient,
                borderRadius: "0 18px 16px 0",
                transform: "rotate(-4deg)",
                transformOrigin: "top left",
                boxShadow: `6px 10px 20px ${selectedSuit.shadow}`,
                borderRight: `1.5px dashed ${selectedSuit.stitchColor}`,
                borderBottom: `2.5px solid ${selectedSuit.stitchColor}`,
                zIndex: 4,
                overflow: "hidden"
              }}
            >
              {/* Stitched Cuff (Kaaf) at wrist */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "28px",
                  background: selectedSuit.collarGradient,
                  borderTop: `1.5px dashed ${selectedSuit.stitchColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: selectedSuit.buttonColor }} />
              </div>
            </div>

            {/* 4. CENTER COAT / WAISTCOAT (CLEANLY CENTERED OVER TORSO) */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "250px",
                height: "310px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={selectedOverwear?.image}
                alt={selectedOverwear?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.32))",
                  transition: "all 0.3s ease"
                }}
              />
            </div>

            {/* Price Badge on Canvas */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                background: "rgba(24, 24, 27, 0.9)",
                color: "#fef08a",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "0.68rem",
                fontWeight: "800",
                zIndex: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
              }}
            >
              Rs. {(selectedOverwear?.price || 0).toLocaleString()}
            </div>
          </div>

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#18181b" }}>
              {selectedOverwear?.title}
            </div>
            <div style={{ fontSize: "0.7rem", color: "#666" }}>
              Tailored fit draped directly over {selectedSuit.name} Kurta
            </div>
          </div>
        </div>

        {/* PANEL B: LARGE HD FOOTWEAR SHOWCASE CARD (AT LEAST 220px x 220px) */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
              HD Footwear Showcase
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { key: "all", label: "All" },
                { key: "chappals", label: "Chappals" },
                { key: "shoes", label: "Boots" },
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
                    background: footwearFilter === tb.key ? "#18181b" : "#f4f4f5",
                    color: footwearFilter === tb.key ? "#fef08a" : "#555",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* LARGE 1:1 HD FOOTWEAR DISPLAY CARD (260px x 260px minimum) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              height: "280px",
              borderRadius: "20px",
              background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f4f4f6 100%)",
              border: "1.5px solid rgba(197, 160, 89, 0.35)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}
          >
            {/* PREV BUTTON */}
            <button
              onClick={handlePrevFootwear}
              aria-label="Previous footwear"
              style={{
                position: "absolute",
                left: "8px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(24, 24, 27, 0.8)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
              }}
            >
              ‹
            </button>

            {/* LARGE HD SHOE IMAGE */}
            <div style={{ width: "82%", height: "82%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={selectedFootwear?.image}
                alt={selectedFootwear?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 15px 22px rgba(0,0,0,0.24))",
                  transition: "transform 0.25s ease"
                }}
              />
            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={handleNextFootwear}
              aria-label="Next footwear"
              style={{
                position: "absolute",
                right: "8px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(24, 24, 27, 0.8)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
              }}
            >
              ›
            </button>

            {/* Top Category Tag */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "12px",
                background: "rgba(197, 160, 89, 0.2)",
                color: "#8a6d2b",
                border: "1px solid rgba(197, 160, 89, 0.4)",
                padding: "3px 8px",
                borderRadius: "8px",
                fontSize: "0.65rem",
                fontWeight: "800",
                textTransform: "uppercase"
              }}
            >
              {selectedFootwear?.category}
            </div>

            {/* Price Tag */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                color: "#fef08a",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "0.72rem",
                fontWeight: "800",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
              }}
            >
              Rs. {(selectedFootwear?.price || 0).toLocaleString()}
            </div>
          </div>

          {/* Footwear Title */}
          <div style={{ marginTop: "10px", textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#18181b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {selectedFootwear?.title}
            </div>
            <div style={{ fontSize: "0.7rem", color: "#666" }}>
              Tap arrows or choose from below for HD preview
            </div>
          </div>

          {/* QUICK THUMBNAIL STRIP */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              width: "100%",
              marginTop: "10px",
              paddingBottom: "4px",
              scrollbarWidth: "none"
            }}
          >
            {filteredFootwear.map((item) => {
              const isSelected = item.id === selectedFootwear?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFootwear(item)}
                  style={{
                    flex: "0 0 54px",
                    height: "54px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.1)",
                    background: isSelected ? "rgba(197, 160, 89, 0.15)" : "#ffffff",
                    padding: "3px",
                    cursor: "pointer",
                    boxSizing: "border-box"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STEP 2: SELECT OVERWEAR CAROUSEL */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <div style={{ fontSize: "0.74rem", fontWeight: "800", color: "#444", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Step 2: Choose Overwear (Prince Coats, Waistcoats &amp; Shawls):
          </div>
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
                  background: overwearFilter === tb.key ? "#18181b" : "#f4f4f5",
                  color: overwearFilter === tb.key ? "#fef08a" : "#555",
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
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "8px",
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
                  flex: "0 0 100px",
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "14px",
                  border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.08)",
                  background: isSelected ? "rgba(197, 160, 89, 0.12)" : "#ffffff",
                  padding: "6px",
                  boxShadow: isSelected ? "0 4px 14px rgba(197, 160, 89, 0.3)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "#f8f8f8" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div style={{ fontSize: "0.62rem", fontWeight: "750", color: "#18181b", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "0.65rem", fontWeight: "800", color: isSelected ? "#8a6d2b" : "#c5a059" }}>
                  Rs. {item.price.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. LOOK SUMMARY & CTA BUTTONS */}
      <div
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
          borderRadius: "20px",
          border: "1.5px solid rgba(212, 175, 55, 0.5)",
          padding: "16px 20px",
          color: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
              Your Custom 3-Piece Lookbook Selection:
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: "750", color: "#fef08a", marginTop: "2px" }}>
              {selectedSuit.name} Kurta + {selectedOverwear?.title} + {selectedFootwear?.title}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
              Total Look Price:
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: "900", color: "#d4af37" }}>
              Rs. {totalLookPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* VAULT BONUS BADGE */}
        {isVaultUnlocked && (
          <div
            style={{
              padding: "7px 12px",
              background: "rgba(212, 175, 55, 0.2)",
              border: "1px solid rgba(212, 175, 55, 0.6)",
              borderRadius: "10px",
              fontSize: "0.72rem",
              color: "#fef08a",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "750"
            }}
          >
            <span>🎁</span>
            <span>SHAHI TIJORI PERK ACTIVE: +1 FREE 30ml Luxury Perfume will be dispatched with this look!</span>
          </div>
        )}

        {/* BUTTONS */}
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
              borderRadius: "14px",
              padding: "13px 16px",
              fontSize: "0.85rem",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              transition: "all 0.2s ease"
            }}
          >
            {addedAnimation ? "✓ Look Added to Bag!" : "BUY THIS LOOK (Add Both to Bag)"}
          </button>

          <a
            href={`https://wa.me/923336712345?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1 1 200px",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "#ffffff",
              borderRadius: "14px",
              padding: "13px 16px",
              fontSize: "0.85rem",
              fontWeight: "800",
              textDecoration: "none",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(37, 211, 102, 0.35)",
              cursor: "pointer"
            }}
          >
            <span>💬 Order via WhatsApp (COD)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
