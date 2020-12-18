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
import { reactive } from 'vue'
// 添加讨论
import { vueLife } from '../views/js/vue-life.js'

export default {
  name: 'discuess-form',
  props: {
  },
  setup (props, ctx) {
    vueLife('discuess-form')
    const discussForm = reactive({
      nick: 'jyk',
      concent: '这是一个讨论'
    })

    const submit = () => {
      ctx.emit('submit', discussForm)
    }

    return {
      discussForm,
      submit
    }
  }

}
</script>
