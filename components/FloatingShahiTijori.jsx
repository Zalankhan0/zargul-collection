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
          const maxX = Math.max(10, window.innerWidth - 170);
          const maxY = Math.max(10, window.innerHeight - 70);
          setPosition({
            x: Math.min(Math.max(10, parsed.x), maxX),
            y: Math.min(Math.max(10, parsed.y), maxY)
          });
          return;
        }
      } catch (e) {}
    }

    // Default: bottom right (above WhatsApp button)
    const initX = Math.max(10, (typeof window !== "undefined" ? window.innerWidth : 380) - 175);
    const initY = Math.max(10, (typeof window !== "undefined" ? window.innerHeight : 700) - 190);
    setPosition({ x: initX, y: initY });
  }, []);

  // Update bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = Math.max(10, window.innerWidth - 170);
        const maxY = Math.max(10, window.innerHeight - 70);
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
    // Only primary button for mouse
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
      const maxX = Math.max(10, window.innerWidth - 170);
      const maxY = Math.max(10, window.innerHeight - 65);

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
      // User dragged -> save position so it stays there
      try {
        localStorage.setItem("zargul_tijori_pos", JSON.stringify(position));
      } catch (err) {}
    } else {
      // User tapped without dragging -> open Shahi Tijori modal!
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
      <div
        role="button"
        tabIndex={0}
        aria-label="Drag to move, tap to open Shahi Tijori"
        style={{
          background: isVaultUnlocked
            ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
            : "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #d4af37 100%)",
          color: "#ffffff",
          border: isDragging
            ? "2.5px solid #ffffff"
            : "2.5px solid rgba(254, 240, 138, 0.9)",
          borderRadius: "32px",
          padding: "7px 14px 7px 10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: isDragging
            ? "0 14px 32px rgba(0,0,0,0.65), 0 0 25px rgba(254, 240, 138, 0.85)"
            : isVaultUnlocked
            ? "0 8px 24px rgba(16, 185, 129, 0.45), 0 0 15px rgba(254, 240, 138, 0.3)"
            : "0 8px 24px rgba(220, 38, 38, 0.45), 0 0 18px rgba(212, 175, 55, 0.5)",
          transform: isDragging ? "scale(1.08)" : "scale(1)",
          transition: isDragging ? "none" : "transform 0.15s ease, box-shadow 0.2s ease",
          animation: isDragging ? "none" : "shahiTijoriFloat 3s ease-in-out infinite"
        }}
      >
        {/* Animated 3D Gift Box Icon */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #fef08a 0%, #d4af37 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            animation: isDragging ? "none" : "giftBoxPulse 2s ease-in-out infinite",
            pointerEvents: "none"
          }}
        >
          🎁
        </div>

        {/* Text Pill */}
        <div style={{ textAlign: "left", lineHeight: 1.15, pointerEvents: "none" }}>
          <div
            style={{
              fontSize: "0.58rem",
              fontWeight: "900",
              letterSpacing: "1px",
              color: "#fef08a",
              textTransform: "uppercase"
            }}
          >
            {isVaultUnlocked ? "REWARD ACTIVE" : "DRAG ANYWHERE"}
          </div>
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: "900",
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)"
            }}
          >
            {isVaultUnlocked ? "30ml Perfume 🎁" : "Shahi Tijori 🎁"}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shahiTijoriFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes giftBoxPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(-6deg);
          }
          75% {
            transform: scale(1.1) rotate(6deg);
          }
        }
      `}</style>
    </div>
  );
}
