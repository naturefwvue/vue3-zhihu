<template>
  <div class="home">
    localStorage 的尝试 <br>
    test:{{test}}<br>
    <input type="button" @click="setItem1('aaa')" value="设置 name 的值"> <br>
    <input type="button" @click="getItem1" value="读取 name 的值"> <br>
    <input type="button" @click="setItem('title',new Date())" value="修改 name 的值"> <br>
    <input type="button" @click="getItem('title')" value="读取 name 的值"> <br>
    <input type="button" @click="setObject" value="设置对象"> <br>
    <input type="button" @click="getObject" value="读取对象"> <br><br>
    <input type="button" @click="setAll" value="设置各种类型的数据"> <br>
    <input type="button" @click="getAll" value="获取各种类型的数据"> <br>
    <input type="button" @click="delItem('name')" value="删除项"> <br>
    <input type="button" @click="delAll" value="全都删除"> <br>

  </div>
</template>

<script>
import { ref } from 'vue'
// @ is an alias to /src

const manageStorage = (type) => {
  // type --- local:  localStorage;
  //          session:sessionStorage
  if (typeof type === 'undefined' || type === '') { type = 'local' }

  // 设置值
  const setItem = (key, value) => {
    let v = value
    // 记录value的类型，默认是对象/数组
    let valueType = typeof value
    // 依据类型做序列化
    switch (valueType) {
      case 'object':
        // 判断是不是日期类型
        if (value === null) {
          valueType = 'null'
          v = 'null'
        } else if (value instanceof Date) {
          // 保存数据的时间戳
          valueType = 'date'
          v = value.valueOf()
        } else {
          // 对象、数组
          v = JSON.stringify(value)
        }
        break
      case 'function':
        v = value.toString()
        break
      case 'undefined':
        valueType = 'undefined'
        v = 'undefined'
        break
    }

    // 把数据、数据类型和时间戳，一起保存
    const object = {
      valueType: valueType,
      time: new Date().valueOf(), // 时间戳，判断是否过期
      value: v
    }
    v = JSON.stringify(object)
    if (type === 'local') {
      localStorage.setItem(key, v)
    } else {
      sessionStorage.setItem(key, v)
    }
  }

  // 获取值
  const getItem = (key) => {
    let str = ''
    // 判断存储方式
    if (type === 'local') {
      str = localStorage.getItem(key)
    } else {
      str = sessionStorage.getItem(key)
    }
    // 判断是否为空
    if (typeof str === 'undefined' || str === null || str === '') {
      return str
    }

    // 判断格式是否符合，没有太好的办法，暂时先这样。
    if (str.indexOf('{"valueType":"') === -1) {
      return ''
    }
    console.log('-----------------------------------------')
    console.log('111存储的数据的类型：', typeof str)
    console.log('111存储的数据：', str)
    // 把存储的数据转换为对象
    const object = JSON.parse(str)
    // 取值
    let value = object.value
    // 判断存储之前的类型，做转换
    switch (object.valueType) {
      case 'object':// 对象和数组
        value = JSON.parse(value)
        break
      case 'function': // 不做转换
        // value = object.value
        break
      case 'date': // 日期的时间戳
        value = new Date(value)
        break
      case 'number': // 数字
        value = parseInt(value)
        break
      case 'null':
        value = null
        break
      case 'undefined':
        value = undefined
        break
    }
    console.log('存储的数据的类型：')
    console.log(object.valueType, typeof value)
    console.log(object.valueType, Object.prototype.toString.call(value))
    console.log('存储的数据：', value)
    return value
  }

  // removeItem
  const removeItem = (key) => {
    if (type === 'local') {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  }
  // clear
  const clear = (key) => {
    if (type === 'local') {
      localStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }
  return {
    setItem,
    getItem,
    removeItem,
    clear
  }
}

export default {
  name: 'localStorage',
  components: {
  },
  setup (props, ctx) {
    const test = ref('') // 显示值
    const { setItem, getItem, removeItem, clear } = manageStorage()

    // test.value = getItem('name')

    const setItem1 = (msg) => {
      setItem('name', [2, 3, 4, 5])
    }
    const getItem1 = () => {
      test.value = getItem('name')
    }
    const setObject = (msg) => {
      const person = {
        name: 'jyk',
        arr: [1, 2, 3],
        age: 14
      }
      console.log('person', typeof person)
      setItem('name', person)
    }
    const getObject = () => {
      test.value = getItem('name')
    }

    // 存入各种类型的数据
    const setAll = () => {
      setItem('string', 'string')
      setItem('number', 123)
      setItem('Date', new Date())
      console.log(typeof new Date())
      console.log(Object.prototype.toString.call(new Date()))
      console.log(new Date() instanceof Date)
      console.log(setObject instanceof Object)
      setItem('getTime', new Date().getTime())
      console.log(typeof new Date().getTime())
      setItem('valueOf', new Date().valueOf())
      console.log(typeof new Date().valueOf())
      setItem('bool', true)
      setItem('function', () => { alert('aa') })
      setItem('arror', [1, 2, 3])
      setItem('null', null)
      let aa
      setItem('undefined', aa)
    }

    // 获取各种类型的数据
    const getAll = () => {
      let aa = getItem('string')
      aa = getItem('number')
      aa = getItem('Date')
      aa = getItem('getTime')
      aa = getItem('valueOf')
      aa = getItem('bool')
      aa = getItem('function')
      aa = getItem('arror')
      aa = getItem('null')
      aa = getItem('undefined')
      console.log(aa)
    }

    const delItem = (key) => {
      removeItem(key)
    }
    const delAll = () => {
      clear()
    }
    return {
      test,
      setItem,
      setObject,
      getObject,
      setItem1,
      getItem1,
      getItem,
      setAll,
      getAll,
      delItem,
      delAll
    }
  }

}
</script>
