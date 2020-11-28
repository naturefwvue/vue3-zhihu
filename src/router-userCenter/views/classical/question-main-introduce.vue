<template>
  <div id="mainconect">
    <div>
      {{questionId}}提问内容
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'zh-question-main-introduce',
  props: {
    questionId: Number
  },
  setup (props, conext) {
    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('0')
    const route = reactive({})

    console.log(props.questionId)

    return {
      value,
      route
    }
  }
}
</script>
