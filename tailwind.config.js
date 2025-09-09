/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // inclut tous tes composants React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",      // violet premium
        secondary: "#F472B6",    // rose
        accent: "#22D3EE",       // bleu clair
        success: "#34D399",      // vert
        warning: "#FBBF24",      // jaune
        error: "#EF4444",        // rouge
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "xl-soft": "0 10px 25px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),  // pour styliser tes inputs et boutons
    require("@tailwindcss/typography"), // si tu as des textes longs
  ],
};
