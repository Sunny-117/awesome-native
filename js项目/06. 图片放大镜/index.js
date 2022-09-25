// 封装一个获取DOM元素的方法

// 单一元素
function $(selector) {
  return document.querySelector(selector);
}

// 多个元素
function $$(selector) {
  return document.querySelectorAll(selector);
}

// 初始化数据图片
var imgs = {
  // 小图
  small: ['imgA_1.jpg', 'imgB_1.jpg', 'imgC_1.jpg'],
  // 中图
  middle: ['imgA_2.jpg', 'imgB_2.jpg', 'imgC_2.jpg'],
  // 大图
  large: ['imgA_3.jpg', 'imgB_3.jpg', 'imgC_3.jpg']
}

// 获取一些将要使用的dom元素
// document.getElementsByClassName('container')[0]
// document.querySelector('.container');
var container = $('.container');
var largeImg = $('.right-img');
var midImg = $('.left-img');
var smallImg = $('.img-list');
var mask = $('.mask');

// a. 初始化页面
// 1. 初始化所有缩略图
// var str = '';
// for(var i=0; i<imgs.small.length; i++) {
//   str += '<li style="background-image: url(./images/'+ imgs.small[i] +');"></li>'
// }
// smallImg.innerHTML = str;
// // 2. 默认选中第一个缩略图
// $('.img-list li').style.border = '2px solid #000';

// b. 绑定事件
// 两大类事件类型， 点击， 鼠标移入移出
// 1. 点击事件, 事件委托
smallImg.onclick = function (e) {
  // 判断我点击的元素是li元素
  if (e.target.tagName == 'LI') {
    // 让所有li元素取消border
    var lis = $$('li');
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.border = 'none';
    }
    // 让选中的li元素添加border
    e.target.style.border = '2px solid #000';

    // 点击缩略图后，原图和大图也需要跟着变换，
    // 点的是第几个元素, 获取元素索引
    // [1,2,3].indexOf(3) == 2
    var index = [].indexOf.call(lis, e.target);
    midImg.style.backgroundImage = 'url(./images/' + imgs.middle[index] + ')';
    largeImg.style.backgroundImage = 'url(./images/' + imgs.large[index] + ')';
  }
}

// 2.移动，移出事件
// 1. 移动事件
// midImg.onmousemove = function (e) {
//   // 让遮罩层和大图展示
//   mask.style.opacity = 1;
//   largeImg.style.opacity = 1;

//   // 根据鼠标位置计算遮罩层的位置
//   var left = e.clientX - midImg.offsetLeft - mask.offsetWidth / 2;
//   // 同理
//   var top = e.clientY - midImg.offsetTop - mask.offsetHeight / 2;

//   // 边界条件
//   if (left <= 0) {
//     left = 0;
//   }
//   if (top <=0 ) {
//     top = 0;
//   }
//   if (left >= midImg.offsetWidth - mask.offsetWidth) {
//     left = midImg.offsetWidth - mask.offsetWidth
//   }
//   if (top >= midImg.offsetHeight - mask.offsetHeight) {
//     top = midImg.offsetHeight - mask.offsetHeight
//   }
//   // 根据top和left调整mask的位置
//   mask.style.left = left + 'px';
//   mask.style.top = top + 'px';

//   // 根据top 和 left，修改大图的位置，background-position-x
//   largeImg.style.backgroundPositionX = -left + 'px';
//   largeImg.style.backgroundPositionY = -top + 'px';

// }

// // 2. 移出
// midImg.onmouseleave = function (e) {
//   // 让遮罩层和大图消失
//   mask.style.opacity = 0;
//   largeImg.style.opacity = 0;
// }

// 函数封装，一键启动
// 函数本质：若干步骤的集合

// 初始化页面函数
function initPage() {
  var str = '';
  for (var i = 0; i < imgs.small.length; i++) {
    str += '<li style="background-image: url(./images/' + imgs.small[i] + ');"></li>'
  }
  smallImg.innerHTML = str;
  // 2. 默认选中第一个缩略图
  $('.img-list li').style.border = '2px solid #000';
}

// 绑定事件
function bindEvent() {
  midImg.onmousemove = function (e) {
    // 让遮罩层和大图展示
    mask.style.opacity = 1;
    largeImg.style.opacity = 1;

    // 根据鼠标位置计算遮罩层的位置
    var left = e.clientX - midImg.offsetLeft - mask.offsetWidth / 2;
    // 同理
    var top = e.clientY - midImg.offsetTop - mask.offsetHeight / 2;

    // 边界条件
    if (left <= 0) {
      left = 0;
    }
    if (top <= 0) {
      top = 0;
    }
    if (left >= midImg.offsetWidth - mask.offsetWidth) {
      left = midImg.offsetWidth - mask.offsetWidth
    }
    if (top >= midImg.offsetHeight - mask.offsetHeight) {
      top = midImg.offsetHeight - mask.offsetHeight
    }
    // 根据top和left调整mask的位置
    mask.style.left = left + 'px';
    mask.style.top = top + 'px';

    // 根据top 和 left，修改大图的位置，background-position-x
    largeImg.style.backgroundPositionX = -left + 'px';
    largeImg.style.backgroundPositionY = -top + 'px';

  }

  // 2. 移出
  midImg.onmouseleave = function (e) {
    // 让遮罩层和大图消失
    mask.style.opacity = 0;
    largeImg.style.opacity = 0;
  }
}

// initPage();
// bindEvent();

// 一键启动，执行一个函数

function main() {
  initPage();
  bindEvent();
}

main();