var changeTimeNumber = function (node, timer) {
  setInterval(function () {
    /* 获取第一个子节点，准备进行添加操作 */
    /* 规定执行动画时间, */
    /* 调整显示位置 */
    const firstChild = node.querySelector('li:first-child')
    node.style.transition = 'all .5s linear'
    node.style.marginTop = '-120px'
    /* 定义动画执行完成时间 */
    node.addEventListener('transitionend', function () {
      /* 改变动画的执行transition属性 为空 */
      node.style.transition = 'none'
      /* 定义marginTop值为0 */
      node.style.marginTop = '0px';
      /* 追加第一个元素准备进行第二次动画 */
      node.appendChild(firstChild)
    })
  }, timer)
}

changeTimeNumber(document.querySelector('.time-item:nth-of-type(8) ul'), 1000)
changeTimeNumber(document.querySelector('.time-item:nth-of-type(7) ul'), 10000)
changeTimeNumber(document.querySelector('.time-item:nth-of-type(5) ul'), 60000)
changeTimeNumber(document.querySelector('.time-item:nth-of-type(4) ul'), 600000)
changeTimeNumber(document.querySelector('.time-item:nth-of-type(2) ul'), 3600000)
changeTimeNumber(document.querySelector('.time-item:nth-of-type(1) ul'), 10800000)