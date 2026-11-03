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
    image: "/assets/shoes/black_chelsea_boots_5999.jpg",
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
    image: "/assets/shoes/glossy_black_derby_shoes_5999.jpg",
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
      "Hand-Polished Clean Toe Cap Contour",
      "Anti-Fatigue Arch Support Footbed"
    ]
  },
  {
    id: 503,
    title: "Royal Oxblood Glossy Leather Formal Shoes",
    category: "Footwear",
    price: 5999,
    originalPrice: 7500,
    type: "formal",
    typeLabel: "Royal Formal Shoes",
    image: "/assets/shoes/royal_oxblood_formal_shoes_5999.jpg",
    material: "Hand-Burnished Deep Maroon Oxblood Leather",
    sole: "Artisanal Finished Edge Dress Sole",
    color: "Glossy Maroon / Oxblood",
    tag: "EXCLUSIVE",
    badgeType: "sale",
    rating: 4.9,
    reviews: 110,
    features: [
      "Deep Two-Tone Burgundy Oxblood Patina",
      "Sleek Chiseled Toe Formal Silhouette",
      "Gentlemen's Dress Heel with Rubber Grip",
      "Premium Moisture-Wicking Leather Lining"
    ]
  },

  // LORO PIANA STYLE SUEDE LOAFERS (Strictly Rs. 4,999)
  {
    id: 701,
    title: "Loro Piana Style Sand Beige Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/sand_beige_suede_loafer_4999.jpg",
    material: "Velvety Water-Repellent Italian Suede",
    sole: "Signature Off-White Ergonomic Rubber Sole",
    color: "Sand Beige",
    tag: "TRENDING",
    badgeType: "sale",
    rating: 5.0,
    reviews: 128,
    features: [
      "Signature White Sole Cushioning",
      "Slip-On Venetian Clean Vamp Cut",
      "Ultra-Soft Glove-Like Insole Lining",
      "Bespoke Contrast Hand-Stitched Apron"
    ]
  },
  {
    id: 702,
    title: "Loro Piana Style Ocean Blue Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/ocean_blue_suede_loafer_4999.jpg",
    material: "Ultra-Soft Ocean Blue Nap Suede",
    sole: "Signature White Flexible Walking Sole",
    color: "Ocean Blue",
    tag: "POPULAR",
    badgeType: "sale",
    rating: 4.9,
    reviews: 96,
    features: [
      "Vibrant Riviera Blue Shade",
      "Ultra-Flexible Featherweight Architecture",
      "All-Day Walking Cushioning",
      "Handcrafted Suede Edge Piping"
    ]
  },
  {
    id: 703,
    title: "Loro Piana Style Chocolate Brown Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/chocolate_brown_suede_loafer_4999.jpg",
    material: "Rich Espresso Dark Chocolate Suede",
    sole: "Signature White Non-Marking Rubber Sole",
    color: "Chocolate Brown",
    tag: "BESTSELLER",
    badgeType: "sale",
    rating: 5.0,
    reviews: 114,
    features: [
      "Deep Earthy Muted Espresso Tone",
      "Water-Resistant Scotchgard Coating",
      "Memory Foam Padded Insole",
      "Effortless Formal-Casual Transition"
    ]
  },
  {
    id: 704,
    title: "Loro Piana Style Midnight Navy Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/midnight_navy_suede_loafer_4999.jpg",
    material: "Regal Midnight Navy Calf Suede",
    sole: "Signature White Ergonomic Grip Sole",
    color: "Midnight Navy",
    tag: "ROYAL EDITION",
    badgeType: "sale",
    rating: 4.9,
    reviews: 87,
    features: [
      "Aristocratic Deep Navy Hue",
      "Hand-Stitched Front Saddle Apron",
      "Ultra-Lightweight Construction",
      "Supple Calf Leather Internal Lining"
    ]
  },
  {
    id: 705,
    title: "Loro Piana Style Taupe Grey Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/taupe_grey_suede_loafer_4999.jpg",
    material: "Contemporary Muted Taupe Grey Suede",
    sole: "Signature White Flexible Walking Sole",
    color: "Taupe Grey",
    tag: "POPULAR",
    badgeType: "sale",
    rating: 4.8,
    reviews: 73,
    features: [
      "Versatile Neutral Earth Tone",
      "Pair with Chinos, Denim & Shalwar Kameez",
      "Shock-Absorbing White Rubber Base",
      "Breathable Anti-Odor Footbed"
    ]
  },
  {
    id: 706,
    title: "Loro Piana Style Camel Tan Suede Loafers",
    category: "Footwear",
    price: 4999,
    originalPrice: 6500,
    type: "loafers",
    typeLabel: "Summer Walk Loafers",
    image: "/assets/loafers/camel_tan_suede_loafer_4999.jpg",
    material: "Warm Golden Camel Italian Suede",
    sole: "Signature White Non-Slip Rubber Sole",
    color: "Camel Tan",
    tag: "NEW ARRIVAL",
    badgeType: "sale",
    rating: 4.9,
    reviews: 91,
    features: [
      "Warm Golden Sand Accent Tone",
      "Handcrafted Precision Italian Stitching",
      "Featherlight Comfort for Long Wear",
      "Signature White Outsole Durability"
    ]
  }
];

