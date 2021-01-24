<!--博文列表-->
<template>
  <div style="margin:0px auto;width:850px;">
    <!--博文列表-->
    <router-link :to="{name:'write2'}">写博客</router-link>{{parentBlog}}
    <a-pagination
      v-model:current="current"
      :pageSize="5"
      :total="30"
      @change="pageChange"
      show-less-items
    />{{ret}} {{refNumber}} myCount:{{$store.state.count}}
    <a-card
      v-for="(item,index) in blogList"
      :key="'bloglist'+index"
      style="width:500px;margin: 5px;padding: 3px;"
    >
        <template #title>
          <router-link
            :to="{name:'blogInfo2', params: { blogId: item.id}}">
            {{item.title}}
          </router-link>
        </template>
        <template #extra>{{item.addTime}}</template>
        {{item.introduction}}<br>
        人气：{{item.viewCount}}
        <span @click="agree(index)">
          {{dianzan}}：{{item.agreeCount}}
        </span>&nbsp;&nbsp;&nbsp;
        <span @click="updateBlog(item.id)"  style="cursor: pointer;">
          修改
        </span>
        <br>
    </a-card>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import mapBlogAction from '../../store/myMap.js'

export default {
  name: 'blog-list2',
  props: {
  },
  setup (props, ctx) {
    console.log('blog-list - setup')
    // 获得一个 map
    const {
      getBlogList,
      pageBlogList,
      readyUpdateBlog,
      openBlogForm
    } = mapBlogAction()

    // 获取博文列表
    const blogList = getBlogList()
    console.log('blogList', blogList)

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

    // 当前页号
    const current = ref(1)
    // 分页事件
    const pageChange = (page, pageSize) => {
      console.log(page, pageSize)
      pageBlogList({ current: page, pageSize: pageSize })
      parentBlog.title = page
    }

    // 添加博客，打开弹窗
    const updateBlog = (id) => {
      readyUpdateBlog(id)
      openBlogForm()
    }

    const parentBlog = inject('blog')
    console.log('parentBlog', parentBlog)

    return {
      blogList, // 博文列表
      current, // 当前页号
      pageChange, // 翻页事件
      updateBlog, // 准备修改博文
      agree,
      dianzan,
      parentBlog
    }
  }

}
</script>
