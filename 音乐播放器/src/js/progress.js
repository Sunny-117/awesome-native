(function (root) {
    //进度条
    function Progress() {
        this.durTime = 0; //存储总时长
        this.frameId = null;  //定时器
        this.startTime = 0;   //开始播放的时间
        this.lastPercent = 0; //暂停时已经走的百分比
        this.init();
    }
    Progress.prototype = {
        init: function () {
            //console.log('init');

            this.getDom();
        },
        getDom: function () {
            this.curTime = document.querySelector('.curTime');
            this.circle = document.querySelector('.circle');
            this.frontBg = document.querySelector('.frontBg');
            this.totalTime = document.querySelector('.totalTime');
        },
        renderAllTime: function (time) {
            this.durTime = time;    //秒数

            time = this.formatTime(time);

            this.totalTime.innerHTML = time;
        },
        formatTime: function (time) {
            time = Math.round(time);

            //266
            var m = Math.floor(time / 60);  //分钟
            var s = time % 60;  //秒钟

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            return m + ':' + s;
        },
        move: function (per) {    //移动进度条
            cancelAnimationFrame(this.frameId);
            var This = this;

            this.lastPercent = per === undefined ? this.lastPercent : per;

            this.startTime = new Date().getTime();    //按下时记录一个时间点

            function frame() {
                var curTime = new Date().getTime();
                var per = This.lastPercent + (curTime - This.startTime) / (This.durTime * 1000);   //走的百分比

                if (per <= 1) {
                    //这个条件成立说明当前歌曲还没有播放完
                    This.update(per);
                } else {
                    //走到这里说明歌曲已经播放了100%了，停止播放（关掉定时器）
                    cancelAnimationFrame(This.frameId);
                }

                This.frameId = requestAnimationFrame(frame);
            }
            frame();
        },
        update: function (per) {  //更新进度条（时间，走的百分比）
            // console.log('update');
            //更新左侧的时间
            var time = this.formatTime(per * this.durTime);
            this.curTime.innerHTML = time;

            //更新前背景的位置
            this.frontBg.style.width = per * 100 + '%';

            //更新圆点的位置
            var l = per * this.circle.parentNode.offsetWidth;
            this.circle.style.transform = 'translateX(' + l + 'px)';
        },
        stop: function () {    //停止进度条
            cancelAnimationFrame(this.frameId);

            var stopTime = new Date().getTime();

            this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);    //如果不用+=的话会漏掉一次已播放的时长百分比

        }
    }
    //实例化
    function instanceProgress() {
        return new Progress();
    }



    //拖拽
    function Drag(obj) {
        this.obj = obj;   //要拖拽的DOM元素
        this.startPointX = 0; //拖拽时按下的坐标的位置
        this.startLeft = 0;   //按下时已经走的距离
        this.percent = 0;     //拖拽的百分比
    }
    Drag.prototype = {
        init: function () {
            var This = this;
            this.obj.style.transform = 'translateX(0)';//初试位移值
            //拖拽开始
            this.obj.addEventListener('touchstart', function (ev) {
                //changedTouches    触发当前事件的手指列表
                This.startPointX = ev.changedTouches[0].pageX;//第0个，最先碰到的手指
                This.startLeft = parseFloat(this.style.transform.split('(')[1]);    //按下时元素离左边的距离
                // 字符串转数字
                // 封装库的意义：只告诉用户怎么用，不用知道里面是什么做的
                This.start && This.start(); //对外暴露拖拽开始的方法，按下后要做的事情就交给用户，它直接调用这个方法就可以了
                // 只有用户定义了这个方法，才这样调用：容错
            });
            //拖拽开始
            this.obj.addEventListener('touchmove', function (ev) {
                This.disPointX = ev.changedTouches[0].pageX - This.startPointX; //拖动的距离
                var l = This.startLeft + This.disPointX;    //小圆点要走的距离
                // 条件范围限制
                if (l < 0) {
                    l = 0;
                } else if (l > this.offsetParent.offsetWidth) {//小圆点只能在父级区域走
                    l = this.offsetParent.offsetWidth
                }

                this.style.transform = 'translateX(' + l + 'px)';

                //计算一下走的百分比
                This.percent = l / this.offsetParent.offsetWidth;
                This.move && This.move(This.percent);

                ev.preventDefault();
            });

            //拖拽结束
            this.obj.addEventListener('touchend', function () {
                This.end && This.end(This.percent);
            })

        }
    }
    function instanceDrag(obj) {
        return new Drag(obj)
    }

    root.progress = {
        pro: instanceProgress,
        drag: instanceDrag
    }

})(window.player || (window.player = {}));