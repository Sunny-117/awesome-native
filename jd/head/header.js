

var searchAjaxTimer = null;
$('#search-text').on('input', function () {
    var val = $(this).val();
    if (val) {
        clearTimeout(searchAjaxTimer);
        searchAjaxTimer = setTimeout(function () {
            $.ajax({
                url: 'https://suggest.taobao.com/sug',
                data: {
                    code: "utf-8",
                    q: "衣服",
                    callback: "searchResultsRender",
                },
                dataType: 'jsonp'
            });
        }, 500)

    }
})


function searchResultsRender(res) {
    var val = $('#search-text').val();
    var data = res.result;
    var str = data.reduce(function (prev, item) {
        // var matchStr = item[0].substr(item[0].indexOf(val), val.length);
        // 由于当前检索到的所有的数据都是以关键字开头  所以不需要再去查找关键字的位置了  
        var otherStr = item[0].slice(val.length);
        return prev + `<li>
        <a href="#">
            <span class="product-name">${val}<strong>${otherStr}</strong></span>
            <span class="product-number">约${parseInt(item[1])}个商品</span>
        </a>
    </li>`
    }, '');
    $('.search-results').html(str).show();
}

$('.search-results').on('click', 'li', function () {
    var val = $(this).find('.product-name').text();
    $('#search-text').val(val);
});

var hideResultTimer = null;
$('.search-box').mouseleave(function () {
    hideResultTimer = setTimeout(function () {
        $('.search-results').hide();
    }, 500)
}).mouseenter(function () {
    clearTimeout(hideResultTimer);
})

// 动图消失的条件：
// 1. 动图要动画完成之后
// 2. 鼠标移出当前区域
var startTime = 0;
var hideLogoTimer = null;
$('.logo').hover(function () {
    clearTimeout(hideLogoTimer);
    startTime = new Date().getTime();
    if (!$('.logo_hover_lk').hasClass('logo_animation_palying')) {
        $('.logo_hover_lk').addClass('logo_animation_palying')
            .css({
                backgroundImage: 'url(https://img1.360buyimg.com/da/jfs/t1/27184/40/11459/180833/5c90a88eEb8918da7/c3b923b1b7643da4.gif?v=' + Math.random() + ')'
            })
            .fadeIn();
    }
}, function () {
    var nowTime = new Date().getTime();
    if (nowTime - startTime > 4000) {
        $('.logo_hover_lk').removeClass('logo_animation_palying').fadeOut();
    } else {
        hideLogoTimer = setTimeout(function () {
            $('.logo_hover_lk').removeClass('logo_animation_palying').fadeOut();
        }, startTime + 4000 - nowTime)
    }
});



// 请求热门关键词数据
$.ajax({
    url: '/hotwords',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        renderHotWords(res.result);
    }
});

// 渲染热门关键词
function renderHotWords(data) {
    var str = data.reduce(function (prev, item, index) {
        return prev + `<a href="${item.href}" class="${index === 0 ? 'red' : ''}">${item.word}</a>`
    }, '');
    $('.hotwords').html(str);
}
// 每隔一秒钟改变热门关键词的第一个词
setInterval(function () {
    $.ajax({
        url: '/recommendWords',
        dataType: 'json',
        success: function (res) {
            $('.hotwords > a.red').text(res.text);
        }
    })
}, 3000);

// navitems 数据
$.ajax({
    url: '/navitems',
    dataType: 'json',
    success: function (res) {
        renderNavitems(res.result);
    }
});
// 渲染navitems区域
function renderNavitems(data) {
    var str = data.reduce(function (prev, item, index) {
        return prev + `<a href="${item.link}" class="${index < 2 ? 'red' : ''}">${item.name}</a>`
    }, '');
    $('.navitems').html(str);
}


