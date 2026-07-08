"use client";

import React, { useEffect, useState } from "react";
import { Keyboard, X } from "lucide-react";

const STORAGE_KEY = "sp-shortcuts-shown";
const DISPLAY_MS  = 7000;

const shortcuts = [
  { keys: ["Ctrl", "P"],       desc: "Navigate / search files" },
  { keys: ["Ctrl", "`"],       desc: "Toggle terminal" },
  { keys: ["Ctrl", "Shift", "C"], desc: "Open Copilot" },
];

export function ShortcutToast() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Delay slightly so page renders first
    const show = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => dismiss(), DISPLAY_MS);
    return () => clearTimeout(hide);
  }, [visible]);

  const dismiss = () => {
    setLeaving(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 260);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]
                  flex items-start gap-3 px-4 py-3 rounded-lg shadow-2xl
                  border border-vscode-border bg-vscode-sidebar
                  font-mono text-xs max-w-sm w-[calc(100vw-2rem)]
                  ${leaving ? "toast-out" : "toast-in"}`}
    >
      <Keyboard size={14} className="text-vscode-blue flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-vscode-text-primary font-semibold mb-2 text-[11px] tracking-wide">
          Keyboard shortcuts
        </p>
        <div className="flex flex-col gap-1.5">
          {shortcuts.map((s) => (
            <div key={s.desc} className="flex items-center justify-between gap-4">
              <span className="text-vscode-text-muted text-[10px]">{s.desc}</span>
              <span className="flex items-center gap-1 flex-shrink-0">
                {s.keys.map((k, i) => (
                  <React.Fragment key={k}>
                    <kbd className="px-1.5 py-0.5 rounded bg-vscode-bg border border-vscode-border text-vscode-text-primary text-[9px]">
                      {k}
                    </kbd>
                    {i < s.keys.length - 1 && (
                      <span className="text-vscode-text-muted text-[9px]">+</span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={dismiss}
        className="text-vscode-text-muted hover:text-vscode-text-primary transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
