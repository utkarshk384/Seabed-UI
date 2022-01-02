// const theme = require("./.storybook/theme.json")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.stories.tsx"],
  darkMode: false,
  seabedui: {
    colorVariants: true,
    resetCSS: true,
  },
  presets: [require('@seabedui/presets')]
}