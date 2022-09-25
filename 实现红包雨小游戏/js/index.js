/***&
 * 
 *  1,一个红包  + 运动  （ok）
 *  2,生成多个红包 ，一起运动 (ok)
 *  3,红包的抓取
 * 
 * 
 * 
 */


 (function(){ //代码块   命名空间

    var stage = document.getElementsByClassName('stage')[0];
    // var redE  = document.getElementsByClassName('redEnvelope')[0];
    var speed  = 5;
    var update = null;//定时器
    var redArr = [];//红包数组
    var cot  = 0;//总分数
    var cont =  document.getElementById('cont');
    var scoreFinally  = document.getElementById('scoreFinally');
    var mask = document.getElementsByClassName('mask')[0];


     //构造函数  当成一个工厂

    function RedEnvelope(){
        this.redP = document.createElement('div');
        this.redP.className = 'redEnvelope';
        stage.appendChild(this.redP);
        this.redP.style.left =Math.floor( Math.random()*(stage.offsetWidth - this.redP.offsetWidth)) + 'px';
        this.redP.addEventListener('click',clickFn)//绑定红包的点击事件
        this.redP.scroe  = Math.floor(Math.random()*100);//红包里面的钱
        // this.redP.speed = Math.floor(Math.random()*10 + 2);
    }
    function clickFn(e){
        cot += this.scroe;//点击到之后就加分
        this.style.backgroundImage = 'url(./img/BOM.png)';
        this.innerHTML =  "+" + this.scroe ;
        console.log(cot);

        cont.innerText = cot;

    }
    
    // console.log(one)
    //创建多个红包
    creatRedEnveLope();
    function creatRedEnveLope(){
        update = setInterval(function(){
            var one = new RedEnvelope();//变成对象
            redArr.push(one.redP); //把红包的div - push到数组里
            // console.log(redArr);
        },500) 
    }

    sport();
    //运动动画 
    function sport(){
        var topT = 0;
        for(var i = 0;i<redArr.length;i++){
            topT = redArr[i].offsetTop + speed;
            redArr[i].style.top = topT + 'px';

            if(redArr[i].offsetTop>stage.offsetHeight){
                stage.removeChild(redArr[i]);
                redArr.remove(redArr[i]);
            }
        }

        if(cot > 1000){
            window.cancelAnimationFrame(sport);//停止动画
            clearInterval(update);//取消定时器
            mask.style.display = 'block';
            scoreFinally.innerText = cot;
            mask.addEventListener('click',resizeFn);//重置游戏
            return;
        }else{
            window.requestAnimationFrame(sport);//根据屏幕的刷新率去更新函数 
        }

       
        
    }

    //重置游戏函数 
     
    function resizeFn(){
        window.location.reload()//页面刷新；
    }
 
        //封装一个数组 删除某一项 自己找到自己并删除
      Array.prototype.remove = function(val){
          var index = this.indexOf(val);
          if(index > -1){
            this.splice(index,1);
          }
      }
    
 })()


 /**
  *     setTimeout -- 10ms
  *     window.requestAnimationFrame(sport) 根据屏幕的刷新率来的 
  *     60hz   120  144  368
  *     每秒60次刷新  1000/60 == 16.7ms刷新一次
  *            
  *                  屏幕HZ               setTimeout
  *   
  *    （1） 0ms     未刷新                    未移动
  *    （2） 10ms    未刷新                    top = 1px
  *    （3） 16.7    刷新了（top1）            未移动
  *    （4） 20ms    未刷新                    top = 2px 
  *    （5）30ms     未刷新                    top = 3px
  *    （6）33.4ms 刷新了（top2）               top = 3px
  * 
  */

  /***
   *   nodejs
   *   
   *  基础  html css js 
   *  计算机网络 ajax  jquery bootstrap  第三方工具库
   *  HTML5 + CSS3  + ES6 7 8  移动端适配 rem  
   *  模块化的开发  nodejs  commonjs  amd cmd  es6模块化
   *  npm 包管理器  less sass  webpack打包工具 
   *  git （github） svn
   *  三大框架 mvvm  vuejs  reactjs  angularjs  其中之一 
   *  
   *  计算机数据机构 和 算法 ， 提升我们的综合能力  
   *  element ui 
   * 
   *  nodejs
   * 
   * 
   * 1 + x 
   * 
   * 学习方式     直播（配套的项目实战） + 录播 相结合的方式  
   * 
   * 1，全阶班 签约就业保障协议  年薪不低于10w
   * 2，大厂内推名额
   * 3，永久学习  永久更新  永久扩增
   * 4，答疑服务  笔面指导  人脉圈
   * 5，价值1000元人生不知有技术  送给同学们 
   *
   * 原价 12999    ---  9xxx  ？
   * 
   * 
   */