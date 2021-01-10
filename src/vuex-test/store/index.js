import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    myPromies: () => {}
  },
  mutations: {
    increment (state, value = 1) {
      state.count += value
      const pp = new Promise((resolve, reject) => {
        resolve(state.count)
      })
      state.myPromies = pp
      return pp
    }
  },
  actions: {
  },
  modules: {
  }
})
