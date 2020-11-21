<template><!--用户中心-->
  <div id="mainconect">
    用户中心：{{userId}}-{{userNick}}
    <a-row>
      <a-col :span="3">
        <router-link :to="{name:'ucDynamic', params: { userId:userId}}">动态</router-link> <br>
        <router-link :to="{name:'ucAnswers', params: { userId:userId}}">回答</router-link> <br>
        <router-link :to="{name:'ucZvideos', params: { userId:userId}}">视频</router-link> <br>
        <router-link :to="{name:'ucAsks', params: { userId:userId}}">提问</router-link> <br>
        <router-link :to="{name:'ucPosts', params: { userId:userId}}">文章</router-link> <br>
        <router-link :to="{name:'ucColumns', params: { userId:userId}}">专栏</router-link> <br>
        <router-link :to="{name:'ucPins', params: { userId:userId}}">想法</router-link> <br>
        <router-link :to="{name:'ucCollections', params: { userId:userId}}">收藏夹</router-link> <br>
        <router-link :to="{name:'ucFollowing', params: { userId:userId}}">关注</router-link> <br>
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

export default {
  name: 'uc-main',
  props: {
    userId: Number,
    userNick: String
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
