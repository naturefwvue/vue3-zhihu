<template>
  <div class="home">
    indexedDB 的尝试 <br>

    <input type="button" @click="addPerson" value="添加人员">
    <input type="button" @click="update" value="读取sql">

  </div>
</template>

<script>
// indexedDB 的管理类
const indexedDBManage = (config) => {
  /**
  * config:
  *  dbName: 数据库名称，
  *  ver: 数据库版本号
  */

  /**
   * IndexedDB 数据库对象
   * 判断浏览器是否支持
   * */
  const myDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
  if (!myDB) {
    console.log('你的浏览器不支持IndexedDB')
  }
  let objectStore /* 仓库(表) */
  let db

  // 打开indexedDb数据库
  const dbOpen = (dbName, version) => {
    // 创建数据库，并且打开
    const name = config.dbName || dbName
    const ver = config.ver || version
    const dbRequest = window.indexedDB.open(name, ver)
    /* 该域中的数据库myIndex */
    console.log('dbRequest-open', dbRequest)

    // 数据库的 prpmise
    const dbPromise = new Promise((resolve, reject) => {
      // resolve,reject是形式参数，可以是任意写法，如(res, rej)
      // 默认第一个参数实现的是resolve功能
      // 第二个参数实现的是reject功能。
      console.log('myPost:')
      // resolve(）不同于return, resolve()执行完成后后面的代码还会执行。
      dbRequest.onerror = function (event) {
        console.log('open database error')
        resolve(event) // 返回参数
      }

      /**
       * 数据库打开成功的回调
       */
      dbRequest.onsuccess = function (event) {
        db = dbRequest.result /* 数据库成功打开后，记录数据库对象 */
        console.log('db', db, event)
        reject(db)
      }
    })

    /**
     * 创建表
     * 第一次打开成功后或者版本有变化自动执行以下事件：一般用于初始化数据库。
     */
    dbRequest.onupgradeneeded = function (event) {
      const db = event.target.result /* 数据库对象 */
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id' }) /* 创建person仓库(表) 主键 */
        // objectStore = db.createObjectStore('person',{autoIncrement:true});/*自动创建主键*/
        objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('email', 'email', { unique: true })
      }
      console.log('onupgradeneeded', db)
    }
    return dbPromise
  }

  /**
   * 插入数据
   */
  const add = () => {
    var tranRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })
    tranRequest.onsuccess = function (event) {
      console.log('数据写入成功')
    }
    tranRequest.onerror = function (event) {
      console.log('数据写入失败')
    }
  }
  /**
   * 读取数据
   */
  const read = () => {
    var transaction = db.transaction(['person'])
    var objectStore = transaction.objectStore('person')
    var tranRequest = objectStore.get(1)
    tranRequest.onerror = function (event) {
      console.log('事物失败')
    }
    tranRequest.onsuccess = function (event) {
      if (tranRequest.result) {
        console.log('Name' + tranRequest.result.name)
        console.log('Age' + tranRequest.result.age)
        console.log('Email' + tranRequest.result.email)
      } else {
        console.log('未获得数据记录')
      }
    }
  }

  /**
   * 遍历数据
   */
  const readAll = () => {
    var objectStore = db.transaction(['person']).objectStore('person')
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        console.log('Id:' + cursor.key)
        console.log('Name:' + cursor.value.name)
        console.log('Age:' + cursor.value.age)
        console.log('Email:' + cursor.value.email)
      } else {
        console.log('没有更多数据了')
      }
    }
  }

  /**
   * 更新数据
   */
  const update = () => {
    var tranRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .put({ id: 1, name: '李四2222', age: 35, email: 'lisi@example.com' })
    tranRequest.onsuccess = function (event) {
      console.log('数据更新成功')
    }
    tranRequest.onerror = function (event) {
      console.log('数据更新失败')
    }
  }

  /**
   * 删除数据
   */
  const remove = () => {
    var tranRequest = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(1)
    tranRequest.onsuccess = function (event) {
      console.log('数据删除成功')
    }
  }

  return {
    dbOpen, // 打开数据库的Promise
    add,
    read,
    readAll,
    update,
    remove
  }
}

export default {
  name: 'indexedDB',
  components: {
  },
  setup (props, ctx) {
    const config = {
      dbName: 'dbTest',
      ver: 1
    }
    const { dbOpen, add } = indexedDBManage(config)

    const addPerson = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以添加数据了
        add().then((data) => {

        })
      })
    }
    return {
      addPerson
    }
  }

}
</script>
