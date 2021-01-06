<!--网站导航导航-->
<template>
  <div id="nav" style="margin:0px auto;width:1050px;">
    <router-link to="/">首页</router-link> |
    <router-link :to="{name:'demo'}">演示</router-link> |
    <router-link :to="{name:'list'}">博客</router-link> |
  </div>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'

export default {

}
</script>
