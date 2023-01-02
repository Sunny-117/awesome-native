var tool={
    inherit(target, origin){  //继承    target:目标对象 origin：源对象
        var F=function(){};
        F.prototype=origin.prototype;
        target.prototype=new F();
        target.prototype.constructor=target;
    },
    extends(origin){  //扩展
        var target=function(){
            //私有属性的继承
            origin.apply(this,arguments);
        }

        this.inherit(target, origin);

        return target;
    },
    
    single(origin){   //单例
        var target=(function(){
            var instance;
            return function(){
               if(typeof instance=='object'){
                    return instance;
               } 

               origin && origin.apply(this,arguments);
               instance=this;
            }
        })()

        origin && this.inherit(target, origin);

        return target;
    }
}

// Square => SnakeHead => snakeHead

/* function Square(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
}
Square.prototype.collide=function(){
    console.log('collide');
} */

/* function Food(){
}

tool.inherit(Food,Square);
var f=new Food();
f.collide(); */

/* var Food=tool.extends(Square);
var f=new Food(10,10,100,100);
console.log(f.x);   //10
f.collide(); */


/* var Food=tool.single(Square);
var f1=new Food(10,10,100,100);
var f2=new Food(20,20,200,200);
console.log(f1,f2);   //10 */


/* function a(){
    var n=10;
    return function b(){
        n++;
    }
}
var fn=a();
fn();
fn();
fn();
fn(); */

