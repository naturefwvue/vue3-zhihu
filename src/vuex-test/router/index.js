import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/websql',
    name: 'websql',
    component: () => import('../views/test/websql.vue')
  },
  {
    path: '/indexDB',
    name: 'indexDB',
    component: () => import('../views/test/indexedDB.vue')
  },
  {
    path: '/indexDB2',
    name: 'indexDB2',
    component: () => import('../views/test/indexedDB2.vue')
  },
  {
    path: '/localStorage',
    name: 'localStorage',
    component: () => import('../views/test/localStorage.vue')
  },
  {
    path: '/sessionStorage',
    name: 'sessionStorage',
    component: () => import('../views/test/sessionStorage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
