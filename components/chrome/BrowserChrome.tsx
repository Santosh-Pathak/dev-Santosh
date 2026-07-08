"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shield,
  Bookmark,
  Star,
  MoreHorizontal,
  Puzzle,
} from "lucide-react";

export function BrowserChrome() {
  return (
    <div className="hidden md:flex flex-col bg-[#2d2d2d] border-b border-[#1a1a1a]">
      {/* Tab bar row */}
      <div className="flex items-center h-9 px-2 gap-1 bg-[#252526]">
        <div className="flex items-center gap-0.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* Active browser tab */}
        <div className="flex items-center gap-2 bg-[#1e1e2e] rounded-t px-3 py-1 text-xs text-vscode-text-primary font-mono h-full">
          <div className="w-3 h-3 rounded-full bg-vscode-pink/80" />
          <span>Santosh Pathak · Portfolio</span>
          <span className="text-vscode-text-muted ml-1 cursor-pointer hover:text-vscode-text-primary">×</span>
        </div>
        <div className="text-vscode-text-muted text-xs px-3 py-1 hover:bg-[#313244] rounded-t cursor-pointer">+</div>
      </div>

      {/* Navigation row */}
      <div className="flex items-center h-10 px-3 gap-2 bg-[#2d2d2d]">
        {/* Nav buttons */}
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 rounded hover:bg-[#3a3a3a] text-vscode-text-muted" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#3a3a3a] text-vscode-text-muted" disabled>
            <ChevronRight size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#3a3a3a] text-vscode-text-muted">
            <RotateCcw size={14} />
          </button>
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center bg-[#1a1a2e] border border-[#414161] rounded-full px-3 py-1 gap-2 text-xs font-mono">
          <Shield size={12} className="text-[#98c379] flex-shrink-0" />
          <span className="text-vscode-text-muted">santosh-pathak-portfolio.vercel.app</span>
          <div className="flex-1" />
          <Star size={11} className="text-vscode-text-muted cursor-pointer hover:text-vscode-yellow" />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1 text-vscode-text-muted">
          <button className="p-1.5 rounded hover:bg-[#3a3a3a]">
            <Bookmark size={14} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#3a3a3a]">
            <Puzzle size={14} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#3a3a3a]">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
