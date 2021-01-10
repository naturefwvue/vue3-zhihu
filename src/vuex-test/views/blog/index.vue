<template>
  <div>
    <!--博客演示-->
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { myIndexedDB } from '../../store/indexedDB.js'

// 建立表结构等
export default {
  name: 'demo-blog',
  components: {
  },
  setup () {
    console.log('demo-blog - setup')
    // const { dbOpen } = myIndexedDB()
    console.log('demo-blog - setup - dbOpen -end')
    const myTest = ref('avi')
    const openKeys = ref(['sub2'])

    // 初始化
    // dbOpen()

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
