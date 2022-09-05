import { UserConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteAliases } from 'vite-aliases'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

const prodConfig: UserConfig = {
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    // 我的 VSCode 对这个类型判断不对，但我看他源码导出的就是 Plugin 类型
    ViteAliases() as unknown as Plugin,
    createHtmlPlugin({
      inject: {
        data: {
          title: '智文的前端笔记',
        },
      },
    }),
    // 生产版本确保 ES5，Vite 默认打包模块化
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}

export default prodConfig
