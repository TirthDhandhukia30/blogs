/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        instrument: ['"Instrument Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f6f7f8",
          100: "#e6e7eb",
          200: "#cfd2d9",
          300: "#b0b4bf",
          400: "#8a8e9c",
          500: "#6b6f80",
          600: "#525461",
          700: "#41424c",
          800: "#2a2b32",
          900: "#191a20",
        },
      },
      boxShadow: {
        glow: "0 0 25px rgba(145, 180, 255, 0.25)",
      },
      animation: {
        "blur-in": "blurIn 0.8s ease forwards",
        shimmer: "shimmer 3s linear infinite",
        "shooting-star": "shooting 6s linear infinite",
      },
      keyframes: {
        blurIn: {
          "0%": { filter: "blur(24px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        shooting: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "translateX(300px) translateY(80px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
