(function (doc, win) {
  var oImgList = doc.getElementsByClassName("J_imgList")[0],
    data = JSON.parse(doc.getElementById("J_data").innerHTML),
    imgTpl = doc.getElementById("J_imgTpl").innerHTML,
    oImgs = doc.getElementsByClassName("list-img");

  var init = function () {
    renderList(data);
    bindEvent();
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 150);
  };

  function bindEvent() {
    win.onload = win.onscroll = tools.throttle(tools.imgLazyLoad(oImgs, doc), 800);
  }

  function renderList(data) {
    oImgList.innerHTML = data.reduce((pre, item) => {
      return (
        pre +
        tools.tplReplace(imgTpl, {
          img: item.img,
          name: item.name
        })
      );
    }, "");
  }
  init();
})(document, window);