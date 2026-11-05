"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/context/StoreContext";

const ROLLING_VALUES = [100, 200, 300, 400, 500];

export default function ProductDiscountSpinner({
  product,
  currentUnitPrice,
  selectedVariant = "Standard",
  quantity = 1,
  compact = false
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayValue, setDisplayValue] = useState(500);
  const [addedToBag, setAddedToBag] = useState(false);

  const spinIntervalRef = useRef(null);

  const store = useStore() || {};
  const {
    storeConfig = {},
    isVaultUnlocked = false,
    addToCart = () => {},
    globalSpin = null,
    hasUserSpun = false,
    spinTimeLeft = 0,
    executeGlobalSpin = () => ({ discount: 100 })
  } = store;

  const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");

  // Safe client-side mount flag to guarantee 100% hydration match
  useEffect(() => {
    setMounted(true);
  }, []);

  // Format seconds into HH:MM:SS or MM:SS safely
  const formatTime = (totalSecs) => {
    const s = Math.max(0, Number(totalSecs) || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Sync display value with active global spin if exists
  useEffect(() => {
    if (globalSpin && globalSpin.discount) {
      setDisplayValue(globalSpin.discount);
    }
  }, [globalSpin]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  // Render identical static placeholder during SSR and initial hydration to prevent ANY React crash
  if (!mounted) {
    if (compact) {
      return (
        <button
          type="button"
          style={{
            width: "100%",
            padding: "5px 6px",
            fontSize: "0.7rem",
            fontWeight: "800",
            textAlign: "center",
            borderRadius: "8px",
            border: "1.5px solid #d4af37",
            background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            color: "#92400e",
            boxShadow: "0 1px 4px rgba(212, 175, 55, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px"
          }}
        >
          <span>🎁</span>
          <span>🎁 Spin for Discount</span>
        </button>
      );
    }
    return (
      <div style={{ marginTop: "10px", marginBottom: "14px" }}>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "0.82rem",
            fontWeight: "800",
            border: "1.5px solid #d4af37",
            background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            color: "#92400e",
            boxShadow: "0 3px 10px rgba(212, 175, 55, 0.25)"
          }}
        >
          <span>🎁</span>
          <span>🎁 Spin for Discount (Win up to Rs. 500 OFF)</span>
        </button>
      </div>
    );
  }

  // --- CLIENT-ONLY LOGIC (Runs safely after hydration completes) ---

  const isSpunForThisProduct = Boolean(
    globalSpin &&
    globalSpin.productId === product?.id &&
    spinTimeLeft > 0
  );

  const isSpunForOtherProduct = Boolean(
    globalSpin &&
    globalSpin.productId !== product?.id &&
    spinTimeLeft > 0
  );

  // 1. STRICT USER RULE: If user has already spun, button MUST disappear on all other products
  if (isSpunForOtherProduct) {
    if (compact) {
      return null;
    }
    return (
      <div style={{ marginTop: "8px", marginBottom: "12px", fontSize: "0.74rem", color: "#059669", fontWeight: "700" }}>
        ✓ 1-Hour Lucky Voucher Active (-Rs. {globalSpin.discount} applied to order)
      </div>
    );
  }

  // 2. STRICT USER RULE: If spin has already been used and expired, disappear completely
  if (hasUserSpun && (!globalSpin || spinTimeLeft <= 0)) {
    return null;
  }

  // Interactive 2.0-Second Spin with strict weighted probabilities
  const handleStartSpin = () => {
    if (isSpinning || hasUserSpun) return;
    setIsSpinning(true);

    const startTime = Date.now();
    const duration = 2000; // Exactly 2.0 seconds

    spinIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const randIdx = Math.floor(Math.random() * ROLLING_VALUES.length);
      setDisplayValue(ROLLING_VALUES[randIdx]);

      if (elapsed >= duration) {
        clearInterval(spinIntervalRef.current);

        try {
          const wonData = executeGlobalSpin(product);
          setDisplayValue(wonData?.discount || 100);
        } catch (err) {
          console.warn("Spin execution error:", err);
          setDisplayValue(100);
        }
        setIsSpinning(false);
      }
    }, 65);
  };

  const unitPrice = Number(currentUnitPrice) || Number(product?.price) || 0;
  const activeDiscount = isSpunForThisProduct ? Number(globalSpin?.discount) || 0 : 0;
  const finalPrice = Math.max(0, unitPrice - activeDiscount);

  const vaultLine = isVaultUnlocked
    ? `\n🎁 VIP VAULT REWARD: +1 FREE 30ml Luxury Perfume Applied (Secret Code: 7860 Verified)`
    : "";

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Zargul Collection!\nI spun the Lucky Wheel for *${product?.title}* and won a verified 1-hour voucher:\n• Product: ${product?.title}\n• Option / Size: ${selectedVariant}\n• Quantity: ${quantity}x\n• Regular Price: Rs. ${unitPrice.toLocaleString()}\n🎉 Lucky Voucher Won: -Rs. ${activeDiscount.toLocaleString()} OFF\n🔥 Final Bargain Price: Rs. ${finalPrice.toLocaleString()} (Cash on Delivery)${vaultLine}\n⏳ Claimed within 1-hour offer window! Please confirm dispatch.`
  );

  const handleAddToCartWithDiscount = () => {
    if (!product) return;
    addToCart(product, `${selectedVariant}`, 0, quantity);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <>
      {/* VISIBLE "🎁 Spin for Discount" TRIGGER BUTTON */}
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
            border: isSpunForThisProduct ? "1.5px solid #10b981" : "1.5px solid #d4af37",
            background: isSpunForThisProduct
              ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
              : "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            color: isSpunForThisProduct ? "#065f46" : "#92400e",
            boxShadow: "0 1px 4px rgba(212, 175, 55, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "all 0.15s ease"
          }}
          title={isSpunForThisProduct ? `Active Voucher: Rs. ${globalSpin?.discount} OFF` : "Spin for instant discount on this item"}
        >
          <span>{isSpunForThisProduct ? "🎉" : "🎁"}</span>
          <span>
            {isSpunForThisProduct
              ? `Rs. ${globalSpin?.discount} OFF (${formatTime(spinTimeLeft)})`
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
              border: isSpunForThisProduct ? "1.5px solid #10b981" : "1.5px solid #d4af37",
              background: isSpunForThisProduct
                ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
                : "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
              color: isSpunForThisProduct ? "#065f46" : "#92400e",
              boxShadow: isSpunForThisProduct
                ? "0 3px 10px rgba(16, 185, 129, 0.2)"
                : "0 3px 10px rgba(212, 175, 55, 0.25)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease"
            }}
          >
            <span>{isSpunForThisProduct ? "🎉" : "🎁"}</span>
            <span>
              {isSpunForThisProduct
                ? `Rs. ${globalSpin?.discount} OFF Active (${formatTime(spinTimeLeft)} left) • View Voucher`
                : "🎁 Spin for Discount (Win up to Rs. 500 OFF)"}
            </span>
          </button>
        </div>
      )}

      {/* TINY SPIN & WIN MODAL */}
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
                  : isSpunForThisProduct
                  ? "2px solid #22c55e"
                  : "2px solid #d4af37",
                padding: "12px 10px",
                boxShadow: isSpinning
                  ? "0 0 20px rgba(254, 240, 138, 0.7)"
                  : isSpunForThisProduct
                  ? "0 0 18px rgba(34, 197, 94, 0.45)"
                  : "0 0 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ fontSize: "0.65rem", fontWeight: "700", color: isSpinning ? "#fef08a" : isSpunForThisProduct ? "#86efac" : "#d4af37", textTransform: "uppercase", letterSpacing: "1px" }}>
                {isSpinning ? "🎰 ROLLING NUMBERS..." : isSpunForThisProduct ? "🎉 DISCOUNT WON!" : "POTENTIAL REWARD"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.85rem",
                  fontWeight: "900",
                  color: isSpinning ? "#fef08a" : isSpunForThisProduct ? "#ffffff" : "#d4af37",
                  marginTop: "3px",
                  lineHeight: 1.1,
                  transform: isSpinning ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.08s ease"
                }}
              >
                Rs. {displayValue} OFF
              </div>
            </div>

            {/* ACTIONS & 1-HOUR TIMER STATE */}
            {isSpinning ? (
              <div style={{ fontSize: "0.72rem", color: "#fef08a", margin: "8px 0", fontWeight: "700" }}>
                ⚡ Spinning for 2 seconds... Good luck!
              </div>
            ) : isSpunForThisProduct ? (
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: "900", color: "#86efac", marginBottom: "6px" }}>
                  🎉 You won Rs. {globalSpin?.discount} OFF!
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
                    -Rs. {globalSpin?.discount}
                  </span>
                  <span style={{ color: "#fef08a", fontWeight: "900", fontSize: "0.92rem" }}>
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                </div>

                {/* 1-HOUR (60 MINUTE) DIGITAL COUNTDOWN TIMER */}
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
                      {formatTime(spinTimeLeft)}
                    </span>
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: "0.66rem", color: "#fecaca", lineHeight: 1.25, fontWeight: "600" }}>
                    Hurry! Order via WhatsApp before the timer runs out to claim this discount!
                  </p>
                </div>

                {/* WHATSAPP & CART INTEGRATION */}
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
                    <span>💬 Order on WhatsApp (-Rs. {globalSpin?.discount})</span>
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
                  Tap below to roll the lucky wheel. Limit 1 spin per customer across the website!
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
