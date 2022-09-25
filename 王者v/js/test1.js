// 开启一个计时器，并把计时器保存到变量timer中
// 每隔3000毫秒（1000毫秒 = 1秒），运行一次函数

var timer = "";

function start() {
  clearInterval(timer);// 管它那么多，先把之前的清除掉，保证只有一个计时器
  timer = setInterval(function () {
    console.log(123);
  }, 300);
}

// 清除计时器
function stop() {
  clearInterval(timer);
}
