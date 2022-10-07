import {
  BOARD_GRIDS_COUNT,
  INFINITY
} from '../constant'

import { evaluateSingleChessShapes, evaluateAllChessShapes } from './evaluate'

import { getSingleChessShapesCount } from './situation'
import { CHESS_CROSS_SHAPES } from './chessShape'

import { negamax, minimax, alphaBeta, generateLegalMoves, searchAll } from './search'
import Zobrist from './zobrist'
import History from './history'

/*
  AI
  结合搜索、评估后的结果，得出下回合棋子位置
*/
export default class AI {
  constructor () {
    this.zobrist = new Zobrist()
    this.history = new History()
  }

  initAI (gameBoard) {
    this.history.clearHistoryScore()
    this.zobrist.calculateInitHashKey(gameBoard.boardGrids)
    this.zobrist.initKillTable()
    // console.log(this.zobrist.code)
  }

  getNextStep (chessType, gameBoard, gameHumanPlayerSteps, gameAIPlayerSteps) {
    // return {row: , col: }
    // const { row, col } = this.getNextStep()

    // let row = Math.round(Math.random() * 14)
    // let col = Math.round(Math.random() * 14)
    // while (gameBoard.boardGrids[row][col].boardGridType !== 0) {
    //   row = Math.round(Math.random() * 14)
    //   col = Math.round(Math.random() * 14)
    // }
    // return {row, col}

    // const board_scores = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
    // let arr = []
    // for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    //   for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
    //     // const old = gameBoard.boardGrids[row][col].boardGridType
    //     if (gameBoard.boardGrids[row][col].boardGridType === 0) {
    //       gameBoard.boardGrids[row][col].boardGridType = 2
    //       // console.log(evaluateSingleChessShapes(2, gameBoard.boardGrids, {row, col}))
    //       arr.push({ score: evaluateSingleChessShapes(2, gameBoard.boardGrids, { row, col }) + board_scores[row][col], row, col })
    //       gameBoard.boardGrids[row][col].boardGridType = 0
    //     } else {
    //       arr.push(0)
    //     }
    //   }
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // console.log(getLegalMoves(gameBoard.boardGrids))
    // const board_scores = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
    //   [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
    //   [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    //   [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
    // let arr = []
    // for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    //   for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
    //     if (gameBoard.boardGrids[row][col].boardGridType === 0) {
    //       gameBoard.boardGrids[row][col].boardGridType = 2
    //       arr.push({ score: evaluateAllChessShapes(2, gameBoard.boardGrids) + board_scores[row][col], row, col })
    //       gameBoard.boardGrids[row][col].boardGridType = 0
    //     } else {
    //       arr.push({ score: -1, row, col })
    //       // arr.push(0)
    //     }
    //   }
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // let arr = []
    // const legalMoves = generateLegalMoves(gameBoard.boardGrids)
    // for (let index = 0; index < legalMoves.length; index++) {
    //   gameBoard.boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 2
    //   arr.push({ score: minimax(1, 2, gameBoard.boardGrids), row: legalMoves[index].row, col: legalMoves[index].col })
    //   gameBoard.boardGrids[legalMoves[index].row][legalMoves[index].col].boardGridType = 0
    // }
    // arr.sort((a, b) => {
    //   return b.score - a.score
    // })
    // console.log(arr)
    // return { row: arr[0].row, col: arr[0].col }

    // const { row, col } = minimax(1, chessType, gameBoard.boardGrids)
    // const { row, col } = negamax(2, chessType, gameBoard.boardGrids)

    // 在几个相同的最高分数位置中随机选择一个
    // 位置随机 需要在ab搜索外层加一层循环  单独搜索第一层的每个点 然后分别计算价值  比较消耗性能  暂时不考虑做随机
    // 后期可以考虑引入一些开局 做成开局库   ai前几手随机使用固定的开局即可
    // let bestPositions = []
    // bestPositions = alphaBeta(6, -INFINITY, INFINITY, chessType, chessType, gameBoard.boardGrids, gamePlayerSteps).bestPositions
    // const { row, col } = bestPositions[Math.floor(bestPositions.length * Math.random())]
    // console.log(bestPositions.sort((a, b) => { return b.val - a.val }))

    // 储存搜索到的所有最大值节点  随机选择一个  避免ai重复相同的局面位置
    // 悔棋
    // 复盘功能 （可以向前悔棋、向后下棋）
    // 判断输赢 平局
    // 优化重构现有代码
    // 加入测试逻辑的代码  测试ab剪枝搜索的结果
    // 实现迭代加深
    // 增量式估值

    // 进度条 （或者显示搜索了多少局面节点、花费的时间）
    // 确认、取消 模拟放置棋子的功能

    // console.log('--------', getSingleChessShapesCount(['211111'], CHESS_CROSS_SHAPES))
    // const { row, col } = minimax(4, gameBoard.boardGrids, chessType)

    // return alphaBeta(6, -INFINITY, INFINITY, chessType, chessType, gameBoard.boardGrids, gamePlayerSteps)

    // 每次搜索前初始化历史表与置换表
    this.initAI(gameBoard)
    return searchAll(chessType, chessType, gameBoard.boardGrids, gameHumanPlayerSteps, gameAIPlayerSteps, this.zobrist, this.history)
  }
}
