<template>
  <div id="mainconect">
    提问列表，按照分类显示<br>
    <a-tabs tab-position="top" type="editable-card" animated="false">
      <a-tab-pane key="1">
        <template v-slot:tab>
          <span>
            <apple-outlined />
            <router-link :to="{name:'questionList', params: { type:'recommend',typeId:'1', typeName:'推荐提问'}}">推荐提问</router-link>
          </span>
        </template>
        Tab 1问题列表{{$route}}
      </a-tab-pane>
      <a-tab-pane key="2">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'hot',typeId:'2', typeName:'人气提问'}}">人气提问</router-link>
          </span>
        </template>
        Tab 2问题列表{{$router}}
      </a-tab-pane>
      <a-tab-pane key="3">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'new',typeId:'3', typeName:'最新提问'}}">最新提问</router-link>
          </span>
        </template>
        Tab 3问题列表{{$route}}
      </a-tab-pane>
      <a-tab-pane key="4">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'invite',typeId:'4', typeName:'邀您回答'}}">邀您回答</router-link>
          </span>
        </template>
        Tab 4问题列表{{$route}}
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
  name: 'zh-question-list',
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
