var pages = document.querySelector('.pages');
var locale = window.navigator.language || 'en-us';

//data格式
var date = new Date();
console.log('date:'+date);
var dayNum = date.getDate();
console.log('dayNum:'+dayNum);//4
var month = date.getMonth();
console.log('month:'+month);//2（月份从0开始计算）
var dayName = date.toLocaleString(locale,{weekday:'long'});
console.log('dayName:'+ dayName);//星期四
var monthName = date.toLocaleString(locale,{month:'long'});
console.log('dayName:'+ monthName);//三月
var year = date.getFullYear();
console.log('year:'+year);//2021

//函数计算当前月份中的天数
function daysInMonth(month,year){
    return new Date(year,month+1,0).getDate()
}
console.log("daysInMonth:"+daysInMonth(2,2021))//当前3月2021年 的月中天数为31天

//生成一个新的日历页
function getNewDate(){
    //日期的操作
    if(dayNum <= daysInMonth(month,year)){
        dayNum++;
    }else{
        //下个月的第一天
        dayNum = 1;
    }
    //月的操作
    if(dayNum === 1 && month < 11){
        month++;
    }else if(dayNum ===1 && month ===11){
        month = 0;
    }
    //年的操作
    if(dayNum ===1 && month===0){
        year++;
    }
    //按新的年月日创建一个新日期对象
    var newDate = new Date(year,month,dayNum);
    dayName = date.toLocaleString(locale,{weekday:'long'});
    monthName = date.toLocaleString(locale,{month:'long'});

    console.log(newDate);
}



//事件处理函数（e为事件参数）活动事件本身和事件源的一些值
function handleClick(e){
    //生成一个新的日历页
    getNewDate()
    //撕纸动画（事件）
    updateCal(e.target)
}

function updateCal(target){
    //动态事件的判断（是否已经存在）
    if(target && target.classList.contains('page')){
        target.classList.add('tear')
        setTimeout(function(){
            pages.removeChild(target);
        },800)
    }else{
        return;
    }
    //重新动态再添加一页日历
    reanderPage()
}

//初始化事件
function reanderPage(){
    //动态生成网页（日历）
    //创建元素对象div
    var newPage = document.createElement('div');
    newPage.classList.add('page');//样式结构追加
    newPage.innerHTML = '\n<p class="month">'+
    monthName + '</p>\n <p class="day">'+
    dayNum + '</p>\n <p class="day-name">'+
    dayName +  '</p>\n <p class="year">'+
    year + '</p>\n';

    //追加元素的写法
    pages.appendChild(newPage);
}

reanderPage();

//点击事件
pages.addEventListener('click',handleClick)
