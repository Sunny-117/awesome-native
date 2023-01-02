var maxImgIndex = 15; // 最大的索引值
var curTargetIndex = null; // 当前的索引
var isGameOver = false; // 游戏是否结束

// 封装两个 DOM 查询方法

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// 获取 DOM 节点

var panel = $('.panel'); // 获取整个魔盘
var initImg = $('#initImg'); // 获取魔盘的圆心
var resultImg = $('#resultImg'); // 获取结果图片
var dictionary = $('.dictionary'); // 获取右侧的字典表

// Math.floor(Math.random() * 可能性数 + 第一个可能值)
// 1-10
// Math.floor(Math.random() * 10 + 1)

// 返回从 min 到 max 的随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 初始化右侧的字典表

function init() {
    // 需要随机选择一张 9 的倍数显示什么图片
    curTargetIndex = getRandom(0, maxImgIndex); // 得到一个从 0 到 15 的随机数

    // 首先清空上一次的字典表结果
    dictionary.innerHTML = '';

    // 生成这一次的字典表

    // 一共是 100 张图片，如果是 9 的倍数，那么图片的索引应该为 curTargetIndex
    // 否则的话就从 0～15 之间随便选择一张

    for(var i=0; i<100; i++){
        var imgIndex = null; // 用于存储图片的索引值
        if(i % 9 === 0){
            // 说明是 9 的倍数
            imgIndex = curTargetIndex;
        } else {
            // 说明不是 9 的倍数，随便摇一张即可
            imgIndex = getRandom(0, maxImgIndex);
        }

        // 这里要使用到字符串模板
        // var name = 'xiejie';
        // console.log("Hello," + name);
        // console.log(`Hello,${name}`);

        dictionary.innerHTML += `
            <div class="item">
                <span class="number">${i}</span>
                <span class="value">
                    <img src="../images/values/${imgIndex}.png"/>
                </span>
            </div>
        `;
    }

}

init();


// 接下来，我们需要绑定点击事件
panel.onclick = function(e){
    if(isGameOver){
        // 说明游戏结束，需要询问玩家是否再玩一遍，如果要，我就做一些初始化的工作
        if(window.confirm('是否再玩一次？')){
            init(); // 重新初始化魔盘
            initImg.style.opacity = 1; // 显示魔盘圆心
            resultImg.style.opacity = 0; // 隐藏结果图片
            isGameOver = false;
            // 接下来一步很关键，去除 transition 和 transform 都去除
            // 并且还要删除 transitionend 事件，否则下一次游戏会直接触发 transitionend 事件
            e.currentTarget.setAttribute('style', '');
            panel.removeEventListener('transitionend', transitionendHandle)
        }
    } else {
        // 如果进入到 else，我们就需要将结果给玩家显示出来
        // 显示结果其实很简单，就是将魔盘圆心隐藏，将结果图片显示出来
        // 但是我们需要旋转 1800 deg，有一点仪式感
        e.currentTarget.style.transition = 'all 2s'
        e.currentTarget.style.transform = 'rotate(1800deg)';
        // 旋转完成后，我们就需要将魔盘圆心隐藏，将结果图片显示出来
        // 通过 transitionend 事件，我们就可以知道旋转完了没有
        panel.addEventListener('transitionend', transitionendHandle);
    }
}

// 旋转完成后，要做的事情
function transitionendHandle(){
    initImg.style.opacity = 0; // 将魔盘圆心修改为透明
    resultImg.src = `../images/values/${curTargetIndex}.png`; // 设置结果图片
    resultImg.style.opacity = 1; // 将结果图片显示出来
    isGameOver = true;
}