var createSpeed = 1000;
// 元素移动速度变化
var upSpeed = 20;
var upId,createId,timeId;
// 分数
var score = 0;
var scoreElem = document.getElementById('score');
// 游戏时间
var time = 0;
var timeElem = document.getElementById('time');

// 可视区域的宽高
var pageHeight = window.innerHeight;
var pageWidth = window.innerWidth;

// 监听时间
timeId = setInterval(function () {
    timeMethod();
}, 1000);

// 时间增加，在页面中显示。
function timeMethod() {
    time ++;
    timeElem.innerHTML = time + '秒'
}


var createId = setInterval(function () {
    createLetter();
}, createSpeed);

function getRandom(max,min) {
    if (min == undefined) {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
var imgArr = [];
function createLetter() {
    var img = document.createElement('img');
    var charNum = parseInt(getRandom(36, 10));
    var letter = charNum.toString(36).toUpperCase();
    // 图片提示符
    img.title = letter;
    img.src = './img/' + letter + '.png';
    console.log('./img/' + letter + '.png');
    img.style.position = 'absolute';
    img.style.width = '50px'; // 定宽不定高。
    img.style.top = (pageHeight) + 'px';
    img.style.left = getRandom(pageWidth - 50) + 'px';
    document.body.appendChild(img);
    imgArr.push(img);
    // push 方法相当于在数组后面追加。
    // 随机生成 A~Z
}

// 每隔一段时间，元素上升一像素。
upId = setInterval(function() {
    letterUp();
}, upSpeed);

function letterUp() {
    // imgArr
    for(var i=0; i<imgArr.length; i++) {
        var letter = imgArr[i];
        var top = parseInt(letter.style.top);
        top --;
        if (top === 0) { //游戏结束
            clearInterval(upId);
            clearInterval(createId);
            clearInterval(timeId);
            window.onkeydown = null;
            alert('游戏结束, 你最终得分' + score);
        }
        letter.style.top = top + 'px';
    }
}
// 键盘事件
window.onkeydown = function (e) {
    // 按键值
    var key = e.key.toUpperCase();
    console.log(key); // ABCDEFGH
    // img.title  ABCDEFGH
    // img.title == key
    // img 元素干掉
    // body去掉元素 页面中干点
    // imgArr要去掉img. 数据中干掉。
    for(var i=0; i<imgArr.length; i++) {
        var letter = imgArr[i];
        if(letter.title === key) { //对了
            score ++;
            scoreElem.innerHTML = score;
            // 修改速度
            changeSpeed(score);
            document.body.removeChild(letter);
            imgArr.splice(i, 1);
            // 只匹配一次。匹配完成后，跳出。
            break;
        }
    }
}

function changeSpeed(score) {
    if (score > 5 && score < 15) {
        upSpeed = 15;
        createSpeed = 700;
    } else if (score >= 15 && score < 25) {
        upSpeed = 10;
        createSpeed = 500;
    } else if (score >= 25) {
        upSpeed = 5;
        createSpeed = 300;
    }
    clearInterval(createId);
    clearInterval(upId);
    createId = setInterval(function () {
        createLetter();
    }, createSpeed);
    upId = setInterval(function() {
        letterUp();
    }, upSpeed);
}




