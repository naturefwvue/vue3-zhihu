import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onDeactivated,
  onActivated,
  onBeforeUpdate,
  onUpdated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

export function vueLife (flag) {
  let index = 0
  console.log(`${flag}-${index++} -- setup`)
  onBeforeMount(() => {
    console.log(`${flag}-${index++} -- onBeforeMount`)
  }) //
  onMounted(() => {
    console.log(`${flag}-${index++} -- onMounted`)
  }) //

  onBeforeUnmount(() => {
    console.log(`${flag}-${index++} -- onBeforeUnmount`)
  }) //
  onUnmounted(() => { // 加载？
    console.log(`${flag}-${index++} -- onUnmounted`)
  }) //

  // activated,deactivated这两个生命周期函数一定是要在使用了keep-alive组件后才会有的，否则则不存在
  onActivated((event) => { // 启动时、激活
    console.log(`${flag}-${index++} -- onActivated`)
    console.log(event)
  }) //
  onDeactivated((event) => { // 关闭、未激活？
    console.log(`${flag}-${index++} -- onDeactivated`)
    console.log(event)
  }) //

  onBeforeUpdate(() => {
    console.log(`${flag}-${index++} -- onBeforeUpdate`)
  }) //
  onUpdated(() => {
    console.log(`${flag}-${index++} -- onUpdated`)
  }) //

  onErrorCaptured((errorMsg) => { // 渲染出错时
    console.log(`${flag}-${index++} -- onErrorCaptured`)
    console.log(errorMsg)
  }) //
  onRenderTracked((event) => { // 渲染跟踪时
    console.log(`${flag}-${index++} -- onRenderTracked`)
    console.log(event)
  }) //
  onRenderTriggered((event) => { // 渲染触发时
    console.log(`${flag}-${index++} -- onRenderTriggered`)
    console.log(event)
  }) //
}
