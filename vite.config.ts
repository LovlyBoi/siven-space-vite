import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteAliases } from 'vite-aliases'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      eslint(),
      // 不知道为啥，我的 VSCode 对这个类型判断不对，我看他源码导出的就是 Plugin 类型
      ViteAliases() as unknown as Plugin,
      createHtmlPlugin({
        inject: {
          data: {
            title: '智文的前端笔记',
          },
        },
      }),
    ],
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
