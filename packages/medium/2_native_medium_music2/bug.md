## 点击暂停之后不能接着走，而是从头来

加过去的百份比没有加起来

```JS
this.lastPercent = (stopTime - this.startTime) / (this.durTime * 1000);
```

## 第二次暂停再次点击会从第二次开始走

```JS
this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);    //如果不用+=的话会漏掉一次已播放的时长百分比
            // 如果直接=:点击第二次的时候会重新计算，因为有startTime.加上后，前面暂停的和播放的一起都加上

```

## 页面加载后直接切歌

切割要加载 music,需要在 loadMusic 中让进度条走

```JS
this.progress.move(0);	//切歌的时候需要让进度条跟着走
```

## 切歌之后直接暂停进度条还在走

因为定时器 cancelAnimationFrame 只有在 stop 的时候才会被清除。
类似于定时器：

```JS
    cancelAnimationFrame(this.frameId);//在move里先把上一次定时器清除。类似于原生JS运动
```

## 暂停，切歌时间会从上一首停止的地方开始，不会从 0

解决：只要切歌，就从 0 开始
给 move 添加参数，同一首歌，暂停的时候记录 lastPercent，不同歌曲就不记录了
move(0):从 0 开始播放
