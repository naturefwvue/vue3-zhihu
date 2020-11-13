<template><!--用户中心-->
  <div id="uc" style="line-height: 30px;text-align:left;">
    用户中心
    <a-row>
      <a-col :span="3">
        <router-link to="/userCenter/set">设置</router-link> <br>
        <router-link :to="{name:'ucQuestion'}">我的提问</router-link> <br>
        <router-link :to="{name:'ucAnswer'}">我的回答</router-link> <br>
        <router-link :to="{name:'ucDiscuss'}">我的讨论</router-link> <br>
        <router-link :to="{name:'ucFavorite'}">收藏夹</router-link> <br>
        <router-link :to="{name:'ucHistory'}">浏览记录</router-link> <br>
        <router-link :to="{name:'ucFans'}">粉丝</router-link> <br>
        <router-link :to="{name:'ucFollow'}">关注</router-link> <br>
      </a-col>
      <a-col :span="21">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite.vue'

export default {
  name: 'uc-main',
  setup (props, conext) {
    const router = useRouter()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref(false)
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes

    router.beforeEach((to, from, next) => {
      // 可以验证是否需要登录等
      // alert(to.meta.requiresAuth)
      // alert(to.fullPath)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!window.__isUserOnline) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
      console.log('全局检测——beforeEach')
      next()
    })

    router.afterEach((to, from) => {
      // 可以记录用户的浏览记录
      // 可以修改浏览器的title
      for (let i = 0; i < to.matched.length; i += 1) {
        const title = to.matched[i].meta.title
        if (i === 0) {
          document.title = title
        } else {
          if (title.indexOf('{') >= 0) {
            document.title = title.replace(title, to.params[title.replace('{', '').replace('}', '')]) + '-' + document.title
          } else {
            document.title = title + document.title
          }
        }
      }
      console.log('全局检测——afterEach')
      console.log(to)
      console.log('——————————————————')
    })

    return {
      value,
      currentRoute,
      history,
      routes
    }
  }
}
</script>
