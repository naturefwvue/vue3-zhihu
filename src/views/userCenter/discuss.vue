<template><!--用户中心-->
  <div id="mainconect">
    我的讨论列表
    currentRoute:{{currentRoute.fullPath}}<br>
    history:{{history.state}}
  </div>
  <router-view/>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const viewName = 'uc-answer'

export default {
  name: 'uc-discuss',
  beforeRouteEnter (to, from, next) {
    console.log(`${viewName}-beforeRouteEnter`)
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log(`${viewName}-beforeRouteUpdate`)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log(`${viewName}-beforeRouteLeave`)
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(`${viewName}-beforeRouteLeave`)
    const answer = window.confirm('你真的要离开吗？')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
  setup (props, conext) {
    const router = useRouter()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes

    return {
      value,
      currentRoute,
      history,
      routes
    }
  }
}
</script>
