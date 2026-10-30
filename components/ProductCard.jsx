"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  if (!product) return null;

  const isSoldOut = product.inStock === false;
  const priceNum = Number(product.price) || 0;
  const originalPriceNum = Number(product.originalPrice) || 0;

  const discountPercent =
    originalPriceNum > priceNum
      ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
      : null;

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
      <div className="product-footer-row">
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

        {isSoldOut ? (
          <span style={{ fontSize: "0.68rem", fontWeight: "700", color: "#8c8288", padding: "4px 8px", background: "#f0edf1", borderRadius: "8px" }}>
            Sold Out
          </span>
        ) : (
          <div className="product-card-actions" style={{ display: "flex", gap: "5px", width: "100%", marginTop: "6px" }}>
            <Link
              href={`/product/${product.id}`}
              className="clay-btn secondary card-btn-details"
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "0.72rem",
                fontWeight: "600",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: "10px",
                whiteSpace: "nowrap"
              }}
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="clay-btn accent card-btn-buy"
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "0.72rem",
                fontWeight: "700",
                textAlign: "center",
                borderRadius: "10px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px"
              }}
              title={`Buy ${product.title}`}
            >
              <span>+</span> Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
