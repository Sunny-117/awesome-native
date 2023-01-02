(function () {
  //立即执行函数

  var ele_container = document.getElementsByClassName("container")[0];
  var ele_content = document.getElementsByClassName("content")[0];
  var ele_duration = document.getElementsByClassName("duration")[0];
  var ele_bar = document.getElementsByClassName("bar")[0];

  var barH = Math.floor(
    (ele_container.offsetHeight / ele_content.offsetHeight) *
      ele_duration.offsetHeight
  );
  console.log(barH);
  ele_bar.style.height = barH + "px";

  init();
  function init() {
    scrollDrage(ele_bar); //滚动条的拖拽
    scrollClick(ele_bar); //鼠标点击
    scrollWheel(ele_bar); //鼠标滑轮滚动
  }

  // 滚动条的拖拽

  function scrollDrage(item) {
    item.onmousedown = function (e) {
      //鼠标按下
      e = e || window.event;
      e.preventDefault();
      var e_y = e.pageY; //记录一个点

      document.onmousemove = function (e) {
        var chay = e.pageY - e_y;
        item.style.top = item.offsetTop + chay + "px";
        e_y = e.pageY; //更新移动点
        //判断边界
        if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
          item.style.top = ele_duration.offsetHeight - item.offsetHeight + "px";
        } else if (item.offsetTop < 0) {
          item.style.top = 0 + "px";
        }
        contentMove(item); //对应的关系
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
      };
    };
  }
  //点击按钮
  function scrollClick(item) {
    var ul_node = document.getElementsByClassName("scroll")[0];
    var num = 5;
    ul_node.onclick = function (e) {
      console.log(e.target.className); //
      if (e.target.className == "up") {
        //点击上面
        item.style.top = item.offsetTop - num + "px";
        if (item.offsetTop < 0) {
          item.style.top = 0 + "px";
        }
      } else if (e.target.className == "down") {
        //点击下面
        item.style.top = item.offsetTop + num + "px";
        if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
          item.style.top = ele_duration.offsetHeight - item.offsetHeight + "px";
        }
      }
      contentMove(item); //对应的关系
    };
  }
  //鼠标滑轮事件
  function scrollWheel(item) {
    var num = 5;
    ele_container.onmousewheel = function (e) {
      console.log(e.wheelDelta);
      e.preventDefault();
      if (e.wheelDelta < 0) {
        //向下滑
        item.style.top = item.offsetTop + num + "px";
        if (item.offsetTop + item.offsetHeight > ele_duration.offsetHeight) {
          item.style.top = ele_duration.offsetHeight - item.offsetHeight + "px";
        }
      } else {
        //向上滑

        item.style.top = item.offsetTop - num + "px";
        if (item.offsetTop < 0) {
          item.style.top = 0 + "px";
        }
      }

      contentMove(item); //对应的关系
    };
  }
  //关联--关系

  /***
   *  可滑动区域：y
   *  滑动内容G ：x
   *  比例：  x/y = p
   * 溢出的content内容区域：n
   *得到 H =  滑动的对应的溢出内容的高度
   *
   *  H = p * n
   */

  function contentMove(item) {
    var p = item.offsetTop / (ele_duration.offsetHeight - item.offsetHeight);
    var n = ele_content.offsetHeight - ele_container.offsetHeight;
    var H = Math.floor(p * n);
    ele_content.style.top = -H + "px";
  }
})();
