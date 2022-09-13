import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/Main/index.vue'
import ArticlePage from '@/pages/Article/index.vue'
import AboutPage from '@/pages/About.vue'
import NotFoundPage from '@/pages/NotFound.vue'
import All from '@/pages/Main/All.vue'
import Notes from '@/pages/Main/Notes.vue'
import Essays from '@/pages/Main/Essays.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    redirect: '/all',
    component: MainPage,
    children: [
      {
        path: '/all',
        name: 'all',
        component: All,
      },
      {
        path: '/notes',
        name: 'notes',
        component: Notes,
      },
      {
        path: '/essays',
        name: 'essays',
        component: Essays,
      },
    ],
  },
  {
    path: '/article/:id([A-Za-z0-9_-]+)',
    name: 'article',
    component: ArticlePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
