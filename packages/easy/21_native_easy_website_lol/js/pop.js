var showPop = (function () {
  /**
   * 弹出窗口
   * @param {*} id
   */
  function showPop(id) {
    var container = $("#" + id);
    container.style.display = "";
    if (id === "popVideo") {
      var vdo = container.querySelector("video");
      vdo.play();
    }
  }

  // 获取所有的关闭按钮
  var closes = $$(".pop_close");
  for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function () {
      var container = this.parentElement.parentElement;
      container.style.display = "none";
    };
  }

  // 处理一些特殊的东西
  var popWx = $(".pop_wx");
  var popQq = $(".pop_qq");
  popWx.onclick = function () {
    // classList.add 添加类样式
    popWx.classList.add("selected");
    popQq.classList.remove("selected");
  };

  popQq.onclick = function () {
    popWx.classList.remove("selected");
    popQq.classList.add("selected");
  };

  // 处理关闭视频弹窗时，视频暂停
  var closeBtn = $("#popVideo .pop_close");
  closeBtn.addEventListener("click", function () {
    $("#popVideo video").pause();
  });
  return showPop;
})();
