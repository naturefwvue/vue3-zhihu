import { reactive } from 'vue'

// 博文的存储库，
// 保存博文和讨论的数据
// 博文的添加、修改、删除、查询，点赞、人气+1
// 讨论的添加、删除，点赞
export function BlogManage () {
  const groupStore = reactive(
    [
      {
        value: 1,
        label: 'Vue',
        introduction: 'Vue'
      },
      {
        value: 2,
        label: 'React',
        introduction: 'React'
      },
      {
        value: 3,
        label: 'Angular',
        introduction: 'Angular'
      },
      {
        value: 4,
        label: 'Node',
        introduction: 'Node'
      }
    ])

  // 存储博文的仓库
  const blogStore = {
    b0: {
      blog: {
        id: 0,
        group: 1,
        title: '这是一个博客',
        addTime: '2020-10-15',
        introduction: '这是博客简介',
        concent: '这是博客的详细内容<br>第二行',
        viewCount: 1,
        agreeCount: 1
      },
      discuess: {
        d0: {
          id: 0,
          nick: 'jyk',
          addTime: '2020-12-16',
          concent: '讨论一下',
          agreeCount: 0
        }
      }
    }
  }

  // 获取分组列表
  const getGroupList = () => {
    // 外部不应该直接获取数据，应该通过方法获取
    return groupStore
  }

  // 获取博文列表
  const getBlogList = () => {
    // 暂时不考虑分页的问题
    const list = []
    for (const key in blogStore) {
      const blogs = blogStore[key].blog
      list.push({
        id: blogs.id,
        group: blogs.group,
        title: blogs.title,
        addTime: blogs.addTime,
        introduction: blogs.introduction,
        viewCount: blogs.viewCount,
        agreeCount: blogs.agreeCount
      })
    }
    return list
  }

  // 查询博文列表
  const findBlogList = (query) => {
    const list = []
    if (typeof query.group !== 'undefined') {
      // 按照分组查询
      for (const key in blogStore) {
        const b = blogStore[key].blog
        if (b.group === query.group) {
          list.push(b)
        }
      }
    } else {
      if (typeof query.key !== 'undefined') {
        // 按照标题 || 内容查询
        for (const key in blogStore) {
          const b = blogStore[key].blog
          if (b.title.indexOf(query.key) > -1 || b.concent.indexOf(query.key) > -1) {
            list.push(b)
          }
        }
      }
    }
    return list
  }

  // 获取博文内容
  const getBlogInfo = (id) => {
    const blog = blogStore['b' + id].blog
    return blog
  }

  // 添加新博文
  const addNewBlog = (blog) => {
    //
    const myDate = new Date()
    const newBlog = {
      id: myDate.getTime(), // 获取当前时间，毫秒，暂时表示ID
      group: blog.group,
      title: blog.title,
      addTime: `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`,
      introduction: blog.introduction,
      concent: blog.concent,
      viewCount: 0,
      agreeCount: 0
    }
    blogStore['b' + newBlog.id] = {
      blog: newBlog,
      discuess: {}
    }
    console.log(blogStore)
  }

  // 修改博文
  const updateBlog = (blog) => {
    //
    const b = blogStore['b' + blog.id].blog
    b.group = blog.group
    b.title = blog.title
    b.introduction = blog.introduction
    b.concent = blog.concent
  }

  // 博文点赞
  const blogAgreeCount = (id, count) => {
    blogStore['b' + id].blog.agreeCount += count
  }

  // 博文访问 +1
  const blogviewCount = (id) => {
    blogStore['b' + id].blog.viewCount += 1
  }
  // 讨论点赞
  // 删除博文和讨论
  const delBlog = (blogId) => {
    delete blogStore['b' + blogId]
  }

  // 获取讨论列表
  const getDiscussList = (blogId) => {
    const list = []
    const discuessList = blogStore['b' + blogId].discuess
    for (const key in discuessList) {
      const d = discuessList[key]
      list.push(
        {
          id: d.id,
          nick: d.nick,
          addTime: d.addTime,
          concent: d.concent,
          agreeCount: d.agreeCount
        }
      )
    }
    return list
  }

  // 添加新的讨论
  const addNewDiscuss = (blogId, discuss) => {
    const myDate = new Date()
    const newDiscuss = {
      id: myDate.getTime(), // 获取当前时间，毫秒，暂时表示ID
      nick: discuss.nick,
      addTime: `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`,
      concent: discuss.concent,
      agreeCount: 0
    }
    console.log(blogStore['b' + blogId])
    blogStore['b' + blogId].discuess['d' + newDiscuss.id] = newDiscuss
  }

  // 删除讨论
  const delDiscuss = (blogId, discussId) => {
    delete blogStore['b' + blogId].discuess['d' + discussId]
  }

  return {
    getGroupList, // 获取博文分组列表
    getBlogList, // 获取博文列表
    findBlogList, // 查询博文列表
    getBlogInfo, // 获取博文内容
    getDiscussList, // 获取博文的讨论列表
    addNewDiscuss, // 添加讨论
    delDiscuss, // 删除讨论
    addNewBlog, // 添加博文
    updateBlog, // 修改博文
    blogAgreeCount, // 点赞 +1
    blogviewCount, // 人气 +1
    delBlog // 删除博文
  }
}
