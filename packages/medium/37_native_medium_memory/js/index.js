var itemDiv = 100; // 这是方块的宽高，回头我们要通过方块的宽高来计算方块的个数
var cubeNum = (300 / itemDiv) * (600 / itemDiv); // 根据宽高来计算出总方块数
var arr = []; // 这个数组是用来存储对象，每一个小 div 就是一个对象

// 随机生成背景图片的方法
// 接收一个数组作为参数
// 返回值要么是 false，要么为数组
function makeBgc(arr) {
  // 首先第一步，我们要生成对应数量的 div 对象
  // 随机数的公式：Math.floor(Math.random() * 可能性数 + 第一个可能值)
  // 34 - 78 之间的随机数
  // Math.floor(Math.random() * (78 - 34 + 1) * 34)
  for (var i = 0; i < cubeNum; i++) {
    arr.push({
      canBeClick: true, // 该小方块是否能够被点击
      imgNum: Math.floor(Math.random() * 7 + 1), // 存储图片的编号
    });
  }
  // console.log(arr);
  // 那么现在，我们的数组里面已经存储了 18 个对象，每个对象对应一个是否可以点击的状态，以及图片编号
  // 但是现在我们面临一个问题，就是图片编号可能不是偶数
  // 所以我们需要解决这个问题，让我们的每一张都是偶数

  // 这里我们生成一个对象，对象里面对应每张图片的数量
  var obj = {};
  for (var i = 0; i < 7; i++) {
    obj[i + 1] = 0;
  }
  // console.log(obj);  {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0}

  // 接下来，我们就可以遍历上面的数组，统计数组中每张图片的出现数量，统计到 obj 对象里面

  // var arr = [1,2,3,4,5];
  // for 循环
  // for(var i=0;i<arr.length;i++){
  //     console.log(arr[i]);
  // }

  // for-of 循环：取出的是每一个元素
  // for(var i of arr){
  //     console.log(i);
  // }

  // for-in 循环：取出的是每一个元素的下标
  // for(var i in arr){
  //     console.log(arr[i]);
  // }

  for (var i of arr) {
    for (var index in obj) {
      if (index == i.imgNum) {
        obj[index]++;
      }
    }
  }
  // console.log(obj); {1: 4, 2: 2, 3: 1, 4: 2, 5: 2, 6: 1, 7: 6}

  // 接下来，我们就要评判一下我们生成的结果是否符合我们的要求
  for (var index in obj) {
    if (obj[index] % 2 != 0) {
      return false;
    }
  }
  return arr;
}

while (true) {
  if (makeBgc(arr)) {
    // 进入此 if，说明生成的数组是 OK 的，没有问题
    break;
  } else {
    // 说明生成的数组不符合要求，需要重新生成
    arr = [];
  }
}

// 到目前为止，我们的数组就已经 OK 了，接下来下一步将 itemDiv 渲染到 container 里面
var str = ""; // 空字符串用来拼接 <div class="itemDiv"></div>
for (var i = 0; i < cubeNum; i++) {
  str += `
        <div class="itemDiv" id="${i}"></div>
    `;
}
var container = document.getElementById("container"); // 获取外层的容器盒子
container.innerHTML = str;

// 最后一步，设置点击事件
var itemDivs = document.getElementsByClassName("itemDiv"); // 获取到的是所有的 itemDiv 盒子
var clickCount = 0; // 统计用户的点击次数，后面需要根据用户的点击次数来进行一些判断
// 用于存储用户的第一次点击和第二次点击
var firstClick = null,
  secondClick = null;
var clickSwitch = true; // 点击开关

container.addEventListener("click", function (e) {
  if (e.target.id != "container") {
    // 进入此 if，说明点击的是小方块
    // 如果点击开关的状态为 true，才能做后面的操作
    if (clickSwitch) {
      var i = parseInt(e.target.id); // 获取到当前用户点击的 itemDiv 的下标

      if (arr[i].canBeClick && clickCount < 2) {
        // 我们要做的事情：1. 改变方块的背景图  2. 点击的次数增加   3. 存储用户的点击信息
        // 1. 改变方块的背景图
        itemDivs[
          i
        ].style.backgroundImage = `url(../images/${arr[i].imgNum}.jpg)`;

        // 2. 点击的次数增加
        clickCount++;

        // 3. 存储用户的点击信息
        // 根据 firstClick 和 secondClick 的状态来决定存储哪一个变量
        // 放入的信息为一个数组 [图片编号，div 下标]
        if (firstClick == null) {
          firstClick = [arr[i].imgNum, i];
        } else {
          secondClick = [arr[i].imgNum, i];
        }
        arr[i].canBeClick = false; // 将这个 div 的是否可以点击状态修改为不能点击
      }

      // 如果 clickCount 为 2，说明用户已经点击了两张图片了，接下来我们就要开始做对比
      if (clickCount === 2) {
        clickSwitch = false; // 首先将点击开关关闭，让用户不能再乱点
        // 700 毫秒后再将开关打开
        setTimeout(function () {
          if (firstClick[0] === secondClick[0]) {
            // 进入此 if，说明用户点击的是同一张图片
            // 将这两个 div 的透明修改为透明，可点击状态设置为 false
            itemDivs[firstClick[1]].style.opacity = 0;
            itemDivs[secondClick[1]].style.opacity = 0;
            itemDivs[firstClick[1]].style.cursor = "pointer";
            itemDivs[secondClick[1]].style.cursor = "pointer";
            arr[firstClick[1]].canBeClick = false;
            arr[secondClick[1]].canBeClick = false;
          } else {
            // 如果进入 else，说明点击的图片不一样，重置一些信息
            itemDivs[firstClick[1]].style.backgroundImage = null;
            itemDivs[secondClick[1]].style.backgroundImage = null;
            arr[firstClick[1]].canBeClick = true;
            arr[secondClick[1]].canBeClick = true;
          }
          // 之后我们还需要重置一些信息
          clickCount = 0;
          firstClick = secondClick = null;
          clickSwitch = true;
        }, 700);
      }
    }
  }
});
