window.onload = function () {
  // 1. 声明一个数组，用来存储祝福数据
  var data = [
    "一定要幸福哦~",
    "祝你们白头偕老！",
    "早生贵子~",
    "新婚快乐，生活美满！",
    "新婚快乐~",
    "生个宝宝认我做干妈！",
    "喜结良缘O(∩_∩)O哈哈哈~",
    "早生贵子喜事多",
    "永结同心",
    "百年好合!新婚愉快",
    "新婚愉快，幸福美满",
  ];

  // 2. 将数组中所有的数据，用卡片的形式展示到页面中
  var listContainer = document.querySelector(".blessing-list");
  
  // for (var i = 0; i < data.length; i++) {
  
  // 声明一个变量来记录当前最大的z-index值
  var focusIndex = 1;

  function addCard(v){

    // 每遍历到一个数组元素： 就创建一个新的div，添加到blessing-list中

    // 创建div： document.createElement()
    var card = document.createElement("div");
    // 设置div的内容为当前遍历到的祝福语
    card.innerText = v;
    // 设置一下div的类样式
    card.className = "blessing-card";
    // 需要给div设置一个随机的位置、设置一个随机的背景图片、随机的旋转角度
    var cssObj = randomCSS();
    card.style.top = cssObj.top;
    card.style.left = cssObj.left;
    card.style.backgroundImage = cssObj.backgroudImage;
    card.style.transform = cssObj.transform;

    // 3. 实现卡片的拖拽功能 // 给卡片注册事件
    card.onmousedown = function (e) {
      // 吧当前的card置顶（修改z-index）
      card.style.zIndex = focusIndex ++;

      // e.pageX e.pageY
      // 3.1 获取鼠标位置和当前卡片位置的偏移量
      var cursorToDivOffsetX = e.pageX - card.offsetLeft;
      var cursorToDivOffsetY = e.pageY - card.offsetTop;
      // console.log(cursorToDivOffsetX, cursorToDivOffsetY)

      // 在鼠标移动的时候，动态的更改小卡片的位置
      document.onmousemove = function (e) {
        var newX = e.pageX - cursorToDivOffsetX;
        var newY = e.pageY - cursorToDivOffsetY;

        if(newX >= 30 && newX <= 770){
          card.style.left = newX + "px";
        }

        if(newY >= 30 && newY <= 470){
          card.style.top = newY + "px";
        }
      };
    };

    // mousemove和mouseup都注册给document是为了
    // 避免 鼠标疯狂移动，出了card的范围之后，不触发了
    document.onmouseup = function () {
      document.onmousemove = null;
    };

    // 将新创建的div放到blessing-list中去
    listContainer.append(card);
  }

  data.forEach(addCard)

  // 调用这个函数，就能获取到一个随机的位置(top left)、一个随机的背景图片、随机的旋转角度
  function randomCSS() {
    // 生成随机的内容
    var randomTop = Math.round(Math.random() * 400) + 30 + "px";
    var randomLeft = Math.round(Math.random() * 700) + 30 + "px";
    var randomPic =
      "url(./imgs/cardbg-" + Math.round(Math.random() * 17 + 1) + ".png)";
    var randomDeg = "rotate(" + (20 - Math.round(40 * Math.random())) + "deg)";

    return {
      top: randomTop,
      left: randomLeft,
      backgroudImage: randomPic,
      transform: randomDeg,
    };
  }

  // 4. 实现送祝福的功能
  var mask = document.querySelector(".mask");
  var popBox = document.querySelector(".pop-box");
  // 控制弹出框显示的函数
  function showDialog(){
    mask.style.display = "block";
    popBox.style.top = "50%";
  }
  // 控制弹出框隐藏的函数
  function hideDialog(){
    mask.style.display = "none";
    popBox.style.top = "-50%";
  }

  document.querySelector(".send").onclick = function(){
    // 获取用户输入的文本，作为新的卡片 添加到 blessing-list中
    var content = document.querySelector("#content");
    if(content.value.trim() != "" && content.value.trim() != "送上您的祝福吧~"){
      // 获取用户输入的文本，作为新的卡片 添加到 blessing-list中
      addCard(content.value);
    }else{
      alert("请输入祝福");
    }
    hideDialog();
  }

  document.querySelector(".bessing-button button").onclick = function(){
    showDialog();
  }
};
