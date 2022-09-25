/* 
1: 定义抽奖次数渲染
  1-1 获取DOM元素
  1-2 定义剩余的抽奖次数
2: 点击抽奖按钮,实现滚动抽奖效果(复杂度高)
  2-1 获取点击按钮 ,绑定点击事件
  2-2 为每一个list选项添加类名,实现高亮状态
  2-3 定义当前高亮的列表项索引值
  2-4 使用定时器实现滚动效果
  2-5 使用随机数定义停止条件
3: 弹窗处理 
  3-1 打开弹窗.显示中奖信息(处理未中奖时的弹窗提示内容)
  3-2 打开弹窗的同时,减少剩余的抽奖次数
  3-3 关闭按钮的事件绑定
  3-4 再来一次按钮事件绑定 
4:  定义runGame函数
5: timer定时器bug修复
 */

(function () {
  var lotteryNumber = 5
  var numberNode = document.getElementsByClassName('number')[0]
  var startBtn = document.getElementsByClassName('start-btn')[0]
  var prizeList = document.getElementsByClassName('prize-list')
  var index = -1
  var currentIndex = null
  var timer = null
  var dialogContainer = document.getElementsByClassName('masker-dialog')[0]
  var prizeNode = document.getElementsByClassName('dialog-content')[0]
  var closeBtn = document.getElementsByClassName('close-btn')[0]
  var confirmBtn = document.getElementsByClassName('confirm-btn')[0]

  /* 定义案例的入口函数 */
  var init = function () {
    numberNode.innerHTML = lotteryNumber
    initEvent()
  }

  /* 创建事件入口函数 */
  var initEvent = function () {
    startBtn.addEventListener('click', startBtnClick)
    closeBtn.addEventListener('click', closeBtnClick)
    confirmBtn.addEventListener('click', confirmBtnClick)
  }

  /* 抽奖按钮事件函数 */
  var startBtnClick = function () {
    if (timer) return
    if (lotteryNumber === 0) return
    index = -1
    runGame()
  }

  /* 再来一次的按钮事件绑定 */
  var confirmBtnClick = function () {
    dialogContainer.style.display = 'none'
    if (lotteryNumber === 0) return
    index = -1
    runGame()
  }

  /* 创建中将弹窗函数 */
  var openDialog = function () {
    numberNode.innerHTML = --lotteryNumber
    lotteryNumber === 0 && (confirmBtn.innerHTML = '确定')
    var prizeContent = prizeList[currentIndex].getElementsByTagName('span')[0].innerHTML
    dialogContainer.style.display = 'block'
    prizeNode.innerHTML = currentIndex === 4 ? prizeContent : '恭喜您中得' + prizeContent
  }

  /* 定义弹窗按钮关闭的点击事件 */

  var closeBtnClick = function () {
    dialogContainer.style.display = 'none'
  }

  /* 定义转动函数runGame */

  var runGame = function () {
    var num = 3000 + Math.floor(Math.random() * 3000)
    timer = setInterval(function () {
      num -= 200
      if (num <= 200) {
        /* 打开中奖弹窗 */
        openDialog()
        clearInterval(timer)
        timer = null
        return
      }
      prizeList[currentIndex] && prizeList[currentIndex].classList.remove('active')
      currentIndex = ++index % prizeList.length
      prizeList[currentIndex].classList.add('active')
    }, 50)
  }


  init()
})()