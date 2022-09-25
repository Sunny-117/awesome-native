function createAnimation(options) {
  var from = options.from; // 起始值
  var to = options.to; // 结束值
  var totalMS = options.totalMS || 1000; // 变化总时间
  var duration = options.duration || 15; // 动画间隔时间
  var times = Math.floor(totalMS / duration); // 变化的次数
  var dis = (to - from) / times; // 每一次变化改变的值
  var curTimes = 0; // 当前变化的次数
  var timerId = setInterval(function () {
    from += dis;
    curTimes++; // 当前变化增加一次
    if (curTimes >= times) {
      // 变化的次数达到了
      from = to; // 变化完成了
      clearInterval(timerId); // 不再变化了
      options.onmove && options.onmove(from);
      options.onend && options.onend();
      return;
    }
    // 无数的可能性
    options.onmove && options.onmove(from);
  }, duration);
}
