<template><!--用户中心-->
  <div id="mainconect">
    按照分组显示收藏夹里的信息： <br>
    currentRoute:{{currentRoute.fullPath}}<br>
    params:{{currentRoute.params}}<br>
    history:{{history.state}}<br>
    props:{{groupId}}
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const viewName = 'uc-favorite-group'

export default {
  name: 'uc-favorite-group',
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
  props: {
    group: String,
    groupId: Number
  },
  setup (props, conext) {
    const router = useRouter()
    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes

    alert(props.groupId)

    // 监控参数变化
    watch(() => props.groupId, (newValue, oldValue) => {
      alert(newValue)
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
