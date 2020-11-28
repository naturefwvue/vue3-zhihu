<template>
  <div id="mainconect">
    回答列表<br>
    <input>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'zh-answer-list',
  components: {},
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
