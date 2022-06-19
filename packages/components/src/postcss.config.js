module.exports = {
  plugins: [
    require('@tailwindcss/nesting'),
    require('postcss-each')({
      plugins: {
        afterEach: [require('autoprefixer'), require('tailwindcss')('./src/tailwind.config.js')]
      }
    }),
    require('tailwindcss')('./src/tailwind.config.js'),
    require('postcss-for'),
    require('autoprefixer'),
    require("cssnano")({
      preset: ['default', {
        discardComments: {
          removeAll: true,
          mergeRules: false,
          uniqueSelectors: false
        }
      }],
    })
  ]
}