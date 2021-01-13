<template>
  <div>
    <!--博客演示-->
    <formBlog/>22
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
import formBlog from '../../components/blog2/blog-form'

// 提供一个容器
export default {
  name: 'demo-blog2',
  components: {
    formBlog
  },
  setup () {
    const myTest = ref('avi')

    return {
      myTest
    }
  }
}
</script>
