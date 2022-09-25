//栈
function Stack() {
	var items = [];
	this.push = function (element) {
		items.push(element);
	};//推栈
	this.pop = function () {
		return items.pop();
	};//弹栈
	this.peek = function () {
		return items[items.length - 1];
	};//栈顶元素
	this.isEmpty = function () {
		return items.length === 0;
	};//栈是否为空
	this.size = function () {
		return items.length;
	};//栈大小
	this.clear = function () {
		items = [];
	};//清空栈
	this.print = function () {
		console.log(items.toString());
	};//打印栈
}
//队列
function Queue() {
	var items = [];
	this.enqueue = function (element) {
		items.push(element);
	}//入队
	this.dequeue = function () {
		return items.shift();
	}//出队
	this.front = function () {
		return items[0];
	}//队首元素
	this.isEmpty = function () {
		return items.length === 0;
	}//队列是否为空
	this.clear = function () {
		items = [];
	}//清空队列
	this.size = function () {
		return items.length;
	}//队列大小
	this.print = function () {
		console.log(items.toString());
	}//打印队列
}
//圣杯继承
var inherit = (function (){
    var F = function () {};    
    return function (Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.prototype.uber = Parent.prototype;
    }
})();
//深层拷贝对象（不考虑函数）
function deepClone(original, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = '[object Array]';
	for(var prop in original){
		if(original.hasOwnProperty(prop)){
			if(typeof original[prop] === 'object'){
				target[prop] = (toStr.call(original[prop]) === arrStr) ? [] : {};
				deepClone(original[prop], target[prop]);
			}else{
				target[prop] = original[prop];
			}
		}
		
	}
	return target;
}
//数组去重
Array.prototype.unique = function() {
	var obj = {},
		arr = [],
		len = this.length;
	for(var i = 0; i < len; i++){
		if(!obj[this[i]]){
			obj[this[i]] = true;
			arr.push(this[i]);
		}
	}
	return arr;
}
//类属性
function classOf(o){
	if(o === null)  return "Null";
	if(o === undefined)  return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}
