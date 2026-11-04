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
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "96vh",
          overflowY: "auto",
          background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
          borderRadius: "18px",
          border: "1.5px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 25px rgba(212, 175, 55, 0.2)",
          padding: "8px 6px 12px",
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
            top: "8px",
            right: "8px",
            zIndex: 60,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            cursor: "pointer",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease"
          }}
        >
          ✖
        </button>

        <ShahiKhanCombo />
      </div>
    </div>
  );
}
