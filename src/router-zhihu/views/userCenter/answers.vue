<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的回答<br>
    回答列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-answers',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
