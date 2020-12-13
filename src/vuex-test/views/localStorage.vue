<template>
  <div class="home">
    localStorage 的尝试 <br>
    {{test}}<br>
    {{test.age}}<br>
    <input type="button" @click="setItem1('aaa')" value="设置 name 的值"> <br>
    <input type="button" @click="getItem1" value="读取 name 的值"> <br>
    <input type="button" @click="setItem('title',new Date())" value="修改 name 的值"> <br>
    <input type="button" @click="getItem('title')" value="读取 name 的值"> <br>
    <input type="button" @click="setObject" value="设置对象"> <br>
    <input type="button" @click="getObject" value="读取对象"> <br><br>
    <input type="button" @click="delItem" value="删除项"> <br>
    <input type="button" @click="delAll" value="全都删除"> <br>

  </div>
</template>

<script>
import { ref } from 'vue'
// @ is an alias to /src

const manageStorage = (type) => {
  // type --- local:localStorage;session:sessionStorage
  if (typeof type === 'undefined' || type === '') { type = 'local' }
  // 设置
  const setItem = (key, value) => {
    let v = value
    // 记录value的类型
    const valueType = typeof value
    // 依据类型做序列化
    switch (valueType) {
      case 'object': // 包含数组
        v = JSON.stringify(value)
        break
    }

    // 把数据和数据类型绑定，一起保存
    const object = {
      valueType: valueType,
      value: v
    }
    v = JSON.stringify(object)
    if (type === 'local') {
      localStorage.setItem(key, v)
    } else {
      sessionStorage.setItem(key, v)
    }
  }

  // 获取
  const getItem = (key) => {
    let str = ''
    // 判断存储方式
    if (type === 'local') {
      str = localStorage.getItem(key)
    } else {
      str = localStorage.getItem(key)
    }
    // 把存储的数据转换为对象
    const object = JSON.parse(str)
    let value = object.value
    // 判断存储之前的类型，做转换
    switch (object.valueType) {
      case 'object':
        value = JSON.parse(object.value)
        break
    }
    console.log(value)
    return value
  }

  return {
    setItem,
    getItem
  }
}

export default {
  name: 'localStorage',
  components: {
  },
  setup (props, ctx) {
    const test = ref('') // 显示值
    const { setItem, getItem } = manageStorage()

    test.value = localStorage.getItem('name')

    const setItem1 = (msg) => {
      localStorage.setItem('name', [2, 3, 4, 5])
    }
    const getItem1 = () => {
      test.value = localStorage.getItem('name')
    }
    const setObject = (msg) => {
      const person = {
        name: 'jyk',
        arr: [1, 2, 3],
        age: 14
      }
      console.log('person', typeof person)
      localStorage.setItem('name', JSON.stringify(person))
    }
    const getObject = () => {
      test.value = JSON.parse(localStorage.getItem('name'))
    }

    const delItem = () => {
      localStorage.removeItem('name')
    }
    const delAll = () => {
      localStorage.clear()
    }
    return {
      test,
      setItem,
      setObject,
      getObject,
      setItem1,
      getItem1,
      getItem,
      delItem,
      delAll
    }
  }

}
</script>
