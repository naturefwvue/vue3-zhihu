<!--博文查询-->
<template>
  <a-card id="group" style="float: right;">
    <template #title>
      <a-input-search
        v-model:value="value"
        placeholder="查询内容"
        enter-button
        @search="findBlog({key:value})"
      />
    </template>
    <template v-for="(item,index) in groupList"
      :key="'group'+index">
      <span :title="item.introduction" @click="findBlog({group:item.value})" style="cursor: pointer;">
        {{item.label}}
      </span><hr>
    </template>
  </a-card>
</template>

<script>
import { ref } from 'vue'
// import { BellOutlined } from '@ant-design/icons-vue'
import mapBlogAction from '../../store/myMap.js'

// 查询博文
// 显示博文分组
// 分组显示博文列表的事件

export default {
  name: 'blog-find',
  props: {
  },
  setup (props, ctx) {
    const {
      getGroupList
    } = mapBlogAction()

    // 获取分组列表
    const groupList = getGroupList()
    const value = ref('')

    // 查询
    const findBlog = (query) => {
      ctx.emit('findblog', query)
    }

    return {
      findBlog,
      groupList,
      value
    }
  }

}
</script>
