<!--博文表单-->
<template>{{blogFormState}}
  <a-modal
    v-model:visible="blogFormState.isOpen"
    title="添加博文"
    mask="false"
    @ok="handleOk"
    @cancel="handleCancel">
      <a-row>
        <a-col :span="4">标题：</a-col>
        <a-col :span="14">
          <a-input style="width: 300px;"
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
      <a-row>
        <a-col :span="20"><input type="button" value="确定" @click="handleOk"></a-col>
      </a-row>
  </a-modal>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'
import { onMounted, onUpdated, reactive, ref, watch } from 'vue'
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
      getBlog
    } = mapBlogAction()

    // 显示表单的状态
    const blogFormState = getBlogFormState()

    // 获取分组列表
    const groupList = getGroupList()

    // 获取博文内容
    const blogInfo = getBlog()
    console.log('blogInfo', blogInfo)
    onUpdated(() => { alert('onUpdated') })
    onMounted(() => { alert('onMounted') })

    alert(blogFormState.editState)
    watch(() => blogFormState.editState,
      (a, b) => {
        if (blogFormState.editState === 'update') {
          const blogInfo = getBlog()
          console.log('blogInfo', blogInfo)
          blogForm.title = blogInfo.title
          blogForm.groupId = blogInfo.groupId
          blogForm.introduction = blogInfo.introduction
          blogForm.concent = blogInfo.concent
          blogForm.id = blogInfo.id
        } else {
          blogForm.title = ''
          blogForm.groupId = null
          blogForm.introduction = ''
          blogForm.concent = ''
          blogForm.id = 0
        }
      }
    )

    // 提交状态
    const confirmLoading = ref(false)

    // 获取博文信息，用于绑定表单
    // 添加博文
    const handleOk = (e) => {
      confirmLoading.value = true
      blogForm.id = new Date().valueOf()
      addBlog(blogForm).then((id) => {
        console.log(id)
        confirmLoading.value = false
      })
    }

    const handleCancel = () => {
      // alert('取消')
      closeBlogForm()
    }

    return {
      groupList, // 分组列表
      confirmLoading,
      blogFormState,
      handleOk,
      handleCancel,
      blogForm
    }
  }

}
</script>
