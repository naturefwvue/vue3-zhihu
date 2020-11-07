import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Zhihu from '../views/zhihu.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    // 网站首页
    component: Zhihu
  },
  {
    path: '/question',
    name: 'question',
    // 问题列表
    component: () => import(/* webpackChunkName: "question" */ '../views/zh-Question.vue')
  },
  {
    path: '/question/waiting',
    name: 'questionWaiting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/zh-Question-list.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/question/waiting/:type',
        name: 'questionIdAnswerHot',
        component: () => import('../views/zh-Question-list.vue')
      }
    ]
  },
  {
    path: '/question/:id',
    name: 'questionId',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "question" */ '../views/zh-Question.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/question/:id/answer/:id2',
        name: 'questionIdAnswer',
        component: () => import(/* webpackChunkName: "question" */ '../views/zh-Answer.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  alert('router里面设置的路由监听——beforeEach')
  next()
})
export default router
