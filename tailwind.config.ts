import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg:             "var(--color-bg)",
          sidebar:        "var(--color-sidebar)",
          titlebar:       "var(--color-titlebar)",
          statusbar:      "var(--color-statusbar)",
          border:         "var(--color-border)",
          "text-primary": "var(--color-text-primary)",
          "text-muted":   "var(--color-text-muted)",
          pink:           "var(--color-pink)",
          blue:           "var(--color-blue)",
          cyan:           "var(--color-cyan)",
          purple:         "var(--color-purple)",
          green:          "var(--color-green)",
          orange:         "var(--color-orange)",
          yellow:         "var(--color-yellow)",
          red:            "var(--color-red)",
          bright:         "var(--color-bright)",
        },
      },
      fontFamily: {
        mono:    ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-syne)", "sans-serif"],
        sans:    ["var(--font-outfit)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight:   "-0.01em",
        normal:  "0.01em",
        wide:    "0.04em",
        wider:   "0.08em",
        widest:  "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
