"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

// ALL COATS & WAISTCOATS FOR THE ATELIER HANGING RACK
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
    swatchName: "Jet Black",
    image: "/assets/coats/midnight_black_prince_coat_4000.webp",
    backTheme: {
      base: "#161618",
      accent: "#222226",
      lining: "#0f0f11",
      stitching: "rgba(197, 160, 89, 0.4)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      textColor: "#e4e4e7"
    },
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
    swatchName: "Espresso Brown",
    image: "/assets/coats/classic_brown_prince_coat_4000.webp",
    backTheme: {
      base: "#3b2214",
      accent: "#4d2e1b",
      lining: "#29160c",
      stitching: "rgba(212, 175, 55, 0.45)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      textColor: "#fde68a"
    },
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
    swatchName: "Steel Grey",
    image: "/assets/coats/silver_grey_waistcoat_4000.webp",
    backTheme: {
      base: "#778393",
      accent: "#8b97a7",
      lining: "#545e6b",
      stitching: "rgba(255, 255, 255, 0.5)",
      buckle: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
      textColor: "#ffffff"
    },
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
    swatchName: "Royal Beige",
    image: "/assets/coats/beige_royal_waistcoat_4000.webp",
    backTheme: {
      base: "#b39875",
      accent: "#c4aa87",
      lining: "#846d50",
      stitching: "rgba(255, 255, 255, 0.55)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      textColor: "#ffffff"
    },
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
    swatchName: "Charcoal Jet",
    image: "/assets/coats/classic_charcoal_black_waistcoat_3000.webp",
    backTheme: {
      base: "#1a1a1c",
      accent: "#26262a",
      lining: "#101012",
      stitching: "rgba(197, 160, 89, 0.4)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      textColor: "#e4e4e7"
    },
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
    swatchName: "Pearl Grey",
    image: "/assets/coats/pearl_grey_classic_waistcoat_3000.webp",
    backTheme: {
      base: "#9faab9",
      accent: "#b5c0cf",
      lining: "#737e8c",
      stitching: "rgba(255, 255, 255, 0.55)",
      buckle: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
      textColor: "#ffffff"
    },
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
    swatchName: "Royal Navy",
    image: "/assets/coats/midnight_blue_classic_waistcoat_3000.webp",
    backTheme: {
      base: "#162030",
      accent: "#22314a",
      lining: "#101622",
      stitching: "rgba(212, 175, 55, 0.45)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      textColor: "#93c5fd"
    },
    tag: "ROYAL NAVY",
    rating: 5.0,
    reviews: 95,
    features: ["Deep Midnight Navy Tropical Weave", "Contrast Gold-Edged Enamel Buttons", "Slim-Fit Contoured Waistline", "Full High-Lustre Navy Satin Lining"]
  }
];

