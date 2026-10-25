import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#0F172A",
        },
        navy: {
          800: "#13264F",
          900: "#0B1B3D",
          950: "#070F24",
        },
        accent: {
          DEFAULT: "#F59E0B",
          gold: "#F59E0B",
          amber: "#D97706",
          coral: "#FF6B4A",
          light: "#FEF3C7",
        },
        brand: {
          dark: "#1E3A8A",
          light: "#EFF6FF",
          text: "#111827",
          muted: "#4B5563",
          border: "#E2E8F0",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card': '0 10px 30px -4px rgba(15, 23, 42, 0.08)',
        'elevated': '0 20px 40px -10px rgba(15, 23, 42, 0.12)',
        'glow-blue': '0 0 25px rgba(37, 99, 235, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};

export default config;
