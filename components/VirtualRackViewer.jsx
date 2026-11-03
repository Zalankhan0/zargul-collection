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
    badgeType: "sale",
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
    badgeType: "sale",
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
    badgeType: "sale",
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
    badgeType: "sale",
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
    badgeType: "sale",
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
    badgeType: "sale",
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
    badgeType: "sale",
    rating: 5.0,
    reviews: 79,
    features: ["Regal Mandarin Ban Collar", "Deep Aristocratic Navy Tone", "6 Button Fastening Front", "Full Satin Silk Inner Lining"]
  }
];

export default function VirtualRackViewer() {
  const { addToCart, setIsCartOpen, storeConfig } = useStore();

  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'prince-coat' | 'waistcoat'
  const [activeId, setActiveId] = useState(401); // Default to Midnight Black Prince Coat
  const [viewSide, setViewSide] = useState("front"); // 'front' | 'back'
  const [selectedSize, setSelectedSize] = useState("Medium (M)");
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const rackScrollRef = useRef(null);

  const activeProduct = COATS_DATA.find((c) => c.id === activeId) || COATS_DATA[0];

  // Filtered items on the hanging rack
  const rackItems =
    activeTab === "all"
      ? COATS_DATA
      : COATS_DATA.filter((item) => item.type === activeTab);

  // Available color swatches within current product's category group
  const colorSwatches = COATS_DATA.filter((item) => item.type === activeProduct.type);

  const handleSelectProduct = (product) => {
    if (product.id === activeId) return;
    setIsAnimating(true);
    setActiveId(product.id);
    setTimeout(() => {
      setIsAnimating(false);
    }, 350);
  };

  const handleFlipView = (side) => {
    setViewSide(side);
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
      `✦ *Color:* ${activeProduct.colorName}\n` +
      `✦ *Price:* Rs. ${activeProduct.price.toLocaleString()}\n` +
      `✦ *Selected Size:* ${selectedSize}\n` +
      `✦ *Quantity:* ${quantity}\n` +
      `✦ *Total Amount:* Rs. ${(activeProduct.price * quantity).toLocaleString()}\n\n` +
      `🔗 *Product Link:* https://zargul.net/product/${activeProduct.id}\n\n` +
      `Please confirm my doorstep parcel inspection & Cash on Delivery (COD).`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Scroll active hanger into view smoothly
  useEffect(() => {
    if (rackScrollRef.current) {
      const activeEl = rackScrollRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeId]);

  return (
    <section className="virtual-rack-section" style={{ padding: "20px 4% 32px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* SECTION HEADER */}
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }} className="hero-tag">
          <span style={{ color: "#d4af37" }}>✦</span>
          <span>3D Virtual Atelier &amp; Hanging Studio</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: "800",
            margin: "6px 0 4px",
            color: "var(--color-text-dark)",
            letterSpacing: "-0.3px"
          }}
        >
          Royal Prince Coats &amp; Classic Waistcoats
        </h2>
        <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: "0 auto", maxWidth: "620px", lineHeight: 1.4 }}>
          Tap any garment on the virtual rack to inspect in 3D. Switch colors in real-time, flip between front &amp; back views, and order directly via WhatsApp or Cash on Delivery.
        </p>

        {/* COLLECTION FILTER TABS */}
        <div
          style={{
            display: "inline-flex",
            background: "#f4f1f5",
            borderRadius: "30px",
            padding: "4px",
            marginTop: "12px",
            gap: "4px",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.06)"
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            style={{
              padding: "6px 14px",
              borderRadius: "24px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: activeTab === "all" ? "750" : "600",
              background: activeTab === "all" ? "#ffffff" : "transparent",
              color: activeTab === "all" ? "var(--color-text-dark)" : "var(--color-text-muted)",
              boxShadow: activeTab === "all" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            All Wardrobe ({COATS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prince-coat")}
            style={{
              padding: "6px 14px",
              borderRadius: "24px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: activeTab === "prince-coat" ? "750" : "600",
              background: activeTab === "prince-coat" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "prince-coat" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "prince-coat" ? "0 2px 8px rgba(197, 160, 89, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Prince Coats — Rs. 4,000 (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("waistcoat")}
            style={{
              padding: "6px 14px",
              borderRadius: "24px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: activeTab === "waistcoat" ? "750" : "600",
              background: activeTab === "waistcoat" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
              color: activeTab === "waistcoat" ? "#ffffff" : "var(--color-text-muted)",
              boxShadow: activeTab === "waistcoat" ? "0 2px 8px rgba(197, 160, 89, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            Classic Waistcoats — Rs. 3,000 (3)
          </button>
        </div>
      </div>

      {/* VIRTUAL HANGING RACK (BOUTIQUE RAIL WITH WOODEN HANGERS) */}
      <div
        className="hanging-rack-container clay-card white"
        style={{
          borderRadius: "20px",
          padding: "20px 16px 16px",
          marginBottom: "20px",
          background: "linear-gradient(180deg, #fdfbfd 0%, #f7f3f8 100%)",
          border: "1.5px solid rgba(197, 160, 89, 0.25)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* TOP GOLD BRASS RAIL */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "12px",
            background: "linear-gradient(180deg, #ffd700 0%, #d4af37 50%, #996515 100%)",
            borderRadius: "6px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)",
            marginBottom: "16px"
          }}
        >
          {/* Left & Right Brass End Mounts */}
          <div
            style={{
              position: "absolute",
              left: "-8px",
              top: "-5px",
              width: "16px",
              height: "22px",
              background: "linear-gradient(135deg, #b8860b 0%, #684803 100%)",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-8px",
              top: "-5px",
              width: "16px",
              height: "22px",
              background: "linear-gradient(135deg, #b8860b 0%, #684803 100%)",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* SCROLLABLE HANGERS TRACK */}
        <div
          ref={rackScrollRef}
          style={{
            display: "flex",
            gap: "14px",
            overflowX: "auto",
            padding: "8px 6px 16px",
            scrollbarWidth: "thin",
            scrollbarColor: "#d4af37 transparent",
            WebkitOverflowScrolling: "touch"
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
                  width: "140px",
                  cursor: "pointer",
                  textAlign: "center",
                  position: "relative",
                  transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease",
                  transform: isSelected ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)"
                }}
                title={`Click to inspect ${item.title}`}
              >
                {/* HANGER HOOK & WOODEN SHOULDER */}
                <div style={{ position: "relative", width: "100%", height: "28px", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                  {/* Brass Hook */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      width: "14px",
                      height: "18px",
                      border: "2.5px solid #d4af37",
                      borderBottom: "none",
                      borderRadius: "10px 10px 0 0",
                      background: "transparent",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                    }}
                  />
                  {/* Wooden Shoulder Frame */}
                  <div
                    style={{
                      width: "85px",
                      height: "7px",
                      background: "linear-gradient(180deg, #8B5A2B 0%, #5C3A21 100%)",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }}
                  />
                </div>

                {/* GARMENT CARD */}
                <div
                  style={{
                    background: isSelected ? "#ffffff" : "rgba(255,255,255,0.85)",
                    borderRadius: "14px",
                    padding: "8px 8px 10px",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isSelected
                      ? "0 10px 24px rgba(212, 175, 55, 0.28)"
                      : "0 4px 12px rgba(0,0,0,0.04)",
                    position: "relative",
                    transition: "all 0.25s ease"
                  }}
                >
                  {/* PRICE TAG PINNED TO GARMENT */}
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      background: isSelected ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "rgba(20, 16, 22, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.62rem",
                      fontWeight: "800",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      letterSpacing: "0.3px",
                      zIndex: 2,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                    }}
                  >
                    Rs. {item.price.toLocaleString()}
                  </div>

                  {/* THUMBNAIL IMAGE */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "10px",
                      overflow: "hidden",
                      background: "#f4f1f5",
                      marginBottom: "6px"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.3s ease"
                      }}
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/logo.jpg";
                      }}
                    />
                  </div>

                  {/* COLOR DOT & TITLE */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginBottom: "3px" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: item.colorHex,
                        border: `1.5px solid ${item.colorBorder}`,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        flexShrink: 0
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.72rem",
                        fontWeight: "750",
                        color: "var(--color-text-dark)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100px"
                      }}
                    >
                      {item.colorName}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "0.62rem",
                      color: isSelected ? "var(--color-accent-dark)" : "var(--color-text-muted)",
                      fontWeight: isSelected ? "700" : "500",
                      display: "block"
                    }}
                  >
                    {isSelected ? "✦ Active in 3D" : "Tap to Inspect"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
          👈 Swipe / Scroll rack to explore all coats &amp; waistcoats 👉
        </div>
      </div>

      {/* 3D CENTER INSPECTION SHOWCASE STUDIO */}
      <div
        className="center-studio-grid clay-card white"
        style={{
          borderRadius: "24px",
          padding: "24px 20px",
          background: "linear-gradient(135deg, #ffffff 0%, #faf8fa 100%)",
          border: "2px solid rgba(197, 160, 89, 0.35)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: "minmax(320px, 480px) 1fr",
          gap: "28px",
          alignItems: "center"
        }}
      >
        {/* LEFT COLUMN: 3D FLIP PRODUCT CARD (FRONT / BACK) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {/* TOP HANGER OVER MAIN SHOWCASE */}
          <div style={{ position: "relative", width: "160px", height: "30px", display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: "-10px", zIndex: 10 }}>
            {/* Brass Hook */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                width: "20px",
                height: "22px",
                border: "3px solid #d4af37",
                borderBottom: "none",
                borderRadius: "14px 14px 0 0",
                boxShadow: "0 3px 6px rgba(0,0,0,0.2)"
              }}
            />
            {/* Sculpted Wooden Bar */}
            <div
              style={{
                width: "140px",
                height: "9px",
                background: "linear-gradient(180deg, #8B5A2B 0%, #5C3A21 100%)",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.25)"
              }}
            />
          </div>

          {/* 3D PERSPECTIVE FLIP CARD CONTAINER */}
          <div
            onClick={() => handleFlipView(viewSide === "front" ? "back" : "front")}
            style={{
              perspective: "1400px",
              width: "100%",
              maxWidth: "420px",
              aspectRatio: "1 / 1",
              position: "relative",
              cursor: "pointer",
              borderRadius: "20px"
            }}
            title="Click image to flip between FRONT and BACK view"
          >
            {/* INNER CARD WITH 3D ROTATION */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
                transition: "transform 0.65s cubic-bezier(0.35, 1, 0.35, 1)",
                transform: viewSide === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
                boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                borderRadius: "20px"
              }}
            >
              {/* FRONT FACE */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "2px solid rgba(197, 160, 89, 0.3)",
                  opacity: isAnimating ? 0.3 : 1,
                  transform: isAnimating ? "scale(0.96)" : "scale(1)",
                  transition: "opacity 0.25s ease, transform 0.25s ease"
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

                {/* Front Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: "rgba(20, 16, 22, 0.8)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                    fontWeight: "800",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.5px"
                  }}
                >
                  <span style={{ color: "#d4af37" }}>✦</span> FRONT VIEW
                </div>

                {/* Watermark */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "12px",
                    fontSize: "0.68rem",
                    fontWeight: "750",
                    color: "rgba(255, 255, 255, 0.85)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                    letterSpacing: "0.5px"
                  }}
                >
                  zargul.net
                </div>
              </div>

              {/* BACK FACE (TAILORED REVERSE WITH WAIST CINCH STRAP & BUCKLE) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: activeProduct.backTheme.base,
                  border: "2px solid rgba(197, 160, 89, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "24px 20px 18px",
                  boxSizing: "border-box"
                }}
              >
                {/* Back Collar Curve */}
                <div
                  style={{
                    width: "110px",
                    height: "16px",
                    borderRadius: "0 0 50px 50px",
                    background: activeProduct.backTheme.accent,
                    borderBottom: `2px solid ${activeProduct.backTheme.stitching}`,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
                  }}
                />

                {/* Back Badge Tag */}
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                    fontWeight: "800",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    letterSpacing: "0.5px"
                  }}
                >
                  <span style={{ color: "#d4af37" }}>⟳</span> TAILORED BACK VIEW
                </div>

                {/* TAILORED BACK DETAILS & CREST */}
                <div style={{ textAlign: "center", width: "100%" }}>
                  {/* Vertical Back Seams (Princess Darts) */}
                  <div style={{ display: "flex", justifyContent: "space-around", width: "80%", margin: "0 auto 16px" }}>
                    <div style={{ width: "1px", height: "110px", background: activeProduct.backTheme.stitching, boxShadow: "0 0 4px rgba(0,0,0,0.5)" }} />
                    <div style={{ width: "1px", height: "130px", background: activeProduct.backTheme.stitching, boxShadow: "0 0 4px rgba(0,0,0,0.5)" }} />
                    <div style={{ width: "1px", height: "110px", background: activeProduct.backTheme.stitching, boxShadow: "0 0 4px rgba(0,0,0,0.5)" }} />
                  </div>

                  {/* EMBROIDERED ZARGUL CREST */}
                  <div
                    style={{
                      display: "inline-block",
                      border: "1px solid rgba(197, 160, 89, 0.4)",
                      padding: "8px 18px",
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.25)",
                      marginBottom: "16px"
                    }}
                  >
                    <span style={{ color: "#d4af37", fontSize: "0.95rem", display: "block" }}>👑</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.76rem", fontWeight: "800", color: "#fef08a", letterSpacing: "1px", display: "block" }}>
                      ZARGUL ATELIER
                    </span>
                    <span style={{ fontSize: "0.62rem", color: activeProduct.backTheme.textColor, opacity: 0.85, letterSpacing: "0.5px" }}>
                      Bespoke Tailoring • Swat Valley
                    </span>
                  </div>

                  {/* BESPOKE ADJUSTABLE WAIST CINCH BELT & METALLIC BUCKLE */}
                  <div
                    style={{
                      width: "85%",
                      margin: "0 auto",
                      height: "18px",
                      background: activeProduct.backTheme.accent,
                      borderTop: `1px solid ${activeProduct.backTheme.stitching}`,
                      borderBottom: `1px solid ${activeProduct.backTheme.stitching}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.25)"
                    }}
                  >
                    {/* Center Brass/Chrome Buckle */}
                    <div
                      style={{
                        width: "28px",
                        height: "26px",
                        background: activeProduct.backTheme.buckle,
                        borderRadius: "5px",
                        border: `1.5px solid ${activeProduct.backTheme.buckleBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
                      }}
                    >
                      <div style={{ width: "12px", height: "10px", background: activeProduct.backTheme.base, borderRadius: "2px" }} />
                    </div>
                  </div>
                </div>

                {/* Bottom Tailored Hem & Watermark */}
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.65rem", color: activeProduct.backTheme.textColor, opacity: 0.8 }}>
                  <span>Tailored Slim-Fit Vented Hem</span>
                  <span style={{ fontWeight: "750" }}>zargul.net</span>
                </div>
              </div>
            </div>
          </div>

          {/* FRONT & BACK VIEW TOGGLE BUTTONS */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#ede9f0",
              borderRadius: "30px",
              padding: "4px",
              marginTop: "14px",
              gap: "4px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlipView("front");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: viewSide === "front" ? "800" : "600",
                background: viewSide === "front" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
                color: viewSide === "front" ? "#ffffff" : "var(--color-text-dark)",
                boxShadow: viewSide === "front" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span>✦</span> FRONT VIEW
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlipView("back");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: viewSide === "back" ? "800" : "600",
                background: viewSide === "back" ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)" : "transparent",
                color: viewSide === "back" ? "#ffffff" : "var(--color-text-dark)",
                boxShadow: viewSide === "back" ? "0 2px 8px rgba(197, 160, 89, 0.35)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span>⟳</span> BACK VIEW
            </button>
          </div>
          <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
            Tap card or toggle buttons to flip 3D view
          </span>
        </div>

        {/* RIGHT COLUMN: PRODUCT DETAILS, COLOR SWATCHES & BUY ACTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* BADGES & RATING */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className={`product-badge ${activeProduct.badgeType || "sale"}`} style={{ position: "static" }}>
                {activeProduct.tag}
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
                {activeProduct.typeLabel}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#f5a623", fontWeight: "700" }}>
              <span>★</span>
              <span>{activeProduct.rating}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: "500", fontSize: "0.7rem" }}>
                ({activeProduct.reviews} reviews)
              </span>
            </div>
          </div>

          {/* TITLE & CATEGORY */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: "800",
                color: "var(--color-text-dark)",
                margin: "0 0 6px",
                lineHeight: "1.25"
              }}
            >
              {activeProduct.title}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
              Colorway: <strong style={{ color: "var(--color-text-dark)" }}>{activeProduct.colorName}</strong>
            </span>
          </div>

          {/* DYNAMIC COLOR SWATCHES (CLICK TO CHANGE COLOR) */}
          <div
            style={{
              background: "#faf7fa",
              padding: "10px 14px",
              borderRadius: "14px",
              border: "1px solid rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: "750", color: "var(--color-text-dark)" }}>
                🎨 Available Color Swatches ({colorSwatches.length}):
              </span>
              <span style={{ fontSize: "0.68rem", color: "var(--color-accent-dark)", fontWeight: "600" }}>
                Instant Color Switch
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {colorSwatches.map((swatch) => {
                const isSelectedSwatch = swatch.id === activeId;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => handleSelectProduct(swatch)}
                    style={{
                      display: "flex",
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
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: swatch.colorHex,
                        border: `1.5px solid ${swatch.colorBorder}`,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", padding: "4px 0" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
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

          {/* FEATURES / SPECS BULLETS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {activeProduct.features.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "var(--color-text-dark)" }}>
                <span style={{ color: "var(--color-accent-dark)", fontWeight: "800" }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* SIZE & QUANTITY SELECTOR */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", paddingTop: "4px" }}>
            {/* Size Selector */}
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "750", color: "var(--color-text-dark)", marginBottom: "4px" }}>
                Select Tailored Size:
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
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

            {/* Quantity Selector */}
            <div style={{ flex: "0 0 100px" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "750", color: "var(--color-text-dark)", marginBottom: "4px" }}>
                Quantity:
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f4f1f5",
                  borderRadius: "10px",
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
            {/* BUY NOW BUTTON */}
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

            {/* ORDER VIA WHATSAPP BUTTON */}
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

          {/* FOOTER LINK TO PRODUCT DETAILS */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
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
              View Full Specs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
