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
  var startBtn = document.querySelector('.handler-container-btn')
  var prizeList = document.querySelectorAll('.prize-list')
  var dialogContainer = document.querySelector('.dialog-container');
  var prizeContent = document.querySelector('.dialog-container .content')
  var index = -1
  var timer = null
  var number = 5
  var currentIndex = null
  var closeBtn = document.querySelector('.close')
  var confirmBtn = document.querySelector('.dialog-main-footer .button')
  var prizeNumber = document.querySelector('.prize-number')

  var init = function () {
    prizeNumber.innerHTML = number
    initEvent()
  }

  var initEvent = function () {
    startBtn.addEventListener('click', onStartBtnClick)
    closeBtn.addEventListener('click', onCloseBtnClick)
    confirmBtn.addEventListener('click', onConfirmBtnClick)
  }

  var onStartBtnClick = function () {
    if (timer) return
    index = -1
    if (number === 0) return
    runGame()
  }

  /* 关闭弹窗 */
  var onCloseBtnClick = function () {
    dialogContainer.style.display = 'none'
  }

  var onConfirmBtnClick = function () {
    index = -1
    dialogContainer.style.display = 'none'
    if (number === 0 || timer) return
    runGame()
  }

  var runGame = function () {
    var random = Math.floor(Math.random() * 6000 + 3000)
    timer = setInterval(function () {
      random -= 200
      if (random < 200) {
        clearInterval(timer)
        timer = null
        openDialog()
        return
      }
      currentIndex = ++index % prizeList.length
      prizeList.forEach(function (node) {
        node.classList.remove('active')
      })
      prizeList[currentIndex].classList.add('active')
    }, 50)
  }

  var openDialog = function () {
    prizeNumber.innerHTML = --number
    if (number === 0) {
      document.querySelector('.dialog-main-footer .button').innerHTML = '确定'
    }
    dialogContainer.style.display = 'block'
    console.log(currentIndex)
    if (currentIndex === 4) {
      prizeContent.innerHTML = '很遗憾您没有中奖'
    } else {
      prizeContent.innerHTML = '恭喜您获得' + document.querySelector('.active span').innerHTML
    }
  }

  init()
})()
