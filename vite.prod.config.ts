import { UserConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteAliases } from 'vite-aliases'
import viteCDNPlugin from 'vite-plugin-cdn-import'
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
      targets: ['defaults', 'not IE 11'],
    }),
    // cdn
    viteCDNPlugin({
      modules: [
        {
          name: 'axios',
          var: 'axios',
          path: 'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js',
        },
        // {
        //   name: 'masonry-layout',
        //   var: 'Masonry',
        //   path: 'https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/masonry.min.js'
        // },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
}

export default prodConfig
