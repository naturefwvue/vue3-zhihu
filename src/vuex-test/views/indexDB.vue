<template>
  <div class="home">
    websql的尝试 <br>

    <input type="button" @click="sqlCreate" value="建立sql">
    <input type="button" @click="sqlSelect" value="读取sql">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'websql',
  components: {
  },
  setup (props, ctx) {
    /**
     * IndexedDB
     * */
    var db /* 数据库对象 */
    var objectStore /* 仓库(表) */
    /**
     * 创建数据库
     */
    var request = window.indexedDB.open('myIndex', 3) /* 该域中的数据库myIndex */
    request.onerror = function (event) {
      console.log('open database error')
    }
    /**
     * 业务代码
     */
    request.onsuccess = function (event) {
      db = request.result /* 数据库对象 */
      add()
      // read();
      // update();
      // remove();
      readAll()
      console.log(db)
    }

    /**
     * 创建表
     */
    request.onupgradeneeded = function (event) {
      db = event.target.result /* 数据库对象 */
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id' }) /* 创建person仓库(表) 主键 */
        // objectStore = db.createObjectStore('person',{autoIncrement:true});/*自动创建主键*/
        objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('email', 'email', { unique: true })
      }
      console.log(db)
    }
    /**
     * 插入数据
     */
    const add = () => {
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })
      request.onsuccess = function (event) {
        console.log('数据写入成功')
      }
      request.onerror = function (event) {
        console.log('数据写入失败')
      }
    }
    /**
     * 读取数据
     */
    const read = () => {
      var transaction = db.transaction(['person'])
      var objectStore = transaction.objectStore('person')
      var request = objectStore.get(1)
      request.onerror = function (event) {
        console.log('事物失败')
      }
      request.onsuccess = function (event) {
        if (request.result) {
          console.log('Name' + request.result.name)
          console.log('Age' + request.result.age)
          console.log('Email' + request.result.email)
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
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })
      request.onsuccess = function (event) {
        console.log('数据更新成功')
      }
      request.onerror = function (event) {
        console.log('数据更新失败')
      }
    }

    /**
     * 删除数据
     */
    const remove = () => {
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .delete(1)
      request.onsuccess = function (event) {
        console.log('数据删除成功')
      }
    }

    return {
      add,
      read,
      readAll,
      update,
      remove
    }
  }

}
</script>
