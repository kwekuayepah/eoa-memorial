import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFDF9",
          alt: "#FFF8F0",
          card: "#FFFFFF",
        },
        gold: {
          DEFAULT: "#C5A355",
          light: "#E8D5A3",
          dark: "#8B7235",
          muted: "#D4C08E",
        },
        rose: {
          memorial: "#D4736C",
          muted: "#E8B4B0",
          deep: "#B83A3A",
        },
        text: {
          DEFAULT: "#2A2118",
          muted: "#6B5D4F",
          light: "#9B8E80",
        },
        border: {
          DEFAULT: "#E8DFD3",
          gold: "#D4C08E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
