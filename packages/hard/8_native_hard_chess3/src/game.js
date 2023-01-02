import Canvas from './canvas'
import Scene from './scene'
import Board from './board'
import Player from './player'
import AI from './ai/ai'
import { checkChessShape, calculateSingleChessShapes } from './ai/situation'
import {
  CHESS_TYPE_CROSS,
  CHESS_TYPE_CIRCLE,
  BOARD_GRIDS_COUNT,
  BOARD_GRID_TYPE_DEFAULT,
  BOARD_GRID_MIN_SIZE,
  BOARD_GRID_RESIZE_COUNT,
  BOARD_GRID_MAX_SIZE,
  PLAYER_TYPE_HUMAN,
  PLAYER_TYPE_AI,
  SCREEN_WIDTH_RANGE,
  BOARD_GRID_DEFAULT_SIZE
} from './constant'

/**
 * 游戏主体控制类
 * 初始化棋盘、棋子，定义游戏相关属性、方法
 * 本五子棋采用无禁手的原始规则（Free-style），规则具体细节可参考wiki
 */
export default class Game {
  constructor () {
    // 创建画布
    this.gameCanvas = new Canvas()
    // 创建场景
    this.gameScene = new Scene()
    // 创建棋盘
    this.gameBoard = new Board()
    // 创建AI
    this.gameAI = new AI()
  }

  initGame (boardGridSize) {
    // 是否开始游戏
    // this.isGameStart = false
    // 是否结束游戏
    // this.isGameEnd = false
  }

  initGamePlayer (humanPlayerChessType, aiPlayerChessType) {
    // 创建人类玩家
    this.gameHumanPlayer = new Player(
      PLAYER_TYPE_HUMAN,
      humanPlayerChessType,
      false
    )
    // 创建AI玩家 默认AI为 circle 棋子
    this.gameAIPlayer = new Player(PLAYER_TYPE_AI, aiPlayerChessType, false)
  }

  createGame () {
    console.log('game start')
    // 初始化游戏状态
    this.gameStatus = true
    // 计算游戏初识棋格大小
    const boardGridSize = this.calculateBoardGridSize()
    // 初始化游戏画布
    this.initGameCanvas(boardGridSize)
    // 初始化游戏棋盘
    this.initGameBoard(boardGridSize)
    // 初始化游戏玩家 默认人类玩家为 cross 棋子
    this.initGamePlayer(CHESS_TYPE_CROSS, CHESS_TYPE_CIRCLE)
    // 初始化游戏场景
    this.initGameScene(boardGridSize)
    // 添加场景监听器
    this.addGameSceneListener()
    // 添加棋盘监听器
    this.addBoardListener()
    // 初始化棋子储存器  保存玩家和AI的每一步棋子  可以获取步数
    this.gameHumanPlayerSteps = []
    this.gameAIPlayerSteps = []
    // 初始化游戏AI
    this.initGameAI()
  }

  initGameAI () {
    this.gameAI.initAI(this.gameBoard)
  }

  initGameScene (boardGridSize) {
    // 初始化场景
    this.gameScene.initScene(boardGridSize)
  }

  initGameCanvas (boardGridSize) {
    // 获取棋盘大小
    const boardSize = this.gameBoard.getBoardSize(boardGridSize)
    // 设置画布大小
    this.gameCanvas.setCanvasSize(boardSize)
  }

  initGameBoard (boardGridSize) {
    this.gameBoard.initBoardGrids(
      boardGridSize,
      this.gameCanvas.context
    )
  }

  /**
   * 添加场景监听器
   */
  addGameSceneListener () {
    // 添加选择棋子监听器
    this.addGameSceneChessListener()
    // 添加缩放棋盘监听器
    this.addGameSceneResizeListener()
  }

  addGameSceneChessListener () {
    this.addGameSceneChessCrossListener()
    this.addGameSceneChessCircleListener()
  }

  addGameSceneChessCrossListener () {
    document.querySelector('#cross').addEventListener(
      'click',
      () => {
        this.gameStatus = true
        this.gameHumanPlayerSteps = []
        this.gameAIPlayerSteps = []
        this.gameBoard.resetBoardGrids(this.gameCanvas.context)
        this.initGamePlayer(CHESS_TYPE_CROSS, CHESS_TYPE_CIRCLE)
        this.initGameAI()
      },
      false
    )
  }

  addGameSceneChessCircleListener () {
    document.querySelector('#circle').addEventListener(
      'click',
      () => {
        this.gameStatus = true
        this.gameHumanPlayerSteps = []
        this.gameAIPlayerSteps = []
        this.gameBoard.resetBoardGrids(this.gameCanvas.context)
        this.initGamePlayer(CHESS_TYPE_CIRCLE, CHESS_TYPE_CROSS)
        this.initGameAI()
        this.gameAIPlayer.generatePlayerChess(this.gameBoard.boardGrids, this.getGameAIFistStep(), this.gameCanvas.context, this.gameHumanPlayerSteps, this.gameAIPlayerSteps, this.gameAI, this.gameAIPlayer.playerChessType)
      },
      false
    )
  }

  getGameAIFistStep () {
    // AI玩家先手，默认让AI落子到中心位置 （以后换成花月、浦月等固定开局，从开局库读取）
    const row = (BOARD_GRIDS_COUNT - 1) / 2
    const col = (BOARD_GRIDS_COUNT - 1) / 2
    // return this.gameBoard.boardGrids[row][col]
    
    // return { row: 8, col: 8 }
    return { row, col }
  }

  addGameSceneResizeListener () {
    this.addGameSceneZoomOutListener()
    this.addGameSceneZoomInListener()
  }

