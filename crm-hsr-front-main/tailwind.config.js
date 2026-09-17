

/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: { fontFamily: {
        konkhmer: ['"Konkhmer Sleokchher"', 'sans-serif'],
        lexend: ['"Lexend Deca"', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },},
  },
  plugins: [],
}
