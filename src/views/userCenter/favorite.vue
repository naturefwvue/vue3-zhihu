<template><!--用户中心-->
  <div id="mainconect">
    我的收藏夹（分类） <br>
    <template v-for="(item, index) in favoriteList" :key="'fav_'+index">
      <router-link :to="{ name: 'favGroup', params: { groupId: item.id, group:item.title }}">
        {{item.title}}
      </router-link> <br>
    </template>
    currentRoute:{{currentRoute.fullPath}}<br>
    params:{{currentRoute.params}}<br>
    history:{{history.state}}
  </div>
  <router-view/>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite-type.vue'

export default {
  name: 'uc-favorite',
  setup (props, conext) {
    const router = useRouter()

    // let id = 'reacte'
    // router.addRoute({
    //  path: `/userCenter/favorite/${id}`,
    //  name: `fav-${id}`,
    //  component: favorite
    // })

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const currentRoute = router.currentRoute
    const history = router.options.history
    const routes = router.options.routes

    const favoriteList = reactive([
      { id: 1, title: 'vue' },
      { id: 2, title: 'react' },
      { id: 3, title: 'angular' },
      { id: 4, title: '前端' }
    ])

    // 跳转，默认收藏夹的分组
    router.push({
      name: 'favGroup',
      params: {
        group: favoriteList[0].title,
        groupId: favoriteList[0].id
      }
    })

    return {
      value,
      favoriteList,
      currentRoute,
      history,
      routes
    }
  }
}
</script>
