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
import Navi from '@/components/web/navi.vue'
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

<style lang="scss">
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header{
  text-align: center;
  background: rgb(244, 245, 235);
  color: #fff;
  margin-bottom: 2px;
  padding: 5px;
}
#components-layout-demo-basic .ant-layout-footer {
  background: #cae1f1;
  color: rgb(39, 28, 28);
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #ebeff1;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(250, 252, 231);
  color: rgb(41, 24, 24);
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}

#components-badge-demo-title .ant-badge:not(.ant-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}

.icons-list ::v-deep(.anticon) {
  margin-right: 1px;
  font-size: 24px;
}
</style>
