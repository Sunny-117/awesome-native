var per = 0;
var bar = document.getElementsByClassName('bar')[0];
var loadingPage = document.getElementsByClassName('pageLoading')[0];
var timer = setInterval(function(){
	// 定时器
    bar.style.width = per + '%';
    // $('.bar').css('width',per + '%');
    per += 1;
    if(per > 100){
    	// $('.pageLoading').addClass('complate');
        loadingPage.classList.add('complate');
        setTimeout(function(){
        $('.monsterText').html('<h2>we are monster</h2>')
        },3000)
         clearInterval(timer);//清除计时器
    }
},30);//  每隔30ms，就执行