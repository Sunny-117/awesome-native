(function () {
  function TurnPage(options, wrap) {
    this.total = options.total || 1;
    this.current = options.current || 1;
    this.changePage = options.change || function () { };
    this.wrap = wrap;
  }
  TurnPage.prototype.init = function () {
    // 1. 创建结构
    this.fillHTML();
    // 2. 功能
    this.bindEvent()
  };
  // 填充结构
  TurnPage.prototype.fillHTML = function () {
    var pageWrapper = $('<ul class="my-page"></ul>');
    // 上一页
    if (this.current > 1) {
      $('<li class="my-page-prev">上一页</li>').appendTo(pageWrapper);
    }
    // 第一页
    $('<li class="my-page-num">1</li>')
      .appendTo(pageWrapper)
      .addClass(this.current == 1 ? "my-page-current" : "");

    // 省略号
    // 当前页-2
    if (this.current - 2 - 1 > 1) {//还有页码，加省略号
      $("<span>...</span>").appendTo(pageWrapper);
    }
    // 中间5页
    for (var i = this.current - 2; i <= this.current + 2; i++) {
      if (i > 1 && i < this.total) {
        $('<li class="my-page-num"></li>')
          .text(i)
          .appendTo(pageWrapper)
          .addClass(this.current == i ? "my-page-current" : "");
      }
    }

    // 省略号
    if (this.total - (this.current + 2) > 1) {
      $("<span>...</span>").appendTo(pageWrapper);
    }
    // 最后一页
    $('<li class="my-page-num"></li>')
      .text(this.total)
      .appendTo(pageWrapper)
      .addClass(this.current == this.total ? "my-page-current" : "");
    //  下一页
    if (this.current < this.total) {
      $('<li class="my-page-next">下一页</li>').appendTo(pageWrapper);
    }

    this.wrap.html(pageWrapper);
  };

  TurnPage.prototype.bindEvent = function () {
    var self = this;
    $(this.wrap).find('.my-page-prev').click(function () {
      self.current--;
      self.changePage(self.current);
    }).end().find('.my-page-next').click(function () {//end回退
      self.current++;
      self.changePage(self.current);
    }).end().find('.my-page-num').click(function () {
      var page = parseInt($(this).text());
      self.current = page;
      self.changePage(self.current);
    })

    console.log($(this.wrap).find('.my-page-prev').end().find('.my-page-next'))
  }

  $.fn.extend({
    page: function (options) {
      var p = new TurnPage(options, this);
      p.init();
    },
  });
})();
