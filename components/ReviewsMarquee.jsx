"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function ReviewsMarquee() {
  const { reviews } = useStore();
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <section className="reviews-section-single-line" style={{ padding: "24px 0 16px" }}>
      <div className="section-header-center" style={{ marginBottom: "12px", textAlign: "center" }}>
        <span className="hero-tag" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>✦ Client Trust & Heritage</span>
        <h2 className="section-title" style={{ fontSize: "1.2rem", margin: "3px 0 2px" }}>Verified Customer Experiences</h2>
        <p className="section-subtitle" style={{ fontSize: "0.75rem", margin: "0 auto", color: "var(--color-text-muted)" }}>
          Over 15,000+ satisfied clients across Pakistan.
        </p>
      </div>

      {/* STRICTLY 1-LINE HORIZONTAL TRACK (COMPACT & SLENDER) */}
      <div className="single-line-marquee-wrap">
        <div className="single-line-marquee-track">
          {safeReviews.map((r, index) => (
            <div key={`rev-1-${index}`} className="review-card-item">
              <div>
                <div className="review-header-row">
                  <div className="review-user-info">
                    <div className="review-avatar-circle">{(r.name || "C").charAt(0)}</div>
                    <div>
                      <h4 className="review-name">{r.name || "Customer"}</h4>
                      <span className="review-city">✦ {r.city || "Pakistan"}</span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {"★".repeat(Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))))}
                  </div>
                </div>
                <p className="review-comment-text">{r.text}</p>
              </div>
              <span className="review-product-tag">Verified • {r.product || "Collection"}</span>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite marquee scroll */}
        <div className="single-line-marquee-track" aria-hidden="true">
          {safeReviews.map((r, index) => (
            <div key={`rev-2-${index}`} className="review-card-item">
              <div>
                <div className="review-header-row">
                  <div className="review-user-info">
                    <div className="review-avatar-circle">{(r.name || "C").charAt(0)}</div>
                    <div>
                      <h4 className="review-name">{r.name || "Customer"}</h4>
                      <span className="review-city">✦ {r.city || "Pakistan"}</span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {"★".repeat(Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))))}
                  </div>
                </div>
                <p className="review-comment-text">{r.text}</p>
              </div>
              <span className="review-product-tag">Verified • {r.product || "Collection"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
