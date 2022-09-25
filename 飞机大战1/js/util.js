/**
 * 产生随机整数，包含下限值，但不包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}
//矩形碰撞检测
function crashChecked(obj1, obj2) {
  var t1 = obj1.offsetTop;
  var l1 = obj1.offsetLeft;
  var r1 = obj1.offsetLeft + obj1.offsetWidth;
  var b1 = obj1.offsetTop + obj1.offsetHeight;

  var t2 = obj2.offsetTop;
  var l2 = obj2.offsetLeft;
  var r2 = obj2.offsetLeft + obj2.offsetWidth;
  var b2 = obj2.offsetTop + obj2.offsetHeight;
  if (!(b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2)) {
    // 表示碰上
    return true;
  } else {
    return false;
  }
}

//碰撞边缘检测
/**
 *
 * @param {小盒子} obj1
 * @param {大盒子} obj2
 */
function check_border_collision(obj1, obj2) {
  //获取obj1当前的左距离和顶距离,盒子的宽和高
  var style1 = window.getComputedStyle(obj1);
  var left1 = parseInt(style1.left);
  var top1 = parseInt(style1.top);
  var w1 = parseInt(style1.width);
  var h1 = parseInt(style1.height);

  //获取obj2的宽和高
  var style2 = window.getComputedStyle(obj2);
  var w2 = parseInt(style2.width);
  var h2 = parseInt(style2.height);

  //检测上下左右是否碰撞
  if (left1 < 0) {
    left1 = 0;
  }
  if (top1 < 0) {
    top1 = 0;
  }
  if (left1 > w2 - w1) {
    left1 = w2 - w1;
  }
  if (top1 > h2 - h1) {
    top1 = h2 - h1;
  }
  //将位置设置到el的样式上
  obj1.style.left = left1 + "px";
  obj1.style.top = top1 + "px";
}
