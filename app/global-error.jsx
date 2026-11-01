"use client";

import React, { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Zargul Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "40px 20px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#fbf8f5",
          color: "#2a2026",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            background: "#ffffff",
            maxWidth: "400px",
            width: "100%",
            padding: "30px 24px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "8px" }}>
            Zargul Collection
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: "20px" }}>
            Updating store catalog. Tap below to reload.
          </p>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              } else {
                reset();
              }
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#c5a059",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            Reload Store
          </button>
        </div>
      </body>
    </html>
  );
}
