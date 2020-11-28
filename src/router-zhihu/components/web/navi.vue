<!--网站导航导航-->
<template>
  <div id="nav" style="margin:0px auto;width:650px;">
    <router-link :to="{name:'mainHome'}">首页</router-link> |
    <router-link :to="{name:'questionWaiting'}">等你来答</router-link> |
    <router-link :to="{name:'people',params: { userId:123, userNick: 'jyk0011' }}">用户中心</router-link> |
    <router-link to="/settings">用户设置</router-link> |
  </div>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'
export default {
}
</script>
