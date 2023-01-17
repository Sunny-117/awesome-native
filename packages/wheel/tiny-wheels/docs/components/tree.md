---
title: Tree
---

## 基础用法

### 效果

<ClientOnly><tree-demo-1></tree-demo-1></ClientOnly>

### 配置

```html
<div class="tree"></div>
```

- 构造函数中的`data`属性可以接收一个数组，该数组即为需要渲染的嵌套数据
- 数据中的`expand`属性可以设置节点是否展开，默认关闭
- 数据中的`selected`属性可以设置节点是否被选中，默认不选中

```javascript
const treeDatas = [
  {
    title: '标题-1',
    expand: true,
    children: [
      {
        title: '标题-2',
        selected: true,
      },
      {
        title: '标题-3',
        expand: true,
        children: [
          {
            title: '标题-4'
          },
        ]
      },
      {
        title: '标题-5',
        expand: true,
        children: [
          {
            title: '标题-6'
          },
          {
            title: '标题-7',
          },
          {
            title: '标题-8',
          },
        ]
      }
    ]
  }
]
```

```javascript
new Tree({
  element: document.querySelector('.tree'),
  data: treeDatas
})
```

## 多选模式

### 效果

<ClientOnly><tree-demo-2></tree-demo-2></ClientOnly>

### 配置

构造函数中的`multiple`属性可以设置是否开启多选模式，开启后可以选中多个节点，此模式默认关闭

```javascript
new Tree({
  element: document.querySelector('.tree'),
  data: treeDatas,
  multiple: true
})
```

## 参数

`Tree`组件构造函数的参数是一个对象，该对象接收五个属性作为配置：

- element：当前需要绑定的 Tree 元素，必填
- data：需要渲染的嵌套数据，必填
- multiple：是否开启多选模式，默认为false，选填
- toggle：展开和收起子列表时触发，返回当前节点的数据，选填
- select：点击树节点时触发，当前已选中的节点数组、当前项，选填

```javascript
new Tree({
  element: document.querySelector('.tree'),
  data: treeDatas,
  multiple: true,
  toggle: node => {
    console.log(node)
  },
  select: (nodes, node) => {
    console.log(nodes, node)
  }
})
```

## API

本组件API为构造函数参数，参考上一小节
