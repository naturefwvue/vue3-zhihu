<template>
  <div id="mainconect">
    <div>
      提问内容和回答列表
      <router-view />
    </div>
    <div>
      <router-view name="answerList"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'zh-question-main',
  setup (props, conext) {
    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const router = useRouter()
    const currentRoute = router.currentRoute

    return {
      value,
      currentRoute
    }
  }
}
</script>
