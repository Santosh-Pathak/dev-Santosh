"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -300, y: -300 });
  const ring  = useRef({ x: -300, y: -300 });
  const trail = useRef({ x: -300, y: -300 });
  const rafId = useRef<number>(0);

  const [hoverState, setHoverState] =
    useState<"default" | "pointer" | "text" | "resize">("default");

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Detect hover state by element type — NOT by computed cursor
      // (computed cursor is always "none" due to our global CSS rule)
      const el = e.target as HTMLElement;
      const isClickable =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.getAttribute("role") === "button" ||
        !!el.closest("a, button, [role='button']");

      const isText =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;

      const isResize = el.classList.contains("cursor-col-resize") ||
        !!el.closest("[class*='cursor-col-resize']");

      if (isResize)        setHoverState("resize");
      else if (isText)     setHoverState("text");
      else if (isClickable) setHoverState("pointer");
      else                  setHoverState("default");
    };

    const onMouseLeave = () => {
      mouse.current = { x: -300, y: -300 };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    const RING_LERP  = 0.14;
    const TRAIL_LERP = 0.07;

    const animate = () => {
      ring.current.x  += (mouse.current.x - ring.current.x)  * RING_LERP;
      ring.current.y  += (mouse.current.y - ring.current.y)  * RING_LERP;
      trail.current.x += (mouse.current.x - trail.current.x) * TRAIL_LERP;
      trail.current.y += (mouse.current.y - trail.current.y) * TRAIL_LERP;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform =
          `translate(${trail.current.x}px, ${trail.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const dotColor =
    hoverState === "pointer" ? "#61afef" :
    hoverState === "text"    ? "#cdd6f4" : "#ff5fbf";

  const dotSize =
    hoverState === "pointer" ? 10 :
    hoverState === "text"    ? 3  : 7;

  const ringSize =
    hoverState === "pointer" ? 40 :
    hoverState === "resize"  ? 10 : 28;

  const ringColor =
    hoverState === "pointer" ? "#61afef" :
    hoverState === "text"    ? "#56d4dd" : "#ff5fbf";

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    borderRadius: "50%",
    pointerEvents: "none",
    willChange: "transform",
  };

  return (
    <>
      {/* Slow trailing glow blob */}
      <div
        ref={trailRef}
        style={{
          ...base,
          zIndex: 99997,
          width:  56,
          height: 56,
          marginLeft: -28,
          marginTop:  -28,
          background: `radial-gradient(circle, ${dotColor}25 0%, transparent 70%)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Lagging outer ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          zIndex: 99998,
          width:  ringSize,
          height: ringSize,
          marginLeft: -(ringSize / 2),
          marginTop:  -(ringSize / 2),
          border: `1.5px solid ${ringColor}`,
          opacity: hoverState === "resize" ? 0.2 : 0.65,
          transition:
            "width 0.18s ease, height 0.18s ease, margin 0.18s ease, " +
            "border-color 0.2s ease, opacity 0.2s ease",
        }}
      />

      {/* Snappy center dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          zIndex: 99999,
          width:  dotSize,
          height: dotSize,
          marginLeft: -(dotSize / 2),
          marginTop:  -(dotSize / 2),
          background:  dotColor,
          boxShadow:  `0 0 8px 3px ${dotColor}70`,
          transition:
            "width 0.12s ease, height 0.12s ease, margin 0.12s ease, " +
            "background 0.18s ease, box-shadow 0.18s ease",
        }}
      />
    </>
  );
}
