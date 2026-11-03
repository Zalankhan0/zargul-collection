"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

const FOOTWEAR_DATA = [
  // 3 SPECIFIC PREMIUM LEATHER SHOES (Strictly Rs. 5,999)
  {
    id: 501,
    title: "Classic Black Leather Chelsea Boots",
    category: "Footwear",
    price: 5999,
    originalPrice: 7500,
    type: "boots",
    typeLabel: "Luxury Chelsea Boots",
    image: "/assets/shoes/black_chelsea_boots_5999.webp",
    material: "100% Genuine Full-Grain Calfskin Leather",
    sole: "Durable Anti-Slip Stacked Leather Sole",
    color: "Jet Black",
    tag: "BESTSELLER",
    badgeType: "sale",
    rating: 5.0,
    reviews: 94,
    features: [
      "Elasticated Twin Side Gussets for Easy Slip-On",
      "Handcrafted Goodyear Welt Construction",
      "Reinforced Heel Tab with Embossed Accent",
      "Full Cushioned Breathable Leather Insole"
    ]
  },
  {
    id: 502,
    title: "Glossy Black Patent Leather Derby Shoes",
    category: "Footwear",
    price: 5999,
    originalPrice: 7500,
    type: "formal",
    typeLabel: "Glossy Derby Shoes",
    image: "/assets/shoes/glossy_black_derby_shoes_5999.webp",
    material: "Mirror-Shine Glossy Patent Calf Leather",
    sole: "Formal Executive Beveled Edge Leather Sole",
    color: "Glossy Black",
    tag: "ROYAL EDITION",
    badgeType: "sale",
    rating: 5.0,
    reviews: 82,
    features: [
      "High-Gloss Mirror Finish for Black-Tie Events",
      "5-Eyelet Waxed Lace Front Closure",
      "Shock-Absorbing Memory Foam Heel Cushion",
      "Hand-Stitched Welted Outsole"
    ]
  },
  {
    id: 503,
    title: "Royal Oxblood Burnished Formal Shoes",
    category: "Footwear",
    price: 5999,
    originalPrice: 7500,
    type: "formal",
    typeLabel: "Oxblood Formal Shoes",
    image: "/assets/shoes/royal_oxblood_formal_shoes_5999.webp",
    material: "Hand-Burnished Deep Oxblood Crust Leather",
    sole: "Signature Burgundy-Toned Leather Sole",
    color: "Royal Oxblood",
    tag: "SIGNATURE",
    badgeType: "sale",
    rating: 5.0,
    reviews: 78,
    features: [
      "Artisan Ombré Burnished Toe Cap",
      "Almond-Toe Silhouette for Contemporary Elegance",
      "Full Glove-Soft Calf Leather Inner Lining",
      "Handcrafted in Precision Atelier"
    ]
  },

  // 6 LORO PIANA STYLE SUEDE LOAFERS (Strictly Rs. 4,999)
  {
    id: 701,
    title: "Camel Tan Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/camel_tan_suede_loafer_4999.webp",
    material: "Ultra-Soft Water-Repellent Calf Suede",
    sole: "White Non-Slip Latex Sole",
    color: "Camel Tan",
    tag: "SUMMER DROP",
    badgeType: "sale",
    rating: 4.9,
    reviews: 64,
    features: ["Classic White Slip-Resistant Outsole", "Supple Velvet-Touch Suede Upper", "Padded Insole for Cloud-Like Walking", "Embossed Zargul Monogram on Insole"]
  },
  {
    id: 702,
    title: "Chocolate Brown Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/chocolate_brown_suede_loafer_4999.webp",
    material: "Rich Cocoa Napcalf Suede",
    sole: "White Non-Slip Latex Sole",
    color: "Chocolate Brown",
    tag: "BESTSELLER",
    badgeType: "sale",
    rating: 5.0,
    reviews: 58,
    features: ["Deep Mocha Palette for Formal & Casual", "Flexible Strobel Construction", "Treated Against Dust and Moisture", "Soft Unlined Forefoot for Instant Ease"]
  },
  {
    id: 703,
    title: "Midnight Navy Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/midnight_navy_suede_loafer_4999.webp",
    material: "Deep Navy Blue Suede Leather",
    sole: "White Non-Slip Latex Sole",
    color: "Midnight Navy",
    tag: "ROYAL NAVY",
    badgeType: "sale",
    rating: 5.0,
    reviews: 72,
    features: ["Understated Luxury for Riviera Style", "Natural Ergonomic Heel Cup", "High-Friction Grooved Rubber Tread", "Breathable Perforated Arch Support"]
  },
  {
    id: 704,
    title: "Ocean Blue Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/ocean_blue_suede_loafer_4999.webp",
    material: "Vibrant Mediterranean Azure Suede",
    sole: "White Non-Slip Latex Sole",
    color: "Ocean Blue",
    tag: "SUMMER SPECIAL",
    badgeType: "sale",
    rating: 4.9,
    reviews: 46,
    features: ["Striking Marine Hue for Linen Trousers", "Lightweight Flexible Outsole", "Antimicrobial Leather Footbed", "Hand-Finished Stitched Apron Toe"]
  },
  {
    id: 705,
    title: "Sand Beige Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/sand_beige_suede_loafer_4999.webp",
    material: "Subtle Warm Sand Velvet Suede",
    sole: "White Non-Slip Latex Sole",
    color: "Sand Beige",
    tag: "TRENDING",
    badgeType: "sale",
    rating: 4.9,
    reviews: 52,
    features: ["Neutral Colorway Pairing with Everything", "Featherweight 260g Travel Profile", "Slip-On Loafer Silhouette", "Water-Repellent Suede Treatment"]
  },
  {
    id: 706,
    title: "Taupe Grey Suede Loafer",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafer",
    typeLabel: "Loro Piana Style Loafer",
    image: "/assets/loafers/taupe_grey_suede_loafer_4999.webp",
    material: "Cool-Tone Ash Taupe Suede",
    sole: "White Non-Slip Latex Sole",
    color: "Taupe Grey",
    tag: "NEW DROP",
    badgeType: "sale",
    rating: 4.8,
    reviews: 39,
    features: ["Refined Contemporary Monochromatic Look", "Arch-Support Ergonomic Bed", "Reinforced Heel Counter", "All-Day Casual Walking Comfort"]
  }
];

