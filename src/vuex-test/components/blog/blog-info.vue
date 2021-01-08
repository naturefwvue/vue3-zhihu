<!--博文详细-->
<template>呜呜{{blogId}}
  <a-card style="margin: 22px;padding: 10px; ">
    {{blogInfo.title}} {{blogInfo.addTime}}<br>
    <p v-html="blogInfo.concent"></p>
    人气：{{blogInfo.viewCount}}- 点赞：{{blogInfo.agreeCount}} -
    <span @click="updateBlog(blogInfo.id)">修改</span><br>
  </a-card>
  <discussList :blogId="blogId" :isReaload="isReaload"/>
  <discussForm :blogId="blogId" @submitblog="submitblog"/>
</template>

<script>
// 显示博文内容
// 博文点赞
import { reactive, ref } from 'vue'
import { myIndexedDB } from '../../store/indexedDB.js'
import discussList from './discuss-list.vue'
import discussForm from './discuss-form.vue'

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
    const { getObject } = myIndexedDB() // 数据库
    const blogInfo = reactive({}) // 数据
    const id = ref(props.blogId) // 博文ID
    const isReaload = ref(false) // 是否重新加载讨论列表
    console.log('blog-info-id', id.value)
    // 获取博文详细内容
    getObject('blog', parseInt(id.value)).then((data) => {
      console.log(data)
      blogInfo.id = data.id
      blogInfo.title = data.title
      blogInfo.concent = data.concent
      blogInfo.viewCount = data.viewCount
      blogInfo.agreeCount = data.agreeCount
    })

    // 刷新讨论列表
    const submitblog = (id) => {
      isReaload.value = !isReaload.value
    }

    return {
      blogInfo,
      isReaload,
      submitblog
    }
  }

}
</script>
