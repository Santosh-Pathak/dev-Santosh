"use client";

import React, { useCallback } from "react";
import { Search, Menu, Minus, Maximize2 } from "lucide-react";
import { MenuBar } from "./MenuBar";
import { RunawayButton } from "@/components/ui/RunawayButton";

interface TitleBarProps {
  onOpenPalette: () => void;
  onToggleSidebar: () => void;
  onOpenCopilot: () => void;
}

export function TitleBar({ onOpenPalette, onToggleSidebar, onOpenCopilot }: TitleBarProps) {
  /** Green button — toggle fullscreen */
  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <div
      className="bg-vscode-titlebar border-b border-vscode-border select-none"
      style={{ zIndex: 50, position: "relative" }}
    >
      {/* Main title bar row */}
      <div className="flex items-center h-9 px-3 gap-3">

        {/* Traffic lights (desktop) */}
        <div className="hidden md:flex items-center gap-1.5">

          {/* 1 — Red: runs away from cursor */}
          <RunawayButton />

          {/* 2 — Yellow: does absolutely nothing */}
          <button
            disabled
            title="Minimize (does nothing)"
            className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center group cursor-not-allowed"
            aria-label="Minimize"
          >
            <Minus size={7} strokeWidth={3} className="text-[#7a5c00] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* 3 — Green: fullscreen */}
          <button
            onClick={handleFullscreen}
            title="Toggle fullscreen"
            className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center group hover:brightness-110 transition-all active:scale-90"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 size={7} strokeWidth={3} className="text-[#0a4a14] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

        </div>

        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1 rounded hover:bg-vscode-border text-vscode-text-muted"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Center search pill */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 bg-[#313244] hover:bg-[#3a3a4a] border border-vscode-border rounded-md px-3 py-1 font-mono text-xs text-vscode-text-muted transition-colors w-full max-w-xs md:max-w-md"
          >
            <Search size={12} className="flex-shrink-0" />
            <span className="flex-1 text-left truncate">santosh-pathak : portfolio</span>
            <kbd className="hidden md:inline-flex items-center bg-vscode-titlebar border border-vscode-border rounded px-1 text-[10px] text-vscode-text-muted font-mono">
              Ctrl P
            </kbd>
          </button>
        </div>

        {/* Spacer for symmetry */}
        <div className="hidden md:block w-16" />
      </div>

      {/* Menu bar row — real dropdowns */}
      <MenuBar onOpenPalette={onOpenPalette} onOpenCopilot={onOpenCopilot} />
    </div>
  );
}
