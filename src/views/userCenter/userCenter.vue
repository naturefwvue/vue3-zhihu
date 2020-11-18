<template><!--用户中心-->
  <div id="mainconect">
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
const viewName = 'uc-main'

export default {
  name: 'uc-main',
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
    const value = ref(false)
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
