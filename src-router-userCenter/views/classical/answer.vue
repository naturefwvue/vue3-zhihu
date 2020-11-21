<template>
  <div id="mainconect">
    我是知乎de回答文章<br>
    {{value}}<br>---
    {{ctx1}}
  </div>
</template>

<script>
import { ref, getCurrentInstance, watch } from 'vue'

export default {
  name: 'zh-answer',
  /*
  watch: {
    $route (to, from) {
      if (typeof to === 'undefined') {
        console.log(to)
      }
      if (typeof from === 'undefined') {
        console.log(from)
      }
    }
  },
  */
  setup (props, conext) {
    const { ctx } = getCurrentInstance()

    const value = ref('')
    const ctx1 = ref('')
    value.value = ctx.$router.currentRoute.value // conext // .$route.params.username
    ctx1.value = conext

    watch(() => ctx.$router.currentRoute,
      (val) => {
        console.log(`count is ${val}`)
      })

    return {
      value,
      ctx1
    }
  }
}
</script>
