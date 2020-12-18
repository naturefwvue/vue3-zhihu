<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header><!--导航-->
        <div id="nav" style="margin:0px auto;padding-left:30px;width:850px;">
          <span style="cursor: pointer;" @click="naviClick(1)">首页</span> |
          <!--博文表单-->
          <blogForm
              :blog="form.blog"
              :groupList="list.group"
              @submitblog="submitBlog"/>
        </div>
      </a-layout-header>
      <a-layout style="margin:0px auto;width:850px;">
        <a-layout-content>
          <!--博文列表-->
          <blogList v-if="isShow.blogList" :blogList="list.blog" @showblog="showblog" @updateagreecount="updateAgreeCount"/>
          <!--博文详细-->
          <blogInfo v-if="isShow.blogInfo" :blogInfo="list.blogInfo" @showblog="showblog"/>
          <!--讨论列表-->
          <discussList v-if="isShow.blogInfo" :discussList="list.discuss" @showblog="showblog"/>
          <!--讨论表单-->
          <discussForm v-if="isShow.blogInfo" @submit="submitDiscuss"/>
        </a-layout-content>
        <a-layout-sider>
          <!--博文分组列表和查询-->
          <groupList :groupList="list.group" @findblog="findBlog"/>
        </a-layout-sider>
      </a-layout>
      <a-layout-footer>自然框架，vue3，antdv</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import groupList from './components/blog-find.vue'
import blogList from './components/blog-list.vue'
import blogInfo from './components/blog-info.vue'
import blogForm from './components/blog-form.vue'
import discussList from './components/discuss-list.vue'
import discussForm from './components/discuss-form.vue'

import { BlogManage } from './views/js/blog.js'
import { vueLife } from './views/js/vue-life.js'

// import { useRouter } from 'vue-router'

// 显示状态
const isShow = reactive({
  blogList: true,
  blogInfo: false,
  blogForm: false
})
// 列表
const list = reactive({
  group: [],
  blog: [],
  blogInfo: {},
  discuss: []
})
// 表单
const form = reactive({
  group: {},
  blog: {},
  discuss: {}
})

export default {
  name: 'blog',
  components: {
    blogList, // 博文列表
    blogInfo, // 博文内容
    blogForm, // 博文表单
    discussList, // 讨论列表
    discussForm, // 讨论表单
    groupList // 博文分组
  },
  setup (props) {
    vueLife('__blog')
    // 博客的管理类
    const {
      getGroupList, // 获取分组列表
      getBlogList, // 获取博文列表
      getBlogInfo, // 获取博文内容
      findBlogList, // 查询博文列表
      getDiscussList, // 获取讨论列表
      addNewBlog, // 添加新博文
      blogAgreeCount, // 点赞 +1
      addNewDiscuss // 添加新讨论
    } = BlogManage()

    // 分组列表
    list.group = getGroupList()
    // 博文列表
    list.blog = getBlogList()
    // 博文内容
    // list.blogInfo = getBlogInfo(0)
    // 讨论列表
    // list.discuss = getDiscussList(0)

    // 当前的博文ID
    const thisBlogId = ref(0)

    // 查询
    const findBlog = (query) => {
      // 博文列表
      list.blog = findBlogList(query)
      isShow.blogList = true
      isShow.blogInfo = false
    }

    // 显示博文详细和讨论列表
    const showblog = (id) => {
      thisBlogId.value = id
      list.blogInfo = getBlogInfo(id) // 博文内容
      list.discuss = getDiscussList(id) // 讨论列表
      isShow.blogList = false
      isShow.blogInfo = true
    }

    // 博文列表点赞
    const updateAgreeCount = (index, count) => {
      list.blog[index].agreeCount += count
      blogAgreeCount(list.blog[index].id, count)
    }

    // 添加、修改博文
    const submitBlog = (blog) => {
      addNewBlog(blog)
      isShow.blogList = true
      isShow.blogInfo = false
      list.blog = getBlogList() // 博文列表
    }

    // 添加讨论
    const submitDiscuss = (discussForm) => {
      // alert(discussForm.nick)
      if (typeof discussForm.nick !== 'undefined') {
        addNewDiscuss(thisBlogId.value, discussForm)
        list.discuss = getDiscussList(thisBlogId.value)
      }
    }

    // 导航的单击事件
    const naviClick = (id) => {
      // 显示博文详细和讨论列表
      switch (id) {
        case 1:
          // 首页
          isShow.blogList = true
          isShow.blogInfo = false
          list.blog = getBlogList() // 博文列表
          break
        case 2:
          // 显示添加博文的表单
          isShow.blogForm = true
          isShow.blogList = true
          isShow.blogInfo = false
          break
      }
    }

    return {
      naviClick,
      isShow,
      list,
      form,
      updateAgreeCount, // 博文列表点赞
      submitBlog, // 添加、修改博文
      submitDiscuss, // 添加讨论
      showblog, // 显示博文详细 + 讨论列表
      findBlog // 查询
    }
  }
}
</script>
<style>
#mainconect {
  line-height: 30px;
  text-align:left;
}
#components-layout-demo-basic {
  text-align: left;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #dce7f0;
  color: #fff;
  text-align: left;
  line-height: 20px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgb(230, 241, 241);
  color: rgb(27, 16, 16);
  min-height: 20px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
