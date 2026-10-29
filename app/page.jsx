"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { INITIAL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import WelcomeSplash from "@/components/WelcomeSplash";

export default function HomePage() {
  const { products, storeConfig } = useStore();
  const [founderModal, setFounderModal] = useState(null);

  // Top Featured Products - prioritize newest luxury arrivals with zero crash guarantee
  const safeProducts = Array.isArray(products) && products.length > 0 ? products : INITIAL_PRODUCTS;
  const featuredProducts = safeProducts
    .filter((p) => p && p.featured !== false)
    .sort((a, b) => {
      if (a?.id === 201) return -1;
      if (b?.id === 201) return 1;
      if (a?.id === 104) return -1;
      if (b?.id === 104) return 1;
      return 0;
    })
    .slice(0, 12);

  const categories = [
    { title: "Watches", count: "Luxury Editions", image: "/assets/watches/Bugati_8000.jpg", href: "/categories?category=watches", bg: "white" },
    { title: "Perfumes", count: "French & Oriental", image: "/assets/perfumes/Murooj_4000.jpg", href: "/categories?category=perfumes", bg: "pink" },
    { title: "Bags", count: "Handcrafted Luxury", image: "/assets/bags/Pearl_Handbag_5500.jpg", href: "/categories?category=bags", bg: "lavender" },
    { title: "Swati Shawls", count: "Pure Woolen", image: "/assets/shawl.jpg", href: "/categories?category=shawls", bg: "white" },
    { title: "Coats", count: "Prince Coats & Vests", image: "/assets/wascot.png", href: "/categories?category=coats", bg: "lavender" },
    { title: "Shoes", count: "Leather & Chappal", image: "/assets/shoes.png", href: "/categories?category=shoes", bg: "pink" },
    { title: "Gift Sets", count: "Royal Combos", image: "/assets/gift_set_combo.jpg", href: "/categories?category=gifts", bg: "white" },
    { title: "Special Deals", count: "Limited Time", image: "/assets/special_deals_combo.jpg", href: "/categories?category=sale", bg: "pink" }
  ];

  return (
    <>
      {/* 3-4 SECOND ELEGANT WELCOME SPLASH */}
      <WelcomeSplash />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag clay-card pink">
            <span>✦ Zargul Luxury Heritage</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Curated Elegance &amp; <br /><span style={{ color: "var(--color-accent)" }}>Luxury Collections</span>
          </h1>
          <p className="hero-desc">
            Executive watches, Swati woolen shawls, French Eau de Parfums, and luxury accessories. Delivered free with Cash on Delivery across Pakistan.
          </p>

          <div className="hero-actions">
            <Link href="/categories?category=watches" className="clay-btn accent">
              Explore Watches
            </Link>
            <Link href="/categories?category=shawls" className="clay-btn secondary">
              Swati Shawls
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-video-card">
            <img
              src="/assets/perfumes/Murooj_4000.jpg"
              alt="Murooj Signature Edition"
              className="hero-video-player"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="eager"
            />
            <div className="hero-video-badge">
              <span>✦</span>
              <span>Murooj Signature Edition</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT CATEGORIES GRID (2-3 COLS MOBILE, 4 COLS DESKTOP) */}
      <section style={{ padding: "10px 5% 36px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <span className="hero-tag" style={{ fontSize: "0.72rem", padding: "4px 12px" }}>✦ Curated Departments</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: "700", margin: "4px 0 0", color: "var(--color-text-dark)" }}>
              Explore Collections
            </h3>
          </div>
          <Link href="/categories" style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-accent-dark)", textDecoration: "none" }}>
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
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
                    padding: "4px",
                    transition: "transform 0.25s ease"
                  }}
                  className="cat-thumb-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  color: "var(--color-text-dark)",
                  margin: "0 0 2px",
                  lineHeight: "1.25"
                }}
              >
                {cat.title}
              </h4>
              <span
                style={{
                  fontSize: "0.72rem",
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
      </section>

      {/* FEATURED CREATIONS GRID */}
      <section className="products-section">
        <div className="section-header-row">
          <div>
            <span className="hero-tag">✦ Master Selection</span>
            <h2 className="section-title">Iconic Creations</h2>
            <p className="section-subtitle">
              Every creation is verified for pristine weight, tactile precision, and authentic presentation.
            </p>
          </div>

          <Link href="/categories" className="clay-btn secondary" style={{ fontSize: "0.82rem", padding: "10px 20px" }}>
            View All ({products.length}) →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ROYAL COMBO BUILDER BANNER */}
      {storeConfig.comboDeal?.enabled !== false && (
        <section style={{ padding: "20px 5% 50px", maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="clay-card pink"
            style={{
              padding: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px", maxWidth: "700px" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.2rem",
                  flexShrink: 0,
                  boxShadow: "4px 6px 14px rgba(240, 142, 167, 0.3)"
                }}
              >
                👑
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)" }}>
                  Signature Gift Deal
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: "700", margin: "4px 0" }}>
                  {storeConfig.comboDeal?.title || "Royal Gift Combo Offer"}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)" }}>
                  {storeConfig.comboDeal?.desc ||
                    "Buy Any Luxury Watch + Any Fragrance Together & get Instant Rs. 1,000 OFF + Free Gift Box!"}
                </p>
              </div>
            </div>

            <Link href="/categories" className="clay-btn accent">
              Build Your Combo →
            </Link>
          </div>
        </section>
      )}

      {/* STRICTLY 1-LINE AUTO-SCROLLING REVIEWS MARQUEE */}
      <ReviewsMarquee />

      {/* CO-FOUNDERS & LEADERSHIP */}
      <section style={{ maxWidth: "860px", margin: "40px auto 20px", padding: "0 5%", textAlign: "center" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="hero-tag">✦ Leadership &amp; Vision</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: "700", margin: "10px 0 8px" }}>
            Meet the Co-Founders
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", maxWidth: "680px", margin: "0 auto", lineHeight: "1.6" }}>
            Curating exclusive luxury watches, premium French perfumes, Swati woolen shawls, and handcrafted accessories with a commitment to unmatched quality.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {/* Zalan Khan */}
          <div className="clay-card white" style={{ padding: "28px 20px", textAlign: "center", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setFounderModal({ src: "/assets/founders/zalan_khan.jpg", name: "Zalan Khan — Co-Founder & Owner" })}
              title="Click to view full photo"
              style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "14px", boxShadow: "0 8px 20px rgba(0,0,0,0.12)", border: "3px solid #fff", cursor: "pointer", transition: "transform 0.2s ease" }}
            >
              <img
                src="/assets/founders/zalan_khan.jpg"
                alt="Zalan Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", margin: "0 0 4px" }}>
              Zalan Khan
            </h3>
            <span style={{ fontSize: "0.85rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
              Zargul Collection
            </span>
          </div>

          {/* Zohaib Khan */}
          <div className="clay-card white" style={{ padding: "28px 20px", textAlign: "center", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setFounderModal({ src: "/assets/founders/zohaib_khan.jpg", name: "Zohaib Khan — Co-Founder & Owner" })}
              title="Click to view full photo"
              style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "14px", boxShadow: "0 8px 20px rgba(0,0,0,0.12)", border: "3px solid #fff", cursor: "pointer", transition: "transform 0.2s ease" }}
            >
              <img
                src="/assets/founders/zohaib_khan.jpg"
                alt="Zohaib Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", margin: "0 0 4px" }}>
              Zohaib Khan
            </h3>
            <span style={{ fontSize: "0.85rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
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

      {/* CRAFTSMANSHIP & BENEFITS */}
      <section style={{ padding: "60px 5%", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          <div className="clay-card white" style={{ padding: "32px", textAlign: "center" }}>
            <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "14px" }}>🇵🇰</span>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
              Cash on Delivery (COD)
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Inspect your parcel at your doorstep anywhere in Pakistan before making payment.
            </p>
          </div>

          <div className="clay-card white" style={{ padding: "32px", textAlign: "center" }}>
            <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "14px" }}>🛡️</span>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
              7 Days Return & Exchange
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Complete peace of mind with our no-questions-asked doorstep return or exchange policy.
            </p>
          </div>

          <div className="clay-card white" style={{ padding: "32px", textAlign: "center" }}>
            <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "14px" }}>🎁</span>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }}>
              Royal Velvet Gift Box
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Every timepiece and perfume arrives in our signature velvet-lined tactile clay presentation box.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
