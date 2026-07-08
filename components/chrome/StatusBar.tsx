"use client";

import React, { useState, useRef, useEffect } from "react";
import { GitBranch, AlertTriangle, Sparkles, Check } from "lucide-react";
import { getFileById } from "@/lib/files";
import { usePortfolio } from "@/context/PortfolioContext";
import { useClock } from "@/hooks/useClock";
import { useTheme, THEMES, type ThemeId } from "@/context/ThemeContext";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { availability } from "@/data/portfolio";

const AVAILABILITY_CONFIG = {
  open:        { color: "#a6e3a1", pulse: "bg-[#a6e3a1]", label: "Open to Work"         },
  passive:     { color: "#f9e2af", pulse: "bg-[#f9e2af]", label: "Passively Looking"    },
  unavailable: { color: "#f38ba8", pulse: "bg-[#f38ba8]", label: "Not Available"        },
} as const;

const AMBIENT_CONFIG = {
  off:  { icon: "🔇", label: "Sounds off"  },
  rain: { icon: "🌧", label: "Rain sounds" },
  cafe: { icon: "☕", label: "Café sounds" },
} as const;

interface StatusBarProps {
  onOpenCopilot: () => void;
}

export function StatusBar({ onOpenCopilot }: StatusBarProps) {
  const { activeFileId, copilotOpen } = usePortfolio();
  const clock = useClock();
  const file = getFileById(activeFileId);
  const { themeId, setThemeId } = useTheme();
  const { mode: ambientMode, cycle: cycleAmbient } = useAmbientSound();

  const avail     = AVAILABILITY_CONFIG[availability.status];
  const ambientCfg = AMBIENT_CONFIG[ambientMode];

  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef  = useRef<HTMLDivElement>(null);
  const buttonRef  = useRef<HTMLButtonElement>(null);

  const currentTheme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  // Close picker when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        pickerRef.current  && !pickerRef.current.contains(e.target as Node) &&
        buttonRef.current  && !buttonRef.current.contains(e.target as Node)
      ) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleThemeSelect = (id: ThemeId) => {
    setThemeId(id);
    setPickerOpen(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-between h-6 px-2 bg-vscode-statusbar text-white font-mono text-[11px] select-none"
      style={{ zIndex: 60 }}
    >
      {/* ── Left ──────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded">
          <AlertTriangle size={11} />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded">
          <GitBranch size={11} />
          <span>main</span>
        </span>

        {/* ── Availability dot ──────────────────── */}
        <span
          className="hidden sm:flex items-center gap-1.5 hover:bg-white/20 px-1.5 rounded cursor-default"
          title={avail.label}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${avail.pulse}`}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${avail.pulse}`} />
          </span>
          <span>{avail.label}</span>
        </span>
      </div>

      {/* ── Right ─────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenCopilot}
          className={`flex items-center gap-1 hover:bg-white/20 px-1 rounded ${
            copilotOpen ? "bg-white/20" : ""
          }`}
        >
          <Sparkles size={11} />
          <span>Copilot</span>
        </button>

        <span className="hidden sm:block hover:bg-white/20 px-1 rounded">
          {file?.languageLabel ?? "React"}
        </span>
        <span className="hidden md:block hover:bg-white/20 px-1 rounded">
          UTF-8
        </span>
        <span className="hidden md:block hover:bg-white/20 px-1 rounded">
          Prettier
        </span>

        {/* ── Theme button + picker ─────────────── */}
        <div className="relative hidden sm:block">
          <button
            ref={buttonRef}
            onClick={() => setPickerOpen((p) => !p)}
            className={`flex items-center gap-1 hover:bg-white/20 px-1.5 rounded transition-colors ${
              pickerOpen ? "bg-white/20" : ""
            }`}
          >
            <span className="text-[12px] leading-none">{currentTheme.icon}</span>
            <span>{currentTheme.name}</span>
          </button>

          {/* Floating theme picker */}
          {pickerOpen && (
            <div
              ref={pickerRef}
              className="absolute bottom-full right-0 mb-1.5 w-56 rounded-md shadow-2xl overflow-hidden"
              style={{
                background: "var(--color-sidebar)",
                border: "1px solid var(--color-border)",
                zIndex: 9000,
              }}
            >
              {/* Header */}
              <p
                className="px-3 pt-2.5 pb-1.5 text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: "var(--color-text-muted)" }}
              >
                Color Theme
              </p>

              {/* Theme list */}
              <ul className="pb-1.5">
                {THEMES.map((theme) => {
                  const isActive = themeId === theme.id;
                  return (
                    <li key={theme.id}>
                      <button
                        onClick={() => handleThemeSelect(theme.id as ThemeId)}
                        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] transition-colors"
                        style={{
                          color: "var(--color-text-primary)",
                          background: isActive
                            ? "var(--color-bg)"
                            : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "var(--color-bg)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "transparent";
                          }
                        }}
                      >
                        {/* Colored dot */}
                        <span
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-1 ring-white/10"
                          style={{ background: theme.dotColor }}
                        />

                        {/* Theme name */}
                        <span className="flex-1 text-left font-mono">
                          {theme.name}
                        </span>

                        {/* Checkmark for active */}
                        {isActive && (
                          <Check
                            size={13}
                            className="flex-shrink-0"
                            style={{ color: "var(--color-blue)" }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* ── Ambient sound toggle ──────────────── */}
        <button
          onClick={cycleAmbient}
          title={`${ambientCfg.label} — click to cycle`}
          className={`flex items-center gap-1 px-1 rounded transition-colors ${
            ambientMode !== "off" ? "bg-white/20" : "hover:bg-white/20"
          }`}
        >
          <span className="text-[11px] leading-none">{ambientCfg.icon}</span>
          {ambientMode !== "off" && (
            <span className="hidden md:inline">{ambientCfg.label}</span>
          )}
        </button>

        <span className="hover:bg-white/20 px-1 rounded">{clock}</span>
      </div>
    </div>
  );
}
