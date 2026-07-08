"use client";

import React, { useEffect, useState } from "react";

const SPLASH_MS = 1800;
const STORAGE_KEY = "sp-splash-shown";

export function SplashScreen() {
  const [show, setShow]       = useState(false);
  const [fading, setFading]   = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only show on very first visit per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");

    setShow(true);

    // Animate loading bar
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (SPLASH_MS * 0.85), 1);
      // Ease-out curve
      setBarWidth(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Start fade-out
    const fade = setTimeout(() => {
      setFading(true);
      setTimeout(() => setShow(false), 500);
    }, SPLASH_MS);

    return () => {
      clearTimeout(fade);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                  bg-vscode-titlebar select-none transition-opacity duration-500
                  ${fading ? "opacity-0" : "opacity-100"}`}
    >
      {/* VS Code-style icon */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-2xl"
          style={{ background: "linear-gradient(135deg, #007acc 0%, #c586c0 100%)" }}
        >
          {"</>"}
        </div>
        <div className="text-center">
          <p className="font-display font-extrabold text-vscode-bright text-xl tracking-tight">
            Santosh Pathak
          </p>
          <p className="font-mono text-vscode-text-muted text-xs mt-1">
            Software Development Engineer
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="w-48 h-[3px] bg-vscode-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-none"
          style={{
            width: `${barWidth * 100}%`,
            background: "linear-gradient(90deg, #007acc, #c586c0)",
          }}
        />
      </div>
      <p className="font-mono text-[10px] text-vscode-text-muted mt-3 opacity-60">
        Loading portfolio…
      </p>
    </div>
  );
}
