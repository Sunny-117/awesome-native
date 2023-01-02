window.onload = function() {
    // 设定变量
    var start = document.getElementById('start')
    var scroll = document.getElementById('scroll')
    var time = document.getElementById('time')

    var g = 1; //Gravity 重力
    var timenum = 0; //时间的计数
    var num = 0; //成绩的计数
    var gameover = false; //游戏是否结束的标签
    var timeandtime = null; //一秒一秒的记录值
    var letters = null; //还存在网页上的所有div

    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //显示掉落的字母集

    //基础页面对象封装
    var eventUtil = {
        // 获取事件参数对象
        getEvent: function(event) {
            return event || window.event;
        },
        getPageX: function(event) {
            return event.pageX || event.clientX + document.documentElement.scrollLeft;
        },
        getPageY: function(event) {
            return event.pageY || event.clientY + document.documentElement.scrollTop;
        },
        // 清除冒泡
        stopPropagation: function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        getTarget: function(event) {
            return event.getTarget || event.srcElement;
        }
    }

    //按钮事件
    start.onclick = function(event) {
        // 字母内容的出现并下落
        for (var i = 0; i < 26; i++) {
            // 生成字母,letter是类
            new letter() //对象
        }
        //接受键盘的点击，触发对于字母

        // 将页面中所有的div元素全部存放到letters
        letters = document.body.children; //letters[0] game,不要用

        // 添加键盘事件
        document.onkeydown = function(e) {
                // 得到当前按键源的对象
                var evt = eventUtil.getEvent(e)
                    //将按下的字母键的对应码转换成为大写字母
                    //console.log(evt.keyCode) 返回的是ascii
                var keyChar = String.fromCharCode(evt.keyCode);
                console.log(keyChar)
                    // 循环比对这个键是否存在网页上
                for (var i = 1; i < letters.length; i++) {
                    if (keyChar === letters[i].innerHTML) {
                        // 页面中找到了对应下落的字母
                        // 添加num 
                        num++;
                        scroll.innerHTML = num;
                        // 把当前页面的中的div元素清除掉
                        document.body.removeChild(letters[i]);
                    }
                }
            }
            //时间计数
        timeandtime = setInterval(function() {
            timenum += 1;
            // 如果整个页面中的长度只有1个元素时，弹框，表示游戏结束，game
            if (letters.length == 1) {
                gameover = true;
                clearInterval(timeandtime)
                    // 弹框
                alert("用时" + timenum + "秒，再接再厉！突破10秒");
            } else {
                // 把变量的显示到界面
                time.innerHTML = timenum;
            }
        }, 1000)
    }


    // 封装函数（以对象的方式进行操作）
    function letter() {
        this.x = Math.random() * 900 + 100 //设置位置在100-1000之间
        this.y = 0;
        this.speedY = Math.random() * 4 + 1; //速度随机值 1-5之间
        this.value = str[parseInt(Math.random() * 26)]; //随机在26个字母中生成一个字母

        //手动生成一个元素
        var letDiv = document.createElement("div");
        letDiv.className = "letter"
        letDiv.style.top = this.y + "px";
        letDiv.style.left = this.x + "px";
        letDiv.innerHTML = this.value;
        // 追加到页面body后
        document.body.appendChild(letDiv);

        // 字母往下掉(原理是不断改变当前div的y坐标)
        // 将this的指向保留出来
        var that = this;
        this.timer = setInterval(function() {
            that.y = that.y + that.speedY; //向下移动的关键（速度）
            if (that.y >= client().height - letDiv.offsetHeight) { //当前页面的可视区域-字母div的高度
                //字母已经到底了
                that.y = 0; //y归零，从上重新开始
                that.x = Math.random() * 900 + 100
            }
            // 判断游戏是否结束
            if (!gameover) {
                // 游戏继续,字母往下移动
                letDiv.style.left = that.x + "px";
                letDiv.style.top = that.y + "px";
            } else {
                // 关闭setInterval
                clearInterval(that.timer);
            }
        }, 15)

    }

    // 获取可视窗口的宽度和高度，兼容性
    function client() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    }

}