/*
 * 算杀
 * 算杀的原理和极大极小值搜索是一样的
 * 不过算杀只考虑冲四活三这类对方必须防守的棋
 * 因此算杀的复杂度虽然是 M^N ，但是底数M特别小，可以算到16步以上的杀棋。
 * VCT 连续活三胜
 * VCF 连续冲四胜利
 */

/*
 * 基本思路
 * 电脑有活三或者冲四，认为是玩家必须防守的
 * 玩家防守的时候却不一定根据电脑的棋来走，而是选择走自己最好的棋，比如有可能是自己选择冲四
 */

// import R from './role.js'
import { CHESS_SHAPES_SCORE } from './score.js'
// import config from './config.js'
// import zobrist from './zobrist.js'
// import debug from './debug.js'
// import board from './board.js'
import { BOARD_GRIDS_COUNT } from '../constant'
import { evaluateSingleChessShapes } from './evaluate'

var Cache = {
  vct: {},
  vcf: {}
}

var debugNodeCount = 0

let MAX_SCORE = CHESS_SHAPES_SCORE.THREE
let MIN_SCORE = CHESS_SHAPES_SCORE.FOUR

// var debugCheckmate = (debug.checkmate = {
//   cacheCount: 0, // cache 总数

//   totalCount: 0, // 算杀总数
//   cacheHit: 0 // 缓存命中
// })

let lastMaxPoint = null
let lastMinPoint = null

// 找到所有比目标分数大的位置
// 注意，不止要找自己的，还要找对面的，
const findMax = (chessType, aiChessType, score, boardGrids) => {
  const result = []
  const fives = []
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      if (boardGrids[row][col].boardGridType === 0) {
        const p = { row, col }
        // 计算当前位置放置ai棋子的棋型分数
        boardGrids[row][col].boardGridType = aiChessType
        const aiScore = evaluateSingleChessShapes(aiChessType, boardGrids, {
          row,
          col
        })
        // 计算当前位置放置人类棋子的棋型分数
        boardGrids[row][col].boardGridType = 3 - aiChessType
        const humanScore = evaluateSingleChessShapes(
          3 - aiChessType,
          boardGrids,
          {
            row,
            col
          }
        )
        // 撤销棋子
        boardGrids[row][col].boardGridType = 0

        // 注意，防一手对面冲四
        // 所以不管谁能连成五，先防一下。
        if (humanScore >= CHESS_SHAPES_SCORE.FIVE) {
          p.value = CHESS_SHAPES_SCORE.FIVE
          if (chessType === aiChessType) p.value *= -1
          fives.push(p)
        } else if (aiScore >= CHESS_SHAPES_SCORE.FIVE) {
          p.value = CHESS_SHAPES_SCORE.FIVE
          if (chessType === 3 - aiChessType) p.value *= -1
          fives.push(p)
        } else {
          if (
            !lastMaxPoint ||
            (row === lastMaxPoint[0] ||
              col === lastMaxPoint[1] ||
              Math.abs(row - lastMaxPoint[0]) ===
                Math.abs(col - lastMaxPoint[1]))
          ) {
            const s = chessType === aiChessType ? aiScore : humanScore
            p.value = s
            if (s >= score) {
              result.push(p)
            }
          }
        }
      }
    }
  }
  // 能连五，则直接返回
  // 但是注意不要碰到连五就返回，而是把所有连五的点都考虑一遍，不然可能出现自己能连却防守别人的问题
  if (fives.length) return fives
  // 注意对结果进行排序
  result.sort((a, b) => {
    return b.value - a.value
  })
  return result
}

// MIN层
// 找到所有比目标分数大的位置
// 这是MIN层，所以己方分数要变成负数
const findMin = (chessType, aiChessType, score, boardGrids) => {
  let result = []
  const fives = []
  const fours = []
  const blockedfours = []
  for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
    for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
      if (boardGrids[row][col].boardGridType === 0) {
        let p = { row, col }
        // 计算当前位置放置ai棋子的棋型分数
        boardGrids[row][col].boardGridType = aiChessType
        const aiScore = evaluateSingleChessShapes(aiChessType, boardGrids, {
          row,
          col
        })
        // 计算当前位置放置人类棋子的棋型分数
        boardGrids[row][col].boardGridType = 3 - aiChessType
        const humanScore = evaluateSingleChessShapes(
          3 - aiChessType,
          boardGrids,
          {
            row,
            col
          }
        )
        // 撤销棋子
        boardGrids[row][col].boardGridType = 0

        const s1 = chessType === aiChessType ? aiScore : humanScore
        const s2 = chessType === aiChessType ? humanScore : aiScore
        if (s1 >= CHESS_SHAPES_SCORE.FIVE) {
          p.value = -s1
          return [p]
        }

        if (s2 >= CHESS_SHAPES_SCORE.FIVE) {
          p.value = s2
          fives.push(p)
          continue
        }

        if (s1 >= CHESS_SHAPES_SCORE.FOUR) {
          p.value = -s1
          fours.unshift(p)
          continue
        }
        if (s2 >= CHESS_SHAPES_SCORE.FOUR) {
          p.value = s2
          fours.push(p)
          continue
        }

        if (s1 >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
          p.value = -s1
          blockedfours.unshift(p)
          continue
        }
        if (s2 >= CHESS_SHAPES_SCORE.BLOCKED_FOUR) {
          p.value = s2
          blockedfours.push(p)
          continue
        }

        if (s1 >= score || s2 >= score) {
          p = { row, col }
          p.value = s1
          result.push(p)
        }
      }
    }
  }
  if (fives.length) return fives

  // 注意冲四，因为虽然冲四的分比活四低，但是他的防守优先级是和活四一样高的，否则会忽略冲四导致获胜的走法
  if (fours.length) return fours.concat(blockedfours)

  // 注意对结果进行排序
  // 因为fours可能不存在，这时候不要忽略了 blockedfours
  result = blockedfours.concat(result)
  result.sort(function (a, b) {
    return Math.abs(b.value) - Math.abs(a.value)
  })
  return result
}

