var tabs = document.querySelectorAll('#btn li');
var tabLine = document.querySelector('#btn span');
var lis = document.querySelectorAll('#imgWrap li');

var cn = 0;   //当前的索引值 
var ln = 0;   //上一个选中的索引值
var tabWidth = tabs[0].offsetWidth + 20;
var timer = null;

for (let i = 0; i < tabs.length; i++) {
    tabs[i].onmouseover = function () {
        clearInterval(timer);
        timer = null;

        cn = i;
        tab();
    }

    tabs[i].onmouseout = function () {
        timer = setInterval(autoPlay, 3000);
    }
}

timer = setInterval(autoPlay, 3000);

function autoPlay() {
    cn++;
    if (cn == tabs.length) {
        cn = 0;
    }
    tab();
}

function tab() {
    //先把上一个active干掉，再把当前的添加上active
    lis[ln].className = tabs[ln].className = '';
    lis[cn].className = tabs[cn].className = 'active';

    tabLine.style.transform = 'translateX(' + cn * tabWidth + 'px)';

    ln = cn;   //更新上一个的索引

    footer.style.transform='translateY(100px)';
}



//右边导航
var more = document.querySelector('#more');
var listWrap = document.querySelector('nav div');
var navLis = document.querySelectorAll('nav li');
var circle = document.querySelector('nav span');


more.onmouseover = function () {
    listWrap.style.transform = 'translateX(0)';
}
listWrap.onmouseleave = function () {   //onmouseleave与out事件一样，但是它不会冒泡
    listWrap.style.transform = 'translateX(162px)';

    circle.style.display = 'none';
    circle.style.transform = 'translateY(0)';
}

for (let i = 0; i < navLis.length; i++) {
    navLis[i].onmouseover = function () {
        circle.style.display = 'block';
        circle.style.transform = 'translateY(' + i * this.offsetHeight + 'px)';
    }
}


/*
    mousewheel          IE/Chrome
        滚动的方向      ev.wheelDelta
                        上：150
                        下：-150

    DOMMouseScroll      FF
        滚动的方向      ev.detail
                        上：-3
                        下：3
 */

/* document.addEventListener('mousewheel',function(ev){
    console.log(ev.wheelDelta);

}) */

var footer = document.querySelector('.footer');
myScroll(document, function () {
    footer.style.transform = 'translateY(0)';
}, function () {
    footer.style.transform = 'translateY(100px)';
});


function myScroll(obj, callBackUp, callBackDown) {
    obj.addEventListener('mousewheel', fn);
    obj.addEventListener('DOMMouseScroll', fn);

    function fn(ev) {
        if (ev.wheelDelta > 0 || ev.detail < 0) {
            //滚轮正在往上走
            callBackUp.call(obj, ev);
        } else {
            callBackDown.call(obj, ev);
        }
    }
}