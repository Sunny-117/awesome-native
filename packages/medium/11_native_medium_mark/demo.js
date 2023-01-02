scale = function (btn, bar, title) {
  this.btn = document.getElementById(btn);
  this.bar = document.getElementById(bar);
  this.title = document.getElementById(title);
  this.step = this.bar.getElementsByTagName("DIV")[0];
  this.init();
};
scale.prototype = {
  init: function () {
    this.initEvent();
  },
  initEvent: function () {
    this.btn.addEventListener("mousedown", this.onBtnMousedown.bind(this));
  },
  onBtnMousedown: function (e) {
    var x = e.clientX;
    var left = e.target.offsetLeft;
    var max = this.bar.offsetWidth - e.target.offsetWidth;
    document.onmousemove = function (e) {
      var to = Math.min(max, Math.max(-2, left + (e.clientX - x)));
      this.btn.style.left = to + "px";
      this.ondrag(Math.round(Math.max(0, to / max) * 100), to);
    }.bind(this);
    document.onmouseup = function (e) {
      this.onmousemove = null;
    };
  },
  ondrag: function (pos, x) {
    this.step.style.width = Math.max(0, x) + "px";
    this.title.innerHTML = pos / 10 + "";
  },
};

new scale("btn0", "bar0", "title0");
new scale("btn1", "bar1", "title1");
new scale("btn2", "bar2", "title2");
new scale("btn3", "bar3", "title3");
new scale("btn4", "bar4", "title4");
