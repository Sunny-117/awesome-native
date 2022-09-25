// 该文件实现轮播图的切换

// 有一个机器人：switchImage
// 只要告诉它切换到第几张图片，它就会自动的去完成切换
// n表示第几张图片
function switchImage(n) {
  var value = -n * 100 + "%"; //计算它最终的margin-left
  var ulBanner = document.querySelector(".banner-container .banner-img");
  ulBanner.style.marginLeft = value;

  //下面，搞定下方的li的选中效果
  //清除之前的active
  var before = document.querySelector(".banner-title .active");
  before.className = "";
  //加入active效果
  var ulTitle = document.querySelector(".banner-title");
  ulTitle.children[n].className = "active";
}

// 只要鼠标移入.banner-title元素，就要完成图片的切换
var ulTitle = document.querySelector(".banner-title");
ulTitle.onmouseover = function (e) {
  // 切换图片
  // 要得到是第几张图片，就必须得到当前移入的是第几个li
  // e.target 通过这个表达式，可以得到当前移入的元素的dom对象
  // 先把ulTitle.children变成真的数组
  var children = Array.from(ulTitle.children);
  var index = children.indexOf(e.target);
  currentIndex = index; //更改当前是第几张图片
  switchImage(index);
};

var timer = "";
var currentIndex = 0; //一开始是第1张图片
//开始切换图片（3秒切换一次）
function start() {
  clearInterval(timer); // 管它那么多，先把之前的清除掉，保证只有一个计时器
  timer = setInterval(function () {
    //切换图片
    currentIndex++;
    if (currentIndex == 5) {
      //最大只能是4，到了5，就回到0
      currentIndex = 0;
    }
    switchImage(currentIndex);
  }, 3000);
}

// 停止切换图片
function stop() {
  clearInterval(timer);
}

start();

//最后：鼠标移入banner-container的时候，停止自动切换
// 鼠标移出banner-container的时候，开始自动切换

var bannerContainer = document.querySelector(".banner-container");

bannerContainer.onmouseover = function () {
  stop();
};
bannerContainer.onmouseout = function () {
  start();
};
