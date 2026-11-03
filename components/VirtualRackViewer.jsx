"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

const COATS_DATA = [
  // PRINCE COATS (Strictly Rs. 4,000)
  {
    id: 401,
    title: "Midnight Black Royal Prince Coat",
    category: "Coats",
    price: 4000,
    originalPrice: 5000,
    type: "prince-coat",
    typeLabel: "Royal Prince Coat",
    colorName: "Midnight Black",
    colorHex: "#141416",
    tagColor: "#1a1a1a",
    tagTextColor: "#f4f4f5",
    image: "/assets/coats/midnight_black_prince_coat_4000.webp",
    backImage: "/assets/coats/midnight_black_prince_coat_4000_back.jpg?v=2.26.0",
    tag: "ROYAL EDITION",
    rating: 5.0,
    reviews: 88,
    features: ["Mandarin Stand Ban Collar", "6 Crested Heritage Buttons", "Tropical Wrinkle-Free Suiting", "Full Satin Silk Interior Lining"]
  },
  {
    id: 403,
    title: "Classic Brown Prince Coat",
    category: "Coats",
    price: 4000,
    originalPrice: 5000,
    type: "prince-coat",
    typeLabel: "Royal Prince Coat",
    colorName: "Classic Brown",
    colorHex: "#4a2e1e",
    tagColor: "#4a2e1e",
    tagTextColor: "#fde68a",
    image: "/assets/coats/classic_brown_prince_coat_4000.webp",
    backImage: "/assets/coats/classic_brown_prince_coat_4000_back.jpg?v=2.26.0",
    tag: "BESTSELLER",
    rating: 5.0,
    reviews: 76,
    features: ["Aristocratic Mandarin Collar", "Gold-Plated Royal Buttons", "Rich Espresso Thermal Drape", "Full Satin Silk Lining"]
  },
  {
    id: 402,
    title: "Silver Grey Luxury Waistcoat",
    category: "Coats",
    price: 4000,
    originalPrice: 5000,
    type: "prince-coat",
    typeLabel: "Luxury Prince Coat",
    colorName: "Silver Grey",
    colorHex: "#8e99a8",
    tagColor: "#8e99a8",
    tagTextColor: "#ffffff",
    image: "/assets/coats/silver_grey_waistcoat_4000.webp",
    backImage: "/assets/coats/silver_grey_waistcoat_4000_back.jpg?v=2.26.0",
    tag: "POPULAR",
    rating: 4.9,
    reviews: 104,
    features: ["Matte Poly-Viscose Suiting", "Antique Pewter Finished Buttons", "Clean Welt Side Pockets", "Ultra-Light Bemberg Lining"]
  },
  {
    id: 404,
    title: "Beige Royal Waistcoat",
    category: "Coats",
    price: 4000,
    originalPrice: 5000,
    type: "prince-coat",
    typeLabel: "Royal Prince Coat",
    colorName: "Beige Royal",
    colorHex: "#c9ae8c",
    tagColor: "#c9ae8c",
    tagTextColor: "#27272a",
    image: "/assets/coats/beige_royal_waistcoat_4000.webp",
    backImage: "/assets/coats/beige_royal_waistcoat_4000_back.jpg?v=2.26.0",
    tag: "NEW ARRIVAL",
    rating: 4.9,
    reviews: 92,
    features: ["Fine Sand Tropical Suiting", "Natural Artisan Toned Buttons", "Daytime Wedding & Jummah Elegance", "Pure Breathable Lining"]
  },

  // CLASSIC WAISTCOATS (Strictly Rs. 3,000)
  {
    id: 405,
    title: "Classic Charcoal Black Waistcoat",
    category: "Coats",
    price: 3000,
    originalPrice: 3800,
    type: "waistcoat",
    typeLabel: "Classic Waistcoat",
    colorName: "Charcoal Black",
    colorHex: "#1c1c1f",
    tagColor: "#27272a",
    tagTextColor: "#f4f4f5",
    image: "/assets/coats/classic_charcoal_black_waistcoat_3000.webp",
    backImage: "/assets/coats/classic_charcoal_black_waistcoat_3000_back.jpg?v=2.26.0",
    tag: "POPULAR",
    rating: 5.0,
    reviews: 68,
    features: ["Traditional Mandarin Ban Collar", "6 Matched Black Buttons", "Dual Waist Welt Pockets", "Smooth Silk-Blend Inner Lining"]
  },
  {
    id: 406,
    title: "Pearl Grey Classic Waistcoat",
    category: "Coats",
    price: 3000,
    originalPrice: 3800,
    type: "waistcoat",
    typeLabel: "Classic Waistcoat",
    colorName: "Pearl Grey",
    colorHex: "#b8c0cc",
    tagColor: "#cbd5e1",
    tagTextColor: "#1e293b",
    image: "/assets/coats/pearl_grey_classic_waistcoat_3000.webp",
    backImage: "/assets/coats/pearl_grey_classic_waistcoat_3000_back.jpg?v=2.26.0",
    tag: "BESTSELLER",
    rating: 4.9,
    reviews: 84,
    features: ["Fine Soft-Finish Suiting Fabric", "Versatile Light Ash Shade", "Structured Stand Collar", "Breathable Comfort Inner Lining"]
  },
  {
    id: 407,
    title: "Midnight Blue Classic Waistcoat",
    category: "Coats",
    price: 3000,
    originalPrice: 3800,
    type: "waistcoat",
    typeLabel: "Classic Waistcoat",
    colorName: "Midnight Blue",
    colorHex: "#1a2538",
    tagColor: "#1e293b",
    tagTextColor: "#93c5fd",
    image: "/assets/coats/midnight_blue_classic_waistcoat_3000.webp",
    backImage: "/assets/coats/midnight_blue_classic_waistcoat_3000_back.jpg?v=2.26.0",
    tag: "ROYAL NAVY",
    rating: 5.0,
    reviews: 95,
    features: ["Deep Midnight Navy Tropical Weave", "Contrast Gold-Edged Enamel Buttons", "Slim-Fit Contoured Waistline", "Full High-Lustre Navy Satin Lining"]
  }
];

