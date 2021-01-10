<template>
  <div class="home">
    vuex 的尝试 <br>
    {{test}}<br>
    {{computedVuex}}<br>
    $store：{{$store}}<br>
    <input type="button" @click="add()" value="计数++"> <br>
    <input type="button" @click="setItem('bbb')" value="修改 name 的值"> <br>
    <vuexTest/>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue'
import vuexTest from './vuex2'

// @ is an alias to /src

export default {
  name: 'vuex1',
  components: {
    vuexTest
  },
  setup (props, context) {
    const test = ref('vuex') // 显示值

    const { ctx } = getCurrentInstance()
    console.log('ctx', ctx)
    console.log('vuex1', ctx.$store.state.count)
    const computedVuex = computed(() => ctx.$store.state.count)
    console.log('computedVuex', computedVuex)
    const cc = ctx.$store.commit('increment')
    console.log('cc', cc)
    console.log('vuex2', ctx.$store.state.count)

    const add = () => {
      ctx.$store.commit('increment', 3)
      test.value = ctx.$store.state.count
      console.log('pp:', ctx.$store.state.myPromies)
      ctx.$store.state.myPromies.then((data) => {
        alert(data)
      })
    }
    return {
      add,
      computedVuex,
      test
    }
  }

}
</script>
