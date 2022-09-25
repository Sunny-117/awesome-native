// $('body').height('1px');
var renderEnded = new Array(2);
$('.header > .w').load('../head/header.html', function(res) {
    var self = this;
})

$('.fs > .w').load('../fs/fs.html', function (res) {
    var self = this;
});

// var timer = setInterval(function () {
    
//     var isAllTrue = renderEnded.filter(function (item){
//         return item;
//     });
//     if (isAllTrue.length === renderEnded.length) {
//         clearInterval(timer);
//         // $('body').height('auto');
//     }
// }, 20)


$('.shortcut > .w').load('../shortcut/index.html', function () {
})

$('.seckill > .w').load('../seckill/index.html')