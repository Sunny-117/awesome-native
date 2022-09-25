(function () {
  var navList = document.querySelectorAll('.nav-list-title')

  /* 定义一个入口函数 */
  var init = function () {
    initEvent();
  }

  /* 事件绑定函数 */
  var initEvent = function () {
    iconMenuBtn.addEventListener('click', onIconMenuBtnClick)
    closeBtn.onclick = onCloseBtnClick
    // closeBtn.addEventListener('click', onCloseBtnClick)
    navList.forEach(function (node) {
      node.addEventListener('mouseenter', onNavItemMouseEnter)
    })

    navigatorMasker.addEventListener('mouseleave', onNavigatorMaskerMounseLeave)
    document.querySelectorAll('.nav-classify').forEach(function (node) {
      node.addEventListener('mouseenter', onNavClassifyMouseLeave)
    })
    searchBtn.addEventListener('click', onSearchBtnClick)
  }

  /* 搜索按钮点击事件 */
  var onSearchBtnClick = function () {
    document.querySelector('.search').style.display = 'flex'
  }

  /* 右侧标题鼠标划入事件 */
  var onNavClassifyMouseLeave = function () {
    document.querySelector('.search').style.display = 'none'
    onNavigatorMaskerMounseLeave()
  }

  /* 鼠标划过整体的下拉菜单隐藏函数 */
  var onNavigatorMaskerMounseLeave = function () {
    navList.forEach(function (node) {
      node.classList.remove('on')
    })
    document.querySelectorAll('.nav-list-masker-container').forEach(function (node) {
      node.style.height = 0
    })
  }

  /* 导航标题鼠标划过事件 */
  var onNavItemMouseEnter = function () {
    var currentIndex = this.getAttribute('data')
    /* 第一步添加类名 */
    navList.forEach(function (node) {
      node.classList.remove('on')
    })
    this.classList.add('on')

    /* 第二部 让指定的隐藏的列表进行展示 */
    document.querySelectorAll('.nav-list-masker-container').forEach(function (node) {
      node.style.height = 0
      node.style.opacity = 0
    })
    if (!currentIndex) return

    var spanList = document.querySelector('.' + currentIndex).querySelectorAll('span')
    var spanTotalWidth = 0
    spanList.forEach(function (node) {
      spanTotalWidth += node.offsetWidth
    })
    /* 添加位置的正确偏移 */
    document.querySelector('.' + currentIndex).style.paddingLeft = this.offsetLeft + this.offsetWidth / 2 - spanTotalWidth / 2 + 'px'

    document.querySelector('.' + currentIndex).style.height = '50px'
    document.querySelector('.' + currentIndex).style.opacity = 1
  }

  /* 菜单绑定点击事件 */
  var onIconMenuBtnClick = function () {
    headerRightMasker.style.zIndex = 99
    headerRightMasker.style.opacity = 1
  }

  /* 遮罩层关闭按钮点击事件 */
  var onCloseBtnClick = function () {
    headerRightMasker.style.zIndex = -1
    headerRightMasker.style.opacity = 0
  }


  init()
})()