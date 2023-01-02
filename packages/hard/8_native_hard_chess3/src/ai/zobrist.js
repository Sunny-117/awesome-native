import { BOARD_GRIDS_COUNT, UNKNOWN_VAL } from '../constant'
// import { Random } from "random-js";

  // var z = new Zobrist();
  // z.init();

  // export default class Zobrist {
  //   constructor(size) {
  //     this.size = size || BOARD_GRIDS_COUNT;
  //     const Random = require("random-js");
  //     this.random = new Random.Random(Random.MersenneTwister19937.autoSeed());
  //   }

  //   init() {
  //     this.com = [];
  //     this.hum = [];
  //     for (let i = 0; i < this.size * this.size; i++) {
  //       this.com.push(this._rand());
  //       this.hum.push(this._rand());
  //     }

  //     this.code = this._rand();
  //   }

  //   _rand() {
  //     return this.random.integer(1, 1000000000); //再多一位就溢出了。。
  //   }

  //   go(x, y, aiChessType, chessType) {
  //     // console.log(aiChessType, chessType)
  //     const index = this.size * x + y;
  //     this.code ^= chessType == aiChessType ? this.com[index] : this.hum[index];
  //     return this.code;
  //   }
  // }

  /**
 * @fileOverview 采用深度搜索，会面临很多相同的局面，将评估过的局面存入置换表，下次遇到可以直接从表中调取得分。事实上抽象的数据结构是一个哈希表，这里采用 Object 实现，用 Map 会更直观一些，待有时间重构时可能会考虑更改。置换表采用的策略是用内存空间换取CPU计算时间。
 */
  /**
 * 置换表模块，由 T_Tbale 一个类构成，详见该类
 * @module Zobrist
 */
  ;('use strict')
/**
 * 置换表类
 * @see <a href='https://en.wikipedia.org/wiki/Transposition_table'>Transposition_table</a>
 */
export default class Zobrist {
  /**
   * Create a t_table
   * 数据结构方面，散列查找使用哈希表，连续小数据采用数组
   */
  constructor () {
    this.trans_table = new Map()
    this.hash_key = 0
    this.hash_checksum = 0
    this.size = 50e7
    this.hash_lookup = Zobrist.zobristInit()
    this.killTable = []
  }

  initKillTable () {
    this.killTable = []
  }

  /**
   * 使用置换表最大的问题是如何设计一套规则表示独特的局面避免冲突，Zobrist 算法是实现之一。该算法首先对棋盘所有位置相应的棋子类型分别生成32位和64位两组随机数，并将所有棋盘上的棋子两组随机数分别相加，32位的随机数%哈希表作为键，64位的随机数作为 checksum，存在值的对象中。之后每走一步就只针对最后一步变化做增量减量计算，可以使用位运算，也可以使用加减（这里是抽象的算法，不涉及语言）。
   * @see <a href='https://en.wikipedia.org/wiki/Zobrist_hashing'>Zobrist Hashing on wiki</a>
   * @returns {Array}
   */
  static zobristInit () {
    const zobrist = []
    for (let i = BOARD_GRIDS_COUNT; i--;) {
      zobrist.push(Array.from({ length: BOARD_GRIDS_COUNT }))
    }
    for (let i = 0; i < BOARD_GRIDS_COUNT; i++) {
      for (let j = 0; j < BOARD_GRIDS_COUNT; j++) {
        zobrist[i][j] = [[], []]
        for (let k = 0; k < 2; k++) {
          zobrist[i][j][k][0] = Math.floor(Math.random() * 10e12)
          zobrist[i][j][k][1] = Math.floor(Math.random() * 10e12)
        }
      }
    }
    return zobrist
  }

  /**
   * 调用搜索函数前，先计算当前棋盘的哈希值，每次下棋前都对棋盘重新计算，因为只进行一次，代价不会太高，可以少保存一个变量，也可以让玩家下子和AI计算之间的耦合更松，方便悔棋等的操作
   * @param board {array} 当前棋盘
   */
  calculateInitHashKey (board) {
    let stone
    this.hash_key = 0
    this.hash_checksum = 0
    for (let i = 0; i < BOARD_GRIDS_COUNT; i++) {
      for (let j = 0; j < BOARD_GRIDS_COUNT; j++) {
        stone = board[i][j].boardGridType
        if (stone !== 0) {
          this.hash_key += stone
            ? this.hash_lookup[i][j][1][0]
            : this.hash_lookup[i][j][0][0]
          this.hash_checksum += stone
            ? this.hash_lookup[i][j][1][1]
            : this.hash_lookup[i][j][0][1]
        }
      }
    }
  }

  /**
   * 新下一个棋子，计算新的棋盘哈希值，采用加法计算，JS在位运算时需要转换数值类型，且目前位数超过32位，未采用位运算, 本程序中还加了一层判断，在键相同的同时只有搜索深度相等时才算命中（有的程序采用的是奇偶相同（敌我）算命中），这样会减少一定的命中次数，但相同层数的命中才是更普遍的。而且这样有一个好处即是能够减少冲突，也避免了两个随机数拼接成字符串对性能的影响
   * @param entry {Array}  当前棋子坐标
   * @param board {Array}  当前棋盘
   */
  hashMakeMove (move, board) {
    const { row, col } = move
    const stone = board[row][col].boardGridType
    this.hash_key += stone
      ? this.hash_lookup[row][col][1][0]
      : this.hash_lookup[row][col][0][0]
    this.hash_checksum += stone
      ? this.hash_lookup[row][col][1][1]
      : this.hash_lookup[row][col][0][1]
  }

  /**
   * AI取消一个棋子
   * @param entry {Array}
   * @param board {Array}
   */
  hashUnMakeMove (move, board) {
    const { row, col } = move
    const stone = board[row][col].boardGridType
    this.hash_key -= stone
      ? this.hash_lookup[row][col][1][0]
      : this.hash_lookup[row][col][0][0]
    this.hash_checksum -= stone
      ? this.hash_lookup[row][col][1][1]
      : this.hash_lookup[row][col][0][1]
  }

  /**
   * 查看当前局面是否在哈希表中，存储的节点分为三种，即精确计算过的值和剪枝得到的上下边界
   * @param alpha {number}
   * @param beta  {number}
   * @param depth {number}
   * @returns {number}
   */
  lookUpHashTable (alpha, beta, depth) {
    const n = this.hash_key % this.size
    if (this.trans_table.has(n)) {
      // if (!this.trans_table.has(n)) return 404404
      const entry = this.trans_table.get(n)
      // if (entry[3] !== depth) return 404404
      if (entry[0] === this.hash_checksum) {
        if (entry[3] >= depth) {
          switch (entry[1]) {
            case 0: // 确切值
              return entry[2]
            case 1: // lower_bound
              if (entry[2] >= beta) {
                return beta
              }
              break
            case -1: // upper_bound
              if (entry[2] <= alpha) {
                return alpha
              }
              break
          }
        }
      }
    }
    return UNKNOWN_VAL // 不存在，返回一个不在评分范围内的约定值
  }

  /**
   * 将数据存入哈希表
   * @param type {string}
   * @param value {number}
   * @param depth {number}
   */
  enterHashTable (type, value, depth) {
    const n = this.hash_key % this.size
    this.trans_table.set(n, [this.hash_checksum, type, value, depth])
  }
}

/** export the instance of T_Table  */
// export let t_table = new T_Table()
