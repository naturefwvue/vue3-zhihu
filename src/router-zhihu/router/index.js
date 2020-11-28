import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/main/main.vue'

// 基础路由
const routes = [
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
    path: '/',
    name: 'mainHome',
    meta: { title: '首页推荐' },
    component: home
  },
  { // 首页关注
    path: '/follow',
    name: 'mainFollow',
    meta: { title: '首页关注' },
    component: () => import('../views/main/follow.vue')
  },
  { // 首页热榜
    path: '/hot/:type',
    name: 'mainHot',
    meta: { title: '{title}-人气推荐' },
    props: true,
    component: () => import('../views/main/hot.vue')
  }
)

// 网站等你来答
routes.push(
  { // 网站等你来答
    path: '/question/waiting',
    name: 'questionWaiting',
    meta: { title: '等你来答' },
    component: () => import('../views/question/waiting.vue'),
    redirect: { name: 'questionWaitingType', params: { type: 'recommend', title: '推荐' } },
    children: [
      {
        path: ':type',
        name: 'questionWaitingType',
        props: true,
        meta: { title: '{title}' },
        component: () => import('../views/question/type.vue')
      }
    ]
  }
)

// 网站提问、回答和文章
routes.push(
  { // 文章内容和评论列表
    path: '/p/:postId',
    name: 'post',
    props: true,
    meta: { title: '{title}-文章' },
    component: () => import('../views/question/post.vue')
  },
  { // 写文章
    path: '/p/write',
    name: 'answer-write',
    meta: { title: '问题列表' },
    component: () => import('../views/question/post-write.vue')
  },
  { // 提问列表，重写，便于外部调用
    path: '/question/:questionId',
    name: 'questions',
    props: true,
    meta: { title: '{title}' },
    component: () => import('../views/question/question-list.vue')
  },
  { // 提问内容+回答内容+其他回答列表
    path: '/question/:questionId/answer/:anserrId',
    name: 'questionAnswer',
    props: true,
    meta: { title: '{title}' },
    component: () => import('../views/question/question-answer.vue')
  }
)

// 我的主页
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
      { // 收藏夹分类
        path: 'collections',
        name: 'ucCollectionsType',
        props: true,
        meta: { title: '收藏' },
        component: () => import('../views/userCenter/collections-type.vue')
      },
      { // 关注
        path: 'following',
        name: 'ucFollowing',
        props: true,
        meta: { title: '关注' },
        component: () => import('../views/userCenter/following.vue')
      }
    ]
  },
  { // 收藏夹
    path: '/collection/:groupId',
    name: 'collections',
    props: true,
    meta: {
      title: '{group}',
      requiresAuth: false
    },
    component: () => import('../views/userCenter/collections.vue')
  }
)

// 我的设置
/*
routes.push(
  {
    path: '/settings',
    name: 'userSet',
    // props: true,
    meta: {
      title: '我的设置',
      requiresAuth: false
    },
    // redirect: { name: 'ucAnswer' },
    // 我的设置
    component: () => import('../views/userSet/userSet.vue'),
    children: [
      { // 账号与密码
        path: 'account',
        name: 'ucAccount',
        props: true,
        meta: { title: '账号与密码' },
        component: () => import('../views/userSet/account.vue')
      },
      { // 消息与邮件
        path: 'notification',
        name: 'ucNotification',
        props: true,
        meta: { title: '消息与邮件' },
        component: () => import('../views/userSet/notification.vue')
      },
      { // 屏蔽
        path: 'filter',
        name: 'ucFilter',
        props: true,
        meta: { title: '屏蔽' },
        component: () => import('../views/userSet/filter.vue')
      },
      { // 隐私
        path: 'privacy',
        name: 'ucPrivacy',
        props: true,
        meta: { title: '隐私' },
        component: () => import('../views/userSet/privacy.vue')
      },
      { // 偏好设置
        path: 'preference',
        name: 'ucPreference',
        props: true,
        meta: { title: '偏好设置' },
        component: () => import('../views/userSet/preference.vue')
      }
    ]
  }
)
*/

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
