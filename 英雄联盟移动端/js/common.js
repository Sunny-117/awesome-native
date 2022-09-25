// 全局通用的一些函数或一开始要执行的全局代码

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function width() {
  return document.documentElement.clientWidth;
}

function height() {
  return document.documentElement.clientHeight;
}

// 创建一个轮播图区域
function createCarousel(carouselId, datas) {
  // 获取整个轮播图容器

  // 获取各种dom元素
  var container = document.getElementById(carouselId);
  var carouselList = container.querySelector(".g_carousel-list");
  var indicator = container.querySelector(".g_carousel-indicator");
  var prev = container.querySelector(".g_carousel-prev");
  var next = container.querySelector(".g_carousel-next");

  var curIndex = 0; // 当前显示的图片索引
  /**
   * 创建轮播图中的各种元素
   */
  function createCarouselElements() {
    var listHtml = ""; // 轮播图列表内部的html
    var indHTML = ""; // 指示器的内部html
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      if (data.link) {
        // 有超链接
        listHtml += `<li>
      <a href="${data.link}" target="_blank">
        <img src="${data.image}">
      </a>
      </li>`;
      } else {
        listHtml += `<li>
        <img src="${data.image}">
      </li>`;
      }
      indHTML += "<li></li>";
    }
    carouselList.style.width = `${datas.length}00%`;
    carouselList.innerHTML = listHtml;
    indicator.innerHTML = indHTML;
  }

  createCarouselElements();

  // 根据目前的索引，设置正确的状态
  function setStatus() {
    carouselList.style.marginLeft = -curIndex * width() + "px";
    // 设置指示器状态
    // 取消之前的selected
    var beforeSelected = indicator.querySelector(".selected");
    if (beforeSelected) {
      beforeSelected.classList.remove("selected");
    }
    indicator.children[curIndex].classList.add("selected");
    // 处理之前和之后
    if (prev) {
      if (curIndex === 0) {
        // 目前是第一张图
        prev.classList.add("disabled"); // 不可用样式
      } else {
        prev.classList.remove("disabled"); // 不可用样式
      }
    }

    if (next) {
      if (curIndex === datas.length - 1) {
        // 目前是最后一张张图
        next.classList.add("disabled"); // 不可用样式
      } else {
        next.classList.remove("disabled"); // 不可用样式
      }
    }
  }

  setStatus();

  // 去上一个
  function toPrev() {
    if (curIndex === 0) {
      return; // 没有上一个
    }
    curIndex--;
    setStatus();
  }

  // 去下一个
  function toNext() {
    if (curIndex === datas.length - 1) {
      return; // 没有下一个
    }
    curIndex++;
    setStatus();
  }
  var timer = null; //自动切换的计时器id
  // 开始自动切换
  function start() {
    if (timer) {
      // 已经在切换了
      return;
    }
    timer = setInterval(function () {
      curIndex++;
      if (curIndex === datas.length) {
        curIndex = 0;
      }
      setStatus();
    }, 2000);
  }

  // 停止自动切换
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  start();
  // 事件
  if (prev) {
    prev.onclick = toPrev;
  }
  if (next) {
    next.onclick = toNext;
  }
  container.ontouchstart = function (e) {
    e.stopPropagation(); // 阻止事件冒泡
    var x = e.touches[0].clientX; // 记录按下横坐标
    // 停止自动播放
    stop();
    // 去掉过渡效果
    carouselList.style.transition = "none";
    var pressTime = Date.now(); // 手指按下的时间
    // 监听移动事件
    container.ontouchmove = function (e) {
      var dis = e.touches[0].clientX - x; // 计算拖动的距离
      carouselList.style.marginLeft = -curIndex * width() + dis + "px";
    };

    // 放手
    container.ontouchend = function (e) {
      var dis = e.changedTouches[0].clientX - x; // 计算拖动的距离
      start();
      // 加上过渡效果
      carouselList.style.transition = "";
      // 不再监听
      container.ontouchmove = null;
      var duration = Date.now() - pressTime; // 滑动的时间
      // 300毫秒内都算快速滑动
      if (duration < 300) {
        if (dis > 20 && curIndex > 0) {
          // 300毫秒内快速的向右滑动了至少20像素
          toPrev();
        } else if (dis < -20 && curIndex < datas.length - 1) {
          // 300毫秒内快速的向左滑动了至少20像素
          toNext();
        } else {
          setStatus();
        }
      } else {
        // 改动curIndex
        if (dis < -width() / 2 && curIndex < datas.length - 1) {
          toNext();
        } else if (dis > width() / 2 && curIndex > 0) {
          toPrev();
        } else {
          setStatus();
        }
      }
    };
  };
}

// ajax请求
async function ajax(url) {
  var reg = /http[s]?:\/\/[^/]+/;
  var matches = url.match(reg);
  if (matches.length === 0) {
    throw new Error("invalid url");
  }
  var target = matches[0];
  var path = url.replace(reg, "");
  return await fetch(`https://proxy.yuanjin.tech${path}`, {
    headers: {
      target,
    },
  }).then((r) => r.json());
}
