/* 创建事入口函数
  0: 两部分内容是平行的 ，首先就是复选框的关联操作。

   1：首先为表头th添加事件绑定； 
   2：DOM查询获取所有的表头
   3：为ths注册点击事件，同时传递index值到事件函数内部
      找到一个index值，根据index为他进行排序
      通过bing函数进行index值的传递
      收集所有的tr列表集合
      让tr冒充调用 array.prototype.sclice.call sort方法进行排序
   4：排序处理规则： 
      汉字排序（使用拼音进行排序）
      数字排序 （正常进行排序）
   5：排序完成之后遍历排序完成的数组，使用appendChild方法进行每一个节点的添加

   全选处理
    处理全部选中的时候，首先阻止事件冒泡
    获取全选按钮的状态
    遍历tbody中的复选框，改变每一个复选框的状态为当前的全选按钮的状态
   单选处理
    事件绑定
    定义统计数字 checkedNum = 0
 */

(function () {
  var ths = document.getElementsByTagName('th')   // th集合
  var tbody = document.getElementsByTagName('tbody')[0] // tbody 获取之后，在追加元素及查找复选框的时候进行使用
  var rows = tbody.querySelectorAll('tr')     // 所有的行的集合
  var checkAll = document.getElementById('checkAll')   // 全选按钮获取
  var checkOneList = tbody.getElementsByTagName('input')   // 单选按钮集合获取

  /* 程序入口函数 */
  var init = function () {
    initEvent()
  }

  /* 事件入口函数 */
  var initEvent = function () {
    for (var i = 0; i < ths.length; i++) {
      var node = ths[i]
      onThsClick(node, i);
      // node.addEventListener('click', onThsClick.bind(node, index))
    }
    // 全选按钮处理
    checkAll.addEventListener('click', onCheckAllClick)
    // 单选按钮事件绑定
    tbody.addEventListener('click', onCheckOneClick)
    // checkOneList.forEach(function (node) {
    //   node.addEventListener('click', onCheckOneClick)
    // })
  }

  /* 全部选中操作函数 */
  var onCheckAllClick = function (e) {
    e.stopPropagation()
    var checkStatus = this.checked
    for (let i = 0; i < checkOneList.length; i++) {
      const ele = checkOneList[i];
      ele.checked = checkStatus
    }
  }

  /* 单个进行选中 */
  var onCheckOneClick = function (e) {
    if (e.target.tagName !== 'INPUT') return
    /* 定义统计数字 */
    var checkedNum = 0

    for (var i = 0; i < checkOneList.length; i++) {
      checkOneList[i].checked && ++checkedNum
    }
    checkAll.checked = checkedNum === checkOneList.length
  }

  /* ths表头事件绑定事件绑定 */
  var onThsClick = function (node, index) {
    if (index === 0) return
    /* 处理索引值为1复选框的时候的问题 */
    node.addEventListener('click', function () {
      var arr = Array.prototype.slice.apply(rows).sort(function (a, b) {
        if (index === 2 || index === 4) {
          /* localeCompare是一种基于国际化字体的地区字符比较，例如中国用中文，美国用英文，法国用法文，德国用德文。。将这些国家的文字按照国家/地区等进行编号，然后每个编号都对应了该国/地区的文字。 */
          return a.getElementsByTagName('td')[index].innerHTML.localeCompare(b.getElementsByTagName('td')[index].innerHTML, 'zh')
        }
        return a.getElementsByTagName('td')[index].innerHTML - b.getElementsByTagName('td')[index].innerHTML
      })
      arr.forEach(function (node) {
        tbody.appendChild(node)
      })
    })
  }

  /* Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。
   */
  init()
})();