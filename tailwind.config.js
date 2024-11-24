/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ['"Geist Mono"', "monospace"],
        hostGrotest: ["Host Grotesk", "monospace"],
        montserrat: ["Montserrat", "monospace"],
      },
    },
  },
  plugins: [],
};
