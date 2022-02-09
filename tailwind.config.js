const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      border: ['colorblind'],
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('colorblind', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.colorblind .${e(`colorblind${separator}${className}`)}`
        })
      })
    }),
  ],
}
