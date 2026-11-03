"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import SecretRoyalVault from "./SecretRoyalVault";
import ShahiKhanCombo from "./ShahiKhanCombo";

export default function TikTokVipHub() {
  const { isVaultUnlocked } = useStore();
  const [activeTab, setActiveTab] = useState(null); // 'vault' | 'combo' | null
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const handleTabClick = (tabKey) => {
    if (tabKey === "vault") {
      setIsVaultModalOpen(true);
    } else {
      if (activeTab === tabKey) {
        setActiveTab(null); // toggle close
      } else {
        setActiveTab(tabKey);
      }
    }
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto 20px",
        padding: "0 4%",
        boxSizing: "border-box"
      }}
    >
      {/* LUXURY GOLD-AND-BLACK VIP NAVIGATION BAR */}
      <div
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #27272a 45%, #18181b 100%)",
          borderRadius: "22px",
          border: "1.5px solid rgba(212, 175, 55, 0.5)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25), 0 0 20px rgba(197, 160, 89, 0.15)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          boxSizing: "border-box"
        }}
      >
        {/* BRAND / TIKTOK BADGE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              boxShadow: "0 2px 8px rgba(212,175,55,0.4)"
            }}
          >
            👑
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: "900", letterSpacing: "1px", color: "#fef08a", textTransform: "uppercase" }}>
                TikTok VIP Hub
              </span>
              <span style={{ background: "#ef4444", color: "#ffffff", fontSize: "0.54rem", fontWeight: "900", padding: "1px 5px", borderRadius: "6px" }}>
                LIVE
              </span>
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#ffffff" }}>
              Exclusive Royal Features
            </div>
          </div>
        </div>

        {/* 2 INTERACTIVE TABS / BUTTONS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          
          {/* TAB 1: SHAHI TIJORI (SECRET VAULT) */}
          <button
            onClick={() => handleTabClick("vault")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "9px 16px",
              borderRadius: "14px",
              background: isVaultUnlocked
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "linear-gradient(135deg, rgba(234, 179, 8, 0.25) 0%, rgba(202, 138, 4, 0.35) 100%)",
              color: "#ffffff",
              border: isVaultUnlocked ? "1.5px solid #10b981" : "1.5px solid rgba(234, 179, 8, 0.7)",
              fontSize: "0.78rem",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease"
            }}
          >
            <span>{isVaultUnlocked ? "🎁" : "🔐"}</span>
            <span>{isVaultUnlocked ? "Shahi Tijori (Active)" : "Shahi Tijori (Secret Vault)"}</span>
          </button>

          {/* TAB 2: SHAHI KHAN COMBO */}
          <button
            onClick={() => handleTabClick("combo")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "9px 16px",
              borderRadius: "14px",
              background: activeTab === "combo" ? "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)" : "rgba(255,255,255,0.08)",
              color: activeTab === "combo" ? "#18181b" : "#ffffff",
              border: activeTab === "combo" ? "1.5px solid #d4af37" : "1.5px solid rgba(255,255,255,0.18)",
              fontSize: "0.78rem",
              fontWeight: "800",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <span>👑</span>
            <span>Khan Combo Machine</span>
            <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>{activeTab === "combo" ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* VAULT PERMANENT ACTIVE BADGE IF UNLOCKED */}
        {isVaultUnlocked && (
          <div
            onClick={() => setIsVaultModalOpen(true)}
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #fef08a 0%, #facc15 100%)",
              color: "#18181b",
              padding: "6px 14px",
              borderRadius: "12px",
              fontSize: "0.72rem",
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 10px rgba(250, 204, 21, 0.4)",
              letterSpacing: "0.5px"
            }}
          >
            <span>🎁</span>
            <span>FREE 30ml Perfume Active!</span>
          </div>
        )}
      </div>

      {/* EXPANDABLE COMBO MACHINE ACCORDION (SMOOTH & ZERO LAYOUT BREAK) */}
      {activeTab === "combo" && (
        <div style={{ marginTop: "16px", animation: "fadeIn 0.3s ease" }}>
          <ShahiKhanCombo />
        </div>
      )}

      {/* SECRET ROYAL VAULT MODAL */}
      <SecretRoyalVault
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />
    </section>
  );
}
