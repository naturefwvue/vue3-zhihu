<template>
  <div class="home">
    indexedDB 的尝试 <br>
    blogList:<br>
    <div v-for="item in blogList" :key="item.id">
      {{item}}
    </div>

    blogId:{{blogId}}<br>
    blog:{{blog}}<br>
    id:<input type="text" v-model="blogId" ><br>
    title:<input type="text" v-model="blog.title" ><br>
    msg:<input type="text" v-model="blog.msg" ><br>

    <input type="button" @click="addBlog" value="添加数据"><br>
    <input type="button" @click="getBlog" value="获取数据"><br>
    <input type="button" @click="updateBlog" value="修改数据"><br>
    <input type="button" @click="deleteBlog" value="删除数据"><br>
    <input type="button" @click="getBlogByGroupId" value="通过索引获取数据"><br>
    <input type="button" @click="getBlogAll" value="获取博客列表"><br>

  </div>
</template>

<script>
import { ref, toRaw } from 'vue'
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
    const dbRequest = myDB.open(name, ver)
    /* 该域中的数据库myIndex */
    console.log('dbRequest - 打开indexedDb数据库：', dbRequest)

    // 数据库的 prpmise
    const dbPromise = new Promise((resolve, reject) => {
      // resolve,reject是形式参数，可以是任意写法，如(res, rej)
      // 默认第一个参数实现的是resolve功能
      // 第二个参数实现的是reject功能。

      /**
       * 数据库打开成功的回调
       */
      dbRequest.onsuccess = function (event) {
        // db = event.target.result
        db = dbRequest.result /* 数据库成功打开后，记录数据库对象 */
        console.log('db - onsuccess：db', db)
        console.log('db - onsuccess：event', event)
        resolve(db)
      }

      dbRequest.onerror = function (event) {
        console.log('open database error', event)
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
    // alert('内部准备添加数据')
    const objectPromise = new Promise((resolve, reject) => {
      console.log('addObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('addObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('addObject - 内部的store：', store)

      const storeRequest = store.add(object)
      console.log('addObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('addObject - 内部的数据写入成功：', event)
        tranRequest.commit()
        resolve(event.target.result)
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
    const objectPromise = new Promise((resolve, reject) => {
      console.log('updateObject - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('updateObject - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('updateObject - 内部的store：', store)

      const storeRequest = store.put(object)
      console.log('updateObject - 内部的storeRequest：', storeRequest)

      storeRequest.onsuccess = (event) => {
        console.log('updateObject - 内部的数据修改成功：', event)
        tranRequest.commit()
        resolve(event.target.result)
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
        console.log('deleteObject - 内部的数据删除成功：', event)
        tranRequest.commit()
        resolve(event.target.result)
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
        console.log('getObject - 内部的数据获取成功：', event)
        tranRequest.commit()
        resolve(event.target.result)
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

  // 获取 对象仓库里的所有 对象
  // start 开始位置
  // count 获取数量，0表示获取全部
  const getObjectByStore = (objectName, count, start) => {
    const _start = start || 0
    const _count = count || 0
    const _end = _start + _count

    const objectPromise = new Promise((resolve, reject) => {
      console.log('getObjectByStore - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('getObjectByStore - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('getObjectByStore - 内部的store：', store)

      const cursorRequest = store.openCursor()
      console.log('getObjectByStore - 内部的 cursorRequest', cursorRequest)

      const dataList = []
      let cursorIndex = 0
      cursorRequest.onsuccess = (event) => {
        // console.log('getObjectByStore -event', event)
        var cursor = event.target.result
        if (cursor) {
          console.log('getObjectByStore -cursor', cursor)
          if (_end === 0 || (cursorIndex >= _start && cursorIndex < _end)) {
            dataList.push(cursor.value)
          }
          cursorIndex++
          cursor.continue()
        } else {
          // resolve([])
        }
        // console.log('getObjectByStore - 内部的数据获取成功：', event)
        // tranRequest.commit()
      }

      tranRequest.oncomplete = (event) => {
        console.log('getObjectByStore - 内部的 oncomplete', event)
        // tranRequest.commit()
        resolve(dataList)
      }
      cursorRequest.onerror = function (event) {
        console.log('getObjectByStore - 内部的数据获取失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('getObjectByStore - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
  }

  // 依据 索引 获取对象，只返回第一条
  const getObjectByIndex = (objectName, indexName, value) => {
    const objectPromise = new Promise((resolve, reject) => {
      console.log('getObjectByIndex - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('getObjectByIndex - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('getObjectByIndex - 内部的store：', store)

      const indexRequest = store.index(indexName)
      console.log('getObjectByIndex - 内部的 indexRequest', indexRequest)

      indexRequest.get(value).onsuccess = (event) => {
        console.log('getObjectByIndex - 内部的数据获取成功：', event)
        // tranRequest.commit()
        resolve(event.target.result)
      }

      tranRequest.oncomplete = (event) => {
        console.log('getObjectByIndex - 内部的 oncomplete', event)
        // note.innerHTML += '<li>Transaction completed.</li>';
      }
      indexRequest.onerror = function (event) {
        console.log('getObjectByIndex - 内部的数据获取失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('getObjectByIndex - 事务失败', event)
        console.log(tranRequest.error)
        reject(event)
      }
    })
    return objectPromise
  }

  // 依据 索引 + 游标 获取对象，可以获取多条
  const findObjectByIndex = (objectName, indexName, id) => {
    const objectPromise = new Promise((resolve, reject) => {
      console.log('getObjectByIndex - 内部的db：', db)
      const tranRequest = db.transaction(objectName, 'readwrite')
      console.log('getObjectByIndex - 内部的tranRequest：', tranRequest)

      const store = tranRequest.objectStore(objectName)
      console.log('getObjectByIndex - 内部的store：', store)

      const indexRequest = store.index(indexName)
      console.log('getObjectByIndex - 内部的storeRequest：', indexRequest)

      const reData = []
      const cursorRequest = indexRequest.openCursor(null, IDBCursor.prev)

      cursorRequest.onsuccess = (event) => {
        console.log('getObjectByIndex - 内部的数据获取成功：', cursorRequest)
        const cursor = event.target.result
        console.log('getObjectByIndex - cursor.value：', cursor.value)
        if (cursor) {
          reData.push(cursor.value)
          console.log('cursor值：', cursor.value)
          cursor.continue()
        }
        // tranRequest.commit()
        resolve(event.target.result)
      }

      tranRequest.oncomplete = (event) => {
        console.log('reData', reData)
        // note.innerHTML += '<li>Transaction completed.</li>';
      }
      cursorRequest.onerror = function (event) {
        console.log('getObjectByIndex - 内部的数据获取失败', event)
        console.log(event.target.error)
        reject(event)
      }
      tranRequest.onerror = function (event) {
        console.log('getObjectByIndex - 事务失败', event)
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
    getObjectByStore, // 获取表里的全部数据
    getObjectByIndex, // 通过索引获取对象的Promise
    findObjectByIndex,
    readAll
  }
}

const config = {
  dbName: 'dbTest',
  ver: 4,
  objectStores: [ // 建库依据
    {
      objectStoreName: 'blog',
      index: [ // 索引
        {
          name: 'groupId',
          unique: false // 是否可以重复
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
    const {
      dbOpen,
      addObject,
      updateObject,
      deleteObject,
      getObject,
      getObjectByStore,
      getObjectByIndex
    } = indexedDBManage(config)

    // 修改数据用
    const blogId = ref(1609669985104)

    // 添加、修改用的表单
    const blog = ref({
      id: 1,
      groupId: 2,
      title: '新的博客',
      msg: '博客内容'
    })
    // 博文列表
    const blogList = ref([])

    // 添加数据的测试
    const addBlog = () => {
      console.log('wwwwwwwwwww', toRaw(blog.value))
      dbOpen().then((db) => {
        // 数据库打开成功，可以添加数据了
        blog.value.id = new Date().valueOf()
        addObject('blog', toRaw(blog.value)).then((newId) => {
          alert('添加数据成功', newId)
        },
        (msg) => {
          alert('添加数据失败')
          console.log(msg)
        })
      })
    }

    // 修改数据的测试
    const updateBlog = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以修改数据了
        blog.value.id = blogId.value
        updateObject('blog', toRaw(blog.value)).then((newId) => {
          alert('修改数据成功', newId)
        },
        (msg) => {
          alert('修改数据失败')
          console.log(msg)
        })
      })
    }

    // 删除数据的测试
    const deleteBlog = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以删除数据了
        deleteObject('blog', parseInt(blogId.value)).then((newId) => {
          alert('删除数据成功', newId)
        },
        (msg) => {
          alert('删除数据失败')
          console.log(msg)
        })
      })
    }

    // 获取一个数据的测试
    const getBlog = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以获取数据了
        getObject('blog', parseInt(blogId.value)).then((data) => {
          alert('获取数据成功', data)
          blog.value = data
        },
        (msg) => {
          alert('获取数据失败')
          console.log(msg)
        })
      })
    }

    // 通过索引 获取 数据的测试
    const getBlogByGroupId = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以获取数据了
        getObjectByIndex('blog', 'groupId', 2).then((data) => {
          alert('获取数据成功', data)
          blogList.value = data
        },
        (msg) => {
          alert('获取数据失败')
          console.log(msg)
        })
      })
    }

    // 通过索引 获取 数据的测试
    const getBlogAll = () => {
      dbOpen().then((db) => {
        // 数据库打开成功，可以获取数据了
        getObjectByStore('blog', 2, 3).then((data) => {
          alert('获取数据成功', data)
          blogList.value = data
        },
        (msg) => {
          alert('获取数据失败')
          console.log(msg)
        })
      })
    }
    return {
      blog,
      blogId,
      blogList,
      addBlog,
      updateBlog,
      getBlog,
      getBlogAll,
      getBlogByGroupId,
      deleteBlog
    }
  }

}
</script>
