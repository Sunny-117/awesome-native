var time1 = document.querySelector('.time1');
var time2 = document.querySelector('.time2');
var time3 = document.querySelector('.time3');
var week = document.querySelector('.week');
var date = document.querySelector('.date');

var up = document.querySelector('.up');
var down = document.querySelector('.down');


//即时时间
moment.locale('zh-cn');
function time() {
	time1.innerHTML = moment().format('LTS');
}
time();
setInterval(time, 1000);


//即时日期
var dayCn = window.calendar.solar2lunar(moment().year(), moment().month() + 1, moment().date());	//取到农历日期
// console.log(dayCn);
time2.innerHTML = moment().format('LL') + ' ' + dayCn.IMonthCn + dayCn.IDayCn + ' ' + (dayCn.Term ? dayCn.Term : '');


//星期
var weekDay = moment.weekdaysMin(true);
// console.log(weekDay);
weekDay.forEach(function (item) {
	week.innerHTML += '<span>' + item + '</span>';
});


//获取某月的天数
function getEndDay(moment) {
	return moment.daysInMonth();    //返回当前月的天数
}
//console.log(getEndDay(moment().subtract(1,'month')));

//获取某月第一天的星期
function getFirstWeek(moment) {
	return moment.startOf('month').weekday();
}
// console.log(getFirstWeek(moment().subtract(1,'month')));


//生成日历
var today = moment();
setDate(today); //默认传现在的日期

function setDate(m) {
	//用户传进来的moment对象不能修改，如果修改了的话，后面的都会变了，所以要修改的话就要克隆一个
	var lastEndDay = getEndDay(m.clone().subtract(1, 'month'));    //上个月的最后一天
	var curEndDay = getEndDay(m); //当前月的最后一天
	var week = getFirstWeek(m.clone()); //当前月的第一天的星期数(索引值)

	// console.log(lastEndDay, curEndDay, week);

	var str = ''; //用来存储生成的结构的
	var nextMonthStart = 0;   //下个月日期的起始值

	for (var i = 0; i < 42; i++) {
		if (i < week) {
			//这个条件成立，说明放的是上个月的日期
			str = '<li class="color">'
				+ '<span>' + lastEndDay + '</span>'
				+ '<span>' + getDayCn(m.year(), m.month(), lastEndDay) + '</span>'
				+ '</li>'
				+ str;

			lastEndDay--;	//先用再减

		} else if (i >= week + curEndDay) {
			//这个条件成立，说明放的是下个月的日期
			nextMonthStart++;	//先加再用

			str += '<li class="color">'
				+ '<span>' + nextMonthStart + '</span>'
				+ '<span>' + getDayCn(m.year(), m.month() + 2, nextMonthStart) + '</span>'
				+ '</li>';

		} else {
			//这个条件成立，说明放的是当前月的日期
			var cl = m.date() == i - week + 1 ? 'active' : '';	//

			if (m.year() != moment().year() || m.month() != moment().month()) {
				//这个条件成立说明用户传入的moment对象里的年份或者月份跟今天的年份与月份不对应了，此时就表示是其它日期，并不是今天的日期
				cl = '';
			}

			str += '<li class="' + cl + '">'
				+ '<span>' + (i - week + 1) + '</span>'
				+ '<span>' + getDayCn(m.year(), m.month() + 1, i - week + 1) + '</span>'
				+ '</li>'
		}
	}

	time3.innerHTML = m.format('YYYY年MMM');
	date.innerHTML = str;
}


//上个月
up.onclick = function () {
	setDate(today.subtract(1, 'month'));
};

//下个月
down.onclick = function () {
	setDate(today.add(1, 'month'));
};

//获取农历
function getDayCn(year, month, date) {
	var dayCn = window.calendar.solar2lunar(year, month, date);
	//console.log(dayCn);
	var result = '';

	if (dayCn.IDayCn == '初一') {	//如果是月初的话，换成这个月的名字
        result = dayCn.IMonthCn;
    } else if (dayCn.Term) {		//如果有节气的话，换成节气
        result = dayCn.Term;
    } else if (dayCn.festival) {	//如果有节日的话，换成节日
        result = dayCn.festival;
    } else if (dayCn.lunarFestival) {	//如果有中国传统的节日的话，换成传统节日（春节、元宵节、端午节）
        result = dayCn.lunarFestival;
    } else {
        result = dayCn.IDayCn;		//都没有的话就是农历
    }

	return result;
}
//console.log(getDayCn(2020, 4, 19));


