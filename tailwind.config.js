/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2f8',
          100: '#d6e0ee',
          200: '#b3c4de',
          300: '#8fa8ce',
          400: '#6b8cbe',
          500: '#4c73b0',
          600: '#3f5f93',
          700: '#344d78',
          800: '#2a3e61',
          900: '#22324e',
        },
        accent: {
          500: '#3fb6c6',
          600: '#3297a6',
          700: '#287b86',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
