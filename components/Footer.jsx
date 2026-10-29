"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { setIsAdminOpen, showToast, storeConfig } = useStore();
  const [tapCount, setTapCount] = useState(0);

  // Secret 5-Tap Trigger on Copyright for Mobile Visitors
  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount === 5) {
      setTapCount(0);
      setIsAdminOpen(true);
      showToast("Secret Admin Portal Triggered!", "success");
    } else {
      // Reset if not tapped quickly within 2 seconds
      setTimeout(() => {
        setTapCount(0);
      }, 2000);
    }
  };

  return (
    <footer style={{ background: "#ffffff", borderTop: "2px solid rgba(255,255,255,0.9)", marginTop: "auto", padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", marginBottom: "40px" }}>
        
        {/* Col 1: Brand Info & Social Media */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: "42px", height: "42px", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "700" }}>ZARGUL COLLECTION</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: "1.6", marginBottom: "18px" }}>
            Pakistan&apos;s premier destination for executive timepieces, authentic French &amp; Oriental Eau de Parfums, and luxury tactile accessories. Designed with our signature 3D Soft Clay aesthetic.
          </p>

          {/* Official Social Media Links */}
          <div>
            <span style={{ fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)", display: "block", marginBottom: "10px" }}>
              ✦ Follow Us
            </span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              {/* TikTok */}
              <a
                href={storeConfig?.contact?.tiktok || "https://www.tiktok.com/@zargul_collection?_r=1&_t=ZS-9AxiBTpa08K"}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Follow Zargul Collection on TikTok"
                aria-label="TikTok"
                style={{ width: "40px", height: "40px", color: "#000000", background: "#ffffff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.52z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={storeConfig?.contact?.instagram || "https://www.instagram.com/zargul_collection?xtok=MXhjY2FkajdqaXcw"}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Follow Zargul Collection on Instagram"
                aria-label="Instagram"
                style={{ width: "40px", height: "40px", color: "#E1306C", background: "#ffffff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Snapchat */}
              <a
                href={storeConfig?.contact?.snapchat || "https://www.snapchat.com/add/zargulcolection?share_id=-gJbaMcSTcU&locale=en-GB"}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Add Zargul Collection on Snapchat"
                aria-label="Snapchat"
                style={{ width: "40px", height: "40px", color: "#000000", background: "#FFFC00" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 2c-3.57 0-6.19 2.45-6.19 5.86 0 .84.22 1.94.49 2.76.12.37.1.53-.1.68-.45.33-1.39.81-1.78 1.34-.34.46-.22.95.34 1.14.77.26 1.77.29 2.38.16.29-.06.45.08.53.31.25.75.95 2.14 2.06 2.65.48.22.86.08 1.25-.13.37-.2.78-.42 1.02-.42.23 0 .64.22 1.02.42.39.21.77.35 1.25.13 1.11-.51 1.81-1.9 2.06-2.65.08-.23.24-.37.53-.31.61.13 1.61.1 2.38-.16.56-.19.68-.68.34-1.14-.39-.53-1.33-1.01-1.78-1.34-.2-.15-.22-.31-.1-.68.27-.82.49-1.92.49-2.76C18.19 4.45 15.57 2 12.001 2z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={storeConfig?.contact?.facebook || "https://www.facebook.com/share/1AD55fVfT7/"}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn"
                title="Follow Zargul Collection on Facebook"
                aria-label="Facebook"
                style={{ width: "40px", height: "40px", color: "#1877F2", background: "#ffffff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "18px" }}>Explore Categories</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
            <li><Link href="/categories?category=watches" style={{ transition: "color 0.2s" }}>Luxury Watches</Link></li>
            <li><Link href="/categories?category=perfumes" style={{ transition: "color 0.2s" }}>Eau de Parfums</Link></li>
            <li><Link href="/categories?category=bags" style={{ transition: "color 0.2s" }}>Handbags &amp; Clutches</Link></li>
            <li><Link href="/categories?category=shawls" style={{ transition: "color 0.2s" }}>Swati Woolen Shawls</Link></li>
            <li><Link href="/categories?category=coats" style={{ transition: "color 0.2s" }}>Prince Coats &amp; Wascots</Link></li>
            <li><Link href="/categories?category=shoes" style={{ transition: "color 0.2s" }}>Footwear &amp; Chappal</Link></li>
            <li><Link href="/categories?category=gifts" style={{ transition: "color 0.2s" }}>Royal Gift Sets</Link></li>
            <li><Link href="/categories?category=sale" style={{ transition: "color 0.2s", color: "var(--color-accent-dark)", fontWeight: "600" }}>⚡ Flat 20% OFF Sale</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact & Direct WhatsApp */}
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "18px" }}>Direct Concierge</h4>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "8px" }}>
            📍 Main Barikot Bazar, Swat, KPK, Pakistan
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: "16px" }}>
            💬 WhatsApp: +92 348 5245955
          </p>
          <a
            href={`https://wa.me/${(storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "")}?text=Hello%20Zargul%20Collection,%20I%20have%20an%20inquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn accent"
            style={{ padding: "10px 20px", fontSize: "0.8rem" }}
          >
            Chat on WhatsApp ✦
          </a>
        </div>

      </div>

      {/* Map Section */}
      <div style={{ maxWidth: "1300px", margin: "0 auto 40px", textAlign: "center" }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: "700", marginBottom: "16px" }}>Boutique Location</h4>
        <div className="clay-card white" style={{ padding: "12px", overflow: "hidden" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.7186638062837!2d72.21782297626922!3d34.611299972951714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc1dd3c5436281%3A0x8b6099ebb20a54e1!2sZargul%20Collection!5e0!3m2!1sen!2spk!4v1718620000000!5m2!1sen!2spk"
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: "18px" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer Bottom Bar with Direct Admin Link */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <p onClick={handleSecretTap} style={{ cursor: "pointer", userSelect: "none", margin: 0 }} title="Zargul Collection 2026">
            &copy; 2026 Zargul Collection. All rights reserved.
          </p>
          <Link
            href="/admin"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontSize: "0.78rem",
              background: "#f3f2ef",
              padding: "4px 10px",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <span>🔒</span> Admin Portal
          </Link>
        </div>

        <a 
          href="https://aisiteflow.agency/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: "5px 12px",
            borderRadius: "10px",
            background: "var(--pastel-pink)",
            color: "var(--color-text-dark)",
            fontWeight: "600",
            fontSize: "0.76rem"
          }}
        >
          Crafted by AISiteFlow ✦
        </a>
      </div>
    </footer>
  );
}
