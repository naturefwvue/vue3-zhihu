<template><!--首页-->
  <div id="mainconect">
    首页推荐<br>
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
        <router-link :to="{name:'questionAnswer',params:{questionId:111,anserrId:333,title:'某某的回答'}}">回答连接</router-link>
      </a-col>
      <a-col :span="24">
        <router-link :to="{name:'questions',params:{questionId:111,title:'这是一个提问'}}">提问连接</router-link>
      </a-col>
      <a-col :span="24">
        <router-link :to="{name:'post',params:{postId:111,title:'第一篇文章'}}">文章连接</router-link>
      </a-col>
      <a-col :span="24">
        <router-link :to="{name:'login'}">登录</router-link>
      </a-col>
      <a-col :span="24">
        <router-link to="/q23423">404测试</router-link>
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
