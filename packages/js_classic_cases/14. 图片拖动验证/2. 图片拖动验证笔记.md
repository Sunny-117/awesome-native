# 图片拖动验证笔记



## 拖动按钮的距离计算



在这个案例中，主要就是要弄清楚如何计算拖动按钮的距离。如下图：



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-24-130124.png" alt="image-20210724210123819" style="zoom:50%;" />



用户之所以可以按住按钮实时的进行滑动，实际上就是在不停的修改按钮的 left 值。那么实时的得到按钮最新的 left 值就是一个非常重要的点。



按钮实时的 left 值计算 = 滑条的 clientX - 滑条的 offsetLeft - 按钮的 offsetX



-*EOF*-

