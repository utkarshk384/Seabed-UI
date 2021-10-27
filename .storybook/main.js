const SCSSPreset = {
  name: "@storybook/preset-scss",
  options: {
    cssLoaderOptions: {
      modules: {
        localIdentName: "[name]__[local]",
      },
    },
  },
};

module.exports = {
  webpackFinal: (config, { configType }) => {
    config.resolve.plugins = config.resolve.plugins || [];
    
    clearconfig.module.rules[0].use[0].loader = "babel-loader"

    config.module.rules[0].use.push({
          loader: "/Volumes/Storage/coding/Projects/Personal/Seabed UI/node_modules/@linaria/webpack-loader",
          options: {
            babelOptions: {
              presets: [
                require.resolve("@babel/preset-env"),
                require.resolve("@babel/preset-typescript"),
                require.resolve("@linaria/babel-preset"),
              ],
            },
          }
        });

        console.log(config.module.rules[0].use)
        console.log(config.module.rules[1].use)

    return config;
  },
  stories: [
    "../packages/**/stories/*.stories.mdx",
    "../packages/**/stories/*.stories.tsx"
  ],
  addons: [
    "@storybook/addon-a11y",
    SCSSPreset,
    "@storybook/addon-essentials",
  ],
};
