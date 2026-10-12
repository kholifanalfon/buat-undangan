/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        win: {
          bg: '#0f172a',
          taskbar: 'rgba(30, 41, 59, 0.75)',
          acrylic: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.15)',
        },
        oneui: {
          squircle: '#ffffff',
          dark: '#1e1e24',
          accent: '#2c6bed',
        }
      },
      borderRadius: {
        'squircle': '28px',
      },
      backdropBlur: {
        'acrylic': '20px',
      }
    },
  },
  plugins: [],
}
