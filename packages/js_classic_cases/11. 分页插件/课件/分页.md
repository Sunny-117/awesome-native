# 分页



## 1. 什么是分页



![image-20210729111723334](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-031723.png)

## 2. 如何制作该分页



咱们知道，前端无论做什么，都离不开前端的三架马车，HTML、CSS 和 JS



所以这里咱们要做的分页肯定也有这几个部分组成，先书写 HTML 和 CSS，构成分页的基本结构，然后在书写 JS 来实现对应的分页功能。

![image-20210729111840330](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-031841.png)

接下来我们来一个部分一个部分看



![image-20210729112337394](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032338.png)



![image-20210729112406472](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032407.png)



![image-20210729112430133](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032430.png)



## 3. createPager的实现



首先是【首页和上一页】以及【下一页和尾页】，这四个按钮又会分为能够点击和不能点击两种情况



![image-20210729112545928](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032546.png)





接下来我们来看中间数字页码的实现，中间的数字会有一个边界，所以我们要把这个边界找出来



![image-20210729112734733](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032734.png)

min 最小数字的计算方式如下图：

![image-20210729112817792](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032818.png)



max 最大数字的计算方式如下图：



![image-20210729112910360](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032911.png)

在从最小数字到最大数字的循环中，如果 i 等于 page，那么说明是当前页，挂上 active 样式类

![image-20210729112947058](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-032947.png)



## 4. 分页跳转



如下图：



![image-20210729113225302](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-033226.png)



所以，跳转的本质，其实就是重新调用 createPager， 传递新的页码，其他参数不变。



跳转完成后，后续还需要发送请求从服务器上面获取对应页码的数据。

![image-20210729113327520](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-033327.png)



-*EOF*-

