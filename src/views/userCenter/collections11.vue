<template><!--用户中心-->
  <div id="mainconect">
    {{userId}}的收藏夹<br>
    收藏夹列表 <br>
    <template v-for="(item, index) in favoriteList" :key="'fav_'+index">
      <router-link :to="{ name: 'favGroup', params: { userId:userId,groupId: item.id, group:item.title }}">
        {{item.title}}
      </router-link> <br>
    </template>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// import favorite from './userCenter-favorite-type.vue'

export default {
  name: 'uc-collections',
  props: {
    userId: Number
  },
  setup (props, conext) {
    const router = useRouter()

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
        userId: props.userId,
        group: favoriteList[0].title,
        groupId: favoriteList[0].id
      }
    })

    return {
      favoriteList
    }
  }
}
</script>
