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
      }, 900);
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
        zIndex: 9999,
        background: "rgba(10, 8, 12, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
          border: "2px solid rgba(212, 175, 55, 0.65)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(212, 175, 55, 0.35)",
          padding: "26px 20px 22px",
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
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#ffffff",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s"
          }}
          title="Close Shahi Tijori"
        >
          ✕
        </button>

        {/* VAULT DOOR HEADER */}
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
              padding: "4px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(212,175,55,0.45)",
              marginBottom: "8px"
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#d4af37" }}>✦</span>
            <span style={{ fontSize: "0.7rem", fontWeight: "800", letterSpacing: "1.5px", color: "#fef08a", textTransform: "uppercase" }}>
              TIKTOK VIP SECRET VAULT
            </span>
            <span style={{ fontSize: "0.85rem", color: "#d4af37" }}>✦</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.45rem",
              fontWeight: "900",
              margin: "0 0 4px",
              letterSpacing: "0.5px",
              background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            SHAHI TIJORI 🎁
          </h2>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#a1a1aa", lineHeight: "1.35" }}>
            Enter the 4-digit Secret Code from our TikTok video to claim your royal reward!
          </p>
        </div>

        {/* VAULT ANIMATED WHEEL DOOR */}
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            margin: "0 auto 16px",
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
              border: "3.5px solid #d4af37",
              boxShadow: "0 8px 24px rgba(0,0,0,0.7), inset 0 2px 8px rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "center center",
              transform: isOpeningDoor || showCelebration ? "rotate(180deg) scale(0.92)" : "rotate(0deg) scale(1)",
              transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="6 4" />
              <line x1="50" y1="8" x2="50" y2="92" stroke="#d4af37" strokeWidth="3" />
              <line x1="8" y1="50" x2="92" y2="50" stroke="#d4af37" strokeWidth="3" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="#d4af37" strokeWidth="2" />
              <line x1="20" y1="80" x2="80" y2="20" stroke="#d4af37" strokeWidth="2" />
              <circle cx="50" cy="50" r="16" fill="#18181b" stroke="#fef08a" strokeWidth="3" />
            </svg>
            <div style={{ position: "absolute", fontSize: "1.3rem" }}>
              {showCelebration ? "🔓" : "🔒"}
            </div>
          </div>
        </div>

        {/* CELEBRATION REWARD SHOWCASE ("AAPNE WIN KIYA!") */}
        {showCelebration ? (
          <div
            style={{
              background: "linear-gradient(160deg, rgba(234, 179, 8, 0.12) 0%, rgba(202, 138, 4, 0.22) 100%)",
              border: "1.8px solid #d4af37",
              borderRadius: "20px",
              padding: "16px 14px",
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.25)",
              animation: "vaultFadeIn 0.5s ease"
            }}
          >
            {/* Grand Header */}
            <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>🎉 👑 🎁</div>
            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: "900",
                color: "#fef08a",
                margin: "0 0 6px",
                letterSpacing: "0.5px",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)"
              }}
            >
              🎉 AAPNE WIN KIYA! 🎉
            </h3>

            {/* Clear Terms Note */}
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: "750",
                color: "#ffffff",
                lineHeight: "1.4",
                margin: "0 0 14px",
                padding: "0 6px"
              }}
            >
              Sirf koi bhi 1 item khareedein aur ye 30ml Perfume <span style={{ color: "#fef08a", textDecoration: "underline" }}>FREE</span> paayein!
            </p>

            {/* HD 30ML PERFUME SHOWCASE CONTAINER */}
            <div
              style={{
                position: "relative",
                background: "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                borderRadius: "16px",
                border: "1.5px solid rgba(212, 175, 55, 0.5)",
                padding: "12px",
                marginBottom: "14px",
                overflow: "hidden"
              }}
            >
              {/* Luxury Gold Stamp */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "-26px",
                  background: "linear-gradient(135deg, #d4af37 0%, #b45309 100%)",
                  color: "#ffffff",
                  fontSize: "0.62rem",
                  fontWeight: "900",
                  letterSpacing: "0.5px",
                  padding: "4px 30px",
                  transform: "rotate(25deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                  textTransform: "uppercase"
                }}
              >
                WIN FREE WITH ANY PURCHASE!
              </div>

              {/* Perfume Bottle Image */}
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#09090b",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "8px"
                }}
              >
                <img
                  src="/assets/perfumes/free_30ml_perfume_reward.jpg"
                  alt="30ml Luxury Perfume Free Reward"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 6px 14px rgba(212,175,55,0.4))",
                    transform: "scale(1.04)"
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpg";
                  }}
                />
              </div>

              {/* Product Info */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: "900", color: "#fef08a" }}>
                  🎁 30ml Luxury Eau de Parfum
                </div>
                <div style={{ fontSize: "0.74rem", color: "#a1a1aa", marginTop: "2px" }}>
                  Handcrafted French &amp; Oriental Notes • Long Lasting Scent
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                  <span style={{ fontSize: "0.78rem", color: "#71717a", textDecoration: "line-through" }}>
                    Rs. 1,500
                  </span>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "1px solid #10b981",
                      color: "#34d399",
                      fontSize: "0.78rem",
                      fontWeight: "900",
                      padding: "2px 8px",
                      borderRadius: "6px"
                    }}
                  >
                    100% FREE (Rs. 0)
                  </span>
                </div>
              </div>
            </div>

            {/* Locked In Cart & WhatsApp Verified Badge */}
            <div
              style={{
                display: "inline-block",
                background: "#18181b",
                border: "1px dashed #d4af37",
                padding: "5px 12px",
                borderRadius: "10px",
                fontSize: "0.72rem",
                color: "#fef08a",
                fontWeight: "800",
                marginBottom: "14px"
              }}
            >
              ✓ Code 7860 Verified • Auto-Locks to Cart &amp; WhatsApp
            </div>

            {/* ACTION BUTTON: "Claim Gift & Shop Now" */}
            <button
              onClick={handleClaimAndShop}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #fef08a 0%, #d4af37 50%, #aa7c11 100%)",
                color: "#18181b",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: "900",
                letterSpacing: "0.5px",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(212,175,55,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.15s ease"
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>🛒</span>
              <span>Claim Gift &amp; Shop Now</span>
            </button>
          </div>
        ) : (
          /* CODE INPUT & NUMERIC KEYPAD VIEW */
          <div>
            {/* 4-DIGIT PIN DISPLAY (SHAKES ON ERROR) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "12px",
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
                      height: "52px",
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

            {/* Error Message (Duplicate Claim Warning / Invalid Code) */}
            {errorMessage && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  fontSize: "0.78rem",
                  fontWeight: "750",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  marginBottom: "12px",
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
                      background:
                        isClear || isBackspace
                          ? "rgba(255,255,255,0.08)"
                          : "linear-gradient(180deg, #27272a 0%, #18181b 100%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: isClear ? "#f87171" : isBackspace ? "#fbbf24" : "#ffffff",
                      fontSize: "1.15rem",
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

            <div style={{ fontSize: "0.72rem", color: "#a1a1aa", marginTop: "6px" }}>
              💡 Hint: Watch our latest TikTok video for the 4-digit code (<b>7860</b>)!
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
