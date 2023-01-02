var openBtn = document.getElementsByClassName('openB')[0];
var closeBtn = document.getElementsByClassName('closeB')[0];
var left = document.getElementsByClassName('left')[0];
var right = document.getElementsByClassName('right')[0];
var back = document.getElementsByClassName('back')[0];


openBtn.addEventListener('click', function () {
    left.classList.add("open");
    setTimeout(function () {
        right.classList.add("open");
    }, 250);
    setTimeout(function () {
        back.classList.add("open");
    }, 350);
});

closeBtn.addEventListener('click',function () {
    setTimeout(function () {
        left.classList.remove("open");
    }, 250);
    right.classList.remove("open");
    setTimeout(function () {
        back.classList.remove("open");
    }, 600);
});
