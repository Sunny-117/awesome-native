import { BOARD_GRIDS_COUNT } from '../constant'
import { CHESS_SHAPES_SCORE } from './score'
import { evaluateSingleChessShapes } from './evaluate'
import { calculateSingleChessShapes } from './situation'

export function generateMoves (chessType, aiChessType, boardGrids, humanPlayerSteps, aiPlayerSteps) {
  const fives = []
  // const aiFives = []
  // const humanFives = []
  const aiFours = []
  const humanFours = []
  const aiBlockedFours = []
  const humanBlockedFours = []
  const aiTwoThrees = []
  const humanTwoThrees = []
  const aiThrees = []
  const humanThrees = []
  const aiTwos = []
  const humanTwos = []
  const neighbors = []
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      // 当前位置为空
      if (boardGrids[row][col].boardGridType === 0) {
        // 如果当前游戏步数少于6步
        if (humanPlayerSteps.length + aiPlayerSteps.length < 6) {
          // 当前位置距离1格以内必须有一个棋子 否则进行下个位置的判断
          if (!hasNeighbor(row, col, 1, 1, boardGrids)) continue
        } else {
          // 当前位置距离2格以内必须有一个棋子 否则进行下个位置的判断
          if (!hasNeighbor(row, col, 2, 1, boardGrids)) continue
        }
        // if (!generateLegalMoves(row, col, boardGrids)) {
        //   continue
        // }
        
        // 计算当前位置放置ai棋子的棋型分数
        boardGrids[row][col].boardGridType = aiChessType
        // const aiChessShapesCount = calculateSingleChessShapes(
        //   aiChessType,
        //   boardGrids,
        //   { row, col }
        // )
        const aiResult = evaluateSingleChessShapes(aiChessType, boardGrids, {
          row,
          col
        })
        // 计算当前位置放置人类棋子的棋型分数
        boardGrids[row][col].boardGridType = 3 - aiChessType
        // const humanChessShapesCount = calculateSingleChessShapes(
        //   3 - aiChessType,
        //   boardGrids,
        //   { row, col }
        // )
        const humanResult = evaluateSingleChessShapes(
          3 - aiChessType,
          boardGrids,
          {
            row,
            col
          }
        )
        // 撤销棋子
        boardGrids[row][col].boardGridType = 0

        // console.log('打印10，8的分数', scoreAI, scoreHuman)
        // boardGrids[row][col].value = Math.max(scoreAI, scoreHuman)
        // if (boardGrids[row][col].value < CHESS_SHAPES_SCORE.THREE) {
        //   continue
        // }

        // 用棋型个数来计算  别用分数
        const value = Math.max(aiResult.score, humanResult.score)
        if (aiResult.count.FIVE >= 1) {
          fives.push({ row, col, value })
        } else if (humanResult.count.FIVE >= 1) {
          fives.push({ row, col, value })
        } else if (aiResult.count.FOUR >= 1) {
          aiFours.push({ row, col, value })
        } else if (humanResult.count.FOUR >= 1) {
          humanFours.push({ row, col, value })
        } else if (aiResult.count.BLOCKED_FOUR >= 1) {
          aiBlockedFours.push({ row, col, value })
        } else if (humanResult.count.BLOCKED_FOUR >= 1) {
          humanBlockedFours.push({ row, col, value })
        } else if (aiResult.count.THREE >= 2) {
          aiTwoThrees.push({ row, col, value })
        } else if (humanResult.count.THREE >= 2) {
          humanTwoThrees.push({ row, col, value })
        } else if (aiResult.count.THREE >= 1) {
          aiThrees.push({ row, col, value })
        } else if (humanResult.count.THREE >= 1) {
          humanThrees.push({ row, col, value })
        } else if (aiResult.count.TWO >= 1) {
          aiTwos.unshift({ row, col, value })
        } else if (humanResult.count.TWO >= 1) {
          humanTwos.unshift({ row, col, value })
        } else {
          neighbors.push({ row, col, value })
        }
      }
    }
  }
  // 如果成五，是必杀棋，直接返回
  if (fives.length) {
    return fives
  }
  // if (chessType === aiChessType && aiFives.length) {
  //   if (chessType === 3 - aiChessType && humanFives.length) {
  //     return aiFives.concat(humanFives)
  //   }
  //   return aiFives
  // }
  // if (aiFives.length || humanFives.length) {
  //   return aiFives.concat(humanFives)
  // }

  // 先考虑必须下子的位置  直接返回
  // 第一种情况  对面有冲四  因为自己不能成五  所以直接考虑对方冲四
