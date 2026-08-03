import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        panel: "#111827",
        surface: "#f3f6fb",
        card: "#ffffff",
        accent: "#0f766e",
        accentSoft: "#ccfbf1",
        warn: "#ea580c",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
