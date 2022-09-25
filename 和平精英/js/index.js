//打开视频功能
(function () {
    var playBtn = document.querySelector('#section1 .play'),
        dialog = document.querySelector('.dialog'),
        shadow = document.querySelector('.shadow'),
        colseBtn = document.querySelector('.colseBtn'),
        movie = document.querySelector('.movie'),
        movieInner = movie.innerHTML;

    playBtn.onclick = function () {
        dialog.style.display = shadow.style.display = 'block';
        movie.innerHTML = movieInner;
    };
    colseBtn.onclick = function () {
        dialog.style.display = shadow.style.display = 'none';
        movie.innerHTML = '';
    };
})();

//选项卡
(function () {
    function tab(btn, content) {
        var btns = btn.children;  //获取到第一层的子元素
        var cons = content.children;

        for (var i = 0; i < btns.length; i++) { //循环的是所有的按钮
            btns[i].index = i;    //给每一个按钮身上添加一个索引值
            btns[i].onclick = function () {
                //让别的元素身上的active去掉，让别的元素对应的内容隐藏
                for (var i = 0; i < btns.length; i++) { //循环所有元素
                    //classList取到元素身上的所有class(集合对象)
                    btns[i].classList.remove('active');
                    cons[i].classList.remove('active');
                }

                //让自己身上加上active，让自己对应的内容显示
                this.classList.add('active');
                cons[this.index].classList.add('active');
            }
        }
    }

    var tabBtns = document.querySelectorAll('.tabBtn');    //取到页面里所有的按钮的父级（3个）
    var tabContents = document.querySelectorAll('.tabContent');    //取到页面里所有的内容（3个）

    for (var i = 0; i < tabBtns.length; i++) {
        tab(tabBtns[i], tabContents[i]);
    }
})();

//轮播图
(function () {
    function carousel(id) {
        var wrap = document.querySelector(id + ' .wrap'),
            ul = document.querySelector(id + ' ul'),
            prev = document.querySelector(id + ' .prev'),
            next = document.querySelector(id + ' .next'),
            circles = document.querySelectorAll(id + ' .circle span'),
            boxWidth = wrap.offsetWidth,  //一个轮播图的宽
            canclick = true;  //是否能进行下次点击，能（true），不能（false）
        timer = null;

        //初始化
        ul.innerHTML += ul.innerHTML;
        var len = ul.children.length; //子元素的数量
        ul.style.width = len * boxWidth + 'px';

        var cn = 0;   //当前的索引值
        var ln = 0;   //上一个的索引值

        next.onclick = function () {
            if (!canclick) {
                //这个条件成立说明 现在不能点击
                return;
            }

            cn++;
            move();
        }

        prev.onclick = function () {
            if (!canclick) {
                //这个条件成立说明 现在不能点击
                return;
            }

            if (cn == 0) {
                cn = len / 2;
                ul.style.transition = null;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            }

            setTimeout(function () {
                //transition的值会被mover里给覆盖了，所以我让它俩不是同时执行，借助定时器
                cn--;
                move();
            }, 16);
        }

        for (var i = 0; i < circles.length; i++) {
            circles[i].index = i;
            circles[i].onclick = function () {
                if (!canclick) {
                    //这个条件成立说明 现在不能点击
                    return;
                }

                cn = this.index;
                move();
            }
        }

        function move() {
            canclick = false; //运动正在走，不让用户点击

            //console.log(cn);
            ul.style.transition = '.3s';
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

            /*
                同步圆点
                cn:0 1 2 3 4 5 6 7
                hn:0 1 2 3 0 1 2 3

             */

            var hn = cn % (len / 2);
            circles[ln].className = '';
            circles[hn].className = 'active';
            ln = hn;    //当前次的索引相对于下一次的点击就是上一次的索引
            //相对于下一次的点击，上一次就是当前
        }

        ul.addEventListener('transitionend', function () { //过渡完成后就会触发的事件
            // console.log(1);
            if (cn == len / 2) {  //当第4个索引对应的图片运动完了，要把ul拉回原点，才能做到无缝滚动
                // console.log(12);
                ul.style.transition = null;
                cn = 0;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
            }

            canclick = true;  //运动走完了，让用户可以再次点击 
        });

        timer = setInterval(next.onclick, 3000);

        //浏览器tab页面切换、浏览器缩小的时候，浏览器为了节约资源会把运动给停掉，但是定时器依然在走。造成了不同步的问题，还有可能cn走超了等等。以下就是解决这个问题
        window.onblur = function () {
            //页面隐藏了
            clearInterval(timer);
        };
        window.onfocus=function(){
            //页面打开了
            timer = setInterval(next.onclick, 3000);
        }

        //第二个解决方法，使用visibilitychange事件
        /* document.addEventListener('visibilitychange',function(){
            if(document.visibilityState === 'hidden' ){
                //页面隐藏了，清除动画
                clearInterval(timer);
            }else{
               //页面打开了
               timer = setInterval(next.onclick, 3000);
            }
        }); */

    }

    carousel('#section3');
    carousel('#section5');
})();

/* 新增场景 */
(function () {
    var section4 = document.querySelector('#section4');
    var lis = document.querySelectorAll('#section4 li');
    var bottom = document.querySelector('#section4 .bottom');
    var ln = 0;

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            lis[ln].classList.remove('active');
            this.classList.add('active');

            section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top';
            bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top';

            ln = this.index;
        };
    }
})();

//手风琴
(function () {
    var lis = document.querySelectorAll('#section7 li');
    var ln = 0;

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            lis[ln].classList.remove('active');
            this.classList.add('active');

            ln = this.index;
        };
    }
})();

/* 游戏特色轮播图 */
(function () {
    var ul = document.querySelector('#section8 ul'),
        lis = ul.children,
        prev = document.querySelector('#section8 .prev'),
        next = document.querySelector('#section8 .next'),
        spans = document.querySelectorAll('#section8 .circle span'),
        cn = 0,
        ln = 0;

    next.onclick = function () {
        cn++;
        cn %= lis.length;

        //注意：li:nth-child(3)原来是用right定位，样式里已经改成了left定位
        ul.appendChild(lis[0]);

        spans[ln].className = '';
        spans[cn].className = 'active';

        ln = cn;
    }

    prev.onclick = function () {
        cn--;
        if (cn < 0) {
            cn = lis.length - 1;
        }

        //把最后一个元素插入到第0个元素的前面
        ul.insertBefore(lis[lis.length - 1], lis[0]);

        lis[0].style.opacity=0;
        setTimeout(function(){
            lis[0].style.opacity='';
        });

        spans[ln].className = '';
        spans[cn].className = 'active';

        ln = cn;
    }
})();
/* 祝各位小伙伴，学业有成，拿到自己心仪的offer! */

