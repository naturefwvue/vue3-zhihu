import { reactive } from 'vue'
import { createStore } from 'vuex'
import { myIndexedDB } from './indexedDB.js'

// 访问 IndexedDB 数据库
const {
  addObject,
  getObject,
  updateObject,
  getObjectByStore,
  findObjectByIndex
} = myIndexedDB()

export default createStore({
  state: {
    groupList: reactive([]), // 博文分组列表
    blogList: reactive([]), // 当前分页的博文列表
    discuessList: reactive([]), // 当前博文的讨论列表
    blogConfig: reactive({
      query: {
        key: '', // 没有设置查询条件
        groupId: 0 // 不按照分组查询
      },
      currentPage: 0,
      allCount: 100,
      pageSize: 5
    }),
    blogFormState: reactive({
      isOpen: false, // 是否显示添加、修改博文的表单 isOpenBlogForm
      editState: 'add', // add 添加新博文；update：修改博文；end：完毕
      blogId: 1 // 当前博文的ID
    })
  },
  // get
  getters: {
    // 获取博文分组列表
    // 检查state里有没有，没有加载，有的话直接返回
    getGroupList: (state) => {
      if (state.groupList.length === 0) {
        getObjectByStore('group').then((data) => {
          if (state.groupList.length === 0) {
            data.forEach(element => {
              state.groupList.push(element)
            })
          }
        })
      }
      return state.groupList
    },

    // 获取第一页的博文列表
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

    // 获取博文表单的状态
    getBlogFormState (state) {
      return state.blogFormState
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
    // 关闭表单
    setBlogFormIsOpen (state) {
      state.blogFormState.isOpen = false
    },
    // 设置博文表单的编辑状态
    setBlogFormEditState (state, s) {
      state.blogFormState.blogId = s.blogId
      state.blogFormState.editState = s.editState
      state.blogFormState.isOpen = s.isOpen
    },
    // 博文列表的分页
    pageBlogList (state, pageInfo) {
      /* 判断分页方式
      * 全blog 分页：查询、不查询
      * 分组分页：查询、不查询
      */
      const wz = (pageInfo.current - 1) * pageInfo.pageSize
      getObjectByStore('blog', pageInfo.pageSize, wz).then((data) => {
        state.blogList.length = 0
        data.forEach(element => {
          state.blogList.push(element)
        })
      })
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
    // 修改一个博文
    updateBlog (state, blog) {
      // 提交给vuex
      this.commit('setBlog', blog)
      const promise = new Promise((resolve, reject) => {
        // 提交给后端
        // 提交给前端存储
        updateObject('blog', blog).then((id) => {
          console.log(id)
          resolve(id)
        })
      })
      return promise
    },
    // 获取当前博文内容，用于博文表单
    getCurrentBlog (state) {
      // state.blogFormState.blogId = s.blogId
      // state.blogFormState.editState = s.editState
      const promise = new Promise((resolve, reject) => {
        // 加载对应的博文
        console.log('blogFormState -- ', this.state.blogFormState)
        getObject('blog', this.state.blogFormState.blogId).then((data) => {
          resolve(data)
        })
      })
      return promise
    },
    // 获取指定的博文内容，用于显示博文内容
    getBlogInfo (state, blogId) {
      const promise = new Promise((resolve, reject) => {
        // 加载对应的博文
        console.log('getBlogInfo -- ', blogId)
        getObject('blog', blogId).then((data) => {
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
