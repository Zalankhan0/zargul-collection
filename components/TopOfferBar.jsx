"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function TopOfferBar() {
  const { storeConfig } = useStore();

  if (!storeConfig.announcement || !storeConfig.announcement.enabled) {
    return null;
  }

  // Concise 18-word clean luxury announcement
  const marqueeText = storeConfig.announcement.text || "✨ Flat 20% OFF on Luxury Watches & French Perfumes • Free Cash on Delivery Across Pakistan • Royal Combo Rs. 1,000 OFF";

  return (
    <div 
      className="top-offer-bar"
      style={{
        background: storeConfig.announcement.bgColor || "linear-gradient(135deg, #f08ea7, #5c3c67)"
      }}
    >
      <div className="marquee-container-single">
        {/* Render duplicate tracks with slow 60s loop */}
        <div 
          className="marquee-track-single"
          style={{ animationDuration: "60s" }}
        >
          <span className="marquee-pill">
            <span className="marquee-pill-tag">OFFER</span>
            <span>{marqueeText}</span>
          </span>
          <span className="marquee-pill">
            <span className="marquee-pill-tag">OFFER</span>
            <span>{marqueeText}</span>
          </span>
        </div>

        <div 
          className="marquee-track-single" 
          aria-hidden="true"
          style={{ animationDuration: "60s" }}
        >
          <span className="marquee-pill">
            <span className="marquee-pill-tag">OFFER</span>
            <span>{marqueeText}</span>
          </span>
          <span className="marquee-pill">
            <span className="marquee-pill-tag">OFFER</span>
            <span>{marqueeText}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
