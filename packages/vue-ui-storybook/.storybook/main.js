// const path = require("path");

const LOCAL_INDENT_NAME = '[local]'; // use '[name]_[local]_[hash:base64:5]'; for prod build

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",
  webpackFinal: async (config) => {
    /* config.resolve.alias = {
      ...(config.resolve ? config.resolve.alias : {}),
      "@": path.resolve(__dirname, "../src/")
    }; */

    const cssRule = config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/'
    );
    cssRule.use = [
      {
        loader: 'style-loader',
        options: {}
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: LOCAL_INDENT_NAME,
          },
        }
      },
    ];

    return config;
  }
}
