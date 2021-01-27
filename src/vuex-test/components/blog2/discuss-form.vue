<!--讨论表单-->
<template>
  <a-card style="margin: 30px;padding: 10px; " >
      发讨论<br>
      昵称：<a-input style="width: 300px;"
              v-model:value="discussForm.nick"
              placeholder="请输入昵称"></a-input><br>
      内容：<a-textarea
              :autosize="{ minRows: 4, maxRows: 10}"
              placeholder="请输入内容："
              v-model:value="discussForm.concent"/><br>
      <a-button type="primary" @click="submit">提交讨论</a-button>
    </a-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import mapBlogAction from '../../store/myMap.js'

// 添加讨论的表单
const discussForm = reactive({
  blogId: 1,
  nick: 'jyk',
  concent: '这是一个讨论'
})

export default {
  name: 'discuess-form',
  props: {
    blogId: Number
  },
  setup (props, ctx) {
    const { addDiscuess } = mapBlogAction()

    // 获取博文ID
    const blogId = ref(props.blogId)
    // 设置讨论的实体类
    discussForm.blogId = parseInt(blogId.value)
    // 添加新的讨论
    const submit = () => {
      const key = 'discuess'
      message.loading({ content: '提交讨论...', key })
      addDiscuess(discussForm).then((id) => {
        console.log(id)
        message.success({ content: '提交成功！', key, duration: 2 })
      })
    }

    return {
      discussForm,
      submit
    }
  }

}
</script>
