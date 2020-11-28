<template><!--用户中心-->
  <div id="mainconect">
    用户中心
    <a-row>
      <a-col :span="3">
        <router-link to="/userCenter/set" @click="routerClick(1)">设置</router-link> <br>
        <router-link :to="{name:'ucQuestion'}" @click="routerClick(2)">我的提问</router-link> <br>
        <router-link :to="{name:'ucAnswer'}" @click="routerClick(3)">我的回答</router-link> <br>
        <router-link :to="{name:'ucDiscuss'}" @click="routerClick(4)">我的讨论</router-link> <br>
        <router-link :to="{name:'ucFavorite'}" @click="routerClick(5)">收藏夹</router-link> <br>
        <router-link :to="{name:'ucHistory'}" @click="routerClick(6)">浏览记录</router-link> <br>
        <router-link :to="{name:'ucFans'}" @click="routerClick(7)">粉丝</router-link> <br>
        <router-link :to="{name:'ucFollow'}" @click="routerClick(8)">关注</router-link> <br>
      </a-col>
      <a-col :span="21">
        <a-tabs v-model:activeKey="activeKey"
          type="editable-card"
          hide-add
          @change="tabsClick"
          @edit="onEdit">
          <a-tab-pane v-for="item in useTabs" :key="item.id" :tab="item.title">
          </a-tab-pane>
        </a-tabs>
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite.vue'
const viewName = 'uc-main'

export default {
  name: 'uc-main',
  beforeRouteEnter (to, from, next) {
    console.log(`${viewName}-beforeRouteEnter`)
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log(`${viewName}-beforeRouteUpdate----`)
    // console.log(to)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log(`${viewName}-beforeRouteLeave`)
    next()
  },
  setup (props, conext) {
    const router = useRouter()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref(false)
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes
    // 定义需要的路由和tabs
    const myTabs = {
      r1: { id: 1, name: 'ucSet', title: '设置' },
      r2: { id: 2, name: 'ucQuestion', title: '我的提问' },
      r3: { id: 3, name: 'ucAnswer', title: '我的回答' },
      r4: { id: 4, name: 'ucDiscuss', title: '我的讨论' },
      r5: { id: 5, name: 'ucFavorite', title: '收藏夹' },
      r6: { id: 6, name: 'ucHistory', title: '浏览记录' },
      r7: { id: 7, name: 'ucFans', title: '粉丝' },
      r8: { id: 8, name: 'ucFollow', title: '关注' }
    }
    // 设置动态tabs
    const useTabs = ref(myTabs.r1)

    // 当前激活的tab
    const activeKey = ref(1)

    // tabs的数量
    const tabsCount = ref(1)

    // 导航的单击事件，很奇怪为啥会刷新页面，所以只好手动一下
    const routerClick = (id) => {
      // 终止默认事件，否则会刷新，不知道为啥
      event.preventDefault()
      // tab + 1
      if (typeof useTabs.value['r' + id] === 'undefined') {
        tabsCount.value += 1
      }
      // 添加useTabs
      useTabs.value['r' + id] = myTabs['r' + id]
      // 手动跳转
      router.push({ name: myTabs['r' + id].name })
      // 激活tab
      activeKey.value = id
      return false
    }

    // tabs的单击事件，手动改路由
    const tabsClick = (key) => {
      console.log(key)
      // 手动跳转
      router.push({ name: myTabs['r' + key].name })
    }

    // 关闭tab
    const onEdit = (targetKey, action) => {
      console.log(targetKey)
      console.log(action)
      if (action === 'remove') {
        if (tabsCount.value <= 1) {
          alert('就剩一个了，咱们别删了呗')
        } else {
          if (activeKey.value === targetKey) {
            // 删除激活的tab，需要找到前一个tab，然后激活
            let beforeKey = ''
            for (var key in useTabs.value) {
              if (key === 'r' + targetKey) {
                break
              }
              beforeKey = key
            }
            activeKey.value = beforeKey.replace('r', '')
            alert(activeKey.value)
            // 手动跳转
            router.push({ name: myTabs[beforeKey].name })
          }
          // 删除tab
          delete useTabs.value['r' + targetKey]
          tabsCount.value -= 1
        }
      }
    }

    return {
      myTabs,
      useTabs,
      activeKey,
      routerClick,
      tabsClick,
      onEdit,
      value,
      currentRoute,
      history,
      routes
    }
  }
}
</script>
