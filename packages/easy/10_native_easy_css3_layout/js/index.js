var btn = document.querySelector('#head button');
var ul = document.querySelector('#head ul');
var display = true;

btn.onclick = function () {
    ul.style.height = display ? '250px' : '0';
    display = !display;
    // 巧妙：两种情况的切换经验
};
var pic = document.querySelector('#pic');
var picUl = document.querySelector('#pic ul');
var picLis = picUl.children;
var cn = 0;//当前图片索引值

var head = picUl.firstElementChild.cloneNode(true);
// true 深度克隆，带着事件
picUl.appendChild(head);
picUl.style.width = picLis.length * 100 + 'vw';

function move() {
    picUl.style.transition = 'left .5s';
    picUl.style.left = -cn * 100 + 'vw';
}

picUl.addEventListener('transitionend', function () {
    if (cn == picLis.length - 1) {
        picUl.style.transition = '';
        picUl.style.left = 0;
        cn = 0;
    }
});

function autoPlay() {//自动播放
    cn++;
    // var hn = (cn + 1) % picLis.length;

    if (cn > picLis.length) {
        cn = 0;
    }
    move();

    console.log(cn);
}
var timer = setInterval(autoPlay, 2000);

pic.onmouseenter = function () {//鼠标放上去停止轮播
    clearInterval(timer);
    timer = null;
}
// 网页和vscode之间切换会有bug
// 原因：浏览器的原因，为了节约性能，当浏览器没有打开，页面运动关闭，定时器还在走
pic.onmouseleave = function () {
    timer = setInterval(autoPlay, 2000);
};
// 解决方案
document.addEventListener('visibilitychange', function () {
    /*
         visibilitychange   能见度改变事件，当页面隐藏或显示的时候会被触发
        document.hidden
            true    页面隐藏
            false   页面显示
     */
    if (document.hidden) {
        clearInterval(timer);
        timer = null;
    } else {
        timer = setInterval(autoPlay, 2000);
    }
})





