import { UserConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteAliases } from 'vite-aliases'
import vueJsx from '@vitejs/plugin-vue-jsx'

const config: UserConfig = {
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    // 我的 VSCode 对这个类型判断不对，但我看他源码导出的就是 Plugin 类型
    ViteAliases() as unknown as Plugin,
    createHtmlPlugin({
      inject: {
        data: {
          title: '本地美食推荐',
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
}

export default config