  addGameSceneZoomOutListener () {
    document.querySelector('#zoomout').addEventListener(
      'click',
      event => {
        // 获取旧的棋格大小
        const oldBoardGridSize = this.gameBoard.boardGrids[0][0].boardGridSize
        const { newBoardGridSize, newBoardSize } = this.getGameSize(
          oldBoardGridSize,
          BOARD_GRID_RESIZE_COUNT
        )
        if (oldBoardGridSize <= BOARD_GRID_MAX_SIZE) {
          // 重设游戏场景
          this.resizeGame(
            newBoardGridSize,
            newBoardSize,
            BOARD_GRID_RESIZE_COUNT
          )
        }
      },
      false
    )
  }

  addGameSceneZoomInListener () {
    document.querySelector('#zoomin').addEventListener(
      'click',
      event => {
        const oldBoardGridSize = this.gameBoard.boardGrids[0][0].boardGridSize
        const { newBoardGridSize, newBoardSize } = this.getGameSize(
          oldBoardGridSize,
          -BOARD_GRID_RESIZE_COUNT
        )
        if (oldBoardGridSize >= BOARD_GRID_MIN_SIZE) {
          this.resizeGame(
            newBoardGridSize,
            newBoardSize,
            -BOARD_GRID_RESIZE_COUNT
          )
        }
      },
      false
    )
  }

  getGameSize (oldBoardGridSize, resizeCount) {
    // 计算新的棋格大小
    const newBoardGridSize = oldBoardGridSize + resizeCount
    // 重新获取棋盘大小
    const newBoardSize = this.gameBoard.getBoardSize(newBoardGridSize)
    return { newBoardGridSize, newBoardSize }
  }

  resizeGame (newBoardGridSize, newBoardSize, resizeCount) {
    // 重新设置画布大小
    this.gameCanvas.setCanvasSize(newBoardSize)
    // 重新绘制场景元素
    this.gameScene.drawSceneEle(newBoardGridSize, resizeCount)
    // 重设棋格与棋子
    this.gameBoard.resizeBoardGrids(
      newBoardGridSize,
      this.gameCanvas.context
    )
  }

  /**
   * 监听棋盘
   */
  addBoardListener () {
    this.gameCanvas.canvas.addEventListener(
      'click',
      event => {
        if (this.gameStatus) {
          this.onClickBoard(event)
        } else {
          alert('The game is over, please restart the game!')
        }
      },
      false
    )
  }

  onClickBoard (event) {
    for (let row = 0; row < BOARD_GRIDS_COUNT; row++) {
      for (let col = 0; col < BOARD_GRIDS_COUNT; col++) {
        const boardGrid = this.gameBoard.boardGrids[row][col]
        if (
          boardGrid.isInBoardGird(event.clientX, event.clientY, this.gameCanvas)
        ) {
          if (boardGrid.boardGridType !== BOARD_GRID_TYPE_DEFAULT) {
            return
          }
          const humanNextStep = { row, col }
          this.gameHumanPlayer.generatePlayerChess(this.gameBoard.boardGrids, humanNextStep, this.gameCanvas.context, this.gameHumanPlayerSteps, this.gameAIPlayerSteps, this.gameAI, this.gameAIPlayer.playerChessType)
          this.checkGameStatus(this.gameHumanPlayer.playerChessType, this.gameHumanPlayer.playerType, humanNextStep)
          if (this.gameStatus) {
            // 调用AI类 获取AI计算后的落棋位置
            const aiNextStep = this.getGameAINextStep()
            this.gameAIPlayer.generatePlayerChess(this.gameBoard.boardGrids, aiNextStep, this.gameCanvas.context, this.gameHumanPlayerSteps, this.gameAIPlayerSteps, this.gameAI, this.gameAIPlayer.playerChessType)
            this.checkGameStatus(this.gameAIPlayer.playerChessType, this.gameAIPlayer.playerType, aiNextStep)
          }
          return
        }
      }
    }
  }

  checkGameStatus (playerChessType, playerType, position) {
    // 判断当前玩家是否胜利
    // 判断当前玩家的棋子形成的棋型是否连成长连
    // 如果当前玩家取得胜利 游戏结束
    if (calculateSingleChessShapes(playerChessType, this.gameBoard.boardGrids, position)['FIVE'] !== 0) {
      this.gameStatus = false
      if (playerType === PLAYER_TYPE_HUMAN) {
        // 如果是人类玩家
        // 绘制 you win 文字
        alert('You win!')
      } else if (playerType === PLAYER_TYPE_AI) {
        // 如果AI玩家
        // 绘制 you lose 文字
        alert('You lose!')
      } else {
        return null
      }
    }
  }

  getGameAINextStep () {
    // 调用AI模块获取下一步的棋格位置
    const { row, col } = this.gameAI.getNextStep(this.gameAIPlayer.playerChessType, this.gameBoard, this.gameHumanPlayerSteps, this.gameAIPlayerSteps)
    return { row, col }
  }

  calculateBoardGridSize () {
    // 计算游戏棋格相关属性
    let boardGridSize = BOARD_GRID_DEFAULT_SIZE
    // 根据当前屏幕宽度来动态适配棋格大小
    const clientWidth = document.body.clientWidth
    const sizes = [
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 2,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 3,
      BOARD_GRID_DEFAULT_SIZE - BOARD_GRID_RESIZE_COUNT * 4
    ]
    for (let i = 0; i < sizes.length; i++) {
      if (clientWidth < SCREEN_WIDTH_RANGE[i]) {
        boardGridSize = sizes[i]
      }
    }
    return boardGridSize
  }

  startGame () {}
}