export default function Footwear3DPopout() {
  const { addToCart, setIsCartOpen, storeConfig } = useStore();

  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'formal' | 'loafers'
  const [activeId, setActiveId] = useState(501); // Default to Chelsea Boots
  const [isPopoutEngaged, setIsPopoutEngaged] = useState(true); // Hyper-realistic 3D Pop-Out
  const [tilt, setTilt] = useState({ x: -10, y: 14 }); // 3D rotation angles
  const [selectedSize, setSelectedSize] = useState("Size EU 42 (Standard)");
  const [quantity, setQuantity] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);

  const stageRef = useRef(null);
  const galleryScrollRef = useRef(null);

  const activeShoe = FOOTWEAR_DATA.find((s) => s.id === activeId) || FOOTWEAR_DATA[0];

  const filteredShoes =
    activeTab === "all"
      ? FOOTWEAR_DATA
      : activeTab === "formal"
      ? FOOTWEAR_DATA.filter((s) => s.id >= 501 && s.id <= 503)
      : FOOTWEAR_DATA.filter((s) => s.id >= 701 && s.id <= 706);

  // Mouse move 3D tilt tracking for realistic optical perspective
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt angles (-18deg to +18deg)
    const tiltX = -((y - centerY) / centerY) * 16;
    const tiltY = ((x - centerX) / centerX) * 20;

    setTilt({ x: Math.max(-20, Math.min(20, tiltX)), y: Math.max(-24, Math.min(24, tiltY)) });
  };

  const handleMouseLeave = () => {
    // Reset to dramatic pop-out angle
    setTilt({ x: -10, y: 14 });
  };

  // Touch move for mobile devices
  const handleTouchMove = (e) => {
    if (!stageRef.current || !e.touches[0]) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 14;
    const tiltY = ((x - centerX) / centerX) * 18;

    setTilt({ x: Math.max(-18, Math.min(18, tiltX)), y: Math.max(-20, Math.min(20, tiltY)) });
  };

  const handleSelectShoe = (shoe) => {
    setActiveId(shoe.id);
  };

  const handleBuyNow = () => {
    const cartProduct = {
      id: activeShoe.id,
      title: activeShoe.title,
      category: activeShoe.category,
      price: activeShoe.price,
      originalPrice: activeShoe.originalPrice,
      image: activeShoe.image,
      inStock: true
    };
    addToCart(cartProduct, `Size: ${selectedSize}`, 0, quantity);
    setIsCartOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const msg =
      `Assalam-o-Alaikum! I want to order from *Zargul Collection*:\n\n` +
      `✦ *Item:* ${activeShoe.title}\n` +
      `✦ *Category:* Footwear (${activeShoe.typeLabel})\n` +
      `✦ *Color:* ${activeShoe.color}\n` +
      `✦ *Price:* Rs. ${activeShoe.price.toLocaleString()}\n` +
      `✦ *Size:* ${selectedSize}\n` +
      `✦ *Quantity:* ${quantity}\n` +
      `✦ *Total:* Rs. ${(activeShoe.price * quantity).toLocaleString()}\n\n` +
      `🔗 *Link:* https://zargul.net/product/${activeShoe.id}\n\n` +
      `Please confirm Cash on Delivery with doorstep parcel inspection.`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Scroll thumbnail into view
  useEffect(() => {
    if (galleryScrollRef.current) {
      const el = galleryScrollRef.current.querySelector(`[data-id="${activeId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeId]);

  return (
    <section
      className="footwear-3d-stage-section"
      style={{
        padding: "20px 4% 32px",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative"
      }}
    >
      {/* SECTION HEADER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }} className="hero-tag">
          <span style={{ color: "#d4af37" }}>✦</span>
          <span>Hyper-Realistic 3D Optical Illusion</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.65rem",
            fontWeight: "800",
            color: "var(--color-text-dark)",
            margin: "6px 0 4px",
            letterSpacing: "-0.4px"
          }}
        >
          Luxury Footwear 3D Pop-Out Experience
        </h2>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: "0 auto", maxWidth: "580px", lineHeight: 1.4 }}>
          Tap any shoe to engage the 3D Pop-Out illusion. Move your cursor or swipe your finger to tilt the shoe in real-time as it projects outward from your screen!
        </p>

        {/* CATEGORY FILTER TABS */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "12px",
            background: "rgba(0,0,0,0.04)",
            padding: "3px 6px",
            borderRadius: "30px"
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.74rem",
              fontWeight: activeTab === "all" ? "800" : "600",
              background: activeTab === "all" ? "#ffffff" : "transparent",
              color: activeTab === "all" ? "var(--color-text-dark)" : "var(--color-text-muted)",
              boxShadow: activeTab === "all" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            All Footwear ({FOOTWEAR_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("formal")}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.74rem",
              fontWeight: activeTab === "formal" ? "800" : "600",
              background: activeTab === "formal" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "formal" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "formal" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Leather Shoes &amp; Boots — Rs. 5,999 (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("loafers")}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.74rem",
              fontWeight: activeTab === "loafers" ? "800" : "600",
              background: activeTab === "loafers" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "loafers" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "loafers" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Suede Loafers — Rs. 4,999 (6)
          </button>
        </div>
      </div>

      {/* HORIZONTAL SWIPE FOOTWEAR SELECTOR ROW */}
      <div
        ref={galleryScrollRef}
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          padding: "6px 8px 16px",
          marginBottom: "24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {filteredShoes.map((shoe) => {
          const isSelected = shoe.id === activeId;
          return (
            <div
              key={shoe.id}
              data-id={shoe.id}
              onClick={() => handleSelectShoe(shoe)}
              style={{
                flexShrink: 0,
                width: "95px",
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.25s ease",
                transform: isSelected ? "translateY(-4px) scale(1.04)" : "translateY(0) scale(1)"
              }}
              title={`Click to pop-out ${shoe.title}`}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: isSelected ? "2px solid #d4af37" : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: isSelected
                    ? "0 8px 20px rgba(212, 175, 55, 0.35)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  position: "relative",
                  background: "#ffffff",
                  transition: "all 0.25s ease"
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
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
                    background: isSelected
                      ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)"
                      : "rgba(20, 16, 22, 0.75)",
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
                  fontSize: "0.66rem",
                  fontWeight: isSelected ? "800" : "600",
                  color: isSelected ? "var(--color-accent-dark)" : "var(--color-text-dark)",
                  display: "block",
                  marginTop: "4px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {shoe.title.split(" ")[0]} {shoe.title.split(" ")[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3D POP-OUT STAGE CONTAINER */}
      <div
        className="popout-stage-container"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 440px) 1fr",
          gap: "36px",
          alignItems: "center"
        }}
      >
        {/* LEFT COLUMN: THE HYPER-REALISTIC 3D POP-OUT OPTICAL ILLUSION CANVAS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
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
              maxWidth: "360px",
              aspectRatio: "1 / 1",
              perspective: "1200px",
              cursor: "grab",
              userSelect: "none"
            }}
            title="Click or drag to toggle 3D Pop-Out depth"
          >
            {/* RECESSED 3D BACKGROUND FRAME (PEDESTAL IN THE SCREEN) */}
            <div
              style={{
                position: "absolute",
                inset: "18px",
                borderRadius: "20px",
                background: "radial-gradient(circle at 50% 50%, #faf6fa 0%, #ece5ed 100%)",
                border: "2px solid rgba(197, 160, 89, 0.4)",
                boxShadow: "inset 0 4px 20px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.06)",
                transform: "translateZ(0px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "14px 16px",
                zIndex: 1
              }}
            >
              {/* Recessed Grid Lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage: "radial-gradient(#c5a059 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  borderRadius: "20px"
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.64rem", color: "var(--color-text-muted)", zIndex: 2 }}>
                <span>✦ 3D STAGE RECESS</span>
                <span style={{ fontWeight: "750" }}>{activeShoe.color}</span>
              </div>

              {/* Pedestal Ellipse Shadow Surface */}
              <div
                style={{
                  width: "80%",
                  height: "28px",
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: isPopoutEngaged
                    ? "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)"
                    : "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                  filter: isPopoutEngaged ? "blur(6px)" : "blur(2px)",
                  transform: isPopoutEngaged ? "scale(1.3) translateY(8px)" : "scale(1)",
                  transition: "all 0.5s cubic-bezier(0.34, 1.3, 0.64, 1)",
                  zIndex: 2
                }}
              />
            </div>

            {/* THE POPPING-OUT SHOE OBJECT (BREAKS OUT OF SCREEN BOUNDARY) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                transform: isPopoutEngaged
                  ? `perspective(1200px) translateZ(120px) scale3d(1.28, 1.28, 1.28) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : "perspective(1200px) translateZ(0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)",
                transition: "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1)",
                zIndex: 10
              }}
            >
              {/* HIGH RESOLUTION SHOE WITH MULTI-STAGE AMBIENT SHADOW */}
              <div
                style={{
                  width: "82%",
                  aspectRatio: "1 / 1",
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  filter: isPopoutEngaged
                    ? "drop-shadow(0 30px 45px rgba(0, 0, 0, 0.55)) drop-shadow(0 15px 25px rgba(197, 160, 89, 0.4))"
                    : "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18))",
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
                    display: "block"
                  }}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />

                {/* 3D Sheen Reflection Highlight */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                    pointerEvents: "none",
                    opacity: isPopoutEngaged ? 0.7 : 0.2,
                    transition: "opacity 0.3s ease"
                  }}
                />

                {/* Watermark */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "10px",
                    fontSize: "0.62rem",
                    fontWeight: "800",
                    color: "rgba(255, 255, 255, 0.9)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)"
                  }}
                >
                  zargul.net
                </div>
              </div>
            </div>

            {/* POP-OUT STATUS BADGE OVERLAY */}
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: "4px",
                background: isPopoutEngaged
                  ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)"
                  : "rgba(20, 16, 22, 0.75)",
                color: "#ffffff",
                fontSize: "0.62rem",
                fontWeight: "800",
                padding: "3px 8px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                zIndex: 20
              }}
            >
              <span>{isPopoutEngaged ? "🚀" : "✦"}</span>
              <span>{isPopoutEngaged ? "3D POP-OUT ACTIVE" : "2D FLAT VIEW"}</span>
            </div>
          </div>

          {/* INTERACTIVE CONTROLS FOR 3D EFFECT */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px" }}>
            <button
              type="button"
              onClick={() => setIsPopoutEngaged(!isPopoutEngaged)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.74rem",
                fontWeight: "800",
                background: isPopoutEngaged ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "#f0edf1",
                color: isPopoutEngaged ? "#ffffff" : "var(--color-text-dark)",
                boxShadow: isPopoutEngaged ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {isPopoutEngaged ? "✦ 3D Pop-Out Engaged" : "Engage 3D Pop-Out"}
            </button>

            <button
              type="button"
              onClick={() => setTilt({ x: -14, y: -18 })}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.1)",
                cursor: "pointer",
                fontSize: "0.72rem",
                fontWeight: "700",
                background: "#ffffff",
                color: "var(--color-text-dark)",
                transition: "all 0.2s ease"
              }}
              title="Reset angle"
            >
              ↺ Reset Angle
            </button>
          </div>
          <span style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
            Move cursor or drag on mobile to tilt in real 3D perspective
          </span>
        </div>

        {/* RIGHT COLUMN: FOOTWEAR SPECS, SIZES & DIRECT PURCHASE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* TAG & RATING */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className={`product-badge ${activeShoe.badgeType || "sale"}`} style={{ position: "static" }}>
                {activeShoe.tag}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "750",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  background: "rgba(197, 160, 89, 0.15)",
                  color: "var(--color-accent-dark)"
                }}
              >
                {activeShoe.typeLabel}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.74rem", color: "#f5a623", fontWeight: "700" }}>
              <span>★</span>
              <span>{activeShoe.rating}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: "500", fontSize: "0.68rem" }}>
                ({activeShoe.reviews} reviews)
              </span>
            </div>
          </div>

          {/* TITLE & MATERIAL */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: "800",
                color: "var(--color-text-dark)",
                margin: "0 0 4px",
                lineHeight: "1.25"
              }}
            >
              {activeShoe.title}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              Material: <strong style={{ color: "var(--color-text-dark)" }}>{activeShoe.material}</strong>
            </span>
          </div>

          {/* STRICT PRICING */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", margin: "2px 0" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: "900",
                color: "var(--color-text-dark)",
                letterSpacing: "-0.5px"
              }}
            >
              Rs. {activeShoe.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-muted)",
                textDecoration: "line-through"
              }}
            >
              Rs. {activeShoe.originalPrice.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: "750",
                color: "#16a34a",
                background: "rgba(22, 163, 74, 0.1)",
                padding: "2px 8px",
                borderRadius: "6px"
              }}
            >
              Save Rs. {(activeShoe.originalPrice - activeShoe.price).toLocaleString()}
            </span>
          </div>

          {/* FEATURES / SPECS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
            {activeShoe.features.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "var(--color-text-dark)" }}>
                <span style={{ color: "var(--color-accent-dark)", fontWeight: "800" }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* SIZE & QUANTITY SELECTOR */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
            {/* Size */}
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "750", color: "var(--color-text-dark)", marginBottom: "4px" }}>
                Select Shoe Size (EU):
              </label>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {["39", "40", "41", "42 (Std)", "43", "44", "45"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(`Size EU ${s}`)}
                    style={{
                      padding: "5px 8px",
                      borderRadius: "8px",
                      border: selectedSize.includes(s) ? "2px solid #d4af37" : "1px solid rgba(0,0,0,0.12)",
                      background: selectedSize.includes(s) ? "linear-gradient(135deg, #fff7fa 0%, #faedf3 100%)" : "#ffffff",
                      color: selectedSize.includes(s) ? "var(--color-accent-dark)" : "var(--color-text-dark)",
                      fontSize: "0.68rem",
                      fontWeight: selectedSize.includes(s) ? "800" : "600",
                      cursor: "pointer"
                    }}
                  >
                    EU {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ flex: "0 0 95px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "750", color: "var(--color-text-dark)", marginBottom: "4px" }}>
                Qty:
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f4f1f5",
                  borderRadius: "8px",
                  padding: "3px 8px",
                  border: "1px solid rgba(0,0,0,0.08)"
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "800",
                    color: "var(--color-text-dark)",
                    padding: "0 4px"
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "0.82rem", fontWeight: "800", color: "var(--color-text-dark)" }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "800",
                    color: "var(--color-text-dark)",
                    padding: "0 4px"
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* DUAL ACTION BUTTONS: BUY NOW & WHATSAPP ORDER */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "6px" }}>
            <button
              type="button"
              onClick={handleBuyNow}
              className="clay-btn accent"
              style={{
                width: "100%",
                padding: "11px 12px",
                borderRadius: "12px",
                fontSize: "0.82rem",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(197, 160, 89, 0.35)",
                whiteSpace: "nowrap"
              }}
            >
              <span>⚡</span> BUY NOW
            </button>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              style={{
                width: "100%",
                padding: "11px 12px",
                borderRadius: "12px",
                fontSize: "0.82rem",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
                whiteSpace: "nowrap"
              }}
            >
              <span>💬</span> Order via WhatsApp
            </button>
          </div>

          {/* FOOTER LINK */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2px" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
              🚚 Free Doorstep Inspection Across Pakistan (Cash on Delivery)
            </span>
            <Link
              href={`/product/${activeShoe.id}`}
              style={{
                fontSize: "0.72rem",
                fontWeight: "750",
                color: "var(--color-accent-dark)",
                textDecoration: "none",
                whiteSpace: "nowrap"
              }}
            >
              Full Details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
