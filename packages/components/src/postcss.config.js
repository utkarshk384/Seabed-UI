const cssvar = (varMain, varSecondary) => {
  return `var(${varMain}, var(${varSecondary}))`;
}


module.exports = {
    plugins: [
      require('tailwindcss')('./src/tailwind.config.js'),
      require('postcss-for'),
      require('postcss-functions')({
        function: {
          cssvar: cssvar
        }
      }),
      require("postcss-nested"),
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