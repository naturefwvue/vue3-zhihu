<template><!--用户中心-->
  <div id="mainconect">
    按照分组显示收藏夹里的信息： <br>
    groupId:{{groupId}}
  </div>
</template>

<script>
// import { watch } from 'vue'
// import { useRouter } from 'vue-router'

export default {
  name: 'uc-collections-group',
  props: {
    groupId: Number
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
