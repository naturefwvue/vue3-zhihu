import { createStore } from 'vuex'
import { myIndexedDB } from './indexedDB.js'

const {
  addObject,
  getObjectByStore,
  findObjectByIndex
} = myIndexedDB()

export default createStore({
  state: {
    count: 0,
    isLoadingDiscuss: false, // 加载中
    isOpenBlogForm: false, // 是否显示添加博文的表单
    blogFormState: 'writing', // writing 编写中；uploading：修改中；end：完毕
    group: [], // 博文分组列表
    blog: [], // 博文列表
    currentBlogId: 1, // 当前博文的ID
    discuess: [], // 讨论列表
    myPromies: () => {} // mutations 的异步操作
  },
  // get
  getters: {
    // 获取博文分组列表
    getGroupList (state) {
      if (state.blog.length === 0) {
        getObjectByStore('group').then((data) => {
          data.forEach(element => {
            state.group.push(element)
          })
        })
      }
      return state.group
    },
    // 获取博文分组数量
    getGroupCount (state) {
      return state.group.length
    },
    // 获取博文列表
    getBlogList: (state) => {
      if (state.blog.length === 0) {
        getObjectByStore('blog').then((data) => {
          data.forEach(element => {
            state.blog.push(element)
          })
        })
      }
      return state.blog
    },
    // 获取博文的讨论列表
    getDicuessList: (state) => (blogId) => {
      const promise = new Promise((resolve, reject) => {
        if (state.currentBlogId !== blogId) {
          findObjectByIndex('discuess', 'blogId', parseInt(blogId)).then((data) => {
            state.discuess.length = 0 // 清空之前的记录
            data.forEach(element => {
              state.discuess.push(element)
            })
            state.currentBlogId = blogId
            resolve(state.discuess)
          })
        } else {
          resolve(state.discuess)
        }
      })
      state.myPromies = promise
      return state.discuess
    },
    getBlogListByGroup (state, groupId) {
      return state.blog.filter((item) => item.groupId === groupId)
    },
    getBlogById (state) {
      return state.blog
    },
    getTodoById: (state) => (id) => {
      return state.count
    },
    getCount (state) {
      console.log('getters-getMyRef', state.myRef)
      return state.count
    }
  },
  // set，不能异步，其实也不是不可以。
  mutations: {
    setBlog (state, blog) {
      state.blog.push(blog)
    },
    setDiscuess (state, discuess) {
      state.discuess.push(discuess)
    },
    increment (state, value = 1) {
      state.count += value
      // 尝试一下 mutations 的异步操作
      const pp = new Promise((resolve, reject) => {
        resolve(state.count)
      })
      state.myPromies = pp
      return pp
    }
  },
  // 可以异步
  actions: {
    // 添加一个博文
    addBlog (state, blog) {
      const newBlog = {
        id: new Date().valueOf(), // 时间戳作为主键值
        groupId: blog.groupId,
        title: blog.title,
        addTime: new Date(),
        introduction: blog.introduction,
        concent: blog.concent,
        viewCount: 0,
        agreeCount: 0
      }
      // 提交给vuex
      this.commit('setBlog', newBlog)
      const promise = new Promise((resolve, reject) => {
        // 提交给后端
        // 提交给前端存储
        addObject('blog', newBlog).then((id) => {
          console.log(id)
          resolve(id)
        })
      })
      return promise
    },
    // 添加一个讨论
    addDiscuess (state, discuss) {
      const newDiscuess = {
        id: new Date().valueOf(), // 时间戳作为主键值
        blogId: discuss.blogId,
        nick: discuss.nick,
        addTime: new Date(),
        concent: discuss.concent,
        agreeCount: 0
      }
      // 提交给vuex
      this.commit('setDiscuess', newDiscuess)
      const promise = new Promise((resolve, reject) => {
        // 提交给后端
        // 提交给前端存储
        addObject('discuess', newDiscuess).then((id) => {
          console.log(id)
          resolve(id)
        })
      })
      return promise
    },
    add1 (state, value = 1) {
      state.count += value
      // 尝试一下 mutations 的异步操作
      const pp = new Promise((resolve, reject) => {
        resolve(this.state.count)
      })
      return pp
    }
  },
  modules: {
    mod1: {
      state: {
        count: 0,
        myRef: 1
      }
    }
  }
})
