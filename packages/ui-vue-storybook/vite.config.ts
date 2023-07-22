import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import loadCssModulePlugin from 'vite-plugin-load-css-module';

export default defineConfig({
  plugins: [
    vueJsx(),
    loadCssModulePlugin({
      include: id => id.endsWith('?module'),
    })
  ],
  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
})
