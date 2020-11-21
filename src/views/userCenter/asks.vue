<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的提问<br>
    提问列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-asks',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
