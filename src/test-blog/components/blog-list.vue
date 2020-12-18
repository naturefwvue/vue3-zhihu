<!--博文列表-->
<template>
  <div style="margin:0px auto;width:850px;">
    <!--博文列表-->
      <a-card
        v-for="(item,index) in blogList"
        :key="'bloglist'+index"
        style="width:500px;margin: 5px;padding: 3px;"
      >
          <template #title>
            <span @click="showBlog(item.id)" style="cursor: pointer;">{{item.title}}</span>
          </template>
          <template #extra>{{item.addTime}}</template>
          {{item.introduction}}<br>
          人气：{{item.viewCount}} <span @click="agree(index)"> {{dianzan}}：{{item.agreeCount}}</span><br>
      </a-card>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { BellOutlined } from '@ant-design/icons-vue'
// import { reactive } from 'vue'
import { vueLife } from '../views/js/vue-life.js'

export default {
  name: 'blog-list',
  props: {
    blogList: Array
  },
  setup (props, ctx) {
    vueLife('blog-list')
    // 显示博文详细
    const showBlog = (id) => {
      ctx.emit('showblog', id) // 提交事件和参数
    }

    // 点赞 or 取消点赞
    const dianzan = ref('点赞')

    const agree = (index) => {
      if (dianzan.value === '点赞') {
        ctx.emit('updateagreecount', index, 1)
        dianzan.value = '取消点赞'
      } else {
        ctx.emit('updateagreecount', index, -1)
        dianzan.value = '点赞'
      }
    }
    return {
      showBlog,
      agree,
      dianzan
    }
  }

}
</script>
