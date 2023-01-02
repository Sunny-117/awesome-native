import BoardGrid from './boardGird'
import Chess from './chess'
import {
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_RADIUS,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_CHESS_DEFAULT_SIZE,
  BOARD_GRID_CHESS_DEFAULT_LINEWIDTH,
  BOARD_GRID_DEFAULT_SIZE,
  BOARD_GRID_COLOR
} from './constant'

/**
 * 棋盘类
 *
 * @export
 * @class Board
 */
export default class Board {
  /**
   * 定义棋盘属性
   * @constructor
   */
  // constructor () {}

  /**
   * 初始化棋格状态
   */
  initBoardGrids (boardGridSize, ctx) {
    // 计算场景各元素尺寸样式
    const {
      chessSize,
      chessLineWidth
    } = this.calculateBoardGridChessProperty(boardGridSize)
    this.boardGrids = []
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      this.boardGrids[row] = []
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 创建棋格
        this.boardGrids[row][col] = new BoardGrid(
          row * (boardGridSize + BOARD_GRIDS_GAP),
          col * (boardGridSize + BOARD_GRIDS_GAP),
          boardGridSize,
          BOARD_GRID_TYPE_DEFAULT,
          new Chess(BOARD_GRID_TYPE_DEFAULT, chessSize, chessLineWidth),
          BOARD_GRID_RADIUS,
          BOARD_GRID_COLOR
        )
        // 绘制棋格
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  resetBoardGrids (ctx) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        this.boardGrids[row][col].boardGridType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][
          col
        ].boardGridChess.chessType = BOARD_GRID_TYPE_DEFAULT
        this.boardGrids[row][col].setBoardGridColor(BOARD_GRID_COLOR)
        this.boardGrids[row][col].drawBoardGrid(ctx)
      }
    }
  }

  getBoardSize (boardGridSize) {
    return (
      boardGridSize * BOARD_GRIDS_COUNT +
      BOARD_GRIDS_GAP * (BOARD_GRIDS_COUNT - 1)
    )
  }

  resizeBoardGrids (newBoardGridSize, ctx) {
    const { chessSize, chessLineWidth } = this.calculateBoardGridChessProperty(
      newBoardGridSize
    )
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        // 重新设置棋格大小
        const boardGrid = this.boardGrids[row][col]
        boardGrid.setBoardGridSize(newBoardGridSize)
        // 重新设置棋格位置
        boardGrid.setBoardGridPosition(
          row * (newBoardGridSize + BOARD_GRIDS_GAP),
          col * (newBoardGridSize + BOARD_GRIDS_GAP)
        )
        // 重新设置棋子属性
        boardGrid.setBoardGridChessProperty(chessSize, chessLineWidth)
        // 重新绘制棋格与棋子
        boardGrid.redrawBoardGrid(ctx)
        boardGrid.redrawBoardGridChess(
          ctx
        )
      }
    }
  }

  calculateBoardGridChessProperty (boardGridSize) {
    let chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH
    const percentSize = BOARD_GRID_CHESS_DEFAULT_SIZE / BOARD_GRID_DEFAULT_SIZE
    // 让棋子半径为偶数，防止绘制出现bug
    let chessSize = Math.round(boardGridSize * percentSize)
    chessSize = chessSize % 2 === 0 ? chessSize : chessSize - 1
    // 根据当前棋格大小获取棋子线宽
    if (boardGridSize < BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT) {
      chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH - 1
    } else {
      chessLineWidth = BOARD_GRID_CHESS_DEFAULT_LINEWIDTH
    }
    return {
      chessSize,
      chessLineWidth
    }
  }
}
