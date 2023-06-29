import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')

new PerformanceObserver((entryList) => {
  const elemList = entryList.getEntries()
  console.log(elemList, '-------')
}).observe({ type: 'element' })
