import { ref, watch } from 'vue'
import { getChache, setCache } from './useCache'

type ThemeMode = 'light' | 'dark'

const mqList =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

mqList &&
  mqList.addEventListener('change', (e) => {
    // const cachedMode = getChache<ThemeMode | undefined>('app_theme', true)
    // // 如果用户操作过系统样式
    // if (cachedMode) return
    const mode = e.matches ? 'dark' : 'light'
    setTheme(mode)
    currTheme.value = mode
  })

const currTheme = ref<ThemeMode>('light')

watch(currTheme, (nextTheme) => {
  setDarkMode(nextTheme)
})

function setTheme(mode: ThemeMode) {
  const html = document.documentElement
  if (mode === 'light') {
    html.classList.remove('dark')
  } else if (mode === 'dark') {
    html.classList.add('dark')
  } else {
    throw Error('Unknown Mode: ' + mode)
  }
}

// 返回当前的主题（响应式）
export function useDarkMode() {
  let theme = getChache<ThemeMode | undefined>('app_theme', true)
  if (theme !== 'light' && theme !== 'dark') {
    // 用户没操作过主题按钮，跟随系统
    theme = mqList && mqList.matches ? 'dark' : 'light'
  }
  setTheme(theme)
  currTheme.value = theme
  return currTheme
}

function setDarkMode(mode: ThemeMode) {
  setCache('app_theme', mode, true)
  setTheme(mode)
}
