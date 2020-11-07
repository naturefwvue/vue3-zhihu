<template>
  <div id="nav">
    我是知乎de问题列表，推荐问题、人气问题、最新问题、邀请回答<br>
    <a-space :size="16">
      <a-button type="dashed" shape="round">
        <router-link to="/question/waiting">推荐问题</router-link>
      </a-button>
      <a-button type="dashed" shape="round">
        <router-link to="/question/waiting/hot">人气问题</router-link>
      </a-button>
      <a-button type="dashed" shape="round">
        <router-link to="/question/waiting/new">最新问题</router-link>
      </a-button>
      <a-button type="dashed" shape="round">
        <router-link to="/question/waiting/invite">邀请回答</router-link>
      </a-button>
    </a-space>
    <a-tabs>
    <a-tab-pane key="1">
      <template v-slot:tab>
        <span>
          <apple-outlined />
          <router-link to="/question/waiting">推荐问题</router-link>
        </span>
      </template>
      Tab 1问题列表
    </a-tab-pane>
    <a-tab-pane key="2">
      <template v-slot:tab>
        <span>
          <android-outlined />
          <router-link to="/question/waiting/hot">人气问题</router-link>
        </span>
      </template>
      Tab 2问题列表
    </a-tab-pane>
    <a-tab-pane key="3">
      <template v-slot:tab>
        <span>
          <android-outlined />
          <router-link to="/question/waiting/new">最新问题</router-link>
        </span>
      </template>
      Tab 2问题列表
    </a-tab-pane>
    <a-tab-pane key="4">
      <template v-slot:tab>
        <span>
          <android-outlined />
          <router-link to="/question/waiting/invite">邀请回答</router-link>
        </span>
      </template>
      Tab 2问题列表
    </a-tab-pane>
  </a-tabs>
    {{value}}<br>
    {{route}}
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-question',
  components: {
    AppleOutlined,
    AndroidOutlined
  },
  setup (props, conext) {
    const { ctx } = getCurrentInstance()

    // alert(ctx.$router.currentRoute.value.matched[0].path)
    // console.log(ctx.$router.currentRoute.value.matched[0])
    const value = ref('测试')
    const route = reactive({})
    if (typeof ctx.$router.currentRoute !== 'undefined') {
      route.value = {
        // currentRoute: ctx.$router.currentRoute.value,
        path: ctx.$router.currentRoute.value.path,
        params: ctx.$router.currentRoute.value.params,
        query: ctx.$router.currentRoute.value.query,
        hash: ctx.$router.currentRoute.value.hash
      }
      // value.value = ctx.$router.currentRoute.value
      // conext // .$route.params.username
    }

    watch(() => ctx.$router.currentRoute.value.path,
      (val) => {
        route.value.path = val
      })
    watch(() => ctx.$router.currentRoute.value.params,
      (val) => {
        route.value.params = val
      })

    return {
      value,
      route
    }
  }
}
</script>
