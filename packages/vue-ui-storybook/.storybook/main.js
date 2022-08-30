const path = require("path");

module.exports = {
  core: {
    builder: "webpack5",
  },
  framework: "@storybook/vue3",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules"
  ],
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx$/,
      include: path.resolve(__dirname, '../../vue-ui/src'),
      use: 'vue-docgen-loader',
      enforce: 'post'
    })
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: "asset/resource",
    })
    return config;
  },
}
