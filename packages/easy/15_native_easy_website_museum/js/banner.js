(function () {
  var imgList = document.querySelectorAll('.banner-img')
  var navList = document.querySelectorAll('.nav-icon-list')
  var currentIndex = 0
  var flag = true
  var timer = null
  var init = function () {
    imgList[currentIndex].style.opacity = 1
    /* 调用事件入口函数 */
    initEvent();
    runAnimation11();
    autoRunAnimation()
  }

  var initEvent = function () {
    arrowContainer.addEventListener('click', onArrowContainerClick)
    navList.forEach(function (node, index) {
      node.addEventListener('click', onNavListClick.bind(node, index))
    })
  }

  /* 定义初始化动画自动运行函数 */
  var autoRunAnimation = function () {
    timer = setInterval(function () {
      runAnimation15('right')
      runAnimation11()
    }, 4000)
  }

  /* icon图标点击事件 */
  var onNavListClick = function (index) {
    clearInterval(timer)
    if (!flag || currentIndex === index) return
    flag = false;
    runAnimation15()
    currentIndex = index
    runAnimation11()
    autoRunAnimation()
    navList.forEach(function (node) {
      node.classList.remove('active')
    })
    this.classList.add('active')
  }

  /* 箭头点击事件函数 */
  var onArrowContainerClick = function (e) {
    clearInterval(timer)
    if (!flag) return
    flag = false;

    runAnimation15(e.target.classList.contains('arrow-left') ? 'left' : 'right')
    runAnimation11()
    autoRunAnimation()
  }

  /* 定义一个瞬间放大1.5倍的动画函数 */
  var runAnimation15 = function (direction) {
    imgList[currentIndex].style.opacity = 0;
    imgList[currentIndex].style.transform = 'scale(1.5)';
    imgList[currentIndex].style.transition = 'all .8s ease'

    var tempIndex = currentIndex
    /* 当动画完成之后，调整样式为空 */
    setTimeout(function () {
      imgList[tempIndex].style = 'none'
      flag = true;
    }, 1000)


    /* 改变currentIndex的值 */
    if (direction === 'right') {
      currentIndex = ++currentIndex % imgList.length;
    } else {
      --currentIndex
      if (currentIndex < 0) {
        currentIndex = imgList.length - 1
      }
    }
    /* icon图标的样式处理 */
    navList.forEach(function (node) {
      node.classList.remove('active')
    })
    navList[currentIndex].classList.add('active')
  }

  /* 定义一个放大1.1倍的动画函数 */
  var runAnimation11 = function () {
    imgList[currentIndex].style.opacity = 1;
    imgList[currentIndex].style.transform = 'scale(1.1)';
    imgList[currentIndex].style.transition = 'transform 4s .6s linear,opacity 1s linear'
  }
  init();
})()