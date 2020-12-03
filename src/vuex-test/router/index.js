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
    component: () => import('../views/websql.vue')
  },
  {
    path: '/indexDB',
    name: 'indexDB',
    component: () => import('../views/indexDB.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
