/* 
  1、监控鼠标在所有li上的移动
 */
var lis = document.querySelectorAll(".stars2 li");
lis.forEach(function (li) {
  /* 
  mousemove：监听频率过高，影响性能
  mouseenter：在当前元素的子元素当中活动不会触发
  mouseover：监听频率一般，在子元素当中活动会触发
   */
  li.addEventListener("mouseover", function () {
    var onStar = this.dataset.value;
    for (var i = 0; i < lis.length; i++) {
      if (i <= onStar) {
        lis[i].classList.add("hover");
      } else {
        lis[i].classList.remove("hover");
      }
    }
  });
  li.addEventListener("mouseout", function () {
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove("hover");
    }
  });
  li.addEventListener("click", function () {
    var onStar = this.dataset.value;
    var totalChecked = 0;
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].classList.contains("checked")) {
        totalChecked += 1;
      }
      if (i <= onStar) {
        lis[i].classList.add("checked");
      } else {
        lis[i].classList.remove("checked");
      }
    }
    if (onStar == 0 && totalChecked == 1) {
      this.classList.remove("checked");
    }
  });
});
