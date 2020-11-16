import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import index from '../views/zhihu.vue'

// 基础路由
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '路由演示' },
    component: index
  },
  {
    path: '/404',
    name: 'page404',
    meta: { title: '找不到网页' },
    component: () => import('../views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '用户登录' },
    component: () => import('../views/login.vue')
  }]

// 网站模块路由
routes.push(
  {
    path: '/question',
    name: 'question',
    meta: { title: '问题列表' },
    component: () => import(/* webpackChunkName: "question" */ '../views/zh-Question-list.vue')
  },
  {
    path: '/question/list',
    name: 'questionWaiting',
    meta: { title: '问题列表' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/zh-Question-list.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/question/list/:type',
        name: 'questionIdAnswerHot',
        meta: { title: '{type}' },
        component: () => import('../views/zh-Question-list.vue')
      }
    ]
  },
  {
    path: '/question/:id',
    name: 'questionId',
    meta: { title: '问题内容' },
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
        meta: { title: '{id2}' },
        component: () => import(/* webpackChunkName: "question" */ '../views/zh-Answer.vue')
      }
    ]
  }
)

routes.push(
  {
    path: '/userCenter',
    name: 'userCenter',
    meta: {
      title: '用户中心',
      requiresAuth: true
    },
    redirect: { name: 'ucAnswer' },
    // 用户中心
    component: () => import('../views/userCenter/userCenter.vue'),
    children: [
      { // 设置
        path: 'set',
        name: 'ucSet',
        meta: { title: '设置信息' },
        component: () => import('../views/userCenter/set.vue')
      },
      { // 我的提问
        path: 'question',
        name: 'ucQuestion',
        meta: { title: '我的提问' },
        component: () => import('../views/userCenter/question.vue')
      },
      { // 我的回答
        path: 'answer',
        name: 'ucAnswer',
        meta: { title: '我的回答' },
        component: () => import('../views/userCenter/answer.vue')
      },
      { // 我的讨论
        path: 'discuss',
        name: 'ucDiscuss',
        meta: { title: '我的讨论' },
        component: () => import('../views/userCenter/discuss.vue')
      },
      { // 收藏夹
        path: 'favorite',
        name: 'ucFavorite',
        meta: { title: '收藏夹' },
        component: () => import('../views/userCenter/favorite.vue'),
        children: [
          { // 设置收藏夹的分组路由
            path: ':group',
            name: 'favGroup',
            props: true,
            meta: { title: '{group}' },
            component: () => import('../views/userCenter/favorite-type.vue')
          }
        ]
      },
      { // 浏览记录
        path: 'history',
        name: 'ucHistory',
        meta: { title: '浏览记录' },
        component: () => import('../views/userCenter/history.vue')
      },
      { // 粉丝
        path: 'fans',
        name: 'ucFans',
        meta: { title: '粉丝' },
        component: () => import('../views/userCenter/fans.vue')
      },
      { // 关注
        path: 'follow',
        name: 'ucFollow',
        meta: { title: '关注' },
        component: () => import('../views/userCenter/follow.vue')
      }
    ]
  }
)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
// ...
// alert('router里面设置的路由监听——beforeEach')
//  next()
// })
export default router
