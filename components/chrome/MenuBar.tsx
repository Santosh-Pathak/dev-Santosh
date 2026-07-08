"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

// ── Types ────────────────────────────────────────────────────────
type ActionItem = {
  type: "action";
  label: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
};
type SeparatorItem = { type: "separator" };
type DisabledItem  = { type: "disabled"; label: string; shortcut?: string; icon?: string };

type MenuItem = ActionItem | SeparatorItem | DisabledItem;

interface MenuDef {
  label: string;
  items: MenuItem[];
}

// ── Menu builder (uses context actions passed in) ─────────────────
function buildMenus(
  openPalette: () => void,
  openCopilot: () => void,
  navigateToFile: (id: string) => void,
  openTerminal: () => void,
  toggleTerminal: () => void,
): MenuDef[] {
  return [
    {
      label: "File",
      items: [
        { type: "disabled", label: "New File",         shortcut: "Ctrl+N",       icon: "📄" },
        { type: "disabled", label: "Open File…",       shortcut: "Ctrl+O",       icon: "📂" },
        { type: "separator" },
        { type: "disabled", label: "Save",             shortcut: "Ctrl+S",       icon: "💾" },
        { type: "disabled", label: "Save As…",         shortcut: "Ctrl+Shift+S", icon: "💾" },
        { type: "separator" },
        {
          type: "action",
          label: "Download Resume",
          shortcut: "",
          icon: "📥",
          action: () => {
            window.open(
              "https://drive.google.com/file/d/1lnHV6Ha3fpR1sQ45y8JJ9iXXKd427dZv/view?usp=sharing",
              "_blank",
            );
          },
        },
        { type: "separator" },
        { type: "disabled", label: "Close Editor",     shortcut: "Ctrl+W",       icon: "✕" },
        { type: "disabled", label: "Exit",             shortcut: "Alt+F4",       icon: "⏻" },
      ],
    },
    {
      label: "Edit",
      items: [
        { type: "disabled", label: "Undo",    shortcut: "Ctrl+Z",  icon: "↩" },
        { type: "disabled", label: "Redo",    shortcut: "Ctrl+Y",  icon: "↪" },
        { type: "separator" },
        { type: "disabled", label: "Cut",     shortcut: "Ctrl+X",  icon: "✂" },
        { type: "disabled", label: "Copy",    shortcut: "Ctrl+C",  icon: "📋" },
        { type: "disabled", label: "Paste",   shortcut: "Ctrl+V",  icon: "📌" },
        { type: "separator" },
        { type: "disabled", label: "Find",    shortcut: "Ctrl+F",  icon: "🔍" },
        { type: "disabled", label: "Replace", shortcut: "Ctrl+H",  icon: "🔄" },
      ],
    },
    {
      label: "View",
      items: [
        {
          type: "action",
          label: "Command Palette…",
          shortcut: "Ctrl+P",
          icon: "⌘",
          action: openPalette,
        },
        { type: "separator" },
        {
          type: "action",
          label: "Explorer",
          shortcut: "Ctrl+Shift+E",
          icon: "📁",
          action: () => navigateToFile("home"),
        },
        {
          type: "action",
          label: "Toggle Copilot Panel",
          shortcut: "Ctrl+Shift+C",
          icon: "✨",
          action: openCopilot,
        },
        { type: "separator" },
        { type: "disabled", label: "Zoom In",  shortcut: "Ctrl+=", icon: "🔎" },
        { type: "disabled", label: "Zoom Out", shortcut: "Ctrl+-", icon: "🔍" },
        { type: "separator" },
        { type: "disabled", label: "Full Screen", shortcut: "F11", icon: "⛶" },
      ],
    },
    {
      label: "Go",
      items: [
        {
          type: "action",
          label: "Go to File…",
          shortcut: "Ctrl+P",
          icon: "🔎",
          action: openPalette,
        },
        { type: "separator" },
        {
          type: "action", label: "home.tsx",
          icon: "⚛", shortcut: "", action: () => navigateToFile("home"),
        },
        {
          type: "action", label: "about.html",
          icon: "🌐", shortcut: "", action: () => navigateToFile("about"),
        },
        {
          type: "action", label: "projects.js",
          icon: "📦", shortcut: "", action: () => navigateToFile("projects"),
        },
        {
          type: "action", label: "skills.json",
          icon: "{}", shortcut: "", action: () => navigateToFile("skills"),
        },
        {
          type: "action", label: "experience.ts",
          icon: "🔷", shortcut: "", action: () => navigateToFile("experience"),
        },
        {
          type: "action", label: "contact.css",
          icon: "🎨", shortcut: "", action: () => navigateToFile("contact"),
        },
        {
          type: "action", label: "README.md",
          icon: "📝", shortcut: "", action: () => navigateToFile("readme"),
        },
      ],
    },
    {
      label: "Run",
      items: [
        { type: "disabled", label: "Start Debugging",      shortcut: "F5",           icon: "▶" },
        { type: "disabled", label: "Run Without Debugging", shortcut: "Ctrl+F5",     icon: "▷" },
        { type: "disabled", label: "Stop Debugging",       shortcut: "Shift+F5",     icon: "⏹" },
        { type: "separator" },
        { type: "disabled", label: "Add Breakpoint",       shortcut: "F9",           icon: "🔴" },
        { type: "disabled", label: "Toggle Breakpoints",   shortcut: "Ctrl+F9",      icon: "🔵" },
      ],
    },
    {
      label: "Terminal",
      items: [
        {
          type: "action",
          label: "New Terminal",
          shortcut: "Ctrl+`",
          icon: ">_",
          action: openTerminal,
        },
        {
          type: "action",
          label: "Toggle Terminal",
          shortcut: "Ctrl+`",
          icon: "⊟",
          action: toggleTerminal,
        },
        { type: "separator" },
        { type: "disabled", label: "Split Terminal",    shortcut: "",   icon: "⊞" },
        { type: "separator" },
        {
          type: "action",
          label: "Run Dev Server",
          shortcut: "",
          icon: "⚡",
          action: () => { window.open("http://localhost:3000", "_blank"); },
        },
      ],
    },
    {
      label: "Help",
      items: [
        { type: "disabled", label: "Welcome",               shortcut: "", icon: "👋" },
        { type: "disabled", label: "Documentation",         shortcut: "", icon: "📖" },
        { type: "disabled", label: "Keyboard Shortcuts",    shortcut: "Ctrl+K Ctrl+S", icon: "⌨" },
        { type: "separator" },
        {
          type: "action",
          label: "View on GitHub",
          shortcut: "",
          icon: "🐙",
          action: () => window.open("https://github.com/Santosh-Pathak", "_blank"),
        },
        {
          type: "action",
          label: "Connect on LinkedIn",
          shortcut: "",
          icon: "💼",
          action: () => window.open("https://www.linkedin.com/in/santosh-pathak-dev/", "_blank"),
        },
        { type: "separator" },
        { type: "disabled", label: "About Santosh Dark v1.0", shortcut: "", icon: "🎨" },
      ],
    },
    {
      label: "Copilot",
      items: [
        {
          type: "action",
          label: "Open Copilot Chat",
          shortcut: "Ctrl+Shift+C",
          icon: "✨",
          action: openCopilot,
        },
        { type: "separator" },
        {
          type: "action",
          label: "Tell me about Santosh",
          shortcut: "",
          icon: "👤",
          action: openCopilot,
        },
        {
          type: "action",
          label: "What projects has he built?",
          shortcut: "",
          icon: "📦",
          action: openCopilot,
        },
        {
          type: "action",
          label: "What's his tech stack?",
          shortcut: "",
          icon: "🛠",
          action: openCopilot,
        },
        {
          type: "action",
          label: "How can I contact Santosh?",
          shortcut: "",
          icon: "📧",
          action: openCopilot,
        },
        { type: "separator" },
        { type: "disabled", label: "Copilot Settings", shortcut: "", icon: "⚙" },
      ],
    },
  ];
}

