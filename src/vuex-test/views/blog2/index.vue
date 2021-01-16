<template>
  <div>
    <!--博客演示-->
    <a-button type="" @click="writeBlog">写博客</a-button>
    <formBlog/>
    <!--博文列表、博文详细 + 讨论列表 + 讨论表单-->
    <router-view></router-view>
  </div>
</template>

<script>
import formBlog from '../../components/blog2/blog-form'
import mapBlogAction from '../../store/myMap.js'

// 提供一个容器
export default {
  name: 'demo-blog2',
  components: {
    formBlog // 表单
  },
  setup () {
    const { openBlogForm, readyAddBlog } = mapBlogAction()

    // 添加博客，打开弹窗
    const writeBlog = () => {
      readyAddBlog()
      openBlogForm()
    }

    return {
      writeBlog
    }
  }
}
</script>
