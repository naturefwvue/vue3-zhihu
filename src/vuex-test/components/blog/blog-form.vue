<!--博文表单-->
<template>
  <span @click="showForm" style="cursor: pointer;">写博客</span>
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
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入简介"
          v-model:value="blogForm.introduction"/>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4">内容：</a-col>
      <a-col :span="14">
        <a-textarea
          :autosize="{ minRows: 10, maxRows: 40}"
          placeholder="请输入内容"
          v-model:value="blogForm.concent"/>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="20"><input type="button" value="确定" @click="handleOk"></a-col>
    </a-row>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { myIndexedDB } from '../../store/indexedDB.js'

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
    const { getObjectByStore, addObject } = myIndexedDB()
    // 获取分组对象
    const groupList = ref({})
    getObjectByStore('group').then((data) => {
      groupList.value = data
    })
    // 获取博文信息，用于绑定表单
    // 添加博文
    const handleOk = (e) => {
      confirmLoading.value = true
      addObject(blogForm).then(() => {
        confirmLoading.value = false
        // ctx.emit('update:isShow', false)
        ctx.emit('submitblog', blogForm)
      })
    }
    // 提交状态
    const confirmLoading = ref(false)

    // 显示表单
    const showForm = () => {
    }

    const handleCancel = () => {
      alert('取消')
      ctx.emit('update:isShow', false)
    }

    return {
      groupList, // 分组列表
      confirmLoading,
      showForm,
      handleOk,
      handleCancel,
      blogForm
    }
  }

}
</script>