export default function Footwear3DPopout() {
  const { addToCart } = useStore();
  const [selectedShoeIndex, setSelectedShoeIndex] = useState(0);
  const [isPopoutEngaged, setIsPopoutEngaged] = useState(true); // Default engaged for maximum impact
  const [tilt, setTilt] = useState({ x: 12, y: -8 }); // Realistic 3D angle
  const [selectedSize, setSelectedSize] = useState("42");
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const stageRef = useRef(null);

  const activeShoe = FOOTWEAR_DATA[selectedShoeIndex];

  // Gyro / Pointer dynamic 3D tilt tracking
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Responsive 3D rotation angles
    const rotateY = ((x - centerX) / centerX) * 22;
    const rotateX = -((y - centerY) / centerY) * 22;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Return to dramatic default 3D pose
    setTilt({ x: 12, y: -8 });
  };

  const handleTouchMove = (e) => {
    if (!stageRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = stageRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = -((y - centerY) / centerY) * 20;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleAddToCart = () => {
    addToCart({
      id: activeShoe.id,
      title: `${activeShoe.title} (Size: EU ${selectedSize})`,
      price: activeShoe.price,
      image: activeShoe.image,
      category: activeShoe.category
    }, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI want to order:\n• Product: ${activeShoe.title}\n• Category: ${activeShoe.typeLabel}\n• Size: EU ${selectedSize}\n• Price: Rs. ${activeShoe.price.toLocaleString()}\n• Quantity: ${quantity}\nPlease confirm my delivery details.`
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1160px",
        margin: "0 auto 36px",
        background: "radial-gradient(ellipse at 50% 25%, #ffffff 0%, #faf8fb 55%, #f2ebf4 100%)",
        borderRadius: "28px",
        boxShadow: "0 20px 50px rgba(20, 16, 22, 0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        padding: "32px 18px 40px",
        overflow: "visible" /* MUST BE VISIBLE SO SHOE BREAKS COMPLETELY OUT OF BOUNDS */
      }}
    >
      {/* HEADER BADGE */}
      <div style={{ textAlign: "center", marginBottom: "22px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            padding: "5px 18px",
            borderRadius: "30px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
            border: "1px solid rgba(197, 160, 89, 0.3)",
            marginBottom: "8px"
          }}
        >
          <span style={{ color: "#c5a059", fontSize: "0.9rem" }}>⚡</span>
          <span
            style={{
              fontSize: "0.74rem",
              fontWeight: "800",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              color: "#18181b"
            }}
          >
            Extreme 3D Pop-Out • Out of Bounds Illusion
          </span>
          <span style={{ color: "#c5a059", fontSize: "0.9rem" }}>⚡</span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#666666" }}>
          Click or hover any shoe to make it leap forward on the Z-axis directly out of your screen
        </p>
      </div>

      {/* HORIZONTAL SHOES SELECTION CAROUSEL (TOP ROW) */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          padding: "8px 6px 18px",
          marginBottom: "24px",
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {FOOTWEAR_DATA.map((shoe, idx) => {
          const isSelected = idx === selectedShoeIndex;
          return (
            <div
              key={shoe.id}
              onClick={() => {
                setSelectedShoeIndex(idx);
                setIsPopoutEngaged(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "0 0 94px",
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.25s ease",
                transform: isSelected ? "translateY(-5px) scale(1.05)" : "translateY(0) scale(1)",
                userSelect: "none"
              }}
              title={`Click to pop-out ${shoe.title}`}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: isSelected
                    ? "0 8px 22px rgba(197, 160, 89, 0.45)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  position: "relative",
                  background: "#ffffff",
                  transition: "all 0.25s ease"
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: isSelected ? "#c5a059" : "rgba(20, 16, 22, 0.75)",
                    color: "#ffffff",
                    fontSize: "0.56rem",
                    fontWeight: "800",
                    padding: "1px 5px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Rs. {shoe.price.toLocaleString()}
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: isSelected ? "800" : "600",
                  color: isSelected ? "#c5a059" : "#333333",
                  display: "block",
                  marginTop: "5px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%"
                }}
              >
                {shoe.title.split(" ")[0]} {shoe.title.split(" ")[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3D POP-OUT STAGE CONTAINER (GRID) */}
      <div
        className="popout-stage-container"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(320px, 460px) 1fr",
          gap: "40px",
          alignItems: "center",
          overflow: "visible" /* CRITICAL: NO CLIPPING */
        }}
      >
        {/* LEFT COLUMN: THE HYPER-REALISTIC EXTREME 3D POP-OUT CANVAS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            overflow: "visible" /* NO BOX CLIPPING */
          }}
        >
          {/* THE STEREOSCOPIC POP-OUT STAGE */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onClick={() => setIsPopoutEngaged(!isPopoutEngaged)}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
              aspectRatio: "1 / 1",
              perspective: "900px", /* INTENSE PERSPECTIVE DEPTH */
              WebkitPerspective: "900px",
              cursor: "pointer",
              userSelect: "none",
              overflow: "visible" /* SHOE MUST BREAK OUT OF THIS STAGE */
            }}
            title="Click or drag to toggle Extreme 3D Pop-Out"
          >
            {/* RECESSED 3D BACKGROUND PEDESTAL (STAYS SUNK DEEP IN THE SCREEN) */}
            <div
              style={{
                position: "absolute",
                inset: "20px",
                borderRadius: "24px",
                background: "radial-gradient(circle at 50% 50%, #f7f3f8 0%, #ebe2ed 100%)",
                border: "2px solid rgba(197, 160, 89, 0.4)",
                boxShadow: "inset 0 6px 25px rgba(0,0,0,0.18), 0 10px 30px rgba(0,0,0,0.06)",
                transform: "translateZ(-40px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px",
                zIndex: 1
              }}
            >
              {/* Recessed Matrix Grid Lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.2,
                  backgroundImage: "radial-gradient(#c5a059 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                  borderRadius: "24px"
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.66rem", color: "#666", zIndex: 2 }}>
                <span style={{ fontWeight: "750", letterSpacing: "1px" }}>✦ 3D RECESS STAGE</span>
                <span style={{ fontWeight: "800", color: "#c5a059" }}>{activeShoe.color}</span>
              </div>

              {/* Pedestal Bottom Label */}
              <div style={{ textAlign: "center", zIndex: 2 }}>
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: "800",
                    letterSpacing: "1px",
                    color: isPopoutEngaged ? "#c5a059" : "#888",
                    textTransform: "uppercase"
                  }}
                >
                  {isPopoutEngaged ? "⚡ EXTREME OUT-OF-BOUNDS ACTIVE" : "Click Shoe to Pop Out"}
                </span>
              </div>
            </div>

            {/* DEEP PROJECTED FLOOR SHADOW (EXPANDS AND GETS DARKER AS SHOE FALLS FORWARD) */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10%",
                width: "80%",
                height: "36px",
                borderRadius: "50%",
                background: isPopoutEngaged
                  ? "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)"
                  : "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)",
                filter: isPopoutEngaged ? "blur(12px)" : "blur(4px)",
                transform: isPopoutEngaged ? "scale(1.55) translateY(42px)" : "scale(1)",
                transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                zIndex: 2,
                pointerEvents: "none"
              }}
            />

            {/* THE POPPING-OUT SHOE OBJECT: BREAKS FULLY OUT OF BOUNDS */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                /* DRAMATIC TRANSLATEZ + SCALE3D + DYNAMIC GYRO TILT */
                transform: isPopoutEngaged
                  ? `perspective(850px) translateZ(240px) translateY(20px) scale3d(1.52, 1.52, 1.52) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : "perspective(850px) translateZ(0px) translateY(0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                zIndex: 30,
                overflow: "visible" /* ZERO CONTAINER CLIPPING */
              }}
            >
              {/* HIGH RESOLUTION SHOE WITH MASSIVE INTENSE DROP SHADOW SEPARATING FROM BACKGROUND */}
              <div
                style={{
                  width: "85%",
                  aspectRatio: "1 / 1",
                  overflow: "visible", /* NEVER CLIPPED BY BORDER BOX */
                  position: "relative",
                  /* INTENSE MULTI-LAYER DROP SHADOW (FALLING OUT ILLUSION) */
                  filter: isPopoutEngaged
                    ? "drop-shadow(0 50px 60px rgba(0, 0, 0, 0.85)) drop-shadow(0 20px 25px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 45px rgba(197, 160, 89, 0.45))"
                    : "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.2))",
                  transition: "filter 0.45s ease"
                }}
              >
                <img
                  src={activeShoe.image}
                  alt={`${activeShoe.title} - 3D Pop-Out`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px"
                  }}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />

                {/* Floating "Out of Screen" Badge */}
                {isPopoutEngaged && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "-12px",
                      background: "linear-gradient(135deg, #c5a059 0%, #99742e 100%)",
                      color: "#ffffff",
                      fontSize: "0.62rem",
                      fontWeight: "900",
                      padding: "4px 10px",
                      borderRadius: "14px",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
                      letterSpacing: "0.6px",
                      animation: "pulse 2s infinite"
                    }}
                  >
                    ✦ 3D POP-OUT
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* INTERACTIVE CONTROLS UNDER CANVAS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "24px", zIndex: 35 }}>
            <button
              onClick={() => setIsPopoutEngaged(!isPopoutEngaged)}
              style={{
                background: isPopoutEngaged ? "#18181b" : "#ffffff",
                color: isPopoutEngaged ? "#ffffff" : "#333333",
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "8px 18px",
                borderRadius: "20px",
                fontSize: "0.76rem",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                transition: "all 0.2s ease"
              }}
            >
              {isPopoutEngaged ? "⚡ Pop-Out Leaping Forward (Click to Relax)" : "Tap to Engage 3D Leap"}
            </button>
            <button
              onClick={() => setTilt({ x: 12, y: -8 })}
              style={{
                background: "#ffffff",
                color: "#555",
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "0.74rem",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >
              ↺ Reset Angle
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT DETAILS, STRICT PRICING & ACTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
          {/* Tag & Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
                color: "#ffffff",
                fontSize: "0.72rem",
                fontWeight: "850",
                padding: "4px 12px",
                borderRadius: "12px",
                letterSpacing: "1px"
              }}
            >
              {activeShoe.tag}
            </span>
            <span style={{ fontSize: "0.82rem", color: "#666", fontWeight: "600" }}>
              ⭐ {activeShoe.rating} ({activeShoe.reviews} Verified Reviews)
            </span>
            <span
              style={{
                background: "#e0f2fe",
                color: "#0369a1",
                fontSize: "0.7rem",
                fontWeight: "750",
                padding: "3px 10px",
                borderRadius: "12px"
              }}
            >
              {activeShoe.typeLabel}
            </span>
          </div>

          {/* Product Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: "800",
              color: "#18181b",
              lineHeight: "1.25",
              margin: 0
            }}
          >
            {activeShoe.title}
          </h2>

          {/* STRICT PRICING BAR */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "1.65rem", fontWeight: "900", color: "#c5a059" }}>
              Rs. {activeShoe.price.toLocaleString()}
            </span>
            <span style={{ fontSize: "1rem", color: "#9ca3af", textDecoration: "line-through" }}>
              Rs. {activeShoe.originalPrice.toLocaleString()}
            </span>
            <span
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                fontSize: "0.72rem",
                fontWeight: "800",
                padding: "3px 10px",
                borderRadius: "12px"
              }}
            >
              {activeShoe.price === 5999 ? "SAVE 20%" : "SAVE 23%"}
            </span>
          </div>

          {/* Specifications Grid */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.78rem" }}>
              <div>
                <span style={{ color: "#777", display: "block" }}>Craftsmanship</span>
                <strong style={{ color: "#222" }}>{activeShoe.material}</strong>
              </div>
              <div>
                <span style={{ color: "#777", display: "block" }}>Sole Construction</span>
                <strong style={{ color: "#222" }}>{activeShoe.sole}</strong>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {activeShoe.features.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#444" }}>
                <span style={{ color: "#c5a059", fontWeight: "800" }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Size Selector */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: "750", color: "#333" }}>Select EU Shoe Size:</span>
              <span style={{ fontSize: "0.72rem", color: "#c5a059", fontWeight: "700" }}>True to Size Fit</span>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["39", "40", "41", "42", "43", "44", "45"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    width: "42px",
                    height: "38px",
                    borderRadius: "10px",
                    border: selectedSize === sz ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.12)",
                    background: selectedSize === sz ? "#18181b" : "#ffffff",
                    color: selectedSize === sz ? "#ffffff" : "#333333",
                    fontSize: "0.82rem",
                    fontWeight: "800",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS: QUANTITY, BUY NOW, WHATSAPP */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
            {/* Quantity */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.14)",
                borderRadius: "16px",
                padding: "6px 10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ border: "none", background: "transparent", fontSize: "1.1rem", padding: "0 8px", cursor: "pointer", fontWeight: "700" }}
              >
                −
              </button>
              <span style={{ fontSize: "0.92rem", fontWeight: "800", minWidth: "26px", textAlign: "center" }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ border: "none", background: "transparent", fontSize: "1.1rem", padding: "0 8px", cursor: "pointer", fontWeight: "700" }}
              >
                +
              </button>
            </div>

            {/* BUY NOW */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: "1 1 180px",
                padding: "13px 22px",
                borderRadius: "16px",
                background: addedToast ? "#10b981" : "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                color: "#ffffff",
                border: "none",
                fontSize: "0.88rem",
                fontWeight: "800",
                letterSpacing: "0.5px",
                cursor: "pointer",
                boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
                transition: "all 0.25s ease"
              }}
            >
              {addedToast ? "✓ Added to Bag!" : `✦ BUY NOW • Rs. ${(activeShoe.price * quantity).toLocaleString()}`}
            </button>

            {/* WHATSAPP ORDER */}
            <a
              href={`https://wa.me/923339194200?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "13px 20px",
                borderRadius: "16px",
                background: "#25D366",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: "800",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(37, 211, 102, 0.35)",
                transition: "transform 0.2s ease"
              }}
            >
              <span>💬</span>
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
