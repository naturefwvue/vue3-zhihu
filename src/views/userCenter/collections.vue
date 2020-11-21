<template><!--用户中心-->
  <div id="mainconect">
    <a-row>
      <a-col :span="3">
        {{userId}}的收藏夹<br>
        收藏夹分类：<br>
        <template v-for="(item, index) in favoriteList"
          :key="'fav_'+index">
            <router-link
              :to="{ name: 'favGroup',
                params: {
                  userId: 456,
                  groupId: item.id,
                  group: item.title
                }
              }">
                {{item.title}}{{item.id}}
            </router-link> <br>
        </template>
      </a-col>
      <a-col :span="21">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-collections',
  props: {
    userId: Number
  },
  setup (props, conext) {
    const favoriteList = ref([
      { id: 1, title: 'vue' },
      { id: 2, title: 'react' },
      { id: 3, title: 'angular' },
      { id: 4, title: '前端' }
    ])
    return {
      favoriteList
    }
  }
}
</script>
