import { reactive } from 'vue'

// 帖子列表的管理类
export function Blogs () {
  // alert('来了')
  const blogs = reactive({
    b0: {
      title: '这是帖子标题',
      content: '帖子内容',
      sendTime: '2020-10-20'
    }
  })
  // 依据页号加载帖子列表
  const addNewBlog = (id) => {
    // 调用axios 向后端提交
    alert('假装发表成功了。。。')
    blogs['b' + id] = {
      title: '这是帖子标题1',
      content: '帖子内容1',
      sendTime: '2020-10-21'
    }
  }
  return {
    blogs,
    addNewBlog
  }
}
