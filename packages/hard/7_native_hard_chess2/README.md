# gobang

一个五子棋AI，使用原生JavaScript开发

试玩：https://csdoker.github.io/gobang/

## 介绍

- 界面使用Canvas绘制，可以根据各种设备的屏幕尺寸动态调整棋盘大小
- AI核心算法基于Alpha-Beta的搜索树思想，实现了PVS搜索，搜索深度最高可达6层，棋力尚可
- 实现了棋型判断、评估函数等核心逻辑，以及启发式搜索、迭代加深、置换表等优化算法

## 启动

npm run start

> open `localhost:8080` and enjoy it !

## 打包

npm run build

## TODO

- [x] 添加最后落子提示
- [ ] loading动画
- [ ] 走棋提示
- [ ] 悔棋
- [ ] 算法优化
- [ ] 使用Web Worker优化性能