const max = (chessType, aiChessType, deep, totalDeep, boardGrids) => {
  debugNodeCount++
  // board.logSteps();
  if (deep <= 1) return false

  const points = findMax(chessType, aiChessType, MAX_SCORE, boardGrids)
  if (points.length && points[0].value >= CHESS_SHAPES_SCORE.FOUR) {
    return [points[0]]
  } // 为了减少一层搜索，活四就行了。
  if (points.length === 0) return false
  for (let i = 0; i < points.length; i++) {
    // var p = points[i]
    boardGrids[points[i].row][points[i].col].boardGridType = chessType
    // 如果是防守对面的冲四，那么不用记下来
    if (!points[i].value <= -CHESS_SHAPES_SCORE.FIVE) lastMaxPoint = points[i]
    const m = min(3 - chessType, deep - 1)
    boardGrids[points[i].row][points[i].col].boardGridType = 0
    if (m) {
      if (m.length) {
        m.unshift(points[i]) // 注意 unshift 方法返回的是新数组长度，而不是新数组本身
        return m
      } else {
        return [points[i]]
      }
    }
  }
  return false
}

// 只要有一种方式能防守住，就可以了
const min = (chessType, aiChessType, deep, boardGrids) => {
  // debugNodeCount++
  //   var w = board.win()
  //   if (w == role) return false
  //   if (w == R.reverse(role)) return true
  if (deep <= 1) return false
  const points = findMin(chessType, aiChessType, MIN_SCORE, boardGrids)
  if (points.length === 0) return false
  if (points.length && -1 * points[0].value >= CHESS_SHAPES_SCORE.FOUR) {
    return false
  } // 为了减少一层搜索，活四就行了。

  const cands = []
  for (let i = 0; i < points.length; i++) {
    // var p = points[i]
    boardGrids[points[i].row][points[i].col].boardGridType = chessType
    lastMinPoint = points[i]
    const m = max(3 - chessType, deep - 1)
    boardGrids[points[i].row][points[i].col].boardGridType = 0
    if (m) {
      m.unshift(points[i])
      cands.push(m)
      continue
    } else {
      return false // 只要有一种能防守住
    }
  }
  const result = cands[Math.floor(cands.length * Math.random())] // 无法防守住
  return result
}

var cache = function (result, vcf, zobrist) {
  //   if (!config.cache) return
  if (vcf) Cache.vcf[zobrist.hash_key] = result
  else Cache.vct[zobrist.hash_key] = result
//   debugCheckmate.cacheCount++
}
var getCache = function (vcf, zobrist) {
  //   if (!config.cache) return
//   debugCheckmate.totalCount++
  var result
  if (vcf) result = Cache.vcf[zobrist.hash_key]
  else result = Cache.vct[zobrist.hash_key]
//   if (result) debugCheckmate.cacheHit++
  return result
}

// 迭代加深
const deeping = (chessType, aiChessType, deep, totalDeep, boardGrids) => {
  const start = new Date()
  let result = null
  debugNodeCount = 0
  for (let i = 1; i <= deep; i++) {
    lastMaxPoint = undefined
    lastMinPoint = undefined
    result = max(chessType, aiChessType, i, deep, boardGrids)
    if (result) break // 找到一个就行
  }
  const time = Math.round(new Date() - start)
  if (result) {
    console.log('算杀成功')
    // config.log && console.log("算杀成功("+time+"毫秒, "+ debugNodeCount + "个节点):" + JSON.stringify(result));
  } else {
    // console.log("算杀失败("+time+"毫秒)")
    // console.log('算杀失败')
  }
  return result
}

const vcx = (chessType, aiChessType, deep, onlyFour, boardGrids) => {
  //   deep = deep === undefined ? config.vcxDeep : deep

  if (deep <= 0) return false

  let result = null
  if (onlyFour) {
    // 计算冲四赢的
    MAX_SCORE = CHESS_SHAPES_SCORE.BLOCKED_FOUR
    MIN_SCORE = CHESS_SHAPES_SCORE.FIVE

    result = deeping(chessType, aiChessType, deep, deep, boardGrids)
    if (result) {
      result.val = CHESS_SHAPES_SCORE.FOUR
      return result
    }
    return false
  } else {
    // 计算通过 活三 赢的；
    MAX_SCORE = CHESS_SHAPES_SCORE.THREE
    MIN_SCORE = CHESS_SHAPES_SCORE.BLOCKED_FOUR
    result = deeping(chessType, aiChessType, deep, deep, boardGrids)
    if (result) {
      result.val = CHESS_SHAPES_SCORE.THREE * 2 // 连续冲三赢，就等于是双三
    }
    return result
  }
  return false
}

// 连续冲四
export const vcf = (chessType, aiChessType, deep, boardGrids, zobrist) => {
  var c = getCache(true, zobrist)
  if (c) return c
  const result = vcx(chessType, aiChessType, deep, true, boardGrids)
  cache(result, true, zobrist)
  return result
}

// 连续活三
export const vct = (chessType, aiChessType, deep, boardGrids, zobrist) => {
  var c = getCache(false, zobrist)
  if (c) return c
  const result = vcx(chessType, aiChessType, deep, false, boardGrids)
  cache(result, false, zobrist)
  return result
}

// export default {
//   vct: vct,
//   vcf: vcf
// }
