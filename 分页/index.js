/**
 * 创建一个分页区域
 * @param {Number} page 当前页码
 * @param {Number} pageNumber 总页数
 * @param {Number} mostNumber 最多显示多少个数字页码
 * @param {HTMLElement} container 容器
 */
function createPager(page, pageNumber, mostNumber, container) {
  // 创建一个div.pager
  var div = document.createElement("div");
  div.className = "pager";
  // todo: 里面有很多a
  /**
   * 创建一个a元素
   * @param {String} text a元素的文本
   * @param {String} className a元素的类样式
   * @param {Number} target 点击后跳转的目标
   */
  function _createLink(text, className, target) {
    var a = document.createElement("a");
    a.innerText = text;
    a.className = className;
    // 看看target是不是在一个正常范围
    if (target <= 0) {
      target = 1; // 要跳转的目标最小为1
    }
    if (target > pageNumber) {
      target = pageNumber; // 要跳转的目标最大为页码总数
    }

    a.onclick = function () {
      if (page === target) {
        return;
      }
      div.remove();
      createPager(target, pageNumber, mostNumber, container);
    };
    div.appendChild(a);
  }

  if (page === 1) {
    // 搞定首页
    _createLink("首页", "disabled", 1);
    // 上一页
    _createLink("上一页", "disabled", page - 1);
  } else {
    _createLink("首页", "", 1);
    _createLink("上一页", "", page - 1);
  }

  // 中间的数字
  var start = page - Math.floor(mostNumber / 2);
  // 判断start在不在范围内
  if (start < 1) {
    start = 1;
  }
  var end = start + mostNumber - 1;
  // 判断end是不是超过了范围
  if (end > pageNumber) {
    end = pageNumber;
  }
  for (var i = start; i <= end; i++) {
    var className = i === page ? "active" : "";
    _createLink(i, className, i);
  }

  // 下一页和尾页
  if (page === pageNumber) {
    // 搞定首页
    _createLink("下一页", "disabled", page + 1);
    // 上一页
    _createLink("尾页", "disabled", pageNumber);
  } else {
    _createLink("下一页", "", page + 1);
    _createLink("尾页", "", pageNumber);
  }

  // 最后还有span作为尾巴
  var span = document.createElement("span");
  span.innerText = page + "/" + pageNumber;
  div.appendChild(span);

  // 把div放到容器中
  container.appendChild(div);
}

createPager(1, 135, 10, document.body);
