//滑屏
(function () {
    var scrollWrap = document.querySelector('.scrollWrap'),
        inner = document.querySelector('.inner');   //要走的元素

    var startPointX = 0,  //按下时手指的坐标
        startLeft = 0,    //按下时元素的位置
        movePointX = 0;   //手指拖动的距离

    inner.style.transform = 'translateX(0px)';   //给一个初始值，为了后面获取直的距离 
    scrollWrap.addEventListener('touchstart', function (ev) {
        //touchstart    手指按下的事件
        //ev.changedTouches 按下时手指的列表
        startPointX = ev.changedTouches[0].pageX;   //按下的时候手指的坐标点
        startLeft = parseFloat(inner.style.transform.split('(')[1]);
    });

    scrollWrap.addEventListener('touchmove', function (ev) {
        //touchmove    手指滑动的事件
        movePointX = ev.changedTouches[0].pageX - startPointX;  //手指滑动的距离=滑动时的手指的坐标点-按下的时候手指的坐标点
        var x = movePointX + startLeft; //元素要走的距离

        if (x >= 0) {   //这个条件成立，说明左边到头了
            x = 0;
        } else if (x <= scrollWrap.offsetWidth - inner.offsetWidth) {//右边到头了
            x = scrollWrap.offsetWidth - inner.offsetWidth;
        }

        inner.style.transform = 'translateX(' + x + 'px)';

        ev.preventDefault();    //斜着拖动的时候也会触发滑动
    });
})();

(function () {
    var more = document.querySelector('.channel .more span'),
        channel = document.querySelector('.channel'),   //要走的元素
        shadow = document.querySelector('.shadow'),   //要走的元素
        inner = document.querySelector('.inner');   //要走的元素

    var shrink = true;
    more.addEventListener('touchend', function () {
        if (shrink) {
            channel.classList.add('blockChannel');  //展开
            shadow.style.display = 'block';

            inner.style.transform = 'translateX(0px)';
        } else {
            channel.classList.remove('blockChannel');   //收回去
            shadow.style.display = 'none';
        }

        shrink = !shrink;
    });

    shadow.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
    });
})();

//无缝轮播图
(function () {
    var banner = document.querySelector('.banner'),
        wrap = document.querySelector('.wrap'),
        circles = document.querySelectorAll('.banner .circle span'),   //要走的元素
        imgWidth = banner.offsetWidth;   //轮播图的宽度

    var startPointX = 0,  //按下时手指的坐标
        startLeft = 0,    //按下时元素的位置
        movePointX = 0,   //手指拖动的距离
        cn = 0,   //当前的索引值
        ln = 0,   //上一个索引值
        timer = null; //定时器

    //复制一份
    wrap.innerHTML += wrap.innerHTML;
    var len = wrap.children.length;
    wrap.style.width = len * 100 + 'vw';
    wrap.style.transform = 'translateX(0px)';

    banner.addEventListener('touchstart', function (ev) {
        wrap.style.transition = null;

        if (cn == 0) {  //按下的是第一张，往右走左边就会出现空白了
            cn = len / 2;   //回到第二份的第一张
        }

        if (cn == len - 1) {    //按下的是最后一张，往左走也会出现空白了
            cn = len / 2 - 1;   //回到第一份的最后一张
        }

        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';


        startPointX = ev.changedTouches[0].pageX;   //按下的时候手指的坐标点
        startLeft = parseFloat(wrap.style.transform.split('(')[1]);
    });

    banner.addEventListener('touchmove', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;  //手指滑动的距离=滑动时的手指的坐标点-按下的时候手指的坐标点
        wrap.style.transform = 'translateX(' + (movePointX + startLeft) + 'px)';
    });

    banner.addEventListener('touchend', function (ev) {
        movePointX = ev.changedTouches[0].pageX - startPointX;  //手指滑动的距离=滑动时的手指的坐标点-按下的时候手指的坐标点

        var backWidth = imgWidth / 8;   //拉力回弹的距离
        if (Math.abs(movePointX) > backWidth) {
            //这个条件成立说明滑动的距离已经超过了拉力回弹的距离，图片要走了
            /*
                1、 movePointX的值为正值，代表用户往右边拖动，显示上一张图，cn--
                2、 movePointX的值为负值，代表用户往左边拖动，显示下一张图，cn++
             */

            /* if(movePointX<0){
                cn++
            }else{
                cn--;
            } */

            cn -= movePointX / Math.abs(movePointX);
        }

        // cn++;
        wrap.style.transition = '.3s transform';
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

        /* cn:0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 %8
              0 1 2 3 4 5 6 7 0 1 2 3  4  5  6  7  */

        var hn = cn % (len / 2);    //圆点与图片的数量不对称，通过这个表达式就对称了
        circles[ln].className = '';   //上一个选中的，取消选中
        circles[hn].className = 'active';   //当前个，添加选中
        ln = hn;    //当前次的索引相对于下一次来说就是上一次
    });

    function move() {
        cn++;
        wrap.style.transition = '.3s transform';
        wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';

        wrap.addEventListener('transitionend', function () {
            // /transitionend 过渡完成后就会触发
            if (cn >= len - 1) {    //这个地方更正一下，条件成立说明走到了最后一张图，要瞬间拉回第一份的最后一张图。与课上讲的不一致。课上讲的是走到第二份的第一张，拉回到第一张。效果是一样的都是无缝，只是选择拉回的点不同，不影响
                cn = len / 2 - 1;

                wrap.style.transition = null;
                wrap.style.transform = 'translateX(' + -cn * imgWidth + 'px)';
            }
        })

        var hn = cn % (len / 2);
        circles[ln].className = '';   //上一个选中的
        circles[hn].className = 'active';
        ln = hn;
    }

    timer = setInterval(move, 3000);
})();

(function () {
    var backTop = document.querySelector('.backTop');

    window.onscroll = function () {
        var top = window.pageYOffset;
        backTop.style.opacity = top > 600 ? 1 : 0;
    }

    backTop.addEventListener('touchend', function () {
        window.scrollTo(0, 0);
    });
})();








