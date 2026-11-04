"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";

// 5 REAL LUXURY SHALWAR KAMEEZ FABRIC COLOR OPTIONS
const SUIT_FABRICS = [
  {
    id: "boski",
    name: "Royal Boski / Cream",
    hex: "#F4E6C3",
    border: "#D4AF37",
    desc: "Authentic Silk Boski Drape",
    price: 3500
  },
  {
    id: "white",
    name: "Pure Egyptian White",
    hex: "#FFFFFF",
    border: "#CBD5E1",
    desc: "Crisp 100% Cotton Latha",
    price: 3500
  },
  {
    id: "black",
    name: "Jet Midnight Black",
    hex: "#141416",
    border: "#52525B",
    desc: "Formal Suiting Fabric",
    price: 3500
  },
  {
    id: "navy",
    name: "Deep Navy Blue",
    hex: "#1B263B",
    border: "#3B82F6",
    desc: "Royal Marine Wool Blend",
    price: 3500
  },
  {
    id: "charcoal",
    name: "Charcoal Grey",
    hex: "#373A40",
    border: "#94A3B8",
    desc: "Executive Slate Texture",
    price: 3500
  }
];

export default function KhanLookStudioModal({ isOpen, onClose }) {
  const { products, addToCart, isVaultUnlocked } = useStore();

  if (!isOpen) return null;

  const allProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Real store inventory filters
  const realWaistcoats = allProducts.filter((p) => p.category === "Coats");
  const realFootwear = allProducts.filter(
    (p) => p.category === "Footwear" || p.category === "Peshawari Chappals"
  );

  const [selectedFabric, setSelectedFabric] = useState(SUIT_FABRICS[0]); // Boski default
  const [selectedWaistcoat, setSelectedWaistcoat] = useState(realWaistcoats[0] || INITIAL_PRODUCTS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(realFootwear[0] || INITIAL_PRODUCTS[1]);
  const [waistcoatTab, setWaistcoatTab] = useState("all");
  const [footwearTab, setFootwearTab] = useState("all");
  const [addedAll, setAddedAll] = useState(false);

  // Filtered lists
  const filteredWaistcoats = realWaistcoats.filter((w) => {
    if (waistcoatTab === "coats") return w.price === 4000 && w.title.toLowerCase().includes("prince");
    if (waistcoatTab === "waistcoats") return w.title.toLowerCase().includes("waistcoat");
    return true;
  });

  const filteredFootwear = realFootwear.filter((f) => {
    if (footwearTab === "chappals") return f.category === "Peshawari Chappals";
    if (footwearTab === "shoes") return f.category === "Footwear" && (f.title.includes("Boots") || f.title.includes("Shoes"));
    if (footwearTab === "loafers") return f.category === "Footwear" && f.title.includes("Loafer");
    return true;
  });

  const totalLookPrice = (selectedFabric?.price || 3500) + (selectedWaistcoat?.price || 0) + (selectedFootwear?.price || 0);

  const handleAddLookToBag = () => {
    if (selectedWaistcoat) addToCart(selectedWaistcoat, `Suit Match: ${selectedFabric.name}`, 0, 1);
    if (selectedFootwear) addToCart(selectedFootwear, `Suit Match: ${selectedFabric.name}`, 0, 1);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI styled my 3-Piece Complete Khan Look:\n• Base Suit Fabric: ${selectedFabric.name} (${selectedFabric.desc}) - Rs. ${selectedFabric.price.toLocaleString()}\n• Waistcoat/Coat: ${selectedWaistcoat?.title} (Rs. ${(selectedWaistcoat?.price || 0).toLocaleString()})\n• Footwear: ${selectedFootwear?.title} (Rs. ${(selectedFootwear?.price || 0).toLocaleString()})\n• Total Look Price: Rs. ${totalLookPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\nPlease confirm my order!`
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "880px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
          borderRadius: "24px",
          border: "2px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.2)",
          padding: "20px 16px 28px",
          color: "#ffffff",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close Look Studio"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 60,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.12)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
        >
          ✖
        </button>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "18px", paddingRight: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(212, 175, 55, 0.15)",
              padding: "4px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              marginBottom: "6px"
            }}
          >
            <span style={{ color: "#d4af37", fontSize: "0.85rem" }}>👔</span>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", letterSpacing: "1.2px", color: "#fef08a", textTransform: "uppercase" }}>
              Khan Look Studio • 3-Piece Lookbook
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: "800",
              margin: "2px 0 4px",
              background: "linear-gradient(135deg, #ffffff 0%, #fef08a 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Style Your Complete 3-Piece Khan Outfit
          </h2>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#a1a1aa" }}>
            Select your Base Shalwar Kameez fabric, pair with a Waistcoat/Prince Coat &amp; matching footwear.
          </p>
        </div>

        {/* 3-PIECE SHOWCASE TRIO (REAL PRODUCTS ONLY - NO FAKE AVATARS) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "20px"
          }}
        >
          {/* PIECE 1: FABRIC SWATCH */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              border: "1.5px solid rgba(212, 175, 55, 0.35)",
              padding: "12px",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase", marginBottom: "8px" }}>
              1. Base Shalwar Kameez
            </div>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "16px",
                background: selectedFabric.hex,
                border: `3px solid ${selectedFabric.border}`,
                margin: "0 auto 8px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
              }}
            />
            <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#ffffff" }}>
              {selectedFabric.name}
            </div>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", marginTop: "2px" }}>
              {selectedFabric.desc}
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: "800", color: "#d4af37", marginTop: "4px" }}>
              Rs. {selectedFabric.price.toLocaleString()}
            </div>
          </div>

          {/* PIECE 2: REAL WAISTCOAT / PRINCE COAT */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              border: "1.5px solid rgba(212, 175, 55, 0.35)",
              padding: "12px",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase", marginBottom: "8px" }}>
              2. Torso Overwear
            </div>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "16px",
                background: "#ffffff",
                margin: "0 auto 8px",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
              }}
            >
              <img
                src={selectedWaistcoat?.image}
                alt={selectedWaistcoat?.title}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
              />
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {selectedWaistcoat?.title}
            </div>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", marginTop: "2px" }}>
              Royal Tailored Cut
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: "800", color: "#d4af37", marginTop: "4px" }}>
              Rs. {(selectedWaistcoat?.price || 0).toLocaleString()}
            </div>
          </div>

          {/* PIECE 3: REAL FOOTWEAR */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              border: "1.5px solid rgba(212, 175, 55, 0.35)",
              padding: "12px",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase", marginBottom: "8px" }}>
              3. Handcrafted Footwear
            </div>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "16px",
                background: "#ffffff",
                margin: "0 auto 8px",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
              }}
            >
              <img
                src={selectedFootwear?.image}
                alt={selectedFootwear?.title}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
              />
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {selectedFootwear?.title}
            </div>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", marginTop: "2px" }}>
              Pure Leather Soles
            </div>
            <div style={{ fontSize: "0.78rem", fontWeight: "800", color: "#d4af37", marginTop: "4px" }}>
              Rs. {(selectedFootwear?.price || 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* TOTAL LOOK SUMMARY BAR */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(24, 24, 27, 0.95) 100%)",
            borderRadius: "16px",
            border: "1.5px solid rgba(212, 175, 55, 0.5)",
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "16px"
          }}
        >
          <div>
            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px" }}>
              Complete 3-Piece Outfit:
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#fef08a" }}>
              {selectedFabric.name} + {selectedWaistcoat?.title?.split(" ")[0]} {selectedWaistcoat?.title?.split(" ")[1]} + {selectedFootwear?.title?.split(" ")[0]} {selectedFootwear?.title?.split(" ")[1]}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.68rem", color: "#fef08a", fontWeight: "800", textTransform: "uppercase" }}>
              Total Look Price (COD):
            </div>
            <div style={{ fontSize: "1.45rem", fontWeight: "900", color: "#d4af37", textShadow: "0 0 14px rgba(212, 175, 55, 0.45)" }}>
              Rs. {totalLookPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* VAULT BONUS */}
        {isVaultUnlocked && (
          <div
            style={{
              marginBottom: "16px",
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
            <span>SHAHI TIJORI PERK: +1 FREE 30ml Luxury Perfume will be dispatched with this 3-piece look!</span>
          </div>
        )}

        {/* CTA ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          <button
            onClick={handleAddLookToBag}
            style={{
              flex: "1 1 180px",
              background: addedAll
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)",
              color: addedAll ? "#ffffff" : "#18181b",
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
            {addedAll ? "✓ Complete Look Added to Bag!" : "🛒 Add Complete Look to Bag"}
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
            <span>💬 Order Complete Look on WhatsApp</span>
          </a>
        </div>

        {/* SELECTION ACCORDIONS / DRAWERS */}
        {/* 1. SELECT BASE FABRIC COLOR */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "12px" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", marginBottom: "8px", textTransform: "uppercase" }}>
            Step 1: Choose Shalwar Kameez Fabric:
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {SUIT_FABRICS.map((fabric) => {
              const isSel = fabric.id === selectedFabric.id;
              return (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background: isSel ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.06)",
                    color: isSel ? "#fef08a" : "#ffffff",
                    border: isSel ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    fontSize: "0.74rem",
                    fontWeight: "750"
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: fabric.hex,
                      border: `1.5px solid ${fabric.border}`
                    }}
                  />
                  <span>{fabric.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SELECT WAISTCOAT / PRINCE COAT */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase" }}>
              Step 2: Choose Waistcoat / Prince Coat:
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { key: "all", label: "All" },
                { key: "waistcoats", label: "Waistcoats" },
                { key: "coats", label: "Prince Coats" }
              ].map((tb) => (
                <button
                  key={tb.key}
                  onClick={() => setWaistcoatTab(tb.key)}
                  style={{
                    padding: "2px 7px",
                    borderRadius: "6px",
                    fontSize: "0.62rem",
                    fontWeight: "700",
                    background: waistcoatTab === tb.key ? "#d4af37" : "rgba(255,255,255,0.08)",
                    color: waistcoatTab === tb.key ? "#000000" : "#d4d4d8",
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
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "6px",
              scrollbarWidth: "none"
            }}
          >
            {filteredWaistcoats.map((item) => {
              const isSel = item.id === selectedWaistcoat?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedWaistcoat(item)}
                  style={{
                    flex: "0 0 90px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "12px",
                    border: isSel ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSel ? "rgba(212, 175, 55, 0.22)" : "rgba(255,255,255,0.04)",
                    padding: "5px 4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: "750", color: "#ffffff", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "0.64rem", fontWeight: "800", color: isSel ? "#fef08a" : "#d4af37" }}>
                    Rs. {item.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SELECT FOOTWEAR */}
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: "800", color: "#fef08a", textTransform: "uppercase" }}>
              Step 3: Choose Footwear:
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
                  onClick={() => setFootwearTab(tb.key)}
                  style={{
                    padding: "2px 7px",
                    borderRadius: "6px",
                    fontSize: "0.62rem",
                    fontWeight: "700",
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
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "6px",
              scrollbarWidth: "none"
            }}
          >
            {filteredFootwear.map((shoe) => {
              const isSel = shoe.id === selectedFootwear?.id;
              return (
                <div
                  key={shoe.id}
                  onClick={() => setSelectedFootwear(shoe)}
                  style={{
                    flex: "0 0 90px",
                    cursor: "pointer",
                    textAlign: "center",
                    borderRadius: "12px",
                    border: isSel ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                    background: isSel ? "rgba(212, 175, 55, 0.22)" : "rgba(255,255,255,0.04)",
                    padding: "5px 4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "8px", background: "#ffffff" }}>
                    <img src={shoe.image} alt={shoe.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: "750", color: "#ffffff", marginTop: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {shoe.title}
                  </div>
                  <div style={{ fontSize: "0.64rem", fontWeight: "800", color: isSel ? "#fef08a" : "#d4af37" }}>
                    Rs. {shoe.price.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
