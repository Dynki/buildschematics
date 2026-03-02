import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode is the default — uses a class on <html>
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cherry Blossom biome — primary pink/sakura accent palette
        blossom: {
          50:  "#fff0f5",
          100: "#ffe0ed",
          200: "#ffc2d9",
          300: "#ff94be",
          400: "#ff5c9d",
          500: "#f0307a",
          600: "#d91865",
          700: "#b50f51",
          800: "#8f1143",
          900: "#720f3a",
          950: "#43021e",
        },
        // Cherry Blossom biome — soft lilac/lavender accent
        sakura: {
          50:  "#fdf4ff",
          100: "#fbe8ff",
          200: "#f5d0fe",
          300: "#ecadfd",
          400: "#df79fa",
          500: "#cc44f4",
          600: "#b026d9",
          700: "#911db2",
          800: "#761a91",
          900: "#611872",
          950: "#3f044f",
        },
        // Creamy white page backgrounds
        cream: {
          50:  "#fffefb",
          100: "#fdf8f0",
          200: "#faf0e4",
          300: "#f5e4d0",
          400: "#edd4bc",
        },
      },
      fontFamily: {
        // Clean modern sans; optional: swap for a pixelated font via @font-face
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        // Subtle pixel-grid overlay for hero sections — soft pink tint
        "pixel-grid":
          "repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(255,180,210,0.04) 31px,rgba(255,180,210,0.04) 32px),repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(255,180,210,0.04) 31px,rgba(255,180,210,0.04) 32px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
