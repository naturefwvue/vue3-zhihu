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
import { ref, watch } from 'vue'
import { myIndexedDB } from '../../store/indexedDB.js'

export default {
  name: 'discuess-list',
  props: {
    blogId: Number,
    isReaload: Boolean
  },
  setup (props, ctx) {
    const { findObjectByIndex } = myIndexedDB()
    const discussList = ref([])
    const blogId = ref(props.blogId) // 读取属性值

    const loadDiscussList = () => {
      findObjectByIndex('discuess', 'blogId', parseInt(blogId.value)).then((data) => {
        discussList.value = data
      })
    }
    loadDiscussList()

    watch(
      () => props.isReaload,
      (load, prevLoad) => {
        loadDiscussList()
      }
    )

    return {
      discussList
    }
  }

}
</script>
