import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

// 基础路由
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '路由演示' },
    component: home
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
  { // 提问列表，重写，便于外部调用
    path: '/question/list',
    name: 'questions',
    redirect: { name: 'questionList', params: { type: 'recommend', typeId: '1', typeName: '推荐提问' } }
  },
  { // 提问列表
    path: '/question/list/:type',
    name: 'questionList',
    meta: { title: '{typeName}-提问列表-路由演示' },
    component: () => import('../views/classical/question-list.vue')
  },
  { // 提问内容 + 回答列表 // 演示命名视图
    path: '/question/:questionId',
    name: 'questionAnswerList',
    meta: { title: '问题内容+问题回答列表' },
    component: () => import('../views/classical/question-answer.vue'),
    children: [
      {
        path: '',
        default: () => import('../views/classical/question-answer-question.vue'),
        answerList: () => import('../views/classical/question-answer-list.vue')
      }
    ]
  },
  { // 填写提问
    path: '/question/write',
    name: 'question-write',
    meta: { title: '问题列表' },
    component: () => import('../views/classical/question-list.vue')
  },
  { // 回答列表
    path: '/answer/list',
    name: 'answerList',
    meta: { title: '回答列表' },
    component: () => import('../views/classical/answer-list.vue'),
    children: [
      {
        path: ':type',
        name: 'questionListType',
        meta: { title: '{type}' },
        component: () => import('../views/classical/question.vue')
      }
    ]
  },
  { // 写回答
    path: '/answer/write',
    name: 'answer-write',
    meta: { title: '问题列表' },
    component: () => import('../views/classical/question-list.vue')
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