//   if (chessType === aiChessType && humanBlockedFours.length) {
//     return humanBlockedFours
//   }
//   if (chessType === 3 - aiChessType && aiBlockedFours.length) {
//     return aiBlockedFours
//   }
//   // 第二种情况 对面有活三  除非自己能成四  否则就考虑对面活三
//   if (
//     chessType === aiChessType &&
//     humanThrees.length &&
//     !aiFours.length &&
//     !aiBlockedFours.length
//   ) {
//     return humanThrees
//   }
//   if (
//     chessType === 3 - aiChessType &&
//     aiThrees.length &&
//     !humanFours.length &&
//     !humanBlockedFours.length
//   ) {
//     return aiThrees
//   }

  // 自己能活四，则直接活四，不考虑冲四
  if (chessType === aiChessType && aiFours.length) return aiFours
  if (chessType === 3 - aiChessType && humanFours.length) return humanFours

  // 对面有活四冲四，自己冲四都没，则只考虑对面活四 （此时对面冲四就不用考虑了)
  if (
    chessType === aiChessType &&
    humanFours.length &&
    !aiBlockedFours.length
  ) {
    return humanFours
  }
  if (
    chessType === 3 - aiChessType &&
    aiFours.length &&
    !humanBlockedFours.length
  ) {
    return aiFours
  }

  // 对面有活四自己有冲四，则都考虑下
  const fours =
    chessType === aiChessType
      ? aiFours.concat(humanFours)
      : humanFours.concat(aiFours)
  const blockedFours =
    chessType === aiChessType
      ? aiBlockedFours.concat(humanBlockedFours)
      : humanBlockedFours.concat(aiBlockedFours)
  if (fours.length) return fours.concat(blockedFours)

  // 对面有冲四 自己没有冲四 考虑对面冲四
  //   if (chessType === aiChessType && humanBlockedFours.length) {
  //     return humanBlockedFours
  //   }
  //   if (chessType === 3 - aiChessType && aiBlockedFours.length) {
  //     return aiBlockedFours
  //   }

  //   // 对面活三
  //   if (chessType === aiChessType && humanThrees.length) {
  //     return humanThrees
  //   }
  //   if (chessType === 3 - aiChessType && aiThrees.length) {
  //     return aiThrees
  //   }

  let result = []
  if (chessType === aiChessType) {
    result = aiTwoThrees
      .concat(humanTwoThrees)
      .concat(aiBlockedFours)
      .concat(humanBlockedFours)
      .concat(aiThrees)
      .concat(humanThrees)
  }
  if (chessType === 3 - aiChessType) {
    result = humanTwoThrees
      .concat(aiTwoThrees)
      .concat(humanBlockedFours)
      .concat(aiBlockedFours)
      .concat(humanThrees)
      .concat(aiThrees)
  }

  // 双三很特殊，因为能形成双三的不一定比一个活三强
  if (aiTwoThrees.length || humanTwoThrees.length) {
    return result
  }

  let twos = []
  if (chessType === aiChessType) {
    twos = aiTwos.concat(humanTwos)
  } else {
    twos = humanTwos.concat(aiTwos)
  }

  twos.sort((a, b) => {
    return b.value - a.value
  })
  result = result.concat(twos.length ? twos : neighbors)

  // 这种分数低的，就不用全部计算了
  if (result.length > 10) {
    return result.slice(0, 10)
  }

  return result
}