export default function VirtualRackViewer() {
  const { addToCart, isVaultUnlocked } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewAngle, setViewAngle] = useState("front"); // 'front' | 'back'
  const [selectedSize, setSelectedSize] = useState("40");
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isRackOverview, setIsRackOverview] = useState(false);

  const activeItem = COATS_DATA[selectedIndex];
  const currentGarmentGroup = COATS_DATA.filter(item => item.type === activeItem.type);

  const handleSelect = (idx) => {
    setSelectedIndex(idx);
    setViewAngle("front");
    setIsRackOverview(false);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % COATS_DATA.length);
    setViewAngle("front");
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + COATS_DATA.length) % COATS_DATA.length);
    setViewAngle("front");
  };

  const handleAddToCart = () => {
    addToCart({
      id: activeItem.id,
      title: `${activeItem.title} (Size: ${selectedSize})`,
      price: activeItem.price,
      image: activeItem.image,
      category: activeItem.category,
      type: activeItem.type
    }, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI want to order:\n• Product: ${activeItem.title}\n• Category: ${activeItem.typeLabel}\n• Size: ${selectedSize}\n• Price: Rs. ${activeItem.price.toLocaleString()}\n• Quantity: ${quantity}${vaultLine}\nPlease confirm my delivery details.`
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1050px",
        margin: "0 auto 36px",
        /* VIDEO ACCURATE: ZERO BOXES, ZERO CARDS, PURE CLEAN TRANSPARENT CANVAS */
        background: "transparent",
        boxShadow: "none",
        border: "none",
        padding: "16px 8px 30px",
        boxSizing: "border-box"
      }}
    >
      {/* HORIZONTAL SLEEK METALLIC BAR (EXACT REFERENCE VIDEO) */}
      <div
        style={{
          position: "relative",
          width: "92%",
          maxWidth: "760px",
          margin: "0 auto 8px",
          height: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Left Metal Mount */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "22px",
            background: "linear-gradient(180deg, #888 0%, #aaa 50%, #555 100%)",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        />
        {/* Sleek Horizontal Steel Rail */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "linear-gradient(180deg, #d8d8d8 0%, #ffffff 40%, #b0b0b0 75%, #7a7a7a 100%)",
            borderRadius: "3px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        />
        {/* Right Metal Mount */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "22px",
            background: "linear-gradient(180deg, #888 0%, #aaa 50%, #555 100%)",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        />
      </div>

      {/* RAIL / STAGE TOGGLE BUTTON */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
        <button
          onClick={() => setIsRackOverview(!isRackOverview)}
          style={{
            background: isRackOverview ? "#18181b" : "rgba(255,255,255,0.9)",
            color: isRackOverview ? "#ffffff" : "#444444",
            border: "1px solid rgba(0,0,0,0.12)",
            padding: "5px 14px",
            borderRadius: "20px",
            fontSize: "0.72rem",
            fontWeight: "750",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          {isRackOverview ? "Focus Selected Garment ✕" : "⇄ Browse Full Rail (All 7 Clothes)"}
        </button>
      </div>

      {isRackOverview ? (
        /* HORIZONTAL RACK OVERVIEW: ALL CLOTHES HANGING ON THE RAIL */
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            overflowX: "auto",
            padding: "10px 4px 20px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          {COATS_DATA.map((item, idx) => {
            const isCurrent = idx === selectedIndex;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(idx)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  flex: "0 0 88px",
                  transition: "transform 0.2s ease",
                  transform: isCurrent ? "translateY(-4px) scale(1.04)" : "translateY(0) scale(1)",
                  userSelect: "none"
                }}
              >
                {/* Hanger */}
                <div style={{ position: "relative", width: "40px", height: "24px", marginBottom: "2px" }}>
                  <svg width="40" height="24" viewBox="0 0 48 30" fill="none">
                    <path d="M24 2 C28 2, 30 6, 28 10 C26 13, 24 14, 24 16" stroke="#888" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M4 27 L24 16 L44 27 Z" fill="#ba8d5d" stroke="#8c6239" strokeWidth="1.2" />
                  </svg>
                </div>
                {/* Thumbnail */}
                <div
                  style={{
                    width: "82px",
                    aspectRatio: "1 / 1.2",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: isCurrent ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isCurrent ? "0 8px 18px rgba(197, 160, 89, 0.4)" : "0 3px 8px rgba(0,0,0,0.06)",
                    background: "transparent",
                    position: "relative"
                  }}
                >
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} loading="lazy" />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isCurrent ? "#c5a059" : "rgba(0,0,0,0.7)",
                      color: "#ffffff",
                      fontSize: "0.52rem",
                      fontWeight: "800",
                      padding: "1px 5px",
                      borderRadius: "5px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
                <span style={{ marginTop: "4px", fontSize: "0.64rem", fontWeight: isCurrent ? "800" : "600", color: isCurrent ? "#c5a059" : "#333", textAlign: "center" }}>
                  {item.colorName.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        /* CENTER STAGE: EXACT REPLICA OF THE REFERENCE VIDEO */
        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" }}>
          
          {/* FLOATING PREV / NEXT ARROWS (LIKE VIDEO 00:12) */}
          <button
            onClick={handlePrev}
            aria-label="Previous garment"
            style={{
              position: "absolute",
              left: "4px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.12)",
              color: "#18181b",
              fontSize: "1.4rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30
            }}
          >
            ‹
          </button>

          <button
            onClick={handleNext}
            aria-label="Next garment"
            style={{
              position: "absolute",
              right: "4px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.12)",
              color: "#18181b",
              fontSize: "1.4rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30
            }}
          >
            ›
          </button>

          {/* MAIN STAGE: WOODEN HANGER + HANGING GARMENT (PURE TRANSPARENT CANVAS) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%", maxWidth: "340px", boxSizing: "border-box" }}>
            
            {/* Wooden Hanger Hooking on Steel Rail */}
            <div style={{ position: "relative", width: "74px", height: "38px", zIndex: 12 }}>
              <svg width="74" height="38" viewBox="0 0 80 42" fill="none">
                <path d="M40 2 C46 2, 50 8, 47 14 C44 19, 40 20, 40 24" stroke="#888" strokeWidth="3" strokeLinecap="round" />
                <path d="M8 38 L40 24 L72 38 C72 40, 68 41, 40 37 C12 41, 8 40, 8 38 Z" fill="#b98a58" stroke="#8c5f2b" strokeWidth="1.5" />
                <circle cx="40" cy="24" r="3" fill="#d4af37" />
              </svg>
            </div>

            {/* 3D FLIPPABLE GARMENT (ZERO BOXES, ZERO CARDS, PURE PRODUCT PHOTO) */}
            <div
              style={{
                position: "relative",
                width: "250px",
                height: "290px",
                perspective: "1000px",
                WebkitPerspective: "1000px",
                marginTop: "-4px",
                zIndex: 10,
                background: "transparent"
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transform: viewAngle === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.75s cubic-bezier(0.2, 0.85, 0.25, 1)",
                  background: "transparent"
                }}
              >
                {/* FRONT FACE PHOTO */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.18))"
                  }}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block"
                    }}
                    loading="eager"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "12px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#ffffff",
                      padding: "2px 7px",
                      borderRadius: "6px",
                      fontSize: "0.58rem",
                      fontWeight: "700"
                    }}
                  >
                    zargul.net
                  </div>
                </div>

                {/* REAL BACK-VIEW PRODUCT PHOTOGRAPHY (NO BLACK BOX!) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.18))"
                  }}
                >
                  <img
                    src={activeItem.backImage}
                    alt={`${activeItem.title} - Realistic Back View`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block"
                    }}
                    loading="eager"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "12px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#ffffff",
                      padding: "2px 7px",
                      borderRadius: "6px",
                      fontSize: "0.58rem",
                      fontWeight: "700"
                    }}
                  >
                    Back View • zargul.net
                  </div>
                </div>
              </div>
            </div>

            {/* Natural Floor Shadow */}
            <div
              style={{
                width: "160px",
                height: "16px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                filter: "blur(4px)",
                marginTop: "6px"
              }}
            />

            {/* DYNAMIC COLOR SWATCHES (LIKE VIDEO 00:06-00:08) */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", marginTop: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: "800", color: "#666", marginRight: "2px" }}>Fabric Colors:</span>
              {currentGarmentGroup.map((garment) => {
                const isTagActive = garment.id === activeItem.id;
                return (
                  <button
                    key={garment.id}
                    onClick={() => {
                      const newIdx = COATS_DATA.findIndex(c => c.id === garment.id);
                      if (newIdx !== -1) handleSelect(newIdx);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "4px 10px",
                      borderRadius: "14px",
                      background: isTagActive ? "#18181b" : "#ffffff",
                      color: isTagActive ? "#ffffff" : "#333",
                      border: isTagActive ? "1.5px solid #d4af37" : "1px solid rgba(0,0,0,0.12)",
                      cursor: "pointer",
                      fontSize: "0.66rem",
                      fontWeight: "750",
                      boxShadow: isTagActive ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: garment.colorHex,
                        border: "1px solid rgba(255,255,255,0.7)"
                      }}
                    />
                    <span>{garment.colorName.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BELOW GARMENT CONTROLS: TITLE, FRONT/BACK 3D FLIP, PRICING & BUTTONS */}
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.12rem",
                fontWeight: "800",
                textTransform: "uppercase",
                color: "#18181b",
                margin: "0 0 4px"
              }}
            >
              {activeItem.title}
            </h3>

            {/* STRICT PRICING (Prince Coats: Rs. 4,000, Waistcoats: Rs. 3,000) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: "900", color: "#c5a059" }}>
                Rs. {activeItem.price.toLocaleString()}
              </span>
              <span style={{ fontSize: "0.88rem", color: "#9ca3af", textDecoration: "line-through" }}>
                Rs. {activeItem.originalPrice.toLocaleString()}
              </span>
              <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "0.66rem", fontWeight: "800", padding: "1px 6px", borderRadius: "8px" }}>
                SAVE 20%
              </span>
            </div>

            {/* FRONT / BACK VIEW TOGGLE (EXACT LIKE VIDEO 00:09-00:11) */}
            <div
              style={{
                display: "inline-flex",
                background: "#ebebed",
                padding: "3px",
                borderRadius: "30px",
                marginBottom: "14px",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)"
              }}
            >
              <button
                onClick={() => setViewAngle("front")}
                style={{
                  background: viewAngle === "front" ? "#18181b" : "transparent",
                  color: viewAngle === "front" ? "#ffffff" : "#52525b",
                  border: "none",
                  padding: "6px 18px",
                  borderRadius: "20px",
                  fontSize: "0.76rem",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                FRONT
              </button>
              <button
                onClick={() => setViewAngle("back")}
                style={{
                  background: viewAngle === "back" ? "#18181b" : "transparent",
                  color: viewAngle === "back" ? "#ffffff" : "#52525b",
                  border: "none",
                  padding: "6px 18px",
                  borderRadius: "20px",
                  fontSize: "0.76rem",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                BACK (3D FLIP)
              </button>
            </div>

            {/* SIZE SELECTOR */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: "750", color: "#555" }}>Size:</span>
              {["36", "38", "40", "42", "44", "46"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    width: "34px",
                    height: "32px",
                    borderRadius: "8px",
                    border: selectedSize === sz ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.12)",
                    background: selectedSize === sz ? "#18181b" : "#ffffff",
                    color: selectedSize === sz ? "#ffffff" : "#333333",
                    fontSize: "0.78rem",
                    fontWeight: "800",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* ACTION BUTTONS (QUANTITY, BUY NOW, WHATSAPP) */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.14)",
                  borderRadius: "14px",
                  padding: "3px 6px"
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ border: "none", background: "transparent", fontSize: "1rem", padding: "0 6px", cursor: "pointer", fontWeight: "700" }}
                >
                  −
                </button>
                <span style={{ fontSize: "0.85rem", fontWeight: "800", minWidth: "22px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ border: "none", background: "transparent", fontSize: "1rem", padding: "0 6px", cursor: "pointer", fontWeight: "700" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: "1 1 150px",
                  maxWidth: "220px",
                  padding: "11px 16px",
                  borderRadius: "14px",
                  background: addedAnimation ? "#10b981" : "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "0.82rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
                  transition: "all 0.2s ease"
                }}
              >
                {addedAnimation ? "✓ Added to Bag!" : `✦ BUY NOW • Rs. ${(activeItem.price * quantity).toLocaleString()}`}
              </button>

              <a
                href={`https://wa.me/923339194200?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "11px 16px",
                  borderRadius: "14px",
                  background: "#25D366",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: "800",
                  textDecoration: "none",
                  boxShadow: "0 6px 16px rgba(37, 211, 102, 0.3)"
                }}
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
