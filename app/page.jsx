"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import ReviewsMarquee from "@/components/ReviewsMarquee";

export default function HomePage() {
  const { products, storeConfig } = useStore();

  // Top Featured Products - prioritize newest luxury arrivals
  const featuredProducts = products
    .filter((p) => p.featured !== false)
    .sort((a, b) => {
      if (a.id === 201) return -1;
      if (b.id === 201) return 1;
      if (a.id === 104) return -1;
      if (b.id === 104) return 1;
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

      {/* QUICK CATEGORY SHELVES */}
      <section style={{ padding: "20px 5% 40px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`clay-card ${cat.bg} category-shelf-card`}
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.05)"
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
                    transition: "transform 0.3s ease"
                  }}
                  className="cat-thumb-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "1.02rem",
                    color: "var(--color-text-dark)",
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {cat.title}
                </h4>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", display: "block" }}>
                  {cat.count}
                </span>
              </div>
              <span style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: "700" }}>→</span>
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
