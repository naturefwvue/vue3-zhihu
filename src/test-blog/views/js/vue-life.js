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

  onDeactivated(() => { // 关闭、未激活？
    console.log(`${flag}-${index++} -- onDeactivated`)
  }) //
  onActivated(() => { // 启动时、激活
    console.log(`${flag}-${index++} -- onActivated`)
  }) //

  onBeforeUpdate(() => {
    console.log(`${flag}-${index++} -- onBeforeUpdate`)
  }) //
  onUpdated(() => {
    console.log(`${flag}-${index++} -- onUpdated`)
  }) //

  onErrorCaptured(() => { // 捕获错误时
    console.log(`${flag}-${index++} -- onErrorCaptured`)
  }) //
  onRenderTracked(() => { // 渲染跟踪时
    console.log(`${flag}-${index++} -- onRenderTracked`)
  }) //
  onRenderTriggered(() => { // 渲染触发时
    console.log(`${flag}-${index++} -- onRenderTriggered`)
  }) //
}
