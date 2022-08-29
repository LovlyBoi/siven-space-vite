import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainPage from '../pages/Main.vue'
import AboutPage from '../pages/About.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
