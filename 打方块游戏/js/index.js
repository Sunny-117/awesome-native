(function () {
  var timer = null;
  var speed = 5;
  var num = 0;
  var colorLists = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];
  /* 程序入口 */
  var init = function () {
    initEvents();
  }

  /* 事件入口函数 */
  var initEvents = function () {
    startBtn.addEventListener('click', onStartBtnClick)
    contentBox.addEventListener('click', onContentBoxClick)
  }

  /* 游戏内容点击函数 */
  var onContentBoxClick = function (e) {
    var target = e.target;
    if (target.className === 'i') {
      target.style.backgroundColor = '#bbb'
      target.className = ''
      num++;
      num % 10 === 0 && speed++
      count.innerHTML = '当前得分:' + num;
    }
  }

  /* 开始按钮点击函数 */
  var onStartBtnClick = function () {
    count.innerHTML = '游戏开始'
    this.style.display = 'none';
    /* 调用动画运行函数 */
    runGame();
  }

  /* 定义动画运行函数 */
  var runGame = function () {
    timer = setInterval(function () {
      var step = parseInt(getComputedStyle(contentBox, null)['top']) + speed
      contentBox.style.top = step + 'px'
      if (parseInt(getComputedStyle(contentBox, null)['top']) >= 0) {
        /* top值变成150 */
        /* 内容的填充 */
        fillNode()
        contentBox.style.top = '-150px'
      }

      /* 如果说已经生成六行row，并且这个row（最先生成的那个row没有被消除，我们就判定游戏结束 */
      if (contentBox.children.length === 6) {
        for (var i = 0; i < 4; i++) {
          if (contentBox.children[contentBox.children.length - 1].children[i].className === 'i') {
            contentBox.style.top = '-150px'
            count.innerHTML = '游戏结束，最高得分:' + num
            clearInterval(timer)
            startBtn.innerHTML = '游戏结束'
            startBtn.style.display = 'block'
          }
        }
        contentBox.removeChild(contentBox.children[contentBox.children.length - 1])
      }
    }, 20)
  }

  /* 为这个运动容器添加子节点 */
  var fillNode = function () {
    var nodeContainer = document.createElement('div')
    nodeContainer.className = 'row'
    var index = Math.floor(Math.random() * 4)


    for (var i = 0; i < 4; i++) {
      var childDiv = document.createElement('div')
      nodeContainer.appendChild(childDiv)
    }

    if (contentBox.children.length === 0) {
      contentBox.appendChild(nodeContainer)
    } else {
      contentBox.insertBefore(nodeContainer, contentBox.children[0])
    }
    nodeContainer.children[index].style.backgroundColor = colorLists[index]
    nodeContainer.children[index].className = 'i'
  }
  init();
})()