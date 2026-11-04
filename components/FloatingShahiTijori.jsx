"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function FloatingShahiTijori() {
  const { isVaultUnlocked, setIsVaultModalOpen } = useStore();

  return (
    <div
      className="shahi-tijori-floating-wrap"
      style={{
        position: "fixed",
        bottom: "156px",
        right: "20px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto"
      }}
    >
      <button
        onClick={() => setIsVaultModalOpen(true)}
        aria-label="Open Shahi Tijori"
        style={{
          background: isVaultUnlocked
            ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
            : "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #d4af37 100%)",
          color: "#ffffff",
          border: "2.5px solid rgba(254, 240, 138, 0.9)",
          borderRadius: "32px",
          padding: "8px 16px 8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          boxShadow: isVaultUnlocked
            ? "0 8px 24px rgba(16, 185, 129, 0.45), 0 0 15px rgba(254, 240, 138, 0.3)"
            : "0 8px 24px rgba(220, 38, 38, 0.45), 0 0 18px rgba(212, 175, 55, 0.5)",
          animation: "shahiTijoriFloat 3s ease-in-out infinite",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          outline: "none"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Animated 3D Gift Box Icon */}
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            animation: "giftBoxPulse 2s ease-in-out infinite"
          }}
        >
          🎁
        </div>

        {/* Text Pill */}
        <div style={{ textAlign: "left", lineHeight: 1.1 }}>
          <div style={{ fontSize: "0.62rem", fontWeight: "900", letterSpacing: "1px", color: "#fef08a", textTransform: "uppercase" }}>
            {isVaultUnlocked ? "REWARD ACTIVE" : "TIKTOK SECRET"}
          </div>
          <div style={{ fontSize: "0.82rem", fontWeight: "900", color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
            {isVaultUnlocked ? "30ml Perfume 🎁" : "Shahi Tijori 🎁"}
          </div>
        </div>
      </button>

      <style jsx>{`
        @keyframes shahiTijoriFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes giftBoxPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(-6deg);
          }
          75% {
            transform: scale(1.1) rotate(6deg);
          }
        }
        @media (max-width: 640px) {
          .shahi-tijori-floating-wrap {
            bottom: 148px !important;
            right: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
