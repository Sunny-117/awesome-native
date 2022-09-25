### css3属性相关

​		

#### transition属性

**作用**

> ​	从一种状态过渡到另一种状态，用于在一定的时间内进行元素平滑的过渡，这种效果可以在元素被单击，鼠标滑过，或者是其他的事件中触发，实现圆滑的以动画效果改变CSS属性的属性值。



transition属性是个复合属性，她包括以下几个子属性：

- transition-property ：规定设置过渡效果的css属性名称，常用值 “all”全部css属性进行动画效果添加
- transition-duration ：规定完成过渡效果需要多少秒或毫秒    
- transition-timing-function ：指定过渡函数，规定速度效果的速度曲线 常用值：关键字描述：linear ease-in ease-in-out
- transition-delay ：指定开始出现的延迟时间  



**使用方法**

​	

- hover效果实现：

```css
div {
	width:200px;
  height:200px;
  background-color:red;
  transition:all .2s linear;   // all => 全部执行 200毫秒内执行完成 以线性方式执行
}

div:hover{
  background-color:yellow;
}
```

- 事件的形式进行trainstion属性添加

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .box {
              width: 200px;
              height: 200px;
              background-color: red;
              position: absolute;
              left: 200px;
              top: 0px;
          }
      </style>
  </head>
  
  <body>
  
      <div class="box"></div>
      <button id="btn">点击进行transtion属性添加</button>
    
      <script>
       document.getElementById('btn').addEventListener('click', function () {
              var box = document.getElementsByClassName('box')[0]
              box.style.transition = 'all .5s linear'
                  box.style.backgroundColor = 'yellow';
                  box.style.top = '200px'
          })
      </script>
  </body>
  
  </html>
  ```

- **动画结束事件 transitionend**

  > 当动画执行完成之后，dom元素会触发transitionend事件

