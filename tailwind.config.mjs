/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightBlue: '#00ADEE',
        darkBlue: '#262261',
      },
    },
  },
  plugins: [],
}
