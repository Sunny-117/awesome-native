import {
  calculateSingleChessShapes,
  calculateAllChessShapes
} from './situation'
import { CHESS_SHAPES_SCORE } from './score'
import { BOARD_SCORES } from '../constant'

function fixScore(score) {
  // 棋型分数小于活四，大于等于冲四
  if (score < CHESS_SHAPES_SCORE.FOUR && score >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
      // 如果当前分数只够单独冲四，并且不足以构成冲四且活三的杀招
      if (score >= CHESS_SHAPES_SCORE.BLOCKED_FOUR && score < (CHESS_SHAPES_SCORE.BLOCKED_FOUR + CHESS_SHAPES_SCORE.THREE)) {
          //单独冲四，意义不大，则选择活三
          return CHESS_SHAPES_SCORE.THREE
      } else if (score >= CHESS_SHAPES_SCORE.BLOCKED_FOUR + CHESS_SHAPES_SCORE.THREE && score < CHESS_SHAPES_SCORE.BLOCKED_FOUR * 2) {
          // 当前棋子可以形成冲四与活三，但不能形成双冲四
          return CHESS_SHAPES_SCORE.FOUR //冲四活三，比双三分高，相当于自己形成活四
      } else {
          //双冲四 比活四分数也高
          return CHESS_SHAPES_SCORE.FOUR * 2
      }
  }
  return score
}

/*
  局面评估
  针对当前棋局类型进行评估
*/
// 根据situation.js中计算出的当前棋局下某一方的棋型数量进行打分
export function evaluateSingleChessShapes (chessType, boardGrids, position) {
  const chessShapesCount = calculateSingleChessShapes(
    chessType,
    boardGrids,
    position
  )
  let singleChessShapesScore = 0
  // console.log('---------------', chessShapesCount)
  for (const chessShapeName in chessShapesCount) {
    // console.log('---------', chessShapesCount[chessShapeName])
    if (chessShapesCount.hasOwnProperty(chessShapeName)) {
      singleChessShapesScore =
        singleChessShapesScore +
        chessShapesCount[chessShapeName] * CHESS_SHAPES_SCORE[chessShapeName]
    }
  }
  // return singleChessShapesScore + BOARD_SCORES[position.row][position.col]
  return { score: fixScore(singleChessShapesScore), count: chessShapesCount }
}

export function evaluateAllChessShapes (aiChessType, chessType, boardGrids) {
  const chessShapesCount = calculateAllChessShapes(aiChessType, boardGrids)
  let allChessShapesScore = 0
  for (const chessShapeName in chessShapesCount) {
    const aiScore =
    chessShapesCount[chessShapeName].AI * CHESS_SHAPES_SCORE[chessShapeName]
    const humanScore =
    chessShapesCount[chessShapeName].HUMAN *
    CHESS_SHAPES_SCORE[chessShapeName]
    if (chessShapesCount.hasOwnProperty(chessShapeName)) {
      // console.log('---------------', aiScore, humanScore)
      allChessShapesScore = allChessShapesScore + (aiScore - humanScore)
    }
  }
  // console.log('-------------', chessShapesCount, allChessShapesScore)
  return chessType === aiChessType ? allChessShapesScore : -allChessShapesScore
}

// export default class Evaluate {
//   constructor () {}
// }
