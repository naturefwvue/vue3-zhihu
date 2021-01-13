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
      },
      {
        path: 'vuex',
        name: 'vuex',
        meta: { title: 'vuex 的演示' },
        component: () => import('../views/test/vuex.vue')
      }
    ]
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog/index.vue'),
    children: [
      {
        path: 'list',
        name: 'list',
        meta: { title: '博客列表' },
        component: () => import('../components/blog/blog-list.vue')
      },
      {
        path: ':blogId',
        name: 'blogInfo',
        props: true,
        meta: { title: '博文和讨论' },
        component: () => import('../components/blog/blog-info.vue')
      },
      {
        path: 'write',
        name: 'write',
        meta: { title: '写博客列表' },
        component: () => import('../components/blog/blog-form.vue')
      }
    ]
  },
  {
    path: '/blog2',
    name: 'blog2',
    component: () => import('../views/blog2/index.vue'),
    children: [
      {
        path: 'list',
        name: 'list2',
        meta: { title: '博客列表' },
        component: () => import('../components/blog2/blog-list.vue')
      },
      {
        path: ':blogId',
        name: 'blogInfo2',
        props: true,
        meta: { title: '博文和讨论' },
        component: () => import('../components/blog2/blog-info.vue')
      },
      {
        path: 'write',
        name: 'write2',
        meta: { title: '写博客列表' },
        component: () => import('../components/blog2/blog-form.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
