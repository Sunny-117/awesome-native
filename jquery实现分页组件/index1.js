(function ($) {
    function init(dom, args) {
        if (args.current <= args.pageCount) {
            fillHtml(dom, args);
            bindEvent(dom, args);
        } else {
            alert('请输入正确页数')
        }
    }
    function fillHtml(dom, args) {
        dom.empty();
        //上一页
        if (args.current > 1) {
            dom.append('<a href = "#" class="prevPage">上一页</a>');
        } else {
            dom.remove('.prevPage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //中间页数

        if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
            dom.append('<a href = "#" class="tcdNumber">' + 1 + '</a>');
        }

        if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
            dom.append('<span>...</span>');
        }

        var start = args.current - 2;
        var end = args.current + 2;

        for (; start <= end; start++) {
            if (start <= args.pageCount && start >= 1) {
                if (start != args.current) {
                    dom.append('<a href = "#" class="tcdNumber">' + start + '</a>');
                } else {
                    dom.append('<span class="current">' + start + '</span>');
                }
            }
        }

        if (args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }

        if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
            dom.append('<a href="#" class="tcdNumber">' + args.pageCount + '</a>');

        }

        //下一页
        if (args.current < args.pageCount) {
            dom.append('<a href = "#" class="nextPage">下一页</a>');
        } else {
            dom.remove('.nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }
    }
    function bindEvent(obj, args) {
        //点击页码
        obj.on('click', '.tcdNumber', function () {
            var current = parseInt($(this).text());
            changePage(obj,args,current);
        })
        //上一页
        // a.prevPage   规定只能添加到指定的子元素上的事件处理程序
        obj.on('click', '.prevPage', function () {
            var current = parseInt(obj.children('.current').text());
            changePage(obj,args,current-1);            
        })
        //下一页
        obj.on('click', '.nextPage', function () {
            var current = parseInt(obj.children('.current').text());
            changePage(obj,args,current + 1);
        })
    }
    function changePage(dom, args,page) {
        fillHtml(dom, { 'current': page, 'pageCount': args.pageCount });
        if (typeof (args.backFn == "function")) {
            args.backFn(page);
        }
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 5,
            current: 2,
            backFn: function () { }
        }, options);
        init(this, args)
    }
})(jQuery)