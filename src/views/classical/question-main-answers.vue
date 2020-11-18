<template>
  <div id="mainconect">
    <div>
      {{questionId}}提问的回答列表
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'zh-question-main-answers',
  props: {
    questionId: Number
  },
  setup (props, conext) {
    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const route = reactive({})
    console.log('回答列表：' + props.questionId)

    return {
      value,
      route
    }
  }
}
</script>
