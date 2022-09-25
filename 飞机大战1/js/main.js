const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");

//背景移动
timer = setInterval(function () {
  bg1.style.top = bg1.offsetTop + 1 + "px";
  bg2.style.top = bg2.offsetTop + 1 + "px";
  if (bg1.offsetTop >= 500) {
    bg1.style.top = "-500px";
  }
  if (bg2.offsetTop >= 500) {
    bg2.style.top = "-500px";
  }
}, 11);
//点击开始
var start = document.querySelector(".start");
start.first = 0;
start.addEventListener(
  "click",
  function () {
    start.innerHTML = "";
    if (start.first == 1) {
      location.reload();
    }
    //飞机拖拽
    const mainScreen = document.querySelector("#contain");
    const airplane = document.querySelector(".airplane");
    //点击飞机开始
    airplane.addEventListener(
      "mousedown",
      function (e) {
        const evt = e || window.event;
        //获取点击的位置
        baseX = evt.pageX;
        baseY = evt.pageY;
        //设置移动初始距离
        moveX = 0;
        moveY = 0;
        //移动鼠标飞机移动
        mainScreen.addEventListener(
          "mousemove",
          function (e) {
            const evt1 = e || window.event;
            moveX = evt1.pageX - baseX;
            baseX = evt1.pageX;
            moveY = evt1.pageY - baseY;
            baseY = evt1.pageY;
            airplane.style.left = airplane.offsetLeft + moveX + "px";
            airplane.style.top = airplane.offsetTop + moveY + "px";
            check_border_collision(airplane, mainScreen);
          },
          false
        );
      },
      false
    );

    //子弹
    timerBull = setInterval(function () {
      //创建子弹对象
      const bull = document.createElement("div");
      mainScreen.appendChild(bull);
      bull.className = "bull";
      //设置初始位置
      bull.style.top = airplane.offsetTop - 10 + "px";
      bull.style.left = airplane.offsetLeft + 25 + "px";

      //让子弹飞
      timerBullFly = setInterval(function () {
        bull.style.top = bull.offsetTop - 10 + "px";
        //移除子弹
        if (bull.offsetTop <= -20) {
          mainScreen.removeChild(bull);
        }
      }, 100);
      bull.timer = timerBullFly;
    }, 200);

    //敌人 enemy
    timerEnemy = setInterval(function () {
      //创建敌机对象
      const enemy = document.createElement("div");
      mainScreen.appendChild(enemy);
      enemy.className = "enemy";
      //设置初始位置
      enemy.style.top = 0 + "px";
      enemy.style.left = random(0, 460) + "px";

      //让敌机飞
      timerEnemyFly = setInterval(function () {
        enemy.style.top = enemy.offsetTop + 10 + "px";
        //移除敌机
        if (enemy.offsetTop >= 500) {
          mainScreen.removeChild(enemy);
        }
      }, 50);
      enemy.timer = timerEnemyFly;
    }, 300);

    const enemyPlane = document.getElementsByClassName("enemy");
    const bullEnt = document.getElementsByClassName("bull");
    const gradeEle = document.querySelector(".grade");
    let count = 0;

    const timerCrash = setInterval(function () {
      //子弹击中敌机
      for (let i = 0; i < bullEnt.length; i++) {
        for (let j = 0; j < enemyPlane.length; j++) {
          var b = bullEnt[i];
          var e = enemyPlane[j];
          if (crashChecked(b, e)) {
            clearInterval(b.timer);
            clearInterval(e.timer);
            mainScreen.removeChild(b);
            mainScreen.removeChild(e);
            count++;
            gradeEle.innerHTML = "分数：" + count;
            break;
          }
        }
      }
    }, 50);

    //死亡检测
    const timerDie = setInterval(function () {
      for (let i = 0; i < enemyPlane.length; i++) {
        //我机碰撞敌机
        if (crashChecked(airplane, enemyPlane[i])) {
          for (let j = 0; j < 100; j++) {
            clearInterval(j);
            switch (true) {
              case count >= 0 && count < 100: {
                start.innerHTML = "垃圾.哈哈哈!!";
                break;
              }
              case count >= 100 && count < 200: {
                start.innerHTML = "菜鸟+1";
                break;
              }
              case count >= 200 && count < 300: {
                start.innerHTML = "白银菜鸟！";
                break;
              }
              case count >= 300 && count < 400: {
                start.innerHTML = "还可以哦！";
                break;
              }
              case count >= 400 && count < 500: {
                start.innerHTML = "不错不错世界第三";
                break;
              }
              default: {
                start.innerHTML = "你牛逼!";
                break;
              }
            }
          }
          start.first = 1;
          break;
        }
      }
    }, 50);
  },
  false
);
