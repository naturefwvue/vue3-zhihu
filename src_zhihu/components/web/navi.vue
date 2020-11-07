<!--导航-->
<template>
  <div id="nav">
    <a-row type="flex" justify="center" align="middle">
      <!--导航-->
      <a-col :span="12">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="zhifou">
            <router-link to="/">知否</router-link>
          </a-menu-item>
          <a-menu-item key="app1" >
            <router-link to="/question/123">问题的回答列表</router-link>
          </a-menu-item>
          <a-menu-item key="app2" >
            <router-link to="/question/waiting">请你回答</router-link>
          </a-menu-item>
          <a-menu-item key="app3" >
            <router-link to="/question/123/answer/456">看回答</router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
      <!--查询-->
      <a-col :span="8">
        <a-input-search
          v-model:value="value"
          placeholder="如何学习Vue？"
          @search="onSearch"
          style="width: 200px"
          size="large"
        />
      </a-col>
      <!--提问-->
      <a-col :span="2">
        <a-button type="primary" size="large">提问</a-button>
      </a-col>
      <!--消息提醒-->
      <a-col :span="1">
        <a-popover placement="bottom"  trigger="click">
          <template v-slot:content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <template v-slot:title>
            <span>Title</span>
          </template>
          <a-badge :count="5" title="Custom hover text">
            <div class="icons-list">
              <a href="#" class="head-example" >
                <BellOutlined />
              </a>
            </div>
          </a-badge>
        </a-popover>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { BellOutlined } from '@ant-design/icons-vue'

export default {
  data () {
    return {
      current: ['mail']
    }
  },
  components: {
    BellOutlined
  }
}
</script>

<style lang="scss">
#nav {
  text-align: center;
  width:900px;
  border:1px solid #db820d;
  margin:0px auto;
  padding: 3px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
<style scoped>
#components-badge-demo-title .ant-badge:not(.ant-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}

.icons-list ::v-deep(.anticon) {
  margin-right: 1px;
  font-size: 24px;
}
</style>
