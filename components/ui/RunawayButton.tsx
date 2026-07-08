"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const FLEE_RADIUS = 80;   // px — how close before it runs
const BTN_SIZE    = 12;   // px — button diameter
const MARGIN      = 24;   // px — minimum distance from viewport edge

function randomPosAwayFrom(
  mouseX: number,
  mouseY: number,
  btnX: number,
  btnY: number,
): { x: number; y: number } {
  const W = window.innerWidth;
  const H = window.innerHeight;

  // Try up to 12 random positions — pick the first that's far enough from cursor
  for (let i = 0; i < 12; i++) {
    const x = MARGIN + Math.random() * (W - MARGIN * 2 - BTN_SIZE);
    const y = MARGIN + Math.random() * (H - MARGIN * 2 - BTN_SIZE);
    const dx = x - mouseX;
    const dy = y - mouseY;
    if (Math.sqrt(dx * dx + dy * dy) > FLEE_RADIUS * 2) {
      return { x, y };
    }
  }

  // Fallback: opposite corner from cursor
  return {
    x: mouseX < W / 2 ? W - MARGIN - BTN_SIZE : MARGIN,
    y: mouseY < H / 2 ? H - MARGIN - BTN_SIZE : MARGIN,
  };
}

export function RunawayButton() {
  // null = render inline (not escaped yet), object = fixed position
  const [pos, setPos]         = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const btnRef  = useRef<HTMLDivElement>(null);
  const escaped = pos !== null;

  const flee = useCallback((mx: number, my: number) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const bx = r.left + r.width / 2;
    const by = r.top  + r.height / 2;
    const dx = bx - mx;
    const dy = by - my;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < FLEE_RADIUS) {
      // Show tooltip once before first escape
      if (!escaped) setTooltip(true);
      setPos(randomPosAwayFrom(mx, my, bx, by));
      setTimeout(() => setTooltip(false), 1200);
    }
  }, [escaped]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => flee(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [flee]);

  // If already escaped, check distance from current fixed position too
  useEffect(() => {
    if (!pos) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - pos.x - BTN_SIZE / 2;
      const dy = e.clientY - pos.y - BTN_SIZE / 2;
      if (Math.sqrt(dx * dx + dy * dy) < FLEE_RADIUS) {
        setPos(randomPosAwayFrom(e.clientX, e.clientY, pos.x, pos.y));
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pos]);

  const sharedClasses =
    "rounded-full bg-[#ff5f57] flex items-center justify-center group select-none";

  const inner = (
    <div
      ref={btnRef}
      className={sharedClasses}
      style={{
        width: BTN_SIZE,
        height: BTN_SIZE,
        transition: escaped ? "left 0.12s cubic-bezier(0.22,1,0.36,1), top 0.12s cubic-bezier(0.22,1,0.36,1)" : undefined,
        boxShadow: hovered ? "0 0 0 3px rgba(255,95,87,0.35)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <X size={7} strokeWidth={3} className="text-[#7a1f1a] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );

  return (
    <>
      {/* Inline placeholder — keeps layout intact when button is escaped */}
      {escaped ? (
        <div style={{ width: BTN_SIZE, height: BTN_SIZE, flexShrink: 0 }} aria-hidden />
      ) : (
        inner
      )}

      {/* Escaped floating button */}
      {escaped && (
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            zIndex: 99999,
            transition: "left 0.12s cubic-bezier(0.22,1,0.36,1), top 0.12s cubic-bezier(0.22,1,0.36,1)",
            width: BTN_SIZE,
            height: BTN_SIZE,
          }}
          aria-hidden
        >
          {inner}
        </div>
      )}

      {/* Cheeky tooltip */}
      {tooltip && (
        <div
          className="fixed font-mono text-[10px] text-vscode-text-muted bg-vscode-sidebar border border-vscode-border rounded px-2 py-1 pointer-events-none"
          style={{ left: (pos?.x ?? 20) + 18, top: (pos?.y ?? 20) - 2, zIndex: 99999 }}
        >
          Nope 😈
        </div>
      )}
    </>
  );
}
