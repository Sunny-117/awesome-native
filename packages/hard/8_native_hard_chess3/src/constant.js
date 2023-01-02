// 棋格颜色
const BOARD_GRID_COLOR = '#34495e'

const BOARD_GRID_ACTIVE_COLOR = 'rgb(255, 255, 102, .2)'

// 每行、每列棋格数
const BOARD_GRIDS_COUNT = 15

// 棋格间隙
const BOARD_GRIDS_GAP = 1

// 棋格类型
const BOARD_GRID_TYPE_DEFAULT = 0
const BOARD_GRID_TYPE_CIRCLE = 'CIRCLE'
const BOARD_GRID_TYPE_CROSS = 'CROSS'

const PLAYER_TYPE_HUMAN = 1

const PLAYER_TYPE_AI = 0

// 棋格圆角弧度
const BOARD_GRID_RADIUS = 4

// cross类型的棋子（先手）
const CHESS_TYPE_CROSS = 1

// circle类型的棋子（后手）
const CHESS_TYPE_CIRCLE = 2

// 绘制棋子的函数名
const DRAW_CHESS_FUNC = {
  CROSS: 'DRAW_CROSS_CHESS',
  CIRCLE: 'DRAW_CIRCLE_CHESS'
}

const CHESS_CIRCLE_COLOR = '#e74c3c'

const CHESS_CROSS_COLOR = '#2ecc71'

const CHESS_CROSS_LINECAP = 'round'

// 棋子默认大小
const BOARD_GRID_CHESS_DEFAULT_SIZE = 20

// 棋子默认线宽
const BOARD_GRID_CHESS_DEFAULT_LINEWIDTH = 3

// 默认棋格大小
const BOARD_GRID_DEFAULT_SIZE = 34

// 棋格大小变化量
const BOARD_GRID_RESIZE_COUNT = 4

const BOARD_GRID_MIN_SIZE = 22

const BOARD_GRID_MAX_SIZE = 42

// 屏幕宽度范围
// 最小宽度只适配到 320px
const SCREEN_WIDTH_RANGE = [1440, 1024, 768, 480, 375]

const CHESS_SHAPE_SEARCH_RANGE = 9

const INFINITY = 999999999

// 小于-INFINITY 或大于 INFINITY
const UNKNOWN_VAL = 9999999999

const BOARD_SCORES = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

export {
  UNKNOWN_VAL,
  BOARD_SCORES,
  INFINITY,
  CHESS_SHAPE_SEARCH_RANGE,
  BOARD_GRID_COLOR,
  BOARD_GRID_ACTIVE_COLOR,
  BOARD_GRIDS_COUNT,
  BOARD_GRIDS_GAP,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_TYPE_CIRCLE,
  BOARD_GRID_TYPE_CROSS,
  BOARD_GRID_RADIUS,
  PLAYER_TYPE_HUMAN,
  PLAYER_TYPE_AI,
  CHESS_TYPE_CROSS,
  CHESS_TYPE_CIRCLE,
  DRAW_CHESS_FUNC,
  CHESS_CIRCLE_COLOR,
  CHESS_CROSS_COLOR,
  CHESS_CROSS_LINECAP,
  BOARD_GRID_CHESS_DEFAULT_SIZE,
  BOARD_GRID_CHESS_DEFAULT_LINEWIDTH,
  BOARD_GRID_DEFAULT_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_MIN_SIZE,
  BOARD_GRID_MAX_SIZE,
  SCREEN_WIDTH_RANGE
}
