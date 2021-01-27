<!--博文详细-->
<template>
  <a-card style="margin: 22px;padding: 10px; ">
    {{blogInfo.title}} {{blogInfo.addTime}}<br>
    <p v-html="blogInfo.concent"></p>
    人气：{{blogInfo.viewCount}}- 点赞：{{blogInfo.agreeCount}} -
    <span @click="updateBlog(blogInfo.id)">修改</span><br>
  </a-card>
  <discussList :blogId="blogId"/>
  <discussForm :blogId="blogId"/>
</template>

<script>
// 显示博文内容
// 博文点赞
import { ref } from 'vue'
import discussList from './discuss-list.vue'
import discussForm from './discuss-form.vue'
import mapBlogAction from '../../store/myMap.js'

export default {
  name: 'blog-info',
  components: {
    discussList, // 讨论列表
    discussForm // 讨论表单
  },
  props: {
    blogId: Number
  },
  setup (props, ctx) {
    console.log('blog-info---setup')
    const { getBlogInfo } = mapBlogAction()

    const blogInfo = ref({}) // 数据
    const id = ref(props.blogId) // 博文ID
    // 获取博文详细内容
    getBlogInfo(parseInt(id.value)).then((data) => {
      blogInfo.value = data
    })

    return {
      blogInfo
    }
  }

}
</script>
