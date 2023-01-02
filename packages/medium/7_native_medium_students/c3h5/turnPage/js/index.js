(function () {

    function TurnPage(options, wrap) {
        // 翻页组件插入的位置
        this.wrap = wrap;
        // 当前页码
        this.nowPage = options.nowPage;
        // 总页数
        this.allPage = options.allPage;
        // 切换页码的回调函数
        this.callback = options.callback;
        // 插件初始化
        console.log(options)
        this.init = function () {
            this.fillHTML();
            this.initCss();
            this.bindEvent();
        }
    }
    // 翻页的页面结构
    TurnPage.prototype.fillHTML = function () {
        // 清空dom结构
        $(this.wrap).empty();
        // 翻页组件区
        var oUl = $('<ul class="turn-page"></ul>');
        // 添加上一页按钮
        if (this.nowPage > 1) {
            $('<li class="prev">上一页</li>').appendTo(oUl);
        }
        // 添加第一页按钮
        $('<li class="num">1</li>').appendTo(oUl).addClass(this.nowPage == 1 ? 'current-page' : '');
        // 添加前面的省略号
        if (this.nowPage > 4) {
            $('<span>...</span>').appendTo(oUl);
        }
        // 添加中间5页
        for (var i = this.nowPage - 2; i <= this.nowPage + 2; i++) {
            if (i > 1 && i < this.allPage && i == this.nowPage) {
                $('<li class="num current-page">' + i + '</li>').appendTo(oUl);
            } else if (i > 1 && i < this.allPage) {
                $('<li class="num">' + i + '</li>').appendTo(oUl);
            }
        }
        // 添加后面的省略号
        if (this.nowPage + 2 < this.allPage - 1) {
            $('<span>...</span>').appendTo(oUl);
        }
        // 添加最后一页
        if (this.allPage > 1) {
            $('<li class="num">' + this.allPage + '</li>').appendTo(oUl).addClass(this.nowPage == this.allPage ? 'current-page' : '');;
        }

        // 添加下一页按钮
        if (this.nowPage < this.allPage) {
            $('<li class="next">下一页</li>').appendTo(oUl);
        }
        // 将翻页结构插入到页面当中
        $(this.wrap).append(oUl);
    }
    // 添加样式
    TurnPage.prototype.initCss = function () {
        $('*', this.wrap).css({
            listStyle: 'none',
            padding: 0,
            margin: 0,
        });
        $(this.wrap).find('.turn-page').css({
            overflow: 'hidden',
        }).find('li').css({
            float: 'left',
            padding: '5px 10px',
            border: '1px solid #ddd',
            margin: 5,
            cursor: 'pointer',
        }).end().find('span').css({
            float: 'left',
        }).end().find('.current-page').css({
            backgroundColor: '#428bca',
            color: '#fff'
        })
    }
    TurnPage.prototype.bindEvent = function () {
        var self = this;
        // 点击页码事件
        $('.turn-page', this.wrap).on('click', '.num', function () {
            var page = $(this).text();
            self.nowPage = Number(page);
            self.changePage();
            // 点击上一页事件
        }).on('click', '.prev', function () {
            self.nowPage--;
            self.changePage();
            // 点击下一页事件
        }).on('click', '.next', function () {
            self.nowPage++;
            self.changePage();

        })
    }
    // 切换页码的回调函数
    TurnPage.prototype.changePage = function () {
        // 重新渲染翻页
        this.init();
        this.callback(this.nowPage);
    }
    $.fn.extend({
        turnpage: function (options) {
            var obj = new TurnPage(options, this);
            obj.init();
        }
    })
}())