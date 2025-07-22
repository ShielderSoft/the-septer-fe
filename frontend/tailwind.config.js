/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Light Mode Palette
        'light-bg': '#F0F4F8',
        'light-surface': '#FFFFFF',
        'light-text-primary': '#102A43',
        'light-text-secondary': '#486581',
        'light-primary': '#3B82F6', // A nice blue
        'light-accent': '#10B981', // A contrasting green

        // New Dark Mode Palette
        'dark-bg': '#0B1120',
        'dark-surface': '#1A233A',
        'dark-text-primary': '#F0F4F8',
        'dark-text-secondary': '#9FB3C8',
        'dark-primary': '#38BDF8', // A vibrant cyan
        'dark-accent': '#F471B5', // A striking magenta
      },
      animation: {
        // ... (animations remain the same)
        'gradient-x': 'gradient-x 5s ease infinite',
        'spin-slow': 'spin 10s linear infinite',
        'spin-slower': 'spin 15s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'pulse-deep': 'pulse-deep 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        // ... (keyframes remain the same)
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-deep': {
           '0%, 100%': { opacity: '1', transform: 'scale(1)' },
           '50%': { opacity: '.5', transform: 'scale(0.95)' },
        }
      }
    },
  },
  plugins: [],
}