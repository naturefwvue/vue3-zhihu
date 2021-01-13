<!--讨论列表-->
<template>
  <a-card
    style="margin: 30px;padding: 5px; "
    v-for="(item,index) in discussList"
    :key="'discusslist'+index">
      {{index+1}}楼：{{item.nick}} 在 {{item.addTime}} 说：
      <el-divider></el-divider>
      <p v-html="item.concent"></p>
      点赞：{{item.agreeCount}}<br>
  </a-card>
</template>

<script>
// 显示讨论列表
// 删除讨论，事件返回
// 点赞讨论，事件返回
import { ref } from 'vue'
import { useStore } from 'vuex'
import mapBlogAction from '../../store/myMap.js'

export default {
  name: 'discuess-list',
  props: {
    blogId: Number,
    isReaload: Boolean
  },
  setup (props, ctx) {
    const { getDiscussList } = mapBlogAction()
    const store = useStore() // 引入 vuex

    const blogId = ref(props.blogId) // 读取属性值
    const discussList = getDiscussList(blogId.value)
    setTimeout(() => {
      if (typeof store.state.myPromies.then === 'function') {
        store.state.myPromies.then((data) => {
          console.log('myPromies:', data)
        })
      }
    }, 500)

    return {
      discussList
    }
  }

}
</script>
