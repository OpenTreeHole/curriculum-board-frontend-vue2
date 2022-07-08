import { defineConfig } from 'vite'
import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import envCompatible from 'vite-plugin-env-compatible'
import { injectHtml } from 'vite-plugin-html'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: ''
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: /^fs$/,
        replacement: require.resolve('rollup-plugin-node-builtins')
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    createVuePlugin({ jsx: true }),
    viteCommonjs(),
    envCompatible(),
    injectHtml(),
    Components({
      resolvers: [VuetifyResolver()]
    })
  ],
  build: {}
})
