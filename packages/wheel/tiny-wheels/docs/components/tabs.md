---
title: Tabs
---

## 基础用法

### 效果

<ClientOnly><tabs-demo-1></tabs-demo-1></ClientOnly>

### 配置

通过`data-tab-name`可以设置选项卡的名字

```html
<div class="tabs">
  <div data-tab-name="选项卡1">内容1</div>
  <div data-tab-name="选项卡2">内容2</div>
  <div data-tab-name="选项卡3">内容3</div>
  <div data-tab-name="选项卡4">内容4</div>
</div>
```

```javascript
new Tabs({
  element: document.querySelector('.tabs')
})
```

## 默认选中项

### 效果

<ClientOnly><tabs-demo-2></tabs-demo-2></ClientOnly>

### 配置

如果要设置默认的选中项，需要先给每一项绑定`data-tab-key`，然后设置`data-tab-active`的值为特定项的`data-tab-key`

- data-tab-key 的值可以是任意字符串，但不能重复

- 如果不设置 data-tab-active，则默认选中第一个选项卡

```html
<div class="tabs" data-tab-active="2">
  <div data-tab-name="选项卡1" data-tab-key="1">内容1</div>
  <div data-tab-name="选项卡2" data-tab-key="2">内容2</div>
  <div data-tab-name="选项卡3" data-tab-key="3">内容3</div>
  <div data-tab-name="选项卡4" data-tab-key="4">内容4</div>
</div>
```

```javascript
new Tabs({
  element: document.querySelector('.tabs')
})
```

## 禁用选项卡

### 效果

<ClientOnly><tabs-demo-3></tabs-demo-3></ClientOnly>

### 配置

如果要设置禁用的选项卡，需要先给每一项绑定`data-tab-key`，然后设置`data-tab-disabled`的值设置为特定项的`data-tab-key`

```html
<div class="tabs" data-tab-disabled="3">
  <div data-tab-name="选项卡1" data-tab-key="1">内容1</div>
  <div data-tab-name="选项卡2" data-tab-key="2">内容2</div>
  <div data-tab-name="选项卡3" data-tab-key="3">内容3</div>
  <div data-tab-name="选项卡4" data-tab-key="4">内容4</div>
</div>
```

## 禁用动画

### 效果

<ClientOnly><tabs-demo-4></tabs-demo-4></ClientOnly>

### 配置

组件默认给选项卡面板设置了过渡动画，如果需要关闭，可以设置构造函数参数中的`animated`属性为false

```javascript
new Tabs({
  element: document.querySelector('.tabs'),
  animated: false
})
```

## 参数

`Tabs`组件构造函数的参数是一个对象，该对象接收三个属性作为配置：

- element：当前需要绑定的 tabs 元素，必填
- callback：选项卡被选中时触发的回调函数，返回当前选中的选项卡元素和它的`data-tab-key`，选填
- animated：是否开启选项卡面板的动画效果，默认为true，选填

```javascript
new Tabs({
  element: document.querySelector('.tabs'),
  callback: ($tab, key) => {
    console.log($tab, key)
  },
  animated: false
})
```

## API

- data-tab-name：选项卡的名字，必填
- data-tab-key：如果需要设置 data-tab-active 或 data-tab-disabled，则必填
- data-tab-active：选中选项卡的 data-key，选填
- data-tab-disabled：禁用选项卡的 data-key，选填
