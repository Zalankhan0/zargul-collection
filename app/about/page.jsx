"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [lightbox, setLightbox] = useState(null); // { src, name }

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto 80px", padding: "0 5%" }}>

      {/* LIGHTBOX MODAL */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.82)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
            cursor: "zoom-out"
          }}
        >
          <div style={{ textAlign: "center" }} onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.name}
              style={{
                maxWidth: "min(360px, 90vw)",
                maxHeight: "70vh",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                border: "4px solid #fff"
              }}
            />
            <p style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: "700", marginTop: "14px" }}>{lightbox.name}</p>
            <button
              onClick={() => setLightbox(null)}
              style={{
                marginTop: "12px", background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.4)", color: "#fff",
                padding: "8px 22px", borderRadius: "30px", cursor: "pointer",
                fontSize: "0.85rem", fontFamily: "var(--font-body)"
              }}
            >✕ Close</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
        <span className="hero-tag">✦ Our Heritage &amp; Philosophy</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: "700", margin: "12px 0" }}>
          The Legacy of Zargul Collection
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
          Rooted in timeless horology and fine French-oriental perfumery, Zargul Collection reimagines Pakistani luxury through our signature 3D Soft Clay aesthetic.
        </p>
      </div>

      {/* Story Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", marginBottom: "60px" }}>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>🏺</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            The 3D Soft Clay Aesthetic
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Our bespoke claymorphic styling reflects tactile warmth, organic contours, and sculptural depth. Every creation is presented as a work of fine art, combining soft pastel tones with solid stainless steel and heavy glass bottles.
          </p>
        </div>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>⌚</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            Haute Horlogerie
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            From iconic diver silhouettes to two-tone fluted bezels and diamond-accented dress watches, our timepieces are engineered with surgical 316L stainless steel, sapphire-coated crystals, and reliable Japanese quartz calibers.
          </p>
        </div>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>🌸</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            Artisan Eau de Parfums
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Formulated at a rich 22%–28% EDP concentration using pure French and Arabian oils. Hawajes, Joyous, and Murooj deliver 14 to 20+ hours of commanding sillage that stays fresh in Pakistani weather.
          </p>
        </div>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>🚚</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            Rapid Nationwide Shipping
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Partnered with Pakistan&apos;s top courier networks (TCS, Leopards, Trax) to deliver safe, bubble-wrapped parcels directly to your doorstep in 2 to 4 business days.
          </p>
        </div>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>🎁</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            Tactile Clay Packaging
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Every piece arrives in our bespoke unboxing package, cushioned with protective tactile inserts that turn every order into an unforgettable gift experience.
          </p>
        </div>

        <div className="clay-card white" style={{ padding: "36px" }}>
          <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "16px" }}>🛡️</span>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>
            Pure EDP Distillation
          </h3>
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Our fragrances feature pure oil extracts with 24-hour sillage. Designed to leave a lasting impression in executive boardrooms and evening celebrations alike.
          </p>
        </div>

      </div>

      {/* Stats Banner */}
      <div
        className="clay-card lavender"
        style={{
          padding: "50px 40px",
          marginBottom: "60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "32px",
          textAlign: "center"
        }}
      >
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: "700", color: "var(--brand-purple)", margin: "0 0 6px" }}>15,000+</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>Orders Delivered Nationwide</p>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: "700", color: "var(--brand-purple)", margin: "0 0 6px" }}>4.9 / 5.0</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>Average Customer Rating</p>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: "700", color: "var(--brand-purple)", margin: "0 0 6px" }}>100%</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>Tactile Quality Guaranteed</p>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: "700", color: "var(--brand-purple)", margin: "0 0 6px" }}>24 / 7</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>VIP WhatsApp Support</p>
        </div>
      </div>

      {/* CO-FOUNDERS & LEADERSHIP */}
      <section style={{ maxWidth: "860px", margin: "20px auto 60px", textAlign: "center" }}>
        <div style={{ marginBottom: "36px" }}>
          <span className="hero-tag">✦ Leadership &amp; Vision</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: "700", margin: "12px 0 8px" }}>
            Meet the Co-Founders
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", maxWidth: "680px", margin: "0 auto", lineHeight: "1.6" }}>
            Curating exclusive luxury watches, premium French perfumes, Swati woolen shawls, and handcrafted accessories with a commitment to unmatched quality.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {/* Zalan Khan */}
          <div className="clay-card white" style={{ padding: "30px 24px", textAlign: "center", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setLightbox({ src: "/assets/founders/zalan_khan.jpg", name: "Zalan Khan — Co-Founder & Owner" })}
              style={{ width: "130px", height: "130px", borderRadius: "50%", overflow: "hidden", marginBottom: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.12)", border: "3px solid #fff", cursor: "zoom-in" }}
            >
              <img
                src="/assets/founders/zalan_khan.jpg"
                alt="Zalan Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: "700", margin: "0 0 4px" }}>
              Zalan Khan
            </h3>
            <span style={{ fontSize: "0.88rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
              Zargul Collection
            </span>
          </div>

          {/* Zohaib Khan */}
          <div className="clay-card white" style={{ padding: "30px 24px", textAlign: "center", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={() => setLightbox({ src: "/assets/founders/zohaib_khan.jpg", name: "Zohaib Khan — Co-Founder & Owner" })}
              style={{ width: "130px", height: "130px", borderRadius: "50%", overflow: "hidden", marginBottom: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.12)", border: "3px solid #fff", cursor: "zoom-in" }}
            >
              <img
                src="/assets/founders/zohaib_khan.jpg"
                alt="Zohaib Khan"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
              />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: "700", margin: "0 0 4px" }}>
              Zohaib Khan
            </h3>
            <span style={{ fontSize: "0.88rem", color: "var(--color-accent-dark)", fontWeight: "600", letterSpacing: "0.5px" }}>
              Co-Founder &amp; Owner
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
              Zargul Collection
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <Link href="/categories" className="clay-btn accent">
          Explore Our Collections ✦
        </Link>
      </div>

    </div>
  );
}