export default function VirtualRackViewer() {
  const { addToCart } = useStore();
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

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI want to order:\n• Product: ${activeItem.title}\n• Category: ${activeItem.typeLabel}\n• Size: ${selectedSize}\n• Price: Rs. ${activeItem.price.toLocaleString()}\n• Quantity: ${quantity}\nPlease confirm my delivery details.`
  );

  return (
    <div
      className="virtual-rack-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1050px",
        margin: "0 auto 36px",
        background: "radial-gradient(ellipse at 50% 25%, #ffffff 0%, #faf8fa 65%, #f4eff5 100%)",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(20, 16, 22, 0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        padding: "24px 14px 30px",
        overflow: "hidden", // STRICT NO OVERFLOW
        boxSizing: "border-box"
      }}
    >
      {/* ATELIER TOP HEADER */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            padding: "5px 16px",
            borderRadius: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            border: "1px solid rgba(197, 160, 89, 0.25)",
            marginBottom: "6px"
          }}
        >
          <span style={{ color: "#c5a059", fontSize: "0.85rem" }}>✦</span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: "750",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#333333"
            }}
          >
            3D Virtual Atelier • Interactive Hanging Rack
          </span>
          <span style={{ color: "#c5a059", fontSize: "0.85rem" }}>✦</span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#666666" }}>
          Explore fabrics, color tags &amp; 3D rotating front/back views on the rail
        </p>
      </div>

      {/* METALLIC HANGING ROD / RAIL */}
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: "700px",
          margin: "0 auto 12px",
          height: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "22px",
            background: "linear-gradient(180deg, #999 0%, #bbb 50%, #666 100%)",
            borderRadius: "4px"
          }}
        />
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "linear-gradient(180deg, #dcdcdc 0%, #ffffff 35%, #b5b5b5 70%, #7e7e7e 100%)",
            borderRadius: "3px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "22px",
            background: "linear-gradient(180deg, #999 0%, #bbb 50%, #666 100%)",
            borderRadius: "4px"
          }}
        />
      </div>

      {/* MODE TOGGLE */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
        <button
          onClick={() => setIsRackOverview(!isRackOverview)}
          style={{
            background: isRackOverview ? "#18181b" : "#ffffff",
            color: isRackOverview ? "#ffffff" : "#444444",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "5px 14px",
            borderRadius: "20px",
            fontSize: "0.72rem",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
          }}
        >
          {isRackOverview ? "Focus Selected Garment ✕" : "⇄ Browse Full Rail (All 7 Clothes)"}
        </button>
      </div>

      {isRackOverview ? (
        /* HORIZONTAL RACK OVERVIEW */
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            overflowX: "auto",
            padding: "12px 6px 20px",
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
                  flex: "0 0 90px",
                  transition: "transform 0.2s ease",
                  transform: isCurrent ? "translateY(-4px) scale(1.04)" : "translateY(0) scale(1)",
                  userSelect: "none"
                }}
              >
                {/* Hanger */}
                <div style={{ position: "relative", width: "40px", height: "24px", marginBottom: "2px" }}>
                  <svg width="40" height="24" viewBox="0 0 48 30" fill="none">
                    <path d="M24 2 C28 2, 30 6, 28 10 C26 13, 24 14, 24 16" stroke="#888888" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M4 27 L24 16 L44 27 Z" fill="#ba8d5d" stroke="#8c6239" strokeWidth="1.2" />
                  </svg>
                </div>
                {/* Thumbnail */}
                <div
                  style={{
                    width: "82px",
                    aspectRatio: "1 / 1.15",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: isCurrent ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isCurrent ? "0 8px 18px rgba(197, 160, 89, 0.4)" : "0 3px 8px rgba(0,0,0,0.06)",
                    background: "#ffffff",
                    position: "relative"
                  }}
                >
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isCurrent ? "#c5a059" : "rgba(0,0,0,0.65)",
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
        /* CENTER STAGE: EXACT REPLICA OF REFERENCE VIDEO */
        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" }}>
          
          {/* FLOATING PREV / NEXT ARROWS */}
          <button
            onClick={handlePrev}
            aria-label="Previous garment"
            style={{
              position: "absolute",
              left: "0px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#18181b",
              fontSize: "1.3rem",
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
              right: "0px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#18181b",
              fontSize: "1.3rem",
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

          {/* MAIN STAGE: WOODEN HANGER + 3D FLIP GARMENT */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%", maxWidth: "340px", boxSizing: "border-box" }}>
            
            {/* Wooden Hanger */}
            <div style={{ position: "relative", width: "70px", height: "36px", zIndex: 12 }}>
              <svg width="70" height="36" viewBox="0 0 80 42" fill="none">
                <path d="M40 2 C46 2, 50 8, 47 14 C44 19, 40 20, 40 24" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <path d="M8 38 L40 24 L72 38 C72 40, 68 41, 40 37 C12 41, 8 40, 8 38 Z" fill="#b98a58" stroke="#8c5f2b" strokeWidth="1.5" />
                <circle cx="40" cy="24" r="3" fill="#d4af37" />
              </svg>
            </div>

            {/* 3D Flippable Garment */}
            <div
              style={{
                position: "relative",
                width: "240px",
                height: "280px",
                perspective: "1000px",
                WebkitPerspective: "1000px",
                marginTop: "-4px",
                zIndex: 10
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
                  transition: "transform 0.75s cubic-bezier(0.2, 0.85, 0.25, 1)"
                }}
              >
                {/* FRONT FACE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 18px 36px rgba(0,0,0,0.15)",
                    background: "#ffffff"
                  }}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="eager"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "10px",
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

                {/* BACK FACE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 18px 36px rgba(0,0,0,0.15)",
                    background: `linear-gradient(180deg, ${activeItem.backTheme.base} 0%, ${activeItem.backTheme.lining} 100%)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px 16px",
                    color: activeItem.backTheme.textColor,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div style={{ textAlign: "center", borderBottom: `1px dashed ${activeItem.backTheme.stitching}`, paddingBottom: "10px" }}>
                    <div style={{ fontSize: "0.64rem", letterSpacing: "1.5px", fontWeight: "800", color: "#d4af37" }}>
                      ZARGUL BESPOKE ATELIER
                    </div>
                    <div style={{ fontSize: "0.58rem", opacity: 0.8, marginTop: "2px" }}>
                      Handcrafted in Pakistan • Size {selectedSize}
                    </div>
                  </div>

                  <div style={{ textAlign: "center", padding: "12px 0" }}>
                    <div
                      style={{
                        width: "2px",
                        height: "45px",
                        margin: "0 auto",
                        background: `linear-gradient(180deg, ${activeItem.backTheme.stitching} 0%, transparent 100%)`
                      }}
                    />
                    <span style={{ fontSize: "0.6rem", opacity: 0.75, letterSpacing: "1px", textTransform: "uppercase" }}>
                      Precision Spine Seam
                    </span>
                  </div>

                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${activeItem.backTheme.stitching}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <span style={{ fontSize: "0.6rem", fontWeight: "700" }}>Waist Cinch Buckle</span>
                    <div style={{ width: "20px", height: "14px", borderRadius: "3px", background: activeItem.backTheme.buckle }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floor Shadow */}
            <div
              style={{
                width: "150px",
                height: "16px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                filter: "blur(3px)",
                marginTop: "8px"
              }}
            />

            {/* HANGING CRAFT COLOR SWATCH TAGS (RESPONSIVE ROW - NEVER OVERFLOWS) */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", marginTop: "12px" }}>
              <span style={{ fontSize: "0.66rem", fontWeight: "800", color: "#666", marginRight: "2px" }}>Colors:</span>
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
                      padding: "4px 8px",
                      borderRadius: "14px",
                      background: isTagActive ? "#18181b" : "#ffffff",
                      color: isTagActive ? "#ffffff" : "#333",
                      border: isTagActive ? "1px solid #d4af37" : "1px solid rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      fontSize: "0.64rem",
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
                        border: "1px solid rgba(255,255,255,0.6)"
                      }}
                    />
                    <span>{garment.colorName.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTROLS BELOW: TITLE, 3D FRONT/BACK TOGGLE, STRICT PRICING & ACTIONS */}
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
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
                fontSize: "1.1rem",
                fontWeight: "800",
                textTransform: "uppercase",
                color: "#18181b",
                margin: "0 0 4px"
              }}
            >
              {activeItem.title}
            </h3>

            {/* Strict Price */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: "900", color: "#c5a059" }}>
                Rs. {activeItem.price.toLocaleString()}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#9ca3af", textDecoration: "line-through" }}>
                Rs. {activeItem.originalPrice.toLocaleString()}
              </span>
              <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "0.66rem", fontWeight: "800", padding: "1px 6px", borderRadius: "8px" }}>
                SAVE 20%
              </span>
            </div>

            {/* FRONT / BACK 3D TOGGLE */}
            <div
              style={{
                display: "inline-flex",
                background: "#ebebed",
                padding: "3px",
                borderRadius: "30px",
                marginBottom: "14px"
              }}
            >
              <button
                onClick={() => setViewAngle("front")}
                style={{
                  background: viewAngle === "front" ? "#18181b" : "transparent",
                  color: viewAngle === "front" ? "#ffffff" : "#52525b",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "20px",
                  fontSize: "0.74rem",
                  fontWeight: "800",
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
                  padding: "5px 16px",
                  borderRadius: "20px",
                  fontSize: "0.74rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                BACK (3D FLIP)
              </button>
            </div>

            {/* Size Selector */}
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

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.12)",
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
