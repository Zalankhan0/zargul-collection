"use client";

import React, { useState, useEffect } from "react";

export default function WelcomeSplash() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this session (smooth UX)
    try {
      const alreadyShown = sessionStorage.getItem("zargul_splash_shown");
      if (alreadyShown === "true") {
        setShow(false);
        return;
      }
    } catch {}

    // Start fade-out at 3.2s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 3200);

    // Completely unmount at 3.8s
    const removeTimer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("zargul_splash_shown", "true");
      } catch {}
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleDismiss = () => {
    setFading(true);
    setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("zargul_splash_shown", "true");
      } catch {}
    }, 400);
  };

  if (!show) return null;

  return (
    <div
      onClick={handleDismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "linear-gradient(145deg, #faf9f6 0%, #f5efe6 50%, #ede3d5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        opacity: fading ? 0 : 1,
        transform: fading ? "scale(1.02)" : "scale(1)",
        transition: "opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: fading ? "none" : "auto",
        cursor: "pointer"
      }}
    >
      {/* Background Decorative Golden Glow Orbs */}
      <div
        style={{
          position: "absolute",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.25) 0%, rgba(197, 160, 89, 0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          animation: "splashPulse 3s ease-in-out infinite alternate"
        }}
      />

      {/* Main Glassmorphic / Clay Content Box */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "460px",
          width: "100%",
          padding: "36px 28px",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "2px solid rgba(197, 160, 89, 0.35)",
          boxShadow: "0 20px 60px rgba(197, 160, 89, 0.18), 0 4px 20px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Animated Brand Logo with Golden Halo */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, #c5a059, #f5dfa8, #a8833e)",
            boxShadow: "0 10px 30px rgba(197, 160, 89, 0.45)",
            animation: "splashFloat 3s ease-in-out infinite"
          }}
        >
          <img
            src="/assets/logo.jpg"
            alt="Zargul Collection Logo"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Small Tag */}
        <span
          style={{
            display: "inline-block",
            fontSize: "0.72rem",
            fontWeight: "700",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--color-accent-dark, #a8833e)",
            marginBottom: "8px"
          }}
        >
          ✦ Haute Horlogerie &amp; Parfumerie ✦
        </span>

        {/* Welcome Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display, 'Plus Jakarta Sans')",
            fontSize: "clamp(1.7rem, 5vw, 2.3rem)",
            fontWeight: "800",
            color: "#141316",
            lineHeight: "1.25",
            margin: "0 0 10px",
            letterSpacing: "-0.5px"
          }}
        >
          Welcome to <br />
          <span
            style={{
              background: "linear-gradient(135deg, #a8833e 0%, #c5a059 50%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Zargul Collection
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-body, 'Outfit')",
            fontSize: "0.92rem",
            color: "#6b666d",
            lineHeight: "1.55",
            margin: "0 0 24px"
          }}
        >
          Curating exclusive timepieces, French fragrances, and Swati heritage with unmatched elegance across Pakistan.
        </p>

        {/* Animated Golden Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "rgba(197, 160, 89, 0.18)",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "16px"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #c5a059, #a8833e)",
              borderRadius: "4px",
              animation: "splashProgress 3.2s linear forwards"
            }}
          />
        </div>

        {/* Tap to enter hint */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            fontWeight: "600",
            color: "var(--color-accent-dark, #a8833e)",
            letterSpacing: "0.5px"
          }}
        >
          <span>Entering boutique... Tap to skip</span>
          <span>→</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes splashPulse {
          0% { transform: scale(0.92); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes splashFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes splashProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
