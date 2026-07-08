"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const THEMES = [
  { id: "santosh-dark", name: "Santosh Dark", icon: "💜", dotColor: "#007acc" },
  { id: "rose-pine",    name: "Rosé Pine",    icon: "🌸", dotColor: "#eb6f92" },
  { id: "tokyo-night",  name: "Tokyo Night",  icon: "✨", dotColor: "#7aa2f7" },
  { id: "catppuccin",   name: "Catppuccin",   icon: "😺", dotColor: "#c6a0f6" },
  { id: "nord",         name: "Nord",         icon: "❄️", dotColor: "#88c0d0" },
  { id: "gruvbox",      name: "Gruvbox",      icon: "🔥", dotColor: "#fabd2f" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "santosh-dark",
  setThemeId: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("santosh-dark");

  // Restore persisted theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setThemeIdState(saved);
    }
  }, []);

  // Apply data-theme attribute to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("portfolio-theme", themeId);
  }, [themeId]);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
