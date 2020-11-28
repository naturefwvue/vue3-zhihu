<template>
  <div id="mainconect">
    请您登录
    <br>
    <input type="button" value="假装登录" @click="login">
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  setup (props) {
    const val = ref('33')
    const router = useRouter()
    const currentRoute = router.currentRoute
    const login = () => {
      window.__isUserOnline = true

      alert(router.hasRoute('userSet'))
      // 设置动态路由，添加用户设置的路由
      router.addRoute(
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
      console.log(router)
      console.log(currentRoute.value)
      console.log(router.options.routes)
      // console.log(currentRoute.value.query.redirect)
      // router.push(currentRoute.value.query.redirect)
    }

    return {
      val,
      currentRoute,
      login
    }
  }
}
</script>
