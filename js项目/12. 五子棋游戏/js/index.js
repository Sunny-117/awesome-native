// 首先还是封装两个 DOM 查询的方法
function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

var chessboard = $('.chessboard'); // 获取棋盘的 table
var isGameOver = false; // 游戏是否结束
var whichOne = 'white'; // 一开始是白色的棋子
var chessArr = []; //  存储所有的棋子信息

// 初始化棋盘的方法
function initChessboard(){
    // 我们要绘制一个 14x14 的棋盘格子，并且我们要把下标放入到每一个格子
    var tableContent = "";
    // 循环生成行
    for(var i=0;i<14;i++){
        var row = '<tr>';
        // 循环生成列
        for(var j=0;j<14;j++){
            row += `<td data-row='${i}' data-line='${j}'></td>`;
        }
        row += '</tr>';
        tableContent += row;
    }
    chessboard.innerHTML = tableContent;
}

// 绑定点击事件
function bindEvent(){
    chessboard.onclick = function(e){
        // 我们可以很轻松的知道用户点击的是哪一个 td
        if(!isGameOver){
            // 游戏没有结束，那么我们要做的事情就是落子
            var temp = Object.assign({}, e.target.dataset); // 获取到用户点击的 td 信息
            
            if(e.target.nodeName === 'TD'){
                // 我们首先计算出每个格子的边长
                var tdw = chessboard.clientWidth * 0.92 / 14;

                // 接下来我们就需要确认用户落子究竟是在四个角的哪一个角
                var positionX = e.offsetX > tdw / 2;
                var positionY = e.offsetY > tdw / 2;

                // 接下来我们来组装棋子的信息
                var chessPoint = {
                    x : positionX ? parseInt(temp.line) + 1 : parseInt(temp.line),
                    y : positionY ? parseInt(temp.row) + 1 : parseInt(temp.row),
                    c : whichOne
                }

                // 绘制棋子
                chessMove(chessPoint);
            }

        } else {
            // 游戏已经结束，需要询问是否要重新来一局
            if(window.confirm('是否要重新开始一局？')){
                // 进行一些初始化操作
                chessArr = []; // 重置棋子的数组
                initChessboard(); // 重新绘制棋盘
                isGameOver = false;
            }
        }
    }
}

// 绘制棋子，接收一个参数，就是棋子的信息的对象
function chessMove(chessPoint){
    // 我们在绘制之前，我们需要先判断一下，该位置有没有棋子，如果有棋子，那么就不需要再绘制
    if(exist(chessPoint) && !isGameOver){
        // 进入此 if，说明该位置能够绘制，并且没有游戏结束
        chessArr.push(chessPoint); // 将该棋子的信息推入到数组

        // 生成一个棋子，其实就是生成一个 div，然后将该 div 放入到对应的 td 里面
        var newChess = `<div class="chess ${chessPoint.c}" data-row="${chessPoint.y}" data-line="${chessPoint.x}"></div>`;

        // 接下来，我们需要根据不同的落子位置，调整棋子

        if(chessPoint.x < 14 && chessPoint.y < 14){
            var tdPos = $(`td[data-row='${chessPoint.y}'][data-line='${chessPoint.x}']`);
            tdPos.innerHTML += newChess;
        }

        // x 等于 14，说明是最右侧那条线
        if(chessPoint.x === 14 && chessPoint.y < 14){
            var tdPos = $(`td[data-row='${chessPoint.y}'][data-line='13']`);
            tdPos.innerHTML += newChess;
            tdPos.lastChild.style.left = '50%';
        }

        // y 等于 14，说明是最下侧那条线
        if(chessPoint.x < 14 && chessPoint.y === 14){
            var tdPos = $(`td[data-row='13'][data-line='${chessPoint.x}']`);
            tdPos.innerHTML += newChess;
            tdPos.lastChild.style.top = '50%';
        }

        // x 和 y 均等于 14，说明是最右下角的那个 td
        if(chessPoint.x === 14 && chessPoint.y === 14){
            var tdPos = $(`td[data-row='13'][data-line='13']`);
            tdPos.innerHTML += newChess;
            tdPos.lastChild.style.top = '50%';
            tdPos.lastChild.style.left = '50%';
        }

        whichOne = whichOne === 'white' ? 'black' : 'white'; // 切换棋子的颜色
    }

    check(); // 核对游戏是否结束
}

// 判断该棋子是否已经存在
function exist(chessPoint){
    var result = chessArr.find(function(item){
        return item.x === chessPoint.x && item.y === chessPoint.y;
    })
    return result === undefined ? true : false;
}

