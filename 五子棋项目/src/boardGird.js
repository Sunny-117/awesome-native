import { drawRadiusRect, clearRadiusRect, window2Canvas } from './util'
import { BOARD_GRID_TYPE_DEFAULT } from './constant'

/**
 * 棋格类
 *
 * @export
 * @class BoardGrid
 */
export default class BoardGrid {
  /**
   * 构造方法
   *
   * @param {Number} boardGridX 棋格左上角横坐标
   * @param {Number} boardGridY 棋格左上角纵坐标
   * @param {Number} boardGridSize 棋格大小
   * @param {Number} boardGridType 棋格类型
   * @param {Number} boardGridChess 棋格棋子
   * @param {Number} boardGridRadius 棋格圆角半径
   * @param {String} boardGridColor 棋格颜色
   * @memberof BoardGrid
   */
  constructor (
    boardGridX,
    boardGridY,
    boardGridSize,
    boardGridType,
    boardGridChess,
    boardGridRadius,
    boardGridColor
  ) {
    // 棋格坐标
    this.boardGridX = boardGridX
    this.boardGridY = boardGridY
    // 定义棋格大小
    this.boardGridSize = boardGridSize
    // 棋格类型
    this.boardGridType = boardGridType
    // 棋格棋子
    this.boardGridChess = boardGridChess
    // 棋格圆角弧度
    this.boardGridRadius = boardGridRadius
    // 棋格颜色
    this.boardGridColor = boardGridColor
  }

  setBoardGridPosition (x, y) {
    this.boardGridX = x
    this.boardGridY = y
  }

  setBoardGridSize (boardGridSize) {
    this.boardGridSize = boardGridSize
  }

  setBoardGridColor (boardGridColor) {
    this.boardGridColor = boardGridColor
  }

  redrawBoardGrid (
    ctx
  ) {
    this.drawBoardGrid(ctx)
  }

  redrawBoardGridChess (ctx) {
    if (this.boardGridType !== BOARD_GRID_TYPE_DEFAULT) {
      this.drawBoardGridChess(ctx)
    }
  }

  /**
   * 判断点击的点是否在棋格内
   *
   * @param {Number} clientX
   * @param {Number} clientY
   * @param {Object} gameCanvas
   * @returns
   * @memberof BoardGrid
   */
  isInBoardGird (clientX, clientY, gameCanvas) {
    // event.offsetX,event.offsetY等API在采用dpr适配方案以后，计算出的值有错误，所以弃用此API，采用新方法计算
    const { x, y } = window2Canvas(gameCanvas.canvas, clientX, clientY)
    drawRadiusRect(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      this.boardGridSize,
      this.boardGridRadius,
      gameCanvas.context
    )
    return gameCanvas.context.isPointInPath(x, y)
  }

  /**
   * 绘制棋格
   *
   * @param {Object} ctx 画布内容对象
   * @memberof BoardGrid
   */
  drawBoardGrid (ctx) {
    drawRadiusRect(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      this.boardGridSize,
      this.boardGridRadius,
      ctx
    )
    ctx.fillStyle = this.boardGridColor
    ctx.fill()
  }

  clearBoardGrid (ctx) {
    clearRadiusRect(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      this.boardGridSize,
      ctx
    )
  }

  /**
   * 绘制棋格上的棋子
   *
   * @param {Object} gameChess 棋子对象
   * @param {Object} ctx 画布内容对象
   * @memberof BoardGrid
   */
  drawBoardGridChess (ctx) {
    this.boardGridChess.drawChess(
      this.boardGridX,
      this.boardGridY,
      this.boardGridSize,
      ctx
    )
  }

  setBoardGridChess (gameChessType, ctx) {
    this.boardGridChess.chessType = gameChessType
    this.drawBoardGridChess(ctx)
    this.boardGridType = gameChessType
  }

  setBoardGridChessProperty (chessSize, chessLineWidth) {
    // 重新设置棋子属性
    this.boardGridChess.setChessSize(
      chessSize
    )
    this.boardGridChess.setChessLineWidth(
      chessLineWidth
    )
  }
}
