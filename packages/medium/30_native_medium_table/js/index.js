!(function () {
  var ths = document.querySelectorAll("th");
  var tbody = document.querySelector("tbody");
  var rows = tbody.querySelectorAll("tr");
  var checkAll = document.querySelector(".check-all");
  var checkOne = tbody.querySelectorAll('[type="checkbox"]');
  // 创建一个入口函数
  var init = function () {
    /* 调用事件入口函数 */
    initEvent();
  };
  /* 定义事件入口 */
  var initEvent = function () {
    ths.forEach(function (node, index) {
      node.addEventListener("click", onThsClick.bind(node, index));
    });
    checkAll.addEventListener("click", onCheckAllClick);
    checkOne.forEach(function (node) {
      node.addEventListener("click", onCheckOneClick);
    });
  };

  /* 全选按钮点击事件 */
  var onCheckAllClick = function () {
    var checkStatus = this.checked;
    checkOne.forEach(function (node) {
      node.checked = checkStatus;
    });
    /* ES6 */
    // checkOne.forEach((node)=>  {
    //   console.log(this)
    //   node.checked = this.checked
    // })
  };

  /* 单选按钮点击事件函数 */
  var onCheckOneClick = function () {
    var checkedNum = 0;
    checkOne.forEach(function (node) {
      node.checked && ++checkedNum;
    });
    checkAll.checked = checkedNum === checkOne.length;
  };

  /* 表头的事件绑定函数 */
  var onThsClick = function (index) {
    if (index === 0) return;
    /* 创建一个数组 sort tr节点 */
    var arr = Array.prototype.slice.apply(rows).sort(function (a, b) {
      if (index === 2 || index === 4) {
        return a
          .querySelectorAll("td")
          [index].innerHTML.localeCompare(
            b.querySelectorAll("td")[index].innerHTML,
            "zh"
          );
      }
      return (
        a.querySelectorAll("td")[index].innerHTML -
        b.querySelectorAll("td")[index].innerHTML
      );
    });

    arr.forEach(function (node) {
      tbody.appendChild(node);
    });
  };

  init();
})();
