"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }) {
  const { storeConfig, showToast } = useStore();
  if (!product) return null;

  const isSoldOut = product.inStock === false;
  const priceNum = Number(product.price) || 0;
  const originalPriceNum = Number(product.originalPrice) || 0;

  const discountPercent =
    originalPriceNum > priceNum
      ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
      : null;

  // Direct 1-Click WhatsApp Order (No long popups or confusing menus)
  const handleDirectBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;
    const waNumber = (storeConfig?.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");

    let msg = `🛍️ *DIRECT 1-CLICK ORDER (ZARGUL COLLECTION)*\n`;
    msg += `*Order Ref:* ${orderId}\n\n`;
    msg += `• *Product:* ${product.title}\n`;
    if (product.category) msg += `• *Category:* ${product.category}\n`;
    msg += `• *Price:* Rs. ${priceNum.toLocaleString()}\n`;
    msg += `• *Delivery:* Free Cash on Delivery Nationwide 🇵🇰\n\n`;
    msg += `Assalam o Alaikum! Mujhe yeh product order karna hai. Kindly dispatch confirmation share karein. ✨`;

    showToast(`Opening WhatsApp for "${product.title}"...`);

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className={`product-card clay-card white ${isSoldOut ? "sold-out" : ""}`}>
      {/* Badge */}
      {isSoldOut ? (
        <span className="product-badge sold-out">Sold Out</span>
      ) : product.tag ? (
        <span className={`product-badge ${product.badgeType || "sale"}`}>{product.tag}</span>
      ) : discountPercent ? (
        <span className="product-badge sale">{discountPercent}% OFF</span>
      ) : null}

      {/* Image linking to Dedicated Detail Page */}
      <Link href={`/product/${product.id}`} className="product-image-container">
        <img
          src={product.image?.startsWith("/") || product.image?.startsWith("http") ? product.image : `/${product.image}`}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "/assets/logo.jpg";
          }}
        />
      </Link>

      {/* Meta Row */}
      <div className="product-meta-row">
        <span className="product-category-name">{product.category}</span>
        <div className="product-rating-box">
          <span>★</span>
          <span>{product.rating || "5.0"}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="product-title">
        <Link href={`/product/${product.id}`}>{product.title}</Link>
      </h3>

      {/* Price & Action Footer */}
      <div className="product-footer-row" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", marginTop: "auto", paddingTop: "8px" }}>
        {/* Price & Details Link Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%" }}>
          <div className="product-price-group">
            {originalPriceNum > priceNum && (
              <span className="product-original-price">
                Rs. {originalPriceNum.toLocaleString()}
              </span>
            )}
            <span className="product-current-price">
              Rs. {priceNum.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/product/${product.id}`}
            style={{
              fontSize: "0.68rem",
              color: "var(--color-accent-dark)",
              fontWeight: "600",
              textDecoration: "none",
              whiteSpace: "nowrap"
            }}
          >
            Details →
          </Link>
        </div>

        {/* Direct Action Button: Instant 1-Click WhatsApp Order */}
        {isSoldOut ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "0.72rem",
              fontWeight: "700",
              color: "#8c8288",
              padding: "6px 8px",
              background: "#f0edf1",
              borderRadius: "10px"
            }}
          >
            Sold Out
          </div>
        ) : (
          <button
            type="button"
            onClick={handleDirectBuy}
            className="clay-btn accent card-btn-buy"
            style={{
              width: "100%",
              padding: "7px 6px",
              fontSize: "0.75rem",
              fontWeight: "750",
              textAlign: "center",
              borderRadius: "10px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              background: "linear-gradient(135deg, #c5a059 0%, #a8833e 100%)",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 2px 8px rgba(197, 160, 89, 0.28)",
              transition: "transform 0.15s ease"
            }}
            title={`Order ${product.title} directly via WhatsApp`}
          >
            <span>⚡</span> BUY NOW
          </button>
        )}
      </div>
    </div>
  );
}
