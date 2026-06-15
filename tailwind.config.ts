import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background ramp
        "bg-void": "#060509",
        "bg-cosmos": "#0B0A14",
        "bg-elevated": "#12111E",
        "bg-surface": "#1A1829",
        "bg-surface-hover": "#242236",
        // Gold / sacred metal ramp
        gold: {
          50: "#FFF8E7",
          100: "#F6E4B5",
          200: "#E8C97A",
          400: "#D4A256",
          500: "#C4893C",
          600: "#A3713A",
          800: "#7D5A2A",
        },
        // Saffron / copper
        saffron: {
          400: "#E8985E",
          500: "#D47E42",
        },
        copper: {
          400: "#B87333",
          600: "#8B5E30",
          800: "#5C3D1E",
        },
        // Semantic
        success: "#4ADE80",
        warning: "#FBBF24",
        error: "#F87171",
        info: "#60A5FA",
        // Text
        "text-primary": "#F2E8D8",
        "text-secondary": "#A89B8C",
        "text-muted": "#6E6259",
        "text-on-gold": "#2A1708",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
        input: "8px",
      },
      spacing: {
        "sp-1": "4px",
        "sp-2": "8px",
        "sp-3": "12px",
        "sp-4": "16px",
        "sp-5": "24px",
        "sp-6": "32px",
        "sp-8": "48px",
        "sp-10": "64px",
        "sp-16": "128px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        "chart-float": "0 30px 80px -24px rgba(0,0,0,0.6)",
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
