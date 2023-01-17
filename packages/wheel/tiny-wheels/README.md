# tiny-wheels

一套基于原生JavaScript开发的组件库，无依赖、体积小、简单易用

[![npm](https://img.shields.io/npm/v/tiny-wheels.svg?style=flat-square)](https://www.npmjs.com/package/tiny-wheels) [![npm](https://img.shields.io/npm/dt/tiny-wheels.svg?style=flat-square)](https://www.npmjs.com/package/tiny-wheels) [![npm](https://img.shields.io/npm/l/tiny-wheels.svg?style=flat-square)](https://www.npmjs.com/package/tiny-wheels)

## 文档

关于各个组件的详细使用方式和效果可以查看本项目的文档：[tiny-wheels](https://csdoker.github.io/tiny-wheels/)

## 特点

- 使用`ES6`最新语法编写，纯原生`JavaScript`代码，适合新手阅读
- 无任何第三方依赖，源码非常精简，可以自由拓展组件功能
- 基于`Webpack`和`Babel`的最新版本构建，采用`UMD`的模块化规范打包，兼容多种引入方式

## 使用

- 模块化引入（推荐）

> npm install tiny-wheels -S

```html
<div class="tabs">
    <div data-tab-name="选项卡1">内容1</div>
    <div data-tab-name="选项卡2">内容2</div>
    <div data-tab-name="选项卡3">内容3</div>
    <div data-tab-name="选项卡4">内容4</div>
</div>
```

```javascript
import { Tabs } from 'tiny-wheels'

new Tabs({
    element: document.querySelector('.tabs')
})
```

- 标签引入

目前可以通过[unpkg.com/tiny-wheels](https://unpkg.com/tiny-wheels/dist/index.js)获取到最新版本的资源，在页面上使用script标签引入后即可开始使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
</head>
<body>
    <div class="tabs">
        <div data-tab-name="选项卡1">内容1</div>
        <div data-tab-name="选项卡2">内容2</div>
        <div data-tab-name="选项卡3">内容3</div>
        <div data-tab-name="选项卡4">内容4</div>
    </div>
    <script src="https://unpkg.com/tiny-wheels/dist/index.js"></script>
    <script>
        new TinyWheels.Tabs({
            element: document.querySelector('.tabs')
        })
    </script>
</body>
</html>
```

由于项目已经暴露了全局变量`TinyWheels`，所以在浏览器环境可以直接使用，通过标签引入的具体示例可以参考项目根目录下的`example.html`

> 组件的`HTML`结构是固定的，参考文档中的示例使用即可

> 组件最外层的元素会自动添加`tiny-*`的类名，你也可以在外层添加自己的容器元素包裹组件，并添加自己的类名，覆盖默认样式

## 开发

此项目为个人项目，非常欢迎大家下载本项目自由开发，如果有优秀的组件提交，我会直接合并进项目中

### 运行

通过如下步骤可以直接运行项目：

1. git clone https://github.com/csdoker/tiny-wheels.git
2. npm install
3. npm run start
4. open localhost:8000

运行入口为`src/main.js`文件，该文件中是各个组件的使用代码，可以自由修改测试

### 打包

使用命令：

> npm run build

打包入口为`src/index.js`文件，目前的做法是在各个组件中引入了对应的样式，然后将所有组件导出为一个对象

### 文档

本项目文档使用`vuepress`进行构建，在`docs`目录下有各个组件的说明及示例
如果你想添加自己组件的文档，在编辑完成对应的文件后需要重新打包项目，最后将生成的文件重新部署

具体使用方法可以参考[官方文档](https://vuepress.vuejs.org/zh/)

#### 启动

> npm run docs:dev

#### 构建

> npm run docs:build

#### 部署

打包后生成的静态文件默认放在本项目的`gh-pages`分支，文档页面使用Github Pages部署

## 进度

- [x] Tabs-选项卡
- [x] Collapse-折叠面板
- [x] Pager-分页
- [x] Carousel-走马灯
- [x] Tree-树形控件
- [ ] Calendar-日历
- [ ] 单元测试
- [ ] TypeScript重构

持续施工中...

## 说明

本项目的开发目的，主要是个人对于技术的学习、研究、总结，其次是探索使用原生JavaScript实现一些复杂组件的方法

> 由于现在还未完成每个组件的单元测试，无法确保组件的稳定性，所以暂时不推荐在生产环境使用

——Done is better than perfect

这是我很喜欢的一句话，所以本项目的开发原则也是如此，优先实现各个组件的基础功能，而复杂功能的优先级会比较低

## 贡献

如果你遇到什么问题，或者有好的建议，欢迎提 [Issues](https://github.com/csdoker/tiny-wheels/issues) 和 [Pull Request](https://github.com/csdoker/tiny-wheels/pulls)

## 教程

本项目各个组件的开发教程会以文章的形式发布在以下几个平台，欢迎关注：

- [Blog](https://blog.csdoker.com)
- [掘金](https://juejin.im/user/57e0e4dac4c9710061387d0e/posts)
- [Segmentfault](https://segmentfault.com/u/csdoker/articles)

## 参考

本组件库参考了一些比较成熟的UI框架，包括但不限于外观、API设计、甚至源码实现，特此感谢这些开源社区的贡献者

- [Element](https://element.eleme.cn/#/zh-CN)
- [Ant Design](https://ant.design/)
- [iView](https://www.iviewui.com/)
- [wheels](https://github.com/FrankFang/wheels)
- [qing](https://github.com/veedrin/qing)
- [yu.js.ui](https://github.com/yurencloud/yu.js.ui/)
- [xy-ui](https://github.com/XboxYan/xy-ui)
- [gulu](https://github.com/FrankFang/gulu)
- [layui](https://www.layui.com/)
- [bootstrap](https://www.bootcss.com/)