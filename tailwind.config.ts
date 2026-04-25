import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        void: "#050507",
        depth: "#0a0a0f",
        surface: "#111118",
        border: "#1c1c28",
        muted: "#2a2a3d",
        ash: "#c8c8d4",
        ghost: "#6b6b80",
        whisper: "#3a3a50",
        neon: "#00ffc2",
        volt: "#7c3aed",
        ember: "#ff6b35",
      },

      // ── Font Families ────────────────────────────────────────
      fontFamily: {
        display: ["Editorial New", "Playfair Display", "Georgia", "serif"],
        body: ["Geist Mono", "IBM Plex Mono", "monospace"],
        sans: ["Satoshi", "DM Sans", "sans-serif"],
      },

      // ── Font Sizes (mirrors CSS vars) ───────────────────────
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.25rem", { lineHeight: "1.4" }],
        xl: ["1.5rem", { lineHeight: "1.3" }],
        "2xl": ["2rem", { lineHeight: "1.2" }],
        "3xl": ["3rem", { lineHeight: "1.1" }],
        "4xl": ["5rem", { lineHeight: "1.0" }],
        hero: ["clamp(4rem,10vw,9rem)", { lineHeight: "0.95" }],
        titan: ["clamp(6rem,14vw,13rem)", { lineHeight: "0.9" }],
      },

      // ── Spacing ──────────────────────────────────────────────
      spacing: {
        section: "clamp(6rem, 12vw, 10rem)",
        gutter: "clamp(1.5rem, 5vw, 5rem)",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },

      // ── Max Widths ───────────────────────────────────────────
      maxWidth: {
        site: "1440px",
        content: "800px",
        narrow: "560px",
      },

      // ── Border Radius ────────────────────────────────────────
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },

      // ── Animations ───────────────────────────────────────────
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },

      // ── Box Shadow ───────────────────────────────────────────
      boxShadow: {
        neon: "0 0 40px rgba(0,255,194,0.35), 0 0 80px rgba(0,255,194,0.12)",
        volt: "0 0 40px rgba(124,58,237,0.3)",
        card: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        deep: "0 24px 80px rgba(0,0,0,0.6)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.06)",
      },

      // ── Background Gradient ─────────────────────────────────
      backgroundImage: {
        "neon-fade": "linear-gradient(135deg, #00ffc2 0%, #00b4d8 100%)",
        "volt-fade": "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
        "void-fade": "linear-gradient(180deg, #050507 0%, #0a0a0f 100%)",
        "surface-fade": "linear-gradient(180deg, #111118 0%, #0a0a0f 100%)",
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      // ── Z-index ──────────────────────────────────────────────
      zIndex: {
        below: "-1",
        raised: "10",
        overlay: "50",
        modal: "100",
        cursor: "1000",
        toast: "2000",
      },

      // ── Keyframes ────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,255,194,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(0,255,194,0.6)" },
        },
        "cursor-appear": {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "pulse-neon": "pulse-neon 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
