"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/context/StoreContext";

const POSSIBLE_DISCOUNTS = [100, 200, 300, 400, 500];

export default function ProductDiscountSpinner({
  product,
  currentUnitPrice,
  selectedVariant = "Standard",
  quantity = 1
}) {
  const { storeConfig, isVaultUnlocked, addToCart } = useStore();
  const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");

  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayValue, setDisplayValue] = useState(300);
  const [wonDiscount, setWonDiscount] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600s
  const [timerActive, setTimerActive] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const spinIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const storageKey = product?.id ? `zargul_bargain_${product.id}` : null;

  // Restore existing won discount from session if valid
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;

    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.discount && parsed.expiresAt) {
          const remainingSec = Math.floor((parsed.expiresAt - Date.now()) / 1000);
          if (remainingSec > 0) {
            setWonDiscount(parsed.discount);
            setDisplayValue(parsed.discount);
            setTimeLeft(remainingSec);
            setTimerActive(true);
          } else {
            sessionStorage.removeItem(storageKey);
          }
        }
      }
    } catch (e) {}
  }, [storageKey]);

  // 10-Minute Countdown Timer
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      return;
    }

    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          setTimerActive(false);
          setWonDiscount(null);
          if (storageKey) {
            try {
              sessionStorage.removeItem(storageKey);
            } catch (e) {}
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [timerActive, timeLeft, storageKey]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Trigger 2-second roll
  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const startTime = Date.now();
    const duration = 2000; // Exactly 2 seconds

    spinIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const randIdx = Math.floor(Math.random() * POSSIBLE_DISCOUNTS.length);
      setDisplayValue(POSSIBLE_DISCOUNTS[randIdx]);

      if (elapsed >= duration) {
        clearInterval(spinIntervalRef.current);

        // Pick one of the EXACT 5 values: Rs. 100, 200, 300, 400, or 500
        // (Weighted towards 200, 300, 400, 500 for customer delight, strictly max 500)
        const finalPool = [200, 300, 300, 400, 400, 500];
        const finalVal = finalPool[Math.floor(Math.random() * finalPool.length)];

        setDisplayValue(finalVal);
        setWonDiscount(finalVal);
        setIsSpinning(false);
        setTimeLeft(600); // 10 minutes
        setTimerActive(true);

        // Save to sessionStorage
        if (storageKey) {
          try {
            sessionStorage.setItem(
              storageKey,
              JSON.stringify({
                discount: finalVal,
                expiresAt: Date.now() + 600 * 1000
              })
            );
          } catch (e) {}
        }
      }
    }, 75);
  };

  const finalPrice = Math.max(0, currentUnitPrice - (wonDiscount || 0));

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI spun the Lucky Wheel for *${product?.title}* and won a special discount:\n• Product: ${product?.title}\n• Option / Size: ${selectedVariant}\n• Quantity: ${quantity}x\n• Regular Price: Rs. ${currentUnitPrice.toLocaleString()}\n🎉 Lucky Voucher Won: -Rs. ${(wonDiscount || 0).toLocaleString()} OFF\n🔥 Final Bargain Price: Rs. ${finalPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\n⏳ Claimed within 10-minute offer window! Please confirm my order.`
  );

  const handleAddToCartWithDiscount = () => {
    if (!product) return;
    addToCart(product, `${selectedVariant} (🎁 Rs. ${wonDiscount} Voucher Applied)`, -(wonDiscount || 0), quantity);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div style={{ marginTop: "10px", marginBottom: "14px" }}>
      {/* 1. COMPACT "TRY YOUR LUCK" TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          // If not spun yet, immediately auto-roll for delightful instant gratification
          if (!wonDiscount && !isSpinning) {
            startSpin();
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "7px 14px",
          borderRadius: "12px",
          fontSize: "0.78rem",
          fontWeight: "800",
          cursor: "pointer",
          border: wonDiscount
            ? "1.5px solid #10b981"
            : product?.category === "Watches"
            ? "1.5px solid #d4af37"
            : "1.5px solid rgba(212, 175, 55, 0.7)",
          background: wonDiscount
            ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
            : product?.category === "Watches"
            ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)"
            : "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
          color: wonDiscount ? "#065f46" : "#92400e",
          boxShadow: wonDiscount
            ? "0 2px 8px rgba(16, 185, 129, 0.15)"
            : "0 2px 8px rgba(212, 175, 55, 0.2)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease"
        }}
      >
        <span>{wonDiscount ? "🎉" : "🎁"}</span>
        <span>
          {wonDiscount
            ? `Rs. ${wonDiscount} OFF Active (${formatTime(timeLeft)}) • View Voucher`
            : "🎁 Spin for Discount (Up to Rs. 500 OFF)"}
        </span>
      </button>

      {/* 2. TINY SPIN & WIN MODAL */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            boxSizing: "border-box"
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
              borderRadius: "20px",
              border: "1.5px solid rgba(212, 175, 55, 0.6)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.25)",
              padding: "18px 16px 20px",
              color: "#ffffff",
              textAlign: "center",
              boxSizing: "border-box"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE (X) BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Spinner"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease"
              }}
            >
              ✖
            </button>

            {/* HEADER */}
            <div style={{ fontSize: "0.68rem", fontWeight: "800", color: "#fef08a", letterSpacing: "1px", textTransform: "uppercase" }}>
              👑 ZARGUL LUCKY BARGAIN WHEEL
            </div>
            <div style={{ fontSize: "0.75rem", color: "#a1a1aa", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "270px", margin: "2px auto 0" }}>
              {product?.title}
            </div>

            {/* ANIMATED ROLLING SPINNER DISPLAY BOX */}
            <div
              style={{
                margin: "14px auto 12px",
                background: "#000000",
                borderRadius: "14px",
                border: isSpinning
                  ? "2px solid #fef08a"
                  : wonDiscount
                  ? "2px solid #22c55e"
                  : "2px solid #d4af37",
                padding: "12px 10px",
                boxShadow: isSpinning
                  ? "0 0 18px rgba(254, 240, 138, 0.6)"
                  : wonDiscount
                  ? "0 0 18px rgba(34, 197, 94, 0.4)"
                  : "0 0 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontSize: "0.65rem", fontWeight: "700", color: isSpinning ? "#fef08a" : wonDiscount ? "#86efac" : "#d4af37", textTransform: "uppercase", letterSpacing: "1px" }}>
                {isSpinning ? "🎰 ROLLING DISCOUNT..." : wonDiscount ? "🎉 DISCOUNT UNLOCKED!" : "LUCKY VOUCHER"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: "900",
                  color: isSpinning ? "#fef08a" : wonDiscount ? "#ffffff" : "#d4af37",
                  marginTop: "2px",
                  lineHeight: 1.1,
                  transform: isSpinning ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.08s ease"
                }}
              >
                Rs. {displayValue} OFF
              </div>
            </div>

            {/* STATUS / REVEAL TEXT */}
            {isSpinning ? (
              <div style={{ fontSize: "0.7rem", color: "#fef08a", margin: "6px 0" }}>
                Spinning for 2 seconds... Finding your luck! ⚡
              </div>
            ) : wonDiscount ? (
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: "800", color: "#86efac", marginBottom: "6px" }}>
                  🎉 You won Rs. {wonDiscount} OFF!
                </div>

                {/* PRICE BREAKDOWN STRIP */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.72rem",
                    marginBottom: "10px"
                  }}
                >
                  <span style={{ color: "#a1a1aa", textDecoration: "line-through" }}>
                    Rs. {currentUnitPrice.toLocaleString()}
                  </span>
                  <span style={{ color: "#ef4444", fontWeight: "700" }}>
                    -Rs. {wonDiscount}
                  </span>
                  <span style={{ color: "#fef08a", fontWeight: "900", fontSize: "0.88rem" }}>
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                </div>

                {/* 3. FOMO COUNTDOWN TIMER */}
                <div
                  style={{
                    background: "rgba(220, 38, 38, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    borderRadius: "10px",
                    padding: "8px 10px",
                    marginBottom: "12px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#fca5a5", fontSize: "0.72rem", fontWeight: "800" }}>
                    <span>⏳ OFFER EXPIRES IN:</span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#ffffff", background: "#b91c1c", padding: "1px 6px", borderRadius: "6px" }}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "0.64rem", color: "#fecaca", lineHeight: 1.25 }}>
                    Hurry! Order via WhatsApp before the timer runs out to claim this discount!
                  </p>
                </div>

                {/* 4. WHATSAPP & CART INTEGRATION */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <a
                    href={`https://wa.me/${waNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "#ffffff",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      fontSize: "0.8rem",
                      fontWeight: "800",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                      cursor: "pointer"
                    }}
                  >
                    <span>💬 Order on WhatsApp (-Rs. {wonDiscount})</span>
                  </a>

                  <button
                    onClick={handleAddToCartWithDiscount}
                    style={{
                      background: addedToBag
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        : "rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      fontSize: "0.74rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {addedToBag ? "✓ Added to Bag with Discount!" : "🛍️ Add Discounted Item to Bag"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={startSpin}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
                    color: "#000000",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    fontSize: "0.82rem",
                    fontWeight: "900",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(212, 175, 55, 0.4)"
                  }}
                >
                  🎰 Spin Now (Win Up to Rs. 500)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
