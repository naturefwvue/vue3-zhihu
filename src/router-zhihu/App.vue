<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <!--导航-->
        <Navi/>
      </a-layout-header>
      <a-layout-content>
        <!--中间路由-->
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>自然框架，vue3，antdv </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Navi from './components/web/navi.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    Navi
  },
  setup (props) {
    // alert('首页setup')

    const router = useRouter()
    console.log('router')
    console.log(router)

    const routes = router.getRoutes()
    console.log('routes')
    console.log(routes)
    const route = router.currentRoute.value
    console.log('route')
    console.log(route)
    /*
      fullPath: "/"
      hash: ""
      matched: []
      meta: {}
      name: undefined
      params: {}
      path: "/"
      query: {}
      redirectedFrom: undefined
    */

    router.beforeEach((to, from, next) => {
      // ...
      console.log('to')
      console.log(to)
      console.log('from')
      console.log(from)
      next()
    })

    return {

    }
  }
}
</script>

<style>
#mainconect {
  line-height: 30px;
  text-align:left;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #dce7f0;
  color: #fff;
  text-align: center;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(230, 241, 241);
  color: rgb(27, 16, 16);
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
