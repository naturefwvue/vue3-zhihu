<template><!--用户中心-->
  <div id="uc" style="line-height: 30px;text-align:left;">
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

export default {
  name: 'uc-favorite-group',
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('zh-favorite-group-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('zh-favorite-group-beforeRouteUpdate')
    console.log(to)
    // document.title = 'ddd' // document.title.replace('收藏夹分类', to.params.group)
    // alert('参数跳转')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('zh-favorite-group-beforeRouteLeave')
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
