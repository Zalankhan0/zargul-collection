"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";

export default function SecretRoyalVault({ isOpen, onClose }) {
  const { isVaultUnlocked, unlockVault } = useStore();
  const [pin, setPin] = useState("");
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpeningDoor, setIsOpeningDoor] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setPin("");
      setErrorShake(false);
      setErrorMessage("");
      if (isVaultUnlocked) {
        setShowCelebration(true);
      } else {
        setShowCelebration(false);
        setIsOpeningDoor(false);
      }
    }
  }, [isOpen, isVaultUnlocked]);

  if (!isOpen) return null;

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage("");
      if (nextPin.length === 4) {
        verifyCode(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMessage("");
    }
  };

  const handleClear = () => {
    setPin("");
    setErrorMessage("");
  };

  const verifyCode = (enteredPin) => {
    // STRICT SINGLE SECRET CODE: ONLY 7860
    if (enteredPin === "7860") {
      setIsOpeningDoor(true);
      setTimeout(() => {
        unlockVault();
        setShowCelebration(true);
      }, 1000);
    } else {
      setErrorShake(true);
      setErrorMessage("Invalid Secret Code - Watch our TikTok closely!");
      setTimeout(() => {
        setErrorShake(false);
        setPin("");
      }, 900);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(10, 8, 12, 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto"
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "440px",
          background: "linear-gradient(160deg, #18181b 0%, #09090b 100%)",
          borderRadius: "26px",
          border: "2px solid rgba(212, 175, 55, 0.6)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(197, 160, 89, 0.35)",
          padding: "28px 20px",
          color: "#ffffff",
          textAlign: "center",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title="Close Shahi Tijori"
        >
          ✕
        </button>

        {/* VAULT DOOR FRAME */}
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
              padding: "4px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(212,175,55,0.4)",
              marginBottom: "10px"
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#d4af37" }}>✦</span>
            <span style={{ fontSize: "0.7rem", fontWeight: "800", letterSpacing: "1.5px", color: "#fef08a", textTransform: "uppercase" }}>
              TikTok VIP Secret Vault
            </span>
            <span style={{ fontSize: "0.85rem", color: "#d4af37" }}>✦</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: "900",
              margin: "0 0 6px",
              letterSpacing: "0.5px",
              background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            SHAHI TIJORI (ROYAL VAULT)
          </h2>
          <p style={{ margin: 0, fontSize: "0.82rem", color: "#a1a1aa", lineHeight: "1.4" }}>
            Enter the 4-digit Secret Code from our TikTok video to unlock your free royal gift!
          </p>
        </div>

        {/* VAULT INTERACTIVE ANIMATION & DOOR */}
        <div
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
            margin: "0 auto 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Circular Vault Wheel Door */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #3f3f46 0%, #18181b 80%)",
              border: "4px solid #c5a059",
              boxShadow: "0 10px 25px rgba(0,0,0,0.7), inset 0 2px 10px rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "center center",
              transform: isOpeningDoor || showCelebration ? "rotate(180deg) scale(0.92)" : "rotate(0deg) scale(1)",
              transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {/* Vault Wheel Spokes (SVG) */}
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="6 4" />
              <line x1="50" y1="8" x2="50" y2="92" stroke="#d4af37" strokeWidth="3" />
              <line x1="8" y1="50" x2="92" y2="50" stroke="#d4af37" strokeWidth="3" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="#d4af37" strokeWidth="2" />
              <line x1="20" y1="80" x2="80" y2="20" stroke="#d4af37" strokeWidth="2" />
              <circle cx="50" cy="50" r="16" fill="#18181b" stroke="#fef08a" strokeWidth="3" />
            </svg>
            <div style={{ position: "absolute", fontSize: "1.4rem" }}>
              {isVaultUnlocked || showCelebration ? "🔓" : "🔒"}
            </div>
          </div>
        </div>

        {/* IF UNLOCKED: SHOW CELEBRATORY REWARD MESSAGE */}
        {showCelebration || isVaultUnlocked ? (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(202, 138, 4, 0.25) 100%)",
              border: "1.5px solid #eab308",
              borderRadius: "18px",
              padding: "18px 14px",
              boxShadow: "0 8px 24px rgba(234, 179, 8, 0.25)"
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "4px" }}>🎉 👑 🎁</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "900", color: "#fef08a", margin: "0 0 6px" }}>
              MUBARAK HO! Shahi Tijori Khul Gayi!
            </h3>
            <p style={{ fontSize: "0.88rem", fontWeight: "750", color: "#ffffff", lineHeight: "1.4", margin: "0 0 12px" }}>
              Aapko Aaj Kisi Bhi Shopping Par Ek <strong>30ml Luxury Perfume 100% FREE</strong> Milega!
            </p>

            <div
              style={{
                display: "inline-block",
                background: "#18181b",
                border: "1px dashed #eab308",
                padding: "6px 14px",
                borderRadius: "12px",
                fontSize: "0.75rem",
                color: "#fef08a",
                fontWeight: "800",
                marginBottom: "14px"
              }}
            >
              ✓ Code 7860 Verified • Auto-Applied to WhatsApp &amp; Cart
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #d4af37 0%, #aa7c11 100%)",
                color: "#18181b",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: "900",
                letterSpacing: "0.5px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(212,175,55,0.4)"
              }}
            >
              START SHOPPING &amp; CLAIM FREE GIFT →
            </button>
          </div>
        ) : (
          /* CODE INPUT & KEYPAD VIEW */
          <div>
            {/* 4-DIGIT PIN DISPLAY (SHAKE ON ERROR) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "14px",
                transform: errorShake ? "translateX(-6px)" : "none",
                transition: "transform 0.1s ease"
              }}
            >
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    style={{
                      width: "46px",
                      height: "54px",
                      borderRadius: "12px",
                      background: filled ? "rgba(212, 175, 55, 0.15)" : "rgba(255,255,255,0.05)",
                      border: errorShake
                        ? "2px solid #ef4444"
                        : filled
                        ? "2px solid #d4af37"
                        : "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      fontWeight: "900",
                      color: errorShake ? "#ef4444" : "#fef08a",
                      boxShadow: filled ? "0 0 12px rgba(212,175,55,0.3)" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {filled ? "●" : ""}
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div style={{ color: "#ef4444", fontSize: "0.78rem", fontWeight: "750", marginBottom: "12px" }}>
                ❌ {errorMessage}
              </div>
            )}

            {/* NUMERIC KEYPAD */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                maxWidth: "280px",
                margin: "0 auto 12px"
              }}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((btn) => {
                const isClear = btn === "C";
                const isBackspace = btn === "⌫";

                return (
                  <button
                    key={btn}
                    onClick={() => {
                      if (isClear) handleClear();
                      else if (isBackspace) handleBackspace();
                      else handleKeyPress(btn);
                    }}
                    style={{
                      height: "46px",
                      borderRadius: "12px",
                      background: isClear || isBackspace
                        ? "rgba(255,255,255,0.08)"
                        : "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: isClear ? "#f87171" : isBackspace ? "#fbbf24" : "#ffffff",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      transition: "transform 0.1s ease, background 0.15s ease"
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: "0.72rem", color: "#71717a", marginTop: "8px" }}>
              💡 Hint: Watch our latest TikTok videos for the 4-digit code!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
