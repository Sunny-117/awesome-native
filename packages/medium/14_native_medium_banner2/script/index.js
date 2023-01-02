//配置对象
var config = {
  imgWidth: 520, //一张图片的宽度
  dotWidth: 12, //一个小圆点的宽度
  doms: {
    //记录一些需要用到的dom元素
    divBanner: document.querySelector(".banner"),
    divImgs: document.querySelector(".banner .imgs"),
    divDots: document.querySelector(".banner .dots"),
    divArrows: document.querySelector(".banner .arrow"),
  },
  currentIndex: 0, //当前显示的是第几张图片，从0开始，到imgNumber-1，注意，该属性不考虑额外的图片
  animate: {
    //动画配置
    id: null, //计时器的id
    duration: 16, //运动的间隔时间
    total: 500, //运动的总时间
  },
};
config.imgNumber = config.doms.divImgs.children.length; //图片数量

/**
 * 初始化
 */
function init() {
  //设置尺寸
  config.doms.divImgs.style.width =
    (config.imgNumber + 2) * config.imgWidth + "px";
  config.doms.divDots.style.width = config.imgNumber * config.dotWidth + "px";
  //设置元素
  var firstChild = config.doms.divImgs.firstElementChild,
    lastChild = config.doms.divImgs.lastElementChild;
  //克隆
  var firstClone = firstChild.cloneNode(true); //深度克隆
  config.doms.divImgs.appendChild(firstClone);
  var lastClone = lastChild.cloneNode(true);
  config.doms.divImgs.insertBefore(lastClone, firstChild);
  //处理小圆点
  for (var i = 0; i < config.imgNumber; i++) {
    var span = document.createElement("span");
    config.doms.divDots.appendChild(span);
  }
  setDotsStatus();
  //设置divImgs的marginLeft
  config.doms.divImgs.style.marginLeft =
    getCorrectMarginLeft(config.currentIndex) + "px";

  regEvent();
}

/**
 * 设置小圆点的状态
 */
function setDotsStatus() {
  for (var i = 0; i < config.doms.divDots.children.length; i++) {
    var span = config.doms.divDots.children[i];
    if (i === config.currentIndex) {
      //激活状态
      span.className = "active";
    } else {
      span.className = "";
    }
  }
}

/**
 * 得到正确的margin-left值
 */
function getCorrectMarginLeft(index) {
  return (-index - 1) * config.imgWidth;
}

init();

/**
 * 切换图片
 * @param {*} index 切换的目标图片的索引
 * @param {*} direction 方向  "right"  "left"
 */
function switchTo(index, direction) {
  //不切换的情况
  if (index === config.currentIndex) {
    return;
  }
  //终极目标，改变divimgs的marginleft
  var newLeft = getCorrectMarginLeft(index); //得到最终的marginLeft
  //动画：当前的marginLeft ----时间，逐步的--->  newLeft
  animateBegin();

  //设置其他状态
  config.currentIndex = index;
  setDotsStatus();

  /**
   * 完成动画
   */
  function animateBegin() {
    //清除之前的运动
    stopAnimate();
    //1. 计算运动次数
    var number = Math.ceil(config.animate.total / config.animate.duration);
    var curNumber = 0; //当前运动的次数
    //2. 总距离计算
    var curLeft = parseFloat(config.doms.divImgs.style.marginLeft); //当前的marginLeft
    var distance; //距离
    var totalWidth = config.imgNumber * config.imgWidth;
    if (direction === "right") {
      if (newLeft < curLeft) {
        distance = newLeft - curLeft;
      } else {
        distance = -(totalWidth - Math.abs(newLeft - curLeft));
      }
    } else {
      if (newLeft > curLeft) {
        distance = newLeft - curLeft;
      } else {
        distance = totalWidth - Math.abs(newLeft - curLeft);
      }
    }

    //3. 计算每次运动的位移
    // 位移 = 总距离 / 次数
    var everyDis = distance / number;
    config.animate.id = setInterval(function () {
      //运动到达足够的次数后终止
      //当前的marginLeft加上一段位移
      curLeft += everyDis;
      //处理平滑移动
      if (
        direction === "right" &&
        Math.abs(curLeft) >= (config.imgNumber + 0.5) * config.imgWidth
      ) {
        curLeft += totalWidth;
      } else if (
        direction === "left" &&
        Math.abs(curLeft) <= 0.5 * config.imgWidth
      ) {
        curLeft -= totalWidth;
      }

      config.doms.divImgs.style.marginLeft = curLeft + "px";
      curNumber++;
      if (curNumber === number) {
        //停止
        stopAnimate();
      }
    }, config.animate.duration);
  }

  /**
   * 停止动画
   */
  function stopAnimate() {
    clearInterval(config.animate.id);
    config.animate.id = null;
  }
}

//注册事件
function regEvent() {
  config.doms.divDots.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
      var index = Array.from(config.doms.divDots.children).indexOf(e.target);
      switchTo(index, index > config.currentIndex ? "right" : "left");
    }
  };

  config.doms.divArrows.onclick = function (e) {
    if (e.target.className === "item left") {
      //左
      var index = config.currentIndex - 1;
      if (index < 0) {
        index = config.imgNumber - 1;
      }
      switchTo(index, "left");
    } else if (e.target.className === "item right") {
      //右
      // var index = config.currentIndex + 1;
      // if (index > config.imgNumber - 1) {
      //     index = 0;
      // }
      var index = (config.currentIndex + 1) % config.imgNumber;
      switchTo(index, "right");
    }
  };
}
