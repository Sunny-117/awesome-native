window.onload = function(){

  // 获取元素
  var start = document.querySelector("#start");
  var imgs = document.querySelectorAll(".imgs");
  var time = document.querySelector("#time");
  var fra = document.querySelector("#fra");
  // var count = 0;
  // 绑定点击事件
  start.onclick = function(){
    var count = 0;
    if(start.innerHTML == "开始游戏"){
      start.style.background = "gray";
      start.innerHTML = "游戏中";

      // 创建一个时间初始值
      var zhi = 10;
      var timer = setInterval(function(){
        zhi--;
        time.innerHTML = zhi;

        // 判断，清除定时器
        if(zhi==0){
          clearInterval(timer);
          start.style.background = "rgb(165,42,42)";
          start.innerHTML = "开始游戏";
        }

        // 创建一个随机的下标值
        var index = Math.floor(Math.random()*imgs.length);
        // console.log(index);

        // 找到某一个图片显示之前。先将所有图片隐藏
        for(var i=0;i<imgs.length;i++){
          imgs[i].style.visibility = "hidden";
        }

        imgs[index].style.visibility = "visible";

        setTimeout(function(){
          imgs[index].style.visibility = "hidden";
        },800)
      },1000)

      // 图片点击事件
      for(var i=0;i<imgs.length;i++){
        imgs[i].onclick = function(){
          this.src = "../images/mouse2.png";
          var that = this;
          setTimeout(function(){
            that.src = "../images/mouse.png";
          },100)
          count++;
          fra.innerHTML = count;
        }
      }
    }
  }

}