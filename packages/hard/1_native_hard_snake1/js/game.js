var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();
    createFood();
    document.onkeydown = function (e) {
        if (e.key == 'ArrowLeft' && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        } else if (e.key == 'ArrowUp' && snake.direction != directionNum.bottom) {
            snake.direction = directionNum.top;
        } else if (e.key == 'ArrowRight' && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        } else if (e.key == 'ArrowDown' && snake.direction != directionNum.top) {
            snake.direction = directionNum.bottom;
        }
    }
    var btn = document.getElementById('btn');
    btn.onclick = function () {
        game.start();
    }
}
game.init();

game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollideSquare();
    }, intervalTime);
}
game.over = function () {
    clearInterval(this.timer);
    alert(this.score)
}

function createFood() {
    var x = null;
    var y = null;

    var flag = true;
    while (flag) {
        // 1-28之间的数值(max = 28, min = 1)
        // 不在围墙
        x = Math.floor(Math.random() * (28 - 1) + 1);
        y = Math.floor(Math.random() * (28 - 1) + 1);

        var ok = true;
        // 不在蛇身上
        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                //这个条件成立说明生成的坐标在蛇身上
                ok = false;
                break;
            }
        }

        if (ok) {
            flag = false;//说明ok=true，说明for的if没有走，不在蛇身上。false后，就跳出while    
        }
    }

    var food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(food.x, food.y);
    ground.append(food);
}