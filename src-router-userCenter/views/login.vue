<template>
  <div>
    请您登录{{currentRoute.query}}
    <br>
    <input type="button" value="假装登录" @click="login">
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  setup (props) {
    const val = ref('33')
    const router = useRouter()
    const currentRoute = router.currentRoute
    const login = () => {
      window.__isUserOnline = true
      console.log(router)
      console.log(currentRoute.value)
      console.log(currentRoute.value.query.redirect)
      router.push(currentRoute.value.query.redirect)
    }

    return {
      val,
      currentRoute,
      login
    }
  }
}
</script>
