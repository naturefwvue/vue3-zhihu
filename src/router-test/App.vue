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
import Navi from './components/web/navi.vue'
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
      console.log('————————开始——————————')
      console.log('全局检测——beforeEach')

      // 验证404
      if (to.matched.length === 0) {
        next({ path: '/404' })
        return
      }

      // 验证是否需要登录
      if (to.matched.some(record => record.meta.requiresAuth)) {
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
      // next()
    })

    router.afterEach((to, from) => {
      // 可以修改浏览器的title
      for (let i = 0; i < to.matched.length; i += 1) {
        // 获取路由设置里面的title
        let title = to.matched[i].meta.title
        // title里面的{插值}替换为参数值
        if (title.indexOf('{') >= 0) {
          const match = title.substring(1, title.indexOf('}'))
          // alert(match)
          title = title.replace('{' + match + '}', to.params[match])
        }
        // 设置网站title
        if (i === 0) {
          document.title = title
        } else {
          document.title = title + '-' + document.title
        }
      }

      // 可以记录用户的浏览记录
      // path = to.fullPath
      console.log('全局检测——afterEach')
      console.log(to)
      console.log('————————结束——————————')
    })

    router.beforeResolve((to, from, next) => {
      console.log('全局检测——beforeResolve')
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
