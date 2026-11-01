"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Zargul App Error caught:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
        textAlign: "center",
        background: "#fbf8f5"
      }}
    >
      <div
        className="clay-card white"
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "32px 24px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✦</div>
        <h2
          style={{
            fontFamily: "var(--font-display, sans-serif)",
            fontSize: "1.4rem",
            fontWeight: "700",
            color: "#2a2026",
            marginBottom: "8px"
          }}
        >
          Welcome to Zargul Collection
        </h2>
        <p style={{ fontSize: "0.88rem", color: "#73646c", marginBottom: "20px", lineHeight: "1.5" }}>
          We are refreshing the luxury catalog. Please tap below to continue browsing.
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            } catch {
              reset();
            }
          }}
          className="clay-btn accent"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "0.92rem",
            fontWeight: "700",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Reload Experience
        </button>
      </div>
    </div>
  );
}
