// 封装的 DOM 查询方法
// 这是 HTML5 新增的 DOM 查询方法，支持 CSS 语法来查询
function $(selector) {
  // 返回满足条件的第一个元素
  return document.querySelector(selector);
}

function $$(selector) {
  // 返回满足条件的所有元素
  return document.querySelectorAll(selector);
}

var chessArr = []; // 存放所有棋子的数据
var isGameOver = false; // 游戏是否结束
var chessboard = $(".chessboard"); // 选中 table 那个 DOM 节点
var whichOne = "white"; // 当前的落子颜色，默认从白色开始

// 初始化棋盘的方法
function initChessboard() {
  // 绘制 14 x 14 的棋盘表格，并且我们还需要将下标标记进去，方便后面使用
  var tableContent = ""; // 用来存储拼接的字符串内容
  // 循环的方式来生成行
  for (var i = 0; i < 14; i++) {
    var row = "<tr>";
    for (var j = 0; j < 14; j++) {
      row += "<td data-row='" + i + "' data-line='" + j + "'></td>"; // <td data-row='0' data-line='0'></td>
    }
    row += "</tr>";
    tableContent += row; // 这里就是把生成的每一行存储到 tableContent 里面
  }
  chessboard.innerHTML = tableContent;
}

// 为棋盘绑定点击事件
function bindEvent() {
  chessboard.onclick = function (e) {
    // 点击棋盘的时候，我们就应该落子，那么我们需要得到棋子的坐标
    if (!isGameOver) {
      // 如果游戏没有结束，我们要获取用户点击的 td 的坐标，然后要确定落子落在哪里
      var temp = Object.assign({}, e.target.dataset); // 获取用户点击的 td 的信息 {row:'0',line:'1'}

      if (e.target.nodeName === "TD") {
        // 说明用户点击的是 td

        var tdw = (chessboard.clientWidth * 0.92) / 14; // 每个格子的边长

        // 接下来我们需要确定落子的位置是在四个角的哪一个角

        var positionX = e.offsetX > tdw / 2; // positionX 是一个布尔值
        var positionY = e.offsetY > tdw / 2; // positionY 是一个布尔值

        // 接下来，我们根据上面的两个布尔值来组装对象
        // chessPoint 用来存储落子的相关信息（1. 横坐标 2. 纵坐标 3. 颜色）
        var chessPoint = {
          x: positionX ? parseInt(temp.line) + 1 : parseInt(temp.line),
          y: positionY ? parseInt(temp.row) + 1 : parseInt(temp.row),
          c: whichOne,
        };
        // 棋子的坐标搞定之后，我们就应该根据这个棋子来绘制该棋子
        chessMove(chessPoint);
      }
    }
  };
}

// 落子方法，接收一个棋子位置信息对象作为参数
function chessMove(chessPoint) {
  // 首先需要一个判断，判断该位置是否能够绘制棋子，以及当前是否在游戏中（isGmaeOver----> false）
  if (!isGameOver && exist(chessPoint)) {
    // 进入此 if，说明该位置可以放置棋子
    chessArr.push(chessPoint); // 将该棋子的数据放入到数组里面

    // 绘制棋子
    var newChess =
      "<div class='chess " +
      chessPoint.c +
      "' data-row='" +
      chessPoint.y +
      "' data-line='" +
      chessPoint.x +
      "'></div>";

    // 接下来，我们需要根据不同的位置，对这个棋子进行一个位置的微调
    if (chessPoint.x < 14 && chessPoint.y < 14) {
      // 进入此 if，说明是中间区域
      // 我们需要找到对应的 td，将 div 放入到 td 里面
      // td[data-row='0'][data-line='1']
      var tdPos = $(
        "td[data-row='" + chessPoint.y + "'][data-line='" + chessPoint.x + "']"
      );
      tdPos.innerHTML += newChess;
    }
    if (chessPoint.x == 14 && chessPoint.y < 14) {
      // 如果进入此 if，说明是在最右边的那条线
      var tdPos = $(
        "td[data-row='" + chessPoint.y + "'][data-line='" + 13 + "']"
      );
      tdPos.innerHTML += newChess;
      tdPos.lastChild.style.left = "50%";
    }
    if (chessPoint.x < 14 && chessPoint.y == 14) {
      // 如果进入此 if，说明是在最下面的那条线
      var tdPos = $(
        "td[data-row='" + 13 + "'][data-line='" + chessPoint.x + "']"
      );
      tdPos.innerHTML += newChess;
      tdPos.lastChild.style.top = "50%";
    }
    if (chessPoint.x == 14 && chessPoint.y == 14) {
      // 如果进入此 if，说明是在最右下角的那个格子
      var tdPos = $("td[data-row='" + 13 + "'][data-line='" + 13 + "']");
      tdPos.innerHTML += newChess;
      tdPos.lastChild.style.top = "50%";
      tdPos.lastChild.style.left = "50%";
    }
    // 接下来，还需要修改一下颜色
    // 每次下一个棋子，就需要切换一下颜色
    whichOne = whichOne === "white" ? "black" : "white";

    // 接下来，我们就需要看游戏是否已经分出胜负
    check();
  }
}

