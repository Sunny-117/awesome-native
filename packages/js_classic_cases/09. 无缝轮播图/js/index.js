(function () {
  function $(selector) {
    return document.querySelector(selector);
  }

  // 初始化
  var curIndex = 0; // 当前显示的是第几张图片
  var doms = {
    container: $('.carousel-container'),
    carouselList: $('.carousel-list'),
    indicator: $('.indicator'),
    arrowLeft: $('.arrow-left'),
    arrowRight: $('.arrow-right'),
  };
  var containerWidth = doms.container.clientWidth; // 容器可见区域的宽度
  var urls = [
    './img/Wallpaper1.jpg',
    './img/Wallpaper2.jpg',
    './img/Wallpaper3.jpg',
    './img/Wallpaper4.jpg',
    './img/Wallpaper5.jpg',
  ]; //记录了要显示的所有轮播图的图片路径

  function init() {
    function _createImg(url) {
      var img = document.createElement('img');
      img.src = url;
      img.className = 'carousel-item';
      doms.carouselList.appendChild(img);
    }

    for (var i = 0; i < urls.length; i++) {
      _createImg(urls[i]);
      // 创建指示器
      var div = document.createElement('div');
      div.className = 'indicator-item';
      doms.indicator.appendChild(div);
    }

    // 多加一张额外的图片
    _createImg(urls[0]);
    // 设置容器宽度
    doms.carouselList.style.width = doms.carouselList.children.length + '00%';
    // 设置指示器的激活状态
    setIndicatorStatus();
  }

  /**
   * 根据curIndex设置指示器的状态
   */
  function setIndicatorStatus() {
    // 1. 将目前激活的指示器取消激活
    var active = $('.indicator-item.active');
    if (active) {
      active.className = 'indicator-item';
    }
    // 2. 激活当前的指示器
    var index = curIndex;
    if (index > urls.length - 1) {
      index = 0;
    }
    doms.indicator.children[index].className = 'indicator-item active';
  }

  init();

  // 交互
  var totalMS = 300;
  var isPlaying = false; // 是否有正在进行的切换动画
  /**
   * 将轮播图从当前的位置，切换到newIndex位置
   * @param {*} newIndex 新的位置的图片索引
   */
  function moveTo(newIndex, onend) {
    if (isPlaying || newIndex === curIndex) {
      return; // 有动画进行 或 切换目标和当前一致，不做任何事情
    }
    isPlaying = true;
    var from = parseFloat(doms.carouselList.style.marginLeft) || 0;
    var to = -newIndex * containerWidth;

    createAnimation({
      from: from,
      to: to,
      totalMS: totalMS,
      onmove: function (n) {
        doms.carouselList.style.marginLeft = n + 'px';
      },
      onend: function () {
        isPlaying = false;
        onend && onend();
      },
    });

    curIndex = newIndex; // 更改当前显示的图片索引
    setIndicatorStatus();
  }

  // 处理指示器的点击事件
  for (var i = 0; i < doms.indicator.children.length; i++) {
    (function (i) {
      doms.indicator.children[i].onclick = function () {
        moveTo(i);
      };
    })(i);
  }

  function next() {
    var newIndex = curIndex + 1;
    var onend;
    if (newIndex === doms.carouselList.children.length - 1) {
      // 切换到最后一张图片了
      // 等动画完成后，要回到第一张图片
      onend = function () {
        doms.carouselList.style.marginLeft = 0;
        curIndex = 0;
      };
    }
    moveTo(newIndex, onend);
  }

  function prev() {
    var newIndex = curIndex - 1;
    if (newIndex < 0) {
      var maxIndex = doms.carouselList.children.length - 1;
      doms.carouselList.style.marginLeft = -maxIndex * containerWidth + 'px';
      newIndex = maxIndex - 1;
    }
    moveTo(newIndex);
  }

  doms.arrowLeft.onclick = prev;
  doms.arrowRight.onclick = next;

  var duration = 2000; // 自动切换的间隔
  var timerId;
  function autoStart() {
    if (timerId) {
      // 已经有自动切换在进行了
      return;
    }
    timerId = setInterval(next, duration);
  }

  function autoStop() {
    clearInterval(timerId);
    timerId = null;
  }

  autoStart(); // 最开始自动切换
  doms.container.onmouseenter = autoStop;
  doms.container.onmouseleave = autoStart;
})();
