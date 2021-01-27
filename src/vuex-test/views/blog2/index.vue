<template>
  <div>
    <!--博客演示-->
    <a-button type="" @click="writeBlog">写博客</a-button>
    <a-row>
      <a-col :span="11">
        <!--博文列表、博文详细 + 讨论列表 + 讨论表单-->
        <router-view></router-view>
      </a-col>
      <a-col :span="11">
        <!--查询分组-->
        <blogGroup/>
    </a-col>
    </a-row>
    <!--博文表单-->
    <formBlog/>
  </div>
</template>

<script>
import { provide, reactive } from 'vue'
import formBlog from '../../components/blog2/blog-form'
import blogGroup from '../../components/blog2/blog-find'
import mapBlogAction from '../../store/myMap.js'

// 提供一个容器
export default {
  name: 'demo-blog2',
  components: {
    formBlog, // 表单
    blogGroup
  },
  setup () {
    const { readyAddBlog } = mapBlogAction()

    console.log('ss', { ...{ a: 11, b: 222 }, ...{ a: 111 } })
    // 添加博客，打开弹窗
    const writeBlog = () => {
      readyAddBlog()
    }

    // 定义
    const blog = reactive({
      title: 'aaa'
    })
    provide('blog', blog)
    console.log('parentBlog', blog)

    return {
      writeBlog,
      blog
    }
  }
}
</script>
