<template>
  <div id="mainconect">
    等你来答<br>
    <a-row>
      <a-col :span="6">
        <router-link :to="{name:'questionWaitingType',params:{type:'recommend',title:'推荐'}}">为你推荐</router-link>
      </a-col>
      <a-col :span="6">
        <router-link :to="{name:'questionWaitingType',params:{type:'hot',title:'人气问题'}}">人气问题</router-link>
      </a-col>
     <a-col :span="6">
        <router-link :to="{name:'questionWaitingType',params:{type:'new',title:'最新问题'}}">最新问题</router-link>
      </a-col>
      <a-col :span="6">
        <router-link :to="{name:'questionWaitingType',params:{type:'invite',title:'邀请回答'}}">邀请回答</router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-question-waiting',
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
