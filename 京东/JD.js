// 广告栏js
$('.headad>.closebutton').on('click',function(){
    $('.headad').addClass('fadead')
    var hidden = function(){
        setTimeout(function(){
            $('.headad').addClass('hiddenad')
        },500);}
    hidden()
})

// 大图自动轮播js
$(function(){
    $("#slides").slidesjs({
        width: 730,
        height: 454,
        navigation: {
            active: false,
            effect: "fade"
        },
        pagination: {
            active: true,
            effect: "fade"
        },
        play: {
            active: true,
            effect: "fade",
            interval: 4000,
            auto: true,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        }
    });
});
//newsicon js
$('.hasframe').on('mouseenter',function(e){
    popout(e);
})
$('.closeframe').on('click',function(e){
    $('.hasframe').off('mouseenter');
    $('.iframe-recharge').stop(true,true).animate({top: '209px'},500,function(){
        setTimeout(function(){
            $('.hasframe').on('mouseenter',function(e){
                popout(e)
            })
        },0);
    })
})
$('.iframe-button').on('mouseenter',function(e){
    $('.iframe-content.active,.iframe-button.active').removeClass('active')
    $(this).addClass('active')
    $(this).next('.iframe-content').addClass('active')
})
function popout(e){
    var $current = $(e.currentTarget)
    var index = $current.attr('data-index')
    var indexNumber = +index
    $('.iframe-content.active,.iframe-button.active').removeClass('active')
    $('.iframe-button').eq(indexNumber).addClass('active')
    $('.iframe-content').eq(indexNumber).addClass('active')
    $('.iframe-recharge').animate({top: '0px'},500,function(){})
}
//小图手动轮播js
$(function(){
    $(".onsaleslides").slidesjs({
        width: 1000,
        height: 164,
        pagination: false,
        navigation: {
            active: false,
            effect: "slide"
        }
    });
});
//回到顶部js
$('.gototop').click(function(){
    $('body').animate({scrollTop:0});
})
