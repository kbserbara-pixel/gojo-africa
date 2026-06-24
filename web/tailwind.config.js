/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Secondary accent -- warm gold/orange, used for AI-related CTAs and
        // highlights so they pop against the deep-green (emerald) primary
        // brand color. Matches the --accent2 gold already used in the
        // pitch deck (#e8b84b) for visual continuity across deliverables.
        gold: {
          50: "#fdf8ec",
          100: "#faf0d3",
          200: "#f3dfa3",
          300: "#ecce72",
          400: "#e8b84b",
          500: "#d9a233",
          600: "#b8842a",
          700: "#8f6620",
          800: "#664a17",
          900: "#3d2c0e",
        },
      },
    },
  },
  plugins: [],
};
