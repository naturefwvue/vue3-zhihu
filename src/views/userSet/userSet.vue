<template><!--用户中心-->
  <div id="mainconect">
    用户设置：
    <a-row>
      <a-col :span="7">
        <router-link :to="{name:'ucAccount'}">账号与密码</router-link> <br>
        <router-link :to="{name:'ucNotification'}">消息与邮件</router-link> <br>
        <router-link :to="{name:'ucFilter'}">屏蔽</router-link> <br>
        <router-link :to="{name:'ucPrivacy'}">隐私</router-link> <br>
        <router-link :to="{name:'ucPreference'}">偏好设置</router-link> <br>
      </a-col>
      <a-col :span="17">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite.vue'

export default {
  name: 'uc-userSet',
  setup (props, conext) {
    const router = useRouter()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref(false)
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes

    return {
      value,
      currentRoute,
      history,
      routes
    }
  }
}
</script>
