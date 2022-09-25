//仅用于记录地图中的内容（箱子、玩家、墙、空白）

export const SPACE = 0;//空白
export const PLAYER = 1;//玩家
export const WALL = 2;//墙
export const BOX = 3;//箱子


/**
 * 0. 空白
 * 1. 玩家
 * 2. 墙
 * 3. 箱子
 * 注意：正确位置和箱子不好区分，所以不能把正确位置放入
 */
export const content = [//导出地图
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 3, 0, 2, 0, 0],
    [2, 2, 2, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 0, 3, 3, 3, 3, 3, 0, 2],
    [2, 0, 0, 0, 3, 0, 0, 0, 2],
    [2, 2, 0, 3, 3, 3, 0, 2, 2],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 3, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0]
];

/**
 * 记录正确位置
 */
export const correct = [
    { row: 3, col: 4 },
    { row: 4, col: 4 },
    { row: 5, col: 2 },
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 6, col: 4 },
    { row: 7, col: 4 },
    { row: 8, col: 4 },
    { row: 9, col: 4 },
    { row: 10, col: 4 }
];

/**
 * 总列数
 */
export const colNumber = content[0].length;
/**
 * 总行数
 */
export const rowNumber = content.length;


/**生成注释
 *
 * /**就可以
 *
 */
