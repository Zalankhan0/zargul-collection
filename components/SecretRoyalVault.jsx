"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { checkDeviceAlreadyClaimed, recordDeviceClaimSuccess } from "@/lib/fraudPrevention";

export default function SecretRoyalVault({ isOpen: propsIsOpen, onClose: propsOnClose }) {
  const {
    isVaultUnlocked,
    unlockVault,
    claimVaultFreeGift,
    isVaultModalOpen,
    setIsVaultModalOpen
  } = useStore();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isVaultModalOpen;
  const onClose = propsOnClose !== undefined ? propsOnClose : () => setIsVaultModalOpen(false);

  const [pin, setPin] = useState("");
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpeningDoor, setIsOpeningDoor] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check state on modal open
  useEffect(() => {
    if (isOpen) {
      setPin("");
      setErrorShake(false);
      setErrorMessage("");

      const alreadyClaimed = checkDeviceAlreadyClaimed();
      if (alreadyClaimed || isVaultUnlocked) {
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
      // 1. Strict Fraud Prevention Check
      const alreadyClaimed = checkDeviceAlreadyClaimed();
      if (alreadyClaimed) {
        setErrorShake(true);
        setErrorMessage("❌ Aap is device se apna gift pehle hi claim kar chuke hain!");
        setTimeout(() => {
          setErrorShake(false);
          setPin("");
        }, 2200);
        return;
      }

      // 2. Unclaimed -> Grant Reward & Record Device Fingerprint
      recordDeviceClaimSuccess();
      setIsOpeningDoor(true);
      setTimeout(() => {
        unlockVault();
        setShowCelebration(true);
      }, 700);
    } else {
      setErrorShake(true);
      setErrorMessage("Galat Secret Code! Watch our TikTok video for 7860.");
      setTimeout(() => {
        setErrorShake(false);
        setPin("");
      }, 900);
    }
  };

  const handleClaimAndShop = () => {
    claimVaultFreeGift();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(10, 8, 12, 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        overflowY: "auto"
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "375px",
          maxHeight: "92vh",
          overflowY: "auto",
          background: "linear-gradient(160deg, #18181b 0%, #09090b 100%)",
          borderRadius: "22px",
          border: "2px solid rgba(212, 175, 55, 0.7)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.3)",
          padding: "18px 16px 16px",
          color: "#ffffff",
          textAlign: "center",
          boxSizing: "border-box"
        }}
      >
        {/* HIGHLY VISIBLE "✖" (CLOSE) BUTTON AT TOP RIGHT */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Shahi Tijori"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#27272a",
            border: "1.8px solid #d4af37",
            color: "#fef08a",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "1.15rem",
            fontWeight: "900",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            boxShadow: "0 3px 10px rgba(0,0,0,0.7)",
            transition: "transform 0.15s ease, background 0.15s ease",
            lineHeight: 1
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✕
        </button>

        {/* ---------------- VIEW 1: CELEBRATION REWARD ("AAPNE WIN KIYA!") ---------------- */}
        {showCelebration ? (
          <div style={{ animation: "vaultFadeIn 0.35s ease", paddingTop: "4px" }}>
            {/* VIP BADGE */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
                padding: "3px 12px",
                borderRadius: "16px",
                border: "1px solid rgba(212,175,55,0.45)",
                marginBottom: "6px"
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#d4af37" }}>✦</span>
              <span style={{ fontSize: "0.64rem", fontWeight: "900", letterSpacing: "1px", color: "#fef08a", textTransform: "uppercase" }}>
                Shahi Tijori Reward
              </span>
              <span style={{ fontSize: "0.75rem", color: "#d4af37" }}>✦</span>
            </div>

            {/* GRAND HEADER */}
            <h3
              style={{
                fontSize: "1.28rem",
                fontWeight: "900",
                color: "#fef08a",
                margin: "0 0 3px",
                letterSpacing: "0.3px",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)"
              }}
            >
              🎉 AAPNE WIN KIYA! 🎉
            </h3>

            {/* TERMS SUBTITLE */}
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "750",
                color: "#ffffff",
                lineHeight: "1.35",
                margin: "0 0 10px",
                padding: "0 4px"
              }}
            >
              Sirf koi bhi 1 item khareedein aur ye 30ml Perfume <span style={{ color: "#fef08a", textDecoration: "underline" }}>FREE</span> paayein!
            </p>

            {/* COMPACT HD 30ML PERFUME SHOWCASE BOX */}
            <div
              style={{
                position: "relative",
                background: "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                borderRadius: "14px",
                border: "1.5px solid rgba(212, 175, 55, 0.5)",
                padding: "8px",
                marginBottom: "10px",
                overflow: "hidden"
              }}
            >
              {/* Gold Ribbon Stamp */}
              <div
                style={{
                  position: "absolute",
                  top: "9px",
                  right: "-26px",
                  background: "linear-gradient(135deg, #d4af37 0%, #b45309 100%)",
                  color: "#ffffff",
                  fontSize: "0.58rem",
                  fontWeight: "900",
                  letterSpacing: "0.4px",
                  padding: "3px 26px",
                  transform: "rotate(25deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
                  textTransform: "uppercase"
                }}
              >
                WIN FREE WITH ANY PURCHASE!
              </div>

              {/* Perfume Image */}
              <div
                style={{
                  width: "100%",
                  height: "135px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#09090b",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "6px"
                }}
              >
                <img
                  src="/assets/perfumes/free_30ml_perfume_reward.jpg"
                  alt="30ml Luxury Perfume Free Reward"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 4px 10px rgba(212,175,55,0.4))",
                    transform: "scale(1.02)"
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
              </div>

              {/* Product Info */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.88rem", fontWeight: "900", color: "#fef08a" }}>
                  🎁 30ml Luxury Eau de Parfum
                </div>
                <div style={{ fontSize: "0.7rem", color: "#a1a1aa", marginTop: "1px" }}>
                  Handcrafted French &amp; Oriental Notes • Long Lasting
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.74rem", color: "#71717a", textDecoration: "line-through" }}>
                    Rs. 1,500
                  </span>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "1px solid #10b981",
                      color: "#34d399",
                      fontSize: "0.74rem",
                      fontWeight: "900",
                      padding: "1px 7px",
                      borderRadius: "5px"
                    }}
                  >
                    100% FREE (Rs. 0)
                  </span>
                </div>
              </div>
            </div>

            {/* VERIFIED NOTE */}
            <div
              style={{
                display: "inline-block",
                background: "#18181b",
                border: "1px dashed #d4af37",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "0.68rem",
                color: "#fef08a",
                fontWeight: "800",
                marginBottom: "10px"
              }}
            >
              ✓ Code 7860 Verified • Auto-Locks to Cart &amp; WhatsApp
            </div>

            {/* ACTION BUTTON: CLAIM GIFT & SHOP NOW */}
            <button
              type="button"
              onClick={handleClaimAndShop}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
                color: "#18181b",
                border: "none",
                fontSize: "0.88rem",
                fontWeight: "900",
                letterSpacing: "0.3px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(212,175,55,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "transform 0.15s ease"
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>🛒</span>
              <span>Claim Gift &amp; Shop Now</span>
            </button>

            {/* SECONDARY DISMISS LINK */}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#a1a1aa",
                fontSize: "0.72rem",
                fontWeight: "600",
                marginTop: "8px",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              ✕ Dismiss &amp; Continue Browsing
            </button>
          </div>
        ) : (
          /* ---------------- VIEW 2: PIN ENTRY KEYPAD ---------------- */
          <div style={{ paddingTop: "6px" }}>
            {/* COMPACT VAULT HEADER */}
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
                  padding: "3px 12px",
                  borderRadius: "16px",
                  border: "1px solid rgba(212,175,55,0.45)",
                  marginBottom: "6px"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "#d4af37" }}>✦</span>
                <span style={{ fontSize: "0.64rem", fontWeight: "900", letterSpacing: "1px", color: "#fef08a", textTransform: "uppercase" }}>
                  TikTok VIP Secret Vault
                </span>
                <span style={{ fontSize: "0.75rem", color: "#d4af37" }}>✦</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: "900",
                  margin: "0 0 3px",
                  letterSpacing: "0.3px",
                  background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                SHAHI TIJORI 🎁
              </h2>
              <p style={{ margin: 0, fontSize: "0.76rem", color: "#a1a1aa", lineHeight: "1.3" }}>
                Enter the 4-digit code from TikTok (<b>7860</b>) to unlock your free reward!
              </p>
            </div>

            {/* COMPACT VAULT WHEEL DOOR */}
            <div
              style={{
                position: "relative",
                width: "72px",
                height: "72px",
                margin: "0 auto 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 40%, #3f3f46 0%, #18181b 80%)",
                  border: "3px solid #d4af37",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformOrigin: "center center",
                  transform: isOpeningDoor ? "rotate(180deg) scale(0.92)" : "rotate(0deg) scale(1)",
                  transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              >
                <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="6 4" />
                  <line x1="50" y1="8" x2="50" y2="92" stroke="#d4af37" strokeWidth="3" />
                  <line x1="8" y1="50" x2="92" y2="50" stroke="#d4af37" strokeWidth="3" />
                  <circle cx="50" cy="50" r="16" fill="#18181b" stroke="#fef08a" strokeWidth="3" />
                </svg>
                <div style={{ position: "absolute", fontSize: "1.1rem" }}>
                  {isOpeningDoor ? "🔓" : "🔒"}
                </div>
              </div>
            </div>

            {/* 4-DIGIT PIN DISPLAY (SHAKES ON ERROR) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "10px",
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
                      width: "42px",
                      height: "46px",
                      borderRadius: "10px",
                      background: filled ? "rgba(212, 175, 55, 0.18)" : "rgba(255,255,255,0.05)",
                      border: errorShake
                        ? "2px solid #ef4444"
                        : filled
                        ? "2px solid #d4af37"
                        : "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      fontWeight: "900",
                      color: errorShake ? "#ef4444" : "#fef08a",
                      boxShadow: filled ? "0 0 10px rgba(212,175,55,0.3)" : "none",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {filled ? "●" : ""}
                  </div>
                );
              })}
            </div>

            {/* ERROR MESSAGE (ANTI-FRAUD DUPLICATE / WRONG CODE) */}
            {errorMessage && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.16)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  fontSize: "0.74rem",
                  fontWeight: "750",
                  padding: "5px 8px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  lineHeight: "1.3"
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* COMPACT NUMERIC KEYPAD */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                maxWidth: "260px",
                margin: "0 auto 8px"
              }}
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((btn) => {
                const isClear = btn === "C";
                const isBackspace = btn === "⌫";

                return (
                  <button
                    key={btn}
                    type="button"
                    onClick={() => {
                      if (isClear) handleClear();
                      else if (isBackspace) handleBackspace();
                      else handleKeyPress(btn);
                    }}
                    style={{
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        isClear || isBackspace
                          ? "rgba(255,255,255,0.08)"
                          : "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: isClear ? "#f87171" : isBackspace ? "#fbbf24" : "#ffffff",
                      fontSize: "1.05rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
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

            <div style={{ fontSize: "0.68rem", color: "#a1a1aa", marginTop: "4px" }}>
              💡 Secret Code: <b>7860</b> (TikTok VIP Gift)
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes vaultFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
