"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const { products, addToCart, setIsCartOpen, storeConfig, showToast } = useStore();

  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId) || products[0];

  // Dynamic Variants based on Category
  const getVariantsForProduct = (prod) => {
    if (prod.category === "Shoes") {
      return [
        { name: "Size EU 39", extra: 0 },
        { name: "Size EU 40", extra: 0 },
        { name: "Size EU 41", extra: 0 },
        { name: "Size EU 42 (Standard)", extra: 0 },
        { name: "Size EU 43", extra: 0 },
        { name: "Size EU 44", extra: 0 }
      ];
    } else if (prod.category === "Wascot") {
      return [
        { name: "Small (S)", extra: 0 },
        { name: "Medium (M)", extra: 0 },
        { name: "Large (L)", extra: 0 },
        { name: "Extra Large (XL)", extra: 0 }
      ];
    } else if (prod.category === "Fragrances" || prod.category === "Perfumes") {
      return [
        { name: "100ml Standard Box", extra: 0 },
        { name: "Luxury Velvet Gift Box (+Rs. 500)", extra: 500 }
      ];
    } else if (prod.category === "Bags" || prod.category === "Handbags") {
      return [
        { name: "Signature Velvet Dust Bag", extra: 0 },
        { name: "Royal Velvet Gift Box (+Rs. 500)", extra: 500 }
      ];
    } else {
      // Timepieces / Default
      return [
        { name: "Standard Presentation Box", extra: 0 },
        { name: "Royal Velvet Wooden Box (+Rs. 500)", extra: 500 }
      ];
    }
  };

  const variants = getVariantsForProduct(product);
  const [selectedVariant, setSelectedVariant] = useState(variants[0].name);
  const [selectedExtraPrice, setSelectedExtraPrice] = useState(variants[0].extra);
  const [quantity, setQuantity] = useState(1);
  const [zoomActive, setZoomActive] = useState(false);

  // Discount calculation
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const currentUnitPrice = product.price + selectedExtraPrice;
  const totalPrice = currentUnitPrice * quantity;
  const isSoldOut = product.inStock === false;

  // Related Products (same category or top featured)
  const isFragrance = (cat) => cat?.toLowerCase() === "fragrances" || cat?.toLowerCase() === "perfumes";
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || (isFragrance(p.category) && isFragrance(product.category))))
    .slice(0, 4);

  // Direct WhatsApp "Buy Now" handler
  const handleBuyNowWhatsApp = () => {
    const waNumber = (storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const orderId = `#ZRG-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `🛍️ *INSTANT ORDER INQUIRY (CASH ON DELIVERY)*\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Product:* ${product.title}\n`;
    msg += `*Option / Size:* ${selectedVariant}\n`;
    msg += `*Quantity:* ${quantity}x\n`;
    msg += `*Total Amount:* Rs. ${totalPrice.toLocaleString()} (COD)\n\n`;
    msg += `Please confirm availability and dispatch to my doorstep! ✨`;

    showToast("Opening WhatsApp Concierge...");
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="product-detail-container">
      
      {/* Breadcrumbs */}
      <nav className="detail-breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/categories?category=${product.category.toLowerCase()}`}>{product.category}</Link>
        <span>/</span>
        <span style={{ color: "var(--color-text-dark)", fontWeight: "600" }}>{product.title}</span>
      </nav>

      <div className="detail-grid">
        
        {/* Left Column: High-Res Zoomable Image Gallery */}
        <div className="detail-gallery-col">
          <div 
            className="detail-main-image-card clay-card white"
            onClick={() => setZoomActive(!zoomActive)}
            title="Click to toggle zoom"
          >
            {isSoldOut ? (
              <span className="product-badge sold-out">Sold Out</span>
            ) : product.tag ? (
              <span className={`product-badge ${product.badgeType || "sale"}`}>{product.tag}</span>
            ) : discountPercent ? (
              <span className="product-badge sale">{discountPercent}% OFF</span>
            ) : null}

            <img
              src={product.image?.startsWith("/") || product.image?.startsWith("http") ? product.image : `/${product.image}`}
              alt={product.title}
              style={{
                transform: zoomActive ? "scale(1.35)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)"
              }}
              onError={(e) => {
                e.currentTarget.src = "/assets/logo.jpg";
              }}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            🔍 Click image to toggle high-res zoom view
          </div>
        </div>

        {/* Right Column: Complete Product Details */}
        <div className="detail-info-col">
          
          <div className="detail-tag-row">
            <span style={{ fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-accent-dark)", background: "var(--pastel-pink)", padding: "4px 12px", borderRadius: "12px" }}>
              {product.category}
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: "600", color: isSoldOut ? "#b71c1c" : "#2b700f" }}>
              {isSoldOut ? "✕ Out of Stock" : "● In Stock — Dispatched in 24 Hours"}
            </span>
          </div>

          <h1 className="detail-title">{product.title}</h1>

          {/* Star Rating & Review Count */}
          <div className="detail-rating-row">
            <span style={{ color: "#ffb400", fontSize: "1.1rem" }}>{"★".repeat(5)}</span>
            <span style={{ fontWeight: "700" }}>{product.rating || "5.0"}</span>
            <span style={{ color: "var(--color-text-muted)" }}>
              ({product.reviewsCount || 142} verified customer reviews)
            </span>
          </div>

          {/* Price Box */}
          <div className="detail-price-box">
            <div>
              <span style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "var(--color-text-muted)", display: "block" }}>
                Special Cash on Delivery Price
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "2px" }}>
                <span className="detail-current-price">
                  Rs. {currentUnitPrice.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "var(--color-text-muted)" }}>
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {discountPercent && (
              <span className="detail-discount-tag">
                Save {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Detailed Luxury Description */}
          <p className="detail-desc">{product.description}</p>

          {/* Dynamic Variant Selector */}
          <div className="variant-selector-group">
            <span className="variant-label-title">
              {product.category === "Shoes"
                ? "Select Footwear Size (EU):"
                : product.category === "Wascot"
                ? "Select Coat / Wascot Size:"
                : "Select Presentation Packaging:"}
            </span>

            <div className="variant-pills-row">
              {variants.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => {
                    setSelectedVariant(v.name);
                    setSelectedExtraPrice(v.extra);
                  }}
                  className={`variant-pill ${selectedVariant === v.name ? "active" : ""}`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>Quantity:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                className="clay-icon-btn"
                style={{ width: "36px", height: "36px" }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span style={{ fontSize: "1.1rem", fontWeight: "700", minWidth: "24px", textAlign: "center" }}>
                {quantity}
              </span>
              <button
                className="clay-icon-btn"
                style={{ width: "36px", height: "36px" }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
            <button
              disabled={isSoldOut}
              onClick={() => addToCart(product, selectedVariant, selectedExtraPrice, quantity)}
              className="clay-btn accent"
              style={{ flex: 1, minWidth: "200px" }}
            >
              {isSoldOut ? "Sold Out" : "Add to Bag ✦"}
            </button>

            <button
              disabled={isSoldOut}
              onClick={handleBuyNowWhatsApp}
              className="clay-btn secondary"
              style={{ flex: 1, minWidth: "200px", background: "#e8f8ec", borderColor: "#a3e4b0", color: "#18772a" }}
            >
              💬 Buy Now on WhatsApp
            </button>
          </div>

          {/* Complete Specifications Table */}
          {product.specs && (
            <div className="specs-table-card clay-card white">
              <h3 className="specs-title">Luxury Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ textTransform: "capitalize" }}>
                        {key.replace(/([A-Z])/g, " $1")}
                      </td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="trust-badges-grid">
            <div className="trust-badge-item">
              <span style={{ fontSize: "1.4rem", display: "block" }}>🇵🇰</span>
              Cash on Delivery All Pakistan
            </div>
            <div className="trust-badge-item">
              <span style={{ fontSize: "1.4rem", display: "block" }}>🛡️</span>
              7-Day Doorstep Exchange
            </div>
            <div className="trust-badge-item">
              <span style={{ fontSize: "1.4rem", display: "block" }}>🎁</span>
              Royal Velvet Gift Box
            </div>
          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "80px", paddingTop: "50px", borderTop: "2px solid rgba(0,0,0,0.06)" }}>
          <div className="section-header-row">
            <div>
              <span className="hero-tag">✦ You May Also Admire</span>
              <h2 className="section-title">Similar Creations</h2>
            </div>
            <Link href="/categories" className="clay-btn secondary" style={{ fontSize: "0.82rem" }}>
              Explore All →
            </Link>
          </div>

          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
