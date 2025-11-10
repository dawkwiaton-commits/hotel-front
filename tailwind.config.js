/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          sectionBg: "#8C9776", // teraz mamy zmienną
          brown900: "#4B3B2A",
          brown700: "#6B5533",
          brown100: "#F5EFE6",
        },
      },
    },
  };
  