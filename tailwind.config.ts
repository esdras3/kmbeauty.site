import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "km-gold":       "#A2770D",
        "km-gold-hover": "#8A650B",
        "km-dark":       "#171413",
        "km-surface":    "#FFFFFF",
        "km-bg":         "#F4F1EA",
        "km-text":       "#211B17",
        "km-muted":      "#4F4841",
        "km-border":     "#D9D1C7",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "Arial", "sans-serif"],
        body:    ["var(--font-poppins)", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn:  "10px",
      },
      boxShadow: {
        card: "0 8px 32px rgba(26, 26, 26, 0.08)",
        gold: "0 4px 16px rgba(196, 144, 48, 0.25)",
        soft: "0 20px 60px rgba(17, 17, 17, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
