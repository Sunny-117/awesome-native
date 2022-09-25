/* 
  1：创建构造函数 ScaleFn() ,定义构造函数原型
  2:  定义入口函数  构造函数体内执行入口函数
  3:  DOM元素获取
    3-1 获取 显示分数的容器
    3-2 获取滑动按钮
    3-3 获取隐藏的进度条
    3-4 获取总的长度的容器
    4：事件的绑定，拖动按钮 mousedown事件绑定
      找到需要操作的元素的距离父元素的偏移度 
        获取当前滑动摁下的x轴的位置,获取一个当前距离容器偏移的位置
        获取最大允许便宜的宽度
      5：document进行nomouseove事件绑定，
      获取当前的事件的点
      6:为按钮添加一个left值，
      7：调用drag函数，首先计算出 Math.max(0, to / max) * 100) 获取一个当前的两位运算数字
        drag事件进行按进度条及input框的值的添加
        添加解绑mounsemove事件。mouseup事件添加，将onmousemove事件清除

        bug处理
        window.getSelection ? window.getSelection().removeAllRanges() : window.selection.empty();
 */
function ScaleFn(ratingsDom) {
  this.bar = ratingsDom.querySelector(".scale");
  this.btn = ratingsDom.querySelector(".btn");
  this.title = ratingsDom.querySelector(".input-container");
  this.step = ratingsDom.querySelector(".progress-line");
  this.init();
}

ScaleFn.prototype = {
  init: function () {
    this.btn.addEventListener("mousedown", this.onBtnMousedown.bind(this));
  },
  onBtnMousedown: function (e) {
    var x = e.clientX;
    var left = e.target.offsetLeft;
    var max = this.bar.offsetWidth - e.target.offsetWidth;
    console.log(x, left, max);

    document.onmousemove = function (e) {
      /* 初始化写法 */
      // var to = Math.min(max, left + (e.clientX - x))
      /* 成形的写法 */
      var to = Math.min(max, Math.max(-2, left + (e.clientX - x)));

      this.btn.style.left = to + "px";

      this.ondrag(Math.round(Math.max(0, to / max) * 100), to);

      window.getSelection
        ? window.getSelection().removeAllRanges()
        : window.selection.empty();
    }.bind(this);

    document.onmouseup = function (e) {
      this.onmousemove = null;
    };
  },
  ondrag: function (pos, x) {
    this.step.style.width = x + "px";
    this.title.innerHTML = pos / 10 + "";
  },
};

new ScaleFn(document.querySelectorAll(".ratings-bar")[0]);
new ScaleFn(document.querySelectorAll(".ratings-bar")[1]);
new ScaleFn(document.querySelectorAll(".ratings-bar")[2]);
new ScaleFn(document.querySelectorAll(".ratings-bar")[3]);
new ScaleFn(document.querySelectorAll(".ratings-bar")[4]);
