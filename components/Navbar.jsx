"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCartCount, setIsCartOpen, products } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Items", href: "/categories" },
    { label: "Watches", href: "/categories?category=watches" },
    { label: "Perfumes", href: "/categories?category=perfumes" },
    { label: "Bags", href: "/categories?category=bags" },
    { label: "Swati Shawls", href: "/categories?category=shawls" },
    { label: "Coats", href: "/categories?category=coats" },
    { label: "Shoes", href: "/categories?category=shoes" },
    { label: "Gift Box Builder 🎁", href: "/gift-builder" },
    { label: "Contact", href: "/contact" }
  ];

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Live search results (top 5)
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header className="site-header">
        <div className="navbar-container">

          {/* Brand Logo & Title */}
          <Link href="/" className="brand-link">
            <div className="brand-logo-circle">
              <img src="/assets/logo.jpg" alt="Zargul Collection Logo" className="brand-logo" />
            </div>
            <div className="brand-title-group">
              <h1>ZARGUL</h1>
              <span>Collection</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links-desktop">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href.split("?")[0]));
                return (
                  <li key={link.label} className={`nav-link-item ${isActive ? "active" : ""}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions: Search + Shopping Bag + Mobile Menu */}
          <div className="nav-actions">

            {/* Search Button */}
            <button
              className="clay-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Products"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Shopping Bag Button */}
            <button
              className="clay-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalCartCount > 0 && (
                <span className="cart-count-badge">{totalCartCount}</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="clay-icon-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(42,36,40,0.4)", backdropFilter: "blur(8px)",
              zIndex: 1400
            }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "1.1rem" }}>MENU</span>
            <button className="clay-icon-btn" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "600",
                fontSize: "1.05rem",
                padding: "12px 0",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                display: "block",
                color: pathname === link.href ? "var(--color-accent)" : "var(--color-text-dark)"
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Drawer Social Links */}
          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)", display: "block", marginBottom: "12px" }}>
              ✦ Official Social Media
            </span>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <a
                href="https://www.tiktok.com/@zargul_collection?_r=1&_t=ZS-9AxiBTpa08K"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="TikTok"
                aria-label="TikTok"
                style={{ width: "38px", height: "38px", color: "#000000", background: "#ffffff" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.52z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/zargul_collection?xtok=MXhjY2FkajdqaXcw"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Instagram"
                aria-label="Instagram"
                style={{ width: "38px", height: "38px", color: "#E1306C", background: "#ffffff" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://www.snapchat.com/add/zargulcolection?share_id=-gJbaMcSTcU&locale=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Snapchat"
                aria-label="Snapchat"
                style={{ width: "38px", height: "38px", color: "#000000", background: "#FFFC00" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 2c-3.57 0-6.19 2.45-6.19 5.86 0 .84.22 1.94.49 2.76.12.37.1.53-.1.68-.45.33-1.39.81-1.78 1.34-.34.46-.22.95.34 1.14.77.26 1.77.29 2.38.16.29-.06.45.08.53.31.25.75.95 2.14 2.06 2.65.48.22.86.08 1.25-.13.37-.2.78-.42 1.02-.42.23 0 .64.22 1.02.42.39.21.77.35 1.25.13 1.11-.51 1.81-1.9 2.06-2.65.08-.23.24-.37.53-.31.61.13 1.61.1 2.38-.16.56-.19.68-.68.34-1.14-.39-.53-1.33-1.01-1.78-1.34-.2-.15-.22-.31-.1-.68.27-.82.49-1.92.49-2.76C18.19 4.45 15.57 2 12.001 2z"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/1AD55fVfT7/"
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Facebook"
                aria-label="Facebook"
                style={{ width: "38px", height: "38px", color: "#1877F2", background: "#ffffff" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Instant Search Modal */}
      {searchOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(42,36,40,0.5)", backdropFilter: "blur(12px)",
              zIndex: 2500
            }}
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          />

          {/* Search Panel */}
          <div
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(620px, calc(100vw - 32px))",
              zIndex: 2501,
              background: "#ffffff",
              borderRadius: "28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              padding: "24px",
              border: "3px solid rgba(255,255,255,0.95)"
            }}
          >
            {/* Search Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700" }}>
                Instant Catalog Search
              </span>
              <button
                className="clay-icon-btn"
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                style={{ width: "34px", height: "34px", fontSize: "0.85rem" }}
              >
                ✕
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit}>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "var(--bg-app)", borderRadius: "16px",
                padding: "12px 16px", border: "2px solid rgba(240,142,167,0.3)"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type: Rolex, Hawajes, Bugatti, Cartier..."
                  style={{
                    border: "none", outline: "none", background: "transparent",
                    fontFamily: "var(--font-body)", fontSize: "0.98rem",
                    width: "100%", color: "var(--color-text-dark)"
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "1rem", padding: "0 2px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Quick Category Links */}
            {!searchQuery && (
              <div style={{ marginTop: "16px" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", marginBottom: "10px" }}>
                  Quick Browse
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["All Items", "Watches", "Perfumes", "Bags", "Shawls", "Coats", "Shoes", "Gifts", "20% OFF Sale"].map((cat) => (
                    <Link
                      key={cat}
                      href={cat === "All Items" ? "/categories" : cat === "20% OFF Sale" ? "/categories?category=sale" : `/categories?category=${cat.toLowerCase()}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      style={{
                        padding: "6px 14px", borderRadius: "14px",
                        background: "var(--pastel-pink)", color: "var(--color-accent-dark)",
                        fontSize: "0.8rem", fontWeight: "600"
                      }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {searchQuery.trim().length > 1 && (
              <div style={{ marginTop: "16px" }}>
                {searchResults.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.9rem", padding: "20px 0" }}>
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "10px 12px", borderRadius: "16px",
                          background: "var(--bg-app)", transition: "background 0.2s ease"
                        }}
                        className="search-result-row"
                      >
                        <img
                          src={p.image} alt={p.title}
                          style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "10px", background: "#fff", padding: "4px" }}
                          onError={(e) => { e.currentTarget.src = "/assets/logo.jpg"; }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "0.88rem", color: "var(--color-text-dark)", margin: "0 0 2px" }}>
                            {p.title}
                          </p>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{p.category}</span>
                        </div>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "0.9rem", color: "var(--color-text-dark)", whiteSpace: "nowrap" }}>
                          Rs. {p.price.toLocaleString()}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={`/categories?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="clay-btn accent"
                      style={{ textAlign: "center", marginTop: "8px", fontSize: "0.85rem", padding: "10px" }}
                    >
                      View All Results for &ldquo;{searchQuery}&rdquo; →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
