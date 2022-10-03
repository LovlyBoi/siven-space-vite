import { defineConfig } from 'vite'
import devConfig from './vite.dev.config'
import prodConfig from './vite.prod.config'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return devConfig
  } else {
    return prodConfig
  }
})
