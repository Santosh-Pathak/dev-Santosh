"use client";

import React, { useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";
import { FileIcon } from "@/components/ui/FileIcon";
import { portfolioFiles } from "@/lib/files";
import { usePortfolio } from "@/context/PortfolioContext";

interface CommandPaletteProps {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  onClose: () => void;
}

interface PaletteItem {
  type: "command" | "file";
  id: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  query,
  setQuery,
  selectedIndex,
  setSelectedIndex,
  onClose,
}: CommandPaletteProps) {
  const { navigateToFile, openCopilot } = usePortfolio();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands: PaletteItem[] = [
    {
      type: "command",
      id: "copilot",
      label: "✨ Open Santosh's Copilot",
      shortcut: "Ctrl+Shift+C",
      action: () => {
        openCopilot();
        onClose();
      },
    },
  ];

  const fileItems: PaletteItem[] = portfolioFiles.map((file) => ({
    type: "file",
    id: file.id,
    label: file.filename,
    sublabel: file.breadcrumbPath ? `${file.breadcrumbPath}/` : "./",
    icon: <FileIcon type={file.icon} size={14} />,
    action: () => {
      navigateToFile(file.id);
      onClose();
    },
  }));

  const lowerQ = query.toLowerCase();
  const filteredCommands = lowerQ
    ? commands.filter((c) => c.label.toLowerCase().includes(lowerQ))
    : commands;
  const filteredFiles = lowerQ
    ? fileItems.filter((f) => f.label.toLowerCase().includes(lowerQ))
    : fileItems;

  const allItems: PaletteItem[] = [...filteredCommands, ...filteredFiles];
  const clampedIndex = Math.min(selectedIndex, Math.max(0, allItems.length - 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && allItems[clampedIndex]) {
      allItems[clampedIndex].action();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[670px] mx-4 bg-vscode-sidebar border border-vscode-border rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-vscode-border">
          <span className="text-vscode-text-muted font-mono text-sm flex-shrink-0">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Go to file or run command..."
            className="flex-1 bg-transparent font-mono text-sm text-vscode-text-primary placeholder-vscode-text-muted outline-none"
          />
          <kbd className="font-mono text-[11px] text-vscode-text-muted border border-vscode-border rounded px-1.5 py-0.5">
            Esc
          </kbd>
          <button onClick={onClose} className="text-vscode-text-muted hover:text-vscode-text-primary">
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto thin-scrollbar">
          {filteredCommands.length > 0 && (
            <>
              <div className="px-4 pt-3 pb-1">
                <span className="font-mono text-[10px] text-vscode-text-muted uppercase tracking-widest">
                  COMMANDS
                </span>
              </div>
              {filteredCommands.map((item, i) => {
                const isSelected = i === clampedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2 font-mono text-sm transition-colors ${
                      isSelected
                        ? "bg-vscode-border text-vscode-text-primary"
                        : "text-vscode-text-muted hover:bg-vscode-border/50"
                    }`}
                  >
                    <Sparkles size={13} className="text-vscode-pink flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="font-mono text-[10px] text-vscode-text-muted border border-vscode-border rounded px-1.5 py-0.5">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {filteredFiles.length > 0 && (
            <>
              <div className="px-4 pt-3 pb-1">
                <span className="font-mono text-[10px] text-vscode-text-muted uppercase tracking-widest">
                  FILES
                </span>
              </div>
              {filteredFiles.map((item, i) => {
                const globalIdx = filteredCommands.length + i;
                const isSelected = globalIdx === clampedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    className={`w-full flex items-center gap-3 px-4 py-2 font-mono text-sm transition-colors ${
                      isSelected
                        ? "bg-vscode-border text-vscode-text-primary"
                        : "text-vscode-text-muted hover:bg-vscode-border/50"
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="text-vscode-text-muted text-[11px]">{item.sublabel}</span>
                  </button>
                );
              })}
            </>
          )}

          {allItems.length === 0 && (
            <div className="px-4 py-6 text-center font-mono text-sm text-vscode-text-muted">
              No results for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-vscode-border bg-vscode-titlebar">
          <span className="font-mono text-[11px] text-vscode-text-muted">
            ↕ navigate · ↵ open · Esc close
          </span>
          <span className="font-mono text-[11px] text-vscode-text-muted">
            Tip: type &apos;copilot&apos; to open AI chat
          </span>
        </div>
      </div>
    </div>
  );
}
