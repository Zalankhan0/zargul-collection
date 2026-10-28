"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { storeConfig, showToast } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const waNumber = (storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "");
    const msg = `💬 *DIRECT CONCIERGE INQUIRY*\n*From:* ${name}\n*Phone:* ${phone}${subject ? `\n*Subject:* ${subject}` : ""}\n*Message:* ${message}`;
    showToast("Opening WhatsApp Concierge...");
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const contactItems = [
    {
      icon: "💬",
      bg: "#e8f8ec",
      label: "WhatsApp Concierge (Fastest)",
      text: "Instant answers and personalized order support.",
      detail: "+92 348 5245955 →",
      href: `https://wa.me/${(storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "")}?text=Hello%20Zargul%20Collection,%20I%20need%20assistance.`
    },
    {
      icon: "✉️",
      bg: "#eef6fc",
      label: "Email Support",
      text: "For corporate bulk orders and formal inquiries.",
      detail: "zargulcollection1@gmail.com →",
      href: "mailto:zargulcollection1@gmail.com"
    },
    {
      icon: "📞",
      bg: "#fcebed",
      label: "Direct Helpline",
      text: "Available Monday – Saturday, 9:00 AM – 10:00 PM PKT.",
      detail: "+92 348 5245955 →",
      href: "tel:+923485245955"
    },
    {
      icon: "📍",
      bg: "#f4eef8",
      label: "Flagship Showroom",
      text: "Zargul Collection, Main Barikot Bazar, Swat, KPK, Pakistan.",
      detail: null,
      href: null
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto 80px", padding: "0 5%" }}>

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px" }}>
        <span className="hero-tag">✦ Direct Concierge</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: "700", margin: "12px 0" }}>
          We&apos;d Love to Connect
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
          Whether you require assistance choosing between our luxury watch editions or desire personalized fragrance notes, our VIP support team is ready to assist you.
        </p>
      </div>

      {/* Contact Cards + Form Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px", marginBottom: "50px" }}>

        {/* Contact Info Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {contactItems.map((item, idx) => (
            <div
              key={idx}
              className="clay-card white"
              style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "14px",
                background: item.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "1.4rem", flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: "700", margin: "0 0 4px" }}>
                  {item.label}
                </h4>
                <p style={{ fontSize: "0.83rem", color: "var(--color-text-muted)", margin: "0 0 4px", lineHeight: "1.5" }}>
                  {item.text}
                </p>
                {item.detail && item.href && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--color-accent-dark)" }}
                  >
                    {item.detail}
                  </a>
                )}
                {item.detail && !item.href && (
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--color-text-muted)" }}>
                    {item.detail}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Direct WhatsApp CTA */}
          <a
            href={`https://wa.me/${(storeConfig.whatsappNumber || "923485245955").replace(/[^0-9]/g, "")}?text=Hello%20Zargul%20Collection,%20I%20need%20assistance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn accent"
            style={{ textAlign: "center", width: "100%", background: "#25d366", boxShadow: "0 8px 24px rgba(37,211,102,0.3)" }}
          >
            💬 Open Direct WhatsApp Chat ✦
          </a>
        </div>

        {/* Quick Inquiry Form */}
        <div className="clay-card white" style={{ padding: "36px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: "700", marginBottom: "6px" }}>
            Send an Inquiry
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
            Submit this form to instantly route your message to our WhatsApp Concierge.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="floating-group">
              <input
                type="text"
                required
                className="floating-input"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="floating-label">Your Full Name *</label>
            </div>

            <div className="floating-group">
              <input
                type="tel"
                required
                className="floating-input"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="floating-label">WhatsApp Number *</label>
            </div>

            <div className="floating-group">
              <input
                type="text"
                className="floating-input"
                placeholder=" "
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label className="floating-label">Inquiry Subject (Optional)</label>
            </div>

            <div className="floating-group">
              <textarea
                rows={4}
                required
                className="floating-textarea"
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label className="floating-label">Your Message *</label>
            </div>

            <button type="submit" className="clay-btn accent" style={{ width: "100%", marginTop: "8px" }}>
              Send via WhatsApp ✦
            </button>
          </form>
        </div>
      </div>

      {/* Boutique Map */}
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: "700", textAlign: "center", marginBottom: "20px" }}>
          Visit Our Barikot, Swat Boutique
        </h3>
        <div className="clay-card white" style={{ padding: "14px", overflow: "hidden" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.7186638062837!2d72.21782297626922!3d34.611299972951714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc1dd3c5436281%3A0x8b6099ebb20a54e1!2sZargul%20Collection!5e0!3m2!1sen!2spk!4v1718620000000!5m2!1sen!2spk"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
}
