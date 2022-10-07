import { BOARD_GRIDS_COUNT, CHESS_SHAPE_SEARCH_RANGE, CHESS_TYPE_CROSS, CHESS_TYPE_CIRCLE } from '../constant'
import { CHESS_CROSS_SHAPES, CHESS_CIRCLE_SHAPES } from './chessShape'
import { occurrences } from '../util'

export function calculateSingleChessShapes (chessType, boardGrids, position) {
  // 找出某个棋格周围四个方向的棋子形成的棋型数量及类型
  // 每个方向分别找 9 个格子
  // 将计算出的结果push进结果数组 并返回
  
  // 获取己方阻碍类型
  const barrier = chessType === CHESS_TYPE_CROSS ? CHESS_TYPE_CIRCLE : CHESS_TYPE_CROSS
  // 获取己方静态棋型表
  const chessShapesTable = chessType === CHESS_TYPE_CROSS ? CHESS_CROSS_SHAPES : CHESS_CIRCLE_SHAPES
  // 获取当前棋子四个方向的棋型
  const singleChessShapes = getSingleChessShapes(boardGrids, position, barrier)

  return getSingleChessShapesCount(singleChessShapes, chessShapesTable)
}

function getSingleChessShapes (boardGrids, position, barrier) {
  // 得到当前位置
  const { row, col } = position
  // 保存四个方向的棋型
  const singleChessShapes = ['', '', '', '']
  for (let index = row - (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index <= row + (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1) {
      singleChessShapes[0] += barrier
    } else {
      singleChessShapes[0] += boardGrids[index][col].boardGridType
    }
  }

  for (let index = col - (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index <= col + (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1) {
      singleChessShapes[1] += barrier
    } else {
      singleChessShapes[1] += boardGrids[row][index].boardGridType
    }
  }

  for (let index = row - (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index <= row + (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1 || index - (row - col) < 0 || index - (row - col) > BOARD_GRIDS_COUNT - 1) {
      singleChessShapes[2] += barrier
    } else {
      singleChessShapes[2] += boardGrids[index][index - (row - col)].boardGridType
    }
  }

  for (let index = row - (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index <= row + (CHESS_SHAPE_SEARCH_RANGE - 1) / 2; index++) {
    if (index < 0 || index > BOARD_GRIDS_COUNT - 1 || row + col - index < 0 || row + col - index > BOARD_GRIDS_COUNT - 1) {
      singleChessShapes[3] += barrier
    } else {
      singleChessShapes[3] += boardGrids[index][row + col - index].boardGridType
    }
  }
  // console.log(singleChessShapes)

  return singleChessShapes
}

export function getSingleChessShapesCount (singleChessShapes, chessShapesTable) {
  let chessShapesCount = {
    // 长连：连成五个以上已方棋子
    // LONG_ROW: 0,
    // 连五（长连也算连五的情况，所以不用单独判断长连了）
    FIVE: 0,
    // 活四
    FOUR: 0,
    // 双冲四 （威胁度相当于一个活四）
    // DOUBLE_BLOCKED_FOUR: 0,
    // 冲四
    BLOCKED_FOUR: 0,
    // 活三
    THREE: 0,
    // 眠三
    BLOCKED_THREE: 0,
    // 活二
    TWO: 0,
    // 眠二
    BLOCKED_TWO: 0,
    // 活一
    ONE: 0,
    // 眠一
    BLOCKED_ONE: 0
  }
  singleChessShapes.forEach((singleChessShape) => {
    for (const chessShapeName in chessShapesCount) {
      if (chessShapesCount.hasOwnProperty(chessShapeName)) {
        if (checkChessShape(singleChessShape, chessShapeName, chessShapesTable)) {
          chessShapesCount[chessShapeName] += 1
          break
        }
      }
    }
  })
  // console.log(chessShapesCount)
  return chessShapesCount
    // // 连五
    // if (x(chessShape, 'FIVE', chessType)) {
    //   chessShapeCount.FIVE += 1
    //   return
    // }
    // if (x(chessShape, 'FOUR', chessType)) {
    //   // 活四
    //   chessShapeCount.FOUR += 1
    //   return
    // }
    // if (x(chessShape, chessShapeCount, 'DOUBLE_BLOCKED_FOUR', chessType)) {
    //   // 双冲四
    //   chessShapeCount.DOUBLE_BLOCKED_FOUR += 1
    //   return
    // }
    // if (x(chessShape, 'BLOCKED_FOUR', chessType)) {
    //   // 冲四
    //   chessShapeCount.BLOCKED_FOUR += 1
    //   return
    // }
    // if (x(chessShape, 'THREE', chessType)) {
    //   chessShapeCount.THREE += 1
    //   return
    // }
    // if (x(chessShape, 'BLOCKED_THREE', chessType)) {
    //   chessShapeCount.BLOCKED_THREE += 1
    //   return
    // }
    // if (x(chessShape, 'TWO', chessType)) {
    //   chessShapeCount.TWO += 1
    //   return
    // }
    // if (x(chessShape, 'BLOCKED_TWO', chessType)) {
    //   chessShapeCount.BLOCKED_TWO += 1
    //   return
    // }
    // if (x(chessShape, 'ONE', chessType)) {
    //   chessShapeCount.ONE += 1
    //   return
    // }
    // if (x(chessShape, 'BLOCKED_ONE', chessType)) {
    //   chessShapeCount.BLOCKED_ONE += 1
    //   return
    // }
}

function checkChessShape (chessShape, chessShapeName, chessShapesTable) {
  // 棋型判断函数
  // 同级别棋型只要匹配成功其中一个，跳过其他棋型的匹配
  for (let index = 0; index < chessShapesTable[chessShapeName].length; index++) {
    if (chessShape.indexOf(chessShapesTable[chessShapeName][index]) !== -1) {
      // chessShapeCount[CHESS_SHAPE] += 1
      return true
    }
  }
  return false
  // 获取当前有多少个己方棋子
  // const count = y(leftRightChessShape, chessType)
  // const str = CHESS_CROSS_SHAPES[CHESS_SHAPE][index]
  // if (leftRightChessShape.indexOf(str) !== -1) {
  //   chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, str, true)
  //   if (str !== [...str].reverse().join('')) {
  //     if (
  //       leftRightChessShape.indexOf([...str].reverse().join('')) !== -1 &&
  //       chessCount < count
  //     ) {
  //       chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, [...str].reverse().join(''), true)
  //     }
  //   }
  // } else if (leftRightChessShape.indexOf([...str].reverse().join('')) !== -1) {
  //   chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, [...str].reverse().join(''), true)
  //   if ([...str].reverse().join('') !== str) {
  //     if (leftRightChessShape.indexOf(str) !== -1 && chessCount < count) {
  //       chessShapeCount[CHESS_SHAPE] += occurrences(leftRightChessShape, str, true)
  //     }
  //   }
  // } else {
  //   continue
  // }

  // if (
  //   CHESS_CROSS_SHAPES[CHESS_SHAPE][index] !==
  //     [...CHESS_CROSS_SHAPES[CHESS_SHAPE][index]].reverse().join('') &&
  //   leftRightChessShape.indexOf(
  //     [...CHESS_CROSS_SHAPES[CHESS_SHAPE][index]].reverse().join('')
  //   ) !== -1
  // ) {
  //   chessShapeCount[CHESS_SHAPE] += 1
  // }
}

function y (leftRightChessShape, chessType) {
  const arr = leftRightChessShape.split('')
  let count = 0
  for (let index = 0; index < arr.length; index++) {
    if (parseInt(arr[index]) === chessType) {
      count++
    }
  }
  return count
}

export function calculateAllChessShapes (chessType, boardGirds) {
  const aiChessShapesTable = chessType === CHESS_TYPE_CROSS ? CHESS_CROSS_SHAPES : CHESS_CIRCLE_SHAPES
  const humanChessShapesTable = chessType === CHESS_TYPE_CROSS ? CHESS_CIRCLE_SHAPES : CHESS_CROSS_SHAPES
  const allChessShapes = getAllChessShapes(boardGirds)

  // console.log(allChessShapes)

  return getAllChessShapesCount(allChessShapes, humanChessShapesTable, aiChessShapesTable)
}

function getAllChessShapes (boardGrids) {
  // 分别判断当前棋局下人类与AI棋子形成的棋型数量

  // 保存所有路数的棋型
  const allChessShapes = []

  // 扫描所有列
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    let colChessShape = ''
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      colChessShape += boardGrids[row][col].boardGridType
    }
    allChessShapes.push(colChessShape)
  }

  // 扫描所有行
  for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
    let rowChessShape = ''
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      rowChessShape += boardGrids[row][col].boardGridType
    }
    allChessShapes.push(rowChessShape)
  }

  // 扫描所有左对角线
  for (let index = 0; index <= 2 * (BOARD_GRIDS_COUNT - 1); index++) {
    let leftDiagonalChessShape = ''
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
        if (row + col === index) {
          leftDiagonalChessShape += boardGrids[row][col].boardGridType
          break
        }
      }
    }
    allChessShapes.push(leftDiagonalChessShape)
  }

  // 扫描所有右对角线
  for (let index = 1 - BOARD_GRIDS_COUNT; index < BOARD_GRIDS_COUNT; index++) {
    let rightDiagonalChessShape = ''
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
        if (row - col === index) {
          rightDiagonalChessShape += boardGrids[row][col].boardGridType
          break
        }
      }
    }
    allChessShapes.push(rightDiagonalChessShape)
  }

  return allChessShapes
}

