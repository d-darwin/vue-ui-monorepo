import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/addon-mdx-gfm"
  ],
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  typescript: {
    skipBabel: false,
    check: true,
  },
};
export default config;
