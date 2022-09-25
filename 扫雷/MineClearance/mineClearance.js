/*
 * author: payen S.Tsung 丛培森
 * date：2016.09
 * blog：http://blog.csdn.net/q1056843325
 */

(function (global) {
    var srcPath = 'mine_img';
    var srcArr = [
        '0.jpg',
        '1.jpg','2.jpg','3.jpg','4.jpg',
        '5.jpg','6.jpg','7.jpg','8.jpg',
        '1_w.jpg','2_w.jpg','3_w.jpg','4_w.jpg',
        '5_w.jpg','6_w.jpg','7_w.jpg','8_w.jpg',
        '1_wrong.gif','2_wrong.gif','3_wrong.gif','4_wrong.gif',
        '5_wrong.gif','6_wrong.gif','7_wrong.gif','8_wrong.gif',
        's.jpg','s_light.jpg','s_light0.jpg',
        'bomb.jpg','bomb0.jpg','bomb_w.jpg',
        'flag.jpg','flag_light.jpg','flag_light0.jpg',
        'mark.jpg','mark_light.jpg','mark_light0.jpg',
    ];
    var $mcStart = document.getElementById('mc_start'),
        $mcLevel = document.getElementById('mc_level'),
        $btnCollection = document.getElementsByTagName('button'),
        $btnStart = $btnCollection[0],
        $btnPri = $btnCollection[1],
        $btnMid = $btnCollection[2],
        $btnExp = $btnCollection[3],
        $gameTime = document.getElementById('mc_game_time'),
        $gameMine = document.getElementById('mc_game_mine'),
        $priGame = document.getElementById('mc_pri_game'),
        $midGame = document.getElementById('mc_mid_game'),
        $expGame = document.getElementById('mc_exp_game'),
        $win = document.getElementById('mc_gameover_win'),                                                                                  
        $lose = document.getElementById('mc_gameover_lose'),
        $overTime = document.getElementById('mc_gameover_time'),
        $overChoose = document.getElementById('mc_gameover_choose'),
        $replay = document.getElementById('mc_replay'),
        $reselect = document.getElementById('mc_reselect'),
        upExPos = {
            'top': '-400px',
            'opacity': '0'
        },
        downExPos = {
            'bottom': '-400px',
            'opacity': '0'
        },
        upPos = {
            'top': '0',
            'opacity': '1'
        },
        downPos = {
            'bottom': '0',
            'opacity': '1'
        },
        midPos = {
            'top': '350px',
            'opacity': '1'
        },
        priLevelPos = {
            'bottom': '252px',
            'opacity': '1'
        },
        highLevelPos = {
            'bottom': '173px',
            'opacity': '1'
        },
        iRowNum,
        iLineNum,
        iMineNum,
        iGridNum,
        timeStart,
        timeEnd,
        msgArr,
        mineArr,
        curGameLevel,
        iDigNum,
        bGameOver;
    
    

    //资源预加载函数
    var preloadingSrc = (function(){
        var loadedNum = 0;
        return function(srcPath, srcArr){
            var imgs = [];
            var toLoadNum = srcArr.length;
            for(var i = 0; i < toLoadNum; i++){
                imgs[i] = new Image();
                imgs[i].src = srcPath + '/' + srcArr[i];
                imgs[i].onload = function(){
                    loadedNum++;
                    if(toLoadNum === loadedNum){
                        console.log('全部图片资源加载完毕');
                    }
                }
            }
        }
    })();
    preloadingSrc(srcPath, srcArr);

    //方格信息构造函数
    function MsgObj(x, y) {
        this.x = x;
        this.y = y;
        this.isDigged = false;
        this.isFlagged = false;
        this.isMarked = false;
        this.isMine = false;
        this.figure = 0;
        this.bCheck = false;
    }
    //初始化雷数组函数
    function initMineArr(mineArray, iMineNum, iGridNum) {
        while (true) {
            if (mineArray.length === iMineNum) {
                mineArray = mineArray.unique();
                if (mineArray.length === iMineNum) {
                    break;
                }
            }
            mineArray.push(Math.floor(Math.random() * iGridNum));
        }
        mineArr = mineArray;
        //console.log(mineArr);
    }
    //初始化方格信息数组函数
    function initMsgArr(msgArr, mineArr, iRowNum, iLineNum) {
        //console.log(mineArr);
        var x, y;
        for (var i = 0; i < iRowNum; i++) {
            msgArr[i] = [];
            for (var j = 0; j < iLineNum; j++) {
                msgArr[i][j] = new MsgObj(i, j);
            }
        }
        for (var k = 0, mlen = mineArr.length; k < mlen; k++) {
            x = parseInt(mineArr[k] / iLineNum);
            y = mineArr[k] % iLineNum;
            msgArr[x][y].isMine = true;
        }
    }
    //初始化数字函数
    function initFigure(msgArr, iRowNum, iLineNum) {
        var iCount,
            arr;
        for (var i = 0; i < iRowNum; i++) {
            for (var j = 0; j < iLineNum; j++) {
                iCount = 0;
                arr = roundArray(i, j, iRowNum, iLineNum);
                if (!msgArr[i][j].isMine) {
                    for (var k = 0, len = arr.length; k < len; k++) {
                        if (msgArr[arr[k].x][arr[k].y].isMine) {
                            iCount++;
                        }
                    }
                }
                msgArr[i][j].figure = iCount;
            }
        }
    }
    //周围方格数组函数
    function roundArray(x, y, iRowNum, iLineNum) {
        function Coord(x, y) {
            this.x = x;
            this.y = y;
        }
        var roundArr = [];
        roundArr.push(new Coord(x, y));
        if (x - 1 >= 0) {
            roundArr.push(new Coord(x - 1, y));
            if (y - 1 >= 0) {
                roundArr.push(new Coord(x - 1, y - 1));
            }
        }
        if (x + 1 <= iRowNum - 1) {
            roundArr.push(new Coord(x + 1, y));
            if (y + 1 <= iLineNum - 1) {
                roundArr.push(new Coord(x + 1, y + 1));
            }
        }
        if (y - 1 >= 0) {
            roundArr.push(new Coord(x, y - 1));
            if (x + 1 <= iRowNum - 1) {
                roundArr.push(new Coord(x + 1, y - 1));
            }
        }
        if (y + 1 <= iLineNum - 1) {
            roundArr.push(new Coord(x, y + 1));
            if (x - 1 >= 0) {
                roundArr.push(new Coord(x - 1, y + 1));
            }
        }
        return roundArr;
    }
    //触发事件方格的坐标函数
    function coordOfGrid(ele) {
        var parNode = ele.parentNode;
        return {
            x: parNode.eleIndex(),
            y: ele.eleIndex()
        }
    }
    //插入数字背景图片函数
    function addFigureImg(ele, num) {
        switch (num) {
            case 1:
                ele.className = "number1";
                break;
            case 2:
                ele.className = "number2";
                break;
            case 3:
                ele.className = "number3";
                break;
            case 4:
                ele.className = "number4";
                break;
            case 5:
                ele.className = "number5";
                break;
            case 6:
                ele.className = "number6";
                break;
            case 7:
                ele.className = "number7";
                break;
            case 8:
                ele.className = "number8";
                break;
        }
    }
    //插入数字错误背景动图函数
    function addFalseFigureImg(ele, num) {
        switch (num) {
            case 1:
                ele.className = "number1_wrong";
                break;
            case 2:
                ele.className = "number2_wrong";
                break;
            case 3:
                ele.className = "number3_wrong";
                break;
            case 4:
                ele.className = "number4_wrong";
                break;
            case 5:
                ele.className = "number5_wrong";
                break;
            case 6:
                ele.className = "number6_wrong";
                break;
            case 7:
                ele.className = "number7_wrong";
                break;
            case 8:
                ele.className = "number8_wrong";
                break;
        }
    }
    //检查游戏胜利函数
    function digJudge(gameLevel, msgArr, iRowNum, iLineNum) {
        iDigNum++;
        //console.log(iDigNum,iRowNum*iLineNum - iDigNum);
        var curGridEle;
        if (iDigNum === iGridNum - iMineNum) {
            for (var i = 0; i < iRowNum; i++) {
                for (var j = 0; j < iLineNum; j++) {
                    curGridEle = gameLevel.children[i].children[j];
                    if (!msgArr[i][j].isDigged && !msgArr[i][j].isFlagged) {
                        msgArr[i][j].isDigged = true;
                        if (msgArr[i][j].isMine) {
                            curGridEle.className = "flag";
                            msgArr[i][j].isFlagged = true;
                        } else if (msgArr[i][j].figure != 0) {
                            addFigureImg(curGridEle, msgArr[i][j].figure);
                        } else {
                            curGridEle.className = "white";
                        }
                    }
                }
            }
            gameOver(true);
        }
    }
    //挖开方块函数
    function digGrid(gameLevel, msgArr, x, y) {
        if (msgArr[x][y].isDigged || msgArr[x][y].isFlagged) {
            return;
        }
        var index = msgArr[x][y].figure,
            curGridEle = gameLevel.children[x].children[y];
        if (index !== 0) {
            addFigureImg(curGridEle, index);
        } else {
            curGridEle.className = "white";
        }
        msgArr[x][y].isDigged = true;
        digJudge(gameLevel, msgArr, iRowNum, iLineNum);
    }
    //挖开方块周围边界至有数字方块函数
    function digAmibientGrid(gameLevel, msgArr, x, y, iRowNum, iLineNum) {
        msgArr[x][y].bCheck = true;
        var arr = roundArray(x, y, iRowNum, iLineNum).slice(1),
            curGridMsg;
        for (var i = 0, len = arr.length; i < len; i++) {
            digGrid(gameLevel, msgArr, arr[i].x, arr[i].y);
            curGridMsg = msgArr[arr[i].x][arr[i].y];
            if (!curGridMsg.isFlagged && !curGridMsg.bCheck && curGridMsg.figure === 0) {
                digAmibientGrid(gameLevel, msgArr, arr[i].x, arr[i].y, iRowNum, iLineNum);
            }
        }
    }
    //自动探测按下函数
    function autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, bFlag) {
        var arr = roundArray(x, y, iRowNum, iLineNum),
            curGridMsg;
        for (var i = 0, len = arr.length; i < len; i++) {
            curGridMsg = msgArr[arr[i].x][arr[i].y];
            if (!curGridMsg.isDigged && !curGridMsg.isFlagged) {
                gameLevel.children[arr[i].x].children[arr[i].y].className = bFlag ? "white" : "mc_cell";
            }
        }
    }
    //自动探测抬起函数
    function autoExploreUp(gameLevel, msgArr, x, y, iRowNum, iLineNum) {
        var arr = roundArray(x, y, iRowNum, iLineNum).slice(1),
            curGridMsg;
        for (var i = 0, len = arr.length; i < len; i++) {
            curGridMsg = msgArr[arr[i].x][arr[i].y];
            var curGridEle = gameLevel.children[arr[i].x].children[arr[i].y];
            if (!curGridMsg.isDigged && !curGridMsg.isFlagged) {
                if (!curGridMsg.isMine) {
                    digJudge(gameLevel, msgArr, iRowNum, iLineNum);
                    if (curGridMsg.figure === 0) {
                        curGridEle.className = "white";
                        digAmibientGrid(gameLevel, msgArr, arr[i].x, arr[i].y, iRowNum, iLineNum);
                    } else {
                        addFigureImg(curGridEle, curGridMsg.figure);
                    }
                } else {
                    digAllGrid(gameLevel, msgArr, iRowNum, iLineNum);
                    curGridEle.className = "bomb0";
                    gameOver(false);
                }
                curGridMsg.isDigged = true;
            }
        }
    }
    //自动探测函数
    function autoExplore(gameLevel, msgArr, x, y, iRowNum, iLineNum) {
        if (msgArr[x][y].isDigged) {
            if (msgArr[x][y].figure != 0 && numOfSurroundingFlag(msgArr, x, y, iRowNum, iLineNum) === msgArr[x][y].figure) {
                autoExploreUp(gameLevel, msgArr, x, y, iRowNum, iLineNum);
            } else {
                autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, false);
                var numOfGrid = msgArr[x][y].figure;
                addFalseFigureImg(gameLevel.children[x].children[y], numOfGrid);
                clearTimeout(msgArr[x][y].deferTimer);
                msgArr[x][y].deferTimer = setTimeout(function () {
                    addFigureImg(gameLevel.children[x].children[y], numOfGrid);
                }, 800);
            }
        } else {
            autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, false);
        }
    }
    //检测周围旗帜数量函数
    function numOfSurroundingFlag(msgArr, x, y, iRowNum, iLineNum) {
        var flagNum = 0,
            arr = roundArray(x, y, iRowNum, iLineNum).slice(1);
        for (var i = 0, len = arr.length; i < len; i++) {
            if (msgArr[arr[i].x][arr[i].y].isFlagged) {
                flagNum++;
            }
        }
        return flagNum;
    }
    //游戏失败显示所有雷块函数
    function digAllGrid(gameLevel, msgArr, iRowNum, iLineNum) {
        var curGridEle;
        for (var i = 0; i < iRowNum; i++) {
            for (var j = 0; j < iLineNum; j++) {
                curGridEle = gameLevel.children[i].children[j];
                if (!msgArr[i][j].isDigged) {
                    if (msgArr[i][j].isMine && !msgArr[i][j].isFlagged) {
                        curGridEle.className = "bomb";
                    }
                    if (!msgArr[i][j].isMine && msgArr[i][j].isFlagged) {
                        curGridEle.className = "bomb_wrong";
                    }
                }
            }
        }
    }
    //剩余雷数处理函数
    function remainderMine(bFlag) {
        var reMine = parseInt($gameMine.children[1].innerHTML);
        reMine = bFlag ? reMine - 1 : reMine + 1;
        $gameMine.children[1].innerHTML = reMine;
    }
    //游戏结束处理函数
    function gameOver(isWin) {
        bGameOver = true;
        startMove($gameTime, upExPos);
        startMove($gameMine, downExPos);
        if (isWin) {
            startMove($win, upPos);
            startMove($overTime, upPos);
            $overTime.children[1].innerHTML = $gameTime.children[0].innerHTML + ' 秒';
        } else {
            startMove($lose, upPos);
            startMove($overTime, upPos);
            $overTime.children[1].innerHTML = $gameTime.children[0].innerHTML + ' 秒';
        }
        startMove($overChoose, downPos);
    }
    //重置游戏清空数据函数
    function clearData(gameLevel) {
        var gameLevelArr = gameLevel.children,
            row = gameLevelArr.length,
            line = gameLevelArr[0].children.length,
            i, j;
        for (i = 0; i < row; i++) {
            for (j = 0; j < line; j++) {
                gameLevel.children[i].children[j].className = "mc_cell";
            }
        }
        clearInterval(gameLevel.displayTimeTimer);
        $gameTime.children[0].innerHTML = "0";
        gameLevel.onmouseover = null;
        gameLevel.onmouseout = null;
        gameLevel.onmousedown = null;
        gameLevel.onmouseup = null;
        gameLevel.ondblclick = null;
    }

    //初始化游戏数据事件绑定函数
    function initGame(gameLevel, gameStr, pos, rowNum, lineNum, mineNum) {
        bGameOver = false;
        msgArr = [];
        mineArr = [];
        curGameLevel = gameStr;
        iMineNum = mineNum;
        iRowNum = rowNum;
        iLineNum = lineNum;
        iGridNum = iRowNum * iLineNum;
        iDigNum = 0;
        timeStart = 0;
        timeEnd = 0;
        initMineArr(mineArr, iMineNum, iGridNum);
        initMsgArr(msgArr, mineArr, iRowNum, iLineNum);
        initFigure(msgArr, iRowNum, iLineNum);
        var isMouseDown = false,
            isOutside = false,
            isMidMouseDown = false,
            bFirstClick = true;
        $gameMine.children[1].innerHTML = iMineNum;
        //绑定游戏规则相关事件
        //鼠标移入事件
        gameLevel.onmouseover = function (e) {
            if (bGameOver) {
                return;
            }
            var event = e || global.event,
                src = event.target || event.srcElement,
                x = coordOfGrid(src).x,
                y = coordOfGrid(src).y;
            if (src.nodeName.toLowerCase() === "li") {
                if (isMidMouseDown && !isOutside) {
                    autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, true);
                } else {
                    if (!msgArr[x][y].isDigged) {
                        if (isMouseDown && !isOutside) {
                            src.className = "white";
                        } else {
                            if (msgArr[x][y].isFlagged) {
                                src.className = "flag_light";
                            } else if (msgArr[x][y].isMarked) {
                                src.className = "mark_light";
                            } else {
                                src.className = "mc_cell_light";
                            }
                        }
                    }
                }
            } else {
                isOutside = true;
            }
        };
        //鼠标移出事件
        gameLevel.onmouseout = function (e) {
            if (bGameOver) {
                return;
            }
            var event = e || global.event,
                src = event.target || event.srcElement,
                x = coordOfGrid(src).x,
                y = coordOfGrid(src).y;
            if (src.nodeName.toLowerCase() === "li") {
                if (isMidMouseDown) {
                    autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, false);
                } else {
                    if (!msgArr[x][y].isDigged) {
                        if (msgArr[x][y].isFlagged) {
                            src.className = "flag";
                        } else if (msgArr[x][y].isMarked) {
                            src.className = "mark";
                        } else {
                            src.className = "mc_cell";
                        }
                    }
                }
            }
        };
        //鼠标按下事件
        gameLevel.onmousedown = function (e) {
            if (bGameOver) {
                return;
            }
            var event = e || global.event,
                src = event.target || event.srcElement,
                x = coordOfGrid(src).x,
                y = coordOfGrid(src).y,
                index = msgArr[x][y].figure;
            isOutside = false;
            isMidMouseDown = false;
            if (src.nodeName.toLowerCase() !== "li") {
                return;
            }
            if (event.button === 0) {
                if (!msgArr[x][y].isDigged && !msgArr[x][y].isFlagged) {
                    isMouseDown = true;
                    src.className = "white";
                }
            } else if (event.button === 2) {
                if (!msgArr[x][y].isDigged) {
                    if (msgArr[x][y].isFlagged) {
                        src.className = "mark_light";
                        remainderMine(false);
                        msgArr[x][y].isFlagged = false;
                        msgArr[x][y].isMarked = true;
                    } else if (msgArr[x][y].isMarked) {
                        src.className = "mc_cell_light";
                        msgArr[x][y].isMarked = false;
                    } else {
                        src.className = "flag_light";
                        remainderMine(true);
                        msgArr[x][y].isFlagged = true;
                    }
                }
            } else {
                isMidMouseDown = true;
                autoExploreDown(gameLevel, msgArr, x, y, iRowNum, iLineNum, true);
            }
        };
        //鼠标抬起事件
        document.onmouseup = function (e) {
            if (bGameOver) {
                return;
            }
            var event = e || global.event,
                src = event.target || event.srcElement,
                x = coordOfGrid(src).x,
                y = coordOfGrid(src).y,
                index = msgArr[x][y].figure;
            if (src.nodeName.toLowerCase() !== "li") {
                isOutside = true;
                return;
            }
            if (event.button === 0) {
                isMouseDown = false;
                if (bFirstClick) {
                    timeStart = new Date().getTime();
                    bFirstClick = false;
                    clearInterval(gameLevel.displayTimeTimer);
                    gameLevel.displayTimeTimer = setInterval(function () {
                        timeEnd = new Date().getTime();
                        $gameTime.children[0].innerHTML = parseInt((timeEnd - timeStart) / 1000);
                    }, 50);
                }
                if (!msgArr[x][y].isDigged && !msgArr[x][y].isFlagged) {
                    msgArr[x][y].isDigged = true;
                    if (msgArr[x][y].isMine) {
                        src.className = "bomb0";
                        digAllGrid(gameLevel, msgArr, iRowNum, iLineNum);
                        gameOver(false);
                    } else if (index !== 0) {
                        addFigureImg(src, index);
                        digJudge(gameLevel, msgArr, iRowNum, iLineNum);
                    } else {
                        src.className = "white";
                        digJudge(gameLevel, msgArr, iRowNum, iLineNum);
                        digAmibientGrid(gameLevel, msgArr, x, y, iRowNum, iLineNum);
                    }
                }
            } else if (event.button === 1) {
                isMidMouseDown = false;
                autoExplore(gameLevel, msgArr, x, y, iRowNum, iLineNum);
            }
        };
        //鼠标双击事件
        gameLevel.ondblclick = function (e) {
            if (bGameOver) {
                return;
            }
            var event = e || global.event,
                src = event.target || event.srcElement,
                x = coordOfGrid(src).x,
                y = coordOfGrid(src).y;
            autoExplore(gameLevel, msgArr, x, y, iRowNum, iLineNum);
        };
    };

    //阻止浏览器默认拖拽事件
    document.onmousemove = function (e) {
        cancelHandler(e);
    };
    //阻止浏览器默认右键菜单事件
    document.oncontextmenu = function (e) {
        cancelHandler(e);
    };

    //绑定按钮点击事件
    $btnStart.onclick = function () {
        startMove($mcStart, upExPos);
        startMove($mcLevel, midPos);
    };
    $btnPri.onclick = function () {
        startMove($mcLevel, upExPos);
        startMove($priGame, priLevelPos);
        startMove($gameTime, upPos);
        startMove($gameMine, downPos);
        initGame($priGame, "pri", priLevelPos, 9, 9, 10);
    };
    $btnMid.onclick = function () {
        startMove($mcLevel, upExPos);
        startMove($midGame, highLevelPos);
        startMove($gameTime, upPos);
        startMove($gameMine, downPos);
        initGame($midGame, "mid", highLevelPos, 16, 16, 40);
    };
    $btnExp.onclick = function () {
        startMove($mcLevel, upExPos);
        startMove($expGame, highLevelPos);
        startMove($gameTime, upPos);
        startMove($gameMine, downPos);
        initGame($expGame, "exp", highLevelPos, 16, 30, 99);
    };
    $replay.onclick = function () {
        startMove($win, upExPos);
        startMove($lose, upExPos);
        startMove($overTime, upExPos);
        startMove($overChoose, downExPos);
        startMove($gameTime, upPos);
        startMove($gameMine, downPos);
        switch (curGameLevel) {
            case "pri":
                clearData($priGame);
                initGame($priGame, "pri", priLevelPos, 9, 9, 10);
                break;
            case "mid":
                clearData($midGame);
                initGame($midGame, "mid", highLevelPos, 16, 16, 40);
                break;
            case "exp":
                clearData($expGame);
                initGame($expGame, "exp", highLevelPos, 16, 30, 99);
                break;
        }
    };
    $reselect.onclick = function () {
        startMove($win, upExPos);
        startMove($lose, upExPos);
        startMove($overTime, upExPos);
        startMove($overChoose, downExPos);
        switch (curGameLevel) {
            case "pri":
                clearData($priGame);
                startMove($priGame, downExPos);
                break;
            case "mid":
                clearData($midGame);
                startMove($midGame, downExPos);
                break;
            case "exp":
                clearData($expGame);
                startMove($expGame, downExPos);
                break;
        }
        startMove($mcLevel, midPos);
    };
} (window));
