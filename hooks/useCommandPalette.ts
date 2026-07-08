"use client";

import { useState, useCallback, useEffect } from "react";

export function useCommandPalette(onOpenCopilot?: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const open = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl/Cmd + P → open palette
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "p") {
        e.preventDefault();
        if (isOpen) close();
        else open();
        return;
      }

      // Ctrl/Cmd + Shift + C → open copilot
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "c") {
        e.preventDefault();
        onOpenCopilot?.();
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => i + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(0, i - 1));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, open, close, onOpenCopilot]);

  return { isOpen, open, close, query, setQuery, selectedIndex, setSelectedIndex };
}
