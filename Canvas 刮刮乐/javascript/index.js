window.onload = function () {

  //1. 获取canvas标签
  var cas = document.getElementById("cas");
  //2. 获取绘图工具
  var ctx = cas.getContext("2d");

  // 把整个画布用银灰色进行填充
  ctx.fillStyle = "#b5b5b5";
  ctx.rect(0, 0, cas.width, cas.height);
  ctx.fill();

  // 给画布设置中奖图片作为背景
  cas.style.background = "url(./images/yidengjiang.png) no-repeat center / cover";

  // loc 就是一个参数，里面有鼠标的 x 和 y 坐标
  function eraser(loc){
    // 保存一下画布的正常状态
    ctx.save();

    ctx.beginPath();
    // arc 先在指定的xy坐标位置 绘制一个圆形的路径（草稿）
    ctx.arc(loc.x, loc.y, 10, 0, Math.PI * 2);
    // clip方法可以将后续的操作（画图、清空画布）限定在上面的小圆里
    ctx.clip();
    // 清空画布
    ctx.clearRect(0, 0, cas.width, cas.height);

    // 把画布恢复到正常状态
    ctx.restore();
  }

  // var loc = {x: 100, y: 100}
  // var loc1 = {x: 200, y: 100}
  // eraser(loc);
  // eraser(loc1);

  // 鼠标的的按住移动的事件
  // 在鼠标被按住移动的时候，我们需要在鼠标经过的每一个点上，调用一下eraser方法
  
  // var isMouseDown;
  // cas.onmousedown = function(e){
  //   // 获取到鼠标相对于canvas的坐标
  //   var loc = windowToCanvas(e);
  //   eraser(loc);
  //   isMouseDown = true;
  // }

  // cas.onmousemove = function(e) {
  //   if(isMouseDown){
  //     var loc = windowToCanvas(e);
  //     eraser(loc);
  //   }
  // }

  // cas.onmouseup = function(){
  //   isMouseDown = false;
  // }

  cas.onmousedown = function(e){
    // 获取到鼠标相对于canvas的坐标
    var loc = windowToCanvas(e);
    eraser(loc);

    // 给document注册移动事件
    document.onmousemove = function(e){
      var loc = windowToCanvas(e);
      eraser(loc);
    }
  }

  document.onmouseup = function(){
    document.onmousemove = null;
  }

  function windowToCanvas(e){
    return {
      x: e.clientX - cas.offsetLeft,
      y: e.clientY - cas.offsetTop
    }
  }
};
