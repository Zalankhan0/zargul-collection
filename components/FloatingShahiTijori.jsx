"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/context/StoreContext";

export default function FloatingShahiTijori() {
  const { isVaultUnlocked, setIsVaultModalOpen } = useStore();
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    hasMoved: false,
    active: false
  });

  // Initialize position on client mount
  useEffect(() => {
    setMounted(true);

    // Try restoring saved position
    const saved = typeof window !== "undefined" ? localStorage.getItem("zargul_tijori_pos") : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          const maxX = Math.max(10, window.innerWidth - 55);
          const maxY = Math.max(10, window.innerHeight - 55);
          setPosition({
            x: Math.min(Math.max(10, parsed.x), maxX),
            y: Math.min(Math.max(10, parsed.y), maxY)
          });
          return;
        }
      } catch (e) {}
    }

    // Default: bottom right (above WhatsApp button, out of the way)
    const initX = Math.max(10, (typeof window !== "undefined" ? window.innerWidth : 380) - 58);
    const initY = Math.max(10, (typeof window !== "undefined" ? window.innerHeight : 700) - 150);
    setPosition({ x: initX, y: initY });
  }, []);

  // Update bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = Math.max(10, window.innerWidth - 55);
        const maxY = Math.max(10, window.innerHeight - 55);
        return {
          x: Math.min(Math.max(10, prev.x), maxX),
          y: Math.min(Math.max(10, prev.y), maxY)
        };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: position.x,
      origY: position.y,
      hasMoved: false,
      active: true
    };
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    if (!dragRef.current.hasMoved && Math.hypot(deltaX, deltaY) > 5) {
      dragRef.current.hasMoved = true;
    }

    if (dragRef.current.hasMoved) {
      const maxX = Math.max(10, window.innerWidth - 55);
      const maxY = Math.max(10, window.innerHeight - 55);

      const nextX = Math.min(Math.max(10, dragRef.current.origX + deltaX), maxX);
      const nextY = Math.min(Math.max(10, dragRef.current.origY + deltaY), maxY);

      setPosition({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e) => {
    if (!dragRef.current.active) return;
    const moved = dragRef.current.hasMoved;
    dragRef.current.active = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (moved) {
      // User dragged -> save position
      try {
        localStorage.setItem("zargul_tijori_pos", JSON.stringify(position));
      } catch (err) {}
    } else {
      // User tapped without dragging -> open Shahi Tijori modal
      setIsVaultModalOpen(true);
    }
  };

  const handlePointerCancel = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  if (!mounted) return null;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        cursor: isDragging ? "grabbing" : "grab"
      }}
    >
      {/* TINY MINIMAL FLOATING GIFT ICON (NO MASSIVE BADGE, NO SCREEN BLOCKING) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={isVaultUnlocked ? "VIP Reward Active - Tap to View Shahi Tijori" : "Tap to open Shahi Tijori, drag to move"}
        style={{
          position: "relative",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: isVaultUnlocked
            ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
            : "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #d4af37 100%)",
          color: "#ffffff",
          border: isDragging
            ? "2px solid #ffffff"
            : isVaultUnlocked
            ? "2px solid #34d399"
            : "2px solid rgba(254, 240, 138, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          boxShadow: isDragging
            ? "0 10px 24px rgba(0,0,0,0.6), 0 0 15px rgba(254, 240, 138, 0.8)"
            : isVaultUnlocked
            ? "0 4px 14px rgba(16, 185, 129, 0.5), 0 0 10px rgba(52, 211, 153, 0.4)"
            : "0 4px 14px rgba(220, 38, 38, 0.5), 0 0 10px rgba(212, 175, 55, 0.5)",
          transform: isDragging ? "scale(1.12)" : "scale(1)",
          transition: isDragging ? "none" : "transform 0.15s ease, box-shadow 0.2s ease",
          animation: isDragging ? "none" : "shahiTijoriFloat 3s ease-in-out infinite",
          boxSizing: "border-box"
        }}
      >
        <span style={{ pointerEvents: "none", lineHeight: 1 }}>🎁</span>

        {/* Unlocked Active Indicator Dot */}
        {isVaultUnlocked && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #ffffff",
              boxShadow: "0 0 6px #22c55e",
              pointerEvents: "none"
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes shahiTijoriFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
