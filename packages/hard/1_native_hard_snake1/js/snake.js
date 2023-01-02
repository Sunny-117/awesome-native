var snake = new Snake();
snake.head = null;    //蛇头
snake.tail = null;    //蛇尾

var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;    //蛇头
    snake.tail = snakeBody2;   //蛇尾

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
    // 链表关系
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = directionNum.right;  //默认往右走
}

snake.getCollideSquare = function () {  //获取蛇头要走到的下一个方块
    var nextSquare = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(nextSquare);

    snake.collideMethod[nextSquare.collide](nextSquare)//nextSquare.collide方块的类型
}

snake.collideMethod = {
    move(square, boolean) {
        //console.log('走')
        //在旧蛇头的位置创建一个新身体：新身体的位置覆盖了原来的snakeHead的位置
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');//始终用的是工厂模式
        // 更新链表关系
        // newBody.next 是 snakeBody1，但是取不到
        newBody.next = snake.head.next;//但是可以通过旧蛇头的下一个取得
        newBody.last = null;//还没创建蛇头
        newBody.next.last = newBody;//snakeBody1=newBody.但是Body1拿不到

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);
        // 由于单例模式，第二次创建的时候内存中已经有了一个蛇头了，不会新创建了，会用原来的蛇头。此处在工厂里改，加上一个update方法

        //在下一个方块的位置创建一个新的蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');

        // 更新链表关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);

        // 更新蛇头
        snake.head = newHead;

        // 最后一截身体要不要删
        if (!boolean) {
            //这个条件成立说明要删除身体snakeBody2
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;//蛇的尾巴被删除了，只需要把蛇的尾巴变成snakeBody1
        }
    },
    eat(square) {
        //console.log('吃')
        this.move(square, true);    //第二个参数表示要吃，就不能删除最后一节身体
        createFood();
        game.score++;
    },
    die() {
        //console.log('挂')
        game.over();
    }
}

// snake.init();


// snake.getCollideSquare();

