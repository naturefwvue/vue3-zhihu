<template>
  <div>
    博客演示
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'

// 博客的入口，初始化各种设置
// 建立表结构等
export default {
  name: 'demo-blog',
  components: {
  },
  setup () {
    const myTest = ref('avi')
    const openKeys = ref(['sub2'])

    const handleClick = (e) => {
      console.log('click', e)
    }
    const titleClick = (e) => {
      console.log('titleClick', e)
    }

    return {
      myTest,
      openKeys,
      handleClick,
      titleClick
    }
  }
}
</script>