// ── Dropdown component ────────────────────────────────────────────
function Dropdown({
  menu,
  isOpen,
  onClose,
}: {
  menu: MenuDef;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-0.5 min-w-[220px] bg-[#1c1c2e] border border-vscode-border rounded shadow-2xl z-50 py-1 overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
    >
      {menu.items.map((item, i) => {
        if (item.type === "separator") {
          return <div key={i} className="my-1 border-t border-vscode-border/60 mx-2" />;
        }
        if (item.type === "disabled") {
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-1 font-mono text-[12px] text-vscode-text-muted/40 select-none"
            >
              <span className="w-4 text-center text-[11px] flex-shrink-0 opacity-40">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <span className="text-[10px] opacity-30 ml-4 flex-shrink-0">{item.shortcut}</span>
              )}
            </div>
          );
        }
        // action
        return (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-1 font-mono text-[12px] text-vscode-text-muted hover:bg-vscode-blue/20 hover:text-vscode-text-primary transition-colors text-left group"
          >
            <span className="w-4 text-center text-[11px] flex-shrink-0 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="text-[10px] text-vscode-text-muted/50 ml-4 flex-shrink-0 font-mono">
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── MenuBar ───────────────────────────────────────────────────────
export function MenuBar({
  onOpenPalette,
  onOpenCopilot,
}: {
  onOpenPalette: () => void;
  onOpenCopilot: () => void;
}) {
  const { navigateToFile, openTerminal, toggleTerminal } = usePortfolio();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const menus = buildMenus(onOpenPalette, onOpenCopilot, navigateToFile, openTerminal, toggleTerminal);

  const toggle = useCallback((label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  }, []);

  const close = useCallback(() => setOpenMenu(null), []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (openMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu, close]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  return (
    <div ref={barRef} className="hidden md:flex items-center h-6 px-2 gap-0.5">
      {menus.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            onClick={() => toggle(menu.label)}
            onMouseEnter={() => openMenu && openMenu !== menu.label && toggle(menu.label)}
            className={`px-2 py-0.5 font-mono text-[11px] rounded transition-colors ${
              openMenu === menu.label
                ? "bg-vscode-blue/20 text-vscode-text-primary"
                : "text-vscode-text-muted hover:bg-vscode-border hover:text-vscode-text-primary"
            }`}
          >
            {menu.label}
          </button>
          <Dropdown menu={menu} isOpen={openMenu === menu.label} onClose={close} />
        </div>
      ))}
    </div>
  );
}
