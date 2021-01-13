<template>
  <div class="home">
    <hr>
    子控件 的演示 <br>
    {{test}}<br>
    comBlogList:{{comBlogList}}<br>
    <input type="button" @click="add()" value="假装添加一个博文"> <br>
    <input type="button" @click="setItem('bbb')" value="修改 name 的值"> <br>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore, mapActions } from 'vuex'
import mapBlogAction from '../../store/myMap.js'

// @ is an alias to /src

export default {
  name: 'vuex2',
  components: {
  },
  setup (props, ctx1) {
    const test = ref('vuex') // 显示值

    const store = useStore()
    console.log('store--', store)
    console.log('vuex21', store.state.count)
    const comBlogList = computed(() => store.state.blog)
    console.log('comBlogList', comBlogList)

    const { addBlog1 } = { ...mapActions(['addBlog', 'increment']) }
    console.log('addBlog1', addBlog1)

    // const addBlog = (blog) => store.dispatch('addBlog', blog)
    const { addBlog } = mapBlogAction()
    console.log('addBlog', addBlog)

    const add = () => {
      // store.dispatch('addBlog', {
      addBlog({
        title: '这是一个博客11',
        groupId: 2,
        introduction: '这是博客的简介111',
        concent: '这是博客的详细内容1111'
      }).then((id) => {
        // alert(id)
      })
    }
    return {
      add,
      comBlogList,
      test
    }
  }

}
</script>
