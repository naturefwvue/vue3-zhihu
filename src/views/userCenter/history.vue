<template><!--用户中心-->
  <div id="mainconect" >
    我的浏览记录
    currentRoute:{{currentRoute.fullPath}}<br>
    history:{{history.state}}
  </div>
  <router-view/>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const viewName = 'uc-history'

export default {
  name: 'uc-history',
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
    next()
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
