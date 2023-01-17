---
title: Carousel
---

## 基础用法

### 效果

<ClientOnly><carousel-demo-1></carousel-demo-1></ClientOnly>

### 配置

在`carousel-panel`的容器内可以设置需要展示的轮播内容

> 本组件的宽度默认为最外层容器的宽度，当需要固定宽度时，可以自行设置最外层容器的样式；高度为组件初始化时的必填项，组件会自动设置为最外层容器的高度

> 如果需要展示图片，则必须设置最外层容器的宽度，因为图片元素是固定宽高，所以最外层容器元素的宽高也必须固定，否则当宽度变化时，图片会拉伸变形

> 本组件的轮播效果不支持自适应或响应式，只用于普通 Web 网页，不适配移动端

```html
<div class="carousel">
  <div class="carousel-panel">
    <div class="demo-panel">0</div>
  </div>
  <div class="carousel-panel">
    <div class="demo-panel">1</div>
  </div>
  <div class="carousel-panel">
    <div class="demo-panel">2</div>
  </div>
  <div class="carousel-panel">
    <div class="demo-panel">3</div>
  </div>
</div>
```

```javascript
new Carousel({
  element: document.querySelector('.carousel'),
  height: '200px',
})
```

## 参数

`Carousel`组件构造函数的参数是一个对象，该对象接收五个属性作为配置：

- element：当前需要绑定的 Carousel 元素，必填
- height：容器的高度，必填
- index：初始状态激活项的索引，从0开始，默认展示第一项，选填
- autoplay：是否自动切换，默认为true，选填
- interval：自动切换的时间间隔，单位为毫秒，默认3000ms，选填

```javascript
new Carousel({
  element: document.querySelector('.carousel'),
  height: '300px',
  index: 2,
  interval: 2000,
  autoplay: true
})
```

## API

本组件API为构造函数参数，参考上一小节
