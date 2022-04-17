let LOCAL_INDENT_NAME = '[local]';
/* TODO
if (process.env.NODE_ENV === 'production') {
  LOCAL_INDENT_NAME = '[name]_[local]_[hash:base64:5]';
}
*/

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
    const cssRule = config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/'
    );
    cssRule.use = [
      'style-loader',
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
