import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

// 基础路由
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '路由演示' },
    redirect: { name: 'main', params: { type: 'recommend', typeId: '1', typeName: '推荐提问' } },
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
  }
]

// 网站首页路由
routes.push(
  { // 首页推荐
    path: '/recommend',
    name: 'mainRecommend',
    component: () => import('../views/classical/question-list.vue')
  },
  { // 首页关注
    path: '/follow',
    name: 'mainFollow',
    component: () => import('../views/classical/question-list.vue')
  },
  { // 首页热榜
    path: '/hot/:type',
    name: 'mainHot',
    component: () => import('../views/classical/question-list.vue')
  }
)

// 网站等你来答
routes.push(
  { // 网站等你来答
    path: '/question/waiting/:type',
    name: 'questionWaiting',
    component: () => import('../views/classical/question-list.vue')
  }
)

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
    path: '/question',
    meta: { title: '问题内容+问题回答列表' },
    component: () => import('../views/classical/question-main.vue'),
    children: [
      {
        path: ':questionId',
        name: 'questionAnswerList',
        props: true,
        meta: { title: '{questionId}' },
        components: {
          default: () => import('../views/classical/question-main-introduce.vue'),
          answerList: () => import('../views/classical/question-main-answers.vue')
        }
      }
    ]
  },
  { // 填写提问
    path: '/question/write',
    name: 'question-write',
    meta: { title: '问题列表' },
    component: () => import('../views/classical/question-write.vue')
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
    component: () => import('../views/classical/answer-write.vue')
  }
)

// 我的主页的路由设置
routes.push(
  {
    path: '/people/:userNick',
    name: 'people',
    props: true,
    meta: {
      title: '我的主页',
      requiresAuth: false
    },
    // redirect: { name: 'ucAnswer' },
    // 用户中心
    component: () => import('../views/userCenter/userCenter.vue'),
    children: [
      { // 动态
        path: '',
        name: 'ucDynamic',
        props: true,
        meta: { title: '动态' },
        component: () => import('../views/userCenter/dynamic.vue')
      },
      { // 回答
        path: 'answers',
        name: 'ucAnswers',
        props: true,
        meta: { title: '回答' },
        component: () => import('../views/userCenter/answers.vue')
      },
      { // 视频
        path: 'zvideos',
        name: 'ucZvideos',
        props: true,
        meta: { title: '视频' },
        component: () => import('../views/userCenter/zvideos.vue')
      },
      { // 我的提问
        path: 'asks',
        name: 'ucAsks',
        props: true,
        meta: { title: '提问' },
        component: () => import('../views/userCenter/asks.vue')
      },
      { // 文章
        path: 'posts',
        name: 'ucPosts',
        props: true,
        meta: { title: '文章' },
        component: () => import('../views/userCenter/posts.vue')
      },
      { // 专栏
        path: 'columns',
        name: 'ucColumns',
        props: true,
        meta: { title: '专栏' },
        component: () => import('../views/userCenter/columns.vue')
      },
      { // 想法
        path: 'pins',
        name: 'ucPins',
        props: true,
        meta: { title: '想法' },
        component: () => import('../views/userCenter/pins.vue')
      },
      { // 收藏
        path: 'collections',
        name: 'ucCollections',
        props: true,
        meta: { title: '收藏' },
        component: () => import('../views/userCenter/collections.vue'),
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
      { // 关注
        path: 'following',
        name: 'ucFollowing',
        props: true,
        meta: { title: '关注' },
        component: () => import('../views/userCenter/following.vue')
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
