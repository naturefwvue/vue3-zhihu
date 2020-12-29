<!--博文详细-->
<template>
  <a-card style="margin: 22px;padding: 10px; ">
    {{blogInfo.title}} {{blogInfo.addTime}}<br>
    <p v-html="blogInfo.concent"></p>
    人气：{{blogInfo.viewCount}}- 点赞：{{blogInfo.agreeCount}} -
    <span @click="updateBlog(blogInfo.id)">修改</span><br>
  </a-card>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'
// 显示博文内容
// 博文点赞
import { vueLife } from '../views/js/vue-life.js'

export default {
  name: 'blog-info',
  props: {
    blogInfo: Object
  },
  setup (props, ctx) {
    vueLife('blog-info')

    const updateBlog = (id) => {
      ctx.emit('updateblog', id)
    }
    return {
      updateBlog
    }
  }

}
</script>
