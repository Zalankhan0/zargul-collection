"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import ShahiKhanCombo from "@/components/ShahiKhanCombo";
import KhanLookStudio from "@/components/KhanLookStudio";

export default function HomePage() {
  const { products, storeConfig } = useStore();
  const [founderModal, setFounderModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // All Available Products - complete inventory across all categories
  const safeProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Curated showcase: Front-loads star items from EVERY department so visitors immediately see full catalog
  const heroFrontIds = [103, 11, 401, 701, 301, 601, 501, 1, 101, 402, 201, 602, 302, 702, 502, 12];
  const heroSet = new Set(heroFrontIds);

  const heroItems = [];
  for (const hId of heroFrontIds) {
    const item = safeProducts.find((p) => p.id === hId);
    if (item) heroItems.push(item);
  }
  const remainingItems = safeProducts.filter((p) => !heroSet.has(p.id));
  const allCuratedProducts = [...heroItems, ...remainingItems];

  const filterTabs = [
    { key: "all", label: "All Items", icon: "✦", count: safeProducts.length },
    { key: "watches", label: "Watches", icon: "⌚", count: safeProducts.filter((p) => p.category === "Watches").length },
    { key: "chappals", label: "Peshawari Chappals", icon: "👡", count: safeProducts.filter((p) => p.category === "Peshawari Chappals").length },
    { key: "footwear", label: "Footwear & Loafers", icon: "👞", count: safeProducts.filter((p) => p.category === "Footwear").length },
    { key: "coats", label: "Prince Coats & Waistcoats", icon: "🧥", count: safeProducts.filter((p) => p.category === "Coats").length },
    { key: "shawls", label: "Swati Shawls", icon: "🧣", count: safeProducts.filter((p) => p.category === "Shawls").length },
    { key: "perfumes", label: "Perfumes", icon: "🌸", count: safeProducts.filter((p) => p.category === "Perfumes" || p.category === "Fragrances").length },
    { key: "bags", label: "Bags", icon: "👜", count: safeProducts.filter((p) => p.category === "Bags").length }
  ];

  const displayedProducts = activeCategory === "all"
    ? allCuratedProducts
    : safeProducts.filter((p) => {
        if (activeCategory === "watches") return p.category === "Watches";
        if (activeCategory === "chappals") return p.category === "Peshawari Chappals";
        if (activeCategory === "footwear") return p.category === "Footwear";
        if (activeCategory === "coats") return p.category === "Coats";
        if (activeCategory === "shawls") return p.category === "Shawls";
        if (activeCategory === "perfumes") return p.category === "Perfumes" || p.category === "Fragrances";
        if (activeCategory === "bags") return p.category === "Bags";
        return true;
      });

  const categories = [
    { title: "Footwear & Loafers", count: "9 Luxury Pairs", image: "/assets/loafers/sand_beige_suede_loafer_4999.webp", href: "/categories?category=shoes", bg: "pink" },
    { title: "Peshawari Chappals", count: "10 Royal Designs", image: "/assets/chappal/royal_maroon_glossy_chappal_4500.webp", href: "/categories?category=chappals", bg: "white" },
    { title: "Prince Coats", count: "7 Royal Editions", image: "/assets/coats/midnight_black_prince_coat_4000.webp", href: "/categories?category=coats", bg: "lavender" },
    { title: "Swati Shawls", count: "5 Luxury Colors", image: "/assets/shawls/slate_grey_shawl_3000.webp", href: "/categories?category=shawls", bg: "white" },
    { title: "Watches", count: "Luxury Editions", image: "/assets/watches/Bugati_8000.webp", href: "/categories?category=watches", bg: "white" },
    { title: "Perfumes", count: "French & Oriental", image: "/assets/perfumes/Murooj_4000.webp", href: "/categories?category=perfumes", bg: "pink" },
    { title: "Bags", count: "Handcrafted Luxury", image: "/assets/bags/Pearl_Handbag_5500.webp", href: "/categories?category=bags", bg: "lavender" },
    { title: "Special Deals", count: "Limited Time", image: "/assets/special_deals_combo.webp", href: "/categories?category=sale", bg: "pink" }
  ];

  return (
    <>
      {/* COMPACT CATEGORIES GRID (2-3 COLS MOBILE, 4 COLS DESKTOP) */}
      <section style={{ padding: "14px 4% 18px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <span className="hero-tag" style={{ fontSize: "0.68rem", padding: "3px 10px" }}>✦ Curated Departments</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: "700", margin: "2px 0 0", color: "var(--color-text-dark)" }}>
              Explore Collections
            </h3>
          </div>
          <Link href="/categories" style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--color-accent-dark)", textDecoration: "none" }}>
            See All →
          </Link>
        </div>

        <div className="categories-compact-grid">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`clay-card ${cat.bg} category-box-card`}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.06)"
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "3px",
                    transition: "transform 0.25s ease"
                  }}
                  className="cat-thumb-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "0.82rem",
                  color: "var(--color-text-dark)",
                  margin: "0 0 2px",
                  lineHeight: "1.2"
                }}
              >
                {cat.title}
              </h4>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-text-muted)",
                  display: "block",
                  lineHeight: "1.2"
                }}
              >
                {cat.count}
              </span>
            </Link>
          ))}
        </div>

        {/* COMPACT 1-LINE CUSTOM GIFT BOX BUILDER (2 CATEGORIES WIDTH) */}
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-start" }}>
          <Link
            href="/gift-builder"
            className="clay-card pink"
            style={{
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              textDecoration: "none",
              borderRadius: "14px",
              gap: "8px",
              background: "linear-gradient(135deg, #fff7fa 0%, #faedf3 100%)",
              border: "1.5px solid rgba(240, 142, 167, 0.4)",
              boxShadow: "0 2px 8px rgba(240, 142, 167, 0.1)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>🎁</span>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.82rem", fontWeight: "750", color: "var(--color-text-dark)", display: "inline-block" }}>
                  Custom Gift Box Builder
                </span>
                <span style={{ fontSize: "0.68rem", color: "var(--color-accent-dark)", fontWeight: "600", marginLeft: "6px" }}>
                  ✦ Create Your Combo
                </span>
              </div>
            </div>
            <span
              className="clay-btn accent"
              style={{
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "0.7rem",
                fontWeight: "700",
                whiteSpace: "nowrap"
              }}
            >
              Build Box →
            </span>
          </Link>
        </div>
      </section>

      {/* KHAN LOOK STUDIO (DIGITAL MANNEQUIN HEAD-TO-TOE AVATAR EXPERIENCE) */}
      <section style={{ padding: "0 4% 18px", maxWidth: "1400px", margin: "0 auto" }}>
        <KhanLookStudio />
      </section>

      {/* SHAHI KHAN COMBO MACHINE (3-TIER MIX & MATCH BUILDER) */}
      <section style={{ padding: "0 4% 18px", maxWidth: "1400px", margin: "0 auto" }}>
        <ShahiKhanCombo />
      </section>

      {/* COMPLETE LUXURY SHOWCASE GRID (ALL PRODUCTS) */}
      <section className="products-section" style={{ padding: "6px 4% 24px" }}>
        <div className="section-header-row" style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "6px" }}>
          <div>
            <span className="hero-tag" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>✦ All Collections &amp; Inventory</span>
            <h2 className="section-title" style={{ fontSize: "1.15rem", margin: "2px 0 0" }}>Iconic Creations</h2>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--color-accent-dark)", fontWeight: "700" }}>
            Showing {displayedProducts.length} of {safeProducts.length} Items
          </span>
        </div>

        {/* INTERACTIVE CATEGORY FILTER TABS (TOUCH-FRIENDLY & INSTANT) */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  borderRadius: "18px",
                  fontSize: "0.74rem",
                  fontWeight: isActive ? "800" : "600",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: isActive ? "none" : "1px solid rgba(0,0,0,0.08)",
                  background: isActive
                    ? "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)"
                    : "#ffffff",
                  color: isActive ? "#ffffff" : "var(--color-text-dark)",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(197, 160, 89, 0.35)"
                    : "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease",
                  flexShrink: 0
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: "0.64rem",
                    padding: "1px 5px",
                    borderRadius: "8px",
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.05)",
                    color: isActive ? "#ffffff" : "var(--color-text-muted)",
                    fontWeight: "750"
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {displayedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 6} />
          ))}
        </div>
      </section>

      {/* STRICTLY 1-LINE AUTO-SCROLLING REVIEWS MARQUEE */}
      <ReviewsMarquee />

      {/* CO-FOUNDERS & LEADERSHIP */}
      <section style={{ maxWidth: "860px", margin: "24px auto 16px", padding: "0 4%", textAlign: "center" }}>
        <div style={{ marginBottom: "16px" }}>
          <span className="hero-tag" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>✦ Leadership &amp; Vision</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: "700", margin: "6px 0 4px" }}>
            Meet the Co-Founders
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.4" }}>
            Curating exclusive luxury watches, premium French perfumes, Swati woolen shawls, and handcrafted accessories with a commitment to unmatched quality.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          {/* Zalan Khan */}
          <div className="clay-card white" style={{ padding: "18px 14px", textAlign: "center", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setFounderModal({ src: "/assets/founders/zalan_khan.jpg", name: "Zalan Khan — Co-Founder & Owner" })}
              title="Click to view full photo"
              style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", marginBottom: "10px", boxShadow: "0 6px 16px rgba(0,0,0,0.1)", border: "3px solid #fff", cursor: "pointer", transition: "transform 0.2s ease" }}
            >
              <img
                src="/assets/founders/zalan_khan.jpg"
                alt="Zalan Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: "700", margin: "0 0 2px" }}>
              Zalan Khan
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              Zargul Collection
            </span>
          </div>

          {/* Zohaib Khan */}
          <div className="clay-card white" style={{ padding: "18px 14px", textAlign: "center", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setFounderModal({ src: "/assets/founders/zohaib_khan.jpg", name: "Zohaib Khan — Co-Founder & Owner" })}
              title="Click to view full photo"
              style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", marginBottom: "10px", boxShadow: "0 6px 16px rgba(0,0,0,0.1)", border: "3px solid #fff", cursor: "pointer", transition: "transform 0.2s ease" }}
            >
              <img
                src="/assets/founders/zohaib_khan.jpg"
                alt="Zohaib Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: "700", margin: "0 0 2px" }}>
              Zohaib Khan
            </h3>
            <span style={{ fontSize: "0.78rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              Zargul Collection
            </span>
          </div>
        </div>
      </section>

      {/* FOUNDER FULL PHOTO MODAL */}
      {founderModal && (
        <div
          onClick={() => setFounderModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            cursor: "zoom-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "420px",
              width: "100%",
              textAlign: "center"
            }}
          >
            <img
              src={founderModal.src}
              alt={founderModal.name}
              style={{
                width: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "20px",
                border: "3px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
              }}
            />
            <div style={{ marginTop: "14px", color: "#ffffff" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", margin: "0 0 4px" }}>
                {founderModal.name}
              </p>
              <button
                onClick={() => setFounderModal(null)}
                style={{
                  marginTop: "8px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#ffffff",
                  padding: "6px 20px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-body)"
                }}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRAFTSMANSHIP & BENEFITS - COMPACT 1-LINE HORIZONTAL ROW */}
      <section style={{ padding: "14px 5% 28px", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "10px"
          }}
        >
          <div
            className="clay-card white"
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "14px"
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🇵🇰</span>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: "800", margin: 0, color: "var(--color-text-dark)" }}>
                Cash on Delivery (COD)
              </h4>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: "1px 0 0", lineHeight: 1.25 }}>
                Doorstep parcel inspection across Pakistan.
              </p>
            </div>
          </div>

          <div
            className="clay-card white"
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "14px"
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🛡️</span>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: "800", margin: 0, color: "var(--color-text-dark)" }}>
                7 Days Return &amp; Exchange
              </h4>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: "1px 0 0", lineHeight: 1.25 }}>
                No-questions-asked doorstep exchange.
              </p>
            </div>
          </div>

          <div
            className="clay-card white"
            style={{
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "14px"
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🎁</span>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: "800", margin: 0, color: "var(--color-text-dark)" }}>
                Royal Velvet Gift Box
              </h4>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", margin: "1px 0 0", lineHeight: 1.25 }}>
                Velvet-lined luxury presentation box.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