//父节点的第几个元素节点
Element.prototype.eleIndex = function(){
	var index = 0,
		node = this;
	while(node = node.previousSibling){
		if(node.nodeType == 1){
			index++;
		}
	}
	return index;
}
//第n层祖先元素
Element.prototype.nthParentEle = function(n) {
	var node = this,
		n = n || 0;
	while(node && n--) {
		node = node.parentElement;
	}
	return node;
}
//第n个兄弟节点
Element.prototype.nthSiblingEle = function(n){
	var node = this;
	while(node && n) {
		if(n > 0){
			if(node.nextElementSibling){
				node = node.nextElementSibling;
			}else{
				for(node = node.nextSibling; node && node.nodeType !== 1; node = node.nextSibling);
			}
			n--;
		}else{
			if(node.previousElementSibling){
				node = node.previousElementSibling;
			}else{
				for(node = node.previousSibling; node && node.nodeType !== 1; node = node.previousSibling);
			}
			n++;
		}
	}
	return node;
}
//在某元素后插入元素
Element.prototype.insertAfter = function (targetNode, afterNode){
	var siblingNode = afterNode.nextElementSibling;
	if(siblingNode) {
		this.insertBefore(targetNode,siblingNode);
	} else {
		this.appendChild(targetNode);
	}
	return targetNode;
}
//销毁元素节点自身
Element.prototype.remove = function (){
	this.parentElement.removeChild(this);
}
//目标节点内部的节点顺序逆序
Element.prototype.revChild = function (){
	var child = this.children,
		len = child.length;
	for (var i = len - 2; i >= 0; i--){
		this.appendChild(child[i]);
	}
	return this;
}
//查看滚动轮滚动距离
function getScrollOffset(){
	if(window.pageXOffset){
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	}else{
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}
//查看浏览器视口尺寸
function getViewportOffset(){
	if(window.innerWidth){
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	}else if(document.compatMode === "CSS1Compat"){
		return{
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	}else{
		return{
			w: document.body.clientWidth,
			h: document.body.clientHeight
		}
	}
}
//求元素相对于文档的坐标
Element.prototype.getCoord = function (){
	var coordX = 0,
		coordY = 0,
		docEle = this;
	while(docEle){
		coordX += docEle.offsetLeft;
		coordY += docEle.offsetTop;
		docEle = docEle.offsetParent;
	}
	return {
		x: coordX,
		y: coordY
	}
};
//获取样式
function getStyle(ele, style){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[style];
	}else{
		return ele.currentStyle[style];
	}
}
//添加事件
function addEvent(elem, type, handler){
	if(elem.addEventListener){
		elem.addEventListener(type, handler, false);
	}else if(elem.attachEvent){
		elem['temp' + type + handler] = handler;
		elem['temp' + type] = function(){
			elem['temp' + type + handler].call(elem);
		}		
		elem.attachEvent('on' + type, elem['temp' + type]);
	}else{
		elem['on' + type] = handler;
	}
}
//解除事件
function removeEvent(elem, type, handler){
	if(elem.removeEventListener){
		elem.removeEventListener(type, handler, false);
	}else if(elem.detachEvent){
		elem.detachEvent('on' + type, elem['temp' + type]);
	}else{
		elem['on' + type] = null;
	}
}
//取消冒泡
function stopBubble(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}
//阻止默认事件
function cancelHandler(event){
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}
//拖拽元素
function drag(elem){
    var disX;
    var disY;
    addEvent(elem,"mousedown",function(e){
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(this,"left"));
        disY = event.clientY - parseInt(getStyle(this,"top"));
        addEvent(document,"mousemove",mouseMove);
        addEvent(document,"mouseup",mouseUp);
    });
    function mouseMove(e){
        var event = e || window.event;
        elem.style.left = event.pageX - disX + 'px';
        elem.style.top = event.pageY - disY + 'px';
    }
    function mouseUp(){
        removeEvent(document,"mousemove",mouseMove);
        removeEvent(document,"mouseup",mouseUp);
    }
}
//多物体多值链式运动框架
function startMove(elem, json, func){
	clearInterval(elem.timer);
	var iSpeed;
	var iCur;
	var bStop;
	elem.timer = setInterval(function(){
		bStop = true;
		for(var attr in json){
			iCur = attr === 'opacity' ? parseFloat(getStyle(elem,attr)) * 100 : parseInt(getStyle(elem,attr));
			iSpeed = attr === 'opacity' ? (parseFloat(json[attr])* 100 - iCur) / 7 : (parseInt(json[attr]) - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			elem.style[attr] = attr === "opacity" ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px';
			if(iCur !== (attr === 'opacity' ? parseFloat(json[attr]) * 100 : parseInt(json[attr]))){
				bStop = false;
			}
		}
		if(bStop){	
			clearInterval(elem.timer);	
			if(func){
				func();
			}
		}
	},30);
}
//按需异步加载script
function scriptLoaded(url, callback){
	var script = document.createElement('script');
	script.type = "text/javascript";
	if(script.readyState){
		script.onreadystatechange = function(){
			if(script.readyState == "complete" || script.readyState == "loaded"){
				callback();
				script.onreadystatechange = null;
			}
		}
	}else{
		script.onload = function(){
			script.onload  = null;
			callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}
//兼容getElementByClassName
Document.prototype.getByClassName = function(target) {
    var allEle = document.getElementsByTagName('*'),
        len = allEle.length,
        arr = [],
        classArr = [],
        classArrLen;
    for(var i = 0; i < len; i++) {
        classArr = allEle[i].className.myTrim().splice(' ');
        classArrLen = classArr.length;
        for(var j = 0; j < classArrLen; j++){
            if(classArr[j] === target){
                arr.push(allEle[i]);
                break;
            }
        }
    }
    return arr;
}
//兼容trim
String.prototype.myTrim = function() {
    var reg = /^\s*|\s*$/;
    return this.replace(reg,'');
}