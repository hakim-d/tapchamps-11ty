const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['_site/**/*.html'],
    safelist: [],
    theme: {
      fontFamily: {
        'sans': ['noto-sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: '#FFA500',
        'light-blue': '#1847C9',
        blue: '#03237E',
        bluer: '#000A29',
        white: '#FFFFFF',
        beige: '#FFD890',
        beiger: '#806C48',
      },
      screens: {
        'xs': '475px',
        // => @media (min-width: 475px) { ... }
        ...defaultTheme.screens,
      }
    },
    plugins: [],
  }