<template>
  <div id="mainconect">
    关注推荐<br>
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
        关注推荐的列表
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
