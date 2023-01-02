//1、创建管理者
function SquareFactory() {
}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.background = color;

    /*
        我让x代表列，y代表行
            left=列(x)*宽度
            top=行(y)*高度
     */
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';

    square.collide=action;  //给方块身上贴上类型的标签
}

//2、包装创建方块的构造函数(流水线)
SquareFactory.prototype.Floor = function (x, y, color) {   //生产地板
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);
    return floor;
}

SquareFactory.prototype.Wall = function (x, y, color) {   //生产围墙
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die);
    return wall;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {   //生产蛇头
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, collideType.die);
    snakeHead.upDate(x,y);  //更新蛇头的位置
    return snakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {   //生产蛇身
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die);
    return snakeBody;
}

SquareFactory.prototype.Food = function (x, y, color) {   //生产食物
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, collideType.eat);

    food.upDate(x,y);

    return food;
}



//3、提供对外的接口
SquareFactory.create = function (type, x, y, color) {
    if(typeof SquareFactory.prototype[type]=='undefined'){
        throw 'no this type';
    }

    //子工厂继承父工厂
    SquareFactory.prototype[type].prototype=new SquareFactory();

    return new SquareFactory.prototype[type](x, y, color);
}


/* var newSquare=SquareFactory.create('Floor', 1, 1, 'black');
console.log(newSquare); */