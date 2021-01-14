<!--博文列表-->
<template>
  <div style="margin:0px auto;width:850px;">
    <!--博文列表-->
    <router-link :to="{name:'write2'}">写博客</router-link>
    <a-pagination
      v-model:current="current"
      :pageSize="5"
      :total="30"
      @change="pageChange"
      show-less-items
    />
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
        人气：{{item.viewCount}} <span @click="agree(index)"> {{dianzan}}：{{item.agreeCount}}</span><br>
    </a-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import mapBlogAction from '../../store/myMap.js'

export default {
  name: 'blog-list2',
  props: {
  },
  setup (props, ctx) {
    console.log('blog-list - setup')
    const store = useStore() // 引入 vuex
    // 获得一个vuex对象
    const { getBlogList, pageBlogList } = mapBlogAction()

    // 获取博文列表
    const blogList = getBlogList()
    const blogList1 = computed(() => store.state.blog)
    console.log('blogList', blogList)
    console.log('blogList1', blogList1)

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
    }

    return {
      blogList, // 博文列表
      blogList1,
      current, // 当前页号
      pageChange, // 翻页事件
      agree,
      dianzan
    }
  }

}
</script>
