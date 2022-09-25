(function () {
  /* 创建一个初始化加载图片的索引值 */
  var currentIndex = -1;
  var docH = window.innerHeight;
  var docW = window.innerWidth;
  /* 定义初始化的位置信息 */
  var rx = Math.random() * docW - 70;
  var ry = Math.random() * docH - 70;
  var xLock = true;
  var yLock = true;
  var timer = null;

  /* 入口函数定义 */
  var init = function () {
    autoRun();
  };

  btn.onclick = function () {
    var status = this.getAttribute("data");
    if (status === "auto") {
      this.innerHTML = "自动";
      this.setAttribute("data", "manual");
      /* 停止定时器 */
      clearInterval(timer);
      /* 鼠标按下事件 */
      document.onmousedown = function () {
        this.onmousemove = function (e) {
          /* 创建图片 */
          var img = new Image(); // 创建图片
          img.src = "./img/" + (++currentIndex % 5) + ".png";
          img.style.top = e.clientY - 35 + "px";
          img.style.left = e.clientX - 35 + "px";
          document.body.appendChild(img);
          /* 第一个参数是一个对象 就是我们需要做动画的css的属性*/
          $("img:last").animate(
            {
              width: "0px",
              height: "0px",
              top: e.clientY - 240 + "px",
            },
            1500,
            function () {
              document.body.removeChild(this);
            }
          );
        };
        this.onmouseup = function () {
          this.onmousemove = null;
        };
      };
    } else {
      this.setAttribute("data", "auto");
      this.innerHTML = "手动";
      autoRun();
      document.onmousedown = null;
    }
  };

  /* 定义动画自动执行函数 */
  var autoRun = function () {
    timer = setInterval(function () {
      if (rx < 0) {
        xLock = false;
      } else if (rx > docW - 70) {
        xLock = true;
      }

      if (ry < 0) {
        yLock = false;
      } else if (ry > docH - 70) {
        yLock = true;
      }

      var img = new Image(); // 创建图片
      img.src = "./img/" + (++currentIndex % 5) + ".png";
      img.style.top = ry + "px";
      img.style.left = rx + "px";
      document.body.appendChild(img);
      $("img:last").animate(
        {
          width: "0px",
          height: "0px",
          top: ry + 35 + "px",
          left: rx + 35 + "px",
        },
        1500,
        function () {
          document.body.removeChild(this);
        }
      );

      if (xLock) {
        rx -= Math.random() * 10 + 10;
      } else {
        rx += Math.random() * 10 + 10;
      }

      if (yLock) {
        ry -= Math.random() * 10 + 10;
      } else {
        ry += Math.random() * 10 + 10;
      }
    }, 50);
  };

  init();
})();
