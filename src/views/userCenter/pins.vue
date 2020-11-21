<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的想法<br>
    想法列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-pins',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
