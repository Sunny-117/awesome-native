/*
1: 实现抽奖次数渲染
  1-1 获取DOM元素
  1-2 定义剩余的抽奖次数
2: 点击抽奖按钮,实现滚动抽奖效果(复杂度相对高一些,案例的重点)
  2-1 获取点击按钮 ,绑定点击事件
  2-2 为每一个获奖选项添加类名,实现高亮状态
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
  var startBtn = document.getElementById('startBtn')   // 开始抽奖按钮
  var prizeList = document.getElementsByClassName('prize-list')   // 奖品列表
  var dialogContainer = document.getElementById('dialogContainer');  // 对话框容器
  var prizeContent = document.getElementById('prizeContent')  // 奖品内容
  var closeBtn = document.getElementById('closeBtn')  // 关闭按钮
  var confirmBtn = document.getElementById('confirmBtn')  // 再来一次按钮
  var prizeNumber = document.getElementById('prizeNumber')  // 当前剩余抽奖次数节点
  var index = -1   // 初始化的列表索引
  var timer = null  // 抽奖定时器的ID
  var residueNumber = 5   // 抽奖次数
  var currentIndex = null // 当前真实的索引值

  /* 程序入口函数 */
  var init = function () {
    prizeNumber.innerHTML = residueNumber
    initEvent()
  }

  /* 事件函数 */
  var initEvent = function () {
    startBtn.addEventListener('click', onStartBtnClick)
    closeBtn.addEventListener('click', onCloseBtnClick)
    confirmBtn.addEventListener('click', onConfirmBtnClick)
  }

  /* 开始抽奖函数 */
  var onStartBtnClick = function () {
    if (residueNumber === 0 || timer) return
    runGame()
  }

  /* 关闭弹窗函数 */
  var onCloseBtnClick = function () {
    dialogContainer.style.display = 'none'
  }

  /* 点击再来一次函数 */
  var onConfirmBtnClick = function () {
    
    dialogContainer.style.display = 'none'
    if (residueNumber === 0 || timer) return
   
    runGame()
  }

  /* 抽奖运行函数 */
  var runGame = function () {
    index = -1
    var randomNum = Math.floor(Math.random() * 6000 + 3000)
    timer = setInterval(function () {
      randomNum -= 200
      if (randomNum < 200) {
        clearInterval(timer)
        openDialog()
        timer = null
        return
      }
      prizeList[currentIndex] && prizeList[currentIndex].classList.remove('active')
      currentIndex = ++index % prizeList.length
      prizeList[currentIndex].classList.add('active')
    }, 50)
  }

  /* 打开弹窗函数定义 */
  var openDialog = function () {
    prizeNumber.innerHTML = --residueNumber
    if (residueNumber === 0) confirmBtn.innerHTML = '确定'

    dialogContainer.style.display = 'block'
    if (currentIndex === 4) {
      prizeContent.innerHTML = '很遗憾您没有中奖'
    } else {
      prizeContent.innerHTML = '恭喜您获得' + prizeList[currentIndex].getElementsByTagName('span')[0].innerHTML
    }
  }

  /* 定义程序入口函数 */
  init()
})()
