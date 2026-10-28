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
          <button
            disabled
            className="clay-btn secondary"
            style={{
              padding: "8px 16px",
              fontSize: "0.75rem",
              background: "#e2dbdf",
              color: "#8c8288",
              cursor: "not-allowed",
              boxShadow: "none"
            }}
          >
            Sold Out
          </button>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link
              href={`/product/${product.id}`}
              className="clay-btn secondary"
              style={{ padding: "8px 14px", fontSize: "0.75rem" }}
            >
              Details
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="clay-icon-btn"
              style={{ width: "38px", height: "38px" }}
              aria-label={`Add ${product.title} to Bag`}
              title="Add to Shopping Bag"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
