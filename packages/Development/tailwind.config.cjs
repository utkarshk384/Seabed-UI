module.exports = {
  darkmode: true,
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  seabedui: {
    theme: {
      defaultTheme: "dark",
    }
  },
  plugins: [],
  presets: [require("../preset/dist/index")]
}
