# 读心术笔记



## 随机数



产生随机数的公式如下：



```js
Math.floor(Math.random() * 可能性数 + 第一个可能值)
// 例如，我要生成 1-10 的随机数，那么写法如下
Math.floor(Math.random() * 10 + 1)
```



接下来，进一步我可以封装一个函数



```js
// 返回从 min 到 max 的随机数
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```



## *transitionend*



该事件会在 transition 过渡效果结束后触发。