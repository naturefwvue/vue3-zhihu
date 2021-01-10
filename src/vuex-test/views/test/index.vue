<template>
  <a-row>
    <a-col :span="12">
      <div>
        <a-menu
          id="dddddd"
          style="width: 256px"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <template #title>
              <span>演示一下</span>
            </template>
            <a-menu-item key="5"><router-link :to="{name:'websql'}">websql</router-link></a-menu-item>
            <a-menu-item key="51"><router-link :to="{name:'indexDB'}">indexDB</router-link></a-menu-item>
            <a-menu-item key="52"><router-link :to="{name:'indexDB2'}">indexDB2</router-link></a-menu-item>
            <a-menu-item key="53"><router-link :to="{name:'localStorage'}">localStorage</router-link></a-menu-item>
            <a-menu-item key="54"><router-link :to="{name:'sessionStorage'}">sessionStorage</router-link></a-menu-item>
            <a-menu-item key="55"><router-link :to="{name:'vuex'}">vuex</router-link></a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-col>
    <a-col :span="12">
      <router-view></router-view>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'demo-store',
  setup () {
    const selectedKeys = ref(['5'])
    const openKeys = ref(['sub2'])

    const handleClick = (e) => {
      console.log('click', e)
    }
    const titleClick = (e) => {
      console.log('titleClick', e)
    }

    return {
      selectedKeys,
      openKeys,
      handleClick,
      titleClick
    }
  }
}
</script>
