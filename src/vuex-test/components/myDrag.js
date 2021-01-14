/**
 * 拖拽器
 */
export default class DragUtil {
  /**
   * 一个拖拽器只对一个对象起作用
   * @param {*} hottarget 拖拽响应对象、热区
   * @param {*} target 被拖拽的对象 和 hottarget可是是同一个
   * @param {*} bounds 限制相对于父容器的拖拽范围，不设置则不限制
   */
  constructor (hottarget, target, bounds) {
    this.isDrag = false
    this.tempX = 0
    this.tempY = 0

    this.oldX = 0
    this.oldY = 0
    this.__isDisable = false

    this.hottarget = hottarget
    this.target = target
    this.bounds = bounds
    this.mouseMoved = false
    /**
     * 开始拖拽
     */
    this.onstart = (event) => {}
    /**
     * 结束拖拽
     */
    this.onend = (event) => {}
    /**
     * 正在拖拽
     */
    this.ondraging = (event) => {}
    this.mousemovefunc = (event) => {
      this.onmousemove(event)
      this.ondraging(event)
    }
    this.mousedownfunc = (event) => {
      this.onmousedown(event)
      document.addEventListener('mousemove', this.mousemovefunc)
      this.onstart(event)
    }
    this.mouseupfunc = (event) => {
      event = event || window.event
      this.isDrag = false
      document.removeEventListener('mousemove', this.mousemovefunc)
      this.onend(event)
      const moveX = event.clientX - this.tempX
      const moveY = event.clientY - this.tempY
      this.mouseMoved = Math.abs(moveX) > 5 || Math.abs(moveY) > 5
    }

    this.hottarget.addEventListener('mousedown', this.mousedownfunc)

    document.addEventListener('mouseup', this.mouseupfunc)
  }

  /**
   * 是否禁用该拖拽器
   */
  set disable (dis) {
    if (dis) {
      this.hottarget.addEventListener('mousedown', this.mousedownfunc)
      document.addEventListener('mouseup', this.mouseupfunc)
    } else {
      this.hottarget.removeEventListener('mousedown', this.mousedownfunc)
      document.removeEventListener('mouseup', this.mouseupfunc)
    }
    this.__isDisable = dis
  }

  get disable () {
    return this.__isDisable
  }

  onmousedown (event) {
    console.log(event)
    event = event || window.event
    this.tempX = event.clientX
    this.tempY = event.clientY
    this.isDrag = true
    this.oldX = this.target.offsetLeft
    this.oldY = this.target.offsetTop
  }

  onmousemove (event) {
    if (!this.isDrag) {
      return
    }
    event = event || window.event
    let moveX = this.oldX + event.clientX - this.tempX
    let moveY = this.oldY + event.clientY - this.tempY

    if (this.bounds) {
      const w = this.target.getBoundingClientRect().width
      const h = this.target.getBoundingClientRect().height
      console.log(moveX, this.bounds.x - w)

      if (moveX < this.bounds.x - w) {
        moveX = this.bounds.x - w
      }

      if (moveY < this.bounds.y - h) {
        moveY = this.bounds.y - h
      }

      if (moveX > this.bounds.width) {
        moveX = this.bounds.width
      }

      if (moveY > this.bounds.height) {
        moveY = this.bounds.height
      }
    }
    this.target.style.left = moveX + 'px'
    this.target.style.top = moveY + 'px'
  }

  /**
   * 销毁该拖拽器
   */
  destroyed () {
    document.removeEventListener('mousemove', this.mousemovefunc)
    document.removeEventListener('mouseup', this.mouseupfunc)
    this.hottarget.removeEventListener('mousedown', this.mousedownfunc)
    this.onstart = null
    this.onend = null
    this.ondraging = null
    this.mousemovefunc = null
    this.mouseupfunc = null
    this.mousedownfunc = null
    this.hottarget = null
    this.target = null
  }
}
