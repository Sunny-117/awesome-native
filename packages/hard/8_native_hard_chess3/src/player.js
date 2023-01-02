import { BOARD_GRID_COLOR, BOARD_GRID_ACTIVE_COLOR  } from './constant'

/*
  玩家
  定义玩家相关属性，支持人机、人人对战
*/
export default class Player {
  constructor (playerType, playerChessType, playerStatus) {
    // 玩家类型
    this.playerType = playerType
    // 玩家所选棋子
    this.playerChessType = playerChessType
    // 玩家状态
    this.playerStatus = playerStatus
  }

  // setPlayerChess (playerChess) {
  //   this.playerChess = playerChess
  // }

  generatePlayerChess (boardGrids, position, ctx, humanPlayerSteps, aiPlayerSteps, gameAI, aiChessType) {
    boardGrids[position.row][position.col].setBoardGridChess(this.playerChessType, ctx)
    // gameAI.zobrist.go(position.row, position.col, aiChessType, this.playerChessType)
    // 重置棋格颜色
    if (this.playerChessType !== aiChessType && humanPlayerSteps.length !== 0) {
      humanPlayerSteps[humanPlayerSteps.length - 1].clearBoardGrid(ctx)
      humanPlayerSteps[humanPlayerSteps.length - 1].setBoardGridColor(BOARD_GRID_COLOR)
      humanPlayerSteps[humanPlayerSteps.length - 1].redrawBoardGrid(ctx)
      humanPlayerSteps[humanPlayerSteps.length - 1].redrawBoardGridChess(
        ctx
      )
    }
    if (this.playerChessType === aiChessType && aiPlayerSteps.length !== 0) {
      aiPlayerSteps[aiPlayerSteps.length - 1].clearBoardGrid(ctx)
      aiPlayerSteps[aiPlayerSteps.length - 1].setBoardGridColor(BOARD_GRID_COLOR)
      aiPlayerSteps[aiPlayerSteps.length - 1].redrawBoardGrid(ctx)
      aiPlayerSteps[aiPlayerSteps.length - 1].redrawBoardGridChess(
        ctx
      )
    }
    boardGrids[position.row][position.col].clearBoardGrid(ctx)
    boardGrids[position.row][position.col].setBoardGridColor(BOARD_GRID_ACTIVE_COLOR)
    boardGrids[position.row][position.col].redrawBoardGrid(ctx)
    boardGrids[position.row][position.col].redrawBoardGridChess(
      ctx
    )
    if (this.playerChessType !== aiChessType) {
      humanPlayerSteps.push(boardGrids[position.row][position.col])
    }
    if (this.playerChessType === aiChessType) {
      aiPlayerSteps.push(boardGrids[position.row][position.col])
    }
    // console.log(humanPlayerSteps, aiPlayerSteps)
  }

  // generateNextStep(row, col) {}
}
