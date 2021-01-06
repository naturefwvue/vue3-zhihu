<!--博文详细-->
<template>呜呜{{blogId}}
  <a-card style="margin: 22px;padding: 10px; ">
    {{blogInfo.title}} {{blogInfo.addTime}}<br>
    <p v-html="blogInfo.concent"></p>
    人气：{{blogInfo.viewCount}}- 点赞：{{blogInfo.agreeCount}} -
    <span @click="updateBlog(blogInfo.id)">修改</span><br>
  </a-card>
</template>

<script>
// 显示博文内容
// 博文点赞

export default {
  name: 'blog-info',
  props: {
    blogId: Number,
    blogInfo: Object
  },
  setup (props, ctx) {
    const updateBlog = (id) => {
      ctx.emit('updateblog', id)
    }
    return {
      updateBlog
    }
  }

}
</script>
