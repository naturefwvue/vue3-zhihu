<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header><!--导航-->
        <navi></navi>
      </a-layout-header>
      <a-layout style="margin:0px auto;width:1050px;">
        <a-layout-content><!--中间路由-->
          <router-view></router-view>
        </a-layout-content>
        <a-layout-sider>侧边栏</a-layout-sider>
      </a-layout>
      <a-layout-footer>自然框架，vue3，antdv</a-layout-footer>
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
    // console.log('router')
    // console.log(router)

    // const routes = router.getRoutes()
    // console.log('routes')
    // console.log(routes)
    // const route = router.currentRoute.value
    // console.log('route')
    // console.log(route)
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

    router.beforeEach((to, from, next) => {
      // ...
      console.log('to')
      console.log(to)
      console.log('from')
      console.log(from)
      next()
    })
    */

    router.beforeEach((to, from, next) => {
      // 可以验证是否需要登录等
      // alert(to.meta.requiresAuth)
      // alert(to.fullPath)

      // 验证404
      if (to.matched.length === 0) {
        next({ path: '/404' })
      }

      // 验证是否需要登录
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

      // 可以记录用户的浏览记录
      // path = to.fullPath
      console.log('全局检测——afterEach')
      console.log(to)
      console.log('——————————————————')
    })

    return {

    }
  }
}
</script>
<style>
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
