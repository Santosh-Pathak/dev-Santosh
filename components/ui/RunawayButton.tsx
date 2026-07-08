"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const BTN_R      = 6;    // radius px  (dot is 12×12)
const FLEE_DIST  = 100;  // px — repulsion activates within this distance
const PUSH_STEP  = 80;   // px — how far it moves per repulsion event
const MARGIN     = 16;   // px — minimum gap from any viewport edge

/** Clamp a value between lo and hi */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function RunawayButton() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [pos, setPos]     = useState<{ x: number; y: number } | null>(null);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Initialise fixed position from placeholder's DOM rect
  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: r.left, y: r.top });
  }, []);

  const repel = useCallback((mx: number, my: number) => {
    setPos((prev) => {
      if (!prev) return prev;

      const W = window.innerWidth;
      const H = window.innerHeight;

      // Centre of the dot
      const cx = prev.x + BTN_R;
      const cy = prev.y + BTN_R;

      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= FLEE_DIST) return prev; // cursor is far — stay put

      // Direction = from cursor → dot (unit vector)
      // If somehow cursor is exactly on the dot, push upward
      const len = dist < 0.5 ? 1 : dist;
      const ux  = dx / len;
      const uy  = dy / len;

      // Scale push stronger when cursor is closer
      const force = PUSH_STEP * (1 - dist / FLEE_DIST) + 20;

      const newX = clamp(prev.x + ux * force, MARGIN, W - MARGIN - BTN_R * 2);
      const newY = clamp(prev.y + uy * force, MARGIN, H - MARGIN - BTN_R * 2);

      // Show tooltip on first repulsion
      if (dist < FLEE_DIST * 0.7) {
        setShowTip(true);
        clearTimeout(tipTimer.current);
        tipTimer.current = setTimeout(() => setShowTip(false), 1200);
      }

      return { x: newX, y: newY };
    });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => repel(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [repel]);

  return (
    <>
      {/* Invisible placeholder — keeps title-bar layout intact */}
      <div
        ref={placeholderRef}
        style={{ width: BTN_R * 2, height: BTN_R * 2, flexShrink: 0 }}
        aria-hidden
      />

      {/* Magnetic dot — always fixed, always visible */}
      {pos && (
        <div
          style={{
            position:   "fixed",
            left:       pos.x,
            top:        pos.y,
            width:      BTN_R * 2,
            height:     BTN_R * 2,
            zIndex:     99999,
            transition: "left 0.08s ease-out, top 0.08s ease-out",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <div
            className="w-full h-full rounded-full bg-[#ff5f57] flex items-center justify-center"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
          >
            <X size={7} strokeWidth={3} className="text-[#7a1f1a] opacity-80" />
          </div>
        </div>
      )}

      {/* Tooltip */}
      {showTip && pos && (
        <div
          className="fixed font-mono text-[10px] text-vscode-text-muted bg-vscode-sidebar
                     border border-vscode-border rounded px-2 py-1 pointer-events-none whitespace-nowrap"
          style={{
            left:   Math.min(pos.x + BTN_R * 2 + 6, window.innerWidth - 110),
            top:    pos.y - 2,
            zIndex: 99999,
          }}
        >
          Nope 😈
        </div>
      )}
    </>
  );
}
