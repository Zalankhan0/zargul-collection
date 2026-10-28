"use client";

import React, { useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import SecretAdminModal from "@/components/SecretAdminModal";
import Link from "next/link";

export default function AdminPage() {
  const { setIsAdminOpen, isAdminAuthenticated } = useStore();

  useEffect(() => {
    setIsAdminOpen(true);
  }, [setIsAdminOpen]);

  return (
    <div style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "var(--bg-app)" }}>
      <div style={{ textAlign: "center", maxWidth: "520px", background: "#ffffff", padding: "40px 32px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "#151417", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 16px" }}>
          🔒
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: "700", marginBottom: "8px", color: "var(--color-text-dark)" }}>
          Zargul Admin Portal
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", lineHeight: "1.5", marginBottom: "24px" }}>
          Direct management console for real-time products, orders, and store configuration.
        </p>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="clay-btn accent"
          style={{ width: "100%", padding: "14px", fontSize: "0.95rem" }}
        >
          {isAdminAuthenticated ? "Open Dashboard Console ✦" : "Log In to Admin Panel ✦"}
        </button>

        <div style={{ marginTop: "18px" }}>
          <Link href="/" style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", textDecoration: "none" }}>
            ← Return to Zargul Storefront
          </Link>
        </div>
      </div>

      {/* Admin Modal / Dashboard */}
      <SecretAdminModal forceOpen={true} />
    </div>
  );
}
