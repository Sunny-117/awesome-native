// 获取所有的元素
var doms = document.querySelectorAll('.map .item-list li');
var r = 250; // 半径
var count = doms.length; // 元素的数量

// 平均分布元素
function dispatch() {
  var pieceDeg = 360 / count;
  for (var i = 0; i < count; i++) {
    var dom = doms[i]; // 获得当前这个元素
    // 求该元素的角度
    dom.deg = i * pieceDeg;
    setPosition(dom);
  }
}
// 求一个元素的坐标
function setPosition(dom) {
  var rad = (Math.PI / 180) * dom.deg;
  var x = Math.sin(rad) * r;
  var y = -Math.cos(rad) * r;
  dom.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
}

dispatch();

var step = 0.2; // 每隔一小段时间，每个元素的角度增加0.2

// 开始自动转动
var timerId;
function start() {
  if (timerId) {
    return; // 如果已经在转动了，就别给他压力啦，啥也别做
  }
  timerId = setInterval(function () {
    for (var i = 0; i < count; i++) {
      var dom = doms[i];
      dom.deg += step;
      setPosition(dom);
    }
  }, 16);
}

start();

function stop() {
  clearInterval(timerId);
  timerId = null;
}

// 事件
var itemList = document.querySelector('.map .item-list');

itemList.onmouseenter = function () {
  // 鼠标移入
  stop();
};

itemList.onmouseleave = function () {
  start();
};

var teacher = document.querySelector('.teacher');
var map = document.querySelector('.map');

map.onmousemove = function (e) {
  var half = map.clientWidth / 2;
  if (e.pageX < half) {
    teacher.className = 'teacher left';
  } else {
    teacher.className = 'teacher';
  }
};
