var $imgCt = $('.rotation .img-ct'),
    $slide = $('.slide'),
    $btnPre = $('.rotation .btn-pre'),
    $btnNext = $('.rotation .btn-next');
var imgLen = $imgCt.children().length;  // 4
var key = 0;
var isAnimate = false;

var $firstImg = $imgCt.find('li').first(),
    $lastImg = $imgCt.find('li').last();

$imgCt.append($firstImg.clone());
$imgCt.prepend($lastImg.clone());

$imgCt.width((imgLen+2)*$firstImg.width());
$imgCt.css('left', 0-$firstImg.width());

// 点击左右图标轮播
$btnPre.on('click', function(e) {
  e.preventDefault();
  playPre();
  // console.log(key);
})
$btnNext.on('click', function(e) {
  e.preventDefault();
  playNext();
  // console.log(key);
})

// 点击下面的小横线轮播
$slide.find('li').on('click', function(e) {
  e.preventDefault();
  var clickIndex = $(this).index();
  if(clickIndex < key) {
    playPre(clickIndex);
  }else if(clickIndex > key){
    playNext(clickIndex);
  }else{
    return;
  }
})

function playPre(index) {
  if(isAnimate) {
    return;
  }
  isAnimate = true;
  switch (typeof index)
  {
    case 'undefined':
      $imgCt.animate({
        left: '+=600px', // 别写成'+= 600px'
      }, function() {
        key--;
        if(key < 0) {
          $imgCt.css('left', 0-(imgLen*$firstImg.width()));
          key = imgLen -1;
        }
        setSlide();
        isAnimate = false;
      })
      break;
    case 'number':
      clickSlide(index);
      break;
  }
}

function playNext(index) {
  if(isAnimate) {
    return;
  }
  isAnimate = true;
  switch (typeof index)
  {
    case 'undefined':
      $imgCt.animate({
        left: '-=600px',
      }, function() {
        key ++;
        if(key == imgLen) {
          $imgCt.css('left', '-600px');
          key = 0;
        }
        setSlide();
        isAnimate = false;
      })
      break;
    case 'number':
      clickSlide(index);
      break;
  }

  // setSlide();  动画是异步的，放在这里执行的时候，key还没有改变
  // isAnimate = false;  动画是异步的！！！！！等动画完成之后再置为false
}

function clickSlide(index) {
  var leftOffset= -(index+1)*$firstImg.width();
  $imgCt.animate({
    'left': leftOffset,
  }, function() {
    key = index;
    setSlide();
    isAnimate = false;
  })
}
function setSlide() {
  $('.rotation .slide').find('li').removeClass('active').eq(key).addClass('active');
  console.log('key:' + key);
}

// 代码写的不是很美，但是基本功能都实现了，有待改善。
