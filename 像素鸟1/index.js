var bird = {
  skyPosition: 0, // 天空背景位置
  skyStep: 2, // 天空背景移动步长
  boundColor: 'white', // 开始游戏文字颜色
  birdTop: 220, // 小鸟的高度值
  startFlag: false,
  birdStepY: 0,
  score: 0, // 游戏得分
  minTop: 0, // 地平线 高度
  maxTop: 570, // 天空高度
  pipeLength: 7,
  pipeArr: [],
  init: function () {
    this.initData();
    this.animate();
    this.handle();
    if (getSession('play')) {
      this.start();
    }
  },
  initData: function () {
    this.el = document.getElementById('game');
    this.oStart = this.el.getElementsByClassName('start')[0];
    this.oBird = this.el.getElementsByClassName('bird')[0];
    this.oScore = this.el.getElementsByClassName('score')[0];
    this.oUsername = document.getElementById('username');
    this.oPassword = document.getElementById('password');
    this.oMask = this.el.getElementsByClassName('mask')[0];
    this.oEnd = this.el.getElementsByClassName('end')[0];
    this.oFinalScore = this.oEnd.getElementsByClassName('final-score')[0];
    this.oRankList = this.oEnd.getElementsByClassName('rank-list')[0];
    this.oReStart = this.el.getElementsByClassName('restart')[0];
    this.scoreArr = this.getScore();
  },
  getScore:  function () {
    var scoreArr = getLocal('score');
    return scoreArr ? JSON.parse(scoreArr) : [];
  },
  animate: function () {
    var self = this;
    var count = 0;

    this.timer = setInterval(function () {
      self.skyMove();
      if(self.startFlag) {
        self.pipeMove();
        self.birdDrop();
      }

      if(++ count % 10 === 0) {
        if(!self.startFlag) {
          self.startBound();
          self.birdJump();
        }
        self.birdFly(count);
      }
    }, 30)
  },
  skyMove: function () {
    this.skyPosition -= this.skyStep;
    this.el.style.backgroundPositionX = this.skyPosition + 'px';
  },
  startBound: function () {
    var prevColor = this.boundColor;
    this.boundColor = prevColor === 'white' ? 'blue' : 'white';
    this.oStart.classList.remove('start--' + prevColor);
    this.oStart.classList.add('start--' + this.boundColor)
  },
  birdJump: function () {
    this.birdTop = this.birdTop === 260 ? 220 : 260;
    this.oBird.style.top = this.birdTop + 'px';
  },
  birdFly: function (count) {
    this.oBird.style.backgroundPositionX = count % 3 * -30 + 'px';
  },
  birdDrop: function () {
    this.birdTop += ++ this.birdStepY;
    this.oBird.style.top = this.birdTop + 'px';
    this.judgeKnock();
    this.addScore();
  },
  pipeMove: function () {
    for(var i = 0; i < this.pipeLength; i ++) {
      var oUpPipe = this.pipeArr[i].up;
      var oDownPipe = this.pipeArr[i].down;
      var x = oUpPipe.offsetLeft - this.skyStep;
      if(x < -52) {
        var pipeHeight = this.getPipeHeight(); // 获得每组柱子的高度
        var upHeight = pipeHeight.up;  // 上柱子高度
        var downHeight = pipeHeight.down; // 下柱子高度
        var lastPipeLeft = this.pipeArr[this.lastPipeIndex].up.offsetLeft; // 找规律(score+5)%7视图上最后一组柱子的left值
        oUpPipe.style.height = upHeight + 'px';
        oDownPipe.style.height = downHeight + 'px';
        oUpPipe.style.left = oDownPipe.style.left = lastPipeLeft + 300 + 'px';
        this.pipeArr[i].y = [upHeight, upHeight + 150]; // 更改上柱子底部top值，以及下柱子顶部top值
        continue;
      }
      oUpPipe.style.left = oDownPipe.style.left = x + 'px';
    }
  },
  addScore: function () {
    var pipeX = this.pipeArr[this.score % this.pipeLength].up.offsetLeft;
    if(pipeX < 13) { // 13？ 柱子正好越过小鸟的距离 => 见图示二
      this.oScore.innerText = ++ this.score; // 分数加一
      this.lastPipeIndex = (this.score + this.pipeLength - 1 - 1 ) % this.pipeLength; // 更改视图中最后一根柱子的索引值
    }
  },
  /**
   * 小鸟碰撞检测
   *  1. 是否撞击临界（即最上方和最下方），一旦撞击，则失败
   *  2. 是否撞击到柱子，一旦撞击，则失败
   */
  judgeKnock: function () {
    this.judgeBoundary();
    this.judgePipe();
  },
  /**
   *  判断小鸟是否撞击临界（即最上方和最下方），一旦撞击，则失败
   */
  judgeBoundary: function () {
    if(this.birdTop < this.minTop || this.birdTop > this.maxTop) {
      this.failGame();
    }
  },
  /**
   * 判断小鸟是否撞击柱子，一旦撞击，则失败
   */
  judgePipe: function () {
    var index = this.score % this.pipeLength; // 最前面一组柱子的索引
    var pipeX = this.pipeArr[index].up.offsetLeft //  获取柱子的 left值
    var pipeY = this.pipeArr[index].y;  // 获取上柱子底部的值 和 下柱子顶部的值
    var birdY = this.oBird.offsetTop; // 获取小鸟的top值

    // 如果柱子的left值范围为[13, 95]时，小鸟的高度小于上柱子底部的top值 或者 大于下柱子顶部的top值时，则失败
    // 95 ? => 80 + 15 => 见图示-1
    // 15 ? => 80 - 15 - 52 => 见图示-2
    if((pipeX <= 95 && pipeX >= 13) && (birdY <= pipeY[0] || birdY >= pipeY[1])) {
      this.failGame();
    }
  },
  /**
   * 处理事件的函数
   */
  handle: function () {
    this.handleStart();
    this.handelClick();
    this.handleReStart();
  },
  /**
   * 点击开始游戏按钮
   * 1. 小鸟元素消失
   * 2. 文字元素消失
   * 3. 登录元素出现
  */
  handleStart: function () {
    this.oStart.onclick = this.start.bind(this);
  },
  start: function () {
    var self = this;
    self.oStart.style.display = 'none';
    self.oBird.style.display = 'none';
    self.oBird.style.display = 'block'; // 小鸟元素出现
    self.oBird.style.left = '80px'; // 小鸟元素出现在屏幕左侧
    self.oBird.style.transition = 'none'; // 取消小鸟的过渡transition
    self.oScore.style.display = 'block'; // 分数元素出现
    self.skyStep = 5; // 设置天空移动步长变大，即天空移动速度变快
    self.startFlag = true;
    for(var i = 0; i < self.pipeLength; i ++) {
      self.createPipe(300 * (i + 1));
    }
  },
  handelClick: function () {
    var self = this;
    this.el.onclick = function (e) {
      if(self.startFlag && !e.target.classList.contains('start')) {
        self.birdStepY = -10;
      }
    };
  },
  handleReStart: function () {
    this.oReStart.onclick = function () {
      setSession('play', true);
      window.location.reload();
    };
  },
  /**
   * 创建柱子
   * @param {Number} x - 柱子距离左侧的距离
   */
  createPipe: function (x) {
    var pipeHeight = this.getPipeHeight();
    var upHeight = pipeHeight.up;
    var downHeight = pipeHeight.down;

    var oUpPipe = createEle('div', ['pipe', 'pipe--up'], {
      height: upHeight + 'px',
      left: x + 'px',
    })

    var oDownPipe = createEle('div', ['pipe', 'pipe--down'], {
      height: downHeight + 'px',
      left: x + 'px',
    })

    this.el.appendChild(oUpPipe);
    this.el.appendChild(oDownPipe);

    this.pipeArr.push({
      up: oUpPipe,
      down: oDownPipe,
      y: [upHeight, upHeight + 150],
    })

  },
  getPipeHeight: function () {
    var upHeight = 50 + Math.floor(Math.random() * 175);
    var downHeight = 600 - upHeight - 150;

    return {
      up: upHeight,
      down: downHeight,
    }
  },
  
   /**
   * 游戏失败
   */
  failGame: function () {
    clearInterval(this.timer);
    var template = '';
    var length = this.setScore();
    length = length > 8 ? 8 : length;
    this.playFlag = false;
    this.oMask.style.display = 'block';
    this.oEnd.style.display = 'block';
    this.oScore.style.display = 'none';
    this.oFinalScore.innerText = this.score;
    for(var i = 0; i < length; i ++) {
      var scoreInfo= this.scoreArr[i];
      var degreeClass = '';
      switch (i) {
        case 0:
          degreeClass = 'first';
          break;
        case 1:
          degreeClass = 'second';
          break;
        case 2:
          degreeClass = 'third';
          break;
      }
      template += `
        <li class="rank-item">
        <span class="rank-degree ${degreeClass}">${i + 1}</span>
        <span class="rank-score">${scoreInfo.score}</span>
        <span class="rank-time">${scoreInfo.time}</span>
      </li>
      `;
    }
    this.oRankList.innerHTML = template;
  },
  setScore: function () {
    this.scoreArr.push({
      score: this.score,
      time: this.getDate(),
    })

    this.scoreArr.sort(function(a, b) {
      return b.score - a.score;
    })

    setLocal('score', JSON.stringify(this.scoreArr));

    return this.scoreArr.length;
  },
  getDate: function () {
    var d = new Date();
    var year = d.getFullYear();
    var month = formatNum(d.getMonth() + 1);
    var day = formatNum(d.getDate());
    var hour = formatNum(d.getHours());
    var minute = formatNum(d.getMinutes());
    var second = formatNum(d.getSeconds());
    return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
  },
}
