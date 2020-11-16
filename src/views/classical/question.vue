<template>
  <div id="mainconect">
    我是知乎de问题展示<br>
    <div>
      展示问题 {{ $route.path }}{{$route.params}}
    </div>
    <div>
      回答列表 根据url判断是否显示
    </div>
    {{value}}<br>
    {{route}}
  </div>
  <router-view/>router
</template>

<script>
import { ref, reactive, getCurrentInstance, watch } from 'vue'

export default {
  name: 'zh-question',
  setup (props, conext) {
    const { ctx } = getCurrentInstance()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const route = reactive({})
    if (typeof ctx.$router.currentRoute !== 'undefined') {
      route.value = {
        // currentRoute: ctx.$router.currentRoute.value,
        path: ctx.$router.currentRoute.value.path,
        params: ctx.$router.currentRoute.value.params,
        query: ctx.$router.currentRoute.value.query,
        hash: ctx.$router.currentRoute.value.hash
      }
      // value.value = ctx.$router.currentRoute.value
      // conext // .$route.params.username
    }

    watch(() => ctx.$router.currentRoute.value.path,
      (val) => {
        route.value.path = val
      })
    watch(() => ctx.$router.currentRoute.value.params,
      (val) => {
        route.value.params = val
      })

    return {
      value,
      route
    }
  }
}
</script>
