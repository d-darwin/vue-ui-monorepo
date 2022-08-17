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
  ]
}
