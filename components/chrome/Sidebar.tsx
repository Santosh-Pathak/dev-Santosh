"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResizable } from "@/hooks/useResizable";
import {
  Folder,
  Search,
  GitBranch,
  Download,
  Sparkles,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { FileIcon } from "@/components/ui/FileIcon";
import { portfolioFiles } from "@/lib/files";
import { usePortfolio } from "@/context/PortfolioContext";

interface SidebarProps {
  onOpenCopilot: () => void;
  copilotOpen: boolean;
}

type PanelId = "explorer" | "search" | "git";

const iconRail: { id: PanelId | "resume"; icon: React.ElementType; label: string; isAction?: boolean }[] = [
  { id: "explorer", icon: Folder,    label: "Explorer" },
  { id: "search",   icon: Search,    label: "Search" },
  { id: "git",      icon: GitBranch, label: "Source Control" },
  { id: "resume",   icon: Download,  label: "Resume", isAction: true },
];

// ── Dummy git data ──────────────────────────────────────────────
const GIT_CHANGES = [
  { status: "M", file: "app/page.tsx",           color: "#f1c76f" },
  { status: "M", file: "components/sections/HomeSection.tsx", color: "#f1c76f" },
  { status: "A", file: "data/portfolio.ts",       color: "#98c379" },
  { status: "A", file: "lib/files.ts",            color: "#98c379" },
];

const GIT_COMMITS = [
  { hash: "a3f8c12", message: "feat: add copilot panel & command palette",       author: "Santosh", time: "2 hrs ago",  dot: "#ff5fbf" },
  { hash: "9d1e047", message: "feat: VS Code sidebar with collapsible explorer", author: "Santosh", time: "3 hrs ago",  dot: "#61afef" },
  { hash: "5bc2a90", message: "feat: single-page tab architecture",               author: "Santosh", time: "5 hrs ago",  dot: "#61afef" },
  { hash: "e7f3d81", message: "feat: skills, experience & contact sections",      author: "Santosh", time: "6 hrs ago",  dot: "#61afef" },
  { hash: "2ca9b55", message: "feat: projects grid with ProjectCard component",   author: "Santosh", time: "8 hrs ago",  dot: "#61afef" },
  { hash: "8fe1c34", message: "feat: hero section with social links strip",       author: "Santosh", time: "9 hrs ago",  dot: "#61afef" },
  { hash: "c0d7a26", message: "chore: scaffold Next.js 14 + Tailwind + lucide",  author: "Santosh", time: "10 hrs ago", dot: "#98c379" },
  { hash: "4b8e2f1", message: "init: initial commit",                             author: "Santosh", time: "11 hrs ago", dot: "#6c7086" },
];

function GitPanel() {
  const [changesOpen, setChangesOpen] = React.useState(true);
  const [historyOpen, setHistoryOpen] = React.useState(true);

  return (
    <div className="flex-1 overflow-y-auto thin-scrollbar flex flex-col">
      {/* Commit message box */}
      <div className="px-3 py-2 border-b border-vscode-border flex-shrink-0">
        <div className="bg-vscode-bg border border-vscode-border rounded px-2 py-1.5 text-[11px] font-mono text-vscode-text-muted focus-within:border-vscode-blue transition-colors">
          <input
            readOnly
            placeholder="Message (Ctrl+Enter to commit)"
            className="w-full bg-transparent outline-none placeholder-vscode-text-muted"
          />
        </div>
        <div className="flex gap-1.5 mt-1.5">
          <button className="flex-1 bg-vscode-blue/20 hover:bg-vscode-blue/30 text-vscode-blue border border-vscode-blue/30 rounded px-2 py-1 font-mono text-[10px] transition-colors">
            ✓ Commit
          </button>
          <button className="bg-vscode-border hover:bg-vscode-border/80 text-vscode-text-muted rounded px-2 py-1 font-mono text-[10px] transition-colors">
            ↑ Push
          </button>
        </div>
      </div>

      {/* Changes section */}
      <div>
        <button
          onClick={() => setChangesOpen(v => !v)}
          className="flex items-center gap-1 w-full px-2 py-1.5 font-mono text-[11px] font-semibold text-vscode-text-muted uppercase tracking-widest hover:text-vscode-text-primary transition-colors"
        >
          {changesOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span>Changes</span>
          <span className="ml-auto text-[10px] normal-case tracking-normal bg-vscode-border px-1.5 rounded-full">
            {GIT_CHANGES.length}
          </span>
        </button>

        {changesOpen && (
          <div className="pb-1">
            {GIT_CHANGES.map((item) => (
              <div
                key={item.file}
                className="flex items-center gap-2 pl-6 pr-3 py-1 font-mono text-[11px] text-vscode-text-muted hover:bg-vscode-border/30 hover:text-vscode-text-primary transition-colors cursor-default group"
              >
                <span
                  className="w-4 text-center font-bold flex-shrink-0 text-[10px]"
                  style={{ color: item.color }}
                >
                  {item.status}
                </span>
                <span className="truncate flex-1">{item.file.split("/").pop()}</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-50 truncate ml-auto max-w-[60px] text-right">
                  {item.file.includes("/") ? item.file.split("/").slice(0, -1).join("/") : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Commit history */}
      <div className="border-t border-vscode-border">
        <button
          onClick={() => setHistoryOpen(v => !v)}
          className="flex items-center gap-1 w-full px-2 py-1.5 font-mono text-[11px] font-semibold text-vscode-text-muted uppercase tracking-widest hover:text-vscode-text-primary transition-colors"
        >
          {historyOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span>Commit History</span>
          <span className="ml-auto text-[10px] normal-case tracking-normal bg-vscode-border px-1.5 rounded-full">
            {GIT_COMMITS.length}
          </span>
        </button>

        {historyOpen && (
          <div className="flex flex-col pb-2">
            {GIT_COMMITS.map((commit, i) => (
              <div
                key={commit.hash}
                className="flex gap-2 pl-3 pr-3 py-1.5 hover:bg-vscode-border/30 transition-colors cursor-default group"
              >
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 ring-1 ring-vscode-bg"
                    style={{ backgroundColor: commit.dot }}
                  />
                  {i < GIT_COMMITS.length - 1 && (
                    <div className="w-px flex-1 bg-vscode-border mt-0.5" style={{ minHeight: 16 }} />
                  )}
                </div>

                {/* Commit details */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[11px] text-vscode-text-primary leading-snug truncate group-hover:text-white transition-colors">
                    {commit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="font-mono text-[10px] opacity-60"
                      style={{ color: commit.dot }}
                    >
                      {commit.hash}
                    </span>
                    <span className="font-mono text-[10px] text-vscode-text-muted opacity-50">
                      {commit.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Branch footer */}
      <div className="mt-auto border-t border-vscode-border px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <GitBranch size={11} className="text-vscode-text-muted flex-shrink-0" />
        <span className="font-mono text-[11px] text-vscode-text-muted">main</span>
        <span className="ml-auto font-mono text-[10px] text-vscode-text-muted">↑1 ⬥3</span>
      </div>
    </div>
  );
}

export function Sidebar({ onOpenCopilot, copilotOpen }: SidebarProps) {
  const { activeFileId, navigateToFile, sidebarOpen, closeSidebar } = usePortfolio();

  const [activePanel, setActivePanel] = useState<PanelId | null>("explorer");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { width: panelWidth, onMouseDown: onPanelResizeMouseDown } = useResizable({
    defaultWidth: 220,
    minWidth: 140,
    maxWidth: 480,
    direction: "right",
    storageKey: "sidebar-panel-width",
  });

  const handleIconClick = (id: PanelId | "resume") => {
    if (id === "resume") {
      // Trigger resume download directly
      const a = document.createElement("a");
      a.href = "/Santosh_Pathak_Resume.pdf";
      a.download = "Santosh_Pathak_Resume.pdf";
      a.click();
      return;
    }
    setActivePanel((prev) => {
      if (prev === id) return null; // collapse
      if (id === "search") {
        setSearchQuery("");
        setSearchIndex(0);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      return id;
    });
  };

  // Focus search input whenever search panel opens
  useEffect(() => {
    if (activePanel === "search") {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [activePanel]);

  const searchResults = searchQuery.trim()
    ? portfolioFiles.filter((f) =>
        f.filename.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : portfolioFiles;

  // Whether to show the file panel area
  const panelOpen = activePanel !== null;

  const filePanel = (
    <div
      className={`bg-vscode-sidebar flex flex-col overflow-hidden transition-[opacity] duration-200 relative ${
        panelOpen ? "border-r border-vscode-border" : "w-0 opacity-0 pointer-events-none"
      }`}
      style={{ width: panelOpen ? panelWidth : 0 }}
    >
      {panelOpen && (
        <>
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-vscode-border flex-shrink-0">
            <span className="font-mono text-[11px] font-semibold text-vscode-text-muted uppercase tracking-widest truncate">
              {activePanel === "explorer" && "Portfolio"}
              {activePanel === "search"   && "Search"}
              {activePanel === "git"      && "Source Control"}
            </span>
            {/* Mobile close */}
            <button
              onClick={closeSidebar}
              className="md:hidden p-1 rounded hover:bg-vscode-border text-vscode-text-muted flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>

          {activePanel === "explorer" && (
            <>
              {/* PORTFOLIO section header */}
              <button
                className="flex items-center gap-1 w-full px-2 py-1 font-mono text-[11px] font-semibold text-vscode-text-muted uppercase tracking-widest hover:text-vscode-text-primary transition-colors"
                onClick={() => {}} // decorative expand/collapse for the group
              >
                <ChevronDown size={13} />
                <span>Portfolio</span>
              </button>

              {/* File list */}
              <div className="flex-1 overflow-y-auto thin-scrollbar pb-1">
                {portfolioFiles.map((file) => {
                  const isActive = file.id === activeFileId && !file.externalHref;
                  return (
                    <button
                      key={file.id}
                      onClick={() => navigateToFile(file.id)}
                      className={`w-full flex items-center gap-2 pl-6 pr-4 py-1.5 font-mono text-[13px] transition-colors relative ${
                        isActive
                          ? "bg-vscode-border/60 text-vscode-text-primary"
                          : "text-vscode-text-muted hover:bg-vscode-border/30 hover:text-vscode-text-primary"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                          style={{ backgroundColor: file.accentColor }}
                        />
                      )}
                      <FileIcon type={file.icon} size={16} />
                      <span className="truncate">{file.filename}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {activePanel === "search" && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Search input */}
              <div className="px-3 py-2 border-b border-vscode-border flex-shrink-0">
                <div className="flex items-center gap-2 bg-vscode-bg border border-vscode-border rounded px-2 py-1.5 focus-within:border-vscode-blue transition-colors">
                  <Search size={12} className="text-vscode-text-muted flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchIndex(0); }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") { e.preventDefault(); setSearchIndex(i => Math.min(i + 1, searchResults.length - 1)); }
                      if (e.key === "ArrowUp")   { e.preventDefault(); setSearchIndex(i => Math.max(i - 1, 0)); }
                      if (e.key === "Enter" && searchResults[searchIndex]) { navigateToFile(searchResults[searchIndex].id); }
                      if (e.key === "Escape")    { setSearchQuery(""); }
                    }}
                    placeholder="Go to file..."
                    className="flex-1 bg-transparent font-mono text-[12px] text-vscode-text-primary placeholder-vscode-text-muted outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(""); setSearchIndex(0); searchInputRef.current?.focus(); }} className="text-vscode-text-muted hover:text-vscode-text-primary">
                      <X size={11} />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="font-mono text-[10px] text-vscode-text-muted mt-1.5">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto thin-scrollbar py-1">
                {searchResults.length === 0 ? (
                  <p className="font-mono text-[11px] text-vscode-text-muted text-center mt-6 px-4 opacity-60">
                    No files match &quot;{searchQuery}&quot;
                  </p>
                ) : (
                  searchResults.map((file, i) => {
                    const isKeySelected = i === searchIndex;
                    const isActive = file.id === activeFileId && !file.externalHref;
                    // Highlight matching characters
                    const q = searchQuery.toLowerCase();
                    const name = file.filename;
                    const matchIdx = name.toLowerCase().indexOf(q);
                    const before = matchIdx >= 0 ? name.slice(0, matchIdx) : name;
                    const match  = matchIdx >= 0 ? name.slice(matchIdx, matchIdx + q.length) : "";
                    const after  = matchIdx >= 0 ? name.slice(matchIdx + q.length) : "";

                    return (
                      <button
                        key={file.id}
                        onClick={() => { navigateToFile(file.id); }}
                        onMouseEnter={() => setSearchIndex(i)}
                        className={`w-full flex items-center gap-2 pl-4 pr-3 py-1.5 font-mono text-[12px] transition-colors relative ${
                          isKeySelected
                            ? "bg-vscode-border text-vscode-text-primary"
                            : isActive
                            ? "bg-vscode-border/50 text-vscode-text-primary"
                            : "text-vscode-text-muted hover:bg-vscode-border/30 hover:text-vscode-text-primary"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r" style={{ backgroundColor: file.accentColor }} />
                        )}
                        <FileIcon type={file.icon} size={14} />
                        <span className="truncate">
                          {before}
                          {match && <span style={{ color: "#f1c76f" }} className="font-semibold">{match}</span>}
                          {after}
                        </span>
                        <span className="ml-auto text-[10px] text-vscode-text-muted opacity-50 flex-shrink-0">
                          {file.breadcrumbPath || "."}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-vscode-border px-3 py-1.5 flex-shrink-0">
                <p className="font-mono text-[10px] text-vscode-text-muted">
                  ↑↓ navigate · ↵ open · Esc clear
                </p>
              </div>
            </div>
          )}

          {activePanel === "git" && <GitPanel />}


          {/* Bottom area — always visible when panel open */}
          <div className="border-t border-vscode-border p-2 flex flex-col gap-1 flex-shrink-0">
            <button
              onClick={onOpenCopilot}
              className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded font-mono text-xs transition-colors ${
                copilotOpen
                  ? "bg-vscode-pink/15 text-vscode-pink border border-vscode-pink/30"
                  : "bg-vscode-border/40 text-vscode-text-muted hover:bg-vscode-border/70 hover:text-vscode-text-primary border border-transparent"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} />
                Santosh&apos;s Copilot
              </span>
              {copilotOpen ? (
                <span className="text-[10px] text-vscode-green">open ✓</span>
              ) : (
                <span className="text-[10px] bg-vscode-blue/20 text-vscode-blue border border-vscode-blue/30 px-1 rounded">
                  AI
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 px-2 py-0.5 font-mono text-[11px] text-vscode-text-muted">
              <GitBranch size={11} />
              <span>main</span>
              <span className="ml-auto">↑1 ⬥3</span>
            </div>
          </div>
        </>
      )}

      {/* Resize handle — right edge of file panel */}
      {panelOpen && (
        <div
          onMouseDown={onPanelResizeMouseDown}
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10 group"
          title="Drag to resize"
        >
          <div className="h-full w-px bg-vscode-border group-hover:bg-vscode-blue transition-colors" />
        </div>
      )}
    </div>
  );

  const iconRailEl = (
    <div className="flex flex-col items-center w-12 bg-vscode-titlebar border-r border-vscode-border py-2 gap-1 flex-shrink-0">
      {iconRail.map(({ id, icon: Icon, label, isAction }) => (
        <button
          key={id}
          title={isAction ? "Download Resume" : label}
          onClick={() => handleIconClick(id as PanelId | "resume")}
          className={`p-2 rounded transition-colors relative group ${
            !isAction && activePanel === id
              ? "text-vscode-text-primary border-l-2 border-vscode-blue -ml-0.5 pl-[7px]"
              : isAction
              ? "text-vscode-text-muted hover:text-vscode-green hover:bg-vscode-green/10"
              : "text-vscode-text-muted hover:text-vscode-text-primary hover:bg-vscode-border"
          }`}
        >
          <Icon size={20} />
          {/* Tooltip for resume */}
          {isAction && (
            <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-vscode-border text-vscode-text-primary font-mono text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-vscode-border/80">
              Download Resume
            </span>
          )}
        </button>
      ))}
      <div className="flex-1" />
      <button
        title="Santosh's Copilot"
        onClick={onOpenCopilot}
        className={`p-2 rounded transition-colors ${
          copilotOpen
            ? "text-vscode-pink bg-vscode-pink/10"
            : "text-vscode-text-muted hover:text-vscode-pink hover:bg-vscode-pink/10"
        }`}
      >
        <Sparkles size={20} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full flex-shrink-0">
        {iconRailEl}
        {filePanel}
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="flex h-full bg-vscode-sidebar border-r border-vscode-border">
            {iconRailEl}
            {/* Force explorer open on mobile */}
            <div className="w-56 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-vscode-border">
                <span className="font-mono text-[11px] font-semibold text-vscode-text-muted uppercase tracking-widest">
                  Portfolio
                </span>
                <button
                  onClick={closeSidebar}
                  className="p-1 rounded hover:bg-vscode-border text-vscode-text-muted"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto thin-scrollbar py-1">
                {portfolioFiles.map((file) => {
                  const isActive = file.id === activeFileId && !file.externalHref;
                  return (
                    <button
                      key={file.id}
                      onClick={() => navigateToFile(file.id)}
                      className={`w-full flex items-center gap-2 px-4 py-1.5 font-mono text-[13px] transition-colors relative ${
                        isActive
                          ? "bg-vscode-border/60 text-vscode-text-primary"
                          : "text-vscode-text-muted hover:bg-vscode-border/30 hover:text-vscode-text-primary"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                          style={{ backgroundColor: file.accentColor }}
                        />
                      )}
                      <FileIcon type={file.icon} size={16} />
                      <span className="truncate">{file.filename}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={closeSidebar} />
        </div>
      )}
    </>
  );
}
