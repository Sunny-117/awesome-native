---
title: 快速上手
---

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
