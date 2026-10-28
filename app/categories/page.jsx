"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

function CategoriesContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  // Sync category from URL param e.g. /categories?category=fragrances
  // Also sync search from URL param e.g. /categories?search=rolex
  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    if (cat) {
      setActiveCategory(cat.toLowerCase());
    } else {
      setActiveCategory("all");
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "watches", label: "Watches" },
    { id: "perfumes", label: "Perfumes" },
    { id: "bags", label: "Bags" },
    { id: "shawls", label: "Swati Shawls" },
    { id: "coats", label: "Coats" },
    { id: "shoes", label: "Shoes" },
    { id: "gifts", label: "Gift Sets" },
    { id: "sale", label: "🔥 20% OFF Sale" },
  ];

  // Filtering
  let filtered = [...products];

  if (activeCategory !== "all") {
    if (activeCategory === "sale") {
      filtered = filtered.filter(
        (p) =>
          (p.originalPrice && p.originalPrice > p.price) ||
          p.tag?.toLowerCase().includes("off") ||
          p.badgeType === "sale"
      );
    } else if (activeCategory === "watches" || activeCategory === "timepieces") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === "watches" || p.category?.toLowerCase() === "timepieces"
      );
    } else if (activeCategory === "perfumes" || activeCategory === "fragrances") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === "perfumes" || p.category?.toLowerCase() === "fragrances"
      );
    } else if (activeCategory === "bags" || activeCategory === "handbags") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() === "bags" ||
          p.category?.toLowerCase() === "handbags" ||
          p.title?.toLowerCase().includes("handbag") ||
          p.title?.toLowerCase().includes("bag")
      );
    } else if (activeCategory === "coats" || activeCategory === "wascot") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === "coats" || p.category?.toLowerCase() === "wascot"
      );
    } else if (activeCategory === "shawls") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === "shawls" || p.title?.toLowerCase().includes("shawl") || p.title?.toLowerCase().includes("chador")
      );
    } else if (activeCategory === "gifts") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === "gifts" || p.title?.toLowerCase().includes("gift") || p.title?.toLowerCase().includes("combo")
      );
    } else {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }
  }

  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortOption === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating") {
    filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto 80px", padding: "0 5%" }}>

      {/* Page Hero Header */}
      <section style={{ textAlign: "center", padding: "40px 20px 32px" }}>
        <span className="hero-tag">✦ Curated Catalog</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: "700", margin: "12px 0 10px" }}>
          All Creations &amp; Edits
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          Discover our full catalog of high-precision luxury timepieces and new Eau de Parfum releases, styled in soothing clay aesthetics.
        </p>
      </section>

      {/* Catalog Toolbar */}
      <div
        className="clay-card white"
        style={{
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px"
        }}
      >
        {/* Search Box */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 240px", minWidth: "200px", background: "var(--bg-app)", borderRadius: "14px", padding: "8px 14px", border: "2px solid rgba(255,255,255,0.9)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search Rolex, Hawajes, Bugatti, Cartier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              width: "100%",
              color: "var(--color-text-dark)"
            }}
          />
        </div>

        {/* Sort + Count */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--color-accent-dark)", background: "var(--pastel-pink)", padding: "6px 14px", borderRadius: "14px", whiteSpace: "nowrap" }}>
            Showing {filtered.length} Creations
          </span>
          <select
            className="admin-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: "8px 14px", fontSize: "0.85rem" }}
          >
            <option value="featured">Featured Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated (4.9+)</option>
          </select>
        </div>
      </div>

      {/* Royal Combo Banner */}
      <div
        className="clay-card pink"
        style={{
          padding: "20px 28px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0, boxShadow: "4px 6px 14px rgba(240,142,167,0.3)" }}>
            👑
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", margin: "0 0 4px" }}>
              Royal Gift Combo Offer
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>
              Buy <strong>Any Luxury Watch + Any Fragrance Together</strong> &amp; get <strong>Instant Rs. 1,000 OFF</strong> + Free Gift Box!
            </p>
          </div>
        </div>
        <span className="product-badge sale inline-badge" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
          Auto-Applied in Bag ✓
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`clay-btn ${activeCategory === c.id ? "accent" : "secondary"}`}
              style={{
                padding: "9px 20px",
                fontSize: "0.83rem",
                borderRadius: "16px",
                whiteSpace: "nowrap"
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🔍</span>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
            No creations found matching your filter criteria.
          </p>
          <button
            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
            className="clay-btn secondary"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontSize: "1.1rem", color: "var(--color-text-muted)" }}>Loading Collections...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
