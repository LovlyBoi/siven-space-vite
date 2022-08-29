import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx(), eslint(), createHtmlPlugin({
      inject: {
        data: {
          title: '智文的前端笔记'
        }
      }
    })],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        components: resolve(__dirname, './src/components'),
        assets: resolve(__dirname, './src/assets'),
        pages: resolve(__dirname, './src/pages'),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    server: {
      host: '0.0.0.0',
    },
  }
})
