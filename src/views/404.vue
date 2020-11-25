<template>
  <div id="mainconect">
    没找到网页
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'

export default {
  name: 'page404',
  setup (props) {
    const val = ref('33')
    return {
      val
    }
  }
}
</script>
