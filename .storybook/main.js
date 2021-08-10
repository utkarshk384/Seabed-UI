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


    config.module.rules[0].use.push({
      loader: "@linaria/webpack-loader",
      options: {
        babelOptions: {
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-typescript"),
            require.resolve("@linaria/babel-preset"),
          ],
        },
      },
    });

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
