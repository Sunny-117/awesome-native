var $carousel = $('.carousel .img-ct').children(),
    $btnBefore = $('.btn-before'),
    $btnAfter = $('.btn-after'),
    $thubms = $('.thubms .sample').children(),
    thubmsNumber = $('.thubms .sample').children().length;
var currentKey = 0;
var playing = false;
play(0);
autoPlay();
$btnBefore.on('click', playBefore);
$btnAfter.on('click', playAfter);
$thubms.on('click', function() {
  var clickIndex = $(this).index();
  play(clickIndex);
})

function autoPlay() {
  var beginPlay = setInterval("playAfter()", 3000);
}

function playBefore() {
  play((thubmsNumber + currentKey - 1)%thubmsNumber);
}

function playAfter() {
  play((currentKey+1)%thubmsNumber);
}

function play(index) {
  if(!playing) {
    playing = true;
    $carousel.eq(currentKey).fadeOut(400);
    $carousel.eq(index).fadeIn(400, function() {
      playing = false; // 动画异步
    });
    currentKey = index;
    setSample(index, currentKey);
  }
}

function setSample(currentKey) {
  $thubms.removeClass('selected').eq(currentKey).addClass('selected');
}
