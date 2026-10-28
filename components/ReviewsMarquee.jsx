"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function ReviewsMarquee() {
  const { reviews } = useStore();
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <section className="reviews-section-single-line">
      <div className="section-header-center">
        <span className="hero-tag">✦ Client Trust & Heritage</span>
        <h2 className="section-title">Verified Customer Experiences</h2>
        <p className="section-subtitle">
          Over 15,000+ satisfied clients across Karachi, Lahore, Islamabad, Peshawar, and beyond.
        </p>
      </div>

      {/* STRICTLY 1-LINE HORIZONTAL TRACK (NO STACKING) */}
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
              <span className="review-product-tag">Verified Purchase • {r.product || "Collection"}</span>
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
              <span className="review-product-tag">Verified Purchase • {r.product || "Collection"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
