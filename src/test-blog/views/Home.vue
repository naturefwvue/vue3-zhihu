<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    vuex的demo
    {{blogs}}<br>
    <input type="button" value="添加" @click="addNewBlog(1)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onDeactivated,
  onActivated,
  onBeforeUpdate,
  onUpdated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

import { Blogs } from './js/blog.js'

export default {
  name: 'Home',
  components: {
  },
  setup () {
    const { blogs, addNewBlog } = Blogs()

    const value = ref('11')
    onBeforeMount(() => {
      console.log('onBeforeMount')
    }) //
    onMounted(() => {
      console.log('onMounted')
    }) //

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    }) //
    onUnmounted(() => { // 加载？
      console.log('onUnmounted')
    }) //

    onDeactivated(() => { // 关闭、未激活？
      console.log('onDeactivated')
    }) //
    onActivated(() => { // 启动时、激活
      console.log('onActivated')
    }) //

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    }) //
    onUpdated(() => {
      console.log('onUpdated')
    }) //

    onErrorCaptured(() => { // 捕获错误时
      console.log('onErrorCaptured')
    }) //
    onRenderTracked(() => { // 渲染跟踪时
      console.log('onRenderTracked')
    }) //
    onRenderTriggered(() => { // 渲染触发时
      console.log('onRenderTriggered')
    }) //

    // onActivated onBeforeMount  onBeforeUnmount onBeforeUpdate onDeactivated
    // onErrorCaptured onRenderTracked onRenderTriggered onUnmounted
    // onUpdated
    return {
      blogs,
      addNewBlog,
      value
    }
  }
}
</script>
