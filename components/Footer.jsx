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
        
        {/* Col 1: Brand Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: "42px", height: "42px", borderRadius: "50%" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "700" }}>ZARGUL COLLECTION</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
            Pakistan&apos;s premier destination for executive timepieces, authentic French &amp; Oriental Eau de Parfums, and luxury tactile accessories. Designed with our signature 3D Soft Clay aesthetic.
          </p>
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
