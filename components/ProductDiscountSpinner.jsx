"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/context/StoreContext";

const EXACT_DISCOUNTS = [100, 200, 300, 400, 500];

export default function ProductDiscountSpinner({
  product,
  currentUnitPrice,
  selectedVariant = "Standard",
  quantity = 1,
  compact = false
}) {
  const { storeConfig, isVaultUnlocked, addToCart } = useStore();
  const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");

  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayValue, setDisplayValue] = useState(500);
  const [wonDiscount, setWonDiscount] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [timerActive, setTimerActive] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const spinIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const storageKey = product?.id ? `zargul_lucky_spin_${product.id}` : null;

  // Restore active won discount from session storage if valid
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

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Interactive 2.0-Second Spin
  const handleStartSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const startTime = Date.now();
    const duration = 2000; // Exactly 2 seconds

    spinIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const randIdx = Math.floor(Math.random() * EXACT_DISCOUNTS.length);
      setDisplayValue(EXACT_DISCOUNTS[randIdx]);

      if (elapsed >= duration) {
        clearInterval(spinIntervalRef.current);

        // Fairly lands on one of: Rs. 100, 200, 300, 400, or 500 (STRICTLY MAX 500)
        const finalVal = EXACT_DISCOUNTS[Math.floor(Math.random() * EXACT_DISCOUNTS.length)];

        setDisplayValue(finalVal);
        setWonDiscount(finalVal);
        setIsSpinning(false);
        setTimeLeft(600); // 10 minutes (600s)
        setTimerActive(true);

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
    }, 65);
  };

  const unitPrice = Number(currentUnitPrice) || Number(product?.price) || 0;
  const finalPrice = Math.max(0, unitPrice - (wonDiscount || 0));

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  // WhatsApp message ONLY includes discount if user explicitly spun & won
  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI spun the Lucky Wheel for *${product?.title}* and won a verified discount:\n• Product: ${product?.title}\n• Option / Size: ${selectedVariant}\n• Quantity: ${quantity}x\n• Regular Price: Rs. ${unitPrice.toLocaleString()}\n🎉 Won Discount Voucher: -Rs. ${(wonDiscount || 0).toLocaleString()} OFF\n🔥 Final Bargain Price: Rs. ${finalPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\n⏳ Claimed within 10-minute timer! Please confirm my order.`
  );

  const handleAddToCartWithDiscount = () => {
    if (!product) return;
    addToCart(product, `${selectedVariant} (🎁 Rs. ${wonDiscount} Voucher Applied)`, -(wonDiscount || 0), quantity);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2200);
  };

  return (
    <>
      {/* 1. VISIBLE "🎁 Spin for Discount" TRIGGER BUTTON */}
      {compact ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
          style={{
            width: "100%",
            padding: "5px 6px",
            fontSize: "0.7rem",
            fontWeight: "800",
            textAlign: "center",
            borderRadius: "8px",
            cursor: "pointer",
            border: wonDiscount ? "1.5px solid #10b981" : "1.5px solid #d4af37",
            background: wonDiscount
              ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
              : "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            color: wonDiscount ? "#065f46" : "#92400e",
            boxShadow: "0 1px 4px rgba(212, 175, 55, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "all 0.15s ease"
          }}
          title="Spin for instant discount on this item"
        >
          <span>{wonDiscount ? "🎉" : "🎁"}</span>
          <span>
            {wonDiscount
              ? `Rs. ${wonDiscount} OFF (${formatTime(timeLeft)})`
              : "🎁 Spin for Discount"}
          </span>
        </button>
      ) : (
        <div style={{ marginTop: "10px", marginBottom: "14px" }}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: "0.82rem",
              fontWeight: "800",
              cursor: "pointer",
              border: wonDiscount ? "1.5px solid #10b981" : "1.5px solid #d4af37",
              background: wonDiscount
                ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
                : "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
              color: wonDiscount ? "#065f46" : "#92400e",
              boxShadow: wonDiscount
                ? "0 3px 10px rgba(16, 185, 129, 0.2)"
                : "0 3px 10px rgba(212, 175, 55, 0.25)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease"
            }}
          >
            <span>{wonDiscount ? "🎉" : "🎁"}</span>
            <span>
              {wonDiscount
                ? `Rs. ${wonDiscount} OFF Active (${formatTime(timeLeft)}) • View Voucher`
                : "🎁 Spin for Discount (Win up to Rs. 500 OFF)"}
            </span>
          </button>
        </div>
      )}

      {/* 2. TINY SPIN & WIN MODAL */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.8)",
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
              border: "1.5px solid rgba(212, 175, 55, 0.65)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 25px rgba(212, 175, 55, 0.25)",
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

            {/* HEADER */}
            <div style={{ fontSize: "0.68rem", fontWeight: "900", color: "#fef08a", letterSpacing: "1.2px", textTransform: "uppercase" }}>
              👑 LUCKY BARGAIN SPINNER
            </div>
            <div style={{ fontSize: "0.75rem", color: "#a1a1aa", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "260px", margin: "2px auto 0" }}>
              {product?.title}
            </div>

            {/* ANIMATED ROLLING REEL BOX */}
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
                  ? "0 0 20px rgba(254, 240, 138, 0.7)"
                  : wonDiscount
                  ? "0 0 18px rgba(34, 197, 94, 0.45)"
                  : "0 0 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontSize: "0.65rem", fontWeight: "700", color: isSpinning ? "#fef08a" : wonDiscount ? "#86efac" : "#d4af37", textTransform: "uppercase", letterSpacing: "1px" }}>
                {isSpinning ? "🎰 ROLLING NUMBERS..." : wonDiscount ? "🎉 DISCOUNT WON!" : "POTENTIAL REWARD"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.85rem",
                  fontWeight: "900",
                  color: isSpinning ? "#fef08a" : wonDiscount ? "#ffffff" : "#d4af37",
                  marginTop: "3px",
                  lineHeight: 1.1,
                  transform: isSpinning ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.08s ease"
                }}
              >
                Rs. {displayValue} OFF
              </div>
            </div>

            {/* ACTIONS & TIMER STATE */}
            {isSpinning ? (
              <div style={{ fontSize: "0.72rem", color: "#fef08a", margin: "8px 0", fontWeight: "700" }}>
                ⚡ Spinning for 2 seconds... Good luck!
              </div>
            ) : wonDiscount ? (
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: "900", color: "#86efac", marginBottom: "6px" }}>
                  🎉 You won Rs. {wonDiscount} OFF!
                </div>

                {/* PRICE BREAKDOWN STRIP */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "7px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.74rem",
                    marginBottom: "10px"
                  }}
                >
                  <span style={{ color: "#a1a1aa", textDecoration: "line-through" }}>
                    Rs. {unitPrice.toLocaleString()}
                  </span>
                  <span style={{ color: "#ef4444", fontWeight: "800" }}>
                    -Rs. {wonDiscount}
                  </span>
                  <span style={{ color: "#fef08a", fontWeight: "900", fontSize: "0.92rem" }}>
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                </div>

                {/* 3. VISIBLE 10-MINUTE DIGITAL COUNTDOWN TIMER */}
                <div
                  style={{
                    background: "rgba(220, 38, 38, 0.18)",
                    border: "1.5px solid rgba(239, 68, 68, 0.5)",
                    borderRadius: "12px",
                    padding: "8px 10px",
                    marginBottom: "12px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#fca5a5", fontSize: "0.72rem", fontWeight: "800" }}>
                    <span>⏳ OFFER EXPIRES IN:</span>
                    <span style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: "900", color: "#ffffff", background: "#b91c1c", padding: "2px 8px", borderRadius: "6px" }}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: "0.66rem", color: "#fecaca", lineHeight: 1.25, fontWeight: "600" }}>
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
                      padding: "10px 14px",
                      fontSize: "0.82rem",
                      fontWeight: "800",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
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
                <p style={{ fontSize: "0.72rem", color: "#d4d4d8", margin: "6px 0 12px", lineHeight: 1.3 }}>
                  Tap below to roll the digital lucky wheel. Win Rs. 100 to Rs. 500 OFF instantly!
                </p>
                <button
                  type="button"
                  onClick={handleStartSpin}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
                    color: "#000000",
                    border: "none",
                    borderRadius: "12px",
                    padding: "11px 16px",
                    fontSize: "0.88rem",
                    fontWeight: "900",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(212, 175, 55, 0.45)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  🎰 SPIN TO WIN (2 SECONDS)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
