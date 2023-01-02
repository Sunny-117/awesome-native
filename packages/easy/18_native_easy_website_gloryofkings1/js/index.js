function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * 完成该区域的轮播功能
 * 该函数需要实现手指滑动切换、自动切换
 * @param {HTMLElement} container 轮播容器
 * @param {Number} duration 自动切换的间隔时间，0表示不进行自动切换
 * @param {Function} callback 完成切换后需要调用的函数
 * @return {Function} 返回一个函数，调用函数，可以随意的切换显示的子项
 */
function createSlider(container, duration, callback) {
  var firstItem = container.querySelector('.slider-item'); // 第一个子元素
  var cw = container.clientWidth; // 容器宽度
  var count = container.children.length; // 轮播项的数量
  var curIndex = 0; // 记录当前显示的是第几个

  /**
   * 设置容器高度为当前显示板块的高度
   */
  function setHeight() {
    container.style.height = container.children[curIndex].offsetHeight + 'px';
  }

  setHeight();
  /**
   * 切换到指定的子项
   * @param {Number} index 指定下标
   */
  function switchTo(index) {
    // 判断index的取值范围
    if (index < 0) {
      index = 0;
    }
    if (index > count - 1) {
      index = count - 1;
    }
    curIndex = index; // 改变当前显示的索引
    firstItem.style.transition = '.3s'; // css属性在0.3秒钟内完成变化
    // 设置它的 marginLeft 为-xx容器宽度
    firstItem.style.marginLeft = -index * cw + 'px';
    setHeight();
    // 切换后调用callback
    callback && callback(index);
  }

  // 实现自动切换
  var timer; // 自动切换的计时器

  // 开始自动切换
  function startAuto() {
    if (timer || duration === 0) {
      // 已经有计时器了，说明已经正在自动切换中
      // 或
      // 不能自动切换
      return;
    }
    timer = setInterval(function () {
      switchTo((curIndex + 1) % count);
    }, duration);
  }

  // 停止自动切换
  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  startAuto(); // 开始自动切换

  // 手指滑动切换
  container.ontouchstart = function (e) {
    var x = e.touches[0].clientX; // 记录按下的横坐标
    var y = e.touches[0].clientY;
    var mL = parseFloat(firstItem.style.marginLeft) || 0; // 记录元素的当前marginLeft
    // 停止自动切换
    stopAuto();
    // 停止过渡效果
    firstItem.style.transition = 'none';
    // 手指移动
    container.ontouchmove = function (e) {
      var disX = e.touches[0].clientX - x; //手指在横轴上移动了多远
      var disY = e.touches[0].clientY - y;
      // 如果横向的移动距离小于了纵向的移动距离，啥也不做
      if (Math.abs(disX) < Math.abs(disY)) {
        return;
      }

      var newML = mL + disX; // 计算新的marginLeft
      var minML = -(count - 1) * cw; // 最小的marginLeft
      if (newML < minML) {
        newML = minML;
      }
      if (newML > 0) {
        newML = 0;
      }

      e.preventDefault();
      firstItem.style.marginLeft = newML + 'px';
    };

    // 手指放开
    container.ontouchend = function (e) {
      var disX = e.changedTouches[0].clientX - x; //手指在横轴上移动了多远
      if (disX < -30) {
        // 向左滑动
        switchTo(curIndex + 1);
      } else if (disX > 30) {
        // 向右滑动
        switchTo(curIndex - 1);
      }
      // 自动切换开始
      startAuto();
    };
  };

  return switchTo;
}

// 搞定banner轮播图

(function () {
  var sliderContainer = $('.banner .slider-container');
  var dots = $('.banner .dots');
  createSlider(sliderContainer, 3000, function (index) {
    // 得到之前的active
    var ac = dots.querySelector('.active');
    ac && ac.classList.remove('active');
    dots.children[index].classList.add('active');
  });
})();

// 菜单区域
(function () {
  var isExpand = false; // 当前是否是展开状态
  $('.menu .expand').onclick = function () {
    var txt = this.querySelector('.txt');
    var spr = this.querySelector('.spr');
    var menuList = $('.menu .menu-list');
    if (isExpand) {
      // 当前是展开的
      txt.innerText = '展开';
      spr.classList.add('spr_expand');
      spr.classList.remove('spr_collapse');
      menuList.style.flexWrap = 'nowrap'; // 弹性盒不换行
    } else {
      // 当前是折叠
      txt.innerText = '折叠';
      spr.classList.add('spr_collapse');
      spr.classList.remove('spr_expand');
      menuList.style.flexWrap = 'wrap'; // 弹性盒换行
    }
    isExpand = !isExpand;
  };
})();

