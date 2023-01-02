/* 元素高度 */
// console.log(document.querySelector('.intro').offsetHeight)
/* 元素距离顶部的距离 */
// console.log(document.querySelector('#html').offsetTop)
// console.log(document.querySelector('#css').offsetTop)
/* 鼠标滚动的高度,html卷进去的高度 */
// console.log(document.documentElement.scrollTop)
/* 滚动窗口到相应坐标位置 会跟浏览器的记录上一次的位置有冲突*/
// document.addEventListener('click', function() {
//   window.scroll(0, 821)
// })

/* 介绍的高度 */
var introH = document.querySelector('.intro').offsetHeight
/* 导航块dom */
var tabWrap = document.querySelector('.tabWrap')
/* 导航块的高度 */
var tabWrapH = tabWrap.offsetHeight
/* 可视的介绍高度 */
var introShow = introH - tabWrapH
var tabs = document.querySelectorAll('.tab')
/* 保存当前展现的tab对应的内容区域 */
var currentTab = null
var line = document.querySelector('.line')

function onScroll() {
  document.addEventListener('scroll', function(){
    fixedTapWrap()
    findCurrentContentId()
  })
}

/* 判断当前鼠标滑动 的高度是否大于两个(intro和tabWrap)的差 */
/* 判断高度固定导航块 */
function fixedTapWrap() {
  if(document.documentElement.scrollTop > introShow) {
    tabWrap.classList.add('fixed')
  } else {
    tabWrap.classList.remove('fixed')
  }
}

/* 点击导航回调函数 */
function clickTab(e) {
  e.preventDefault()
  var id = e.target.getAttribute('href')
  /* 获取id区域距离顶部的距离 */
  var idTop = document.querySelector(id).offsetTop
  /* id需要移动的高度 */
  var idMoveH = idTop - tabWrapH
  window.scroll(0, idMoveH)
}

/* 确定当前内容区域的id */
function findCurrentContentId(){
  /* 中间变量用来保持匹配到的tab */
  var newTab
  tabs.forEach(function(tab){
    var id = tab.getAttribute('href')
    /* 获取id区域距离顶部的距离 */
    var idTop = document.querySelector(id).offsetTop
    /* 进入内容id区域顶部所需高度 */
    var idTopMoveH = idTop - tabWrapH
    /* 进入内容id区域底部所需高度 */
    var idBottomMoveH = idTopMoveH + document.querySelector(id).offsetHeight
    if(document.documentElement.scrollTop >= idTopMoveH && document.documentElement.scrollTop <= idBottomMoveH) {
      newTab = tab
    }
  })
  currentTab = newTab
  setLineCss()
}

/* 给选中的tab设置css样式 */
function setLineCss() {
  var width = 0
  var left = 0
  if(currentTab) {
    width = currentTab.offsetWidth
    left = currentTab.offsetLeft
  }
  line.style.width = width + 'px'
  line.style.left = left + 'px'
}

function init() {
  onScroll()
  fixedTapWrap() 
  /* 事件委托 */
  tabWrap.addEventListener('click', clickTab)
}

init()