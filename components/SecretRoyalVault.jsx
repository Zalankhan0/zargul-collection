"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";

export default function SecretRoyalVault({ isOpen: propsIsOpen, onClose: propsOnClose }) {
  const {
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

  // STEP 1 RULE: Every time modal opens, ALWAYS start on Locked Screen (Keypad). DO NOT show reward yet!
  useEffect(() => {
    if (isOpen) {
      setPin("");
      setErrorShake(false);
      setErrorMessage("");
      setShowCelebration(false);
      setIsOpeningDoor(false);
    }
  }, [isOpen]);

  // Support physical keyboard on desktop as well
  useEffect(() => {
    if (!isOpen || showCelebration) return;

    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter" && pin.length === 4) {
        verifyCode(pin);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showCelebration, pin]);

  if (!isOpen) return null;

  const handleKeyPress = (digit) => {
    if (pin.length < 4 && !isOpeningDoor) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage("");
      if (nextPin.length === 4) {
        verifyCode(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0 && !isOpeningDoor) {
      setPin(pin.slice(0, -1));
      setErrorMessage("");
    }
  };

  const handleClear = () => {
    if (!isOpeningDoor) {
      setPin("");
      setErrorMessage("");
    }
  };

  const verifyCode = (enteredPin) => {
    // STRICT SINGLE SECRET CODE: ONLY 7860
    if (enteredPin === "7860") {
      setIsOpeningDoor(true);
      setErrorMessage("");
      // STEP 2: Play unlock animation and THEN show "AAPNE WIN KIYA!" screen
      setTimeout(() => {
        unlockVault();
        setShowCelebration(true);
      }, 700);
    } else {
      setErrorShake(true);
      setErrorMessage("❌ Incorrect Code");
      setTimeout(() => {
        setErrorShake(false);
        setPin("");
      }, 850);
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
        background: "rgba(10, 8, 12, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        overflowY: "auto",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "360px",
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
        {/* CLOSE "✖" BUTTON AT TOP RIGHT */}
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
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            fontSize: "1.1rem",
            fontWeight: "900",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            boxShadow: "0 3px 10px rgba(0,0,0,0.7)",
            transition: "transform 0.15s ease",
            lineHeight: 1
          }}
        >
          ✕
        </button>

        {/* ---------------- STEP 2: CELEBRATION REWARD SCREEN ("AAPNE WIN KIYA!") ---------------- */}
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
                Secret Code 7860 Verified
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

            {/* 30ML PERFUME SHOWCASE BOX */}
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
                FREE GIFT
              </div>

              {/* Product Layout */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "10px",
                    background: "#ffffff",
                    flexShrink: 0,
                    overflow: "hidden",
                    border: "1px solid rgba(212,175,55,0.4)"
                  }}
                >
                  <img
                    src="/assets/image_31.png"
                    alt="Free 30ml Luxury Perfume"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={(e) => {
                      e.currentTarget.src = "/assets/image_30.png";
                    }}
                  />
                </div>

                <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: "800", color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                    TIKTOK VIP VAULT GIFT
                  </div>
                  <h4 style={{ fontSize: "0.86rem", fontWeight: "900", color: "#ffffff", margin: "1px 0 2px", lineHeight: "1.2" }}>
                    Royal Oudh &amp; French EDP (30ml)
                  </h4>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#a1a1aa", textDecoration: "line-through" }}>
                      Rs. 2,500
                    </span>
                    <span style={{ fontSize: "0.95rem", fontWeight: "900", color: "#22c55e" }}>
                      FREE (Rs. 0)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              type="button"
              onClick={handleClaimAndShop}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #fef08a 0%, #d4af37 60%, #b45309 100%)",
                color: "#18181b",
                border: "none",
                borderRadius: "14px",
                padding: "12px 16px",
                fontSize: "0.92rem",
                fontWeight: "900",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(212, 175, 55, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.15s ease"
              }}
            >
              <span>🛒</span>
              <span>Claim Gift &amp; Shop Now</span>
            </button>
          </div>
        ) : (
          /* ---------------- STEP 1: LOCKED VAULT SCREEN (KEYPAD) ---------------- */
          <div style={{ paddingTop: "6px" }}>
            {/* VAULT HEADER */}
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
                  margin: "0 0 4px",
                  letterSpacing: "0.3px",
                  background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                SHAHI TIJORI 🎁
              </h2>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#e4e4e7", lineHeight: "1.35", fontWeight: "600" }}>
                Enter the Secret Code from our TikTok video to unlock!
              </p>
            </div>

            {/* ANIMATED VAULT DOOR ICON */}
            <div
              style={{
                position: "relative",
                width: "68px",
                height: "68px",
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
                <div style={{ fontSize: "1.5rem" }}>
                  {isOpeningDoor ? "🔓" : "🔒"}
                </div>
              </div>
            </div>

            {/* 4-DIGIT PIN DISPLAY (SHAKES ON INCORRECT CODE) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "8px",
                animation: errorShake ? "vaultShake 0.4s ease" : "none"
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
                        : "1px solid rgba(255,255,255,0.18)",
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

            {/* ERROR MESSAGE ("❌ Incorrect Code") */}
            {errorMessage && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.16)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  padding: "5px 8px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  lineHeight: "1.3"
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* NUMERIC KEYPAD */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                maxWidth: "250px",
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
                      height: "42px",
                      borderRadius: "10px",
                      background:
                        isClear || isBackspace
                          ? "rgba(255,255,255,0.08)"
                          : "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: isClear ? "#f87171" : isBackspace ? "#fbbf24" : "#ffffff",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      cursor: "pointer",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                      transition: "transform 0.1s ease"
                    }}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="button"
              onClick={() => {
                if (pin.length === 4) {
                  verifyCode(pin);
                } else {
                  setErrorShake(true);
                  setErrorMessage("Enter 4 digits first!");
                  setTimeout(() => setErrorShake(false), 700);
                }
              }}
              style={{
                width: "100%",
                maxWidth: "250px",
                margin: "4px auto 0",
                padding: "10px 14px",
                borderRadius: "12px",
                background: pin.length === 4
                  ? "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)"
                  : "rgba(255, 255, 255, 0.1)",
                color: pin.length === 4 ? "#000000" : "#a1a1aa",
                border: pin.length === 4 ? "1.5px solid #fef08a" : "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "0.85rem",
                fontWeight: "900",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                boxShadow: pin.length === 4 ? "0 4px 14px rgba(212, 175, 55, 0.4)" : "none",
                transition: "all 0.15s ease"
              }}
            >
              <span>🔓</span>
              <span>Unlock Tijori</span>
            </button>
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
        @keyframes vaultShake {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-8px);
          }
          40%, 80% {
            transform: translateX(8px);
          }
        }
      `}</style>
    </div>
  );
}