function sortLegalMoves (aiChessType, boardGrids) {
  // const legalMoves = generateLegalMoves(boardGrids)
  // for (let index = 0; index < legalMoves.length; index++) {
  //   legalMoves[index].score = evaluateSingleChessShapes(chessType, boardGrids, { row: legalMoves[index].row, col: legalMoves[index].col })
  // }
  // return legalMoves.sort((a, b) => {
  //   return b.score - a.score
  // })

  // const twoblockfours = []
  // const blockfour = []
  // else if (aiScore >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
  //   blockfour.unshift(legalMoves[index])
  // } else if (humanScore >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
  //   blockfour.push(legalMoves[index])
  // }
  // if (twoblockfours.length) {
  //   return twoblockfours
  // }
  // else if (aiScore >= 2 * CHESS_SHAPES_SCORE.FOUR) {
  //   twoblockfours.unshift(legalMoves[index])
  // } else if (humanScore >= 2 * CHESS_SHAPES_SCORE.FOUR) {
  //   twoblockfours.push(legalMoves[index])
  // }
  // ...blockfour,

  const legalMoves = generateLegalMoves(boardGrids)
  for (let index = 0; index < legalMoves.length; index++) {}
  if (fives.length) {
    return fives[0]
  }
  if (fours.length) {
    return fours[0]
  }

  // if (result.length > 30 ) {
  //   return result.slice(0, 30);
  // }

  return twothrees.concat(threes.concat(twos.concat(neighbors))).splice(0, 50)
  // .splice(0, 50)
  // return legalMoves
  // if (chessType === 1) {
  //   // MAX层从大到小排序
  //   return legalMoves.sort((a, b) => {
  //     return b.score - a.score
  //   })
  // } else {
  //   // MIN层从小到大排序
  //   return legalMoves.sort((a, b) => {
  //     return a.score - b.score
  //   })
  // }

  // const sortLegalMoves = legalMoves.sort((a, b) => {
  //   return b.score - a.score
  // })
  // return sortLegalMoves.length < 30 ? sortLegalMoves : sortLegalMoves.splice(0, 30)
  // .splice(0, 50)
}

function hasNeighbor (x, y, distance, count, boardGrids) {
  const len = boardGrids.length
  const startX = x - distance
  const endX = x + distance
  const startY = y - distance
  const endY = y + distance
  for (let i = startX; i <= endX; i++) {
    if (i < 0 || i >= len) continue
    for (let j = startY; j <= endY; j++) {
      if (j < 0 || j >= len) continue
      if (i === x && j === y) continue
      if (boardGrids[i][j].boardGridType !== 0) {
        count--
        if (count <= 0) return true
      }
    }
  }
  return false
}

