/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        colors: {
        primary: '#3b82f6', // 파란색
        accent: '#facc15',  // 노란색
        },
        fontFamily: {
        sans: ['CookieRun-Regular', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}