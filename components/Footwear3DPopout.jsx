"use client";

import React, { useState, useRef } from "react";
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
  const [isLevitating, setIsLevitating] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState("42");
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const stageRef = useRef(null);

  const activeShoe = FOOTWEAR_DATA[selectedShoeIndex];

  // Subtle interactive tilt that never overflows viewport
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
      className="virtual-footwear-container"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1050px",
        margin: "0 auto 36px",
        background: "radial-gradient(ellipse at 50% 20%, #ffffff 0%, #faf8fb 65%, #f4edf5 100%)",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(20, 16, 22, 0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        padding: "24px 16px 30px",
        overflow: "hidden", // STRICT NO OVERFLOW
        boxSizing: "border-box"
      }}
    >
      {/* HEADER BADGE */}
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
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
              fontWeight: "800",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "#18181b"
            }}
          >
            Footwear Atelier • 3D Floating Studio
          </span>
          <span style={{ color: "#c5a059", fontSize: "0.85rem" }}>✦</span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#666666" }}>
          Tap any shoe to view smooth levitation &amp; dynamic shadow depth
        </p>
      </div>

      {/* HORIZONTAL SHOES SELECTION CAROUSEL */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "4px 4px 14px",
          marginBottom: "20px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {FOOTWEAR_DATA.map((shoe, idx) => {
          const isSelected = idx === selectedShoeIndex;
          return (
            <div
              key={shoe.id}
              onClick={() => {
                setSelectedShoeIndex(idx);
                setIsLevitating(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "0 0 76px",
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.2s ease",
                transform: isSelected ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
                userSelect: "none"
              }}
              title={`View ${shoe.title}`}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: isSelected ? "2px solid #c5a059" : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: isSelected
                    ? "0 6px 16px rgba(197, 160, 89, 0.4)"
                    : "0 2px 6px rgba(0,0,0,0.05)",
                  position: "relative",
                  background: "#ffffff",
                  transition: "all 0.2s ease"
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
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
                    fontSize: "0.52rem",
                    fontWeight: "800",
                    padding: "1px 4px",
                    borderRadius: "6px",
                    whiteSpace: "nowrap"
                  }}
                >
                  Rs. {shoe.price.toLocaleString()}
                </div>
              </div>
              <span
                style={{
                  fontSize: "0.64rem",
                  fontWeight: isSelected ? "800" : "600",
                  color: isSelected ? "#c5a059" : "#444444",
                  display: "block",
                  marginTop: "4px",
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

      {/* 3D POP-OUT STAGE CONTAINER */}
      <div
        className="popout-stage-container"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 340px) 1fr",
          gap: "28px",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* LEFT COLUMN: THE REFINED 3D FLOATING / LEVITATION CANVAS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          {/* THE STAGE WRAPPER */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLevitating(!isLevitating)}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "320px",
              aspectRatio: "1 / 1",
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              overflow: "hidden",
              borderRadius: "20px",
              background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f6f1f7 100%)",
              border: "1px solid rgba(197, 160, 89, 0.2)",
              padding: "16px"
            }}
            title="Click to toggle floating levitation"
          >
            {/* FLOATING SHADOW BENEATH SHOE */}
            <div
              style={{
                position: "absolute",
                bottom: "22px",
                width: "65%",
                height: "22px",
                borderRadius: "50%",
                background: isLevitating
                  ? "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 50%, transparent 75%)"
                  : "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)",
                filter: isLevitating ? "blur(7px)" : "blur(3px)",
                transform: isLevitating ? "scale(1.22) translateY(6px)" : "scale(1)",
                transition: "all 0.4s ease",
                pointerEvents: "none"
              }}
            />

            {/* THE LEVITATING / FLOATING SHOE IMAGE */}
            <div
              style={{
                width: "78%",
                aspectRatio: "1 / 1",
                position: "relative",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease",
                transform: isLevitating
                  ? `scale(1.22) translateY(-14px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : `scale(1) translateY(0px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                filter: isLevitating
                  ? "drop-shadow(0 20px 28px rgba(0, 0, 0, 0.4)) drop-shadow(0 8px 12px rgba(197, 160, 89, 0.3))"
                  : "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15))",
                zIndex: 10
              }}
            >
              <img
                src={activeShoe.image}
                alt={activeShoe.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "14px"
                }}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logo.jpg";
                }}
              />
            </div>

            {/* Floating Status Pill */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(197, 160, 89, 0.3)",
                color: "#18181b",
                fontSize: "0.58rem",
                fontWeight: "800",
                padding: "2px 8px",
                borderRadius: "10px",
                letterSpacing: "0.5px"
              }}
            >
              {isLevitating ? "✦ Levitation Active" : "Tap to Float"}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT DETAILS & ACTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", boxSizing: "border-box" }}>
          {/* Tag & Type */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span
              style={{
                background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
                color: "#ffffff",
                fontSize: "0.68rem",
                fontWeight: "850",
                padding: "3px 10px",
                borderRadius: "10px",
                letterSpacing: "0.8px"
              }}
            >
              {activeShoe.tag}
            </span>
            <span style={{ fontSize: "0.78rem", color: "#666", fontWeight: "600" }}>
              ⭐ {activeShoe.rating} ({activeShoe.reviews} Reviews)
            </span>
            <span
              style={{
                background: "#f1f5f9",
                color: "#475569",
                fontSize: "0.68rem",
                fontWeight: "750",
                padding: "3px 8px",
                borderRadius: "10px"
              }}
            >
              {activeShoe.typeLabel}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: "800",
              color: "#18181b",
              lineHeight: "1.3",
              margin: 0
            }}
          >
            {activeShoe.title}
          </h2>

          {/* Strict Price Display */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.45rem", fontWeight: "900", color: "#c5a059" }}>
              Rs. {activeShoe.price.toLocaleString()}
            </span>
            <span style={{ fontSize: "0.92rem", color: "#9ca3af", textDecoration: "line-through" }}>
              Rs. {activeShoe.originalPrice.toLocaleString()}
            </span>
            <span
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                fontSize: "0.68rem",
                fontWeight: "800",
                padding: "2px 8px",
                borderRadius: "10px"
              }}
            >
              {activeShoe.price === 5999 ? "SAVE 20%" : "SAVE 23%"}
            </span>
          </div>

          {/* Size Selector */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.76rem", fontWeight: "750", color: "#333" }}>Select EU Size:</span>
              <span style={{ fontSize: "0.7rem", color: "#c5a059", fontWeight: "700" }}>True to Size</span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["39", "40", "41", "42", "43", "44", "45"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    width: "36px",
                    height: "34px",
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
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
            {/* Quantity */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.14)",
                borderRadius: "14px",
                padding: "4px 8px"
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

            {/* BUY NOW */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: "1 1 150px",
                padding: "11px 18px",
                borderRadius: "14px",
                background: addedToast ? "#10b981" : "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                color: "#ffffff",
                border: "none",
                fontSize: "0.82rem",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
                transition: "all 0.2s ease"
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
    </div>
  );
}
