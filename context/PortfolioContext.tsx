"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { sectionFiles, getFileById } from "@/lib/files";

const INITIAL_OPEN_TABS = sectionFiles.map((f) => f.id);
const INITIAL_ACTIVE = "home";

interface PortfolioContextValue {
  openTabs: string[];
  activeFileId: string;
  copilotOpen: boolean;
  sidebarOpen: boolean;
  terminalOpen: boolean;
  navigateToFile: (fileId: string) => void;
  closeTab: (fileId: string) => void;
  toggleCopilot: () => void;
  openCopilot: () => void;
  closeCopilot: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [openTabs, setOpenTabs] = useState<string[]>(INITIAL_OPEN_TABS);
  const [activeFileId, setActiveFileId] = useState<string>(INITIAL_ACTIVE);
  const [copilotOpen, setCopilotOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [terminalOpen, setTerminalOpen]   = useState(false);

  const navigateToFile = useCallback((fileId: string) => {
    const file = getFileById(fileId);
    if (!file) return;

    if (file.externalHref) {
      window.open(file.externalHref, "_blank");
      return;
    }

    setOpenTabs((prev) => (prev.includes(fileId) ? prev : [...prev, fileId]));
    setActiveFileId(fileId);
    setSidebarOpen(false);
  }, []);

  const closeTab = useCallback(
    (fileId: string) => {
      setOpenTabs((prev) => {
        const next = prev.filter((id) => id !== fileId);
        if (fileId === activeFileId) {
          // Switch to the tab to the left of the closed one, or the first remaining
          const idx = prev.indexOf(fileId);
          const newActive = next[Math.max(0, idx - 1)] ?? next[0] ?? "";
          setActiveFileId(newActive);
        }
        return next;
      });
    },
    [activeFileId]
  );

  const toggleCopilot   = useCallback(() => setCopilotOpen((v) => !v), []);
  const openCopilot     = useCallback(() => setCopilotOpen(true), []);
  const closeCopilot    = useCallback(() => setCopilotOpen(false), []);
  const toggleSidebar   = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar    = useCallback(() => setSidebarOpen(false), []);
  const openTerminal    = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal   = useCallback(() => setTerminalOpen(false), []);
  const toggleTerminal  = useCallback(() => setTerminalOpen((v) => !v), []);

  return (
    <PortfolioContext.Provider
      value={{
        openTabs,
        activeFileId,
        copilotOpen,
        sidebarOpen,
        terminalOpen,
        navigateToFile,
        closeTab,
        toggleCopilot,
        openCopilot,
        closeCopilot,
        toggleSidebar,
        closeSidebar,
        openTerminal,
        closeTerminal,
        toggleTerminal,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
