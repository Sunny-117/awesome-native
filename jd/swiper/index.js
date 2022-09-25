
(function () {
    // 构造轮播图对象的构造函数  主要用来存储轮播图的信息
    function Swiper (options, wrap) {
        // 显示区域的大小
        this.width = options.width || 300;
        this.height = options.height || 250;
        // 轮播的内容
        this.list = options.list || [];
        // 自动轮播时间  ms
        this.times = options.times || 5000;
        // 是否显示小圆点  默认显示   可传递  0/1   ''/'ssss'  true/false   
        this.showSpots = (options.showSpots === undefined || options.showSpots === null) ? true : options.showSpots;
        // 轮播效果  animate 代表从左到右轮播   fade代表淡入淡出效果
        this.type = options.type || 'fade';
        // 是否自动轮播
        this.isAuto =  (options.isAuto === undefined || options.isAuto === null) ? true : options.isAuto;
        // 左右按钮的状态
        this.changeBtnStatus = options.changeBtnStatus || 'always';
        // 小圆点的位置
        this.spotsPosition = options.spotsPosition || 'left';
        // 轮播图的个数
        this.len = this.list.length;
        // 添加轮播图的位置
        this.wrap = wrap;
        // 当前显示的图片的索引值
        this.nowIndex = 0;
        // 当前是否有动画正在进行中
        this.isPlaying = false;
        // 当前轮播图最外层的结构
        this.swiperWrapper = null;
        // 自动轮播计时器
        this.timer = null;

    }
    // 初始化轮播图
    Swiper.prototype.init = function () {
        // 创建轮播图结构
        var dom = this.createDom();
        this.wrap.append(dom);
        // 初始化样式
        this.initStyle();
        // 添加轮播功能
        this.bindEvent();
        if (this.isAuto) {
            this.autoChange();
        }
    }
    // 创建轮播图结构
    Swiper.prototype.createDom = function () {
        var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
        var swiperContent = $('<ul class="my-swiper-content"></ul>');
        var swiperSpots = $('<div class="my-swiper-spots"></div>')
        // 插入轮播的内容
        for (var i = 0; i < this.len; i ++) {
            $('<li class="my-swiper-item"></li>').html(this.list[i])
                                                 .appendTo(swiperContent);
            $('<span></span>').appendTo(swiperSpots);
        }
        if (this.type === 'animate') {
            $('<li class="my-swiper-item"></li>').html($(this.list[0]).clone())
                                                 .appendTo(swiperContent);
        }

        var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&#xe628;</div>')
        var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&#xe625;</div>')
        swiperWrapper.append(swiperContent)
                    .append(leftBtn)
                    .append(rightBtn)
                    .append(swiperSpots)
                    .addClass('my-swiper-' + this.type);

        this.swiperWrapper = swiperWrapper;
        return swiperWrapper;
    }
    Swiper.prototype.initStyle = function () {
        $('.my-swiper-wrapper', this.wrap).css({
            width: this.width,
            height: this.height
        }).find('.my-swiper-content').css({
            width: this.type === 'animate' ? this.width * (this.len + 1) : this.width,
            height: this.height
        }).find('.my-swiper-item').css({
            width: this.width,
            height: this.height
        });
        $(this.wrap).find('.my-swiper-wrapper')
                    .find('.my-swiper-spots').css({
                        textAlign: this.spotsPosition
                    })
                    .find('span').eq(this.nowIndex).addClass('my-swiper-current');
        if (!this.showSpots) {
            $(this.wrap).find('.my-swiper-wrapper')
                    .find('.my-swiper-spots').hide();
        }
        switch(this.changeBtnStatus) {
            case 'hide':
                $(this.wrap).find('.my-swiper-wrapper')
                            .find('.my-swiper-btn').hide();
                break;
            case 'hover':
                $(this.wrap).find('.my-swiper-wrapper')
                            .hover(function () {
                                $(this).find('.my-swiper-btn').fadeIn()
                            }, function () {
                                $(this).find('.my-swiper-btn').fadeOut()
                            }).find('.my-swiper-btn').hide();
                
                break;
            default:
                break;
        }
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        this.swiperWrapper
                        // 鼠标移入当前轮播图区域的时候 不需要自动轮播 
                        .mouseenter(function () {
                            clearInterval(self.timer);
                        })
                        .mouseleave(function () {
                            if (self.isAuto) {
                                self.autoChange();
                            }
                        })
                        .find('.my-swiper-lbtn')
                            .click(function () {
                                // 判断当前是否有动画正在进行中  有的话不进行任何操作  没有的话进入切换效果
                                if (self.isPlaying) {
                                    return false;
                                } 
                                self.isPlaying = true;
                                // 判断当前显示的图片是不是索引值为0的图片如果是那么下一次显示的是最后一张图片
                                if (self.nowIndex === 0) {
                                    // 如果当前是从左到右轮播 为了实现无缝衔接的效果 
                                    // 需要让轮播区域瞬间变化到后面的第一张图片的位置
                                    if (self.type === 'animate') {
                                        $(self.wrap).find('.my-swiper-wrapper')
                                        .find('.my-swiper-content')
                                            .css({
                                                left: -self.len * self.width
                                            })
                                    }
                                    self.nowIndex = self.len - 1;
                                } else {
                                    self.nowIndex --;
                                }
                                self.change();
                            })
                            .end()
                        .find('.my-swiper-rbtn')
                                .click(function () {
                                    if (self.isPlaying) {
                                        return false;
                                    } 
                                    self.isPlaying = true;
                                    // 判断当前显示的图片是不是索引值为0的图片如果是那么下一次显示的是最后一张图片
                                    if (self.type === 'animate') {
                                        if (self.nowIndex === self.len) {
                                            // 如果当前显示的是后面的第一张图片 那么轮播图瞬间变化到前面第一张图片的位置  继续轮播
                                            $(self.wrap).find('.my-swiper-wrapper')
                                                        .find('.my-swiper-content')
                                                            .css({
                                                                left: 0
                                                            })
                                            self.nowIndex = 1;
                                        } else {
                                            self.nowIndex ++;
                                        }
                                    } else if (self.type === 'fade'){
                                        // 如果当前是淡入淡出的效果  那么判断当前显示的是不是最后一张图片  是的话 下一次显示第0号图片
                                        if (self.nowIndex === self.len - 1) {
                                            self.nowIndex = 0;
                                        } else {
                                            self.nowIndex ++;
                                        }
                                    }
                                    
                                    self.change();
                                })
                                .end()
                        .find('.my-swiper-spots > span')
                                .mouseenter(function () {
                                    if (self.isPlaying) {
                                        return false;
                                    } 
                                    self.isPlaying = true;
                                    var index = $(this).index();
                                    self.nowIndex = index;
                                    self.change();
                                })
                            
    }
    // 切换动画效果
    Swiper.prototype.change = function () {
        var self = this;
        if (this.type === 'fade') {
            this.swiperWrapper
                    .find('.my-swiper-item')
                    .eq(this.nowIndex).fadeIn(function () {
                        self.isPlaying = false;
                    }).siblings().fadeOut();
        } else if (this.type === 'animate') {
            this.swiperWrapper
                        .find('.my-swiper-content')
                        .animate({
                            left: - this.nowIndex * this.width
                        }, function () {
                            self.isPlaying = false;
                        });
        }
        this.swiperWrapper.find('.my-swiper-spots')
                                .find('span').eq(this.nowIndex % this.len).addClass('my-swiper-current')
                                            .siblings().removeClass('my-swiper-current');

    }
    // 自动轮播效果
    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.swiperWrapper.find('.my-swiper-rbtn').click();
        }, this.times)
    }

    $.fn.extend({
        swiper: function (options) {
            var obj = new Swiper(options, this);
            obj.init();
        }
    })
} ())

