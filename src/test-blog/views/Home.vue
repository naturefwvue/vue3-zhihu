<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    vuex的demo
    {{blogs}}<br>
    <input type="button" value="添加" @click="addNewBlog(1)"/>
  </div>
  <div>
    <!--博文查询-->
    <groups/>
  </div>
  <div>
    <!--博文列表-->11
    <blogs :blogList="blogList"/>
  </div>
  <div>
    <!--博文表单-->
  </div>
  <div>
    <!--讨论列表-->
  </div>
  <div>
    <!--讨论表单-->
  </div>

</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import blogs from '../components/blog-list.vue'
import groups from '../components/blog-find.vue'

import { BlogNanage } from './js/blog.js'

export default {
  name: 'Home',
  components: {
    blogs,
    groups
  },
  setup () {
    const { getBlogList, addNewBlog } = BlogNanage()

    const blogList = ref(getBlogList())
    console.log(blogList)
    const value = ref('11')
    return {
      blogList,
      addNewBlog,
      value
    }
  }
}
</script>
