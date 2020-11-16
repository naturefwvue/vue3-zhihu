<template>
  <div id="mainconect">
    <div>
      回答列表111
    </div>
    {{value}}<br>
    {{route}}
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'zh-question-answer-list',
  setup (props, conext) {
    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const route = reactive({})

    return {
      value,
      route
    }
  }
}
</script>
