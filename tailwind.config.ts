import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "km-gold":       "#C49030",
        "km-gold-hover": "#A97A28",
        "km-dark":       "#1A1A1A",
        "km-surface":    "#FFFFFF",
        "km-bg":         "#F6F6F6",
        "km-text":       "#1A1A1A",
        "km-muted":      "#6B6B6B",
        "km-border":     "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn:  "10px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(26, 26, 26, 0.08)",
        gold: "0 4px 16px rgba(196, 144, 48, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
