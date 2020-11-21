<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的视频<br>
    视频列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-zvideos',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
