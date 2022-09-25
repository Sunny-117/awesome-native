var imgWidth = 220; // 每张图片的宽度
var divContainer = document.getElementById('container'); // 获取图片容器

// 该方法可以计算出几列
function cal() {
    var containerWidth = divContainer.clientWidth; // 容器的宽度
    // 列数 = 容器的宽度 / 图片的宽度
    var columns = Math.floor(containerWidth / imgWidth);
    // 还需要计算间隙
    // 总间隙 = 容器宽度 - （列数 * 图片宽度）
    var spaceNumber = columns + 1; // 间隙的数量
    var leftSpace = containerWidth - columns * imgWidth; // 计算剩余的空间
    var space = leftSpace / spaceNumber; // 每个间隙的空间
    return {
        space: space,
        columns: columns
    }
    // return {
    //     space,
    //     columns
    // }
}

// 获取最大值
function getMax(arr) {
    var max = arr[0]; // 假设第一项是最大
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
    // Math.max.apply(null, arr);
    // Math.max(...arr);
}

// 获取最小值
function getMin(arr) {
    var min = arr[0]; // 假设第一项是最小
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
    // Math.min.apply(null, arr);
    // Math.min(...arr);
}


// 该方法用于设置每一张图片的位置
function setPositions() {
    // 在设置图片位置之前，我们首先需要知道几列
    var info = cal(); // 通过该方法，我们就可以得到列数和间隙

    // 接下来，我们就需要创建数组，数组里面保存每一列的高度
    var arr = new Array(info.columns);
    arr.fill(0); // 数组里面的每一项填充为 0

    // 至此，我们的准备工作就做好了。
    // 接下来下一步，我们就需要一张一张的图片计算 top 和 left

    for (var i = 0; i < divContainer.children.length; i++) {
        // 获取当前的图片
        var img = divContainer.children[i];
        // 接下来我们要寻找数组里面的最小值
        var minTop = getMin(arr);
        img.style.top = minTop + "px";

        // 接下来有一个非常非常重要的事情，就是要改变当前列的高度
        // 首先找到这个最小数对应的列数
        var index = arr.indexOf(minTop);
        // 新的高度 = 图片的高度 + 间隙的高度
        arr[index] += img.height + info.space;
        // 至此，整个 top 值就已经确定了，还需要确定 left 值
        var left = (index + 1) * info.space + index * imgWidth;
        img.style.left = left + 'px';
    }

    // 因为图片是绝对定位，脱离了标准流，所以无法撑开盒子的高度
    // 那么我就手动来计算盒子的高度
    var max = getMax(arr);
    divContainer.style.height = max + 'px';
}

// 创建图片，并且对图片的位置进行归位
function createImgs() {
    for (var i = 0; i <= 40; i++) {
        var src = "../img/" + i + ".jpg"; // 生成图片的 src 路径
        // var src = `../img/${i}.jpg`; 通过 ES6 的字符串模板语法

        var img = document.createElement('img'); // 创建一个 img 元素
        img.src = src; // 设置图片的 src
        img.style.width = imgWidth; // 设置图片的宽度
        divContainer.appendChild(img); // 将该图片添加到容器里面

        // 接下来，我们要做的工作，就是排列每一张图片
        // 当每张图片加载完毕后，都要进行重新排列
        img.onload = setPositions;
    }
}

var timeId = null; // 一个计时器的 id
function bindEvent(){
    window.onresize = function(){
        // 该事件会在窗体大小发生改变的时候触发
        // 触发该事件，我们就需要重新对图片进行排列
        if(timeId){
            clearTimeout(timeId)
        }
        timeId = setTimeout(function(){
            setPositions();
        }, 500);
    }
}

// 程序主函数
function main() {
    // 1. 加入图片元素，进行一个初始化操作
    createImgs();

    // 2. 绑定事件
    bindEvent();
}

main();