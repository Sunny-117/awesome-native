var curPageIndex = 0;
(function () {
  // 当前显示的页面索引

  var pageContainer = $(".page-container");
  var pageNumber = pageContainer.children.length; // 页面数量
  // 设置页面容器的margin-top为合适的值
  function toPage() {
    // 让容器包含过渡效果
    pageContainer.style.transition = "500ms";
    // document.documentElement.clientHeight 屏幕高度
    pageContainer.style.marginTop =
      -curPageIndex * document.documentElement.clientHeight + "px";
  }

  toPage();

  pageContainer.ontouchstart = function (e) {
    var y = e.changedTouches[0].clientY; // 手指按下时的纵坐标
    pageContainer.style.transition = "none";
    // 按下后监听手指的移动
    pageContainer.ontouchmove = function (e) {
      var dis = e.changedTouches[0].clientY - y; // 计算距离
      // 计算page-container的margin-top
      var mtop = -curPageIndex * document.documentElement.clientHeight + dis;
      if (mtop > 0) {
        mtop = 0; // 最大值为0
      } else if (
        mtop <
        -(pageNumber - 1) * document.documentElement.clientHeight
      ) {
        // 最小值
        mtop = -(pageNumber - 1) * document.documentElement.clientHeight;
      }
      pageContainer.style.marginTop = mtop + "px";
    };

    // 按下后监听手指抬起
    pageContainer.ontouchend = function (e) {
      // 手指抬起后到按下的距离
      var dis = e.changedTouches[0].clientY - y; // 计算距离
      if (Math.abs(dis) <= 30) {
        // 手指移动的不多
        toPage(); // 回到当前正确的位置
      } else if (dis > 0 && curPageIndex > 0) {
        // 向下移动 并且 目前不是第一页
        curPageIndex--;
        toPage();
      } else if (dis < 0 && curPageIndex < pageNumber - 1) {
        // 向上移动 并且 目前不是最后一页
        curPageIndex++;
        toPage();
      }

      // 手指抬起后，取消监听移动和抬起
      pageContainer.ontouchmove = null;
      pageContainer.ontouchend = null;
    };
  };
})();

