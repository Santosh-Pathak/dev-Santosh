"use client";

import React, { useEffect, useRef, useState } from "react";

interface ActiveLineHighlightProps {
  /** ref of the scrollable editor container */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function ActiveLineHighlight({ containerRef }: ActiveLineHighlightProps) {
  const [top, setTop] = useState<number | null>(null);
  const [inside, setInside] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const y = e.clientY;
        if (y >= rect.top && y <= rect.bottom) {
          setInside(true);
          // Snap to nearest 24px row (like VS Code line height)
          setTop(Math.floor((y - 12) / 24) * 24 + 12);
        } else {
          setInside(false);
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  if (!inside || top === null) return null;

  return (
    <div
      className="editor-line-highlight"
      style={{ top: top - 12 }}
      aria-hidden="true"
    />
  );
}
