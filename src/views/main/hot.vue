<template>
  <div id="mainconect">
    人气推荐<br>
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
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'all',title:'全站'}}">全站</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'zvideo',title:'视频'}}">视频</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'science',title:'科学'}}">科学</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'digital',title:'数码'}}">数码</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'sport',title:'体育'}}">体育</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'fashion',title:'时尚'}}">时尚</router-link>
      </a-col>
      <a-col :span="2">
        <router-link :to="{name:'mainHot',params:{type:'film',title:'影视'}}">影视</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        {{type}}的列表
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-main-hot',
  components: {
  },
  props: {
    type: String
  },
  setup (props, conext) {
    const value = ref('测试')
    const route = reactive({})

    return {
      value,
      route
    }
  }
}
</script>