/**
 * 进一步封装板块功能
 * @param {HTMLElement} blockContainer
 */
function createBlock(blockContainer) {
  // 创建滚动区域
  var sliderContainer = blockContainer.querySelector('.slider-container');
  // 菜单容器
  var blockMenu = blockContainer.querySelector('.block-menu');
  var goto = createSlider(sliderContainer, 0, function (index) {
    // 干掉之前的选中状态
    var ac = blockMenu.querySelector('.active');
    if (ac) {
      ac.classList.remove('active');
    }
    // ac && ac.classList.remove('active');

    blockMenu.children[index].classList.add('active');
  });
  // 给菜单注册点击事件
  for (let i = 0; i < blockMenu.children.length; i++) {
    blockMenu.children[i].onclick = function () {
      goto(i);
    };
  }
}

// 此代码运行后，变量resp中就保存了获取到的数据
// 搞定新闻资讯
(async function () {
  var resp = await fetch('./data/news.json').then(function (resp) {
    return resp.json();
  });
  var sliderContainer = $('.news-list .slider-container');
  // 生成新闻的元素
  sliderContainer.innerHTML = Object.values(resp)
    .map(function (item) {
      return `<div class="slider-item">${item
        .map(function (item) {
          // item: 每一个新闻对象
          return `<div class="news-item ${item.type}">
      <a href="${item.link}">${item.title}</a>
      <span>${item.pubDate}</span>
    </div>`;
        })
        .join('')}</div>`;
    })
    .join('');

  // for (var key in resp) {
  //   var news = resp[key];
  //   // 生成一个slider-item
  //   var div = document.createElement('div');
  //   div.classList.add('slider-item');
  //   var html = news
  //     .map(function (item) {
  //       // item: 每一个新闻对象
  //       return `<div class="news-item ${item.type}">
  //       <a href="${item.link}">${item.title}</a>
  //       <span>${item.pubDate}</span>
  //     </div>`;
  //     })
  //     .join('');
  //   div.innerHTML = html;
  //   sliderContainer.appendChild(div);
  // }

  createBlock($('.news-list')); // 这个时候还没有元素
})();

// 英雄区域
(async function () {
  /* 
    1-战士
    2-法师
    3-坦克
    4-刺客
    5-射手
    6-辅助
  */
  var resp = await fetch('./data/hero.json').then(function (resp) {
    return resp.json();
  });
  var sliderContainer = $('.hero-list .slider-container');

  // 创建热门英雄
  createSliderItem(
    resp.filter(function (item) {
      return item.hot === 1;
    })
  );
  for (var i = 1; i <= 6; i++) {
    createSliderItem(
      resp.filter(function (item) {
        return item.hero_type === i || item.hero_type2 === i;
        // return [item.hero_type, item.hero_type2].includes(1)
      })
    );
  }

  function createSliderItem(heros) {
    var div = document.createElement('div');
    div.className = 'slider-item';
    div.innerHTML = heros
      .map(function (item) {
        return `<a>
        <img
          src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg"
        />
        <span>${item.cname}</span>
      </a>`;
      })
      .join('');
    sliderContainer.appendChild(div);
  }

  createBlock($('.hero-list'));
})();

// 视频区域
(async function () {
  var resp = await fetch('./data/video.json').then(function (resp) {
    return resp.json();
  });
  var sliderContainer = $('.video-list .slider-container');
  // 生成视频的元素
  for (var key in resp) {
    var videos = resp[key];
    // 生成一个slider-item
    var div = document.createElement('div');
    div.classList.add('slider-item');
    var html = videos
      .map(function (item) {
        // item: 每一个视频对象
        return `<a
        href="${item.link}"
      >
        <img src="${item.cover}" />
        <div class="title">
          ${item.title}
        </div>
        <div class="aside">
          <div class="play">
            <span class="spr spr_videonum"></span>
            <span>${item.playNumber}</span>
          </div>
          <div class="time">${item.pubDate}</div>
        </div>
      </a>`;
      })
      .join('');
    console.log(html);
    div.innerHTML = html;
    sliderContainer.appendChild(div);
  }
  createBlock($('.video-list'));
})();
