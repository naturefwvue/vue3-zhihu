
import { config } from './indexedDB.config.js'

export function myIndexedDB () {
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

  /**
  * 打开indexedDb数据库
  */
  const dbOpen = (dbName, version) => {
    // 创建数据库，并且打开
    const name = config.dbName || dbName
    const ver = config.ver || version
    const dbRequest = myDB.open(name, ver)
    // 记录数据库是否变更
    let isChange = false
    /* 该域中的数据库myIndex */
    console.log('dbRequest - 打开indexedDb数据库：', dbRequest)

    // 数据库的 prpmise
    const dbPromise = new Promise((resolve, reject) => {
      // 数据库打开成功的回调
      dbRequest.onsuccess = function (event) {
        // db = event.target.result
        // 数据库成功打开后，记录数据库对象
        db = dbRequest.result
        if (isChange) { // 如果变更，则设置初始数据
          setup().then(() => {
            resolve(db)
          })
        } else {
          resolve(db)
        }
      }

      dbRequest.onerror = function (event) {
        reject(event) // 返回参数
      }
    })

    // 创建表
    // 第一次打开成功后或者版本有变化自动执行以下事件：一般用于初始化数据库。
    dbRequest.onupgradeneeded = function (event) {
      isChange = true
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
    }

    // 返回 Promise 实例 —— 打开Indexed库
    return dbPromise
  }

  /**
  * 添加初始数据
  */
  const setup = () => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      const arrStore = []
      // 遍历，获取表名集合
      for (const key in config.objects) {
        arrStore.push(key)
      }
      console.log('arrStore', arrStore)
      const tranRequest = db.transaction(arrStore, 'readwrite')

      // 遍历，添加数据（对象）
      for (const key in config.objects) {
        const objectArror = config.objects[key]
        console.log('objectArror', objectArror)
        const store = tranRequest.objectStore(key)
        // 清空数据
        store.clear().onsuccess = (event) => {
          // 遍历添加数据
          for (let i = 0; i < objectArror.length; i++) {
            store
              .add(objectArror[i])
              .onsuccess = (event) => {
                console.log(`添加成功！key:${key}-i:${i}`)
              }
          }
        }
      }

      // 遍历后统一返回
      tranRequest.oncomplete = (event) => {
        // tranRequest.commit()
        console.log('oncomplete')
        resolve()
      }
      tranRequest.onerror = function (event) {
        reject(event)
      }
    })
    return objectPromise
  }

  /**
  * 添加对象。objectName：对象库名；object：要添加的对象
  */
  const addObject = (objectName, object) => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _addObject = () => {
        const tranRequest = db.transaction(objectName, 'readwrite')
        tranRequest
          .objectStore(objectName)
          .add(object)
          .onsuccess = (event) => {
            resolve(event.target.result) // 返回对象的ID
          }
        //
        tranRequest.oncomplete = (event) => {
          console.log('addObject -- oncomplete')
          // tranRequest.commit()
          resolve()
        }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }

      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _addObject()
        })
      } else {
        _addObject()
      }
    })
    return objectPromise
  }

  /**
  * 修改对象
  */
  const updateObject = (objectName, object) => {
    const objectPromise = new Promise((resolve, reject) => {
      const tranRequest = db.transaction(objectName, 'readwrite')
      tranRequest
        .objectStore(objectName)
        .put(object)
        .onsuccess = (event) => {
          // tranRequest.commit()
          resolve(event.target.result)
        }
      tranRequest.onerror = function (event) {
        reject(event)
      }
    })
    return objectPromise
  }

  /**
  * 依据id删除对象
  */
  const deleteObject = (objectName, id) => {
    const objectPromise = new Promise((resolve, reject) => {
      const tranRequest = db.transaction(objectName, 'readwrite')
      tranRequest
        .objectStore(objectName)
        .delete(id)
        .onsuccess = (event) => {
          // tranRequest.commit()
          resolve(event.target.result)
        }
      tranRequest.onerror = function (event) {
        reject(event)
      }
    })
    return objectPromise
  }

  /**
  * 依据id 获取对象
  */
  const getObject = (objectName, id) => {
    const objectPromise = new Promise((resolve, reject) => {
      const _getObject = () => {
        const tranRequest = db.transaction(objectName, 'readonly')
        tranRequest
          .objectStore(objectName)
          .get(id)
          .onsuccess = (event) => {
            console.log('getObject -- onsuccess- event:', event)
            resolve(event.target.result)
          }

        tranRequest.oncomplete = (event) => {
          console.log('getObject -- oncomplete')
          // tranRequest.commit()
        }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _getObject()
        })
      } else {
        _getObject()
      }
    })

    return objectPromise
  }

  /**
  * 获取 对象仓库里的所有 对象，使用游标<br>
  * start 开始位置/r
  * count 获取数量，0表示获取全部\r
  */
  const getObjectByStore = (objectName, count, start, description) => {
    const _start = start || 0
    const _count = count || 0
    const _end = _start + _count
    const _description = description || 'prev' // 默认倒序
    console.log('getObjectByStore-db:', db)

    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _getObjectByStore = () => {
        const dataList = []
        let cursorIndex = 0

        console.log('getObjectByStore-db22:', db)
        const tranRequest = db.transaction(objectName, 'readonly')
        const cursorRequest = tranRequest
          .objectStore(objectName)
          .openCursor(null, _description)

        cursorRequest.onsuccess = (event) => {
          var cursor = event.target.result
          if (cursor) {
            if (_end === 0 || (cursorIndex >= _start && cursorIndex < _end)) {
              dataList.push(cursor.value)
            }
            cursorIndex++
            cursor.continue()
          } else {
            // resolve([])
          }
        }

        tranRequest.oncomplete = (event) => {
          console.log('getObjectByStore -- oncomplete')
          // tranRequest.commit()
          resolve(dataList)
        }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }

      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _getObjectByStore()
        })
      } else {
        _getObjectByStore()
      }
    })
    return objectPromise
  }

  /**
  * 依据 索引 获取对象，只返回第一条
  */
  const getObjectByIndex = (objectName, indexName, value) => {
    const objectPromise = new Promise((resolve, reject) => {
      const _getObjectByIndex = () => {
        const tranRequest = db.transaction(objectName, 'readonly')
        tranRequest
          .objectStore(objectName)
          .index(indexName)
          .get(value).onsuccess = (event) => {
            // tranRequest.commit()
            resolve(event.target.result)
          }

        tranRequest.oncomplete = (event) => {
          // note.innerHTML += '<li>Transaction completed.</li>';
        }

        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _getObjectByIndex()
        })
      } else {
        _getObjectByIndex()
      }
    })
    return objectPromise
  }

  /**
  * 依据 索引 + 游标 获取对象，可以获取多条
  */
  const findObjectByIndex = (objectName, indexName, id, count, start, description) => {
    const _start = start || 0
    const _count = count || 0
    const _end = _start + _count
    const _description = description || IDBCursor.prev // 默认倒序

    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _findObjectByIndex = () => {
        const dataList = []
        let cursorIndex = 0
        const tranRequest = db.transaction(objectName, 'readonly')
        const cursorRequest = tranRequest
          .objectStore(objectName)
          .index(indexName)
          .openCursor(null, _description)

        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result
          if (cursor) {
            if (_end === 0 || (cursorIndex >= _start && cursorIndex < _end)) {
              dataList.push(cursor.value)
            }
            cursorIndex++
            cursor.continue()
          }
          // tranRequest.commit()
        }

        tranRequest.oncomplete = (event) => {
          console.log('findObjectByIndex - dataList', dataList)
          resolve(dataList)
        }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }

      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _findObjectByIndex()
        })
      } else {
        _findObjectByIndex()
      }
    })
    return objectPromise
  }
  // 清空store里的所有对象
  // 删除整个store
  // 删除数据库

  return {
    dbOpen, // 打开数据库的Promise
    setup, // 设置默认对象
    addObject, // 添加对象的Promise
    updateObject, // 修改对象的Promise
    deleteObject, // 删除对象的Promise
    getObject, // 获取对象的Promise
    getObjectByStore, // 获取表里的全部数据
    getObjectByIndex, // 通过索引获取对象的Promise
    findObjectByIndex
  }
}
