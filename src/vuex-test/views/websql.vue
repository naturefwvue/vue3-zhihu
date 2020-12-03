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
    const sqlCreate = () => {
      alert('11')
      var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024)
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique ,log)')
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (3, "菜鸟教程11111")')
        tx.executeSql('INSERT INTO LOGS (id, log) VALUES (4, "www.runoob.com")')
      })
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
          var len = result.rows.length
          var i = 0
          for (i = 0; i < len; i++) {
            console.log(result.rows.item(i).log)
          }
        }, null)
      })
    }

    const sqlSelect = () => {
      alert('22')
      var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024)
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
          console.log('result', result)
          console.log('tx', tx)
          var len = result.rows.length
          var i = 0
          for (i = 0; i < len; i++) {
            console.log(result.rows.item(i).log)
          }
        }, null)
      })
    }

    return {
      sqlCreate,
      sqlSelect
    }
  }

}
</script>
