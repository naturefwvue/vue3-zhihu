
import { isRef, isReactive, toRaw } from 'vue'
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
  * 打开indexedDb数据库。
  * dbName：数据库名称；
  * version：数据库版本。
  * 可以不传值。
  */
  const dbOpen = (dbName, version) => {
    // 创建数据库，并且打开
    const name = config.dbName || dbName
    const ver = config.ver || version
    const dbRequest = myDB.open(name, ver)
    // 记录数据库版本是否变更
    let isChange = false
    /* 该域中的数据库myIndex */
    console.log('dbRequest - 打开indexedDb数据库：', dbRequest)

    // 打开数据库的 prpmise
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
  * 设置初始数据
  */
  const setup = () => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      const arrStore = []
      // 遍历，获取表名集合
      for (const key in config.objects) {
        arrStore.push(key)
      }
      console.log('setup - arrStore', arrStore)
      const tranRequest = db.transaction(arrStore, 'readwrite')

      // 遍历，添加数据（对象）
      for (const key in config.objects) {
        const objectArror = config.objects[key]
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
        console.log('setup - oncomplete')
        resolve()
      }
      tranRequest.onerror = function (event) {
        reject(event)
      }
    })
    return objectPromise
  }

  /**
  * 把vue的ref对象、reactive对象转换成原始对象
  */
  const _vueToObject = (vueObject) => {
    let _object = vueObject
    if (isRef(_object)) {
      // 如果是 vue 的 ref 类型，替换成 ref.value
      _object = _object.value
    }
    if (isReactive(_object)) {
      // 如果是 vue 的 reactive 类型，那么获取原型，否则会报错
      _object = toRaw(_object)
    }
    return _object
  }

  /**
  * 添加对象。
  * objectName：对象库名；
  * object：要添加的对象
  */
  const addObject = (objectName, object) => {
    const _object = _vueToObject(object)
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _addObject = () => {
        const tranRequest = db.transaction(objectName, 'readwrite')
        tranRequest
          .objectStore(objectName) // 获取store
          .add(_object) // 添加对象
          .onsuccess = (event) => { // 成功后的回调
            resolve(event.target.result) // 返回对象的ID
          }
        // 事务完成
        tranRequest.oncomplete = (event) => {
          console.log('addObject -- oncomplete')
          // tranRequest.commit()
          // resolve()
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
  * 修改对象。
  * objectName：对象库名；
  * object：要修改的对象
  */
  const updateObject = (objectName, object) => {
    const _object = _vueToObject(object)
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _updateObject = () => {
        const tranRequest = db.transaction(objectName, 'readwrite')
        tranRequest
          .objectStore(objectName) // 获取store
          .put(_object) // 修改对象
          .onsuccess = (event) => { // 成功后的回调
            // tranRequest.commit()
            resolve(event.target.result)
          }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _updateObject()
        })
      } else {
        _updateObject()
      }
    })
    return objectPromise
  }

  /**
  * 依据id删除对象。
  * objectName：对象库名；
  * id：要删除的对象的key值，注意类型要准确。
  */
  const deleteObject = (objectName, id) => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _deleteObject = () => {
        const tranRequest = db.transaction(objectName, 'readwrite')
        tranRequest
          .objectStore(objectName) // 获取store
          .delete(id) // 删除一个对象
          .onsuccess = (event) => { // 成功后的回调
            // tranRequest.commit()
            resolve(event.target.result)
          }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _deleteObject()
        })
      } else {
        _deleteObject()
      }
    })
    return objectPromise
  }

  /**
  * 获取对象。
  * objectName：对象库名；
  * id：要获取的对象的key值，注意类型要准确，只能取一个。
  * 如果不设置id，会返回store里的全部对象
  */
  const getObject = (objectName, id) => {
    const objectPromise = new Promise((resolve, reject) => {
      const _getObject = () => {
        const tranRequest = db.transaction(objectName, 'readonly')
        if (typeof id === 'undefined') {
          // 获取store里的全部对象
          tranRequest
            .objectStore(objectName) // 获取store
            .getAll() // 获取全部对象
            .onsuccess = (event) => { // 成功后的回调
              console.log('getObject -- onsuccess- event:', event)
              resolve(event.target.result) // 返回对象
            }
        } else {
          // 按照id获取对象
          tranRequest
            .objectStore(objectName) // 获取store
            .get(id) // 获取对象
            .onsuccess = (event) => { // 成功后的回调
              console.log('getObject -- onsuccess- event:', event)
              resolve(event.target.result) // 返回对象
            }
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

  /*
  // index === value
  // 仅匹配 "Donna"
  var singleKeyRange = IDBKeyRange.only("Donna");

  // index >= value
  // 匹配所有超过“Bill”的，包括“Bill”
  var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

  // index > value
  // 匹配所有超过“Bill”的，但不包括“Bill”
  var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

  // index < value
  // 匹配所有不超过“Donna”的，但不包括“Donna”
  var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

  // index between value1 and value2
  // 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”
  var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

  // 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor 的第一个参数
  index.openCursor(boundKeyRange).onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      // 当匹配时进行一些操作
      cursor.continue();
    }
  };
  */

  /**
  * 获取 对象仓库 里的所有的对象，使用游标实现，可以分页，暂时不支持查询。
  * objectName：对象库名称。
  * start：开始位置
  * count：获取数量，0表示获取全部\r
  * description：排序方式，prev倒序
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

    // 查询条件
    const keyRange = IDBKeyRange.only(id)

    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _findObjectByIndex = () => {
        const dataList = []
        let cursorIndex = 0
        const tranRequest = db.transaction(objectName, 'readonly')
        const cursorRequest = tranRequest
          .objectStore(objectName)
          .index(indexName)
          .openCursor(keyRange, _description)

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

  /**
  * 清空store里的所有对象
  * storeName：对象仓库名；
  */
  const clearStore = (storeName) => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _clearStore = () => {
        const tranRequest = db.transaction(storeName, 'readwrite')
        tranRequest
          .objectStore(storeName) // 获取store
          .clear() // 清空对象仓库里的对象
          .onsuccess = (event) => { // 成功后的回调
            // tranRequest.commit()
            resolve(event)
          }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _clearStore()
        })
      } else {
        _clearStore()
      }
    })
    return objectPromise
  }

  /**
  * 删除整个store
  * storeName：对象仓库名；
  */
  const deleteStore = (storeName) => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 定义个函数，便于调用
      const _deleteStore = () => {
        const tranRequest = db.transaction(storeName, 'readwrite')
        tranRequest
          .objectStore(storeName) // 获取store
          .delete() // 清空对象仓库里的对象
          .onsuccess = (event) => { // 成功后的回调
            // tranRequest.commit()
            resolve(event)
          }
        tranRequest.onerror = function (event) {
          reject(event)
        }
      }
      // 判断数据库是否打开
      if (typeof db === 'undefined') {
        dbOpen().then(() => {
          _deleteStore()
        })
      } else {
        _deleteStore()
      }
    })
    return objectPromise
  }

  /**
  * 删除数据库
  * dbName：数据库名；
  */
  const deleteDB = (dbName) => {
    // 定义一个 Promise 的实例
    const objectPromise = new Promise((resolve, reject) => {
      // 删掉整个数据库
      myDB.deleteDatabase(dbName).onsuccess = (event) => {
        resolve(event)
      }
    })
    return objectPromise
  }

  return {
    dbOpen, // 打开数据库的Promise
    setup, // 设置默认对象
    addObject, // 添加对象的Promise
    updateObject, // 修改对象的Promise
    deleteObject, // 删除对象的Promise
    getObject, // 获取对象的Promise
    getObjectByStore, // 获取表里的全部数据
    getObjectByIndex, // 通过索引获取对象的Promise
    clearStore, // 清空对象仓库里的所有对象的Promise
    deleteStore, // 删掉对象仓库
    deleteDB, // 删除数据库
    findObjectByIndex
  }
}
