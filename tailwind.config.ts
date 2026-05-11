import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["variant", '[data-theme="dark"] &'],
  theme: {
    extend: {
      colors: {
        bone: "rgb(var(--bone) / <alpha-value>)",
        "bone-2": "rgb(var(--bone-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        hairline: "rgb(var(--hairline-rgb) / var(--hairline-alpha))",
        signal: "#FF3D00",
        "signal-2": "#FF6A33",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wider2: "0.18em",
      },
      maxWidth: {
        shell: "1440px",
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ledPulse: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(255,61,0,0.55)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 0 3px rgba(255,61,0,0)" },
        },
      },
      animation: {
        "rise-in": "riseIn 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        marquee: "marquee 40s linear infinite",
        "led-pulse": "ledPulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
