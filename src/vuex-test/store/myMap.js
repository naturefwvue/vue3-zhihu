import { computed } from 'vue'
import { useStore } from 'vuex'

const mapBlogAction = () => {
  const store = useStore() // 引入 vuex
  // 获取博文列表
  const getBlogList = () => {
    return computed(() => store.getters.getBlogList)
  }

  // 获取博文的讨论列表
  const getDiscussList = (blogId) => {
    return computed(() => store.getters.getDicuessList(blogId))
    // return (blogId) => store.getters.getDicuessList
  }

  // 添加新博文
  const addBlog = (blog) => store.dispatch('addBlog', blog)
  // 添加新讨论
  const addDiscuess = (discuss) => store.dispatch('addDiscuess', discuss)

  return {
    getBlogList,
    getDiscussList,
    addBlog,
    addDiscuess
  }
}

export default mapBlogAction