(async function () {
  showLoading(); // 加载中
  // 1. 获取远程数据
  var resp = await fetch(
    `https://bless.yuanjin.tech/api/bless?id=${location.search.replace(
      "?",
      ""
    )}`
  );
  resp = await resp.json();
  resp = resp.data;
  console.log(resp);
  // 2. 根据远程数据，设置页面中的各种区域
  (function () {
    // 第一页
    $(".page1 .g-btn").innerText = `来自「${resp.author}」的祝福`;
    // 第二页
    var pre = $(".page2 .note pre");
    pre.innerText = resp.content;
    // 看一下，内容部分是否有滚动条
    if (pre.clientHeight !== pre.scrollHeight) {
      // 有滚动条
      // 不能阻止默认行为
      pre.dataset.default = true;
      // 阻止事件冒泡
      pre.ontouchstart = function (e) {
        e.stopPropagation();
      };
    }
    // 看一下，有没有录音
    if (resp.audioUrl) {
      // 设置音频
      $("#soundAudio").src = resp.audioUrl;
    } else {
      // 没有录音
      $(".page2 .g-tape").remove();
      $(".page2 .g-btn").remove();
      $(".page2 .note").style.top = "1rem";
    }
    // 设置背景音乐的音频
    $("#bgMusicAudio").src = `./assets/media/${resp.bgMusicIndex}.mp3`;
  })();

  // 3. 实现摇一摇
  (function () {
    /**
     * 启用摇一摇事件
     * 由于某些手机的限制，该方法必须在某个元素点击后调用
     **/
    async function regShakenEvent() {
      try {
        await utils.regShakenEvent(); // 启用摇一摇
      } catch (err) {
        /*
         * 不支持devicemotion事件的手机
         * 或
         * 用户不允许监听设备运动
         */
        alert("由于权限问题，无法使用摇一摇功能");
      }
    }

    $(".page3 .g-modal .g-btn").onclick = function () {
      regShakenEvent();
      $(".page3 .g-modal").remove();
    };

    window.addEventListener("shaken", function () {
      showBlessCard();
    });

    // 弹出祝福卡片
    function showBlessCard() {
      if (curPageIndex !== 2) {
        // 只有第3页才能弹出卡片
        return;
      }
      var divModal = $("#divBlessCard");
      if (divModal) {
        // 先关闭
        closeBelssCard();
        // 再打开
        setTimeout(_showBlessCard, 500);
      } else {
        _showBlessCard();
      }

      function _showBlessCard() {
        var divModal = $$$("div");
        divModal.id = "divBlessCard";
        divModal.className = "g-modal";
        divModal.innerHTML = `
      <div class="bless-card">
        <img src="./assets/bless-card/${Math.floor(
          Math.random() * 7
        )}.png" alt="" />
        <div class="g-seal"></div>
        <div class="close">
          <div class="close-btn"></div>
        </div>
      </div>`;
        var blessCard = divModal.querySelector(".bless-card");
        blessCard.style.transition = "500ms";
        document.body.appendChild(divModal);
        blessCard.style.transform = "scale(0)";
        blessCard.clientHeight; // 强行让浏览器渲染一次 reflow
        blessCard.style.transform = "scale(1)";

        // 播放摇一摇音频
        var aud = $("#shakenAudio");
        aud.currentTime = 0; // 播放进度归零
        aud.play();

        divModal.dataset.default = true;
        divModal.onclick = closeBelssCard;

        divModal.querySelector(".close-btn").dataset.default = true;
      }
    }

    // 关闭祝福卡片
    function closeBelssCard() {
      var divModal = $("#divBlessCard");
      if (!divModal) {
        return; // 之前都没有弹出
      }
      //1. 先缩小
      var blessCard = divModal.querySelector(".bless-card");
      blessCard.style.transform = "scale(0)";
      //2. 再关闭
      setTimeout(function () {
        divModal.remove();
      }, 500);
    }
  })();

  // 4. 控制声音
  // 背景音乐
  var bgMusic = {
    audio: $("#bgMusicAudio"),
    isPlayed: false, // 是否播放过
    // 播放音乐
    play: async function () {
      try {
        await this.audio.play();
        this.isPlayed = true; // 已经播放过了
      } catch {
        alert("你的浏览器不支持自动播放\n你可以点击右上角的按钮手动播放");
      }
    },
    // 暂停
    pause: function () {
      this.audio.pause();
    },
    // 设置音量
    setVolume: function (value) {
      this.audio.volume = value;
    },
  };

  // 祝福语音
  var sound = {
    audio: $("#soundAudio"),
    isPlayed: false, // 是否播放过
    play: function () {
      this.audio.play();
      this.isPlayed = true;
      // 设置背景音乐的音量小一点
      bgMusic.setVolume(0.3);
      // 播放语音时，有可能顺带播放背景音乐
      if (!bgMusic.isPlayed) {
        bgMusic.play();
      }
    },
    pause: function () {
      this.audio.pause();
      bgMusic.setVolume(1);
    },
  };

  // 将与声音相关的所有元素设置为正确的状态
  function setElementStatus() {
    // 设置右上角元素的状态
    if (bgMusic.audio.paused) {
      // 音乐暂停，添加类样式 music-close
      $(".music").classList.add("music-close");
    } else {
      // 音乐正在播放
      $(".music").classList.remove("music-close");
    }
    if (!resp.audioUrl) {
      return;
    }
    // 设置磁带的状态
    if (sound.audio.paused) {
      // 语音没有播放
      $(".page2 .g-tape").classList.remove("playing");
    } else {
      $(".page2 .g-tape").classList.add("playing");
    }
    // 按钮文字
    var btn = $(".page2 .g-btn");
    if (sound.isPlayed) {
      if (sound.audio.paused) {
        // 当前声音是暂停的
        btn.innerText = "播放";
      } else {
        btn.innerText = "暂停";
      }
    } else {
      // 从来没有播放过语音
      btn.innerText = "播放祝福语音";
    }
  }

  bgMusic.play(); // 最开始，播放背景音乐
  setElementStatus(); // 设置状态

  $(".music").onclick = function () {
    if (bgMusic.audio.paused) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
    setElementStatus();
  };
  if (resp.audioUrl) {
    $(".page2 .g-btn").onclick = function () {
      if (sound.audio.paused) {
        sound.play();
      } else {
        sound.pause();
      }
      setElementStatus();
    };
  }

  sound.audio.onended = function () {
    setElementStatus();
    $(".page2 .g-btn").innerText = "重新播放";
  };

  // 我也要送祝福 事件
  $(".page3 .g-btn").onclick = function () {
    // 跳转页面
    location.href = `bless.html?${location.search.replace("?", "")}`;
  };

  hideLoading(); // 关闭加载
})();
