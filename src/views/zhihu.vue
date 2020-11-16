<template>
  <div id="nav" style="text-align: left;line-height: 30px;">
    我是知乎 {{val}}  {{ $route.path }}
    <br>
    <a href="/question">a 连接演示</a> <br>
    <router-link to="/question">path演示</router-link> <br>
    <router-link :to="{name:'question'}">name演示</router-link> <br>
    <router-link to="/questionsss">404演示</router-link> <br>
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
// import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Zhihu',
  components: {

  },
  setup (props, { root }) {
    const val = ref('33')
    // val.value = root
    return {
      val
    }
  }
}
</script>
