var pars = {
  rotateNum: 8,
  trunbody: document.getElementsByClassName("wapper")[0],
  clkFn: clickFn,
  judge: judgeFn,
};

function clickFn() {
  var num = Math.floor(Math.random() * 360);
  lottery.tableRun(num);
}

var lottery = new Lottery(pars);

/**
 *
 */
// var btn = document.getElementsByClassName('btn')[0];//点击按钮
// var bigWheel = document.getElementsByClassName('pan')[0];//转盘
// var bool = true;//锁
// var num = 0;

// btn.addEventListener('click',function(){
//     if(bool){
//         num = Math.floor(Math.random()*360)//随机出一个角度
//         tableRun(num);//执行角度传入旋转 宣传
//         bool = false;
//     }
// })

// //旋转函数
// function tableRun(deg){
//     deg = deg + 8*360;
//     bigWheel.style.transform = 'rotate('+ deg +'deg)';
//     bigWheel.style.transition = 'all 5s';
// }
// //监听圆盘动画结束的时候触发
// bigWheel.addEventListener('webkitTransitionEnd',function(){
//     console.log('over');
//     judgeFn(num);//判断函数
//     bool = true;//解开锁

//     bigWheel.style.transform = 'rotate('+ num +'deg)';
//     bigWheel.style.transition = 'none';

// })

function judgeFn(deg) {
  var str = "";
  if (deg < 45 && deg < 270 && deg > 0) {
    //二等奖
    str = "二等奖";
  } else if ((deg > 90 && deg < 135) || (deg > 270 && deg < 315)) {
    //三等奖
    str = "三等奖";
  } else if (
    (deg > 45 && deg < 90) ||
    (deg > 135 && deg < 180) ||
    (deg > 225 && deg < 270) ||
    (deg > 315 && deg < 360)
  ) {
    //四等奖
    str = "四等奖";
  } else if (deg > 180 && deg < 225) {
    str = "一等奖";
    //一等奖
  }

  alert("大吉大利 恭喜获得" + str + "!");
}

/**
 * 让我们的代码可维护性强， 可复用性强。
 * 变量语义化，能看懂。 
 * 而且避免变量全局污染.
 * 模块化 
 * 封装的思想 
 * 设计模式(初级)
 *
 * 1，函数：最初的封装和模块化的思想 ----- 利用 闭包的 函数式编程， 偏函数  柯理化。
 * function add(a,b){
    return a + b
}
 * 
 * 2, 对象式编程
 * 
 * var obj = {
    name:'dengge',
    init:function(){
        this.getName();
    },
    getName:function(){

    }
    
}
obj.init()

  3,立即执行函数
 var deng = (function(){
    var name = 'dengge';
    function abc(){
        console.log(name);
    }

    return {
        abc:abc
    }

})()


4,原型 原型链 ---》 Juquey 
    

 */

// (function(a,b){
//     //model
//     b(a)

// })(window,function(window){

//     window.jquery = jquery = $;
//     function jquery(){

//     }
//     jquery.prototype.init = function(){}
//     new ///
// })

// 5  2013 modejs commenjs  CMD   GULP   .WEBPACK
