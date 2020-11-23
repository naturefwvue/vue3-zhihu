<template><!--首页-->
  <div id="mainconect">
    用户设置：
    <a-row>
      <a-col :span="2">
        <router-link :to="{name:'mainHome'}">推荐</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainFollow'}">关注</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'all',title:'全站'}}">热榜</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <router-link :to="{name:'questionAnswer',params:{questionId:111,anserrId:333,title:'第一篇测试文章'}}">回答连接</router-link>
      </a-col>
      <a-col :span="24">
        <router-link :to="{name:'questions',params:{questionId:111,anserrId:333,title:'第一哥测试提问'}}">提问连接</router-link>
      </a-col>
      <a-col :span="24">
        <router-link :to="{name:'post',params:{postId:111,title:'第一篇测试文章'}}">文章连接</router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite.vue'

export default {
  name: 'zh-main',
  setup (props, conext) {
    const router = useRouter()
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
