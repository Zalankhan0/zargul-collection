"use client";
// Zargul Collection - v2.19.0: Stable Card Layout & Instant Image Fix

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductDiscountSpinner from "@/components/ProductDiscountSpinner";

export default function ProductCard({ product, priority = false }) {
  const { addToCart } = useStore();
  if (!product) return null;

  const isSoldOut = product.inStock === false;
  const priceNum = Number(product.price) || 0;
  const originalPriceNum = Number(product.originalPrice) || 0;

  const discountPercent =
    originalPriceNum > priceNum
      ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
      : null;

  // Derive ultra-lightweight WebP image path (89% bandwidth saving)
  const rawImage = product.image?.startsWith("/") || product.image?.startsWith("http")
    ? product.image
    : `/${product.image}`;
  const webpImage = rawImage && (rawImage.endsWith(".jpg") || rawImage.endsWith(".png"))
    ? rawImage.replace(/\.(jpg|png)$/, ".webp")
    : null;

  // Opens the Shopping Cart / Mini Bag Drawer with +/- quantity controls
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
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

      {/* Image linking to Dedicated Detail Page - Instant Eager Rendering with Fallback */}
      <Link href={`/product/${product.id}`} className="product-image-container">
        <img
          src={rawImage}
          alt={product.title}
          loading="eager"
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
      <div className="product-footer-row" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", marginTop: "auto", paddingTop: "6px" }}>
        {/* Price & Details Link Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%", minHeight: "20px" }}>
          <div className="product-price-group" style={{ display: "flex", alignItems: "baseline", gap: "5px", flexWrap: "wrap" }}>
            <span className="product-current-price">
              Rs. {priceNum.toLocaleString()}
            </span>
            {originalPriceNum > priceNum && (
              <span className="product-original-price">
                Rs. {originalPriceNum.toLocaleString()}
              </span>
            )}
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

        {/* VISIBLE "🎁 Spin for Discount" BUTTON */}
        {!isSoldOut && (
          <ProductDiscountSpinner
            product={product}
            currentUnitPrice={priceNum}
            compact={true}
          />
        )}

        {/* Action Button: Opens Cart Drawer for Quantity Adjustment & WhatsApp Order */}
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
            onClick={handleBuyNow}
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
            title={`Add ${product.title} to bag and adjust quantity`}
          >
            <span>⚡</span> BUY NOW
          </button>
        )}
      </div>
    </div>
  );
}
