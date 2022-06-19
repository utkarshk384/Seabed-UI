// const theme = require("./.storybook/theme.json")

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.stories.tsx"],
  seabedui: {
    colorVariants: true,
    resetCSS: true,
    theme: {
      defaultTheme: 'dark',
    }
  },
  presets: [require('@seabedui/presets')]
}