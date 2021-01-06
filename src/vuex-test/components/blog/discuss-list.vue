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
import { vueLife } from '../views/js/vue-life.js'

export default {
  name: 'discuess-list',
  props: {
    discussList: Array
  },
  setup (props, ctx) {
    vueLife('discuess-list')
    return {

    }
  }

}
</script>
