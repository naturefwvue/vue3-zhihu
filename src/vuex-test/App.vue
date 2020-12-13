<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header><!--导航-->
        <navi></navi>
      </a-layout-header>
      <a-layout style="margin:0px auto;width:1050px;">
        <a-layout-content><!--中间路由-->
          <router-view></router-view>
        </a-layout-content>
        <a-layout-sider>侧边栏</a-layout-sider>
      </a-layout>
      <a-layout-footer>自然框架，vue3，antdv</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Navi from './components/navi.vue'
// import { useRouter } from 'vue-router'

export default {
  components: {
    Navi
  },
  setup (props) {
    // alert('首页setup')
    return {

    }
  }
}
</script>
<style>
#mainconect {
  line-height: 30px;
  text-align:left;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #dce7f0;
  color: #fff;
  text-align: center;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(230, 241, 241);
  color: rgb(27, 16, 16);
  min-height: 120px;
  line-height: 30px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
