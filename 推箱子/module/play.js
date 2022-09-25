import * as map from "./map.js";
/**
 * 按照指定的方向，让玩家移动一步
 * 玩家的下一步
 * @param {*} direction : left、right、up、down
 */
export function playerMove(direction) {
    var playerPoint = getPlayerPoint(); //得到玩家位置
    //得到玩家下一个位置的信息
    var nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction)

    //什么情况下，不能移动
    if (nextInfo.value === map.WALL) {
        return false; //下一个位置是墙
    }

    //能移动
    if (nextInfo.value === map.SPACE) {
        //下一个位置是空白
        exchange(playerPoint, nextInfo);
        return true;
    }
    else {
        //下一个位置是箱子
        //取决于：获取箱子的下一个位置
        var nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction)
        if (nextNextInfo.value === map.SPACE) {
            //可以移动
            exchange(nextInfo, nextNextInfo);//箱子和箱子的下一个位置交换
            exchange(playerPoint, nextInfo);//玩家和下一个位置交换
            return true;
        }
        else {
            return false;
        }
    }
}

/**
 * 根据当前地图内容，判断是否游戏胜利
 */
export function isWin() {
    //是否每个正确位置都有箱子
    for (var i = 0; i < map.correct.length; i++) {
        var point = map.correct[i];
        if (map.content[point.row][point.col] !== map.BOX) {
            //该正确位置上没有箱子
            return false;
        }
    }
    return true;
}

function exchange(point1, point2) {
    var temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

/**
 * 得到玩家的位置
 */
function getPlayerPoint() {
    for (var row = 0; row < map.rowNumber; row++) {
        for (var col = 0; col < map.colNumber; col++) {
            if (map.content[row][col] === map.PLAYER) {
                return {
                    row: row,
                    col: col
                }
            }
        }
    }
    throw new Error("地图上居然没有玩家");
}

/**
 * 得到某个位置在指定方向上的下一个位置的信息（第几行、第几列、内容是啥）
 * @param row 指定的行
 * @param col 指定的列
 * @param {*} direction 
 */
function getNextInfo(row, col, direction) {
    if (direction === "left") {
        return {
            row: row,//行不变
            col: col - 1,//列减一
            value: map.content[row][col - 1]//位置的值  
        }
    }
    else if (direction === "right") {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    }
    else if (direction === "up") {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    }
    else {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}