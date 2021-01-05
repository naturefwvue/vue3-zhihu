import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/test/index.vue'),
    children: [
      {
        path: 'websql',
        name: 'websql',
        meta: { title: 'websql 的演示' },
        component: () => import('../views/test/websql.vue')
      },
      {
        path: 'indexDB',
        name: 'indexDB',
        meta: { title: 'indexDB 的演示' },
        component: () => import('../views/test/indexedDB.vue')
      },
      {
        path: 'indexDB2',
        name: 'indexDB2',
        meta: { title: 'indexDB 的演示' },
        component: () => import('../views/test/indexedDB2.vue')
      },
      {
        path: 'localStorage',
        name: 'localStorage',
        meta: { title: 'localStorage 的演示' },
        component: () => import('../views/test/localStorage.vue')
      },
      {
        path: 'sessionStorage',
        name: 'sessionStorage',
        meta: { title: 'sessionStorage 的演示' },
        component: () => import('../views/test/sessionStorage.vue')
      }
    ]
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/test/sessionStorage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
