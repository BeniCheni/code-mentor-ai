import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1e40af', // A deep blue
        'brand-secondary': '#3b82f6', // A lighter, vibrant blue
        'base-100': '#111827', // Almost black
        'base-200': '#1f2937', // Dark gray
        'base-300': '#374151', // Medium gray
        'content-100': '#d1d5db', // Light gray for text
        'content-200': '#9ca3af', // Muted gray for secondary text
      },
    },
  },
  plugins: [
    typography,
  ],
}