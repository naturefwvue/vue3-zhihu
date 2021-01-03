<template>
  <div class="home">
    sessionStorage 的尝试 <br>
    {{test}}<br>
    <input type="button" @click="setItem('aaa')" value="设置 name 的值"> <br>
    <input type="button" @click="setItem('bbb')" value="修改 name 的值"> <br>
    <input type="button" @click="getItem" value="读取 name 的值"> <br>
    <input type="button" @click="setObject" value="设置对象"> <br>
    <input type="button" @click="getObject" value="读取对象"> <br><br>
    <input type="button" @click="setAll" value="设置各种类型的数据"> <br>
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
    const test = ref('我是sessionStorage') // 显示值

    test.value = sessionStorage.getItem('name')
    console.log(test)

    // 保存
    const setItem = (msg) => {
      sessionStorage.setItem('name', msg)
    }

    // 取值
    const getItem = () => {
      test.value = sessionStorage.getItem('name')
    }

    // 设置对象
    const setObject = (msg) => {
      const person = {
        name: 'jyk',
        age: 14
      }
      sessionStorage.setItem('name', JSON.stringify(person))
    }
    // 获取对象
    const getObject = () => {
      test.value = JSON.parse(sessionStorage.getItem('name'))
      console.log(test)
    }

    // 存入各种类型的数据
    const setAll = () => {
      sessionStorage.setItem('string', 'string')
      sessionStorage.setItem('number', 123)
      sessionStorage.setItem('Date', new Date())
      console.log(typeof new Date())
      console.log(Object.prototype.toString.call(new Date()))
      console.log(new Date() instanceof Date)
      console.log(setObject instanceof Object)
      sessionStorage.setItem('getTime', new Date().getTime())
      console.log(typeof new Date().getTime())
      sessionStorage.setItem('valueOf', new Date().valueOf())
      console.log(typeof new Date().valueOf())
      sessionStorage.setItem('bool', true)
      sessionStorage.setItem('function', () => { alert('aa') })
      sessionStorage.setItem('arror', [1, 2, 3])
      sessionStorage.setItem('null', null)
      let aa
      sessionStorage.setItem('undefined', aa)
    }
    const delItem = () => {
      sessionStorage.removeItem('name')
      getItem()
    }
    const delAll = () => {
      sessionStorage.clear()
      getItem()
    }

    return {
      test,
      setObject,
      getObject,
      setItem,
      getItem,
      setAll,
      delItem,
      delAll
    }
  }

}
</script>
