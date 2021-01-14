import { computed } from 'vue'
import { useStore } from 'vuex'

const mapBlogAction = () => {
  const store = useStore() // 引入 vuex

  // 查询部分

  /**
    * 获取博文分组的列表
    */
  const getGroupList = () => {
    return computed(() => store.getters.getIsOpenBlogForm)
  }

  /**
  * 获取博文表单是否显示
  */
  const getIsOpenBlogForm = () => {
    return computed(() => store.getters.getIsOpenBlogForm)
  }

  /**
   * 设置博文表单是否显示
  */
  const setIsOpenBlogForm = (bool) => {
    store.commit('setIsOpenBlogForm', bool)
  }

  /**
   * 获取博文列表
  */
  const getBlogList = () => {
    return computed(() => store.getters.getBlogList)
  }

  /**
  * 设置博文列表的分页数据
  */
  const pageBlogList = (pageInfo) => {
    store.commit('pageBlogList', pageInfo)
  }

  /**
   * 获取博文的讨论列表
  */
  const getDiscussList = (blogId) => {
    return computed(() => store.getters.getDicuessList(blogId))
    // return (blogId) => store.getters.getDicuessList
  }

  // 增删改部分

  /**
   * 添加新博文
  */
  const addBlog = (blog) => store.dispatch('addBlog', blog)

  /**
   * 修改博文
  */
  const updageBlog = (blog) => store.dispatch('updageBlog', blog)

  /**
   * 添加新讨论
  */
  const addDiscuess = (discuss) => store.dispatch('addDiscuess', discuss)

  return {
    getGroupList, // 获取分组列表
    getIsOpenBlogForm, // 获取弹窗状态
    setIsOpenBlogForm, // 设置弹窗状态
    getBlogList, // 第一次获取博文列表
    pageBlogList, // 博文列表的分页
    getDiscussList, // 第一次获取讨论列表
    addBlog, // 添加博文
    updageBlog, // 修改博文
    addDiscuess // 添加讨论
  }
}

export default mapBlogAction
