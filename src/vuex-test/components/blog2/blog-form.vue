<!--博文表单-->
<template>
  <a-modal
    v-model:visible="blogFormState.isOpen"
    :title="formTitle"
    :mask="false"
    @ok="handleOk"
    @cancel="handleCancel">
      <a-row>
        <a-col :span="4">标题：</a-col>
        <a-col :span="14">
          <a-input style="width: 300px;"
            name="name"
            v-model:value="blogForm.title"
            placeholder="请输入标题"></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">分组：</a-col>
        <a-col :span="14">
          <a-select v-model:value="blogForm.groupId" placeholder="请选择">
              <a-select-option
                v-for="(item, index) in groupList"
                :key="index"
                :value="item.value">
                {{item.label}}
              </a-select-option>
            </a-select>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">简介：</a-col>
        <a-col :span="14">
          <a-textarea
            :autoSize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入简介"
            v-model:value="blogForm.introduction"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">内容：</a-col>
        <a-col :span="14">
          <a-textarea
            :autoSize="{ minRows: 10, maxRows: 40}"
            placeholder="请输入内容"
            v-model:value="blogForm.concent"/>
        </a-col>
      </a-row>
  </a-modal>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import mapBlogAction from '../../store/myMap.js'

// 博文表单
const blogForm = reactive(
  {
    id: 1,
    title: '这是一个博客',
    groupId: null,
    introduction: '这是博客的简介',
    concent: '这是博客的详细内容<br>第二行'
  }
)

export default {
  name: 'blog-form',
  props: {
    blog: Object
  },
  setup (props, ctx) {
    const {
      getBlogFormState,
      closeBlogForm,
      getGroupList,
      addBlog,
      updateBlog,
      getBlog
    } = mapBlogAction()

    // 表单的标题
    const formTitle = ref('添加博文')

    // 表单的状态
    const blogFormState = getBlogFormState()

    // 获取分组列表，用于绑定表单
    const groupList = getGroupList()

    // 监控表单ID ，
    // 0，表示添加博文；
    // 其他，表示修改博文，获取当前博文内容，设置给表单
    watch(() => blogFormState.blogId, (v1, v2) => {
      switch (blogFormState.blogId) {
        case '0': // 添加，置空
        case 0:
          formTitle.value = '添加博文'
          console.log('blogForm', blogForm)
          blogForm.id = new Date().valueOf()
          blogForm.title = ''
          blogForm.groupId = null
          blogForm.introduction = ''
          blogForm.concent = ''
          break
        default: // 修改 获取博文内容
          formTitle.value = '修改博文'
          getBlog().then((blog) => {
            blogForm.id = blog.id
            blogForm.title = blog.title
            blogForm.groupId = blog.groupId
            blogForm.concent = blog.concent
            blogForm.introduction = blog.introduction
          })
          break
      }
    })

    // 获取博文信息，用于绑定表单
    // 添加、修改博文
    const handleOk = (e) => {
      const key = 'blogFrom'
      switch (blogFormState.editState) {
        case 'add': // 添加
          message.loading({ content: '添加博文...', key })
          addBlog(blogForm).then((id) => {
            console.log(id)
            message.success({ content: '添加成功！', key, duration: 2 })
          })
          break
        case 'update': // 修改
          message.loading({ content: '修改博文...', key })
          updateBlog(blogForm).then((id) => {
            console.log(id)
            message.success({ content: '修改成功！', key, duration: 2 })
          })
          break
      }
    }

    const handleCancel = () => {
      // alert('取消')
      closeBlogForm()
    }

    return {
      formTitle, // 表单标题
      groupList, // 分组列表
      blogFormState,
      handleOk,
      handleCancel,
      blogForm
    }
  }

}
</script>
