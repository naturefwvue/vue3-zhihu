<template>
  <div id="nav" style="text-align: left;line-height: 30px;">
    我是知乎 {{val}}  {{ $route.path }}
    <br>
    <a href="/question/list">a 演示，提问列表（页面会跳转）</a> <br>
    <a href="/question/list" @click="testHistory">a + H5 History 演示，用户中心（url有变化，但是页面没变化）</a> <br>
    <router-link to="/question/list">path跳转演示，提问列表</router-link> <br>
    <router-link :to="{name:'questionList', params: { type:'recommend',typeId:'1', typeName:'推荐提问'}}">name跳转演示，提问列表</router-link> <br>
    <router-link :to="{name:'questionAnswerList', params: { questionId: '123' }}">name演示，提问内容</router-link> <br>
    <router-link to="/question/456">path演示，提问内容</router-link> <br>
    <router-link :to="{name:'question-write'}">写提问</router-link> <br>
    <router-link :to="{name:'answer-write'}">写回答</router-link> <br>
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

    const testHistory = (e) => {
      // 没有啥效果 pushState
      // history.replaceState('11', '11', '/question/list')
      // 还是没有效果
      // history.pushState('11', '11', '/userCenter/set1')
      e.preventDefault()
      // window.history.pushState('11', '11', '/userCenter/set')
      window.history.go(-2) // 可以后退
      // alert(history.length)
      return false
    }
    return {
      val,
      testHistory
    }
  }
}
</script>