// 检查游戏是否结束，检查是否有符合要求的棋子
function check(){
    // 其实就是遍历数组里面的每一个棋子
    // 这里分为 4 种情况：横着、竖着、斜着（2 种）

    for(var i=0; i< chessArr.length; i++){
        var curChess = chessArr[i];
        var chess2, chess3, chess4, chess5;

        // 检查有没有横着的 5 个颜色一样的棋子
        chess2 = chessArr.find(function(item){
            return curChess.x === item.x + 1 && curChess.y === item.y && curChess.c === item.c;
        })
        chess3 = chessArr.find(function(item){
            return curChess.x === item.x + 2 && curChess.y === item.y && curChess.c === item.c;
        })
        chess4 = chessArr.find(function(item){
            return curChess.x === item.x + 3 && curChess.y === item.y && curChess.c === item.c;
        })
        chess5 = chessArr.find(function(item){
            return curChess.x === item.x + 4 && curChess.y === item.y && curChess.c === item.c;
        })
        if(chess2 && chess3 && chess4 && chess5){
            // 进入此 if，说明游戏结束
            end(curChess, chess2, chess3, chess4, chess5);
        }


        // 检查有没有竖着的 5 个颜色一样的棋子
        chess2 = chessArr.find(function(item){
            return curChess.x === item.x && curChess.y === item.y + 1 && curChess.c === item.c;
        })
        chess3 = chessArr.find(function(item){
            return curChess.x === item.x && curChess.y === item.y + 2 && curChess.c === item.c;
        })
        chess4 = chessArr.find(function(item){
            return curChess.x === item.x && curChess.y === item.y + 3 && curChess.c === item.c;
        })
        chess5 = chessArr.find(function(item){
            return curChess.x === item.x && curChess.y === item.y + 4 && curChess.c === item.c;
        })
        if(chess2 && chess3 && chess4 && chess5){
            // 进入此 if，说明游戏结束
            end(curChess, chess2, chess3, chess4, chess5);
        }

        // 检查有没有斜着的 5 个颜色一样的棋子
        chess2 = chessArr.find(function(item){
            return curChess.x === item.x + 1 && curChess.y === item.y + 1&& curChess.c === item.c;
        })
        chess3 = chessArr.find(function(item){
            return curChess.x === item.x + 2 && curChess.y === item.y + 2 && curChess.c === item.c;
        })
        chess4 = chessArr.find(function(item){
            return curChess.x === item.x + 3 && curChess.y === item.y + 3 && curChess.c === item.c;
        })
        chess5 = chessArr.find(function(item){
            return curChess.x === item.x + 4 && curChess.y === item.y + 4 && curChess.c === item.c;
        })
        if(chess2 && chess3 && chess4 && chess5){
            // 进入此 if，说明游戏结束
            end(curChess, chess2, chess3, chess4, chess5);
        }

        // 检查有没有斜着的 5 个颜色一样的棋子
        chess2 = chessArr.find(function(item){
            return curChess.x === item.x - 1 && curChess.y === item.y + 1&& curChess.c === item.c;
        })
        chess3 = chessArr.find(function(item){
            return curChess.x === item.x - 2 && curChess.y === item.y + 2 && curChess.c === item.c;
        })
        chess4 = chessArr.find(function(item){
            return curChess.x === item.x - 3 && curChess.y === item.y + 3 && curChess.c === item.c;
        })
        chess5 = chessArr.find(function(item){
            return curChess.x === item.x - 4 && curChess.y === item.y + 4 && curChess.c === item.c;
        })
        if(chess2 && chess3 && chess4 && chess5){
            // 进入此 if，说明游戏结束
            end(curChess, chess2, chess3, chess4, chess5);
        }
    }
}

function end(){
    if(!isGameOver){
        isGameOver = true; // 代表游戏结束

        // 1. 把所有的棋子标记出来
        for(var i=0;i<chessArr.length;i++){
            $(`div[data-row='${chessArr[i].y}'][data-line='${chessArr[i].x}']`).innerHTML = i + 1;
        }

        // 2. 把获胜的棋子加上一个红色阴影
        for(var i=0;i<arguments.length;i++){
            $(`div[data-row='${arguments[i].y}'][data-line='${arguments[i].x}']`).classList.add('win');
        }
    }
}


// 游戏的主方法，相当于程序的入口
function main(){
    // 1. 初始化棋盘
    initChessboard();

    // 2. 绑定对应的事件
    bindEvent();
}
main();