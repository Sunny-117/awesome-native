---
title: Collapse
---

## 基础用法

### 效果

<ClientOnly><collapse-demo-1></collapse-demo-1></ClientOnly>

### 配置

通过`data-collapse-name`可以设置折叠面板的名字

```html
<div class="collapse">
  <div data-collapse-name="折叠面板1">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板2">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板3">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板4">
    折叠内容
  </div>
</div>
```

```javascript
new Collapse({
  element: document.querySelector(".collapse")
});
```

## 默认展开项

### 效果

<ClientOnly><collapse-demo-2></collapse-demo-2></ClientOnly>

### 配置

如果要设置默认展开的折叠面板，需要先给每一项绑定`data-collapse-key`，然后设置`data-collapse-active`的值为特定项的`data-tab-key`

- data-collapse-key 的值可以是任意字符串，但不能重复

- 如果不设置 data-collapse-active，则不展开任何面板

```html
<div class="collapse" data-collapse-active="2">
  <div data-collapse-name="折叠面板1" data-collapse-key="1">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板2" data-collapse-key="2">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板3" data-collapse-key="3">
    折叠内容
  </div>
  <div data-collapse-name="折叠面板4" data-collapse-key="4">
    折叠内容
  </div>
</div>
```

```javascript
new Collapse({
  element: document.querySelector(".collapse")
});
```

## 手风琴模式

### 效果

<ClientOnly><collapse-demo-3></collapse-demo-3></ClientOnly>

### 配置

是否开启手风琴模式，开启后每次至多展开一个面板，此模式默认关闭

```javascript
new Collapse({
  element: document.querySelector(".collapse"),
  accordion: true
});
```

## 参数

`Collapse`组件构造函数的参数是一个对象，该对象接收三个属性作为配置：

- element：当前需要绑定的 Collapse 元素，必填
- callback：切换面板时触发的回调函数，返回当前面板元素、当前面板的`data-collapse-key`和所有已展开的面板的`data-collapse-key`，选填
- accordion：是否开启手风琴模式，默认为false，选填

```javascript
new Collapse({
  element: document.querySelector('.collapse'),
  accordion: false,
  callback: ($item, key, keys) => {
    console.log($item, key, keys)
  }
})
```

## API

- data-collapse-name：面板的名字，必填
- data-collapse-key：如果需要设置 data-collapse-active，则必填
- data-collapse-active：需要展开面板的 data-collapse-key，选填