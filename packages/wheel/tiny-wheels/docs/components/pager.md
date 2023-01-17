---
title: Pager
---

## 基础用法

### 效果

<ClientOnly><pager-demo-1></pager-demo-1></ClientOnly>

### 配置

- 构造函数中的`total`属性，可以设置数据总数
- 构造函数中的`current`属性，可以设置当前页码
- 构造函数中的`size`属性，可以设置每页条数

```html
<div class="pager"></div>
```

```javascript
new Pager({
  element: document.querySelector(".pager"),
  total: 200,
  current: 1
});
```

## 参数

`Pager`组件构造函数的参数是一个对象，该对象接收五个属性作为配置：

- element：当前需要绑定的 Pager 元素，必填
- total：设置数据总数，必填
- current：设置当前页码，默认为1，选填
- size：设置每页条数，默认为10，选填
- callback：页码改变的回调，返回改变后的页码，选填

```javascript
new Pager({
  element: document.querySelector('.pager'),
  total: 200,
  size: 20,
  current: 1,
  callback: (number) => {
    console.log(number)
  }
})
```

## API

本组件API为构造函数参数，参考上一小节
