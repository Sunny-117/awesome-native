var ul = document.querySelector('#wrap ul');
var lis = document.querySelectorAll('#wrap ul li');
var closeBtns = document.querySelectorAll('#wrap .close');
var last = null;  //上一次点击的li
//选项卡的另一种思路
var timer = setTimeout(function () {
    ul.className = '';
}, 200);

// console.dir(lis);是对象，但是原型上有，就可以用
lis.forEach(function (li, index) {
    li.onclick = function () {
        // 点击谁,谁身上有,其他就没有(选项卡思想)
        ul.setAttribute('id', 'activeWrap');
        last && (last.className = '');//有class的话才清楚class
        this.className = 'active';
        last = this;// 当前次的点击相对于下一次就是上一次。当前点的是this
    };
    // 事件冒泡，点击close,冒泡到父级又添上了
    closeBtns[index].onclick = function (ev) {
        ul.removeAttribute('id', 'activeWrap');
        lis[index].className = '';
        last = null;
        ev.cancelBubble = true;
    }
});