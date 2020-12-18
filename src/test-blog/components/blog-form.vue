<!--博文表单-->
<template>
  <span @click="showForm" style="cursor: pointer;">写博客</span>22{{groupList}}
  <a-modal
    title="添加博文"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <p>
      标题：<a-input style="width: 300px;"
              v-model:value="blogForm.title"
              placeholder="请输入标题"></a-input><br>
      分组：<a-select v-model:value="blogForm.group" placeholder="请选择">
              <a-select-option
                v-for="(item, index) in groupList"
                :key="index"
                :value="item.value">
                {{item.label}}
              </a-select-option>
            </a-select><br>
      简介：<br><a-textarea
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入简介"
                v-model:value="blogForm.introduction"/><br>
      内容：<br><a-textarea
              :autosize="{ minRows: 10, maxRows: 40}"
              placeholder="请输入内容"
              v-model:value="blogForm.concent"/>
              <br>
    </p>
  </a-modal>
</template>

<script>
// import { BellOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { vueLife } from '../views/js/vue-life.js'

// 博文表单
const blogForm = reactive(
  {
    title: '这是一个博客',
    group: null,
    introduction: '这是博客的简介',
    concent: '这是博客的详细内容<br>第二行'
  }
)

export default {
  name: 'blog-form',
  props: {
    blog: Object,
    groupList: Array
  },
  setup (props, ctx) {
    console.log(props.groupList)
    vueLife('blog-form')
    // 是否显示表单
    const visible = ref(false)
    // 提交状态
    const confirmLoading = ref(false)

    // 显示表单
    const showForm = () => {
      visible.value = true
    }

    // 提交表单
    const handleOk = (e) => {
      confirmLoading.value = true
      setTimeout(() => {
        visible.value = false
        confirmLoading.value = false
        console.log('blogForm:', blogForm)
        ctx.emit('submitblog', blogForm)
      }, 500)
    }

    return {
      visible,
      confirmLoading,
      showForm,
      handleOk,
      blogForm
    }
  }

}
</script>
