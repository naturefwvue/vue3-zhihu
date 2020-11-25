<template>
  <div id="mainconect">
    <a-row>
      <a-col :span="7">
        {{userId}}的收藏夹<br>
        收藏夹分类：<br>
        <template v-for="(item, index) in favoriteList"
          :key="'fav_'+index">
            <router-link
              :to="{ name: 'collections',
                params: {
                  groupId: item.id,
                  group: item.title
                }
              }">
                {{item.title}}{{item.id}}
            </router-link> <br>
        </template>
      </a-col>
      <a-col :span="17">
        <router-view></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-collections-type',
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