// 29 + 29 + 15 + 15
// 0,0 1,0 2,0 3,0
// 0,1 1,1 2,1 3,1
// 0,2 1,2 2,2 3,2
// 0,3 1,3 2,3 3,3

function getAllChessShapesCount (allChessShapes, humanChessShapesTable, aiChessShapesTable) {
  // 当前棋局双方所有棋型数量
  let chessShapesCount = {
    // 长连：连成五个或以上已方棋子
    // LONG_ROW: {
    //   HUMAN: 0,
    //   AI: 0
    // },
    // 连五
    FIVE: {
      HUMAN: 0,
      AI: 0
    },
    // 活四
    FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 冲四
    BLOCKED_FOUR: {
      HUMAN: 0,
      AI: 0
    },
    // 活三
    THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 眠三
    BLOCKED_THREE: {
      HUMAN: 0,
      AI: 0
    },
    // 活二
    TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 眠二
    BLOCKED_TWO: {
      HUMAN: 0,
      AI: 0
    },
    // 活一
    ONE: {
      HUMAN: 0,
      AI: 0
    },
    // 眠一
    BLOCKED_ONE: {
      HUMAN: 0,
      AI: 0
    }
  }
  
  allChessShapes.forEach((chessShape) => {
    for (const chessShapeName in chessShapesCount) {
      if (chessShapesCount.hasOwnProperty(chessShapeName)) {
        if (checkChessShape(chessShape, chessShapeName, humanChessShapesTable)) {
          chessShapesCount[chessShapeName].HUMAN += 1
        }
        if (checkChessShape(chessShape, chessShapeName, aiChessShapesTable)) {
          chessShapesCount[chessShapeName].AI += 1
        }
      }
    }
  })
  // console.log(chessShapesCount)
  return chessShapesCount
}