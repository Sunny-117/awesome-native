// 封装一个 DOM 查询方法

function $(selector) {
    return document.querySelector(selector);
}

// 接下来我们来获取一下 DOM 节点
var imgBox = $('.imgBox'); // 图片容器
var imgBlock = $('.imgBlock'); // 可以拖动的图片
var imgGap = $('.imgGap'); // 图片缺口
var title = $('.imgContainer h3'); // 获取标题
var slider = $('.slider'); // 滑块条
var btn = $('#btn'); // 拖动的滑块
var span = $('.slider span'); // 滑块条的文字

// 初始化函数
function init() {
    // 1. 随机生成背景图片
    var imgArr = ['t1.png', 't2.png', 't3.png', 't4.png', 't5.png']; // 存储所有图片的数组
    // 每次初始化的时候，从里面随机挑选一张图片
    var randomImg = Math.floor(Math.random() * imgArr.length);

    // 下面使用到了 ES6 的字符串模板
    // 在字符串模板中，可以解析变量

    // var name = ‘xiejie’;
    // console.log('Hello,' + name);
    // console.log(`Hello,${name}`);

    // 图片容器以及拖动的图片块设置对应的背景图
    imgBox.style.backgroundImage = `url('../img/${imgArr[randomImg]}')`;
    imgBlock.style.backgroundImage = `url('../img/${imgArr[randomImg]}')`;

    // 2. 计算拖动图块和空缺图块的位置

    // 空缺图块可以设置的最大 top 值 = 盒子容器的高度 - 空缺图块的高度
    var heightRange = imgBox.offsetHeight - imgBlock.offsetHeight;
    // 空缺图块可以设置的最大 left 值 = 盒子容器的宽度的一半 - 空缺图块的宽度
    var widthRange = imgBox.offsetWidth / 2 - imgBlock.offsetWidth;

    // 生成随机的 left 和 top 值
    var top = Math.random() * heightRange;
    var left = Math.random() * widthRange + imgBox.offsetWidth / 2;

    // 设置图片缺口的 left 和 top 值
    imgGap.style.left = left + 'px';
    imgGap.style.top = top + 'px';

    // 设置拖动图片的 left 和 top 值
    imgBlock.style.top = top + 'px';
    imgBlock.style.left = '0px';
    imgBlock.style.backgroundPositionY = -top + 'px';
    imgBlock.style.backgroundPositionX = -left + 'px';

    // 初始化拖动图片块、空缺图块以及下面滑块的一些设置
    imgGap.style.opacity = 1; // 空缺图块可见
    imgBlock.style.opacity = 0; // 拖动图片块刚开始时不可见
    btn.style.left = '-2px'; // 滑块位置初始化
    span.style.opacity = 1; // 显示滑块区域的文字
    // 初始化 title
    title.style.color = 'black';
    title.innerHTML = '请完成图片验证'

    // 3. 绑定对应的事件
    btn.onmousedown = function (e) {

        // 设置拖动图块
        imgBlock.style.opacity = 1; // 让拖动图块可见
        imgBlock.style.transition = 'none'; // 关闭拖动图片块的过渡效果，让整个拖动更加的丝滑

        // 设置标题
        title.innerHTML = '拖动图片完成验证';
        title.style.color = 'black';

        // 设置滑动条的文字不可见
        span.style.opacity = 0;

        // 将按钮的过渡也关闭掉
        btn.style.transition = 'none'; // 关闭按钮的过渡效果，让整个拖动更加的丝滑

        // 为整个滑动条添加鼠标移动效果
        slider.onmousemove = function (ev) {

            // 接下来就会有一个很关键的点，我们需要得到用户移动鼠标时的最新的 left 值

            var newLeft = ev.clientX - slider.offsetLeft - e.offsetX;

            // 我们还需要进行一个边界判断
            if (newLeft < -2) {
                newLeft = -2
            }
            if (newLeft > (imgBox.offsetWidth - imgBlock.offsetWidth)) {
                newLeft = imgBox.offsetWidth - imgBlock.offsetWidth;
            }

            imgBlock.style.left = newLeft + 'px';
            btn.style.left = newLeft + 'px';
        }

        // 设置鼠标抬起事件
        document.onmouseup = function () {
            // 当我们的鼠标抬起的时候，进行验证

            var diffLeft = imgGap.offsetLeft - imgBlock.offsetLeft; // 获取两个图块的 left 差值

            if (diffLeft < 5 && diffLeft > -5) {
                // 验证成功

                // 设置两个图块隐藏
                imgBlock.style.opacity = 0;
                imgGap.style.opacity = 0;

                // 设置 title
                title.innerHTML = '验证成功';
                title.style.color = 'red';

                // 删除所有的事件
                slider.onmousemove = btn.onmousedown = document.onmouseup = null;

            } else {
                // 验证失败

                // 设置拖动图块和按钮的 left 值
                imgBlock.style.left = '0px';
                btn.style.left = '-2px';

                // 还需要添加上过渡
                imgBlock.style.transition = 'all .5s';
                btn.style.transition = 'all .5s';

                slider.onmousemove = document.onmouseup = null;

                // 设置 title
                title.innerHTML = '验证失败';
                title.style.color = 'green';

                // 显示滑块区域的文字
                span.style.opacity = 1;
            }
        }
    }
}

init();

$('.changeImg').onclick = init;