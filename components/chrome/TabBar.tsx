"use client";

import React from "react";
import { X } from "lucide-react";
import { FileIcon } from "@/components/ui/FileIcon";
import { getFileById } from "@/lib/files";
import { usePortfolio } from "@/context/PortfolioContext";

export function TabBar() {
  const { openTabs, activeFileId, navigateToFile, closeTab } = usePortfolio();

  return (
    <div className="flex items-end overflow-x-auto bg-vscode-titlebar border-b border-vscode-border thin-scrollbar flex-shrink-0 h-9">
      {openTabs.map((fileId) => {
        const file = getFileById(fileId);
        if (!file) return null;
        const isActive = fileId === activeFileId;

        // Truncate long filenames in the tab
        const displayName =
          file.filename.length > 16 ? file.filename.slice(0, 13) + "…" : file.filename;

        return (
          <div
            key={fileId}
            className={`relative flex items-center gap-1.5 px-3 h-full flex-shrink-0 cursor-pointer font-mono text-[12px] transition-colors group border-r border-vscode-border ${
              isActive
                ? "bg-vscode-bg text-vscode-text-primary"
                : "bg-vscode-titlebar text-vscode-text-muted hover:bg-vscode-bg/50 hover:text-vscode-text-primary"
            }`}
            onClick={() => navigateToFile(fileId)}
            title={file.filename}
          >
            {/* Active top border */}
            {isActive && (
              <span
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: file.accentColor }}
              />
            )}
            <FileIcon type={file.icon} size={13} />
            <span>{displayName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(fileId);
              }}
              className={`ml-0.5 rounded p-0.5 transition-opacity ${
                isActive
                  ? "opacity-60 hover:opacity-100 hover:bg-vscode-border"
                  : "opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:bg-vscode-border"
              }`}
              aria-label={`Close ${file.filename}`}
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
