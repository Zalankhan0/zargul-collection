"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
    colorBorder: "#3f3f46",
    swatchName: "Jet Black",
    image: "/assets/coats/midnight_black_prince_coat_4000.jpg",
    backTheme: {
      base: "#161618",
      accent: "#222226",
      lining: "#0f0f11",
      stitching: "rgba(197, 160, 89, 0.4)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      buckleBorder: "#d4af37",
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
    colorBorder: "#784b30",
    swatchName: "Espresso Brown",
    image: "/assets/coats/classic_brown_prince_coat_4000.jpg",
    backTheme: {
      base: "#3b2214",
      accent: "#4d2e1b",
      lining: "#29160c",
      stitching: "rgba(212, 175, 55, 0.45)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      buckleBorder: "#d4af37",
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
    colorBorder: "#b0b9c6",
    swatchName: "Steel Grey",
    image: "/assets/coats/silver_grey_waistcoat_4000.jpg",
    backTheme: {
      base: "#778393",
      accent: "#8b97a7",
      lining: "#545e6b",
      stitching: "rgba(255, 255, 255, 0.5)",
      buckle: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
      buckleBorder: "#cbd5e1",
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
    colorBorder: "#deb887",
    swatchName: "Royal Beige",
    image: "/assets/coats/beige_royal_waistcoat_4000.jpg",
    backTheme: {
      base: "#b39875",
      accent: "#c4aa87",
      lining: "#846d50",
      stitching: "rgba(255, 255, 255, 0.55)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      buckleBorder: "#d4af37",
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
    colorBorder: "#3f3f46",
    swatchName: "Charcoal Jet",
    image: "/assets/coats/classic_charcoal_black_waistcoat_3000.jpg",
    backTheme: {
      base: "#1a1a1c",
      accent: "#26262a",
      lining: "#101012",
      stitching: "rgba(197, 160, 89, 0.4)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      buckleBorder: "#d4af37",
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
    colorBorder: "#d1d5db",
    swatchName: "Pearl Grey",
    image: "/assets/coats/pearl_grey_classic_waistcoat_3000.jpg",
    backTheme: {
      base: "#9faab9",
      accent: "#b5c0cf",
      lining: "#737e8c",
      stitching: "rgba(255, 255, 255, 0.55)",
      buckle: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
      buckleBorder: "#cbd5e1",
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
    colorHex: "#16284e",
    colorBorder: "#2563eb",
    swatchName: "Midnight Blue",
    image: "/assets/coats/midnight_blue_classic_waistcoat_3000.jpg",
    backTheme: {
      base: "#132140",
      accent: "#1c2e56",
      lining: "#0b1427",
      stitching: "rgba(197, 160, 89, 0.45)",
      buckle: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
      buckleBorder: "#d4af37",
      textColor: "#93c5fd"
    },
    tag: "ROYAL EDITION",
    rating: 5.0,
    reviews: 79,
    features: ["Regal Mandarin Ban Collar", "Deep Aristocratic Navy Tone", "6 Button Fastening Front", "Full Satin Silk Inner Lining"]
  }
];

export default function VirtualRackViewer() {
  const { addToCart, setIsCartOpen, storeConfig } = useStore();

  const [activeTab, setActiveTab] = useState("all");
  const [activeId, setActiveId] = useState(401);
  const [viewSide, setViewSide] = useState("front"); // 'front' | 'back'
  const [rotationDeg, setRotationDeg] = useState(0); // For full 3D rotation
  const [selectedSize, setSelectedSize] = useState("Medium (M)");
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);

  const rackScrollRef = useRef(null);

  const activeProduct = COATS_DATA.find((c) => c.id === activeId) || COATS_DATA[0];

  const rackItems =
    activeTab === "all"
      ? COATS_DATA
      : COATS_DATA.filter((item) => item.type === activeTab);

  const colorSwatches = COATS_DATA.filter((item) => item.type === activeProduct.type);

  // Smooth item selection & zoom
  const handleSelectProduct = (product) => {
    if (product.id === activeId) return;
    setIsZooming(true);
    setActiveId(product.id);
    setTimeout(() => {
      setIsZooming(false);
    }, 300);
  };

  // 3D Front / Back flip
  const handleToggleFlip = (targetSide) => {
    if (targetSide === "back") {
      setViewSide("back");
      setRotationDeg(180);
    } else {
      setViewSide("front");
      setRotationDeg(0);
    }
  };

  // Full 360 Spin
  const handleFullSpin = () => {
    setRotationDeg((prev) => prev + 360);
  };

  const handleBuyNow = () => {
    const cartProduct = {
      id: activeProduct.id,
      title: activeProduct.title,
      category: activeProduct.category,
      price: activeProduct.price,
      originalPrice: activeProduct.originalPrice,
      image: activeProduct.image,
      inStock: true
    };
    addToCart(cartProduct, `Size: ${selectedSize}`, 0, quantity);
    setIsCartOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const msg =
      `Assalam-o-Alaikum! I want to order from *Zargul Collection*:\n\n` +
      `✦ *Item:* ${activeProduct.title}\n` +
      `✦ *Category:* ${activeProduct.typeLabel}\n` +
      `✦ *Colorway:* ${activeProduct.colorName}\n` +
      `✦ *Price:* Rs. ${activeProduct.price.toLocaleString()}\n` +
      `✦ *Size:* ${selectedSize}\n` +
      `✦ *Quantity:* ${quantity}\n` +
      `✦ *Total Amount:* Rs. ${(activeProduct.price * quantity).toLocaleString()}\n\n` +
      `🔗 *Link:* https://zargul.net/product/${activeProduct.id}\n\n` +
      `Please confirm Cash on Delivery & doorstep parcel inspection.`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Auto scroll rack to active product
  useEffect(() => {
    if (rackScrollRef.current) {
      const activeEl = rackScrollRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeId]);

  return (
    <section
      className="virtual-atelier-immersive"
      style={{
        padding: "24px 4% 36px",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative"
      }}
    >
      {/* MINIMAL HEADER - NO BOXES */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: "800",
            letterSpacing: "1.5px",
            color: "var(--color-accent-dark)",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "4px"
          }}
        >
          ✦ 3D VIRTUAL ATELIER
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.65rem",
            fontWeight: "800",
            color: "var(--color-text-dark)",
            margin: "0 0 6px",
            letterSpacing: "-0.4px"
          }}
        >
          Prince Coats &amp; Classic Waistcoats
        </h2>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: "0 auto", maxWidth: "560px", lineHeight: 1.4 }}>
          Swipe the hanging rack, tap any coat to inspect, switch colors in real-time, and spin in 3D.
        </p>

        {/* MINIMAL PILL FILTER (BORDERLESS) */}
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
            All Pieces ({COATS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prince-coat")}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.74rem",
              fontWeight: activeTab === "prince-coat" ? "800" : "600",
              background: activeTab === "prince-coat" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "prince-coat" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "prince-coat" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Prince Coats — Rs. 4,000 (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("waistcoat")}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.74rem",
              fontWeight: activeTab === "waistcoat" ? "800" : "600",
              background: activeTab === "waistcoat" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "waistcoat" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "waistcoat" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Classic Waistcoats — Rs. 3,000 (3)
          </button>
        </div>
      </div>

      {/* 1. VIRTUAL HANGING RACK: THIN METALLIC RAIL (NO BOXES, NO CARDS) */}
      <div style={{ position: "relative", width: "100%", marginBottom: "32px", padding: "10px 0" }}>
        {/* THIN HORIZONTAL METALLIC RAIL */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "0",
            right: "0",
            height: "3px",
            background: "linear-gradient(90deg, rgba(197, 160, 89, 0.1) 0%, #c5a059 15%, #ffd700 50%, #c5a059 85%, rgba(197, 160, 89, 0.1) 100%)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            zIndex: 1
          }}
        />

        {/* HANGING COATS ROW (TRANSPARENT, FLOATING OBJECTS) */}
        <div
          ref={rackScrollRef}
          style={{
            display: "flex",
            gap: "18px",
            overflowX: "auto",
            padding: "8px 10px 14px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            position: "relative",
            zIndex: 2
          }}
        >
          {rackItems.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <div
                key={item.id}
                data-id={item.id}
                onClick={() => handleSelectProduct(item)}
                style={{
                  flexShrink: 0,
                  width: "110px",
                  cursor: "pointer",
                  textAlign: "center",
                  position: "relative",
                  transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  transform: isSelected ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)"
                }}
                title={`Click to inspect ${item.title}`}
              >
                {/* METALLIC BRASS HOOK ON THE LINE */}
                <div style={{ display: "flex", justifyContent: "center", position: "relative", height: "18px" }}>
                  <div
                    style={{
                      width: "14px",
                      height: "16px",
                      border: isSelected ? "2.5px solid #d4af37" : "2px solid #a8833e",
                      borderBottom: "none",
                      borderRadius: "10px 10px 0 0",
                      background: "transparent",
                      boxShadow: isSelected ? "0 0 8px rgba(212, 175, 55, 0.7)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  />
                </div>

                {/* WOODEN HANGER TOP BAR */}
                <div
                  style={{
                    width: "72px",
                    height: "5px",
                    margin: "0 auto 3px",
                    background: "linear-gradient(180deg, #8B5A2B 0%, #5C3A21 100%)",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.25)"
                  }}
                />

                {/* FLOATING COAT CUTOUT OBJECT (NO BOX, NO CARD) */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    filter: isSelected
                      ? "drop-shadow(0 10px 20px rgba(197, 160, 89, 0.45))"
                      : "drop-shadow(0 4px 10px rgba(0,0,0,0.12))",
                    transform: isSelected ? "scale(1.02)" : "scale(0.96)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
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

                  {/* FLOATING MINI PRICE BADGE */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: isSelected
                        ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)"
                        : "rgba(20, 16, 22, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.6rem",
                      fontWeight: "800",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.3px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                    }}
                  >
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>

                {/* COLOR NAME & SELECTION DOT */}
                <div style={{ marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: item.colorHex,
                      border: `1px solid ${item.colorBorder}`,
                      display: "inline-block"
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: isSelected ? "800" : "600",
                      color: isSelected ? "var(--color-accent-dark)" : "var(--color-text-dark)",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item.colorName.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. IMMERSIVE 3D CENTER CANVAS: HERO COAT FLOATING IN SPACE (NO CARDS, NO BOXES) */}
      <div
        className="immersive-canvas-stage"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 460px) 1fr",
          gap: "36px",
          alignItems: "center"
        }}
      >
        {/* LEFT COLUMN: REAL 3D ROTATION & FLIP HERO OBJECT */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {/* HANGER SUSPENDED IN AIR */}
          <div style={{ position: "relative", width: "150px", height: "26px", display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: "-6px", zIndex: 10 }}>
            {/* Curved Brass Hook */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                width: "18px",
                height: "20px",
                border: "2.5px solid #d4af37",
                borderBottom: "none",
                borderRadius: "12px 12px 0 0",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            />
            {/* Wooden Hanger Bar */}
            <div
              style={{
                width: "130px",
                height: "7px",
                background: "linear-gradient(180deg, #8B5A2B 0%, #5C3A21 100%)",
                borderRadius: "6px",
                boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
              }}
            />
          </div>

          {/* REAL 3D PERSPECTIVE ROTATION CONTAINER */}
          <div
            onClick={() => handleToggleFlip(viewSide === "front" ? "back" : "front")}
            style={{
              perspective: "1200px",
              width: "100%",
              maxWidth: "400px",
              aspectRatio: "1 / 1",
              position: "relative",
              cursor: "pointer",
              transform: isZooming ? "scale(0.96)" : "scale(1)",
              transition: "transform 0.3s ease"
            }}
            title="Click coat to flip 3D view"
          >
            {/* 3D ROTATING ELEMENT (PERSISTENT 3D ROTATEY) */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                transition: "transform 0.85s cubic-bezier(0.34, 1.25, 0.64, 1)",
                transform: `rotateY(${rotationDeg}deg)`
              }}
            >
              {/* FRONT VIEW (FLOATING OBJECT WITH SHADOW) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "16px",
                  overflow: "hidden",
                  filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.16))"
                }}
              >
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.title} - Front View`}
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

                {/* Subtle Front Pill */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(20, 16, 22, 0.75)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    color: "#ffffff",
                    fontSize: "0.64rem",
                    fontWeight: "800",
                    padding: "3px 8px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    letterSpacing: "0.5px"
                  }}
                >
                  <span style={{ color: "#d4af37" }}>✦</span> FRONT VIEW
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "10px",
                    fontSize: "0.64rem",
                    fontWeight: "750",
                    color: "rgba(255, 255, 255, 0.85)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)"
                  }}
                >
                  zargul.net
                </div>
              </div>

              {/* BACK VIEW (TAILORED REVERSE WITH BUCKLE) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: activeProduct.backTheme.base,
                  filter: "drop-shadow(0 20px 35px rgba(0,0,0,0.22))",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 18px 16px",
                  boxSizing: "border-box"
                }}
              >
                {/* Back Collar Arch */}
                <div
                  style={{
                    width: "100px",
                    height: "14px",
                    borderRadius: "0 0 50px 50px",
                    background: activeProduct.backTheme.accent,
                    borderBottom: `2px solid ${activeProduct.backTheme.stitching}`,
                    boxShadow: "0 3px 6px rgba(0,0,0,0.3)"
                  }}
                />

                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.45)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    color: "#ffffff",
                    fontSize: "0.64rem",
                    fontWeight: "800",
                    padding: "3px 8px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <span style={{ color: "#d4af37" }}>⟳</span> TAILORED BACK VIEW
                </div>

                {/* TAILORED SEAMS & CREST */}
                <div style={{ textAlign: "center", width: "100%" }}>
                  {/* Vertical Darts */}
                  <div style={{ display: "flex", justifyContent: "space-around", width: "75%", margin: "0 auto 12px" }}>
                    <div style={{ width: "1px", height: "90px", background: activeProduct.backTheme.stitching }} />
                    <div style={{ width: "1px", height: "115px", background: activeProduct.backTheme.stitching }} />
                    <div style={{ width: "1px", height: "90px", background: activeProduct.backTheme.stitching }} />
                  </div>

                  {/* EMBROIDERED ZARGUL CREST */}
                  <div
                    style={{
                      display: "inline-block",
                      border: "1px solid rgba(197, 160, 89, 0.4)",
                      padding: "6px 14px",
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.25)",
                      marginBottom: "14px"
                    }}
                  >
                    <span style={{ color: "#d4af37", fontSize: "0.85rem", display: "block" }}>👑</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", letterSpacing: "1px", display: "block" }}>
                      ZARGUL ATELIER
                    </span>
                    <span style={{ fontSize: "0.58rem", color: activeProduct.backTheme.textColor, opacity: 0.85 }}>
                      Bespoke Tailoring • Swat Valley
                    </span>
                  </div>

                  {/* WAIST CINCH STRAP WITH METALLIC BUCKLE */}
                  <div
                    style={{
                      width: "82%",
                      margin: "0 auto",
                      height: "16px",
                      background: activeProduct.backTheme.accent,
                      borderTop: `1px solid ${activeProduct.backTheme.stitching}`,
                      borderBottom: `1px solid ${activeProduct.backTheme.stitching}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.25)"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "22px",
                        background: activeProduct.backTheme.buckle,
                        borderRadius: "4px",
                        border: `1.5px solid ${activeProduct.backTheme.buckleBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <div style={{ width: "10px", height: "8px", background: activeProduct.backTheme.base, borderRadius: "2px" }} />
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.62rem", color: activeProduct.backTheme.textColor, opacity: 0.8 }}>
                  <span>Tailored Vented Hem</span>
                  <span style={{ fontWeight: "750" }}>zargul.net</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING 3D ROTATION BUTTONS (MINIMAL, NO BOX) */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px" }}>
            {/* FRONT BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFlip("front");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.74rem",
                fontWeight: viewSide === "front" ? "800" : "600",
                background: viewSide === "front" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "rgba(0,0,0,0.06)",
                color: viewSide === "front" ? "#ffffff" : "var(--color-text-dark)",
                boxShadow: viewSide === "front" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span>✦</span> FRONT
            </button>

            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFlip("back");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.74rem",
                fontWeight: viewSide === "back" ? "800" : "600",
                background: viewSide === "back" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "rgba(0,0,0,0.06)",
                color: viewSide === "back" ? "#ffffff" : "var(--color-text-dark)",
                boxShadow: viewSide === "back" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span>⟳</span> BACK
            </button>

            {/* 360 SPIN BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFullSpin();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.12)",
                cursor: "pointer",
                fontSize: "0.72rem",
                fontWeight: "700",
                background: "#ffffff",
                color: "var(--color-text-dark)",
                transition: "all 0.2s ease"
              }}
              title="Spin coat 360 degrees"
            >
              <span>🔄</span> 360° Spin
            </button>
          </div>
          <span style={{ fontSize: "0.66rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
            Tap garment or click buttons for 3D rotation
          </span>
        </div>

        {/* RIGHT COLUMN: IMMERSIVE DETAILS, COLOR SWATCHES & BUY CONTROLS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* CATEGORY & RATING ROW */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.74rem",
                fontWeight: "800",
                letterSpacing: "0.5px",
                color: "var(--color-accent-dark)",
                textTransform: "uppercase"
              }}
            >
              ✦ {activeProduct.typeLabel}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.74rem", color: "#f5a623", fontWeight: "700" }}>
              <span>★</span>
              <span>{activeProduct.rating}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: "500", fontSize: "0.68rem" }}>
                ({activeProduct.reviews} reviews)
              </span>
            </div>
          </div>

          {/* TITLE & COLORWAY */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.45rem",
                fontWeight: "800",
                color: "var(--color-text-dark)",
                margin: "0 0 4px",
                lineHeight: "1.25"
              }}
            >
              {activeProduct.title}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              Color: <strong style={{ color: "var(--color-text-dark)" }}>{activeProduct.colorName}</strong>
            </span>
          </div>

          {/* INTERACTIVE COLOR SWATCHES (DYNAMIC CHANGE IN 3D) */}
          <div style={{ padding: "6px 0" }}>
            <span style={{ display: "block", fontSize: "0.74rem", fontWeight: "800", color: "var(--color-text-dark)", marginBottom: "8px" }}>
              🎨 Select Color Swatch:
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {colorSwatches.map((swatch) => {
                const isSelectedSwatch = swatch.id === activeId;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => handleSelectProduct(swatch)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      border: isSelectedSwatch ? "2px solid #d4af37" : "1px solid rgba(0,0,0,0.12)",
                      background: isSelectedSwatch ? "#ffffff" : "rgba(255,255,255,0.7)",
                      boxShadow: isSelectedSwatch ? "0 2px 8px rgba(212, 175, 55, 0.3)" : "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    title={`Switch to ${swatch.colorName}`}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: swatch.colorHex,
                        border: `1px solid ${swatch.colorBorder}`,
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: "0.72rem", fontWeight: isSelectedSwatch ? "800" : "600", color: "var(--color-text-dark)" }}>
                      {swatch.swatchName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STRICT PRICING DISPLAY */}
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
              Rs. {activeProduct.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-muted)",
                textDecoration: "line-through"
              }}
            >
              Rs. {activeProduct.originalPrice.toLocaleString()}
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
              Save Rs. {(activeProduct.originalPrice - activeProduct.price).toLocaleString()}
            </span>
          </div>

          {/* KEY SPECS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
            {activeProduct.features.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "var(--color-text-dark)" }}>
                <span style={{ color: "var(--color-accent-dark)", fontWeight: "800" }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* SIZE & QUANTITY SELECTORS */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
            {/* Size */}
            <div style={{ flex: "1 1 180px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "750", color: "var(--color-text-dark)", marginBottom: "4px" }}>
                Select Size:
              </label>
              <div style={{ display: "flex", gap: "5px" }}>
                {["Small (S)", "Medium (M)", "Large (L)", "Extra Large (XL)"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    style={{
                      flex: 1,
                      padding: "6px 2px",
                      borderRadius: "8px",
                      border: selectedSize === s ? "2px solid #d4af37" : "1px solid rgba(0,0,0,0.12)",
                      background: selectedSize === s ? "linear-gradient(135deg, #fff7fa 0%, #faedf3 100%)" : "#ffffff",
                      color: selectedSize === s ? "var(--color-accent-dark)" : "var(--color-text-dark)",
                      fontSize: "0.68rem",
                      fontWeight: selectedSize === s ? "800" : "600",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {s.split(" ")[0]}
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

          {/* FOOTER SPECS LINK */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2px" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
              🚚 Free Delivery &amp; Doorstep Parcel Inspection Across Pakistan
            </span>
            <Link
              href={`/product/${activeProduct.id}`}
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
