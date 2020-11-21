<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的文章<br>
    文章列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-discuss',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
