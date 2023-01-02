/**
 * @fileOverview 历史启发， 简言之在评估节点时，如果该节点引发剪枝，说明先评估该节点可能增加搜索效率，故增加其权重。越靠近根节点引发剪枝的，权重越高。历史启发不像杀手启发那样需要依赖棋类知识。
 */
'use strict'
/**
 * 历史启发模块，由 History 一个类构成，详见该类
 * @module History
 */
/**
 * 历史启发类
 * @see <a href="https://chessprogramming.wikispaces.com/History+Heuristic">History Heuristic</a>
 */
export default class History {
  constructor () {
    /**
     * @type {Array}
     */
    this.history_score = []
    /**
     * @type {Array}
     */
    this.m_TargetBuff = []
  }

  /**
   * 清除历史得分
   */
  clearHistoryScore () {
    for (let i = 0; i < 15; i++) {
      if (!this.history_score[i]) { this.history_score.push(Array.from({ length: 15 })) }
      for (let j = 0; j < 15; j++) {
        this.history_score[i][j] = 0
      }
    }
  }

  /**
   * 增加历史得分记录
   */
  enterHistoryScore (move, depth) {
    const { row, col } = move
    this.history_score[row][col] += Math.pow(2, depth)
  }

  /**
   * 获取历史得分
   * @param pos {Array}
   */
  getHistoryScore (move) {
    const { row, col } = move
    return this.history_score[row][col]
  }

  // 以下几个函数排序用，采用的是归并排序 mergeSort 供外部调用，实际上棋盘上一共才225个位置，而且限定了走法范围，排序数组远小于这个规模，冒泡排序问题不大，看到有资料用这个，用来试试
  static mergeAZ (source, target, l, m, r) {
    let i = l

    let j = m + 1

    let k = l
    while (i <= m && j <= r) {
      if (source[i].score <= source[j].score) {
        target[k++] = source[i++]
      } else {
        target[k++] = source[j++]
      }
    }
    if (i > m) {
      for (let q = j; q <= r; q++) {
        target[k++] = source[q]
      }
    } else {
      for (let q = i; q <= m; q++) {
        target[k++] = source[q]
      }
    }
  }

  static mergeZA (source, target, l, m, r) {
    let i = l

    let j = m + 1

    let k = l
    while (i <= m && j <= r) {
      if (source[i].score >= source[j].score) {
        target[k++] = source[i++]
      } else {
        target[k++] = source[j++]
      }
    }
    if (i > m) {
      for (let q = j; q <= r; q++) {
        target[k++] = source[q]
      }
    } else {
      for (let q = i; q <= m; q++) {
        target[k++] = source[q]
      }
    }
  }

  static mergePass (source, target, s, n, direction) {
    let i = 0
    while (i <= n - 2 * s) {
      if (direction) {
        this.mergeAZ(source, target, i, i + s - 1, i + 2 * s - 1)
      } else {
        this.mergeZA(source, target, i, i + s - 1, i + 2 * s - 1)
      }
      i = i + 2 * s
    }
    if (i + s < n) {
      if (direction) {
        this.mergeAZ(source, target, i, i + s - 1, n - 1)
      } else {
        this.mergeZA(source, target, i, i + s - 1, n - 1)
      }
    } else {
      for (let j = i; j <= n - 1; j++) {
        target[j] = source[j]
      }
    }
  }

  /**
   * 供调用的排序API
   * @param source
   * @param n
   * @param direction
   */
  mergeSort (source, n, direction) {
    let s = 1
    while (s < n) {
      History.mergePass(source, this.m_TargetBuff, s, n, direction)
      s += s
      History.mergePass(this.m_TargetBuff, source, s, n, direction)
      s += s
    }
  }
}
/**
 * @type {H_Heuristic}
 */
// export let h_heuristic = new H_Heuristic()