// 该方法用于判断游戏是否已经结束
function check() {
  // 我们的棋子都是存储在 chessArr 的数组
  for (var i = 0; i < chessArr.length; i++) {
    var curChess = chessArr[i]; // 拿到当前这颗棋子
    var chess2, chess3, chess4, chess5;

    // 检查有没有横着的连了 5 个
    chess2 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 1 个有没有
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 2 个有没有
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 3 个有没有
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 4 个有没有
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 说明找到连成一行的相同颜色的棋子了
      end(curChess, chess2, chess3, chess4, chess5);
    }

    // 检查有没有竖着的连了 5 个
    chess2 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 1 个有没有
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 1 &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 2 个有没有
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 2 &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 3 个有没有
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 3 &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 4 个有没有
      return (
        curChess.x === item.x &&
        curChess.y === item.y + 4 &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 说明找到连成一行的相同颜色的棋子了
      end(curChess, chess2, chess3, chess4, chess5);
    }

    // 检查有没有斜着的连了 5 个（斜着又分为两种情况）
    chess2 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 1 个有没有
      return (
        curChess.x === item.x + 1 &&
        curChess.y === item.y + 1 &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 2 个有没有
      return (
        curChess.x === item.x + 2 &&
        curChess.y === item.y + 2 &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 3 个有没有
      return (
        curChess.x === item.x + 3 &&
        curChess.y === item.y + 3 &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 4 个有没有
      return (
        curChess.x === item.x + 4 &&
        curChess.y === item.y + 4 &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 说明找到连成一行的相同颜色的棋子了
      end(curChess, chess2, chess3, chess4, chess5);
    }

    chess2 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 1 个有没有
      return (
        curChess.x === item.x - 1 &&
        curChess.y === item.y + 1 &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 2 个有没有
      return (
        curChess.x === item.x - 2 &&
        curChess.y === item.y + 2 &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 3 个有没有
      return (
        curChess.x === item.x - 3 &&
        curChess.y === item.y + 3 &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      // 我其实就是在找和这颗棋子相邻的 4 个有没有
      return (
        curChess.x === item.x - 4 &&
        curChess.y === item.y + 4 &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      // 说明找到连成一行的相同颜色的棋子了
      end(curChess, chess2, chess3, chess4, chess5);
    }
  }
}

// arguments
// 游戏结束方法，绘制出所有的步数以及获取的棋子
function end() {
  isGameOver = true;
  // 1. 首先需要将棋子的每一步标识出来
  for (var i = 0; i < chessArr.length; i++) {
    // div[data-row='1'][data-line='1']
    // 找对应棋子的 div
    $(
      "div[data-row='" + chessArr[i].y + "'][data-line='" + chessArr[i].x + "']"
    ).innerHTML = i + 1;
  }
  // 2. 然后我们需要把获胜的 5 个棋子标记出来
  for (var i = 0; i < arguments.length; i++) {
    $(
      "div[data-row='" +
        arguments[i].y +
        "'][data-line='" +
        arguments[i].x +
        "']"
    ).classList.add("win");
  }
}

// 判断该位置的棋子是否已经存在
function exist(chessPoint) {
  // find 方法会遍历整个数组，item 就是数组的每一项
  // 如果找到了，就返回找到的项目，否则会返回 undefined
  var result = chessArr.find(function (item) {
    return item.x === chessPoint.x && item.y === chessPoint.y;
  });
  return result === undefined ? true : false;
}

// 游戏的主函数，也就是程序的入口
function main() {
  // 1. 初始化棋盘
  initChessboard();

  // 2. 为棋盘绑定事件
  bindEvent();
}
main();
