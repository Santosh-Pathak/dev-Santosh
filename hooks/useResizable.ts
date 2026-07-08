"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface UseResizableOptions {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  /** "right" = dragging right edge grows rightward (sidebar), "left" = dragging left edge (copilot) */
  direction: "right" | "left";
  storageKey?: string;
}

export function useResizable({
  defaultWidth,
  minWidth,
  maxWidth,
  direction,
  storageKey,
}: UseResizableOptions) {
  const [width, setWidth] = useState<number>(() => {
    if (storageKey && typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) return Math.min(maxWidth, Math.max(minWidth, Number(stored)));
    }
    return defaultWidth;
  });

  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startX.current = e.clientX;
      startWidth.current = width;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [width]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = direction === "right"
        ? e.clientX - startX.current
        : startX.current - e.clientX;
      const next = Math.min(maxWidth, Math.max(minWidth, startWidth.current + delta));
      setWidth(next);
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      if (storageKey) {
        localStorage.setItem(storageKey, String(width));
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [direction, maxWidth, minWidth, storageKey, width]);

  return { width, onMouseDown };
}
