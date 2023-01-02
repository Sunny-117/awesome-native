/*
    这个文件里放一些全局性的东西
        1、常用的一些变量
        2、创建一个最基础的方块的构造函数
        3、根据方块的构造函数，创建各个元素的对象
        4、存储蛇头与其它格子碰撞后的处理方式
 */

//游戏的区域大小
var td = 30;  //宽度，列数
var tr = 30;  //高度，行数

//每个方块的尺寸
var squareWidth = 20;

//游戏区域一开始的坐标
var positionX = 200;
var positionY = 100;

//蛇移动的时间间隔
var intervalTime = 300;

//创建一个方块的构造函数
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.upDate = function (x, y) {//避免单利模式带来的影响
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}


//创建元素
var Ground = tool.single(Square);     //整个游戏场景
var Floor = tool.extends(Square);     //地板
var Wall = tool.extends(Square);     //围墙

var SnakeHead = tool.single(Square);      //蛇头
var SnakeBody = tool.extends(Square);     //蛇身
var Snake = tool.single();                //蛇
var Food = tool.single(Square);           //食物
var Game = tool.single();           //游戏


//存储方块的类型
var collideType = {
    move: 'move',
    eat: 'eat',
    die: 'die'
}