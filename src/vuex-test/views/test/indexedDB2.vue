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

  let db // 内部保存的 indexed数据库

  // 打开indexedDb数据库
  const dbOpen = (dbName, version) => {
    // 创建数据库，并且打开
    const name = config.dbName || dbName
    const ver = config.ver || version
    const dbRequest = window.indexedDB.open(name, ver)
    /* 该域中的数据库myIndex */
    console.log('dbRequest - 打开indexedDb数据库：', dbRequest)

    // 数据库的 prpmise
    const dbPromise = new Promise((resolve, reject) => {
      // resolve,reject是形式参数，可以是任意写法，如(res, rej)
      // 默认第一个参数实现的是resolve功能
      // 第二个参数实现的是reject功能。
      console.log('创建 dbPromise 实例')

      /**
       * 数据库打开成功的回调
       */
      dbRequest.onsuccess = function (event) {
        // db = event.target.result
        db = dbRequest.result /* 数据库成功打开后，记录数据库对象 */
        console.log('db - onsuccess：', db, event)
        resolve(db)
      }

      dbRequest.onerror = function (event) {
        console.log('open database error')
        reject(event) // 返回参数
      }
    })

    /**
     * 创建表
     * 第一次打开成功后或者版本有变化自动执行以下事件：一般用于初始化数据库。
     */
    dbRequest.onupgradeneeded = function (event) {
      const db = event.target.result /* 数据库对象 */
      // 建立对象表
      for (let i = 0; i < config.objectStores.length; i++) {
        const object = config.objectStores[i]
        console.log('onupgradeneeded - for - object', object)
        // 验证有没有，没有的话建立一个对象表
        if (!db.objectStoreNames.contains(object.objectStoreName)) {
          const objectStore = db.createObjectStore(object.objectStoreName, { keyPath: 'id' }) /* 创建person仓库(表) 主键 */
          // objectStore = db.createObjectStore('person',{autoIncrement:true});/*自动创建主键*/
          // 建立索引
          for (let i = 0; i < object.index.length; i++) {
            const index = object.index[i]
            objectStore.createIndex(index.name, index.name, { unique: index.unique })
          }
          console.log('onupgradeneeded - 建立了一个新的对象表：', objectStore)
        }
      }
      console.log('onupgradeneeded - event', event)
      console.log('onupgradeneeded - db', db)
    }

    // 返回 Promise 实例 —— 打开Indexed库
    return dbPromise
  }

  // 添加对象
  const addObject = (objectName, object) => {
    alert('内部准备添加数据')
    const objectPromise = new Promise((resolve, reject) => {
      console.log('addObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('addObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('addObject - 内部的store：', store)

      const storeRequest = store.add(object)
      console.log('addObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('addObject - 内部的数据写入成功：', event.target.result)
        tranRequest.commit()
        resolve(event)
      }
      storeRequest.onerror = function (event) {
        console.log('addObject - 内部的数据写入失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('addObject - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
  }

  // 修改对象
  const updateObject = (objectName, object) => {
    alert('内部准备修改数据')
    const objectPromise = new Promise((resolve, reject) => {
      console.log('updateObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('updateObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('updateObject - 内部的store：', store)

      const storeRequest = store.put(object)
      console.log('updateObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('updateObject - 内部的数据修改成功：', event.target.result)
        tranRequest.commit()
        resolve(event)
      }
      storeRequest.onerror = function (event) {
        console.log('updateObject - 内部的数据修改失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('updateObject - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
  }

  // 依据id删除对象
  const deleteObject = (objectName, id) => {
    alert('内部准备删除数据')
    const objectPromise = new Promise((resolve, reject) => {
      console.log('deleteObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('deleteObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('deleteObject - 内部的store：', store)

      const storeRequest = store.delete(id)
      console.log('deleteObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('deleteObject - 内部的数据删除成功：', event.target.result)
        tranRequest.commit()
        resolve(event)
      }
      storeRequest.onerror = function (event) {
        console.log('deleteObject - 内部的数据删除失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('deleteObject - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
  }

  // 依据id 获取对象
  const getObject = (objectName, id) => {
    alert('内部准备获取数据')
    const objectPromise = new Promise((resolve, reject) => {
      console.log('getObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('getObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('getObject - 内部的store：', store)

      const storeRequest = store.get(id)
      console.log('getObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('getObject - 内部的数据获取成功：', event.target.result)
        tranRequest.commit()
        resolve(tranRequest.result)
      }
      storeRequest.onerror = function (event) {
        console.log('getObject - 内部的数据获取失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('getObject - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
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

  return {
    dbOpen, // 打开数据库的Promise
    addObject, // 添加对象的Promise
    updateObject, // 修改对象的Promise
    deleteObject, // 删除对象的Promise
    getObject, // 获取对象的Promise
    readAll
  }
}

const config = {
  dbName: 'dbTest',
  ver: 3,
  objectStores: [
    {
      objectStoreName: 'blog',
      index: [
        {
          name: 'groupId',
          unique: false
        }
      ]
    },
    {
      objectStoreName: 'discuss',
      index: [
        {
          name: 'blogId',
          unique: false
        }
      ]
    }
  ]
}

export default {
  name: 'indexedDB',
  components: {
  },
  setup (props, ctx) {
    const { dbOpen, addObject } = indexedDBManage(config)

    const addPerson = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以添加数据了
        const blog = {
          id: new Date().valueOf(),
          title: '新的博客',
          groupId: 2,
          msg: '博客内容'
        }
        addObject('blog', blog).then((data) => {
          alert('添加数据成功')
        },
        (msg) => {
          alert(msg)
        })
      })
    }
    return {
      addPerson
    }
  }

}
</script>
