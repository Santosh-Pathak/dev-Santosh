"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { getFileById } from "@/lib/files";
import { usePortfolio } from "@/context/PortfolioContext";

export function Breadcrumb() {
  const { activeFileId } = usePortfolio();
  const file = getFileById(activeFileId);

  if (!file) return null;

  const segments: string[] = ["santosh-pathak"];
  if (file.breadcrumbPath) segments.push(file.breadcrumbPath);
  segments.push(file.filename);

  return (
    <div className="flex items-center h-7 px-4 bg-vscode-bg border-b border-vscode-border flex-shrink-0">
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <ChevronRight size={12} className="text-vscode-text-muted mx-1 flex-shrink-0" />
          )}
          <span
            className={`font-mono text-[12px] truncate ${
              i === segments.length - 1
                ? "text-vscode-text-primary"
                : "text-vscode-text-muted"
            }`}
          >
            {seg}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