export function generateLegalMoves (row, col, boardGrids) {
  const legalMoves = []
  //   for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
  //     for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
  const gridTypes = []
  //   if (boardGrids[row][col].boardGridType === 0) {
  // 横向各三格
  gridTypes.push(row - 1 >= 0 ? boardGrids[row - 1][col].boardGridType : 0)
  gridTypes.push(
    row + 1 < BOARD_GRIDS_COUNT ? boardGrids[row + 1][col].boardGridType : 0
  )
  gridTypes.push(col - 1 >= 0 ? boardGrids[row][col - 1].boardGridType : 0)
  gridTypes.push(
    col + 1 < BOARD_GRIDS_COUNT ? boardGrids[row][col + 1].boardGridType : 0
  )
  gridTypes.push(
    row - 1 >= 0 && col - 1 >= 0
      ? boardGrids[row - 1][col - 1].boardGridType
      : 0
  )
  gridTypes.push(
    row + 1 < BOARD_GRIDS_COUNT && col + 1 < BOARD_GRIDS_COUNT
      ? boardGrids[row + 1][col + 1].boardGridType
      : 0
  )
  gridTypes.push(
    row - 1 >= 0 && col + 1 < BOARD_GRIDS_COUNT
      ? boardGrids[row - 1][col + 1].boardGridType
      : 0
  )
  gridTypes.push(
    row + 1 < BOARD_GRIDS_COUNT && col - 1 >= 0
      ? boardGrids[row + 1][col - 1].boardGridType
      : 0
  )

  gridTypes.push(row - 2 >= 0 ? boardGrids[row - 2][col].boardGridType : 0)
  gridTypes.push(
    row + 2 < BOARD_GRIDS_COUNT ? boardGrids[row + 2][col].boardGridType : 0
  )
  gridTypes.push(col - 2 >= 0 ? boardGrids[row][col - 2].boardGridType : 0)
  gridTypes.push(
    col + 2 < BOARD_GRIDS_COUNT ? boardGrids[row][col + 2].boardGridType : 0
  )
  gridTypes.push(
    row - 2 >= 0 && col - 2 >= 0
      ? boardGrids[row - 2][col - 2].boardGridType
      : 0
  )
  gridTypes.push(
    row + 2 < BOARD_GRIDS_COUNT && col + 2 < BOARD_GRIDS_COUNT
      ? boardGrids[row + 2][col + 2].boardGridType
      : 0
  )
  gridTypes.push(
    row - 2 >= 0 && col + 2 < BOARD_GRIDS_COUNT
      ? boardGrids[row - 2][col + 2].boardGridType
      : 0
  )
  gridTypes.push(
    row + 2 < BOARD_GRIDS_COUNT && col - 2 >= 0
      ? boardGrids[row + 2][col - 2].boardGridType
      : 0
  )
  // gridTypes.push(
  //   row - 3 >= 0 ? boardGrids[row - 3][col].boardGridType : 0
  // )

  // gridTypes.push(
  //   row + 3 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row + 3][col].boardGridType
  //     : 0
  // )

  // 竖向各三格

  // gridTypes.push(
  //   col - 3 >= 0 ? boardGrids[row][col - 3].boardGridType : 0
  // )

  // gridTypes.push(
  //   col + 3 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row][col + 3].boardGridType
  //     : 0
  // )

  // 右斜各三格
  // gridTypes.push(
  //   row - 3 >= 0 && col - 3 >= 0
  //     ? boardGrids[row - 3][col - 3].boardGridType
  //     : 0
  // )

  // gridTypes.push(
  //   row + 3 < BOARD_GRIDS_COUNT && col + 3 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row + 3][col + 3].boardGridType
  //     : 0
  // )

  // 左斜各三格
  // gridTypes.push(
  //   row - 3 >= 0 && col + 3 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row - 3][col + 3].boardGridType
  //     : 0
  // )

  // gridTypes.push(
  //   row + 3 < BOARD_GRIDS_COUNT && col - 3 >= 0
  //     ? boardGrids[row + 3][col - 3].boardGridType
  //     : 0
  // )

  // 马步8个格
  // gridTypes.push(
  //   row - 1 >= 0 && col - 2 >= 0
  //     ? boardGrids[row - 1][col - 2].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row - 2 >= 0 && col - 1 >= 0
  //     ? boardGrids[row - 2][col - 1].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row + 1 < BOARD_GRIDS_COUNT && col - 2 >= 0
  //     ? boardGrids[row + 1][col - 2].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row + 2 < BOARD_GRIDS_COUNT && col - 1 >= 0
  //     ? boardGrids[row + 2][col - 1].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row - 2 >= 0 && col + 1 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row - 2][col + 1].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row - 1 >= 0 && col + 2 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row - 1][col + 2].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row + 2 < BOARD_GRIDS_COUNT && col + 1 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row + 2][col + 1].boardGridType
  //     : 0
  // )
  // gridTypes.push(
  //   row + 1 < BOARD_GRIDS_COUNT && col + 2 < BOARD_GRIDS_COUNT
  //     ? boardGrids[row + 1][col + 2].boardGridType
  //     : 0
  // )

  if (gridTypes.includes(1) || gridTypes.includes(2)) {
    //   legalMoves.push({
    //     row,
    //     col
    //   })
    return true
  }
  //   }
  // }
  //   }
  return false
  //   return legalMoves
}
