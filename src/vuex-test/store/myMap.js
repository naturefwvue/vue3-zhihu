import { readonly } from 'vue'
import { useStore } from 'vuex'

const mapBlogAction = () => {
  const store = useStore() // 引入 vuex

  // 博文分组部分==============================

  /**
    * 获取博文分组的列表 readonly reactive 类型
    */
  const getGroupList = () => {
    return readonly(store.getters.getGroupList)
  }

  // 博文查询部分==============================

  /**
   * 获取当前页号的博文列表，readonly reactive 类型
  */
  const getBlogList = () => {
    return readonly(store.getters.getBlogList)
  }

  /**
  * 设置博文列表的分页数据。pageInfo:{current:1,pageSize:5}
  */
  const pageBlogList = (pageInfo) => {
    store.commit('pageBlogList', pageInfo)
  }

  // 博文添加、修改、删除部分==============================

  /**
   * 添加新博文
  */
  const addBlog = (blog) => store.dispatch('addBlog', blog)

  /**
    * 修改博文
  */
  const updateBlog = (blog) => store.dispatch('updateBlog', blog)

  /**
    * 获取博文
  */
  const getBlog = () => {
    return store.dispatch('getCurrentBlog')
  }

  /**
  * 获取博文表单状态 reactive 类型
  */
  const getBlogFormState = () => {
    return store.getters.getBlogFormState
  }

  /**
   * 关闭弹窗
  */
  const closeBlogForm = () => {
    store.commit('setBlogFormIsOpen', false)
  }

  /**
   * 准备添加博文
  */
  const readyAddBlog = () => {
    store.commit('setBlogFormEditState', { editState: 'add', blogId: 0, isOpen: true })
  }

  /**
   * 准备修改博文
  */
  const readyUpdateBlog = (id) => {
    store.commit('setBlogFormEditState', { editState: 'update', blogId: id, isOpen: true })
  }

  // 讨论部分=================================

  /**
   * 获取当前博文的讨论列表 blogId:当前博文ID。readonly reactive 类型
  */
  const getDiscussList = (blogId) => {
    return readonly(store.getters.getDicuessList(blogId))
  }

  /**
   * 添加新讨论
  */
  const addDiscuess = (discuss) => store.dispatch('addDiscuess', discuss)

  return {
    getGroupList, // 获取分组列表
    getBlogList, // 第一次获取博文列表
    pageBlogList, // 博文列表的分页
    getDiscussList, // 第一次获取讨论列表
    getBlogFormState, // 获取表单状态
    closeBlogForm, // 关闭弹窗
    readyAddBlog, // 准备添加博文
    readyUpdateBlog, // 准备修改博文
    addBlog, // 添加博文
    updateBlog, // 修改博文
    getBlog, // 获取博文内容
    addDiscuess // 添加讨论
  }
}

export default mapBlogAction
