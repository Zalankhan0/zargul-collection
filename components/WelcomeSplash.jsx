"use client";

import React, { useState, useEffect } from "react";

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per session for a smooth experience
    try {
      if (sessionStorage.getItem("zargul_splash_seen")) {
        setVisible(false);
        return;
      }
    } catch {}

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("zargul_splash_seen", "true");
      } catch {}
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
        backgroundColor: "#faf9f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        opacity: fading ? 0 : 1,
        visibility: fading ? "hidden" : "visible",
        transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.55s ease",
        cursor: "pointer",
        userSelect: "none"
      }}
    >
      {/* Golden Glow Backdrop Effect */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240, 142, 167, 0.35) 0%, rgba(197, 160, 89, 0.2) 50%, transparent 70%)",
            filter: "blur(22px)",
            pointerEvents: "none"
          }}
        />

        {/* Sharp Perfectly-Fitted Center Logo Card */}
        <div
          style={{
            width: "115px",
            height: "115px",
            borderRadius: "50%",
            background: "#ffffff",
            border: "3px solid #ffffff",
            boxShadow: "0 14px 40px rgba(185, 170, 180, 0.35), 0 0 0 1.5px rgba(197, 160, 89, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            marginBottom: "18px",
            position: "relative",
            zIndex: 1
          }}
        >
          <img
            src="/assets/logo.jpg"
            alt="Zargul Collection Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1.7)",
              imageRendering: "-webkit-optimize-contrast",
              display: "block"
            }}
          />
        </div>

        {/* Elegant Typography */}
        <span
          style={{
            fontSize: "0.76rem",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#c5a059",
            marginBottom: "6px"
          }}
        >
          ✦ Welcome to ✦
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display, 'Outfit', serif)",
            fontSize: "clamp(1.9rem, 5vw, 2.7rem)",
            fontWeight: "800",
            letterSpacing: "4px",
            color: "#141316",
            margin: "0 0 4px",
            textAlign: "center"
          }}
        >
          ZARGUL
        </h1>

        <span
          style={{
            fontFamily: "var(--font-display, 'Outfit', sans-serif)",
            fontSize: "0.95rem",
            fontWeight: "600",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#5c3c67",
            marginBottom: "14px"
          }}
        >
          COLLECTION
        </span>

        <div
          style={{
            width: "44px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #c5a059, transparent)",
            marginBottom: "10px"
          }}
        />

        <p
          style={{
            fontSize: "0.8rem",
            color: "#7a7277",
            margin: 0,
            letterSpacing: "1px",
            fontWeight: "500"
          }}
        >
          Curated Luxury &amp; Executive Heritage
        </p>
      </div>
    </div>
  );
}
