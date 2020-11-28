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
        Tab 1问题列表
      </a-tab-pane>
      <a-tab-pane key="2">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'hot',typeId:'2', typeName:'人气提问'}}">人气提问</router-link>
          </span>
        </template>
        Tab 2问题列表
      </a-tab-pane>
      <a-tab-pane key="3">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'new',typeId:'3', typeName:'最新提问'}}">最新提问</router-link>
          </span>
        </template>
        Tab 3问题列表
      </a-tab-pane>
      <a-tab-pane key="4">
        <template v-slot:tab>
          <span>
            <android-outlined />
            <router-link :to="{name:'questionList', params: { type:'invite',typeId:'4', typeName:'邀您回答'}}">邀您回答</router-link>
          </span>
        </template>
        Tab 4问题列表
      </a-tab-pane>
    </a-tabs>
    {{list}}
  </div>
</template>

<script>
import { ref } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'

export default {
  name: 'zh-question-list',
  components: {
    AppleOutlined,
    AndroidOutlined
  },
  setup (props, conext) {
    const list = ref('测')

    return {
      list
    }
  }
}
</script>
