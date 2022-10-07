import {
  BOARD_GRID_DEFAULT_SIZE
} from './constant'

/**
 * 游戏场景类
 */
export default class Scene {
  constructor () {
    // 控制选择棋子、loading等信息的显示
    // 游戏结束后显示“You win/lose! Click ‘图标’ to restart” 以及重新开始按钮图标（用刷新的图标）
    // this.listenScene()
  }

  initScene (boardGridSize) {
    // 显示场景元素
    this.showSceneEle()
    this.drawSceneEle(boardGridSize, boardGridSize - BOARD_GRID_DEFAULT_SIZE)
  }

  showSceneEle () {
    document.querySelector('#scene').style.display = 'block'
  }

  drawSceneEle (newBoardGridSize, resizeCount) {
    const elements = document.querySelectorAll('.element')
    const infoEle = document.querySelector('.info')
    elements.forEach(element => {
      element.style.width = `${newBoardGridSize}px`
      element.style.height = `${newBoardGridSize}px`
      element.style.lineHeight = `${newBoardGridSize}px`
      element.style.fontSize = `${newBoardGridSize}px`
    })
    infoEle.style.lineHeight = `${newBoardGridSize}px`
    infoEle.style.fontSize = `${parseInt(getComputedStyle(infoEle).fontSize) +
      resizeCount / 2}px`
  }
}
