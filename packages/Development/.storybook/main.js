module.exports = {
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links", 
    '@storybook/addon-actions/register',
    '@whitespace/storybook-addon-html',
    {
      name: "@storybook/addon-essentials", 
      options: { backgrounds: false, outline: false,  }
    },
    {
    name: '@storybook/addon-postcss',
      options: {
          postcssLoaderOptions: {
            implementation: require('postcss'),
          },
      },
    },
  ],
  

  webpackFinal: async (config, { configType }) => {

    // SVG
    // Needed for SVG importing using svgr

    const indexOfRuleToRemove = config.module.rules.findIndex((rule) =>
      rule.test?.toString().includes("svg")
    )
    config.module.rules.splice(indexOfRuleToRemove, 1, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve("file-loader"),
      options: {
        name: "static/media/[name].[hash:8].[ext]",
        esModule: false
      }
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false
          }
        }
      ]
    })

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias
        }
      }
    }
  }
}