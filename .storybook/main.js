const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")
const fs = require("fs")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const SCSSPreset = {
  name: '@storybook/preset-scss',
  options: {
    cssLoaderOptions: {
       modules: {
         localIdentName: '[name]__[local]',
        },
    }
  }
}

module.exports = {
  babel: (config) => {
    config.presets.push(
      require.resolve('@linaria/babel-preset'),
    );
    return config;
  },
  webpackFinal: (config, {configType}) => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );


    config.module.rules.push({
      test: /\.ts$/,
      include: /packages/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-typescript'),
              require.resolve('@linaria/babel-preset'),
            ],
          },
        },
        {
          loader: '@linaria/webpack-loader',
          options: {
            babelOptions: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-typescript'),
                require.resolve('@linaria/babel-preset'),
              ],
            },
          },
        },
      ],
    });




    return config
  },
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    //TODO: Add accesibility addon later on
    // "@storybook/addon-a11y", 
    SCSSPreset,
    "storybook-dark-mode",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ]
}