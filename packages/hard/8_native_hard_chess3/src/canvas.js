import { getPixelRatio } from './util'

/**
 * 画布类
 */
export default class Canvas {
  /**
   * 获取画布相关属性
   * @constructor
   */
  constructor () {
    // 获得canvas元素
    this.canvas = document.getElementById('canvas')
    // 获得context对象
    this.context = this.canvas.getContext('2d')
  }

  /**
   * 设置画布大小
   * @param {Number} boardSize 棋盘大小（画布实际大小）
   */
  setCanvasSize (boardSize) {
    // 根据当前屏幕dpr大小 动态适配canvas大小 解决canvas在retina屏幕下模糊的问题
    // const dpr = window.devicePixelRatio
    const ratio = getPixelRatio(this.context)
    // 设置canvas元素css的宽高
    this.canvas.style.width = `${boardSize}px`
    this.canvas.style.height = `${boardSize}px`
    // 根据dpr，扩大canvas画布的像素，使1个canvas像素和1个物理像素相等
    this.canvas.width = ratio * boardSize
    this.canvas.height = ratio * boardSize
    // 由于画布扩大，canvas的坐标系也跟着扩大，如果按照原先的坐标系绘图内容会缩小
    // 所以需要将绘制比例放大
    this.context.scale(ratio, ratio)
  }

  /**
   * 获取画布宽高
   */
  getCanvasSize () {
    return {
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight
    }
  }
}
