<template>
  <div class="home">
    sessionStorage 的尝试 <br>
    {{test}}<br>
    <input type="button" @click="setItem('aaa')" value="设置 name 的值"> <br>
    <input type="button" @click="setItem('bbb')" value="修改 name 的值"> <br>
    <input type="button" @click="getItem" value="读取 name 的值"> <br>
    <input type="button" @click="setObject" value="设置对象"> <br>
    <input type="button" @click="getObject" value="读取对象"> <br><br>
    <input type="button" @click="delItem" value="删除项"> <br>
    <input type="button" @click="delAll" value="全都删除"> <br>

  </div>
</template>

<script>
import { ref } from 'vue'
// @ is an alias to /src

export default {
  name: 'sessionStorage',
  components: {
  },
  setup (props, ctx) {
    const test = ref('') // 显示值

    test.value = sessionStorage.getItem('name')
    console.log(test)
    const setItem = (msg) => {
      sessionStorage.setItem('name', msg)
    }
    const getItem = () => {
      test.value = sessionStorage.getItem('name')
    }
    const setObject = (msg) => {
      const person = {
        name: 'jyk',
        age: 14
      }
      sessionStorage.setItem('name', JSON.stringify(person))
    }
    const getObject = () => {
      test.value = JSON.parse(sessionStorage.getItem('name'))
      console.log(test)
    }

    const delItem = () => {
      sessionStorage.removeItem('name')
    }
    const delAll = () => {
      sessionStorage.clear()
    }
    return {
      test,
      setObject,
      getObject,
      setItem,
      getItem,
      delItem,
      delAll
    }
  }

}
</script>
