<!--博文表单-->
<template>
  <span @click="showForm" style="cursor: pointer;">写博客{{isShow}}</span>
  <a-modal
    title="添加博文"
    :visible="isShow"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
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
import { reactive, ref, toRefs } from 'vue'
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
    isShow: Boolean,
    blog: Object,
    groupList: Array
  },
  setup (props, ctx) {
    console.log(props.groupList)
    const aa = toRefs(props)
    console.log('aa:', aa)
    // aa.groupList.value[0].label = 'wwww22'

    const bb = ref(props.blog)
    // bb.value.groupList[0].label = 'ssss'
    // alert(bb.value.groupList[0].label)

    const { title } = blogForm
    console.log('blog:', title)

    vueLife('blog-form')

    // 提交状态
    const confirmLoading = ref(false)

    // 显示表单
    const showForm = () => {
    }

    const handleCancel = () => {
      alert('取消')
      ctx.emit('update:isShow', false)
    }

    // 提交表单
    const handleOk = (e) => {
      confirmLoading.value = true
      setTimeout(() => {
        confirmLoading.value = false
        console.log('blogForm:', blogForm)
        ctx.emit('update:isShow', false)
        ctx.emit('submitblog', blogForm)
      }, 500)
    }

    return {
      aa,
      bb,
      title,
      confirmLoading,
      showForm,
      handleOk,
      handleCancel,
      blogForm
    }
  }

}
</script>
