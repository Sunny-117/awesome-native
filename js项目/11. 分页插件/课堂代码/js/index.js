// 分析：作为一个创建分页组件的插件（函数）
// 需要一些必要的信息：
// 1. 当前页码 2. 总页码数 3. 中间多少个数字  4. 分页创建好后放入哪个容器

/*
* page:当前页码
* pageNumber:总页数
* mostNumber: 中间多少个数字
* container: 分页创建好后放入哪个容器
*/

function createPager(page, pageNumber, mostNumber, container) {
    // 在做后续生成 pager 结构之前，我们需要将上一次的内容先清空
    container.innerHTML = ""

    // 1. 创建 pager 容器，并且挂上 pager 这个样式类
    var divPager = document.createElement('div');
    divPager.className = 'pager';

    /*
     * className:要挂的样式类
     * text:中间文本
     * newPage: 点击后跳转到哪一页
     */
    function createAnchor(className, text, newPage) {
        var a = document.createElement('a');
        a.className = className; // 挂上对应的样式类
        a.innerText = text; // 设置中间的文本
        divPager.appendChild(a);
        // 点击这个 a 标签跳转到第几页
        a.onclick = function () {
            // 分析：所谓跳转，其实就是重新调用 createPager
            // 但是，你要注意，有几种情况是不能够跳转
            if (newPage < 1 || newPage > pageNumber || newPage === page) {
                return;
            }
            // 没有进入到上面的 if，说明是可以跳转的
            createPager(newPage, pageNumber, mostNumber, container);
            // 分页跳转之后，还会做其他的事情
            // 发送请求获取数据....
        }
    }

    // 2. 我们要开始创建分页
    // 通过分析：我们发现创建这个分页可以分为 4 个部分
    // （1）首页和上一页
    if (page === 1) {
        // 说明当前是第一页
        // 由于考虑到创建具体分页项目的逻辑要用的地方很多，所以我也将其封装成一个函数
        // 该函数需要知道的信息：1. 要不要挂样式类 2. 中间的文本写什么 3. 点击后跳转到第几页
        createAnchor('disabled', '首页', 1)
        createAnchor('disabled', '上一页', page - 1)
    } else {
        createAnchor('', '首页', 1)
        createAnchor('', '上一页', page - 1)
    }

    // （2）中间的数字
    // 首先我们需要计算一头一尾
    var min = Math.floor(page - mostNumber / 2);
    if (min < 1) {
        min = 1;
    }

    var max = min + mostNumber - 1;
    if (max > pageNumber) {
        max = pageNumber;
    }

    // 接下来我们就需要通过循环来生成分页项目
    for (var i = min; i <= max; i++) {
        if (i === page) {
            // 进入此 if，说明是当前页，需要挂上 active 类
            createAnchor("active", i, i);
        } else {
            createAnchor("", i, i)
        }
    }


    // （3）下一页和尾页
    if (page === pageNumber) {
        // 说明当前是第一页
        // 由于考虑到创建具体分页项目的逻辑要用的地方很多，所以我也将其封装成一个函数
        // 该函数需要知道的信息：1. 要不要挂样式类 2. 中间的文本写什么 3. 点击后跳转到第几页
        createAnchor('disabled', '下一页', page + 1)
        createAnchor('disabled', '尾页', pageNumber)
    } else {
        createAnchor('', '下一页', page + 1)
        createAnchor('', '尾页', pageNumber)
    }
    // （4）当前页码
    var span = document.createElement('span');
    span.innerText = page + "/" + pageNumber;
    divPager.appendChild(span);

    // 以后将生成好的整个分页组件挂到容器上面即可
    container.appendChild(divPager);
}