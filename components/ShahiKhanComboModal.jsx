"use client";

import React from "react";
import ShahiKhanCombo from "./ShahiKhanCombo";

export default function ShahiKhanComboModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1050px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
          borderRadius: "24px",
          border: "2px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(212, 175, 55, 0.2)",
          padding: "20px 16px 28px",
          color: "#ffffff",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close Combo Machine"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 60,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
        >
          ✖
        </button>

        <ShahiKhanCombo />
      </div>
    </div>
  );
}
