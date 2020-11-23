<template>
  <div id="mainconect">
    <a-row>
      <a-col :span="24">
        {{type}}提问列表<br>
        <router-link
          :to="{
              name:'questions',
              params:{
                questionId:111,
                anserrId:333,
                title:'第一哥测试提问'
              }
            }">
          提问连接
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-question-waiting-type',
  props: {
    type: String,
    title: String
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
