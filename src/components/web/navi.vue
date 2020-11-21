<!--网站导航导航-->
<template>
  <div id="nav" style="margin:0px auto;width:1050px;">
    <router-link to="/">首页</router-link> |
    <router-link :to="{name:'questions'}">问题列表</router-link> |
    <router-link :to="{name:'answerList'}">回答列表</router-link> |
    <router-link :to="{name:'people',params: { userId:123, userNick: 'jyk0011' }}">用户中心</router-link> |
  </div>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'

export default {

}
</script>
