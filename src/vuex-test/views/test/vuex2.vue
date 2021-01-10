<template>
  <div class="home">
    <hr>
    子控件 的演示 <br>
    {{test}}<br>
    {{computedVuex}}<br>
    <input type="button" @click="add()" value="计数++"> <br>
    <input type="button" @click="setItem('bbb')" value="修改 name 的值"> <br>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// @ is an alias to /src

export default {
  name: 'vuex2',
  components: {
  },
  setup (props, ctx1) {
    const test = ref('vuex') // 显示值

    const store = useStore()
    console.log('store--', store)
    console.log('vuex21', store.state.count)
    const computedVuex = computed(() => store.state.count)
    console.log('computedVuex', computedVuex)
    store.commit('increment')
    console.log('vuex22', store.state.count)

    const add = () => {
      store.commit('increment')
      test.value = store.state.count
    }
    return {
      add,
      computedVuex,
      test
    }
  }

}
</script>
