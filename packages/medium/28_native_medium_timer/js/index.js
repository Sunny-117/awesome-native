(function () {
  /*  */
  var init = function () {
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(8) ul"),
      1000
    );
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(7) ul"),
      10000
    );
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(5) ul"),
      60000
    );
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(4) ul"),
      600000
    );
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(2) ul"),
      3600000
    );
    changeTimeNumber(
      document.querySelector(".time-item:nth-child(1) ul"),
      86400000
    );
  };

  /* 运行时间修改函数 */

  var changeTimeNumber = function (node, timer) {
    setInterval(function () {
      /* 获取一个我们需要修改的节点的第一个元素，做完动画之后，要向这个ul的最后以为进行一个追加操作 */
      var firstChild = node.querySelector("li:first-child");
      /* 规定了ul的过度属性 */
      node.style.transition = "all .5s linear";
      /* 添加过渡动画属性 */
      node.style.marginTop = "-120px";
      /* 监听一个过渡动画结束的事件 */
      node.addEventListener("transitionend", function () {
        /* 取消过渡动画属性 */
        node.style.transition = "none";
        node.style.marginTop = "0px";
        /* 追加第一个子节点到最后一位 */
        node.appendChild(firstChild);
      });
    }, timer);
  };

  init();
})();
