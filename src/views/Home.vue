<template>
  <div id="nav" style="text-align: left;line-height: 30px;">
    我是知乎 {{val}}  {{ $route.path }}
    <br>
    <a href="/question/list">a 连接演示，提问列表</a> <br>
    <router-link to="/question/list">path演示，提问列表</router-link> <br>
    <router-link :to="{name:'questionList', params: { type:'recommend',typeId:'1', typeName:'推荐提问'}}">name演示，提问列表</router-link> <br>
    <router-link :to="{name:'questionAnswerList', params: { questionId: '123' }}">name演示，提问内容</router-link> <br>
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
