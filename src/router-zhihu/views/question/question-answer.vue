<template>
  <div id="mainconect">
    问题和回答<br>
    <a-row>
      <a-col :span="24">
        {{questionId}}提问描述
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        {{anserrId}}回答内容
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        {{questionId}}提问的其他回答列表
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
// import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-question-answer',
  props: {
    questionId: Number,
    anserrId: Number
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
