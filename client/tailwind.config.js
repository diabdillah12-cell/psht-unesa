/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        psht: {
          dark: '#0d0d11',
          card: '#15151c',
          border: '#272732',
          gold: '#f59e0b',
          goldLight: '#fbbf24',
          goldDark: '#b45309',
          accent: '#ef4444',
          white: '#f8fafc',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
