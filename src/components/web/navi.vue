<!--导航-->
<template>
  <div id="nav" style="margin:0px auto;width:1050px;">
    <router-link to="/">首页</router-link> |
    <router-link to="/question">问题列表</router-link> |
      | 回答列表 |
    <router-link to="/userCenter">用户中心</router-link> |
  </div>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'

export default {
  data () {
    return {
      current: ['mail']
    }
  },
  components: {
    // BellOutlined
  }
}
</script>
