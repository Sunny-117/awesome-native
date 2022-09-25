(function (win) {
  var defaultPar = {
    rotateNum: 5,
    trunbody: document.getElementsByTagName("body")[0],
    clkFn: function () {},
    judge: function () {},
  };

  function Lottery(pars) {
    this.pars = Object.assign(defaultPar, pars); //防止报错 pars覆盖默认对象
    this.bool = true;

    this.init();
  }

  win.Lottery = Lottery; //与外面产生接口

  Lottery.prototype.init = function () {
    console.log(this.bool);
    var self = this;
    this.pars.btn = this.pars.trunbody.getElementsByClassName("btn")[0];
    this.pars.bigWheel = this.pars.trunbody.getElementsByClassName("pan")[0];

    this.pars.btn.addEventListener("click", function (e) {
      if (self.bool) {
        self.pars.clkFn();
        self.bool = false;
      }
    });

    this.pars.bigWheel.addEventListener("webkitTransitionEnd", function () {
      self.pars.bigWheel.style.transform = "rotate(" + self.pars.myNum + "deg)";
      self.pars.bigWheel.style.transition = "none";
      self.pars.judge(self.pars.myNum);

      self.bool = true;
    });
  };

  Lottery.prototype.tableRun = function (deg) {
    var num = deg + this.pars.rotateNum * 360;

    this.pars.bigWheel.style.transform = "rotate(" + num + "deg)";
    this.pars.bigWheel.style.transition = "all 5s";

    this.pars.myNum = deg;
    console.log(this.pars);
  };
})(window);
