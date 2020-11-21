<template><!--用户中心-->
  <div id="mainconect" >
    {{userId}}关注的人<br>
    关注列表
  </div>
</template>

<script>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-follow',
  props: {
    userId: Number
  },
  setup (props, conext) {
    return {
    }
  }
}
</script>
