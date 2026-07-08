"use client";

import React, { useRef } from "react";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { FileCode2 } from "lucide-react";

import { TitleBar } from "@/components/chrome/TitleBar";
import { Sidebar } from "@/components/chrome/Sidebar";
import { TabBar } from "@/components/chrome/TabBar";
import { Breadcrumb } from "@/components/chrome/Breadcrumb";
import { StatusBar } from "@/components/chrome/StatusBar";
import { CommandPalette } from "@/components/chrome/CommandPalette";
import { CopilotPanel } from "@/components/chrome/CopilotPanel";
import { ActiveLineHighlight } from "@/components/ui/ActiveLineHighlight";

import { Terminal } from "@/components/chrome/Terminal";
import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ReadmeSection } from "@/components/sections/ReadmeSection";
import { BlogsSection } from "@/components/sections/BlogsSection";

/** Renders the section that corresponds to the currently active tab */
function ActiveSection({ fileId }: { fileId: string }) {
  switch (fileId) {
    case "home":       return <HomeSection />;
    case "about":      return <AboutSection />;
    case "projects":   return <ProjectsSection />;
    case "skills":     return <SkillsSection />;
    case "experience": return <ExperienceSection />;
    case "contact":    return <ContactSection />;
    case "readme":     return <ReadmeSection />;
    case "blogs":      return <BlogsSection />;
    default:           return null;
  }
}

/** Shown when all tabs have been closed */
function EmptyEditor({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4 text-vscode-text-muted">
      <FileCode2 size={48} strokeWidth={1} className="opacity-30" />
      <p className="font-mono text-sm">No file is open</p>
      <p className="font-mono text-xs opacity-60">
        Select a file from the sidebar or open one with
      </p>
      <button
        onClick={onOpen}
        className="font-mono text-xs border border-vscode-border px-3 py-1.5 rounded hover:bg-vscode-border/50 hover:text-vscode-text-primary transition-colors"
      >
        Ctrl + P
      </button>
    </div>
  );
}

function PortfolioApp() {
  const {
    openCopilot, copilotOpen, toggleSidebar,
    activeFileId, openTabs,
    terminalOpen, toggleTerminal,
  } = usePortfolio();

  const editorRef = useRef<HTMLDivElement>(null);

  const { isOpen, open, close, query, setQuery, selectedIndex, setSelectedIndex } =
    useCommandPalette(openCopilot);

  // Ctrl+` toggles terminal
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`" && e.ctrlKey) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleTerminal]);

  const hasOpenTabs = openTabs.length > 0 && activeFileId !== "";

  return (
    <div
      className="flex flex-col bg-vscode-bg text-vscode-text-primary overflow-hidden pb-6"
      style={{ height: "100dvh" }}
    >
      {/* VS Code title bar */}
      <TitleBar onOpenPalette={open} onToggleSidebar={toggleSidebar} onOpenCopilot={openCopilot} />

      {/* Editor area */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* Sidebar */}
        <Sidebar onOpenCopilot={openCopilot} copilotOpen={copilotOpen} />

        {/* Main editor column */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TabBar />
          {hasOpenTabs && <Breadcrumb />}

          {hasOpenTabs ? (
            /*
             * key={activeFileId} triggers animate-tab-enter + resets scroll
             * every time the user switches to a different file tab.
             */
            <div
              ref={editorRef}
              key={activeFileId}
              className="flex-1 overflow-y-auto thin-scrollbar pb-6 min-h-0 animate-tab-enter relative"
            >
              <ActiveLineHighlight containerRef={editorRef} />
              <ActiveSection fileId={activeFileId} />
            </div>
          ) : (
            <EmptyEditor onOpen={open} />
          )}

          {/* Integrated terminal panel */}
          {terminalOpen && <Terminal />}
        </main>

        {/* Copilot panel */}
        {copilotOpen && <CopilotPanel />}
      </div>

      {/* Fixed status bar */}
      <StatusBar onOpenCopilot={openCopilot} />

      {/* Command palette modal */}
      <CommandPalette
        isOpen={isOpen}
        query={query}
        setQuery={setQuery}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onClose={close}
      />
    </div>
  );
}

export default function Page() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
