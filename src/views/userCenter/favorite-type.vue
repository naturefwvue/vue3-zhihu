<template><!--用户中心-->
  <div id="mainconect">
    userId的收藏夹，按照分组显示收藏夹里的信息： <br>
    groupId:group
  </div>
</template>

<script>
// import { watch } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-collections-group',
  props: {
    // userId: Number,
    // groupId: Number,
    // group: String
  },
  setup (props, conext) {
    // alert(props.groupId)

    // 监控参数变化
    // watch(() => props.groupId, (newValue, oldValue) => {
    //   alert(newValue)
    // })
    return {
    }
  }
}
</script>
