import { reactive } from 'vue'
import { createStore } from 'vuex'
import { myIndexedDB } from './indexedDB.js'

// 访问 IndexedDB 数据库
const {
  addObject,
  getObject,
  getObjectByStore,
  findObjectByIndex
} = myIndexedDB()

export default createStore({
  state: {
    groupList: reactive([]), // 博文分组列表
    blogList: reactive([]), // 当前分页的博文列表
    discuessList: reactive([]), // 当前博文的讨论列表
    blog: reactive({
      id: 1,
      title: '',
      groupId: null,
      introduction: '',
      concent: ''
    }), // 当前博文内容
    blogConfig: reactive({
      currentPage: 0,
      pageSize: 5
    }),
    blogFormState: reactive({
      isOpen: false, // isOpenBlogForm 是否显示添加博文的表单
      editState: 'add', // add 编写中；uploade：修改中；end：完毕
      blogId: 1 // 当前博文的ID
    }),
    myPromies: () => {} // mutations 的异步操作
  },
  // get
  getters: {
    // 获取博文分组列表
    // 检查state里有没有，没有加载，有的话直接返回
    getGroupList (state) {
      if (state.groupList.length === 0) {
        getObjectByStore('group').then((data) => {
          data.forEach(element => {
            state.groupList.push(element)
          })
        })
      }
      return state.groupList
    },

    // 获取当前页的博文列表
    // 检查state里有没有，没有加载第一页，有的话直接返回
    getBlogList: (state) => {
      if (state.blogList.length === 0) {
        getObjectByStore('blog', state.blogConfig.pageSize, 0).then((data) => {
          data.forEach(element => {
            state.blogList.push(element)
          })
        })
      }
      return state.blogList
    },

    // 获取当前博文内容
    // 检查state里有没有，没有加载，有的话直接返回
    getBlog: (state) => {
      getObject('blog', state.blogFormState.blogId).then((data) => {
        state.blog.id = data.id
        state.blog.title = data.title
        state.blog.groupId = data.groupId
        state.blog.introduction = data.introduction
        state.blog.concent = data.concent
      })
      return state.blog
    },

    // 获取当前博文的讨论列表
    getDicuessList: (state) => (blogId) => {
      const promise = new Promise((resolve, reject) => {
        if (state.currentBlogId !== blogId) {
          findObjectByIndex('discuess', 'blogId', parseInt(blogId)).then((data) => {
            state.discuessList.length = 0 // 清空之前的记录
            data.forEach(element => {
              state.discuessList.push(element)
            })
            state.currentBlogId = blogId
            resolve(state.discuessList)
          })
        } else {
          resolve(state.discuessList)
        }
      })
      state.myPromies = promise // 模拟一下异步
      return state.discuessList
    },

    // 获取博文表单是否显示
    getBlogFormState (state) {
      return state.blogFormState
    },

    // 获取博文分组数量
    getGroupCount (state) {
      return state.group.length
    }
  },

  // set，不能异步，其实也不是不可以。
  mutations: {
    // 添加、修改博文
    setBlog (state, blog) {
      state.blogList.unshift(blog)
    },
    // 添加讨论
    setDiscuess (state, discuess) {
      state.discuessList.push(discuess)
    },
    // 设置博文表单的开关
    setBlogFormIsOpen (state, bool) {
      state.blogFormState.isOpen = bool
    },
    // 设置博文表单的编辑状态
    setBlogFormEditState (state, s) {
      state.blogFormState.blogId = s.blogId
      state.blogFormState.editState = s.editState
      if (s.editState === 'update') {
        // 加载对应的博文
        getObject('blog', state.blogFormState.blogId).then((data) => {
          state.blog.id = data.id
          state.blog.title = data.title
          state.blog.groupId = data.groupId
          state.blog.introduction = data.introduction
          state.blog.concent = data.concent
        })
      }
    },
    // 博文列表的分页
    pageBlogList (state, pageInfo) {
      const wz = (pageInfo.current - 1) * pageInfo.pageSize
      getObjectByStore('blog', pageInfo.pageSize, wz).then((data) => {
        state.blogList.length = 0
        data.forEach(element => {
          state.blogList.push(element)
        })
      })
    },
    // 测试
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
    // 获取当前博文内容
    getCurrentBlog (state, s) {
      state.blogFormState.blogId = s.blogId
      state.blogFormState.editState = s.editState
      const promise = new Promise((resolve, reject) => {
        // 加载对应的博文
        getObject('blog', state.blogFormState.blogId).then((data) => {
          state.blog.id = data.id
          state.blog.title = data.title
          state.blog.groupId = data.groupId
          state.blog.introduction = data.introduction
          state.blog.concent = data.concent
          resolve(data)
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
